import { Service } from "../../../core/service";
import { usersController } from "./users.controller";
import { User } from "./users.model";

class UsersService extends Service<User>{

    public startRoute: string = "/users"

    getRoutes(): void {
        super.getRoutes()
    }

}

export const usersService = new UsersService(usersController)