import { db } from "../config/config";
import mariadb from "mariadb";

export module Database {
    export const pool: mariadb.Pool = mariadb.createPool(db)

    try {
        pool.getConnection();
    } catch (error) {
        console.log(error)
    }
}

export interface DatabaseConfig {
    host: string,
    port: number,
    user: string,
    password: string,
    database: string,
}