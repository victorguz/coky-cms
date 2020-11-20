import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class DatabaseService {
  
  constructor() {}

  /**
   * Select all records of a table
   * @param table table name
   * @param fields fields wich selected (empty = *)
   */
  public static all(table: string, fields: string[] = []) {}
  public static getById(table: string, fields: string[] = [],id:number) {}

  public static save(table: string, fields: string[] = []) {}
  public static delete(table: string, id:number) {}
  public static update(table: string, fields: string[] = [],id:number) {}

  public static getQuery(query: string) {}

  /**
   * Create the table with field especifications
   * @param table table name
   * @param fields_json JSON { field: [type,default]}
   */
  public static createTable(table:string,fields_json){}
/**
 * Create a constraint in the same table
 * @param table table name
 * @param constraint constraint type: unike, primary key, not null
 * @param fields convinated fields in the constraint
 */
  public static createConstraint(table:string,constraint:string,fields:string[]){}
  /**
   * Create a foreign key
   * @param receiver_table table name is affected with the foreign key
   * @param transmitter_table table name from field originaly
   * @param transmitted_field original field name
   * @param receiver_field receiver field name
   */
  public static createForeignKey(receiver_table:string,transmitter_table:string,transmitted_field:string,receiver_field:string){}
  /**
   * 
   * @param when ["update","insert","delete"]
   * @param transmitter_table table that is reason of the trigger
   * @param receiver_table table that is afected with the trigger (can not be the same)
   * @param what_makes action to do with receiver_table
   * @param receiver_table what fields will be affected or updated
   * @param transmitter_fields transmitted fields will replace receiver fields (in the same order)
   * @param actions receiver fields will be used for operations (in the same order)
   * 
   */
  public static createSimpleTriggers(when:string[],transmitter_table:string,receiver_table:string,what_makes:string[],updated_fields:string[],new_fields:string[]){

  }
  
}
