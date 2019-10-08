const express = require('express');
const router = express.Router();
const { isLoggedIn } = require('../../middlewares/auth');
const BOARD = require('../../models/board');
const USER = require('../../models/user');

router.use(isLoggedIn);

router.get('/permission/board', async (req, res) => {
    const board = await BOARD.getBoardIdxByUserId(req.user.id);
    const userList = await USER.getAllUserExceptForMe(req.user.id);
    await BOARD.getPermissionOfBoard(req.user.id, board.idx, board.private, userList, res);
});

router.post('/permission/board', (req, res) => {
    BOARD.insertPermissionOfBoard(req.body.authentic, req.body.boardIdx, req.body.id, res);
});

router.put('/permission/board', (req, res) => {
    BOARD.updatePrivateOfBoard(req.body.private, req.body.boardIdx, res);
});

router.put('/permission/board/:id', (req, res) => {
    BOARD.updatePermissionOfBoard(req.body.authentic, req.body.boardIdx, req.params.id, res);
});

router.delete('/permission/board/:id', (req, res) => {
    BOARD.deletePermissionOfBoard(req.body.boardIdx, req.params.id, res);
});

router.get('/permission/my', async (req, res) => {
    await BOARD.getPermissionOfUser(req.user.id, res);
});

module.exports = router;
