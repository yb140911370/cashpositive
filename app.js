var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session')

// RESPECTIVE ROUTE FILES WITH FUNCTIONS

var index = require('./routes/index'); 
var users = require('./routes/users');
var events = require('./routes/events');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// SESSION MIDDLEWARE

app.use(session({
  secret: 'secret',
  resave: false,
  saveUninitialized: true  
}))


 //REGISTER FUNCTION
app.post('/user/new',users.register);

//LOGIN FUNCTION
app.post('/user/login',users.login); 

//GET ALL EVENtS
app.get('/events/all', events.getAll); 

//FETCH ONE EVENT WITH COMMENTS
app.get('/events/event/:title', events.fetch); 

//CREATE AN EVENT
app.post('/events/create',events.create);

//DELETE AN EVENt 
app.delete('/events/delete/:title',events.delete); 
//UPDATE AN EVENT
app.put('/events/update',events.update);

//ADD COMMENT TO AN EVENT
app.post('/events/comment',events.addComment); 

app.use('/', index);


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
