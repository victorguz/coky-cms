import { Request, Response } from "express";
import { Controller } from "../../../core/controller"
import { CokyErrors } from "../../../core/errors";
import { ModelEntity } from "../../../core/model";
import jwt from "jsonwebtoken";
import path from "path";
import { Inventory } from "./inventory.model";

class InventoryController extends Controller<Inventory> {
    public entity: ModelEntity = Inventory.ENTITY;
}

export const inventoryController = new InventoryController();