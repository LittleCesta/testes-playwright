import test, { expect } from "@playwright/test";

test.describe("Página inicial", () => {
    test("Deve visitar a página inicial", async ({ page}) => {
        await page.goto("/"); // Ação de navegação. Conseguimos configurar a URL padrão que utilizaremos nos testes no asquivo playwright.config.ts na seção use: e depois baseURL
        await expect(page).toHaveTitle("Jornada Milhas"); // Asserções
        //Temos sempre que colocar o await pois nesses 2 casos elas são promessas assincronas

        //const tituloPassagens = page.getByRole('heading', {name: 'Passagens'});//Está buscando na página por um elemento que tem como role(papel) o heading(h1 a h6) e possui o nome passagens
        //await expect(tituloPassagens).toBeVisible(); //Verifica se o elemento está visivel

        const tituloPassagens = page.getByTestId('titulo-passagens');
        await expect(tituloPassagens).toBeVisible();
        
        const tituloPromocoes = page.getByTestId('titulo-promocoes');
        await expect(tituloPromocoes).toBeVisible();
        
        const tituloDepoimentos = page.getByTestId('titulo-depoimentos');
        await expect(tituloDepoimentos).toBeVisible();//Verifica se o elemento está visivel
    });
});