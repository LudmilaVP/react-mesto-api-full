const BASE_URL = 'https://api.domainname.plv.nomoredomains.club';

function _getResponse(res) {
  if (res.ok) {
    return res.json();
  }
  return Promise.reject(`Ошибка: ${res.status}`);
}

export const login = (email, password) => {
  return fetch(`${BASE_URL}/signup`, {
    method: 'POST',
    credentials: 'include',
    headers: { 
      'Content-Type': 'application/json' },
    body: JSON.stringify({ password, email })
  })
    .then(res => _getResponse(res))
}

export const getContent = () => {
  return fetch(`${BASE_URL}/users/me`, {
    method: 'GET',
    credentials: 'include',
    headers: {      
      'Content-Type': 'application/json'
    }
  })
  .then(res => _getResponse(res))
};

export const authorization = (email, password) => {
  return fetch(`${BASE_URL}/signin`, {
    method: 'POST',
    credentials: 'include',
    headers: { 
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
      'Content-Type': 'application/json'
    },
  })
    .then(res => _getResponse(res));
};
