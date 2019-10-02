const user = require('../schema/query');

const USER = {
    findUser : async (id) => {
        this.user = (await user.getUser(id))[0];
        return this.user;
    },

    isCorrectPw : (pw) => {
        return pw === this.user.pw;
    }
};

module.exports = USER;