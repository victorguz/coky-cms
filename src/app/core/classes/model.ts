import { Checks } from "app/config/checks";
import { DatabaseConfig } from "../database";
import { ActiveRecord, FieldModel } from "./active-record";

/**
 * Implementación básica de modelo de clase.
 */
export abstract class Model<ModelInterface> {

    public table: string = '';
    protected fields: FieldModel[] = [];
    protected defaultFieldsForSelect: string[] = [];
    protected db_conf!: DatabaseConfig | null;
    protected record!: ActiveRecord<ModelInterface>;

    public id?: number
    public created?: Date
    public modified?: Date

    public constructor(value_compare: number | null = null, field_compare: string | null = "primary_key", db_conf: DatabaseConfig | null = null) {
        if (value_compare != null && field_compare != null && field_compare != "") {
            this.record = new ActiveRecord<ModelInterface>(this.table, this.fields, db_conf)
            const primary_key = field_compare == "primary_key" ? this.record.getPrimaryKeyName() : field_compare;
            const result = this.record.select().where(`${primary_key} = ${value_compare}`).execute()
            if (result != null) {
                this.set(result);
            }
        }
    }

    public async all(column: string | null = null, order: string | null = null, limit: number | null = null, offset: number | null = null): Promise<ActiveRecord<ModelInterface>[]> {
        this.record.select()
            .orderBy(`${column != null ? column : "id"} ${order != null ? order : "desc"}`)
        await this.record.execute(limit, offset)
        const result = await this.record.getResult();
        return result;
    }

    public async getBy(column: string | null,
        value: string | number | null, order: string | null = null,
        limit: number | null = null, offset: number | null = null): Promise<ActiveRecord<ModelInterface>[]> {

        value = typeof value == "string" ? `'${value}'` : value;

        this.record.select()
            .orderBy(`${column != null ? column : "id"} ${order != null ? order : "desc"}`)
            .where(`${column} = ${value == null ? "NULL" : value}`)

        await this.record.execute(limit, offset)
        const result = await this.record.getResult();

        return result;
    }

    public async save(extrict: boolean = false): Promise<any> {
        let result;
        this.record.insert(this, extrict);

        await this.record.execute(1, 0)

        result = await this.record.getResult();

        return result;
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
                            if (key == field) {
                                this[key] = element;
                            }
                        }
                    }
                }
            }
        } else {
            throw new Error("No se puede recorrer los campos de este tipo de objetos");
        }
    }

}



export interface ModelInterface {
    id?: number | null
    created?: Date
    modified?: Date | null
}