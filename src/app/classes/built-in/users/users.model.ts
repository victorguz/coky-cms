import { Model, ModelEntity } from "../../../core/model";


export class User extends Model {

    public static ENTITY: ModelEntity = {
        name: "User",
        plural_name: "Users",
        table: "coky_users",
        model: new User()
    };

}
