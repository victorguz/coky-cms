import { Request, Response } from "express";
import { Controller } from "../../../core/controller"
import { CokyErrors } from "../../../core/errors";
import { ModelEntity } from "../../../core/model";
import jwt from "jsonwebtoken";
import path from "path";
import { Category } from "./categories.model";

class CategoriesController extends Controller<Category> {
    public entity: ModelEntity = Category.ENTITY;
}

export const categoriesController = new CategoriesController();