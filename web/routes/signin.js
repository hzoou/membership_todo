const express = require('express');
const router = express.Router();

router.get('/', function(req, res, next) {
    res.render('signin', { title: 'sign in' });
});

module.exports = router;
