require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const cookieParser = require('cookie-parser');
const { errors } = require('celebrate');
const routes = require('./routes');
const { requestLogger, errorLogger } = require('./middlewares/logger');

const { PORT = 3000 } = process.env;
const app = express();
const DATABASE_URL = 'mongodb://127.0.0.1:27017/mestodb';
const auth = require('./middlewares/auth');
const handleError = require('./middlewares/handleError');
const { createUserValidator, loginValidator } = require('./middlewares/validators');
const { createUser, login, logout } = require('./controllers/users');
const corsOption = require('./middlewares/cors');

app.use(express.json());
app.use(cookieParser());
app.use(requestLogger);
app.use(cors(corsOption));
app.get('/crash-test', () => {
  setTimeout(() => {
    throw new Error('Сервер сейчас упадёт');
  }, 0);
});
app.post('/signin', loginValidator, login);
app.get('/onlogout', logout);
app.post('/signup', createUserValidator, createUser);
app.use(auth);
app.use(routes);
app.use(errorLogger);
app.use(errors());
app.use(handleError);

mongoose.connect(DATABASE_URL)
  .then(() => {
    console.log(`Connected to database on ${DATABASE_URL}`);
  })
  .catch((err) => {
    console.log('Error on database connection');
    console.error(err);
  });

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
