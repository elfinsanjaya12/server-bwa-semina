const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

const usersRouter = require('./app/api/v1/users/router');
const authRouter = require('./app/api/v1/auth/router');
const categoriesRouter = require('./app/api/v1/categories/router');

// middlewares
const notFoundMiddleware = require('./app/middlewares/not-found');
const handleErrorMiddleware = require('./app/middlewares/handler-error');

const app = express();

const versionV1 = '/api/v1';

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
  res.json({ message: 'Welcome to api semina' });
});

app.use(`${versionV1}`, usersRouter);
app.use(`${versionV1}/auth`, authRouter);
app.use(`${versionV1}/categories`, categoriesRouter);

// middlewares
app.use(notFoundMiddleware);
app.use(handleErrorMiddleware);

module.exports = app;
