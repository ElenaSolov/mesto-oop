export default class Api {
  
  constructor(options) {
  this.config = options;
  }
  
  sendRequest (url, method, body){
    return fetch(url, {
      method: method,
      headers: this.config.headers,
      body: body
    })
      .then(res => {
        if(res.ok) {
          return res.json();
        }
        Promise.reject(`Ошибка: ${res.status}`);
      })
  }
  
  getUserData () {
    return this.sendRequest(`${this.config.baseUrl}/users/me`, 'GET', null);
  }
  
  updateUserInfo(newName, newTitle) {
    const body = JSON.stringify({
      name: newName,
      about: newTitle
    });
    return this.sendRequest(`${this.config.baseUrl}/users/me`,'PATCH',body);
  }
  
  renderInitialCards() {
    return this.sendRequest(`${this.config.baseUrl}/cards`, 'GET', null);
  }
  
  updateCards(cardName, cardLink){
    const body = JSON.stringify({
      name: cardName,
      link: cardLink
    });
    return this.sendRequest(`${this.config.baseUrl}/cards`, 'POST', body);
  }
  
  deleteCardFromServer(cardId) {
    return this.sendRequest(`${this.config.baseUrl}/cards/${cardId}`, 'DELETE');
  }
  
  addLike(cardId){
    return this.sendRequest(`${this.config.baseUrl}/cards/likes/${cardId}`, 'PUT', null);
  }
  
  removeLike(cardId){
    return this.sendRequest(`${this.config.baseUrl}/cards/likes/${cardId}`, 'DELETE', null);
  }
  
  updateAvatar(link){
    const body = JSON.stringify({avatar:link});
    return this.sendRequest(`${this.config.baseUrl}/users/me/avatar`, 'PATCH', body);
  }
}

