import { Service } from "../../../core/service";
import { pricesController } from "./prices.controller";
import { Price } from "./prices.model";

class PricesService extends Service<Price>{

    public startRoute: string = "/prices"
    public ignoreDefaultRoutes: boolean = false;

    getRoutes(): void {
        super.getRoutes()
    }

}

export const pricesService = new PricesService(pricesController)