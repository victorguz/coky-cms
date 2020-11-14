import express, { Application } from "express";
import { usersService } from "./app/users/users.service";
import morgan from "morgan";
import cors from "cors";

class Main {

    public app: Application;

    constructor() {
        this.app = express()
        this.config()
        this.routes()
        this.start()
    }

    config(): void {
        this.app.set("port", process.env.PORT || 8080)
    }

    routes(): void {
        this.app.use(cors())
        this.app.use(morgan("combined"))
        this.app.use(express.json())
        this.app.use(express.urlencoded({ extended: false }))
        this.app.use(usersService.startRoute, usersService.router)
    }

    start(): void {
        this.app.listen(this.app.get("port"), async () => {
            console.log("On port: " + this.app.get("port"))

        })
    }
}

new Main();