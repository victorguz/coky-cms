import { Controller } from "../../core/controller"
import { ModelEntity } from "../../core/model";
import { User } from "./users.model";

class UsersController extends Controller<User, number> {

    public entity: ModelEntity = User.ENTITY;

    model(item: User): User {
        throw new Error("Method not implemented.");
    }
}

export const usersController = new UsersController();