import { Model, ModelEntity } from "../../../core/model";


export class Product extends Model {

    public static ENTITY: ModelEntity = {
        name: "Product",
        plural_name: "Products",
        table: "coky_products",
        model: new Product()
    };

}
