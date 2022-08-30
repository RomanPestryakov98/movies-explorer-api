const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const { errors } = require('celebrate');
const helmet = require('helmet');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const { dataMovies, PORT } = require('./utils/constants');
const router = require('./routes/index');
const errorHandler = require('./middlewares/errorHandler');
const rateLimiter = require('./middlewares/rateLimit');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

mongoose.connect(dataMovies, {
  useNewUrlParser: true,
});
app.use(cookieParser());
app.use(requestLogger);
app.use(helmet());
app.use(rateLimiter);

app.use('/', router);

app.use(errorLogger);

app.use(errors());
app.use(errorHandler);

app.listen(PORT);
