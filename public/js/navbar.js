function montarNavbar(paginaAtual = '') {
  const usuario = getUsuarioLogado();

  const nomeUsuario = usuario && usuario.nome ? usuario.nome : 'Usuário';
  const tipoUsuario = usuario && usuario.tipo ? usuario.tipo : '';

  const links = [
    { nome: 'Dashboard', href: '/dashboard', id: 'dashboard' },
    { nome: 'Produtos', href: '/produtos', id: 'produtos' },
    { nome: 'Clientes', href: '/clientes', id: 'clientes' },
    { nome: 'Categorias', href: '/categorias', id: 'categorias' },
    { nome: 'Vendas', href: '/vendas', id: 'vendas' },
    { nome: 'Logs', href: '/logs', id: 'logs' },
    { nome: 'JSON', href: '/json', id: 'json' },
    { nome: 'Relatórios', href: '/relatorios', id: 'relatorios' }
  ];

  const linksHtml = links.map((link) => {
    const active = link.id === paginaAtual ? 'active fw-bold' : '';

    return `
      <li class="nav-item">
        <a class="nav-link ${active}" href="${link.href}">${link.nome}</a>
      </li>
    `;
  }).join('');

  const navbar = `
    <nav class="navbar navbar-expand-lg navbar-dark bg-dark mb-4">
      <div class="container-fluid">
        <a class="navbar-brand" href="/dashboard">Estoque e Vendas</a>

        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSistema">
          <span class="navbar-toggler-icon"></span>
        </button>

        <div class="collapse navbar-collapse" id="navbarSistema">
          <ul class="navbar-nav me-auto mb-2 mb-lg-0">
            ${linksHtml}
          </ul>

          <span class="navbar-text me-3">
            ${nomeUsuario} ${tipoUsuario ? `(${tipoUsuario})` : ''}
          </span>

          <button class="btn btn-outline-light btn-sm" onclick="logout()">Sair</button>
        </div>
      </div>
    </nav>
  `;

  document.body.insertAdjacentHTML('afterbegin', navbar);
}
