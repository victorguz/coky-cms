import { Request, Response } from "express";
import { Controller } from "../../../core/controller"
import { CokyErrors } from "../../../core/errors";
import { ModelEntity } from "../../../core/model";
import jwt from "jsonwebtoken";
import path from "path";
import { Contact } from "./contacts.model";

class ContactsController extends Controller<Contact> {
    public entity: ModelEntity = Contact.ENTITY;
}

export const contactsController = new ContactsController();