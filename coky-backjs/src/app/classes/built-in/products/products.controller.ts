import { Request, Response } from "express";
import { Controller } from "../../../core/controller"
import { CokyErrors } from "../../../core/errors";
import { ModelEntity } from "../../../core/model";
import jwt from "jsonwebtoken";
import path from "path";
import { Product } from "./products.model";

class ProductsController extends Controller<Product> {
    public entity: ModelEntity = Product.ENTITY;
}

export const productsController = new ProductsController();