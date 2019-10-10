const query = require('./query');
const executor = require('./sqlExecutor');

const BOARD = {
    getBoardIdxByUserId : async (user_id, res) => {
        try {
            return (await executor(query.GET_BOARD_IDX_BY_USER_ID, [user_id]))[0];
        } catch (e) {
            res.send({ status: 'FAIL', message: '해당 id는 존재하는 board가 없습니다.'});
        }
    },

    getAllListByBoard : async (boardIdx, res) => {
        res.send({ status: 'SUCCESS', board_idx: boardIdx, data: await executor(query.GET_ALL_LIST_BY_BOARD, [boardIdx])});
    },

    getAllListByBoardByOption : async (boardIdx, authentic, res) => {
        res.send({ status: 'SUCCESS', board_idx: boardIdx, data: await executor(query.GET_ALL_LIST_BY_BOARD, [boardIdx]), authentic: authentic});
    },

    isAuthorizedUser : async (userIdx, boardIdx) => {
        return (await executor(query.IS_AUTHORIZED_USER, [userIdx, boardIdx]))[0];
    },

    insertItem : async (data, res) => {
        try {
            const result = await executor(query.INSERT_ITEM, [data.title, data.list_idx, data.pos]);
            if (!result.affectedRows) throw new Error();
            await BOARD.insertLog(data);
            if (data.adjust) await BOARD.adjustItemPosition(data);
            res.send({ status: 'SUCCESS', message: '해당 item을 추가했습니다.'});
        } catch (e) {
            res.send({ status: 'FAIL', message: '해당 item을 추가하는데 실패했습니다.'});
        }
    },

    adjustItemPosition : async (data) => {
        let maxPos = (await executor(query.GET_MAX_POS_OF_LIST, [data.list_idx]))[0]['MAX(pos)'];
        const rows = await executor(query.GET_SPECIFIC_LIST, [data.list_idx]);
        for (const row of rows) {
            const result = await executor(query.UPDATE_ITEM_POS_FOR_ADJUST, [maxPos, row.idx]);
            Number(maxPos -= 1000);
            if (!result.affectedRows) throw new Error();
        }
    },

    moveItemBySameList : async (data, res) => {
        try {
            const result = await executor(query.MOVE_ITEM_BY_SAME_LIST, [data.pos, data.item_idx]);
            if (!result.affectedRows) throw new Error();
            res.send({ status: 'SUCCESS', message: '해당 item의 순서를 변경했습니다.'});
        } catch (e) {
            res.send({ status: 'FAIL', message: '해당 item의 순서를 변경하는데 실패했습니다.'});
        }
    },

    moveItemByOtherList : async (data, res) => {
        try {
            const result = await executor(query.MOVE_ITEM_BY_OTHER_LIST, [data.pos, data.list_idx, data.item_idx]);
            if (!result.affectedRows) throw new Error();
            await BOARD.insertLog(data);
            res.send({ status: 'SUCCESS', message: '해당 item의 순서를 변경했습니다.'});
        } catch (e) {
            res.send({ status: 'FAIL', message: '해당 item의 순서를 변경하는데 실패했습니다.'});
        }
    },

    deleteItem : async (data, res) => {
        try {
            const result = await executor(query.DELETE_ITEM, [data.item_idx]);
            if (!result.affectedRows) throw new Error();
            await BOARD.insertLog(data);
            res.send({ status: 'SUCCESS', message: '해당 item을 삭제했습니다.'});
        } catch (e) {
            res.send({ status: 'FAIL', message: '해당 item을 삭제하는데 실패했습니다.'});
        }
    },

    updateItem : async (data, res) => {
        try {
            const result = await executor(query.UPDATE_ITEM, [data.title, data.idx]);
            if (!result.affectedRows) throw new Error();
            await BOARD.insertLog(data);
            res.send({ status: 'SUCCESS', message: '해당 item을 수정했습니다.'});
        } catch (e) {
            res.send({ status: 'FAIL', message: '해당 item을 수정하는데 실패했습니다.'});
        }
    },

    getPermissionOfBoard : async (id, boardIdx, private, userList, res) => {
        res.send({ status: 'SUCCESS', user_id: id, board_idx: boardIdx, private: private, userList: userList, data: await executor(query.GET_PERMISSION_OF_BOARD, [boardIdx])});
    },

    updatePermissionOfBoard : async (authentic, boardIdx, id, res) => {
        try {
            const result = await executor(query.UPDATE_PERMISSION_OF_BOARD, [authentic, boardIdx, id]);
            if (!result.affectedRows) throw new Error();
            res.send({ status: 'SUCCESS', message: '해당 유저의 권한을 수정했습니다.'});
        } catch (e) {
            res.send({ status: 'FAIL', message: '해당 유저의 권한을 수정하는데 실패했습니다.'});
        }
    },

    deletePermissionOfBoard : async (boardIdx, id, res) => {
        try {
            const result = await executor(query.DELETE_PERMISSION_OF_BOARD, [boardIdx, id]);
            if (!result.affectedRows) throw new Error();
            res.send({ status: 'SUCCESS', message: '해당 유저의 권한을 삭제했습니다.'});
        } catch (e) {
            res.send({ status: 'FAIL', message: '해당 유저의 권한을 삭제하는데 실패했습니다.'});
        }
    },

    insertPermissionOfBoard : async (authentic, boardIdx, id, res) => {
        try {
            const result = await executor(query.INSERT_PERMISSION_OF_BOARD, [authentic, boardIdx, id]);
            if (!result.affectedRows) throw new Error();
            res.send({ status: 'SUCCESS', message: '해당 유저의 권한을 추가했습니다.'});
        } catch (e) {
            res.send({ status: 'FAIL', message: '해당 유저의 권한을 추가하는데 실패했습니다.'});
        }
    },

    getPermissionOfUser : async (id, res) => {
        res.send({ status: 'SUCCESS', data: await executor(query.GET_PERMISSION_OF_USER, [id])});
    },

    updatePrivateOfBoard : async (board_private, boardIdx, res) => {
        try {
            const result = await executor(query.UPDATE_PRIVATE_OF_BOARD, [board_private, boardIdx]);
            if (!result.affectedRows) throw new Error();
            res.send({ status: 'SUCCESS', message: '해당 보드의 전체공개 여부를 수정했습니다.'});
        } catch (e) {
            res.send({ status: 'FAIL', message: '해당 보드의 전체공개 여부를 수정하는데 실패했습니다.'});
        }
    },

    updateList : async (data, res) => {
        try {
            const result = await executor(query.UPDATE_LIST, [data.title, data.idx]);
            if (!result.affectedRows) throw new Error();
            res.send({ status: 'SUCCESS', message: '해당 리스트의 타이틀을 수정했습니다.'});
        } catch (e) {
            res.send({ status: 'FAIL', message: '해당 리스트의 타이틀을 수정하는데 실패했습니다.'});
        }
    },

    getLogOfBoard : async (boardIdx, res) => {
        res.send({ status: 'SUCCESS', data: await executor(query.GET_LOG_OF_BOARD, [boardIdx])});
    },

    insertLog : async (data) => {
        const result = await executor(query.INSERT_LOG, [data.user_id, data.board_idx, data.title, data.source, data.target, data.action]);
        if (!result.affectedRows) throw new Error();
    }
};

module.exports = BOARD;