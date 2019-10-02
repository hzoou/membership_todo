const express = require('express');
const router = express.Router();
const USER = require('../models/user');

router.get('/', function(req, res) {
    res.render('signup', { title: 'sign in' });
});

router.post('/', async function (req, res) {
    await USER.insertUser(req.body.id, req.body.pw);
    res.redirect(307, '/signin')
});

module.exports = router;
