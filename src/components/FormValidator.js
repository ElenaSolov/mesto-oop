export default class FormValidator {
  
  constructor(settings, formEl){
    this.inputSelector = settings.inputSelector;
    this.submitBtnSelector = settings.submitBtnSelector;
    this.inactiveBtnClass = settings.inactiveBtnClass;
    this.inputErrorClass = settings.inputErrorClass;
    this.errorClass = settings.errorClass;
    this.form = formEl;
    this._inputList = Array.from(this.form.querySelectorAll(this.inputSelector));
    this.submitBtn = this.form.querySelector(this.submitBtnSelector);
  }
  
  enableValidation () {
  this.form.addEventListener('submit',  (evt)=>evt.preventDefault());
  this._setEventListeners();
  }
  
  resetValidation() {
    this._toggleBtnState();
    
    this._inputList.forEach((inputElement) => {
      const errorElement = this.form.querySelector(`.pop-up__input-error_place_${inputElement.id}`);
      this._hideInputError(inputElement, errorElement);
    });
  }
  
   _setEventListeners (){
    this._toggleBtnState();
    this._inputList.forEach(input => {
      input.addEventListener('input', ()=> {
        this._checkInputValidity(input);
        this._toggleBtnState();
    })
  })
  }
  
   _toggleBtnState () {
    if(this._hasInvalidInput()) {
    this._disableSubmitBtn();
    } else {
      this.submitBtn.classList.remove(this.inactiveBtnClass);
      this.submitBtn.removeAttribute('disabled');
    }
  }
  
   _checkInputValidity(input) {
    if (!input.validity.valid) {
      this._showInputError(input, input.validationMessage);
    } else {
    this._hideInputError(input);
    }
  }
  
  _showInputError(input, errorMessage) {
    const errorElement = this.form.querySelector(`.pop-up__input-error_place_${input.id}`);
    input.classList.add(this.inputErrorClass);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(this.errorClass);
  }
  
   _hideInputError(input) {
    const errorElement = this.form.querySelector(`.pop-up__input-error_place_${input.id}`);
    input.classList.remove(this.inputErrorClass);
    errorElement.classList.remove(this.errorClass);
  }
  
   _hasInvalidInput (){
    return this._inputList.some(input => !input.validity.valid);
  }
  
   _disableSubmitBtn(){
    this.submitBtn.classList.add(this.inactiveBtnClass);
    this.submitBtn.setAttribute('disabled', '');
  }
}