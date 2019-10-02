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

    getUser : async (id) => {
        return new Promise((resolve, reject) => {
            db.execute('SELECT * FROM USER WHERE id = ?', [id], function (err, results) {
                if (err) reject(err);
                resolve(results);
            })
        })
    }
};