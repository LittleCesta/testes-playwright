import test from "@playwright/test";
import PaginaLogin from "./page-objects/PaginaLogin";

test.describe("Página de login", () => {
    test("Deve conseguir fazer login com email e senha válidos", async ({ page }) => {
        const paginaLogin = new PaginaLogin(page);
        await paginaLogin.visitar();
        await paginaLogin.fazerLogin('cesarromero34@gmail.com', '12345678');
        await paginaLogin.loginFeitoComSucesso();
    });

    test("Não deve conseguir fazer login com email invalido", async ({ page }) => {
        const paginaLogin = new PaginaLogin(page);

        await paginaLogin.visitar();
        await paginaLogin.fazerLogin('errado_cesarromero34@gmail.com', '12345678');
        await paginaLogin.estaMostrandoMensagemDeErro('Você não está autorizado a acessar este recurso');
    });

    test("Não deve conseguir fazer login com email incompleto", async ({ page }) => {
        const paginaLogin = new PaginaLogin(page);
        await paginaLogin.visitar();
        await paginaLogin.estaMostrandoEmailInvalido('errado_cesarromero34gmail.com', '12345678', 'E-mail inválido');
    });

    test("Não deve conseguir fazer login com campo em branco", async ({ page }) => {
        const paginaLogin = new PaginaLogin(page);
        await paginaLogin.visitar();
        await paginaLogin.estaMostrandoEmailInvalido('', '12345678', 'E-mail é obrigatório');
    });
});