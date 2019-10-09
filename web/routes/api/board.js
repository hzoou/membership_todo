const express = require('express');
const router = express.Router();
const BOARD = require('../../models/board');
const { isLoggedIn } = require('../../middlewares/auth');

router.get('/:user_id', async (req, res) => {
    const board = await BOARD.getBoardIdxByUserId(req.params.user_id, res);
    if (!board) return res.send({ status: 'FAIL', message: '존재하지 않는 사용자 입니다.'});
    if (!req.user && board.private) return res.send({ status: 'FAIL', message: '해당 보드에 접근할 권한이 없습니다.'});
    if (!board.private) return await BOARD.getAllListByBoard(board.idx, res);
    const permission = await BOARD.isAuthorizedUser(req.user.idx, board.idx);
    if (req.user.id === req.params.user_id) return await BOARD.getAllListByBoard(board.idx, res);
    if (!permission) return res.send({ status: 'FAIL', message: '해당 보드에 접근할 권한이 없습니다.'});
    return await BOARD.getAllListByBoardByOption(board.idx, permission.authentic, res);
});

router.put('/list', isLoggedIn, (req, res) => {
   BOARD.updateList(req.body.title, req.body.idx, res);
});

router.post('/item', isLoggedIn, (req, res) => {
   BOARD.insertItem(req.body.list_idx, req.body.data[0], res);
});

router.delete('/item', isLoggedIn, (req, res) => {
    BOARD.deleteItem(req.body.item_idx, res);
});

router.put('/item', isLoggedIn, (req, res) => {
   BOARD.updateItem(req.body.title, req.body.idx, res);
});

router.get('/log/:board_idx', (req, res) => {
    BOARD.getLogOfBoard(req.params.board_idx, res);
});

module.exports = router;
