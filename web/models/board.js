const board = require('../schema/query');

const BOARD = {
    getBoardIdxByUserId : async (user_id, res) => {
        try {
            return (await board.getBoardIdxByUserId(user_id))[0];
        } catch (e) {
            res.send({ status: 'FAIL', message: '해당 id는 존재하는 board가 없습니다.'});
        }
    },

    getAllListByBoard : async (boardIdx, res) => {
        res.send({ status: 'SUCCESS', board_idx: boardIdx, data: await board.getAllListByBoard(boardIdx)});
    },

    isAuthorizedUser : async (userIdx, boardIdx) => {
        return (await board.isAuthorizedUser(userIdx, boardIdx))[0];
    },

    insertItem : async (listIdx, data, res) => {
        try {
            const result = await board.insertItem(data.title, listIdx);
            if (!result.affectedRows) throw new Error();
            res.send({ status: 'SUCCESS', message: '해당 item을 추가했습니다.'});
        } catch (e) {
            res.send({ status: 'FAIL', message: '해당 item을 추가하는데 실패했습니다.'});
        }
    },

    deleteItem : async (itemIdx, res) => {
        try {
            const result = await board.deleteItem(itemIdx);
            if (!result.affectedRows) throw new Error();
            res.send({ status: 'SUCCESS', message: '해당 item을 삭제했습니다.'});
        } catch (e) {
            res.send({ status: 'FAIL', message: '해당 item을 삭제하는데 실패했습니다.'});
        }
    },

    updateItem : async (itemIdx, data, res) => {
        try {
            const result = await board.updateItem(data.title, data.content, itemIdx);
            if (!result.affectedRows) throw new Error();
            res.send({ status: 'SUCCESS', message: '해당 item을 수정했습니다.'});
        } catch (e) {
            res.send({ status: 'FAIL', message: '해당 item을 수정하는데 실패했습니다.'});
        }
    },
};

module.exports = BOARD;