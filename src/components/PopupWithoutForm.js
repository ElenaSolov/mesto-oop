import Popup from "./Popup";

export default class  PopupWithoutForm extends Popup{
  constructor(popupSelector, btnSelector, btnHandler){
    super(popupSelector);
    this.btn = document.querySelector(btnSelector);
    this.handleClick = btnHandler;
  }
  
  openPopup() {
    super.openPopup();
    this.clearEventListeners();
    this.btn.addEventListener('click', this.handleClick)
  }
  clearEventListeners(){
    this.btn.removeEventListener('click', this.handleClick);
  }
}