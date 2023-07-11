const express = require('express');
const mongoose = require("mongoose");
const path = require('path');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
require('dotenv').config();

const cors = require('cors');

const swaggerUi = require('swagger-ui-express')
const swaggerFile = require('./swagger_output.json')


const BackendUsers = require('./routes/BackendUsers');
const BackendTasks = require('./routes/BackendTasks');
const BackendMisc = require('./routes/BackendMisc');

const app = express();

app.use(cors({origin: true}));

app.engine('html', require('ejs').renderFile);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'html');

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/backend/users', BackendUsers);
app.use('/backend/tasks', BackendTasks);
app.use('/backend/misc', BackendMisc);

const swaggerOptions = {
  customCss: '.swagger-ui .topbar { display: none }',
  customSiteTitle : 'GPAC API Documentation', 
  customfavIcon: '/assets/favicon.ico'
}

app.use('/', swaggerUi.serve, swaggerUi.setup(swaggerFile, swaggerOptions))

app.use((req, res, next) => {
  let err = new Error('Not Found');
  err.status = 404;
  next(err);
});

app.use((err, req, res) => {
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  res.status(err.status || 500);
  res.render('error');
});

const mongoURI = process.env.MONGO_URI
mongoose.connect(
  mongoURI,
  { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false },
  (err) => {
    if (err) {
      console.log(err);
      console.log("Failed connecting to MongoDB");
    } else {
      console.log("Connection successfull to MongoDB");
    }
  }
);
mongoose.Promise = global.Promise;

module.exports = app;
