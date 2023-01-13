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

  authorization ({ password, email }) {
    return fetch(`${this._url}/signin`, {
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

  login ({ password, email }) {
    return fetch(`${this._url}/signup`, {
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

  logout () {
    return fetch(`${this._url}/onlogout`, {
      method: "GET",
      credentials: 'include',
      headers: this._headers,
    })
      .then(this._getResponse);
  };
}

const auth = new Auth(BASE_URL);

export default auth;