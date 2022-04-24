import { obterPeloId, obterUsuarios } from "../firebase/funcoesFirestore.js";
import { subirFileStorage } from "../firebase/funcoesStorage.js";

// Mostrar todos os posts
export const mostrarPost = (idPost, dataPost, dataCriador) => {
  const divPainel = document.createElement("div");
  divPainel.classList.add("painelPost");

  divPainel.innerHTML = divPainel.innerHTML = `
  <div class="usuarioPost" id= "${idPost}">
      <div class="imgUsuarioPost"><img class="imgPost"src="${dataCriador.imgUsuario}"></div>
      <div class="infoUsuarioPost">
          <div class="nomeUsuarioPost"><p>${dataCriador.username}</p></div>
          <div class="descricaoUsuarioPost"><p>${dataCriador.pronomes}</p></div>
      </div>
  </div>
  <div class="postsCompartilhado">
      <div class="conteudoCompartilhado">
          <p>${dataPost.publicacao}</p>
          <img src="${dataPost.imgPost}">
      </div>
  </div>
  <div class="botoesReacao">
      <i class="ph-heart-bold like" name= "${idPost}"}></i>
      <p>${dataPost.likes.length}</p>
      <i class="ph-chat-circle" name= "${idPost}"}></i>
      <p>${dataPost.likes.length}</p>
  </div>
  `;

  return divPainel;
};

// Simula o contador no Firestore como array de usuários que dão click
export const handleLikes = async (e) => {
  const btnLike = e.target;
  const userData = JSON.parse(sessionStorage.userSession);
  // o id do post que está associado ao atributo name é encontrado e salvo no idLike
  const idLike = btnLike.getAttribute("name");
  const dataPost = await obterPeloId(idLike, "posts");
  // verificando se o id do usuário está na lista de likes de cada post
  if (dataPost.likes.includes(userData.id)) {
    // isto é para remover o like por usuário
    subirLikes(
      idLike,
      dataPost.likes.filter((item) => item !== userData.id)
    );
    btnLike.style.color = "#8F7D7D";
  } else {
    // isto é para adicionar like por usuário
    subirLikes(idLike, [...dataPost.likes, userData.id]);
    btnLike.style.color = "#E7B9E4";
  }
};

// Reconhece todos os botões like em cada Publicação
export const btnLikes = () => {
  const botoesPost = document.getElementsByClassName("botoesReacao");

  // Procura onde está o alvo de reação neste caso 'like'
  Array.from(botoesPost).forEach((botaoPost) => {
    const btnLike = botaoPost.querySelector(".like");

    // Reconhece o botão
    btnLike.addEventListener("click", handleLikes);
  });
};

const painelCompartilhar = document.createElement("form");
painelCompartilhar.setAttribute("id", "formCompartilhar");
painelCompartilhar.classList.add("painelCompartilhar");
painelCompartilhar.innerHTML = `
    <textarea id="inputCompartilhar" placeholder="O que gostaria de compartilhar?" rows="8" cols="76"></textarea>  
    
    <div class="botoes">
        <input type="file" placeholder="Adicionar imagem" id="compartilharImg">         
        <select name="Grupo" id="Grupo" class="Grupo">
          <option value="" selected disabled>Tema</option>
          <option value="Relacionamentos">Relacionamento</option>
          <option value="Web">Web</option>
          <option value="Saúde">Saúde</option>
          <option value="Viagens">Viagens</option>
          <option value="Amizade">Amizade</option>
          <option value="Moda">Moda/Beleza</option>
          <option value="Estudos">Estudos</option>
          <option value="Maternidade">Maternidade</option>
          <option value="Outros">Outros</option>
        </select>
        <button class="botaoCompartilhar">Publicar</button>
          
    </div>
  `;
