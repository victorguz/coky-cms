import { Model, ModelEntity } from "../../../core/model";


export class TicketResponse extends Model {

    public static ENTITY: ModelEntity = {
        name: "ticket_response",
        plural_name: "ticket_responses",
        table: "coky_ticket_responses",
        model: new TicketResponse()
    };

}
