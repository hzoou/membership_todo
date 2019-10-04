const express = require('express');
const router = express.Router();

router.get('/', function(req, res, next) {
  res.render('index', { title: 'to do', id: (req.user) ? req.user.id : '', admin: (req.user && req.user.admin) ? true : false });
});

module.exports = router;
