import { Controller } from "../../../core/controller"
import { ModelEntity } from "../../../core/model";
import { User } from "./users.model";

class UsersController extends Controller<User> {

    public entity: ModelEntity = User.ENTITY;

}

export const usersController = new UsersController();