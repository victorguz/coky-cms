import { Request, Response } from "express";
import pool from "../config/database"
import { CokyError } from "./exceptions";
import { Checks as check } from "./checks";
import { ModelEntity } from "./model";

/**
 * Clase que se hereda en todos los controladores. Realiza las consultas a la base de datos.
 */
export abstract class Controller<T> {

    public entity!: ModelEntity;

    /**
     * Devuelve la página inicial, puede ser usada para renderizar html..
     * @param req request 
     * @param res response
     */
    index(req: Request, res: Response) {
        res.send("Index")
    }

    /**
     * Devuelve todos los registros de la tabla ${this.entity.table} teniendo en cuenta el limit y offset
     * @param req request 
     * @param res response
     */
    public async all(req: Request, res: Response) {
        try {
            let { limit, offset } = req.params;
            let query = `SELECT * FROM ${this.entity.table} ORDER BY id DESC 
            LIMIT ${limit ? limit : 100}  OFFSET ${offset ? offset : 0} `;
            const result = await pool.query(query);
            res.send(result)
        } catch (error) {
            console.log(error)
        }
    }


    /**
     * Devuelve todos los registros de ${this.entity.table} que coinciden con la columna y el valor dado, utilizando limit? y offset?.
     * la columa por defecto es "id". Por lo cual puede mandar solo el valor (sin limit ni offset).
     * @param req request 
     * @param res response
     */
    public async by(req: Request, res: Response) {
        try {
            const { column, value } = req.params;

            let query = `SELECT * FROM ${this.entity.table} 
            WHERE ${column ? column : "id"} = ${value ? value : "null"} ORDER BY id DESC`

            const result = await pool.query(query);
            res.json(result)
        } catch (error) {
            console.log(error)
        }
    }

    /**
     * Devuelve un solo registro de ${this.entity.table} que coincide con la columna y el valor dado
     * @param req request 
     * @param res response
     */
    public async oneBy(req: Request, res: Response) {
        try {
            const { column, value } = req.params;
            if (column && !check.isType("string", column)) {
                throw new CokyError("TYPE_ERROR", "CONTOLLER", { method: "orderby", field: "column" });
            }
            if (value && check.isNullUndefinedOrEmpty(value)) {
                throw new CokyError("TYPE_ERROR", "CONTOLLER", { method: "orderby", field: "value" });
            }

            let query = `SELECT * FROM ${this.entity.table} 
            WHERE ${column ? column : "id"} = ${value ? value : "null"} ORDER BY id DESC LIMIT 1`
            const result = await pool.query(query);

            res.json(result)
        } catch (error) {
            console.log(error)
        }
    }

    /**
     * Devuelve todos los registros de la tabla ${this.entity.table} 
     * en el orden dado por columna y orientación teniendo en cuenta el limit y offset
     * @param req request 
     * @param res response
     */
    public async orderby(req: Request, res: Response) {
        try {
            const { column, order, limit, offset } = req.params;
            if (column && !check.isType("string", column)) {
                throw new CokyError("TYPE_ERROR", "CONTOLLER", { method: "orderby", field: "column" });
            }
            if (order && !check.isType("string", order)) {
                throw new CokyError("TYPE_ERROR", "CONTOLLER", { method: "orderby", field: "order" });
            }
            if (limit && !check.isType("int", limit)) {
                throw new CokyError("TYPE_ERROR", "CONTOLLER", { method: "orderby", field: "limit" });
            }
            if (offset && !check.isType("int", offset)) {
                throw new CokyError("TYPE_ERROR", "CONTOLLER", { method: "orderby", field: "offset" });
            }

            let query = `SELECT * FROM ${this.entity.table} 
             ORDER BY ${column ? column : "id"} ${order ? order : "desc"} 
             LIMIT ${limit ? limit : 100}  OFFSET ${offset ? offset : 0} `;

            const result = await pool.query(query);
            res.json(result)
        } catch (error) {
            console.log(error)
        }
    }

    /**
     * Añade un registro a la tabla ${this.entity.table} 
     * @param req request 
     * @param res response
     */
    public async create(req: Request, res: Response): Promise<void> {
        try {
            // await pool.query("INSERT INTO coky_users (first_name, second_name, first_lastname, second_lastname, username, password, email, data, role, status) VALUES (?)", [req.body])
            // await pool.query("INSERT INTO coky_users VALUES (?)", [req.body])
            // console.log(req.params)
            this.entity.model.set(req.body);
            console.log(this.entity.model.get())
            res.json({ userr: this.entity.model.get(), body: req.body })
        } catch (error) {
            console.log(error)
        }
    }
    /**
     * Actualiza un registro de {this.entity.table}
     * @param req request
     * @param res response
     */
    public async update(req: Request, res: Response): Promise<void> {
        try {
            const { id } = req.params;
            await pool.query("UPDATE coky_users SET ");
            res.json({
                message: "El usuario ha sido actualizado.",
                id: id
            })
        } catch (error) {
            console.log(error)
        }
    }

    /**
     * Elimina un registro de {this.entity.table}
     * @param req request
     * @param res response
     */
    public async delete(req: Request, res: Response): Promise<void> {
        try {
            const { id } = req.params;
            await pool.query("DELETE FROM coky_users WHERE id = ?", [id]);
            res.json({
                message: "El usuario ha sido eliminado.",
                id: id
            })
        } catch (error) {
            console.log(error)
        }
    }

    /**
     * Describe los campos de {this.entity.table}
     * @param req request
     * @param res response
     */
    public async describe(req: Request, res: Response) {
        try {
            const result = await pool.query("DESCRIBE coky_users");
            res.json(result)
        } catch (error) {
            console.log(error)
        }
    }

}