let botaoSave = document.querySelector("#botaoSalvar")
botaoSave.addEventListener('click', Cadastro) 

var emailFinal
var senhaFinal
var nomeFinal

function Cadastro() {
  if (ValidaçãoCadastroEmail() && ValidaçãoCadastroSenha() && validaNome()) {
    const usuario = {
      nome: nomeFinal,
      email: emailFinal,
      senha: senhaFinal
    };

    fetch('http://204.48.20.110/usuario', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(usuario)
    })
    .then(response => {
      if (response.ok) {
        return response.json();
      } else {
        throw new Error('Erro ao cadastrar usuário');
      }
    })
    .then(data => {
      console.log('Usuário cadastrado:', data);
      alert('Usuário cadastrado com sucesso!');
      window.location.href = 'Login.html';
    })
    .catch(error => {
      // msg de deu ruim
      console.error('Erro ao cadastrar usuário:', error);
      // msg de erro
      alert('Algo deu Errado :( \nTente novamente.');
    });
  } else {
    console.log("retornou false");
  }
}

function ValidaçãoCadastroEmail() {
  let CadE1 = document.querySelector("#Cademail").value;
  let regexEmail = /^[a-zA-Z0-9._]+@[a-zA-Z]+\.[a-zA-Z]{2,}$/;
  if (regexEmail.test(CadE1)) {
    emailFinal = CadE1;
    return true;       
  } else {
    alert("Email Incorreto!");       
    return false;
  }
}

function validaNome() {
  var nome = document.querySelector("#Cadnome").value;
  if (!nome == "") {
    console.log(nome);
    nomeFinal = nome;
    return true; 
  } else {
    alert("Informe o nome corretamente!");
    return false;
  }
}

function ValidaçãoCadastroSenha() {
  let CadP1 = document.querySelector("#Cadpassword").value;
  if (!CadP1 == "") {
    senhaFinal = CadP1;
    console.log(CadP1);
    return true;
  } else {
    alert("Informe a senha Corretamente!");
    return false;
  }
}