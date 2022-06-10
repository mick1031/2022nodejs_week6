var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const bcrypt = require('bcryptjs');
const validator = require('validator');

dotenv.config({ path: './config.env' });
require('./connections/index');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);

module.exports = app;


// bcrypt.hash('1q2w3e4r', 12)
//     .then(res => console.log(res))

// bcrypt.compare('1q2w3e4r', '$2a$12$MwVuQWtEMPWP50Wpp2hYger3UjilSAaaBuOaaXf1TKS3CP14zqpC6')
//     .then(res => console.log(res))

// console.log(validator.isEmail('testgmail.com'));
// console.log(validator.isLength('123456789', { min: 8 }));

