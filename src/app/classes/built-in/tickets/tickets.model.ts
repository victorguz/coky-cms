import { Model, ModelEntity } from "../../../core/model";


export class Ticket extends Model {

    public static ENTITY: ModelEntity = {
        name: "Ticket",
        plural_name: "Tickets",
        table: "coky_contacts",
        model: new Ticket()
    };

}
