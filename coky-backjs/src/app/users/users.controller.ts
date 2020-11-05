import { Controller } from "../../core/controller"
import { User } from "./users.model";

class UsersController extends Controller<User, number> {

    public TABLE: String = "coky_users";
    public ENTITY: String = "user";
    public PLURAL_ENTITY: String = "users";

    model(item: User): User {
        throw new Error("Method not implemented.");
    }
}

export const usersController = new UsersController();