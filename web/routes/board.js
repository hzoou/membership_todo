const express = require('express');
const router = express.Router();
const BOARD = require('../models/board');

router.get('/', function(req, res) {
    res.send('respond with a resource');
});

router.get('/:user_id', function (req, res) {
    BOARD.getBoardIdxByUserId(req.params.user_id, res);
});

router.post('/item', function (req, res) {
   BOARD.insertItem(req.body.list_idx, req.body.data[0], res);
});

router.delete('/item', function (req, res) {
    BOARD.deleteItem(req.body.item_idx, res);
});

router.put('/item', function (req, res) {
   BOARD.updateItem(req.body.item_idx, req.body.data[0], res);
});

module.exports = router;
