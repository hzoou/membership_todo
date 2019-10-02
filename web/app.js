require('dotenv').config();

const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const flash = require('connect-flash');

const session = require('./middlewares/session');
const passport = require('./middlewares/passport');

const indexRouter = require('./routes/index');
const signinRouter = require('./routes/signin');
const signupRouter = require('./routes/signup');
const boardRouter = require('./routes/board');

const app = express();

app.use(session);
app.use(flash());

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(passport.initialize());
app.use(passport.session());

app.use('/', indexRouter);
app.use('/signin', signinRouter);
app.use('/signup', signupRouter);
app.use('/board', boardRouter);
app.get('/error', (req, res) => {
  res.send(`<script type="text/javascript">alert("${req.query.msg}");window.location.href="./${req.query.url}";</script>`)
});
app.get('/signout', (req, res) => {
  req.logout();
  res.redirect('/');
});

app.use(function(req, res, next) {
  next(createError(404));
});

app.use(function(err, req, res, next) {
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
