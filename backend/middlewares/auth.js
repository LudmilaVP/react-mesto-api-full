const jwt = require('jsonwebtoken');
const AuthError = require('../errors/AuthError.js');

const { NODE_ENV, JWT_SECRET } = process.env;

const auth = (req, res, next) => {
  const token = req.cookies.jwt;
  let payload;
  try {
    payload = jwt.verify(token, NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret');
  } catch (e) {
    next(new AuthError('Передан неверный логин или пароль'));
  }
  req.user = payload;
  return next();
};

module.exports = auth;
