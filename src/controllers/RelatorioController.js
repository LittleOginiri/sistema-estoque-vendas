const PDFDocument = require('pdfkit');
const relatorioService = require('../services/RelatorioService');

class RelatorioController {
  vendasJsonController = async (request, response, next) => {
    try {
      const dados = await relatorioService.buscarVendasPorPeriodo(request.query);

      response.status(200).json({
        success: true,
        data: dados
      });
    } catch (error) {
      next(error);
    }
  };

  vendasPdfController = async (request, response, next) => {
    try {
      const dados = await relatorioService.buscarVendasPorPeriodo(request.query);

      const doc = new PDFDocument({
        margin: 40,
        size: 'A4'
      });

      const nomeArquivo = `relatorio_vendas_${new Date().toISOString().slice(0, 10)}.pdf`;

      response.setHeader('Content-Type', 'application/pdf');
      response.setHeader('Content-Disposition', `attachment; filename="${nomeArquivo}"`);

      doc.pipe(response);

      this.#montarCabecalho(doc, dados);
      this.#montarResumo(doc, dados);
      this.#montarTabelaVendas(doc, dados);
      this.#montarProdutosMaisVendidos(doc, dados);

      doc.end();
    } catch (error) {
      next(error);
    }
  };

  #montarCabecalho(doc, dados) {
    doc
      .fontSize(18)
      .text('Relatório de Vendas', { align: 'center' })
      .moveDown(0.5);

    doc
      .fontSize(10)
      .text(`Gerado em: ${new Date().toLocaleString('pt-BR')}`, { align: 'center' })
      .moveDown();

    const filtros = dados.filtros;

    doc
      .fontSize(11)
      .text('Filtros utilizados:', { underline: true })
      .text(`Data início: ${filtros.data_inicio || 'Não informado'}`)
      .text(`Data fim: ${filtros.data_fim || 'Não informado'}`)
      .text(`Status: ${filtros.status || 'Todos'}`)
      .moveDown();
  }

  #montarResumo(doc, dados) {
    doc
      .fontSize(13)
      .text('Resumo', { underline: true })
      .moveDown(0.3);

    doc
      .fontSize(11)
      .text(`Quantidade de vendas: ${dados.resumo.quantidade_vendas}`)
      .text(`Total geral: R$ ${Number(dados.resumo.total_geral).toFixed(2)}`)
      .moveDown();
  }

  #montarTabelaVendas(doc, dados) {
    doc
      .fontSize(13)
      .text('Vendas encontradas', { underline: true })
      .moveDown(0.3);

    if (dados.vendas.length === 0) {
      doc.fontSize(10).text('Nenhuma venda encontrada para os filtros informados.').moveDown();
      return;
    }

    dados.vendas.forEach((venda) => {
      this.#verificarEspaco(doc, 75);

      doc
        .fontSize(10)
        .text(`Venda #${venda.id_venda}`, { continued: true })
        .text(` | Status: ${venda.status}`, { continued: true })
        .text(` | Total: R$ ${Number(venda.total).toFixed(2)}`);

      doc
        .fontSize(9)
        .text(`Cliente: ${venda.cliente}`)
        .text(`Usuário: ${venda.usuario}`)
        .text(`Data: ${new Date(venda.data_venda).toLocaleString('pt-BR')}`)
        .moveDown(0.5);
    });
  }

  #montarProdutosMaisVendidos(doc, dados) {
    this.#verificarEspaco(doc, 120);

    doc
      .fontSize(13)
      .text('Produtos mais vendidos', { underline: true })
      .moveDown(0.3);

    if (dados.produtos_mais_vendidos.length === 0) {
      doc.fontSize(10).text('Nenhum produto encontrado.').moveDown();
      return;
    }

    dados.produtos_mais_vendidos.forEach((item, index) => {
      this.#verificarEspaco(doc, 30);

      doc
        .fontSize(10)
        .text(`${index + 1}. ${item.produto} | Quantidade: ${item.quantidade_total} | Total: R$ ${Number(item.subtotal_total).toFixed(2)}`);
    });
  }

  #verificarEspaco(doc, espacoNecessario) {
    if (doc.y + espacoNecessario > doc.page.height - doc.page.margins.bottom) {
      doc.addPage();
    }
  }
}

module.exports = RelatorioController;
