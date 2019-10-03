const express = require('express');
const router = express.Router();

const passport = require('../middlewares/passport');

router.get('/', function(req, res) {
    res.render('signin', { title: 'sign in' });
});

router.post('/',  passport.authenticate('local', {
    successRedirect: '/board',
    failureRedirect: '/error?msg=아이디+또는+비밀번호를+확인해주세요.&url=signin',
    failureFlash: true })
);

module.exports = router;
