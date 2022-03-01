export default class UserInfo {
  
  constructor({userNameSelector, userDescSelector, userAvatarSelector}) {
    this.userNameEl = document.querySelector(userNameSelector);
    this.userDescEl = document.querySelector(userDescSelector);
    this.userAvatarEl = document.querySelector(userAvatarSelector);
  }
  
  getUserInfo(){
    return {userName: this.name, userDesc: this.desc}
  }
  
  getUserId(){
    return this._id;
  }
  
  setUserInfo(newName, newDesc, newAvatar = this.avatarLink){
    this.name = newName;
    this.desc = newDesc;
    this.avatarLink = newAvatar;
  }
  
  renderUserInfo(newName = this.name, newDesc = this.desc){
    this.userNameEl.textContent = newName;
    this.userDescEl.textContent = newDesc;
  }
  
  renderAvatar(newAvatar = this.avatarLink){
    this.userAvatarEl.src = newAvatar;
  }
}