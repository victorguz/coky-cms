import { Service } from "../../../core/service";
import { usersController } from "./users.controller";
import { User } from "./users.model";

class UsersService extends Service<User>{

    public startRoute: string = "/users"
    public ignoreDefaultRoutes: boolean = false;

    getRoutes(): void {
        super.getRoutes()
        this.router.post("/login", async (req, res) => { usersController.login(req, res); });
        // this.router.get("/all/:limit/:offset/:column/:order", async (req, res) => { usersController.all(req, res); });
    }

}

export const usersService = new UsersService(usersController)