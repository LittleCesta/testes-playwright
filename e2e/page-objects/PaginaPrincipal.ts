// Arquivo para instanciar a pagina principal do site e a jornada do usuário ao realizar a busca de passagens, desde o preenchimento do formulário até a compra da passagem.
import { Page, Locator, expect } from "@playwright/test";

export default class PaginaPrincipal {
    private readonly page: Page;
    private readonly campoDropdownOrigem: Locator;
    private readonly botaoSomenteIda: Locator;
    private readonly botaoAbrirModalPassageiros: Locator;
    private readonly botaoAdicionarAdulto: Locator;
    private readonly botaoAdicionarCrianca: Locator;
    private readonly botaoAdicionarBebe: Locator;
    private readonly botaoFecharModalPassageiros: Locator;
    private readonly campoDropdownDestino: Locator;
    private readonly campoDataIda: Locator;
    private readonly campoDataVolta: Locator;
    private readonly botaoBuscarPassagens: Locator;
    private readonly containerOrigem: Locator;
    private readonly containerDestino: Locator;
    private readonly botaoComprar: Locator;
    private readonly textoIdaVolta: Locator;
    private readonly containerMostrarDataIda: Locator;

    private obterDataExibicao(data: Date){
        return data.toLocaleString('pt-BR', {day: '2-digit', month: '2-digit'});
    }

    constructor(page: Page){
        this.page = page;

        this.campoDropdownOrigem = page
        .getByTestId('campo-dropdown-origem')
        .getByLabel('Origem');

        this.botaoSomenteIda = page.getByTestId('botao-somente-ida');
        this.botaoAbrirModalPassageiros = page.getByTestId('abrir-modal-passageiros');
        
        this.botaoAdicionarAdulto = page
        .getByTestId('seletor-passageiro-adultos')
        .getByRole('button', { name: 'Ícone do operador de adição' });

        this.botaoAdicionarCrianca = page
        .getByTestId('seletor-passageiro-criancas')
        .getByRole('button', { name: 'Ícone do operador de adição' });

        this.botaoAdicionarBebe = page
        .getByTestId('seletor-passageiro-bebes')
        .getByRole('button', { name: 'Ícone do operador de adição' });

        this.botaoFecharModalPassageiros = page.getByTestId('fechar-modal-passageiros');

        this.campoDropdownDestino = page
        .getByTestId('campo-dropdown-destino')
        .getByLabel('Destino');

        this.campoDataIda = page.getByTestId('campo-data-ida');
        this.campoDataVolta = page.getByTestId('texto-ida-volta');

        this.botaoBuscarPassagens = page.getByTestId('botao-buscar-passagens');
        this.textoIdaVolta = page.getByTestId('texto-ida-volta');

        this.containerOrigem = page.getByTestId('container-origem');
        this.containerDestino = page.getByTestId('container-destino');
        this.botaoComprar = page.getByTestId('botao-comprar');

        this.containerMostrarDataIda = page.locator('mat-card-content div').filter({ hasText: 'Ida 21/' }).nth(2);
    }

    async visitar(){
        await this.page.goto('/');
    }
    async definirSomenteIda(){
        await this.botaoSomenteIda.click();
    }

    async abrirModalPassageiros(){
        await this.botaoAbrirModalPassageiros.click();
    }

    async definirPassageirosAdultos(quantidade: number){
        for(let i = 1; i < quantidade; i++){
            await this.botaoAdicionarAdulto.click();
        }
    }

    async definirPassageirosCriancas(quantidade: number){
        for(let i = 0; i < quantidade; i++){
            await this.botaoAdicionarCrianca.click();
        }
    }

    async definirPassageirosBebes(quantidade: number){
        for(let i = 0; i < quantidade; i++){
            await this.botaoAdicionarBebe.click();
        }
    }

    async fecharModalPassageiros(){
        await this.botaoFecharModalPassageiros.click();
    }

    async definirOrigemEDestino(origem: string, destino: string){
        await this.campoDropdownOrigem.fill(origem);
        await this.campoDropdownOrigem.press('Enter');

        await this.campoDropdownDestino.fill(destino);
        await this.campoDropdownDestino.press('Enter');
    }

    async definirData(data: Date){
        const dataFormatada = data.toLocaleString('en-US', {dateStyle: 'short'});
        await this.campoDataIda.fill(dataFormatada);
    }

    async buscarPassagens(){
        await this.botaoBuscarPassagens.click();
    }

    async estaMostrandoPassagem(
        tipoTrajeto: 'Somente ida' | 'Ida e volta',
        origem: string,
        destino: string,
        dataIda: Date
    ){
        const dataIdaExibicao = this.obterDataExibicao(dataIda);

        await expect(this.textoIdaVolta).toHaveText(tipoTrajeto);//Verifica se o texto passado como parâmetro é exatamente o mesmo
        await expect(this.containerOrigem).toContainText(origem);//Verifica se o texto passado como parâmetro está presente no container, não necessáriamente sendo o mesmo.
        await expect(this.containerDestino).toContainText(destino);
        await expect(this.containerMostrarDataIda).toContainText(dataIdaExibicao);
        await expect(this.botaoComprar).toBeVisible();

    }
}