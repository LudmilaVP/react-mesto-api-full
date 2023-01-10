class Api {
  constructor(options) {
    this._baseUrl = options.baseUrl;
    this._headers = options.headers;
  }

  _getResponse(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  }
  //Загрузка информации о пользователе с сервера
  getUserProfile() {
    return fetch(`${this._baseUrl}/users/me`, {
      credentials: 'include',
      method: "GET",
      headers: this._headers,
    }).then(this._getResponse);
  }
  //Загрузка карточек с сервера
  getInitialCards() {
    return fetch(`${this._baseUrl}/cards`, {
      credentials: 'include',
      method: "GET",
      headers: this._headers,
    }).then(this._getResponse);
  }
  //Редактирование профиля
  setUserProfile(data) {
    return fetch(`${this._baseUrl}/users/me`, {
      credentials: 'include',
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({
        name: data.name,
        about: data.about,
      }),
    }).then(this._getResponse);
  }
  //Добавление новой карточки
  addNewCard(data) {
    return fetch(`${this._baseUrl}/cards`, {
      credentials: 'include',
      method: "POST",
      headers: this._headers,
      body: JSON.stringify({
        name: data.name,
        link: data.link,
      }),
    }).then(this._getResponse);
  }
  //Удаление карточки
  removeCard(id) {
    return fetch(`${this._baseUrl}/cards/${id}`, {
      credentials: 'include',
      method: "DELETE",
      headers: this._headers,
    }).then(this._getResponse);
  }
  //Постановка и снятие лайка
  changeLikeCardStatus(id, isLiked) {
    return fetch(`${this._baseUrl}/cards/likes/${id}`, {
      credentials: 'include',
        method: isLiked ? "DELETE" : "PUT",
        headers: this._headers
      }).then(this._getResponse)
  }

  //Обновление аватара пользователя
  updateUserAvatar(data) {
    return fetch(`${this._baseUrl}/users/me/avatar`, {
      credentials: 'include',
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({
        avatar: data.avatar,
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