import './styles/index.css';
import {validationSettings, config, newCardSelector, profileAddBtn, profileEditBtn, avatarEl} from './utils/constants.js';
import Api from './components/Api.js';
import FormValidator from './components/FormValidator.js';
import Card from "./components/Card.js";
import Section from './components/Section.js'
import UserInfo from './components/UserInfo.js';
import PopupWithForm from './components/PopupWithForm.js';
import PopupWithImage from './components/PopupWithImage.js';
import {changeAvatar, handleAddFormSubmit, handleEditFormSubmit, zoomPicture, handleLikes, deleteCardHandler} from './utils/utils.js'
import PopupWithoutForm from './components/PopupWithoutForm';

//RENDER PROFILE AND INITIAL CARDS
export const api = new Api (config);

export const userInfo = new UserInfo(
  {userNameSelector: '.profile__name',
  userDescSelector: '.profile__subline',
  userAvatarSelector: '.profile__avatar'});

export const cardsSection = new Section({
  renderer : (card) =>{
     const newCard = new Card(card, zoomPicture, handleLikes, deleteCardHandler, newCardSelector);
    return newCard;
  }}, `.elements__list`);

Promise.all([api.getUserData(), api.renderInitialCards()])
  .then(values => {
    userInfo._id = values[0]._id;
    userInfo.setUserInfo(values[0].name, values[0].about, values[0].avatar)
    userInfo.renderUserInfo();
    userInfo.renderAvatar();
    updateEditForm();
    
    values[1].forEach(card => {
      const newCard = cardsSection.render(card);
      cardsSection.addItem(newCard.cardEl, true)
    })
  })
  .catch((err) => {
    console.log(err);
    errorPopup.openPopup();
  });

// EDIT PROFILE
export const profileEditPopup = new PopupWithForm('.pop-up_type_edit-profile', handleEditFormSubmit);
profileEditPopup.setEventListeners();


//EDIT AVATAR
export const avatarPopup = new PopupWithForm('.pop-up_type_avatar', changeAvatar);
avatarPopup.setEventListeners();

// ADD NEW PLACE
export const profileAddPopup = new PopupWithForm('.pop-up_type_add-card', handleAddFormSubmit);
profileAddPopup.setEventListeners();

//SHOW PICTURE
export const imgPopup = new PopupWithImage('.pop-up_type_img', '.pop-up__img', '.pop-up__caption');
imgPopup.setEventListeners();

//ERROR POPUP
export const errorPopup = new PopupWithoutForm('.pop-up_type_error', '.pop-up__submit-btn', ()=>this.popup.closePopup())
errorPopup.setEventListeners();

// CONFIRM DELETION
export const confirmDeletePopup = new PopupWithoutForm('.pop-up_type_confirm',
  '.pop-up__submit-btn_place_confirmation', null);
confirmDeletePopup.setEventListeners();

//EVENT-LISTENERS

profileAddBtn.addEventListener('click',() => {
  formValidators['add-place-form'].resetValidation();
  profileAddPopup.openPopup();
});
profileEditBtn.addEventListener('click', () => {
  formValidators['edit-profile-form'].resetValidation();
  updateEditForm();
  profileEditPopup.openPopup();
});
avatarEl.addEventListener('click', ()=> {
  formValidators['avatar'].resetValidation();
  avatarPopup.openPopup();
});

// FORMS VALIDATION
const formValidators = {}

// Включение валидации
const enableValidation = (config) => {
  const formList = Array.from(document.querySelectorAll(config.formSelector))
  formList.forEach((formElement) => {
    const validator = new FormValidator(config, formElement)
    const formName = formElement.getAttribute('name')
    
    formValidators[formName] = validator;
    validator.enableValidation();
  });
};

enableValidation(validationSettings);

function updateEditForm (){
  const {userName, userDesc} = userInfo.getUserInfo();
  const elements = profileEditPopup.getFormElements();
  elements.heading.value = userName;
  elements.subheading.value = userDesc;
}