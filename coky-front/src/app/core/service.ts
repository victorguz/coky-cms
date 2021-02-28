import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Checks } from './checks';
import { Model } from './model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class Service<T> {

  public ENTITY_NAME: string = "";
  public ENTITY: Model<T>;
  public API_URL: string = "http://localhost:8080"

  constructor(private http: HttpClient) { }

  /**
   * Obtiene todos los campos en un rango
   */
  all(limit: number = 100, offset: number = 0, column = "id", order = "desc") {
    return this.http.get<any>(`${this.API_URL}/${this.ENTITY_NAME}/all/${limit}/${offset}/${column}/${order}`).toPromise();
  }

  /**
   * El método "By" devuelve los registros que coinciden con 
   * la columna y el valor dado. También se puede definir un limit y offset
   * 
   */
  oneby(value: string, column: string = "id") {
    return this.http.get<any>(`${this.API_URL}/${this.ENTITY_NAME}/by/${column}/${value}/1/0`).toPromise();
  }

  /**
   * El método "By" devuelve los registros que coinciden con 
   * la columna y el valor dado. También se puede definir un limit y offset
   * 
   */
  by(value: string, column: string = "id", limit: number = 100, offset: number = 0) {
    value = Checks.isNullUndefinedOrEmpty(value) ? "-1" : value;
    return this.http.get<any>(`${this.API_URL}/${this.ENTITY_NAME}/by/${column}/${value}/${limit}/${offset}`).toPromise();
  }

  /**
   * El método "create" añade una instancia de la entidad a la base de datos
   */
  create(entity: T): Promise<ServiceResult> {
    return this.http.post<ServiceResult>(`${this.API_URL}/${this.ENTITY_NAME}/create/`, entity).toPromise();
  }

  /**
   * El método "update" modifica una instancia de la entidad en la base de datos
   */
  update(id: number, entity: T): Promise<ServiceResult> {
    return this.http.put<ServiceResult>(`${this.API_URL}/${this.ENTITY_NAME}/update/${id}`, entity).toPromise();
  }

  /**
   * El método "delete" elimina una instancia de la entidad de base de datos
   */
  delete(id: number): Promise<ServiceResult> {
    return this.http.delete<ServiceResult>(`${this.API_URL}/${this.ENTITY_NAME}/delete/${id}`).toPromise();
  }

  /**
   * El método "describe" describirá los campos de la entidad de la base de datos
   */
  describe() {
    return this.http.get(`${this.API_URL}/${this.ENTITY_NAME}/describe`).toPromise();
  }

  withUrl(url: string, data) {
    return this.http.post(`${this.API_URL}/${this.ENTITY_NAME}/${url}`, data).toPromise();
  }
}

export interface ServiceResult {
  message: string,
  result: { affectedRows: number, insertId: number, warningStatus: number },
  success: boolean,
}