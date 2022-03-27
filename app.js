const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors = require('cors');

const usersRouter = require('./app/api/v1/users/router');
const authRouter = require('./app/api/v1/auth/router');
const categoriesRouter = require('./app/api/v1/categories/router');
const speakersRouter = require('./app/api/v1/speakers/router');
const eventsRouter = require('./app/api/v1/events/router');
const paymentsRouter = require('./app/api/v1/payments/router');
const participantsRouter = require('./app/api/v1/participants/router');
const transactionsRouter = require('./app/api/v1/transactions/router');

// middlewares
const notFoundMiddleware = require('./app/middlewares/not-found');
const handleErrorMiddleware = require('./app/middlewares/handler-error');

const app = express();

const versionV1 = '/api/v1';

app.use(cors());
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
app.use(`${versionV1}/speakers`, speakersRouter);
app.use(`${versionV1}/events`, eventsRouter);
app.use(`${versionV1}/payments`, paymentsRouter);
app.use(`${versionV1}`, participantsRouter);
app.use(`${versionV1}/transactions`, transactionsRouter);

// middlewares
app.use(notFoundMiddleware);
app.use(handleErrorMiddleware);

module.exports = app;
