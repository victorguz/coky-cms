import { Request, Response, Router } from "express";
import { Exceptions } from "./exceptions";
import { Model } from "./classes/model";

/**
 * Clase que se hereda en todos los controladores. Realiza las consultas a la base de datos.
 */
export abstract class Controller<T> {

    /**
     * Model instance
     */
    protected model!: Model<T>;

    /**
     * Ignore default routes of super()
     */
    protected ignoreDefaultRoutes: boolean = false;

    /**
     * Rutas del controlador
     */
    public router: Router = Router();

    public constructor() {
        //Init values here
        this.getRoutes()
    }

    /**
     * Devuelve la página inicial, puede ser usada para renderizar html..
     * @param req request 
     * @param res response
     */
    public index(req: Request, res: Response) {
        res.render("Wellcome to this api. This is a view, but doesn't have configured.")
    }

    /**
         * Devuelve todos los registros de la tabla ${this.entity.table} 
         * en el orden dado por columna y orientación teniendo en cuenta el limit y offset
         * @param req request 
         * @param res response
         */
    public async all(req: Request, res: Response) {
        try {
            const { column, order, limit, offset } = req.params;

            const result = await this.model.all(column, order, parseInt(limit), parseInt(offset));

            const status = result ? 200 : 404;
            res.status(status).json(result)
        } catch (err) {
            console.log(err)
            if (err.message.includes("SQL")) {
                let message = Exceptions.getMessage(err.message, "MYSQL")
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
            let { column, value, order, limit, offset } = req.params;

            const result = await this.model.getBy(column, value, order, parseInt(limit), parseInt(offset));
            const status = result ? 200 : 404;

            if (parseInt(limit) == 1 && result.length > 0) {
                res.status(status).json(result[0])
            } else {
                res.status(status).json(result)
            }

        } catch (err) {
            if (err.message.includes("SQL")) {
                let message = Exceptions.getMessage(err.message, "MYSQL")
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
            // let fields = []
            // let values: any[] = [];
            this.model.set(req.body);
            const result = await this.model.save();
            const status = result ? 200 : 404;

            // for (const field in req.body) {
            //     if (Object.prototype.hasOwnProperty.call(req.body, field)) {
            //         const value = req.body[field];
            //         if (field != "id" && field != "created" && field != "modified") {
            //             fields.push(field);
            //             values.push(value);
            //         }
            //     }
            // }

            // let query = "INSERT INTO " + this.entity.table + " ( " + fields + " ) VALUES (?)";

            // let result = await this.pool.query(query, [values]);

            res.status(200).json({
                result: result,
                success: result ? true : false,
                message: `'${this.model.table}' creado.`,
            });
        } catch (err) {
            if (err.message.includes("SQL")) {
                let message = Exceptions.getMessage(err.message, "MYSQL")
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
        // try {
        //     const { id } = req.params;
        //     let { fields, values } = req.body;
        //     let query = `UPDATE ${this.entity.table} SET `
        //     let where = ` WHERE id = ${id}`;
        //     if (!fields && !values) {
        //         throw new Error(Exceptions.getMessage("BODY_ERROR", "CONTROLLER"));
        //     }
        //     if (fields.length != values.length) {
        //         throw new Error(Exceptions.getMessage("FIELDS_VALUES_LENGTH", "CONTROLLER"));
        //     }

        //     for (let i = 0; i < fields.length; i++) {
        //         let field = fields[i];
        //         let value = values[i];
        //         if (!check.isType("number", value)) {
        //             value = `'${value}'`;
        //         }
        //         if (field != "id") {
        //             query += `${field} = ${value} ${i < (fields.length - 1) ? "," : ""} `;
        //         }
        //     }

        //     query += where + " LIMIT 1 ";
        //     let result = await this.pool.query(query, [values]);

        //     const status = result && result.length ? 200 : 404;
        //     res.status(status).json({
        //         result: result,
        //         success: result ? true : false,
        //         message: `'${this.entity.name}' actualizado.`,
        //     })
        // } catch (err) {
        //     if (err.message.includes("SQL")) {
        //         let message = Exceptions.getMessage(err.message, "MYSQL")
        //         res.status(500).json({ error: err, message: message });
        //     } else {
        //         res.status(500).json({ error: err, message: err.message });
        //     }
        // }
    }

    /**
     * Elimina un registro de {this.entity.table}
     * @param req request
     * @param res response
     */
    public async delete(req: Request, res: Response): Promise<void> {
        // try {
        //     const { id } = req.params;
        //     let result = await this.pool.query(`DELETE FROM coky_users WHERE id = ${id} LIMIT 1`);
        //     const status = result && result.length ? 200 : 404;
        //     res.status(status).json({
        //         result: result,
        //         success: result ? true : false,
        //         message: `'${this.entity.name}' eliminado.`,
        //     })
        // } catch (err) {
        //     if (err.message.includes("SQL")) {
        //         let message = Exceptions.getMessage(err.message, "MYSQL")
        //         res.status(500).json({ error: err, message: message });
        //     } else {
        //         res.status(500).json({ error: err, message: err.message });
        //     }
        // }
    }

    /**
     * Describe los campos de {this.entity.table}
     * @param req request
     * @param res response
     */
    public async describe(req: Request, res: Response) {
        // try {
        //     const result = await this.pool.query("DESCRIBE coky_users");
        //     const status = result && result.length ? 200 : 404;
        //     res.status(status).json(result)
        // } catch (err) {
        //     if (err.message.includes("SQL")) {
        //         let message = Exceptions.getMessage(err.message, "MYSQL")
        //         res.status(500).json({ error: err, message: message });
        //     } else {
        //         res.status(500).json({ error: err, message: err.message });
        //     }
        // }
    }

    public checkModel() {
        if (typeof this.model == "undefined" || this.model == null) {
            throw new Error(`Inicialize el model para este controlador`);
        }
    }

    /**
     * Obtiene las rutas (los métodos son para hacerlo ver mas ordenado)
     */
    private getRoutes(): void {
        if (!this.ignoreDefaultRoutes) {
            this.router.get("/", async (req, res) => { this.index(req, res,); });
            this.router.get("/all/:limit/:offset/:column/:order", async (req, res) => { this.all(req, res); });
            this.router.get("/by/:column/:value/:order/:limit/:offset", async (req, res) => { this.by(req, res); });
            this.router.post("/create", async (req, res) => { this.create(req, res); });
            this.router.put("/update/:id", async (req, res) => { this.update(req, res); });
            this.router.delete("/delete/:id", async (req, res) => { this.delete(req, res); });
            this.router.get("/describe", async (req, res) => { this.describe(req, res); });
        }
    }

}