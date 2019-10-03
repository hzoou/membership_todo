const express = require('express');
const router = express.Router();

const passport = require('../middlewares/passport');
const USER = require('../models/user');

router.get('/', function(req, res) {
    res.render('signin', { title: 'sign in' });
});

router.get('/:id', async function (req, res) {
    const user = await USER.findUser(req.params.id);
    if (user) return res.status(400).send({ status: 'FAIL', message: '이미 존재하는 아이디입니다.'});
    res.status(200).send({ status: 'SUCCESS', message: '사용 가능한 아이디입니다.'});
});

router.post('/',  passport.authenticate('local', {
    successRedirect: '/board',
    failureRedirect: '/error?msg=아이디+또는+비밀번호를+확인해주세요.&url=signin',
    failureFlash: true })
);

module.exports = router;
