import { userControllerInstance } from "../../app/classes/built-in/users/users.controller";

export const routes = [
    { startRoute: userControllerInstance.startRoute, router: userControllerInstance.router },
];