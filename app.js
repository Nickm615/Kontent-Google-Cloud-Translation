var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const crypto = require('crypto');
const bodyParser = require('body-parser');
require('dotenv').config();
const webhookSecret = process.env.WEBHOOK_SECRET;
const processWebhook = require('./utils/processWebhook')

const hasValidSignature = (body, signature) => {
  const computedSignature = crypto.createHmac('sha256', webhookSecret)
      .update(body)
      .digest();
  return crypto.timingSafeEqual(Buffer.from(signature, 'base64'), computedSignature);
}

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(bodyParser.raw({type:'application/json'}))
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);

app.post('/webhook', (req, res) => {
  const parsedBody = JSON.parse(req.body);
  try {
    if(hasValidSignature(req.body, req.headers['x-kc-signature'])) {
      processWebhook(parsedBody)
      res.status(200).send('Success');
    }
    else{
      res.status(403).send('invalid signature')
    }
  
  } catch (error) {
    res.status(error).send()
  }
});
// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
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
