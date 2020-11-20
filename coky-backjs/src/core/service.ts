import { Router, Request, Response } from "express";
import { Controller } from "./controller";

/**
 * Clase que se hereda en todos los servicios. Realiza las peticiones a la base de datos a travez del controlador a travez de las rutas.
 */
export abstract class Service<T> {

    public startRoute?: string;

    public router: Router = Router();

    constructor(private controller: Controller<T>) {
        this.getRoutes()
    }
    /**
     * Obtiene las rutas (los métodos son para hacerlo ver mas ordenado)
     */
    getRoutes(): void {
        this.index()
        this.all()
        this.by()
        this.orderby()
        this.create()
        this.update()
        this.delete()
        this.describe()
    }

    /**
     * Métodos iniciales, que probablemente se usarían para renderizar html
     */
    index() {
        this.router.get("/", async (req, res) => { this.controller.index(req, res,); });
    }
    /**
     * Obtiene todos los campos en un rango
     */
    all() {
        this.router.get("/all/", async (req, res) => { this.controller.all(req, res); });
        this.router.get("/all/:limit/", async (req, res) => { this.controller.all(req, res); });
        this.router.get("/all/:limit/:offset", async (req, res) => { this.controller.all(req, res); });
    }
    /**
     * El método "By" devuelve los registros que coinciden con 
     * la columna y el valor dado. También se puede definir un limit y offset
     * 
     */
    by() {
        this.router.get("/by/:value", async (req, res) => { this.controller.by(req, res); });
        this.router.get("/by/:column/:value", async (req, res) => { this.controller.by(req, res); });
        this.router.get("/by/:column/:value/:limit/:offset", async (req, res) => { this.controller.by(req, res); });
    }

    /**
     * El método "orderby" devuelve todos los registros, ordenados por columna y dirección (asc, desc). También se puede definir un limit y un offset
     */
    orderby() {
        this.router.get("/orderby/:column/:order", async (req, res) => { this.controller.orderby(req, res); });
        this.router.get("/orderby/:column/:order/:limit/:offset", async (req, res) => { this.controller.orderby(req, res); });
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
