function getToken() {
  return localStorage.getItem('token');
}

function getUsuarioLogado() {
  const usuario = localStorage.getItem('usuario');

  if (!usuario) {
    return null;
  }

  try {
    return JSON.parse(usuario);
  } catch (error) {
    return null;
  }
}

function salvarSessaoLogin(resultado) {
  if (resultado.token) {
    localStorage.setItem('token', resultado.token);
  }

  if (resultado.usuario) {
    localStorage.setItem('usuario', JSON.stringify(resultado.usuario));
  }
}

function limparSessao() {
  localStorage.removeItem('token');
  localStorage.removeItem('usuario');
}

function logout() {
  limparSessao();
  window.location.href = '/login';
}

function exigirLogin() {
  const token = getToken();

  if (!token) {
    window.location.href = '/login';
    return false;
  }

  return true;
}

function montarHeaderAutorizacao() {
  return {
    'Authorization': `Bearer ${getToken()}`
  };
}
