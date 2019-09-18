const express = require('express');
const path = require('path');
const favicon = require('serve-favicon');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);
const cors = require('cors');
require('dotenv').config();

const auth = require('./routes/auth');
const growthModel = require('./routes/growth-model')
const user = require('./routes/user')
const team = require('./routes/team')
const checkpoint = require('./routes/checkpoint')
const finalCompass = require('./routes/final-compass')

// MONGOOSE CONNECTION
mongoose.connect(process.env.MONGODB_URI, {
  keepAlive: true,
  useNewUrlParser: true,
  reconnectTries: Number.MAX_VALUE
}).then(() => {
  console.log(`Connected to database`);
}).catch((error) => {
  console.error(error);
})

// EXPRESS SERVER INSTANCE
const app = express();

// CORS MIDDLEWARE SETUP
app.use(cors({
  credentials: true,
  origin: [process.env.PUBLIC_DOMAIN, 'http://skillsamp.herokuapp.com/']
}));
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', 'https://skillsamp.herokuapp.com/');
  // res.setHeader('Access-Control-Allow-Methods', 'GET,PUT,POST,OPTIONS,DELETE');
  // res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  // res.setHeader('Access-Control-Allow-Credentials', true);
  next();
});

// SESSION MIDDLEWARE
app.use(session({
  store: new MongoStore({
    mongooseConnection: mongoose.connection,
    ttl: 24 * 60 * 60 // 1 day
  }),
  secret: process.env.SECRET_SESSION,
  resave: true,
  saveUninitialized: true,
  cookie: {
    maxAge: 24 * 60 * 60 * 1000
  }
}));

// MIDDLEWARE
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// ROUTER MIDDLEWARE
app.use('/auth', auth);
app.use('/growth-model', growthModel)
app.use('/user', user)
app.use('/team', team)
app.use('/checkpoint', checkpoint)
app.use('/final-compass', finalCompass)


// catch 404 and forward to error handler
app.use((req, res, next) => {
  res.status(404).json({ code: 'not found' });
});

app.use((err, req, res, next) => {
  // always log the error
  console.error('ERROR', req.method, req.path, err);

  // only render if the error ocurred before sending the response
  if (!res.headersSent) {
    const statusError = err.status || '500' 
    res.status(statusError).json(err);
  }
});

// REACT APP index.html	
app.use((req, res, next) => {
  // If no routes match, send them the React HTML.
  res.sendFile(__dirname + "/public/index.html");
});

module.exports = app;
