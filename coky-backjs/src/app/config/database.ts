import { db } from "./keys";
import mariadb from "mariadb";

const pool = mariadb.createPool(db)

pool.getConnection();

export default pool;