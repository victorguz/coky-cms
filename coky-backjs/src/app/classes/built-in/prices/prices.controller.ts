import { Request, Response } from "express";
import { Controller } from "../../../core/controller"
import { CokyErrors } from "../../../core/errors";
import { ModelEntity } from "../../../core/model";
import jwt from "jsonwebtoken";
import path from "path";
import { Price } from "./prices.model";

class PricesController extends Controller<Price> {
    public entity: ModelEntity = Price.ENTITY;
}

export const pricesController = new PricesController();