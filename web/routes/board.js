const express = require('express');
const router = express.Router();
const BOARD = require('../models/board');

router.get('/', function(req, res) {
    res.send('respond with a resource');
});

router.get('/:user_id', function (req, res) {
    BOARD.getBoardIdxByUserId(req.params.user_id, res);
});

module.exports = router;
