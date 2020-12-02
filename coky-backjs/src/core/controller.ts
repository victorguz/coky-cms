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
     * Devuelve todos los campos de los registros de la tabla ${this.entity.table} teniendo en cuenta el limit y offset
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
        } catch (err) {
            res.json({ error: err, message: err.message });
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
            let { column, value, limit, offset } = req.params;
            if (!check.isNullUndefinedOrEmpty(column) && Number.isInteger(column)) {
                res.json({ message: "column is not string" })
                // throw new CokyError("TYPE_ERROR", "CONTOLLER", { method: "by", field: "column" });
            }
            if (!check.isNullUndefinedOrEmpty(limit) && !Number(limit) && !Number.isInteger(limit)) {
                res.json({ message: "limit is not int" })
                // throw new CokyError("TYPE_ERROR", "CONTOLLER", { method: "by", field: "limit" });
            }
            if (!check.isNullUndefinedOrEmpty(offset) && !Number(offset) && !Number.isInteger(offset)) {
                res.json({ message: "offset is not int" })
                // throw new CokyError("TYPE_ERROR", "CONTOLLER", { method: "by", field: "offset" });
            }
            if (!check.isNullUndefinedOrEmpty(value) && !Number.isInteger(value) && !Number(value)) {
                res.json({ message: "value is not number" })
                value = "'" + value + "'";
            }

            let query = `SELECT * FROM ${this.entity.table} 
            WHERE ${column ? column : "id"} = ${value ? value : "null"} 
            ORDER BY id DESC LIMIT ${limit ? limit : 100} OFFSET  ${offset ? offset : 0}`;
            let result = await pool.query(query);
            if (Number(limit) == 1 && result.length >= 1) {
                result = result[0];
            }
            res.json(result)
        } catch (err) {
            res.json({ error: err, message: err.message });
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
        } catch (err) {
            res.json({ error: err, message: err.message });
        }
    }

    /**
     * Añade un registro a la tabla ${this.entity.table} 
     * @param req request 
     * @param res response
     */
    public async create(req: Request, res: Response): Promise<void> {
        try {
            let { fields, values } = req.body;
            if (!fields && !values) {
                throw new CokyError("BODY_ERROR", "CONTROLLER");
            }
            if (fields.length != values.length) {
                throw new CokyError("FIELDS_VALUES_LENGTH", "CONTROLLER")
            }

            let query = "INSERT INTO " + this.entity.table + " ( " + fields + " ) VALUES (?)";
            await pool.query(query, [values]);

            // console.log(req.body.entity);
            res.json(req.body);
        } catch (err) {
            res.json({ error: err, message: err.message });
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
            let { fields, values } = req.body;
            let query = "UPDATE " + this.entity.table + " SET "
            let where = " WHERE "
            if (!fields && !values) {
                throw new CokyError("BODY_ERROR", "CONTROLLER");
            }
            if (fields.length != values.length) {
                throw new CokyError("FIELDS_VALUES_LENGTH", "CONTROLLER")
            }
            for (let i = 0; i < fields.length; i++) {
                let field = fields[i];
                let value = values[i];

                if (!check.isType("number", value)) {
                    value = "'" + value + "'";
                }

                if (field != "id") {
                    query += field + " = " + value + ", ";
                } else {
                    where += field + " = " + value + " LIMIT 1 ";
                }

            }

            query += where;
            await pool.query(query, [fields]);

            res.json({
                message: "El usuario ha sido actualizado.",
                id: id
            })
        } catch (err) {
            res.json({ error: err, message: err.message });
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
        } catch (err) {
            res.json({ error: err, message: err.message });
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
        } catch (err) {
            res.json({ error: err, message: err.message });
        }
    }

}