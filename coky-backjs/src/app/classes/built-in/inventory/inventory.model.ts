import { Model, ModelEntity } from "../../../core/model";


export class Inventory extends Model {

    public static ENTITY: ModelEntity = {
        name: "Inventory",
        plural_name: "Inventories",
        table: "coky_inventory",
        model: new Inventory()
    };

}
