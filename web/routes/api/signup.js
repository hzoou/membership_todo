const express = require('express');
const router = express.Router();
const USER = require('../../models/user');

router.get('/:id', async function (req, res) {
    const user = await USER.findUser(req.params.id);
    if (user) return res.send({ status: 'FAIL', message: '이미 존재하는 아이디입니다.'});
    res.send({ status: 'SUCCESS', message: '사용 가능한 아이디입니다.'});
});

router.post('/', async function (req, res) {
    await USER.insertUser(req.body.id, req.body.pw);
    res.redirect(307, '/api/signin')
});

module.exports = router;
