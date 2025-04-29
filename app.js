import express from 'express';
import { PORT } from './config/env.js';

const app = express();

app.get('/', (req, res) => {
    res.send('Welcome to Subscription Tracker API !');
});

app.listen(PORT, () => {
    console.log(`Subscription Tracker API is running on http://localhost:${PORT}`);
})

export default app;
// var express = require('express');
// var path = require('path');
// var cookieParser = require('cookie-parser');
// var logger = require('morgan');

// var indexRouter = require('./routes/index');
// var usersRouter = require('./routes/users');

// var app = express();

// app.use(logger('dev'));
// app.use(express.json());
// app.use(express.urlencoded({ extended: false }));
// app.use(cookieParser());
// app.use(express.static(path.join(__dirname, 'public')));

// app.use('/', indexRouter);
// app.use('/users', usersRouter);

// module.exports = app;
