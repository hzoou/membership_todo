const db = require('../database/connection').connect();

module.exports = {
    getBoardIdxByUserId : async (user_id) => {
        return new Promise((resolve, reject) => {
            db.execute('SELECT BOARD.idx FROM BOARD, USER WHERE BOARD.idx = (SELECT USER.idx FROM USER WHERE USER.id = ?)', [user_id],function (err, results) {
                if (err) reject(err);
                resolve(results);
            });
        });
    },

    getAllListByBoard : async (board_idx) => {
        return new Promise((resolve, reject) => {
            db.execute('SELECT LIST.idx as LIST_idx, ITEM.idx as ITEM_idx, LIST.title as LIST_title, ITEM.title as ITEM_title FROM BOARD, LIST, ITEM WHERE ITEM.list_idx = LIST.idx AND BOARD.idx = ?', [board_idx], function (err, results) {
                if (err) reject(err);
                resolve(results);
            })
        });
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
            db.query('UPDATE ITEM SET title = ?, content = ? WHERE idx = ?', [title, content, item_idx], function (err, results) {
                if (err) reject(err);
                resolve(results);
            })
        })
    },
};