const express = require('express');
const router = express.Router();
const USER = require('../models/user');

router.get('/', function(req, res) {
    res.render('signup', { title: 'sign up' });
});

router.get('/:id', async function (req, res) {
    const user = await USER.findUser(req.params.id);
    if (user) return res.status(400).send({ status: 'FAIL', message: '이미 존재하는 아이디입니다.'});
    res.status(200).send({ status: 'SUCCESS', message: '사용 가능한 아이디입니다.'});
});

router.post('/', async function (req, res) {
    await USER.insertUser(req.body.id, req.body.pw);
    res.redirect(307, '/signin')
});

module.exports = router;
