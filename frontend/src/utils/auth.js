const BASE_URL = 'https://api.domainname.plv.nomoredomains.club';

class Auth {
  constructor(url) {
    this._url = url;
    this._headers = {
      "Content-Type": "application/json",
    };
  }
  _getResponse(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  }

  authorization = (email, password) => {
    return fetch(`${BASE_URL}/signin`, {
      method: 'POST',
      credentials: 'include',
      headers: this._headers,
      body: JSON.stringify({
        password,
        email,
      }),
    })
      .then(this._getResponse)
  }

  login = (email, password) => {
    return fetch(`${BASE_URL}/signup`, {
      method: 'POST',
      credentials: 'include',
      headers: this._headers,
      body: JSON.stringify({
        password,
        email,
      }),
    })
      .then(this._getResponse)
  }

  logout = () => {
    return fetch(`${BASE_URL}/onlogout`, {
      method: "GET",
      credentials: 'include',
      headers: this._headers,
    })
      .then(this._getResponse);
  };

  getContent = () => {
    return fetch(`${BASE_URL}/users/me`, {
      method: 'GET',
      credentials: 'include',
      headers: this._headers,
    })
      .then(this._getResponse)
  }
}

const auth = new Auth(BASE_URL);

export default auth;