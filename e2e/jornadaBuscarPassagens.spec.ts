//Implementação do teste de busca de passagens. 

import test from "@playwright/test";
import PaginaPrincipal from "./page-objects/PaginaPrincipal";

test.describe('Buscar Passagens', () => {
    test('Deve buscar passagem de somente ida', async ({ page }) => {
        const paginaPrincipal = new PaginaPrincipal(page);
        const dataIda = new Date();
        
        await paginaPrincipal.visitar();
        await paginaPrincipal.definirSomenteIda();

        await paginaPrincipal.abrirModalPassageiros();
        await paginaPrincipal.definirPassageirosAdultos(3);
        await paginaPrincipal.definirPassageirosCriancas(1);
        await paginaPrincipal.definirPassageirosBebes(1);
        await paginaPrincipal.fecharModalPassageiros();

        await paginaPrincipal.definirOrigemEDestino('minas gerais','rio de janeiro');
        await paginaPrincipal.definirData(dataIda);
        await paginaPrincipal.buscarPassagens();

        await paginaPrincipal.estaMostrandoPassagem('Somente ida', 'Minas Gerais', 'Rio de Janeiro', dataIda);
    });
});