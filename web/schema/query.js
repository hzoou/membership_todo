const db = require('../database/connection').connect();

module.exports = {
    getBoardIdxByUserId : async (id) => {
        return new Promise((resolve, reject) => {
            db.execute('SELECT BOARD.idx, BOARD.private FROM BOARD WHERE BOARD.USER_idx = (SELECT USER.idx FROM USER WHERE USER.id = ?)', [id],function (err, results) {
                if (err) reject(err);
                resolve(results);
            });
        });
    },

    getAllListByBoard : async (board_idx) => {
        return new Promise((resolve, reject) => {
            db.execute('SELECT L.idx as LIST_idx, I.idx as ITEM_idx, L.title as LIST_title, I.title as ITEM_title FROM LIST L JOIN ITEM I ON I.LIST_idx = L.idx AND L.BOARD_idx = ?', [board_idx], function (err, results) {
                if (err) reject(err);
                resolve(results);
            })
        });
    },

    isAuthorizedUser : async (userIdx, boardIdx) => {
        return new Promise((resolve, reject) => {
            db.execute('SELECT * FROM PERMISSION WHERE USER_idx = ? AND BOARD_idx = ?', [userIdx, boardIdx], function (err, results) {
                if (err) reject(err);
                resolve(results);
            })
        })
    },

    insertItem : async (title, content, list_idx) => {
        return new Promise((resolve, reject) => {
            db.execute('INSERT INTO ITEM (title, content, LIST_idx) VALUES (?, ?, ?)', [title, content, list_idx], function (err, results) {
                if (err) reject(err);
                resolve(results);
            })
        })
    },

    deleteItem : async (item_idx) => {
        return new Promise((resolve, reject) => {
            db.execute('DELETE FROM ITEM WHERE idx = ?', [item_idx],function (err, results) {
                if (err) reject(err);
                resolve(results);
            })
        })
    },

    updateItem : async (title, content, item_idx) => {
        return new Promise((resolve, reject) => {
            db.execute('UPDATE ITEM SET title = ?, content = ? WHERE idx = ?', [title, content, item_idx], function (err, results) {
                if (err) reject(err);
                resolve(results);
            })
        })
    },

    findUser : async (id) => {
        return new Promise((resolve, reject) => {
            db.execute('SELECT * FROM USER WHERE id = ?', [id], function (err, results) {
                if (err) reject(err);
                resolve(results);
            })
        })
    },

    insertUser : async (id, pw) => {
        return new Promise((resolve, reject) => {
            db.execute('INSERT INTO USER (id, pw) VALUES (?, ?)', [id, pw], function (err, results) {
                if (err) reject(err);
                resolve(results);
            })
        })
    },

    makeBoard : async (user_idx) => {
        return new Promise((resolve, reject) => {
            db.execute('INSERT INTO BOARD (USER_idx) VALUES (?)', [user_idx], function (err, results) {
                if (err) reject(err);
                resolve(results);
            })
        })
    },

    makeList : async (title, board_idx) => {
       return new Promise((resolve, reject) => {
           db.execute('INSERT INTO LIST (title, BOARD_idx) VALUES (?, ?)', [title, board_idx], function (err, results) {
               if (err) reject(err);
               resolve(results);
           })
       })
    },
    
    getAllUser : async () => {
        return new Promise((resolve, reject) => {
            db.execute('SELECT idx, id, admin FROM USER', function (err, results) {
                if (err) reject(err);
                resolve(results);
            })
        })
    }
};