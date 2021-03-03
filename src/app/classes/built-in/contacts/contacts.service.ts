import { Service } from "../../../core/service";
import { contactsController } from "./contacts.controller";
import { Contact } from "./contacts.model";

class ContactsService extends Service<Contact>{

    public startRoute: string = "/contacts"
    public ignoreDefaultRoutes: boolean = false;

    getRoutes(): void {
        super.getRoutes()
    }

}

export const contactsService = new ContactsService(contactsController)