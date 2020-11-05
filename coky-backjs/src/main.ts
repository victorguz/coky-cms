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
        this.app.set("port", process.env.PORT || 8081)
    }

    routes(): void {
        this.app.use(usersService.startRoute, usersService.router)
        this.app.use(cors())
        this.app.use(morgan("dev"))
        this.app.use(express.json())
        this.app.use(express.urlencoded({ extended: false }))
    }

    start(): void {
        this.app.listen(this.app.get("port"), async () => {
            console.log("On port: " + this.app.get("port"))

        })
    }
}

new Main();