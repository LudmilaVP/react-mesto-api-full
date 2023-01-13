class Api {
  constructor({baseUrl, headers}) {
    this.baseUrl = baseUrl;
    this.headers = headers;
  }

  _getResponse(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  }
  //Загрузка информации о пользователе с сервера
  getUserProfile() {
    return fetch(`${this.baseUrl}/users/me`, {
      credentials: 'include',
      headers: this.headers,
    })
    .then(this._getResponse);
  }
  //Загрузка карточек с сервера
  getInitialCards() {
    return fetch(`${this.baseUrl}/cards`, {
      credentials: 'include',
      headers: this.headers,
    }).then(this._getResponse);
  }
  //Редактирование профиля
  setUserProfile({ name, about }) {
    return fetch(`${this.baseUrl}/users/me`, {
      method: "PATCH",
      credentials: 'include',
      headers: this.headers,
      body: JSON.stringify({
        name: name,
        about: about,
      }),
    }).then(this._getResponse);
  }
  //Добавление новой карточки
  addNewCard({ name, link }) {
    return fetch(`${this.baseUrl}/cards`, {
      method: "POST",
      credentials: 'include',
      headers: this.headers,
      body: JSON.stringify({
        name: name,
        link: link,
      }),
    }).then(this._getResponse);
  }
  //Удаление карточки
  removeCard(cardId) {
    return fetch(`${this.baseUrl}/cards/${cardId}`, {
      method: "DELETE",
      credentials: 'include',
      headers: this.headers,
    }).then(this._getResponse);
  }
  //Постановка и снятие лайка
  likePut(cardId) {
    return fetch (`${this.url}/cards/${cardId}/likes`,{
        credentials: 'include',
        method: 'PUT',
        headers: this.headers,
    })
    .then(this._checkResponse)
};

likeUnPut(cardId) {
    return fetch (`${this.url}/cards/${cardId}/likes`,{
        credentials: 'include',
        method: 'DELETE',
        headers: this.headers,
    })
    .then(this._checkResponse)
};

  //Обновление аватара пользователя
  updateUserAvatar({avatar}) {
    return fetch(`${this.baseUrl}/users/me/avatar`, {
      method: "PATCH",
      credentials: 'include',
      headers: this.headers,
      body: JSON.stringify({
        avatar: avatar,
      }),
    }).then(this._getResponse);
  }
}
const api = new Api({
  baseUrl: "https://api.domainname.plv.nomoredomains.club",
  headers: {
    "Content-Type": "application/json",
  },
});
export default api;