let botaoput = document.querySelector("#botaoValidar");
botaoput.addEventListener('click', Validação);

var emailEntrada;
var senhaEntrada;

function Validação() {
  if (ValidaçãoAcessoEmail() && ValidaçãoAcessoSenha()) {
    console.log("Validação True");
    realizarLogin();
    return true;
  } else {
    alert("Algo deu Errado :( \nTente novamente.");
    console.log("Validação False");
    return false;
  }
}

function realizarLogin() {
  const dadosLogin = {
    email: emailEntrada,
    senha: senhaEntrada
  };

  fetch('http://204.48.20.110/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(dadosLogin)
  })
  .then(response => {
    if (response.ok) {
      return response.json();
    } else {
      throw new Error('Erro ao fazer login');
    }
  })
  .then(data => {
    console.log('Usuário logado:', data);
    console.log("token: ", data)

    // Armazenar o token no LocalStorage
    localStorage.setItem('token', data.token);

    alert('Login realizado com sucesso!');
    //Manda o Usuario para Tela de Manipulação de Usuarios Caso Funcione 
     window.location.href = 'ModificarAnuncios.html';
  })
  .catch(error => {
    console.error('Erro ao fazer login:', error);
    alert('Login foi pras CUCUIAS! \nTente novamente...');
  });
}

function ValidaçãoAcessoEmail() {
  let em1 = document.querySelector("#acessemail").value;
  if (em1 !== "") {
    console.log("Email recuperado: " + em1);
    emailEntrada = em1;
    return true;
  } else {
    return false;
  }
}

function ValidaçãoAcessoSenha() {
  let sen1 = document.querySelector("#acesspassword").value;
  if (sen1 !== "") {
    senhaEntrada = sen1;
    console.log("Senha Recuperada: " + sen1);
    return true;
  } else {
    alert("Verificar Senha!");
    return false;
  }
}
