const express = require('express');
const router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { id: (req.user) ? req.user.id : '' });
});

module.exports = router;
