import { Model, ModelEntity } from "../../../core/model";


export class Price extends Model {

    public static ENTITY: ModelEntity = {
        name: "Price",
        plural_name: "Prices",
        table: "coky_prices",
        model: new Price()
    };

}
