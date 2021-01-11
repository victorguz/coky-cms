import keys from "./keys";
import mariadb from "mariadb";

const pool = mariadb.createPool(keys.db)

pool.getConnection();

export default pool;