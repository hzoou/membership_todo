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
    }
};

module.exports = USER;