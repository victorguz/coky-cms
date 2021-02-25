import { Service } from "../../../core/service";
import { ticketResponsesController } from "./ticket-responses.controller";
import { TicketResponse } from "./ticket-responses.model";

class TicketResponsesService extends Service<TicketResponse>{

    public startRoute: string = "/ticketResponses"
    public ignoreDefaultRoutes: boolean = false;

    getRoutes(): void {
        super.getRoutes()
    }

}

export const ticketResponsesService = new TicketResponsesService(ticketResponsesController)