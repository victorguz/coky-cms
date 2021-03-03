import { Model, ModelEntity } from "../../../core/model";


export class Contact extends Model {

    public static ENTITY: ModelEntity = {
        name: "Contact",
        plural_name: "Contacts",
        table: "coky_contacts",
        model: new Contact()
    };

}
