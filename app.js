const express = require('express');
const app = express();

const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const morgan = require('morgan');
// const moment = require('moment');
const router = express.Router();
const path = require('path');

app.use(morgan('dev'));
app.use(express.static(path.join(__dirname, './static')));
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.set('views', path.join(__dirname, './views'));
app.set('view engine', 'ejs');

const userRoutes = require('./routes/users');
app.use('/', userRoutes);


// Set up mongoose
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/dash_db');

// express CORS
app.use((req, res, next) => {
  res.header('Acess-Control-Allow-Origin', '*');
  res.header('Acess-Control-Allow-Headers', '*');
  if (req.method === 'OPTIONS') {
    res.header('Acess-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
    return res.status(200).json({});
  }
  next();
});


// set up error messages if no routes exist to handle incoming requests
app.use((req, res, next) => {
  const error = new Error("Not found");
  error.status = 404;
  next(error);
});

app.use((error, req, res, next) => {
  res.status(error.status || 500);
  res.json({
    error: {
      message: error.message
    }
  });
});

// export app module to server
module.exports = app;
