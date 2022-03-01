import {lockScrollY, unlockScrollY} from "../utils/scrollControl";

export default class Popup {

constructor(popupSelector) {
  this.popup = document.querySelector(popupSelector);
}

  openPopup() {
    this.popup.classList.add('pop-up_opened');
    lockScrollY();
    document.addEventListener('keydown', this._handleEscClose);
  }
  
  closePopup() {
    this.popup.classList.remove('pop-up_opened');
    unlockScrollY();
    document.removeEventListener('keydown', this._handleEscClose);
  }
  
  _handleEscClose = (evt) => {
    if (evt.key === 'Escape') {
      this.closePopup.call(this);
    }
  };
  
  setEventListeners(){
    this.popup.addEventListener('mousedown', (evt) => {
      if (evt.target.classList.contains('pop-up_opened')) {
        this.closePopup()
      }
      if (evt.target.classList.contains('pop-up__close')) {
        this.closePopup()
      }})
  }
}