import { Service } from "../../../core/service";
import { inventoryController } from "./inventory.controller";
import { Inventory } from "./inventory.model";

class InventoryService extends Service<Inventory>{

    public startRoute: string = "/inventory"
    public ignoreDefaultRoutes: boolean = false;

    getRoutes(): void {
        super.getRoutes()
    }

}

export const inventoryService = new InventoryService(inventoryController)