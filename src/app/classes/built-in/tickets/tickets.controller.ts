import { Request, Response } from "express";
import { Controller } from "../../../core/controller"
import { CokyErrors } from "../../../core/errors";
import { ModelEntity } from "../../../core/model";
import jwt from "jsonwebtoken";
import path from "path";
import { Ticket } from "./tickets.model";

class TicketsController extends Controller<Ticket> {
    public entity: ModelEntity = Ticket.ENTITY;
}

export const ticketsController = new TicketsController();