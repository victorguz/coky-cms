import { Request, Response } from "express";
import Person from "./persons.model";

export class PersonsController {

    // persons: Person = new Person;
    index(req: Request, res: Response) {
        // persons.sync()
        // persons.build({
        //     name: "Victor",
        //     lastname: "Guzman",
        //     birthdate: new Date(),
        //     nid_id: 0,
        //     email_id: null,
        //     phone_id: null,
        //     direction_id: null,
        //     status: 0,
        // })
        res.json()

    }


}

export const personController = new PersonsController();