function configurarPainelJson(idBotao, idPainel) {
  const botao = document.getElementById(idBotao);
  const painel = document.getElementById(idPainel);

  if (!botao || !painel) return;

  painel.style.display = 'none';

  botao.addEventListener('click', () => {
    const escondido = painel.style.display === 'none';
    painel.style.display = escondido ? 'block' : 'none';
    botao.textContent = escondido ? 'Esconder JSON' : 'Mostrar JSON';
  });
}

function mostrarJson(idPainel, objeto) {
  const painel = document.getElementById(idPainel);
  if (!painel) return;

  painel.textContent = JSON.stringify(objeto, null, 2);
}

function setTextoFeedback(idElemento, texto) {
  const elemento = document.getElementById(idElemento);
  if (!elemento) return;

  elemento.textContent = texto;
}

function criarAlertaObrigatorio() {
  return '<span class="text-danger">*</span>';
}
