window.addEventListener("load", ListarProdutos);

let botaoVoltar = document.querySelector("#Voltar");
botaoVoltar.addEventListener("click", Desconectar);

let botaoCriar = document.querySelector("#CriarAnuncio");
botaoCriar.addEventListener("click", CriarProduto);

let botaoEditar = document.querySelector("#Editar");
botaoEditar.addEventListener("click", EditarAnuncio);

let botaoApagar = document.querySelector("#ApagarAnuncio");
botaoApagar.addEventListener("click", ApagarAnuncio);

function Desconectar() {
  // Desloga Usuario e zera o token
  localStorage.removeItem("token");
  alert("Desconectado com sucesso!");
  window.location.href = "Login.html";
}

function CriarProduto() {
  var TituloProduto = document.querySelector("#Titulo").value;
  var DescriçãoProduto = document.querySelector("#Descricao").value;
  var PreçoProduto = document.querySelector("#Preco").value;
  var token = localStorage.getItem("token");
  if (TituloProduto && DescriçãoProduto && PreçoProduto != "") {
    var Produto = {
      titulo: TituloProduto,
      descricao: DescriçãoProduto,
      preco: PreçoProduto,
    };

    fetch("http://204.48.20.110/anuncios", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(Produto),
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error("Erro ao criar anúncio");
        }
      })
      .then((data) => {
        console.log("Anúncio criado:", data);
        alert("Anúncio criado com sucesso!");
        ListarProdutos(); //Atualiza Listagem de Anuncios sempre que for adicionado um novo anuncio
      })
      .catch((error) => {
        console.error("Erro ao criar anúncio:", error);
        alert("Cadastro foi pras Cucuias! \nTente Novamente.");
      });

    return true;
  } else {
    alert("Cadastro foi pras cucuias! \nTente Novamente.");
    return false;
  }
}

function ListarProdutos() {
  var token = localStorage.getItem("token");
  fetch("http://204.48.20.110/anuncios", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  })
    .then((response) => {
      if (response.ok) {
        return response.json();
      } else {
        throw new Error("Erro ao Listar Anuncios");
      }
    })
    .then((data) => {
      console.log("Anúncios Criados:", data);

      var listaAnuncios = document.querySelector("#lista-anuncios");
      listaAnuncios.innerHTML = "";
      var titulo = document.createElement("h1");
      titulo.textContent = "Anúncios Cadastrados:";
      listaAnuncios.appendChild(titulo);
      data.forEach((anuncio) => {
        var divAnuncio = document.createElement("div");
        divAnuncio.classList.add("anuncio");

        var titulo = document.createElement("p");
        titulo.textContent = `ID: ${anuncio.id}, Título: ${anuncio.titulo}, Preço: ${anuncio.preco}, Descrição: ${anuncio.descricao}`;

        divAnuncio.appendChild(titulo);
        listaAnuncios.appendChild(divAnuncio);
      });
    })
    .catch((error) => {
      console.error("Erro ao Listar Anuncios:", error);
      alert("Listar Anuncios foi pras Cucuias! \nTente Novamente.");
    });
  return true;
}

function EditarAnuncio() {
  console.log("chamou editar anuncio");
  var TituloProduto = document.querySelector("#Titulo").value;
  var DescriçãoProduto = document.querySelector("#Descricao").value;
  var PreçoProduto = document.querySelector("#Preco").value;
  var IdPR = document.querySelector("#id").value;
  var token = localStorage.getItem("token");
  var AnuncioEditado = {
    id: IdPR,
    titulo: TituloProduto,
    descricao: DescriçãoProduto,
    preco: PreçoProduto,
  };

  fetch("http://204.48.20.110/anuncios", {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(AnuncioEditado),
  })
    .then((response) => {
      if (response.ok) {
        return response.json();
      } else {
        throw new Error("Erro ao editar Anuncio");
      }
    })
    .then((data) => {
      console.log("Retorno da API:", data);
      ListarProdutos(); // Atualiza em tempo real a nova modificação da Lista de Anuncios
    })
    .catch((error) => {
      console.error("Erro ao editar Anuncio:", error);
      alert("Editar Anuncio foi pras Cucuias! \nTente Novamente.");
    });

  return true;
}

function ApagarAnuncio() {
  var IdPR = document.querySelector("#id").value;
  var token = localStorage.getItem("token");

  fetch("http://204.48.20.110/anuncios" + "/" + IdPR, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  })
    .then((response) => {
      if (response.ok) {
        return response.json();
      } else {
        throw new Error("Erro ao Apagar Anuncio");
      }
    })
    .then((data) => {
      console.log("Retorno da API:", data);
      ListarProdutos();
    })
    .catch((error) => {
      console.error("Erro ao apagar anuncio:", error);
      alert("Apagar Anuncios foi pras Cucuias! \nTente Novamente.");
    });

  return true;
}
