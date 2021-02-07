require('dotenv').config();
const express = require('express');
const logger = require('morgan');

const server = express();
server.use(express.json());
server.use(logger('dev'));

const userRouter = require('./routes/user');
const eventRouter = require('./routes/event');
const authRouter = require('./routes/auth');

server.use('/users', userRouter);
server.use('/events', eventRouter);
server.use('/auth', authRouter);

const { PORT } = process.env;

server.listen(PORT, () => {
  console.log(`Running on port ${PORT}.`);
});