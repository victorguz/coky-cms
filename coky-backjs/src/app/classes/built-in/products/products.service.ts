import { Service } from "../../../core/service";
import { productsController } from "./products.controller";
import { Product } from "./products.model";

class ProductsService extends Service<Product>{

    public startRoute: string = "/products"
    public ignoreDefaultRoutes: boolean = false;

    getRoutes(): void {
        super.getRoutes()
    }

}

export const productsService = new ProductsService(productsController)