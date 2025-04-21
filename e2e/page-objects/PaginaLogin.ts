import { Locator, Page, expect } from "@playwright/test";
import { test as base } from "@playwright/test";
//Esse arquivo é um Page Object Model, que é um padrão de projeto que tem como objetivo encapsular a lógica de interação com uma página da aplicação. 
//Ele ajuda a manter o código mais organizado e reutilizável, separando a lógica de teste da lógica de interação com a interface do usuário.

export const test = base.extend<{ paginaLogin: PaginaLogin}>({
    paginaLogin: async ({ page }, use) => {
        const paginaLogin = new PaginaLogin(page);
        await paginaLogin.visitar();
        await use(paginaLogin);
    }   
});
//Criamos essa extensão do test do playwright para diminuir a repetição de código, visto que vamos escrever essas linhas mais de uma vez.


export default class PaginaLogin {
    private readonly page: Page;
    private readonly botaoLogin: Locator;
    private readonly inputEmail: Locator;
    private readonly inputSenha: Locator;
    private readonly botaoAcessarConta: Locator;

    constructor(page: Page){
        this.page = page;
        this.botaoLogin = page.getByTestId('botao-login');
        this.inputEmail = page.getByTestId('input-email');
        this.inputSenha = page.getByTestId('input-senha');
        this.botaoAcessarConta = page.getByTestId('botao-acessar-conta');
    }

    async visitar(){
        await this.page.goto("/");
        await this.botaoLogin.click();
        await expect(this.page).toHaveURL('/auth/login');// Verifica se na URL atual tem esse /auth/login
    }

    async fazerLogin(email: string, senha: string){
        await this.inputEmail.fill(email);
        await this.inputSenha.fill(senha);
        await this.botaoAcessarConta.click();
    }

    async loginFeitoComSucesso(){
        await expect(this.page).toHaveURL('/home');
    }

    async estaMostrandoMensagemDeErro(mensagem: string){
        const elementoErro = this.page.getByText(mensagem);//Essa mensagem não é um componente estático, é gerado do angular.
        await expect(elementoErro).toBeVisible();
    }

    async estaMostrandoEmailInvalido(email: string, senha: string, mensagem: string){
        await this.inputEmail.fill(email);
        await this.inputSenha.fill(senha);

        const elementoEmailErro = this.page.getByText(mensagem);//Essa mensagem não é um componente estático, é gerado do angular.
        await expect(elementoEmailErro).toBeVisible();
    }

    async deixouCampoEmBranco(email: string, senha: string, mensagem: string){
        await this.inputEmail.fill(email);
        await this.inputSenha.fill(senha);
        
        const elementoEmBrancoErro = this.page.getByText(mensagem);//Essa mensagem não é um componente estático, é gerado do angular.
        await expect(elementoEmBrancoErro).toBeVisible();
    }
}