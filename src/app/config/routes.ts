import { categoriesService } from "../../app/classes/built-in/categories/categories.service";
import { contactsService } from "../../app/classes/built-in/contacts/contacts.service";
import { inventoryService } from "../../app/classes/built-in/inventory/inventory.service";
import { pricesService } from "../../app/classes/built-in/prices/prices.service";
import { productsService } from "../../app/classes/built-in/products/products.service";
import { ticketResponsesService } from "../../app/classes/built-in/ticket-responses/ticket-responses.service";
import { ticketsService } from "../../app/classes/built-in/tickets/tickets.service";
import { usersService } from "../../app/classes/built-in/users/users.service";

export const routes = [
    { startRoute: usersService.startRoute, router: usersService.router },
    { startRoute: categoriesService.startRoute, router: categoriesService.router },
    { startRoute: contactsService.startRoute, router: contactsService.router },
    { startRoute: inventoryService.startRoute, router: inventoryService.router },
    { startRoute: pricesService.startRoute, router: pricesService.router },
    { startRoute: productsService.startRoute, router: productsService.router },
    { startRoute: ticketResponsesService.startRoute, router: ticketResponsesService.router },
    { startRoute: ticketsService.startRoute, router: ticketsService.router },
];