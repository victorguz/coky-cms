import { Injectable, OnInit } from '@angular/core';
import { Service, ServiceResult } from '../core/service';
import { Checks } from '../core/checks';
import { Contact, ContactI } from '../models/contacts.model';

@Injectable({
  providedIn: 'root'
})
export class ContactsService {

  constructor(private service: Service<ContactI>) {
    this.service.ENTITY = new Contact;
    this.service.ENTITY_NAME = "contacts";
  }


  /**
   * Obtiene todos los campos en un rango
   */
  async all(limit: number = 100, offset: number = 0, column = "id", order = "desc") {
    return await this.service.all(limit, offset, column, order);
  }
  /**
   * El método "getOne" utiliza el metodo by para obtener un solo registro
   * 
   */
  async getOne(value: any, column: string = "id") {
    return await this.service.oneby(value, column);
  }

  /**
   * El método "By" devuelve los registros que coinciden con 
   * la columna y el valor dado. También se puede definir un limit y offset
   * 
   */
  async by(value: any, column: string = "id", limit: number = 100, offset: number = 0) {
    return await this.service.by(value, column, limit, offset);
  }

  /**
   * El método "create" añade una instancia de la entidad a la base de datos
   */
  async create(entity: ContactI) {
    return await this.service.create(entity);
  }

  /**
   * El método "update" modifica una instancia de la entidad en la base de datos
   */
  async update(id: number, entity: ContactI) {
  }

  /**
   * El método "delete" elimina una instancia de la entidad de base de datos
   */
  async delete(id: number) {
  }
  /**
   * El método "describe" describirá los campos de la entidad de la base de datos
   */
  async describe() {
  }

  /**
   * El método "login" enviará una confirmación si el usuario existe y es el correcto
   */
  async login(username: string, password: string) {
    return await this.service.withUrl("login", { username: username, password: password });
  }
}
