import { Request, Response } from "express";
import pool from "../config/database"
import { Checks as check } from "./checks";
import { CokyErrors } from "./errors";
import { ModelEntity } from "./model";

/**
 * Clase que se hereda en todos los controladores. Realiza las consultas a la base de datos.
 */
export abstract class Controller<T> {

    public entity!: ModelEntity;
    public pool = pool;
    /**
     * Devuelve la página inicial, puede ser usada para renderizar html..
     * @param req request 
     * @param res response
     */
    index(req: Request, res: Response) {
        res.render("index")
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
            const result = await this.pool.query(query);
            const status = result ? 200 : 404;
            res.status(status).json(result)
        } catch (err) {
            if (err.message.includes("SQL")) {
                let message = CokyErrors.getMessage(err.message, "MYSQL")
                res.status(500).json({ error: err, message: message });
            } else {
                res.status(500).json({ error: err, message: err.message });
            }
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

            let query = `SELECT * FROM ${this.entity.table} 
            WHERE ${column ? column : "id"} = ${value ? Number(value) ? value : `'${value}'` : "null"} 
            ORDER BY id DESC LIMIT ${limit ? limit : 100} OFFSET  ${offset ? offset : 0}`;
            let result = await this.pool.query(query);
            if (Number(limit) == 1 && result.length >= 1) {
                result = result[0];
            }
            const status = result ? 200 : 404;
            res.status(status).json(result)
        } catch (err) {
            if (err.message.includes("SQL")) {
                let message = CokyErrors.getMessage(err.message, "MYSQL")
                res.status(500).json({ error: err, message: message });
            } else {
                res.status(500).json({ error: err, message: err.message });
            }
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

            let query = `SELECT * FROM ${this.entity.table} 
             ORDER BY ${column ? column : "id"} ${order ? order : "desc"} 
             LIMIT ${limit ? limit : 100}  OFFSET ${offset ? offset : 0}`;

            const result = await this.pool.query(query);
            const status = result ? 200 : 404;
            res.status(status).json(result)
        } catch (err) {
            if (err.message.includes("SQL")) {
                let message = CokyErrors.getMessage(err.message, "MYSQL")
                res.status(500).json({ error: err, message: message });
            } else {
                res.status(500).json({ error: err, message: err.message });
            }
        }
    }

    /**
     * Añade un registro a la tabla ${this.entity.table} 
     * @param req request 
     * @param res response
     */
    public async create(req: Request, res: Response): Promise<void> {
        try {
            let fields = []
            let values: any[] = [];

            for (const field in req.body) {
                if (Object.prototype.hasOwnProperty.call(req.body, field)) {
                    const value = req.body[field];
                    fields.push(field);
                    values.push(value);
                }
            }

            let query = "INSERT INTO " + this.entity.table + " ( " + fields + " ) VALUES (?)";

            let result = await this.pool.query(query, [values]);

            res.status(200).json({
                result: result,
                success: result ? true : false,
                message: `'${this.entity.name}' creado.`,
            });
        } catch (err) {
            if (err.message.includes("SQL")) {
                let message = CokyErrors.getMessage(err.message, "MYSQL")
                res.status(500).json({ error: err, message: message });
            } else {
                res.status(500).json({ error: err, message: err.message });
            }
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
            let query = `UPDATE ${this.entity.table} SET `
            let where = ` WHERE id = ${id}`;
            if (!fields && !values) {
                throw new Error(CokyErrors.getMessage("BODY_ERROR", "CONTROLLER"));
            }
            if (fields.length != values.length) {
                throw new Error(CokyErrors.getMessage("FIELDS_VALUES_LENGTH", "CONTROLLER"));
            }

            for (let i = 0; i < fields.length; i++) {
                let field = fields[i];
                let value = values[i];
                if (!check.isType("number", value)) {
                    value = `'${value}'`;
                }
                if (field != "id") {
                    query += `${field} = ${value} ${i < (fields.length - 1) ? "," : ""} `;
                }
            }

            query += where + " LIMIT 1 ";
            let result = await this.pool.query(query, [values]);

            const status = result && result.length ? 200 : 404;
            res.status(status).json({
                result: result,
                success: result ? true : false,
                message: `'${this.entity.name}' actualizado.`,
            })
        } catch (err) {
            if (err.message.includes("SQL")) {
                let message = CokyErrors.getMessage(err.message, "MYSQL")
                res.status(500).json({ error: err, message: message });
            } else {
                res.status(500).json({ error: err, message: err.message });
            }
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
            let result = await this.pool.query(`DELETE FROM coky_users WHERE id = ${id} LIMIT 1`);
            const status = result && result.length ? 200 : 404;
            res.status(status).json({
                result: result,
                success: result ? true : false,
                message: `'${this.entity.name}' eliminado.`,
            })
        } catch (err) {
            if (err.message.includes("SQL")) {
                let message = CokyErrors.getMessage(err.message, "MYSQL")
                res.status(500).json({ error: err, message: message });
            } else {
                res.status(500).json({ error: err, message: err.message });
            }
        }
    }

    /**
     * Describe los campos de {this.entity.table}
     * @param req request
     * @param res response
     */
    public async describe(req: Request, res: Response) {
        try {
            const result = await this.pool.query("DESCRIBE coky_users");
            const status = result && result.length ? 200 : 404;
            res.status(status).json(result)
        } catch (err) {
            if (err.message.includes("SQL")) {
                let message = CokyErrors.getMessage(err.message, "MYSQL")
                res.status(500).json({ error: err, message: message });
            } else {
                res.status(500).json({ error: err, message: err.message });
            }
        }
    }

}