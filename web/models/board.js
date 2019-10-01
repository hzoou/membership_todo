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
    },

    insertItem : async (listIdx, data, res) => {
        try {
            await board.insertItem(data.title, data.content, listIdx);
            res.send({ status: 'SUCCESS', message: '해당 item을 추가했습니다.'});
        } catch (e) {
            res.status(400).send({ status: 'FAIL', message: '해당 item을 추가하는데 실패했습니다.'});
        }
    },

    deleteItem : async (itemIdx, res) => {
        try {
            await board.deleteItem(itemIdx);
            res.send({ status: 'SUCCESS', message: '해당 item을 삭제했습니다.'});
        } catch (e) {
            res.status(400).send({ status: 'FAIL', message: '해당 item을 삭제하는데 실패했습니다.'});
        }
    }
};

module.exports = BOARD;