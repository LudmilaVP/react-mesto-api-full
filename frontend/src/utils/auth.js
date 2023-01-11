const BASE_URL = 'https://api.domainname.plv.nomoredomains.club';

function _getResponse(res) {
  if (res.ok) {
    return res.json();
  }
  return Promise.reject(`Ошибка: ${res.status}`);
}

export const register = (email, password) => {
  return fetch(`${BASE_URL}/signup`, {
    method: 'POST',
    headers: { 
      'Origin': 'https://domainname.plv.nomoredomains.club',
      'Accept': 'application/json',
      'Content-Type': 'application/json' },
    body: JSON.stringify({ password, email })
  })
    .then(res => _getResponse(res))
}

export const authorization = (email, password) => {
  return fetch(`${BASE_URL}/signin`, {
    method: 'POST',
    credentials: 'include',
    headers: { 
      'Origin': 'https://domainname.plv.nomoredomains.club',
      'Accept': 'application/json',
      'Content-Type': 'application/json'
     },
    body: JSON.stringify({ password, email })
  })
    .then(res => _getResponse(res))
}

export const logout = () => {
  return fetch(`${BASE_URL}/onlogout`, {
    method: 'POST',
    credentials: 'include',
    headers: {
      'Origin': 'https://domainname.plv.nomoredomains.club',
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
  })
    .then(res => _getResponse(res));
};
