var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

let auth = require('./routes/auth');

let roles = require('./routes/roles');
let maproleusers = require('./routes/maproleusers');
let maproleresoures = require('./routes/maproleresoures');
let users = require('./routes/users');
let signin = require('./routes/signin');
var cors = require('cors');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

var corsOptionsDelegate = function(req, callback){
    var corsOptions;
    corsOptions = {
        origin: req.headers.origin,
        optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
        credentials: true // Access-Control-Allow-Credentials CORS header. Set to true to pass the header, otherwise it is omitted.
    };
    callback(null, corsOptions); // callback expects two parameters: error and options
};

app.use(cors(corsOptionsDelegate));

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(new auth().tokenAuth);
app.use(express.static(path.join(__dirname, 'public')));

app.use('/signin', signin);           // 登录接口
app.use('/api/system/users', users);      // 用户接口
app.use('/api/system/roles',roles);       // 角色借口
app.use('/api/system/maproleusers',maproleusers);       // Maproleusers
app.use('/api/system/maproleresoures',maproleresoures);       // maproleresoures
// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
