const express = require('express');
const router = express.Router();
const isAdmin = require('../middlewares/isAdmin');

router.get('/', isAdmin, function(req, res) {
    res.render('admin', { title: 'admin' });
});

module.exports = router;
