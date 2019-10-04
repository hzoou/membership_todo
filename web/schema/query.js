const pool = require('../database/connection').pool();

module.exports = {
    getBoardIdxByUserId : async (id) => {
        let connection;
        try {
            connection = await pool.getConnection(async conn => conn);
            const [results] = await connection.execute('SELECT BOARD.idx, BOARD.private FROM BOARD WHERE BOARD.USER_idx = (SELECT USER.idx FROM USER WHERE USER.id = ?)', [id]);
            await connection.commit();
            return results;
        } catch (e) {
            await connection.rollback();
            return false;
        } finally {
            connection.release();
        }
    },

    getAllListByBoard : async (board_idx) => {
        let connection;
        try {
            connection = await pool.getConnection(async conn => conn);
            const [results] = await connection.execute('SELECT L.idx as LIST_idx, I.idx as ITEM_idx, L.title as LIST_title, I.title as ITEM_title FROM LIST L LEFT JOIN ITEM I ON I.LIST_idx = L.idx WHERE L.BOARD_idx = ? ORDER BY I.idx DESC', [board_idx]);
            await connection.commit();
            return results;
        } catch (e) {
            await connection.rollback();
            return false;
        } finally {
            connection.release();
        }
    },

    isAuthorizedUser : async (userIdx, boardIdx) => {
        let connection;
        try {
            connection = await pool.getConnection(async conn => conn);
            const [results] = await connection.execute('SELECT * FROM PERMISSION WHERE USER_idx = ? AND BOARD_idx = ?', [userIdx, boardIdx]);
            await connection.commit();
            return results;
        } catch (e) {
            await connection.rollback();
            return false;
        } finally {
            connection.release();
        }
    },

    insertItem : async (title, list_idx) => {
        let connection;
        try {
            connection = await pool.getConnection(async conn => conn);
            const [results] = await connection.execute('INSERT INTO ITEM (title, LIST_idx) VALUES (?, ?)', [title, list_idx]);
            await connection.commit();
            return results;
        } catch (e) {
            await connection.rollback();
            return false;
        } finally {
            connection.release();
        }
    },

    deleteItem : async (item_idx) => {
        let connection;
        try {
            connection = await pool.getConnection(async conn => conn);
            const [results] = await connection.execute('DELETE FROM ITEM WHERE idx = ?', [item_idx]);
            await connection.commit();
            return results;
        } catch (e) {
            await connection.rollback();
            return false;
        } finally {
            connection.release();
        }
    },

    updateItem : async (title, content, item_idx) => {
        let connection;
        try {
            connection = await pool.getConnection(async conn => conn);
            const [results] = await connection.execute('UPDATE ITEM SET title = ?, content = ? WHERE idx = ?', [title, content, item_idx]);
            await connection.commit();
            return results;
        } catch (e) {
            await connection.rollback();
            return false;
        } finally {
            connection.release();
        }
    },

    findUser : async (id) => {
        let connection;
        try {
            connection = await pool.getConnection(async conn => conn);
            const [results] = await connection.execute('SELECT * FROM USER WHERE id = ?', [id]);
            await connection.commit();
            return results;
        } catch (e) {
            await connection.rollback();
            return false;
        } finally {
            connection.release();
        }
    },

    insertUser : async (id, pw) => {
        let connection;
        try {
            connection = await pool.getConnection(async conn => conn);
            const [results] = await connection.execute('INSERT INTO USER (id, pw) VALUES (?, ?)', [id, pw]);
            await connection.commit();
            return results;
        } catch (e) {
            await connection.rollback();
            return false;
        } finally {
            connection.release();
        }
    },

    makeBoard : async (user_idx) => {
        let connection;
        try {
            connection = await pool.getConnection(async conn => conn);
            const [results] = await connection.execute('INSERT INTO BOARD (USER_idx) VALUES (?)', [user_idx]);
            await connection.commit();
            return results;
        } catch (e) {
            await connection.rollback();
            return false;
        } finally {
            connection.release();
        }
    },

    makeList : async (title, board_idx) => {
        let connection;
        try {
            connection = await pool.getConnection(async conn => conn);
            const [results] = await connection.execute('INSERT INTO LIST (title, BOARD_idx) VALUES (?, ?)', [title, board_idx]);
            await connection.commit();
            return results;
        } catch (e) {
            await connection.rollback();
            return false;
        } finally {
            connection.release();
        }
    },
    
    getAllUser : async () => {
        let connection;
        try {
            connection = await pool.getConnection(async conn => conn);
            const [results] = await connection.execute('SELECT idx, id, admin FROM USER');
            await connection.commit();
            return results;
        } catch (e) {
            await connection.rollback();
            return false;
        } finally {
            connection.release();
        }
    },

    updateUser : async (idx, admin) => {
        let connection;
        try {
            connection = await pool.getConnection(async conn => conn);
            const [results] = await connection.execute('UPDATE USER SET admin = ? WHERE idx = ?', [admin, idx]);
            await connection.commit();
            return results;
        } catch (e) {
            await connection.rollback();
            return false;
        } finally {
            connection.release();
        }
    },

    deleteUser : async (idx) => {
        let connection;
        try {
            connection = await pool.getConnection(async conn => conn);
            const [results] = await connection.execute('DELETE FROM USER WHERE idx = ?', [idx]);
            await connection.commit();
            return results;
        } catch (e) {
            await connection.rollback();
            return false;
        } finally {
            connection.release();
        }
    }
};