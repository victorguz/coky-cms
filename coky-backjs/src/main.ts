import express, { Application } from "express";
import { usersService } from "./app/classes/built-in/users/users.service";
import morgan from "morgan";
import cors from "cors";
import dotenv from "dotenv";

class Main {

    public app: Application;

    constructor() {
        this.app = express()
        this.config()
        this.routes()
        this.start()
    }

    config(): void {
        dotenv.config();
        this.app.set("port", process.env.PORT || 8888)
        this.app.use(cors())
        this.app.use(morgan("combined"))
        this.app.use(express.json())
        this.app.use(express.urlencoded({ extended: false }))
    }

    routes(): void {
        this.app.use(usersService.startRoute, usersService.router)
    }

    start(): void {
        this.app.listen(this.app.get("port"), async () => {
            console.log("On port: " + this.app.get("port"))
        })
    }
}

new Main();