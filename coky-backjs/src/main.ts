import express, { Application } from "express";
import { usersService } from "./app/classes/built-in/users/users.service";
import path from "path";
import morgan from "morgan";
import cors from "cors";
import dotenv from "dotenv";
import handlebars from "express-handlebars";

class Main {

    public app: Application;

    constructor() {
        this.app = express()
        this.config()
        this.routes()
        this.start()
    }

    views(): void {
        this.app.set("views", path.join(__dirname, "app", "views"))
        this.app.engine(".hbs", handlebars(
            {
                layoutsDir: path.join(this.app.get("views"), "layouts"),
                partialsDir: path.join(this.app.get("views"), "partials"),
                extname: ".hbs",
                defaultLayout: "main"

            }
        ))
    }

    config(): void {
        dotenv.config();
        this.views()
        this.app.set("port", process.env.PORT || 8081)
        this.app.use(cors())
        this.app.use(morgan("combined"))
        this.app.use(express.json())
        this.app.use(express.urlencoded({ extended: false }))
        this.app.set("view engine", ".hbs");
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