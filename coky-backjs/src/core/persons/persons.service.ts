import { Router } from "express";
import { personController } from "./persons.controller"

class PersonsRoutes {

    public router: Router = Router();

    constructor() {
        this.config()
    }

    config(): void {
        this.router.get("/", (req, res) => {
            personController.index(req, res)
        })
    }
}
export const personRoutes = new PersonsRoutes().router