const express = require('express');
const router = express.Router();

const passport = require('../middlewares/passport');

router.get('/', function(req, res, next) {
    res.render('signin', { title: 'sign in' });
});

router.post('/',  passport.authenticate('local', {
    successRedirect: '/board',
    failureRedirect: '/error',
    failureFlash: true })
);

module.exports = router;
