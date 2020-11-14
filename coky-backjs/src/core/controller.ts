import { Request, Response } from "express";
import { User } from "../app/users/users.model";
import pool from "../database"
import { Model, ModelEntity } from "./model";

export abstract class Controller<T, K> {

    public entity!: ModelEntity;

    /**
     * Devuelve la página inicial, puede ser usada para renderizar home..
     * @param req 
     * @param res 
     */
    index(req: Request, res: Response) {
        res.send("Index")
    }

    /**
     * Devuelve todos los registros de la tabla ${this.entity.table} teniendo en cuenta el limit y offset
     * @param req 
     * @param res 
     */
    public async all(req: Request, res: Response) {
        try {
            let { limit, offset } = req.params;
            let query = `SELECT * FROM ${this.entity.table} LIMIT ${limit ? limit : 100}  OFFSET ${offset ? offset : 0} `;
            const result = await pool.query(query);
            res.send(result)
        } catch (error) {
            console.log(error)
        }
    }


    /**
     * Devuelve todos los registros de ${this.entity.table} que coinciden con la columna y el valor dado, utilizando limit? y offset?.
     * la columa por defecto es "id". Por lo cual puede mandar solo el valor (sin limit ni offset).
     * @param req 
     * @param res 
     */
    public async by(req: Request, res: Response) {
        try {
            const { column, value } = req.params;

            let query = `SELECT * FROM ${this.entity.table} `;

            query += ` WHERE ${column ? column : "id"} = ${value} `

            const result = await pool.query(query);
            res.send(result)
        } catch (error) {
            console.log(error)
        }
    }

    /**
     * Devuelve un solo registro de ${this.entity.table} que coincide con la columna y el valor dado
     * @param req 
     * @param res 
     */
    public async oneBy(req: Request, res: Response) {
        try {
            const { column, value } = req.params;
            let query = `SELECT * FROM ${this.entity.table} `;
            if (column && typeof column === "string" && value && typeof value === "string") {
                query += ` WHERE ${column} = ${value} `
            } else {
                res.send(this.entity.plural_name + ".orderby: Estás enviando un tipo de dato inválido")
            }

            const result = await pool.query(query);
            res.send(result)
        } catch (error) {
            console.log(error)
        }
    }

    /**
     * Devuelve todos los registros de la tabla ${this.entity.table} en el orden dado por columna y orientación teniendo en cuenta el limit y offset
     * @param req 
     * @param res 
     */
    public async orderby(req: Request, res: Response) {
        try {
            const { column, order, limit, offset } = req.params;
            let query = `SELECT * FROM ${this.entity.table} `;
            if (column && typeof column === "string" && !Number(column) && order && typeof order === "string" && !Number(order)) {
                query += ` ORDER BY ${column} ${order} `
            } else {
                res.json(
                    {
                        message: "Estás enviando un tipo de dato inválido.",
                        entity: this.entity.plural_name + ".orderby",
                        params_description: "/:column(String)/:order(String)/:limit?(Integer)/:offset?(Integer)",
                        params_sended: `/:column(${typeof column})/:order(${typeof order})/:limit(${typeof limit})/:offset(${typeof offset})`,
                    }
                )
            }
            query += ` LIMIT ${limit ? limit : 100}  OFFSET ${offset ? offset : 0} `;

            const result = await pool.query(query);
            res.send(result)
        } catch (error) {
            console.log(error)
        }
    }

    /**
     * Añade un registro a la tabla ${this.entity.table} 
     * @param req 
     * @param res 
     */
    public async create(req: Request, res: Response): Promise<void> {
        try {
            // await pool.query("INSERT INTO coky_users (first_name, second_name, first_lastname, second_lastname, username, password, email, data, role, status) VALUES (?)", [req.body])
            // await pool.query("INSERT INTO coky_users VALUES (?)", [req.body])
            // console.log(req.params)
            let user = new User();
            user.set(req.body);
            console.log(user.get())
            res.json({ userr: user.get(), body: req.body })
        } catch (error) {
            console.log(error)
        }
    }

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

    public async describe(req: Request, res: Response) {
        try {
            const result = await pool.query("DESCRIBE coky_users");
            res.json(result)
        } catch (error) {
            console.log(error)
        }
    }

    /**
     * Convierte un objeto en el tipo de dato modelo
     * @param item 
     */
    abstract model(item: any): T;
}