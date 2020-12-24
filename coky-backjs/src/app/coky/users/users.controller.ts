import { Request, Response } from "express";
import { Controller } from "../../../core/controller"
import { CokyErrors } from "../../../core/errors";
import { ModelEntity } from "../../../core/model";
import { User } from "./users.model";
import jwt from "jsonwebtoken";

class UsersController extends Controller<User> {
    public entity: ModelEntity = User.ENTITY;

    /**
     * Permite confirmar si el usuario con las credenciales recibidas existe y es correcto
     * @param req request 
     * @param res response
     */
    public async login(req: Request, res: Response) {
        try {
            const { username, password } = req.body;
            if (username && password) {
                let response;
                let result1;
                let result2;
                let headers;

                const query1 = `SELECT id FROM ${this.entity.table} 
                    WHERE username = '${username}'`;
                const query2 = `SELECT id FROM ${this.entity.table} 
                    WHERE username = '${username}' and password = '${password}'`;

                result1 = await this.pool.query(query1);
                result1 = result1 && result1.length ? result1[0] : null;

                if (result1 == null) {
                    response = {
                        result: null,
                        success: false,
                        message: "El usuario no existe"
                    }
                } else {
                    result2 = await this.pool.query(query2);
                    result2 = result2 && result2.length ? result2[0] : null;
                    response = {
                        result: result2,
                        success: result2 == null ? false : true,
                        message: result2 ? "OK" : "La contraseña es incorrecta"
                    }
                    if (result2) {
                        headers = jwt.sign({ _id: result2 }, process.env.COKY_JWT_SECRET_KEY || "WACHUWACHU_hola");
                    }
                }
                res.header("auth-token", jwt.sign({ _id: result2 }, process.env.COKY_JWT_SECRET_KEY || "WACHUWACHU_hola")).json(response)
            } else {
                throw new Error(CokyErrors.getMessage("NOT_EMPTY", "CONTOLLER", { method: "login", field: "username and password" }))
            }
        } catch (err) {
            if (err.message.includes("SQL")) {
                let message = CokyErrors.getMessage(err.message, "MYSQL")
                res.status(500).json(
                    {
                        error: err, message: message
                    });
            } else {
                res.status(500).json({ error: err, message: err.message });
            }
        }
    }
}

export const usersController = new UsersController();