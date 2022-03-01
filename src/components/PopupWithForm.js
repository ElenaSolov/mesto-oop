import Popup from "./Popup.js";

export default class PopupWithForm extends Popup{

constructor(popupSelector, handleFormSubmitFunction) {
  super(popupSelector);
  this.handleFormSubmitFunction = handleFormSubmitFunction;
  this.form = this.popup.querySelector('form');
  this.btn = this.form.querySelector('.pop-up__submit-btn');
}

  getFormElements(){
  return this.form.elements;
  }
  
  setEventListeners() {
    super.setEventListeners();
    this.form.addEventListener('submit', this.handleFormSubmitFunction)
  }
  
  //UX Show Form Processing
  renderProcessing(isProcessing) {
    isProcessing ? this.btn.textContent = 'Сохранение...' : this.btn.textContent = 'Сохранить';
  }
}