const board = require('../schema/query');

const BOARD = {
    getBoardIdxByUserId : async (user_id, res) => {
        try {
            const result = (await board.getBoardIdxByUserId(user_id))[0];
            return BOARD.getAllListByBoard(result.idx, res);
        } catch (e) {
            res.status(400).send({ status: 'FAIL', message: '해당 id는 존재하는 board가 없습니다.'});
        }
    },

    getAllListByBoard : async (boardIdx, res) => {
        res.send({ status: 'SUCCESS', board_idx: boardIdx, data: await board.getAllListByBoard(boardIdx)});
    }
};

module.exports = BOARD;