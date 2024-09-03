const express = require('express');
const app = express();
const mongoose = require('mongoose');
const passport = require('passport');
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);
const methodOverride = require("method-override");
const morgan = require('morgan');
const exphbs = require('express-handlebars');
const flash = require('express-flash');
const logger = require('morgan');
const connectDB = require('./config/database');
const mainRoutes = require('./routes/main');
const talesRoutes = require('./routes/tales');

require('dotenv').config({path: './config/.env'});

// Passport config
require('./config/passport')(passport);

connectDB();

app.use(express.static('public'));

//Body Parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//Logging
app.use(logger('dev'));

//Use forms for put/delete
app.use(methodOverride("_method"));

// Logging
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'))
}

// Handlebars Helpers
const {
  formatDate,
  stripTags,
  truncate,
  editIcon,
  select,
} = require('./helpers/hbs')

// Handlebars
app.engine(
  '.hbs',
  exphbs.engine({
    helpers: {
      formatDate,
      stripTags,
      truncate,
      editIcon,
      select,
    },
    defaultLayout: 'main',
    extname: '.hbs',
  })
)
app.set('view engine', '.hbs')

// Sessions - stored in MongoDB
app.use(
    session({
      secret: 'keyboard cat',
      resave: false,
      saveUninitialized: false,
      store: new MongoStore({ mongooseConnection: mongoose.connection }),
    })
  );
  
// Passport middleware
app.use(passport.initialize());
app.use(passport.session())

//Use flash messages for errors, info, etc.
app.use(flash());
  
//Setup routes for which the server is listening
app.use('/', mainRoutes);
app.use('/tales', talesRoutes);

//Server running
app.listen(process.env.PORT, () => {
    console.log('Server is running.');
});