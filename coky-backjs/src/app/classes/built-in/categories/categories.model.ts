import { Model, ModelEntity } from "../../../core/model";


export class Category extends Model {

    public static ENTITY: ModelEntity = {
        name: "Category",
        plural_name: "Categories",
        table: "coky_categories",
        model: new Category()
    };

}
