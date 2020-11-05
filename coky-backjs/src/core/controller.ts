import { Request, Response } from "express";
import pool from "../database"

export abstract class Controller<T, K> {
    public ENTITY!: String;
    public PLURAL_ENTITY!: String;
    public TABLE!: String;

    index(req: Request, res: Response) {
        res.send("Index")
    }

    public async all(req: Request, res: Response) {
        let { limit, offset } = req.params;
        let query = `SELECT * FROM ${this.TABLE} LIMIT ${limit ? limit : 100}  OFFSET ${offset ? offset : 0} `;
        const result = await pool.query(query);
        res.send(result)

    }



    public async by(req: Request, res: Response) {
        const { column, value } = req.params;
        let query = `SELECT * FROM ${this.TABLE} `;
        if (column && typeof column === "string" && value && typeof value === "string") {
            query += ` WHERE ${column} = ${value} `
        } else {
            res.send(this.PLURAL_ENTITY + ".orderby: Estás enviando un tipo de dato inválido")
        }

        const result = await pool.query(query);
        res.send(result)
    }

    public async orderby(req: Request, res: Response) {
        const { column, order, limit, offset } = req.params;
        let query = `SELECT * FROM ${this.TABLE} `;
        if (column && typeof column === "string" && !Number(column) && order && typeof order === "string" && !Number(order)) {
            query += ` ORDER BY ${column} ${order} `
        } else {
            res.json(
                {
                    message: "Estás enviando un tipo de dato inválido.",
                    entity: this.PLURAL_ENTITY + ".orderby",
                    params_description: "/:column(String)/:order(String)/:limit?(Integer)/:offset?(Integer)",
                    params_sended: `/:column(${typeof column})/:order(${typeof order})/:limit(${typeof limit})/:offset(${typeof offset})`,
                }
            )
        }
        query += ` LIMIT ${limit ? limit : 100}  OFFSET ${offset ? offset : 0} `;

        const result = await pool.query(query);
        res.send(result)
    }

    public async new(req: Request, res: Response) {
        pool.query("INSERT INTO coky_users SET (?)", [req.body])
        res.send("Hello")
    }

    public async update(req: Request, res: Response) {
        pool.query("DESCRIBE coky_users");
        res.send("Hello")
    }

    public async delete(req: Request, res: Response) {
        pool.query("DESCRIBE coky_users");
        res.send("Hello")
    }

    public async describe(req: Request, res: Response) {
        const result = await pool.query("DESCRIBE coky_users");
        res.send(result)
    }
    /**
     * Convierte un objeto en el tipo de dato modelo
     * @param item 
     */
    abstract model(item: T): T;
}