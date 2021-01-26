import { Injectable, OnInit } from '@angular/core';
import { User, UserI } from '../models/users.model';
import { Service } from '../core/service';
import { Checks } from '../core/checks';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(private service: Service<UserI>) {
    this.service.ENTITY = new User;
    this.service.ENTITY_NAME = "users";
  }


  /**
   * Obtiene todos los campos en un rango
   */
  async all(limit: number = 100, offset: number = 0) {
    return await this.service.all(limit, offset);
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
   * El método "orderby" devuelve todos los registros, ordenados por columna y dirección (asc, desc). También se puede definir un limit y un offset
   */
  async orderby(column: string = "id", order: string = "desc", limit: number = 100, offset: number = 0) {
    return await this.service.orderby(column, order, limit, offset);
  }

  /**
   * El método "create" añade una instancia de la entidad a la base de datos
   */
  async create(entity: UserI) {
    return await this.service.create(entity);
  }

  /**
   * El método "update" modifica una instancia de la entidad en la base de datos
   */
  async update(id: number, entity: UserI) {
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
