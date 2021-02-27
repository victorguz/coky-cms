import { Router, Request, Response } from "express";
import { Controller } from "./controller";
import { Secure } from "./secure";

/**
 * Clase que se hereda en todos los servicios. Realiza las peticiones a la base de datos a travez del controlador a travez de las rutas.
 */
export abstract class Service<T> {

    public startRoute?: string;
    public ignoreDefaultRoutes: boolean = false;
    public useHeaderKey: boolean = true;

    public router: Router = Router();

    constructor(private controller: Controller<T>) {
        this.getRoutes()
    }
    /**
     * Obtiene las rutas (los métodos son para hacerlo ver mas ordenado)
     */
    getRoutes(): void {
        if (!this.ignoreDefaultRoutes) {
            this.views()
            this.all()
            this.by()
            this.orderby()
            this.create()
            this.update()
            this.delete()
            this.describe()
        }
    }

    /**
     * Métodos iniciales, que probablemente se usarían para renderizar html
     */
    views() {
        // this.router.get("/", Secure.getReqHeader(req, res), async (req, res) => { this.controller.index(req, res,); });
        this.router.get("/", async (req, res) => { this.controller.index(req, res,); });
    }

    /**
     * El método "all" devuelve todos los registros, ordenados por columna y dirección (asc, desc). También se puede definir un limit y un offset
     */
    all() {
        this.router.get("/all/:limit/:offset/:column/:order", async (req, res) => { this.controller.all(req, res); });
    }
    /**
     * El método "By" devuelve los registros que coinciden con 
     * la columna y el valor dado. También se puede definir un limit y offset
     * 
     */
    by() {
        this.router.get("/by/:column/:value/:limit/:offset", async (req, res) => { this.controller.by(req, res); });
    }


    orderby() {
    }

    /**
     * El método "create" añade una instancia de la entidad a la base de datos
     */
    create() {
        this.router.post("/create", async (req, res) => { this.controller.create(req, res); });
    }

    /**
     * El método "update" modifica una instancia de la entidad en la base de datos
     */
    update() {
        this.router.put("/update/:id", async (req, res) => { this.controller.update(req, res); });
    }

    /**
     * El método "delete" elimina una instancia de la entidad de base de datos
     */
    delete() {
        this.router.delete("/delete/:id", async (req, res) => { this.controller.delete(req, res); });
    }
    /**
     * El método "describe" describirá los campos de la entidad de la base de datos
     */
    describe() {
        this.router.get("/describe", async (req, res) => { this.controller.describe(req, res); });
    }
}
