import { Request, Response } from "express";

export class Secure {

    public static getReqHeader(req: Request, res: Response) {
        res.send("Hola")
    }

}