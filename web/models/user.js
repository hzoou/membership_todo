const query = require('./query');
const executor = require('./sqlExecutor');
const crypto = require('crypto');

const USER = {
    findUser : async (id) => {
        this.user = (await executor(query.FIND_USER, [id]))[0];
        return this.user;
    },

    isCorrectPw : (pw) => {
        return pw === this.user.pw;
    },

    insertUser : async (id, pw) => {
        pw = crypto.createHash('sha512').update(pw).digest('base64');
        const resultUser = await executor(query.INSERT_USER, [id, pw]);
        const resultBoard = await executor(query.MAKE_BOARD, [resultUser.insertId]);
        const defaultListName = ['To Do', 'In Progress', 'Done'];
        for (const name of defaultListName) await executor(query.MAKE_LIST, [name, resultBoard.insertId]);
    },

    getAllUser : async () => {
        return await executor(query.GET_ALL_USER);
    },

    updateUser : async (idx, admin) => {
        const result = await executor(query.UPDATE_USER, [admin, idx]);
        return result.affectedRows;
    },

    deleteUser : async (idx) => {
        const result = await executor(query.DELETE_USER, [idx]);
        return result.affectedRows;
    },

    getAllUserExceptForMe : async (id) => {
        return await executor(query.GET_ALL_USER_EXCEPT_FOR_ME, [id]);
    }
};

module.exports = USER;