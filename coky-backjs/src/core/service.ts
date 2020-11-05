import { Router, Request, Response } from "express";
import { Controller } from "./controller";

export abstract class Service<T, K> {
    
    public startRoute?: string;
    
    public router: Router = Router();

    constructor(private controller: Controller<T, K>) {
        this.getRoutes()
    }

    getRoutes(): void {
        this.index()
        this.all()
        this.by()
        this.orderby()
        this.new()
        this.update()
        this.delete()
    }


    index() {
        this.router.get("/", async (req, res) => { this.controller.index(req, res); });
    }

    all() {
        this.router.get("/all/:limit/", async (req, res) => { this.controller.all(req, res); });
        this.router.get("/all/:limit/:offset", async (req, res) => { this.controller.all(req, res); });
    }
    /**
     * El método "By" devuelve los registros que coinciden con 
     * la columna y el valor dado.
     * 
     */
    by() {
        this.router.get("/by/:column/:value", async (req, res) => { this.controller.by(req, res); });
    }
    /**
     * El método "orderby" devuelve todos los registros, pero ordenados por la columna y la dirección (asc, desc). También se puede definir un limit y un offset
     */
    orderby() {
        this.router.get("/orderby/:column/:order", async (req, res) => { this.controller.orderby(req, res); });
        this.router.get("/orderby/:column/:order/:limit/:offset", async (req, res) => { this.controller.orderby(req, res); });
    }


    new() {
        this.router.post("/new", async (req, res) => { this.controller.new(req, res); });
    }
    update() {
        this.router.put("/update", async (req, res) => { this.controller.update(req, res); });
    }
    delete() {
        this.router.delete("/delete", async (req, res) => { this.controller.delete(req, res); });
    }
}
