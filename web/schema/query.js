const pool = require('../database/connection').pool();

module.exports = {
    getBoardIdxByUserId : async (id) => {
        try {
            const connection = await pool.getConnection(async conn => conn);
            try {
                const [results] = await connection.execute('SELECT BOARD.idx, BOARD.private FROM BOARD WHERE BOARD.USER_idx = (SELECT USER.idx FROM USER WHERE USER.id = ?)', [id]);
                await connection.commit();
                return results;
            } catch (e) {
                await connection.rollback();
                return false;
            } finally {
                connection.release();
            }
        } catch (e) {
            return false;
        }
    },

    getAllListByBoard : async (board_idx) => {
        try {
            const connection = await pool.getConnection(async conn => conn);
            try {
                const [results] = await connection.execute('SELECT L.idx as LIST_idx, I.idx as ITEM_idx, L.title as LIST_title, I.title as ITEM_title FROM LIST L LEFT JOIN ITEM I ON I.LIST_idx = L.idx WHERE L.BOARD_idx = ?', [board_idx]);
                await connection.commit();
                return results;
            } catch (e) {
                await connection.rollback();
                return false;
            } finally {
                connection.release();
            }
        } catch (e) {
            return false;
        }
    },

    isAuthorizedUser : async (userIdx, boardIdx) => {
        try {
            const connection = await pool.getConnection(async conn => conn);
            try {
                const [results] = await connection.execute('SELECT * FROM PERMISSION WHERE USER_idx = ? AND BOARD_idx = ?', [userIdx, boardIdx]);
                await connection.commit();
                return results;
            } catch (e) {
                await connection.rollback();
                return false;
            } finally {
                connection.release();
            }
        } catch (e) {
            return false;
        }
    },

    insertItem : async (title, list_idx) => {
        const connection = await pool.getConnection(async conn => conn);
        try {
            try {
                const [results] = await connection.execute('INSERT INTO ITEM (title, LIST_idx) VALUES (?, ?)', [title, list_idx]);
                await connection.commit();
                return results;
            } catch (e) {
                await connection.rollback();
                return false;
            }
        } catch (e) {
            return false;
        } finally {
            connection.release();
        }
    },

    deleteItem : async (item_idx) => {
        try {
            const connection = await pool.getConnection(async conn => conn);
            try {
                const [results] = await connection.execute('DELETE FROM ITEM WHERE idx = ?', [item_idx]);
                await connection.commit();
                return results;
            } catch (e) {
                await connection.rollback();
                return false;
            } finally {
                connection.release();
            }
        } catch (e) {
            return false;
        }
    },

    updateItem : async (title, content, item_idx) => {
        try {
            const connection = await pool.getConnection(async conn => conn);
            try {
                const [results] = await connection.execute('UPDATE ITEM SET title = ?, content = ? WHERE idx = ?', [title, content, item_idx]);
                await connection.commit();
                return results;
            } catch (e) {
                await connection.rollback();
                return false;
            } finally {
                connection.release();
            }
        } catch (e) {
            return false;
        }
    },

    findUser : async (id) => {
        try {
            const connection = await pool.getConnection(async conn => conn);
            try {
                const [results] = await connection.execute('SELECT * FROM USER WHERE id = ?', [id]);
                await connection.commit();
                return results;
            } catch (e) {
                await connection.rollback();
                return false;
            } finally {
                connection.release();
            }
        } catch (e) {
            return false;
        }
    },

    insertUser : async (id, pw) => {
        try {
            const connection = await pool.getConnection(async conn => conn);
            try {
                const [results] = await connection.execute('INSERT INTO USER (id, pw) VALUES (?, ?)', [id, pw]);
                await connection.commit();
                return results;
            } catch (e) {
                await connection.rollback();
                return false;
            } finally {
                connection.release();
            }
        } catch (e) {
            return false;
        }
    },

    makeBoard : async (user_idx) => {
        try {
            const connection = await pool.getConnection(async conn => conn);
            try {
                const [results] = await connection.execute('INSERT INTO BOARD (USER_idx) VALUES (?)', [user_idx]);
                await connection.commit();
                return results;
            } catch (e) {
                await connection.rollback();
                return false;
            } finally {
                connection.release();
            }
        } catch (e) {
            return false;
        }
    },

    makeList : async (title, board_idx) => {
        try {
            const connection = await pool.getConnection(async conn => conn);
            try {
                const [results] = await connection.execute('INSERT INTO LIST (title, BOARD_idx) VALUES (?, ?)', [title, board_idx]);
                await connection.commit();
                return results;
            } catch (e) {
                await connection.rollback();
                return false;
            } finally {
                connection.release();
            }
        } catch (e) {
            return false;
        }
    },
    
    getAllUser : async () => {
        try {
            const connection = await pool.getConnection(async conn => conn);
            try {
                const [results] = await connection.execute('SELECT idx, id, admin FROM USER');
                await connection.commit();
                return results;
            } catch (e) {
                await connection.rollback();
                return false;
            } finally {
                connection.release();
            }
        } catch (e) {
            return false;
        }
    },

    updateUser : async (idx, admin) => {
        try {
            const connection = await pool.getConnection(async conn => conn);
            try {
                const [results] = await connection.execute('UPDATE USER SET admin = ? WHERE idx = ?', [admin, idx]);
                await connection.commit();
                return results;
            } catch (e) {
                await connection.rollback();
                return false;
            } finally {
                connection.release();
            }
        } catch (e) {
            return false;
        }
    },

    deleteUser : async (idx) => {
        try {
            const connection = await pool.getConnection(async conn => conn);
            try {
                const [results] = await connection.execute('DELETE FROM USER WHERE idx = ?', [idx]);
                await connection.commit();
                return results;
            } catch (e) {
                await connection.rollback();
                return false;
            } finally {
                connection.release();
            }
        } catch (e) {
            return false;
        }
    }
};