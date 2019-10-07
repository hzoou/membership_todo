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

    getAllListByBoardByOption : async (boardIdx, authentic, res) => {
        res.send({ status: 'SUCCESS', board_idx: boardIdx, data: await board.getAllListByBoard(boardIdx), authentic: authentic});
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

    getPermissionOfBoard : async (id, boardIdx, userList, res) => {
        res.send({ status: 'SUCCESS', user_id: id, board_idx: boardIdx, userList: userList, data: await board.getPermissionOfBoard(boardIdx)});
    },

    updatePermissionOfBoard : async (authentic, boardIdx, id, res) => {
        try {
            const result = await board.updatePermissionOfBoard(authentic, boardIdx, id);
            if (!result.affectedRows) throw new Error();
            res.send({ status: 'SUCCESS', message: '해당 유저의 권한을 수정했습니다.'});
        } catch (e) {
            res.send({ status: 'FAIL', message: '해당 유저의 권한을 수정하는데 실패했습니다.'});
        }
    },

    deletePermissionOfBoard : async (boardIdx, id, res) => {
        try {
            const result = await board.deletePermissionOfBoard(boardIdx, id);
            if (!result.affectedRows) throw new Error();
            res.send({ status: 'SUCCESS', message: '해당 유저의 권한을 삭제했습니다.'});
        } catch (e) {
            res.send({ status: 'FAIL', message: '해당 유저의 권한을 삭제하는데 실패했습니다.'});
        }
    },

    insertPermissionOfBoard : async (authentic, boardIdx, id, res) => {
        try {
            const result = await board.insertPermissionOfBoard(authentic, boardIdx, id);
            if (!result.affectedRows) throw new Error();
            res.send({ status: 'SUCCESS', message: '해당 유저의 권한을 추가했습니다.'});
        } catch (e) {
            res.send({ status: 'FAIL', message: '해당 유저의 권한을 추가하는데 실패했습니다.'});
        }
    },

    getPermissionOfUser : async (id, res) => {
        res.send({ status: 'SUCCESS', data: await board.getPermissionOfUser(id)});
    }
};

module.exports = BOARD;