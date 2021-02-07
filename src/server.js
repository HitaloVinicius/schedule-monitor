require('dotenv').config();
const express = require('express');
const logger = require('morgan');

const server = express();
server.use(express.json());
server.use(logger('dev'));

const userRouter = require('./routes/user');

server.use('/users', userRouter);

const { PORT } = process.env;

server.listen(PORT, () => {
  console.log(`Running on port ${PORT}.`);
});