const express = require('express');
const router = express.Router();
const { isLoggedIn } = require('../../middlewares/auth');
const BOARD = require('../../models/board');
const USER = require('../../models/user');

router.use(isLoggedIn);

router.get('/permission/board', async function (req, res) {
    const board = await BOARD.getBoardIdxByUserId(req.user.id);
    const userList = await USER.getAllUserExceptForMe(req.user.id);
    await BOARD.getPermissionOfBoard(req.user.id, board.idx, userList, res);
});

router.post('/permission/board', function (req, res) {
    BOARD.insertPermissionOfBoard(req.body.authentic, req.body.boardIdx, req.body.id, res);
});

router.put('/permission/board/:id', function (req, res) {
    BOARD.updatePermissionOfBoard(req.body.authentic, req.body.boardIdx, req.params.id, res);
});

router.delete('/permission/board/:id', function (req, res) {
    BOARD.deletePermissionOfBoard(req.body.boardIdx, req.params.id, res);
});

router.get('/permission/my', async function (req, res) {
    await BOARD.getPermissionOfUser(req.user.id, res);
});

module.exports = router;
