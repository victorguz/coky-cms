import { Request, Response } from "express";

export class DNIController {


    index(req: Request, res: Response) {
        res.json({ text: "Hola mundo, estoy desde dnis" })
    }


}

export const dniController = new DNIController();