import keys from "./keys";

const mariadb = require("mariadb");

const pool = mariadb.createPool(keys.db)

// async function getConnection() {
//     try {
//         const connection = await pool.getConnection();
//         return connection;
//     } catch (error) {
//         console.log(error)
//     }
// }
pool.getConnection();

export default pool;
// export default getConnection().then(connection =>{});