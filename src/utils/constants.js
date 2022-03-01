export const page = document.querySelector('.page');

export const profileEditBtn = page.querySelector('.profile__edit-btn');

export const newCardTemplate = page.querySelector('#card-template').content;
export const newCardSelector = '.element';
export const profileAddBtn = page.querySelector('.profile__add-btn');

export const avatarPicture = page.querySelector('.profile__avatar');
export const avatarEl = page.querySelector('.profile__avatar-container');

export const validationSettings = {
  formSelector: '.pop-up__form',
  inputSelector: '.pop-up__input',
  submitBtnSelector: '.pop-up__submit-btn',
  inactiveBtnClass: 'pop-up__submit-btn_inactive',
  inputErrorClass: 'pop-up__input_invalid',
  errorClass: 'pop-up__input-error_active'
}

export const config = {
  baseUrl: 'https://mesto.nomoreparties.co/v1/plus-cohort-6',
  headers: {
    authorization: '791f7307-c481-4d9c-81d1-c554dbe0a5da',
    'Content-Type': 'application/json'
  }
}


