import {newCardTemplate} from '../utils/constants.js';
import {userInfo} from "../index.js";

export default class Card {
  
  constructor({likes, _id, name, link, owner}, handlePictureClick, handleLikes, deleteCardHandler, selector) {
    this._name = name;
    this._link = link;
    this._likes = likes;
    this._cardId = _id;
    this._ownerId = owner._id;
    this._isLiked = this._checkIsLiked();
    this._selector = selector;
    this._isOwner = userInfo.getUserId() === this._ownerId;
    this.cardEl = this._createDOMEl();
    this._handlePictureClick = handlePictureClick;
    this._handleLikes = handleLikes;
    this._handleCardDelete = deleteCardHandler;
  }
  
  //DOM
  _createDOMEl() {
    const newCard = newCardTemplate.querySelector(this._selector).cloneNode(true);
    const cardImg = newCard.querySelector('.element__img');
    cardImg.src = this._link;
    cardImg.alt = this._name;
    cardImg.addEventListener('click', ()=> this._handlePictureClick());
    newCard.querySelector('.element__text').textContent = this._name;
    newCard.querySelector('.element__likes-number').textContent = this._likes.length;
    if (this._isOwner) {
      const deleteBtn = newCard.querySelector('.element__delete');
      deleteBtn.classList.add('element__delete_active');
      deleteBtn.addEventListener('click', ()=> this._handleCardDelete(this));
      }
    this._likeBtn = newCard.querySelector('.element__like');
  
    if (this._isLiked) {
      this._likeBtn.classList.add('element__like_active');
    }
    this._likeBtn.addEventListener('click', ()=> this._handleLikes);
    return newCard;
  }
  
  removeFromDOM = () => this.cardEl.remove();
  
  
  //LIKES
  _checkIsLiked() {
    if (this._likes.length > 0) {
      const myId = userInfo.getUserId();
      return this._likes.some(like => like._id === myId);
    }
    return false;
  }
  
  _toggleLikes() {
    this._isLiked = !this._isLiked;
    this._likeBtn.classList.toggle('element__like_active');
  }
  
  _updateLikes(data){
    this._likes = data.likes;
    this.cardEl.querySelector('.element__likes-number').textContent = this._likes.length;
  }
}
