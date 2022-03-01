import {
  api,
  profileEditPopup,
  avatarPopup,
  profileAddPopup,
  userInfo,
  cardsSection,
  errorPopup,
  imgPopup, confirmDeletePopup
} from '../index.js'
import {avatarPicture} from "./constants";


//Avatar
export function changeAvatar(){
  avatarPopup.renderProcessing(true);
  const elements = avatarPopup.getFormElements();
  const link = elements['avatar-url'].value;
  
  api.updateAvatar(link)
    .then(data=>{
      userInfo.renderAvatar(data.avatar);
      avatarPopup.closePopup();
      avatarPopup.form.reset();
    })
    .catch(err => {
      console.log(err);
      errorPopup.openPopup();
    })
    .finally(()=>avatarPopup.renderProcessing(false))
}

//Edit profile
export function handleEditFormSubmit() {
  profileEditPopup.renderProcessing(true);
  const elements = profileEditPopup.getFormElements();
  const userNameVal = elements.heading.value;
  const userDescVal = elements.subheading.value;
  api.updateUserInfo(userNameVal, userDescVal)
    .then((data)=> {
      userInfo.renderUserInfo(data.name, data.about, data.avatar);
      profileEditPopup.closePopup();
    })
    .catch(err => {
      errorPopup.openPopup();
      console.log(err);
    })
    .finally(()=> profileEditPopup.renderProcessing(false))
}

//Add new Card
export function handleAddFormSubmit() {
  profileAddPopup.renderProcessing(true);
  const elements = profileAddPopup.getFormElements();
  const placeName = elements['place-heading'].value;
  const placeLink = elements['place-url'].value;
  api.updateCards(placeName, placeLink)
    .then(card=> {
      const newCard = cardsSection.render(card);
      cardsSection.addItem(newCard.cardEl, false)
      profileAddPopup.form.reset();
      profileAddPopup.closePopup();
    })
    .catch(err => {
      console.log(err);
      errorPopup.openPopup();
    })
  .finally(()=>   profileAddPopup.renderProcessing(false));
}

//Handle likes
export function handleLikes(card){
  if (!card._isLiked) {
    api.addLike(card._cardId)
      .then(data => {
        card._toggleLikes();
        card._updateLikes(data);
      })
      .catch(err => {
        console.log(err);
        openPopup(errorPopup);
      })
  } else {
    api.removeLike(card._cardId)
      .then(data => {
        card._toggleLikes();
        card._updateLikes(data);
      })
      .catch(err => {
        console.log(err);
        openPopup(errorPopup);
      })
  }
}

//Zoom Pix
export function zoomPicture(){
  imgPopup.openPopup(this._name, this._link)
}

// DELETE CARD
export function deleteCardHandler() {
 confirmDeletePopup.clearEventListeners();
  confirmDeletePopup.handleClick = deleteCard.bind(this);
  confirmDeletePopup.openPopup();
}

export function deleteCard(){
  api.deleteCardFromServer(this._cardId)
    .then(() => {
      this.removeFromDOM();
      confirmDeletePopup.closePopup();
    })
    .catch(err => {
      console.log(err);
      errorPopup.openPopup();
    })
}