import { Router } from "express";
import { dniController } from "./dnis.controller"

class DNIRoutes {

    public router: Router = Router();

    constructor() {
        this.config()
    }

    config(): void {
        this.router.get("/dnis", dniController.index)
    }
}
export const dniRoutes = new DNIRoutes().router