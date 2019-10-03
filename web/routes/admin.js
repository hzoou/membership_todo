const express = require('express');
const router = express.Router();
const isAdmin = require('../middlewares/isAdmin');
const USER = require('../models/user');

router.get('/', isAdmin, function(req, res) {
    res.render('admin', { title: 'admin', id: req.user.id });
});

router.get('/user', isAdmin, async function (req, res) {
    const result = await USER.getAllUser();
    res.send({ status: 'SUCCESS', data: result });
});

router.put('/user/:idx', isAdmin, async function (req, res) {
    const result = await USER.updateUser(req.params.idx, req.body.admin);
    if (!result) return res.send({ status: 'FAIL', message: '해당 user의 권한을 수정하는데 실패했습니다.'});
    res.send({ status: 'SUCCESS', message: '해당 user의 권한을 수정했습니다.'});
});

router.delete('/user/:idx', isAdmin, async function (req, res) {
    const result = await USER.deleteUser(req.params.idx);
    if (!result) return res.send({ status: 'FAIL', message: '해당 user를 삭제하는데 실패했습니다.'});
    res.send({ status: 'SUCCESS', message: '해당 user를 삭제했습니다.'});
});

module.exports = router;
