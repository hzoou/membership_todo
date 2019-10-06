const express = require('express');
const router = express.Router();
const BOARD = require('../../models/board');
const { isLoggedIn } = require('../../middlewares/auth');

router.get('/:user_id', async function (req, res) {
    const board = await BOARD.getBoardIdxByUserId(req.params.user_id, res);
    if (!board) return res.send({ status: 'FAIL', message: '존재하지 않는 사용자 입니다. '});
    // 보드가 전체 공개
    if (!(board.private)) return await BOARD.getAllListByBoard(board.idx, res);
    // 로그인 하지 않고 private 보드에 접근
    if (!req.user) return res.send({ status: 'FAIL', message: '해당 보드에 접근할 권한이 없습니다. '});
    // private 보드지만 내 보드
    if (req.user.id === req.params.user_id) return await BOARD.getAllListByBoard(board.idx, res);
    // private 보드이면서 남의 보드인데 접근 권한이 없음
    const permission = await BOARD.isAuthorizedUser(req.user.idx, board.idx);
    console.log(permission.authentic);
    if (!permission) return res.send({ status: 'FAIL', message: '해당 보드에 접근할 권한이 없습니다. '});
    // private 보드이면서 남의 보드인데 접근 권한이 있는데 읽기만 가능(authentic:0)
    if (!permission.authentic) return await BOARD.getAllListByBoardByOption(board.idx, permission.authentic, res);
    // private 보드이면서 남의 보드인데 접근 권한이 있는데 편집도 가능(authentic:1)
    if (permission.authentic) return await BOARD.getAllListByBoardByOption(board.idx, permission.authentic, res);
});

router.post('/item', isLoggedIn, function (req, res) {
   BOARD.insertItem(req.body.list_idx, req.body.data[0], res);
});

router.delete('/item', isLoggedIn, function (req, res) {
    BOARD.deleteItem(req.body.item_idx, res);
});

router.put('/item', isLoggedIn, function (req, res) {
   BOARD.updateItem(req.body.item_idx, req.body.data[0], res);
});

module.exports = router;
