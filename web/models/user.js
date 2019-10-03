const user = require('../schema/query');
const crypto = require('crypto');

const USER = {
    findUser : async (id) => {
        this.user = (await user.findUser(id))[0];
        return this.user;
    },

    isCorrectPw : (pw) => {
        return pw === this.user.pw;
    },

    insertUser : async (id, pw) => {
        pw = crypto.createHash('sha512').update(pw).digest('base64');
        const resultUser = await user.insertUser(id, pw);
        const resultBoard = await user.makeBoard(resultUser.insertId);
        const defaultListName = ['To Do', 'In Progress', 'Done'];
        for (const d of defaultListName) await user.makeList(d, resultBoard.insertId);
    },

    getAllUser : async () => {
        return await user.getAllUser();
    },

    updateUser : async (idx, admin) => {
        const result = await user.updateUser(idx, admin);
        return result.affectedRows;
    },

    deleteUser : async (idx) => {
        const result = await user.deleteUser(idx);
        return result.affectedRows;
    }
};

module.exports = USER;