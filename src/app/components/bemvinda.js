import { getUserData } from '../firebase/firebase-data.js';

export function Welcome(abrirModalCreatePost, user) {
  const contentWelcome = document.createElement('div');
  contentWelcome.classList.add('perfil-grid');
  //   Container Base de Foto do Usuário
  const photoContainer = document.createElement('div');
  photoContainer.classList.add('photo__container', 'row', 'card');
  //   Imagem do usuário Container
  const imgAvatarContainer = document.createElement('div');
  imgAvatarContainer.classList.add('photo__avatar-container');
  const photoAvatar = document.createElement('img');
  photoAvatar.classList.add('photo__avatar-img');
  photoAvatar.alt = 'imgAvatar';

  const nome = document.createElement('h1');
  nome.classList.add('userNameTitle');

  imgAvatarContainer.append(photoAvatar);
  photoContainer.append(imgAvatarContainer);
  photoContainer.append(nome);

  // eslint-disable-next-line no-use-before-define
  obterUsuario(user.uid, photoAvatar, nome);

  // -----------------------------------------------------------------------------------
  const buttonAddPost = document.createElement('button');
  buttonAddPost.classList.add('buttonAddPost_desktop');

  const iconPlus = document.createElement('i');
  iconPlus.classList.add('icon-addPost');
  iconPlus.classList.add('btn-addPost__text');

  const textBtn = document.createElement('span');
  textBtn.textContent = 'Criar Post';
  // textBtn.classList.add('btn-addPost__text-small');
  textBtn.classList.add('btn-addPost__text--small');

  const buttonContent = document.createElement('div');
  buttonContent.classList.add('btn-addPost__text--centered');
  buttonContent.append(textBtn);
  buttonContent.append(iconPlus);

  buttonAddPost.append(buttonContent);
  // buttonAddPost.append(iconPlus);

  buttonAddPost.addEventListener('click', () => {
    abrirModalCreatePost();
  });

  containerBemVinda.append(photoContainer);
  photoContainer.append(buttonAddPost);

  return contentWelcome;
}

export function obterUsuario(userId, userPhoto, userName) {
  return getUserData(userId)
    .then((user) => {
      const name = userName;
      const photo = userPhoto;
      photo.src = user.user_photo;
      name.textContent = `What's on your mind, ${user.user_name}?`;
    });
}
