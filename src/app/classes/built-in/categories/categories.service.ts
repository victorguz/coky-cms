import { Service } from "../../../core/service";
import { categoriesController } from "./categories.controller";
import { Category } from "./categories.model";

class CategoriesService extends Service<Category>{

    public startRoute: string = "/categories"
    public ignoreDefaultRoutes: boolean = false;

    getRoutes(): void {
        super.getRoutes()
    }

}

export const categoriesService = new CategoriesService(categoriesController)