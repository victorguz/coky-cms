import { Request, Response } from "express";
import { Controller } from "../../../core/controller"
import { CokyErrors } from "../../../core/errors";
import { ModelEntity } from "../../../core/model";
import jwt from "jsonwebtoken";
import path from "path";
import { TicketResponse } from "./ticket-responses.model";

class TicketResponseController extends Controller<TicketResponse> {
    public entity: ModelEntity = TicketResponse.ENTITY;
}

export const ticketResponsesController = new TicketResponseController();