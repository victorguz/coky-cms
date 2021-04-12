import { DatabaseConfig } from "../database";
import { ActiveRecord, FieldMapper } from "./active-record";
import { Model } from "./model";

/**
 * Implementación básica de modelo Mapper.
 */
export class Mapper implements MapperInterface {

    protected table: string = '';
    protected fields: FieldMapper[] = [];
    protected defaultFieldsForSelect: string[] = [];
    protected db_conf!: DatabaseConfig | null;
    protected model!: ActiveRecord<MapperInterface>;

    public id?: number
    public created?: Date
    public modified?: Date

    public constructor(value_compare: number, field_compare: string = "primary_key", db_conf: DatabaseConfig | null = null) {
        if (field_compare != "") {
            this.model = new ActiveRecord<MapperInterface>(this.table, this.fields, db_conf)

        }
    }

    public set(result: any) {
        if (typeof result == "object") {
            //Recorrer result para setear cada propiedad
            for (const field in result) {
                if (Object.prototype.hasOwnProperty.call(result, field)) {
                    const element = result[field];
                    //recorrer la clase en busca de la propiedad seleccionada
                    for (const key in this) {
                        if (Object.prototype.hasOwnProperty.call(this, key)) {
                            this[key] = element;
                        }
                    }
                }
            }
        } else {
            throw new Error("No se puede recorrer los campos de este tipo de objetos");
        }
    }

}

export interface MapperInterface {
    id?: number
    created?: Date
    modified?: Date
}