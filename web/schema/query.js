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

    updateUser : async (user_idx, admin) => {
        let connection;
        try {
            connection = await pool.getConnection(async conn => conn);
            const [results] = await connection.execute('UPDATE USER SET admin = ? WHERE idx = ?', [admin, user_idx]);
            await connection.commit();
            return results;
        } catch (e) {
            await connection.rollback();
            return false;
        } finally {
            connection.release();
        }
    },

    deleteUser : async (user_idx) => {
        let connection;
        try {
            connection = await pool.getConnection(async conn => conn);
            const [results] = await connection.execute('DELETE FROM USER WHERE idx = ?', [user_idx]);
            await connection.commit();
            return results;
        } catch (e) {
            await connection.rollback();
            return false;
        } finally {
            connection.release();
        }
    },

    getPermissionOfBoard : async (board_idx) => {
        let connection;
        try {
            connection = await pool.getConnection(async conn => conn);
            const [results] = await connection.execute('SELECT board_idx, id, authentic FROM PERMISSION JOIN USER ON USER.idx = PERMISSION.USER_idx AND PERMISSION.BOARD_idx = ?', [board_idx]);
            await connection.commit();
            return results;
        } catch (e) {
            await connection.rollback();
            return false;
        } finally {
            connection.release();
        }
    },

    updatePermissionOfBoard : async (authentic, board_idx, id) => {
        let connection;
        try {
            connection = await pool.getConnection(async conn => conn);
            const [results] = await connection.execute('UPDATE PERMISSION SET authentic = ? WHERE BOARD_idx = ? AND USER_idx = (SELECT idx FROM USER WHERE id = ?)', [authentic, board_idx, id]);
            await connection.commit();
            return results;
        } catch (e) {
            await connection.rollback();
            return false;
        } finally {
            connection.release();
        }
    },

    deletePermissionOfBoard : async (board_idx, id) => {
        let connection;
        try {
            connection = await pool.getConnection(async conn => conn);
            const [results] = await connection.execute('DELETE FROM PERMISSION WHERE BOARD_idx = ? AND USER_idx = (SELECT idx FROM USER WHERE id = ?)', [board_idx, id]);
            await connection.commit();
            return results;
        } catch (e) {
            await connection.rollback();
            return false;
        } finally {
            connection.release();
        }
    },

    insertPermissionOfBoard : async (authentic, board_idx, id) => {
        let connection;
        try {
            connection = await pool.getConnection(async conn => conn);
            const [results] = await connection.execute('INSERT INTO PERMISSION (authentic, BOARD_idx, USER_idx) VALUES (?, ?, (SELECT idx FROM USER WHERE id = ?))', [authentic, board_idx, id]);
            await connection.commit();
            return results;
        } catch (e) {
            await connection.rollback();
            return false;
        } finally {
            connection.release();
        }
    },

    getAllUserExceptForMe : async (id) => {
        let connection;
        try {
            connection = await pool.getConnection(async conn => conn);
            const [results] = await connection.execute('SELECT id FROM USER WHERE !(id = ?)', [id]);
            await connection.commit();
            return results;
        } catch (e) {
            await connection.rollback();
            return false;
        } finally {
            connection.release();
        }
    },

    getPermissionOfUser : async (id) => {
        let connection;
        try {
            connection = await pool.getConnection(async conn => conn);
            const [results] = await connection.execute('SELECT U.id, P.authentic FROM PERMISSION P JOIN BOARD B JOIN USER U ON B.USER_idx = U.idx ON B.idx = P.BOARD_idx WHERE P.USER_idx = (SELECT idx FROM USER WHERE id = ?)', [id]);
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