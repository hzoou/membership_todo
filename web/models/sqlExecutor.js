const pool = require('../database/connection').pool();

module.exports = async (query, values) => {
    try {
        const connection = await pool.getConnection(async conn => conn);
        try {
            const [results] = await connection.execute(query, values);
            await connection.commit();
            return results;
        } catch (e) {
            await connection.rollback();
            return false;
        } finally {
            connection.release();
        }
    } catch (e) {
        console.log(e);
        return false;
    }
};