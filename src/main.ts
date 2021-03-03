import express, { Application } from "express";
import morgan from "morgan";
import cors from "cors";
import dotenv from "dotenv";
import { routes } from "./app/config/routes";
import { CokyMail } from "./app/core/mails";

class Main {

    public app: Application;

    constructor() {
        this.app = express()
        this.setConfig()
        this.setRoutes()
        this.start()
    }

    setConfig(): void {
        dotenv.config();
        this.app.set("port", process.env.PORT || 8888)
        this.app.use(cors())
        this.app.use(morgan("combined"))
        this.app.use(express.json())
        this.app.use(express.urlencoded({ extended: false }))
    }

    setRoutes(): void {
        routes.forEach(service => {
            this.app.use(service.startRoute, service.router)
        });
    }

    start(): void {
        this.app.listen(this.app.get("port"), async () => {
            console.log("On port: " + this.app.get("port"))
        })
        const mail = new CokyMail()
        // mail.send()
    }
}

new Main();