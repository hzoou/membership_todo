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

module.exports = router;
