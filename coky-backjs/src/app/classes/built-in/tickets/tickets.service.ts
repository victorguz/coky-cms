import { Service } from "../../../core/service";
import { ticketsController } from "./tickets.controller";
import { Ticket } from "./tickets.model";

class TicketsService extends Service<Ticket>{

    public startRoute: string = "/tickets"
    public ignoreDefaultRoutes: boolean = false;

    getRoutes(): void {
        super.getRoutes()
    }

}

export const ticketsService = new TicketsService(ticketsController)