//server.js
//adding opensource modules to application 
var express = require('express'); //express 
var path = require('path'); //for refering physical files here
var logger = require('morgan'); 
var cookieParser = require('cookie-parser'); //for maintain sessions
var bodyParser = require('body-parser'); //for parsing json
var bcrypt = require('bcrypt-nodejs'); 
var passport = require('passport'); //Using passportjs for authentication
var LocalStrategy = require('passport-local').Strategy; //using passport strategy
var session = require('express-session'); //for maintaining sessions
var mongoose = require('mongoose'); //for mongodb, database
var models_user = require('./Angular/Models/user.js'); // refering models in server.js

//connection database
mongoose.connect('mongodb://localhost/AngularizeApp');

//import the routers
var router = require('./Routes/router');
var authenticate = require('./Routes/authentication')(passport);

//for using express throughout this application
var app = express();

//tell node that My application will use ejs engine for rendering, view engine setup
app.set('views', path.join(__dirname, 'Views'));
app.set('view engine', 'ejs');

//tell node the global configuration about parser,logger and passport
app.use(cookieParser());
app.use(logger('dev'));
app.use(session({
  secret: 'keyboard cat'
}));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(passport.initialize()); //initializing passport
app.use(passport.session()); //initializing passport session

//tell node about these directories that application may get resources from
app.use('/', router);
app.use('/auth', authenticate);
app.use(express.static(path.join(__dirname, 'scripts')));
app.use(express.static(path.join(__dirname, 'Content')));
app.use(express.static(path.join(__dirname, 'Angular')));
app.use(express.static(path.join(__dirname, 'Views/Main')));
app.use(express.static(path.join(__dirname, 'Views/Authentication')));

//providing auth-api to passport so that it can use it.
var initPassport = require('./Passport/passport-init');
initPassport(passport);

//running server on node
var server = app.listen(3000, function () {
  var host = server.address().address;
  var port = server.address().port;
  console.log('Example app listening at http://%s:%s', host, port);
});

//exporting this application as a module
module.exports = app;