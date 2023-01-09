const jwt = require('jsonwebtoken');
const AuthError = require('../errors/AuthError.js');

const { NODE_ENV, JWT_SECRET } = process.env;
require('dotenv').config();

const auth = (req, res, next) => {
  const token = req.cookies.jwt;
  let payload;
  try {
    payload = jwt.verify(token, NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret');
  } catch (e) {
    next(new AuthError('Отказ в доступе'));
  }
  req.user = payload;
  next();
};

module.exports = auth;
