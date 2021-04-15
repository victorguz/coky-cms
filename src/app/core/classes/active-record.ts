import { Checks } from "../../../app/config/checks";
import { Database, DatabaseConfig } from "../database";

/**
 * Implementación básica de modelo ActiveRecord.
 */
export class ActiveRecord<ModelInterface> {

    protected defaultSelectFields: string[] = [];

    protected db_conf!: DatabaseConfig | null;

    protected stringTypes = ['varchar', 'text'];

    private static QUOTE_SUPS = "`";
    private static QUOTE_VALUES = "'";

    private static thosandsSeparator = '.';

    private static decimalsSeparator = ',';

    private foreingsKeys = [];

    private static ACTION_INSERT = 'INSERT';
    private static ACTION_SELECT = 'SELECT';
    private static ACTION_UPDATE = 'UPDATE';
    private static ACTION_DELETE = 'DELETE';

    //ActiveRecord properties

    public pool = Database.pool;

    protected table: string = '';

    protected fields: FieldModel[] = [];

    protected selectSegment: string = "*";
    protected groupBySegment: string = "";
    protected orderBySegment: string = "";

    protected insertSegmentValues: string = "";
    protected insertSegmentFields: string = "";

    protected updateSegment: string = "";

    protected whereSegment: string = "";
    protected havingSegment: string = "";
    protected joinSegment: string = "";


    protected prepareStatement: string = "";
    protected lastSQLExecuted: string = '';
    protected currentAction: string = '';
    protected query: string = '';

    protected selectClass: any = null;
    protected resultSet: any = null;

    public printQueries: boolean = false;
    public static ignorableFields: string[] = ["table", "fields", "defaultFieldsForSelect", "db_conf", "model"];


    public constructor(table: string, fields: FieldModel[], db_conf: DatabaseConfig | null = null) {
        table = table.trim()
        if (table == "") {
            throw new Error("ActiveRecord necesita una tabla válida");
        }
        if (fields.length == 0) {
            throw new Error("ActiveRecord necesita campos válidos");
        }
        this.db_conf = db_conf;
        if (db_conf != null) {
            const mariadb = require("mariadb");
            this.pool = mariadb.createPool(db_conf)
            try {
                this.pool.getConnection();
            } catch (error) {
                console.log(error)
            }
        }
        this.table = table;
        this.fields = fields;
    }

    public getPrimaryKeyName(): string {
        let primary_key = "";
        this.fields.forEach(field => {
            if (field.primary_key) {
                if (primary_key == "") {
                    primary_key = field.name;
                } else {
                    throw new Error("No puede haber dos llaves primarias");
                }
            }
        });
        return primary_key;
    }

    public select(select: string[] | string | null = null): ActiveRecord<ModelInterface> {
        if (typeof select == "string") {
            select = select.trim();
        } else if (Array.isArray(select) && select.length > 0) {
            select = select.join(", ");
        } else if (this.defaultSelectFields.length > 0) {
            select = this.defaultSelectFields.join();
        } else {
            select = "*";
        }

        this.currentAction = ActiveRecord.ACTION_SELECT;
        this.selectSegment = select;

        return this;
    }

    public insert(object: any, extrict: boolean = false): ActiveRecord<ModelInterface> {
        this.isNotSelect(ActiveRecord.ACTION_INSERT);
        let insertFields: string[] = [];
        let insertValues: string[] = [];
        // console.log(object)
        if (typeof object == "object") {
            for (const field in object) {
                if (Object.prototype.hasOwnProperty.call(object, field)) {
                    if (!ActiveRecord.ignoreThisField(field)) {
                        const value = object[field];
                        let check = this.checkField(field, value, extrict);
                        if (check !== false) {
                            insertFields.push(field);
                            insertValues.push(`${this.typeIsString(check) ? this.quoteField(value) : value}`);
                        }
                    }
                }
            }
            if (insertFields.length > 0) {
                this.insertSegmentFields = `(${insertFields.join(", ")})`
            } else {
                throw new Error("No hay ningún campo que insertar");
            }
            if (insertValues.length > 0) {
                this.insertSegmentValues = `(${insertValues.join(", ")})`
            } else {
                throw new Error("No hay ningún value que insertar");
            }
        } else {
            throw new Error('Parámetro no aceptado en insert()');
        }

        this.currentAction = ActiveRecord.ACTION_INSERT;
        return this;
    }

    public update(object: any): ActiveRecord<ModelInterface> {
        this.isNotSelect(ActiveRecord.ACTION_UPDATE);

        if (typeof object == "object") {
            let updateArray: string[] = [];
            for (const field in object) {
                if (Object.prototype.hasOwnProperty.call(object, field)) {
                    const value = object[field];
                    let check = this.checkField(field, value);
                    if (check !== false) {
                        updateArray.push(`${field} = ${this.typeIsString(check) ? this.quoteField(value) : value}`);
                    }
                }
            }
            this.updateSegment = updateArray.join(", ");
        } else if (Array.isArray(object) && object.length > 0) {
            this.updateSegment = object.join(", ");
        } else if (typeof object == "string") {
            this.updateSegment = object;
        } else {
            throw new Error('Parámetro no aceptado en update()');
        }

        this.currentAction = ActiveRecord.ACTION_UPDATE;
        return this;
    }

    public delete(): ActiveRecord<ModelInterface> {
        this.currentAction = ActiveRecord.ACTION_DELETE;
        return this;
    }

    public where(object: WhereSegment | WhereSegmentSimple | string | string[] | null = null): ActiveRecord<ModelInterface> {
        if (object instanceof WhereSegment || object instanceof WhereSegmentSimple) {
            this.whereSegment = ActiveRecord.objectToWhere(object);
        } else if (Array.isArray(object) && object.length > 0) {
            this.whereSegment = object.join(" AND ");
        } else if (typeof object == "string") {
            this.whereSegment = object;
        } else if (object == null) {
            this.whereSegment = "";
        } else {
            throw new Error('Parámetro no aceptado en where()');
        }
        return this;
    }

    public having(object: WhereSegment | WhereSegmentSimple | string | string[]): ActiveRecord<ModelInterface> {
        if (object instanceof WhereSegment || object instanceof WhereSegmentSimple) {
            this.havingSegment = ActiveRecord.objectToWhere(object);
        } else if (Array.isArray(object) && object.length > 0) {
            this.havingSegment = object.join(" AND ");
        } else if (typeof object == "string") {
            this.havingSegment = object;
        } else if (object == null) {
            this.havingSegment = "";
        } else {
            throw new Error('Parámetro no aceptado en having()');
        }
        return this;
    }

    public orderBy(object: string | string[]): ActiveRecord<ModelInterface> {
        if (Array.isArray(object) && object.length > 0) {
            this.orderBySegment = object.join(" , ");
        } else if (typeof object == "string") {
            this.orderBySegment = object;
        } else {
            throw new Error('Parámetro no aceptado en orderBy()');
        }
        return this;
    }

    public groupBy(object: string | string[]): ActiveRecord<ModelInterface> {
        if (Array.isArray(object) && object.length > 0) {
            this.groupBySegment = object.join(" , ");
        } else if (typeof object == "string") {
            this.groupBySegment = object;
        } else {
            throw new Error('Parámetro no aceptado en groupBy()');
        }
        return this;
    }

    public join(table: string, on: string | string[], type: JoinType = JoinType.NORMAL): ActiveRecord<ModelInterface> {
        table = table.trim();
        if (table == "") {
            throw new Error('Parámetro TABLE no aceptado en join()');
        }
        if (Array.isArray(on) && on.length > 0) {
            on = `(${on.join(" AND ")})`;
        } else if (typeof on == "string") {
            on = on;
        } else {
            throw new Error('Parámetro ON no aceptado en join()');
        }

        this.joinSegment = `${type} JOIN ${table} ON ${on}`;

        return this;
    }

    public async execute(limit: number | null = null, offset: number | null = null): Promise<boolean> {
        let result: boolean = false;

        switch (this.currentAction) {

            case ActiveRecord.ACTION_INSERT:
                console.error("///////////////////////////////////////" + ActiveRecord.ACTION_INSERT)

                this.resultSet = await this._executeInsert(limit);
                result = true;

                break;

            case ActiveRecord.ACTION_SELECT:
                console.error("///////////////////////////////////////" + ActiveRecord.ACTION_SELECT)

                this.resultSet = await this._executeSelect(limit, offset);
                result = true;

                break;

            case ActiveRecord.ACTION_UPDATE:
                console.error("///////////////////////////////////////" + ActiveRecord.ACTION_UPDATE)

                this.resultSet = await this._executeUpdate(limit);
                result = true;

                break;

            case ActiveRecord.ACTION_DELETE:
                console.error("///////////////////////////////////////" + ActiveRecord.ACTION_DELETE)

                this.resultSet = await this._executeDelete(limit);
                result = true;

                break;
            default:
                throw new Error("Aún no ha seleccionado ninguna método de consulta");
        }

        if (this.printQueries == true) {
            console.log(this.getQuerySQL())
        }
        this.resetAll();
        return result;
    }

    public async getResult(): Promise<any> {
        return await this.resultSet;
    }



    public static objectToWhere(object: WhereSegment | WhereSegmentSimple): string {
        let whereStatement = "";
        if (object instanceof WhereSegment) {
            if (typeof object.in == "string" && object.in != "") {
                let inn = object.in.trim()
                if (inn.substring(0, 1) == "(" && inn.substring(inn.length - 2, inn.length - 1) == ")") {
                    whereStatement += ` IN (${inn})`;
                } else {
                    whereStatement += ` IN ${inn}`;
                }
            } else if (Array.isArray(object.in) && object.in.length > 0) {
                whereStatement += ` IN (${object.in.join()})`
            }
            if (typeof object.on == "string" && object.on != "") {
                let inn = object.on.trim()
                if (inn.substring(0, 1) == "(" && inn.substring(inn.length - 2, inn.length - 1) == ")") {
                    whereStatement += ` ON (${inn})`;
                } else {
                    whereStatement += ` ON ${inn}`;
                }
            } else if (Array.isArray(object.on) && object.on.length > 0) {
                whereStatement += ` ON (${object.on.join()})`
            }
            if (typeof object.and == "string" && object.and != "") {
                whereStatement += ` AND ${object.and}`;
            } else if (Array.isArray(object.and) && object.and.length > 0) {
                whereStatement += object.and.join(" AND ")
            }
            if (typeof object.or == "string" && object.or != "") {
                whereStatement += ` OR ${object.or}`;
            } else if (Array.isArray(object.or) && object.or.length > 0) {
                whereStatement += object.or.join(" OR ")
            }
            if (typeof object.is == "string" && object.is != "") {
                whereStatement += ` IS ${object.is}`;
            } else if (Array.isArray(object.is) && object.is.length > 0) {
                whereStatement += object.is.join(" IS ")
            } else if (object.is == null) {
                whereStatement += " IS NULL "
            }
        }
        return whereStatement;
    }

    public checkField(name: string, value: any, extrict: boolean = false): string | false {
        let field: FieldModel = new FieldModel;
        let fieldType: string | false = false;

        this.fields.forEach(fieldModel => {
            if (fieldModel.name == name) {
                field = fieldModel;
                return;
            }
        });

        if (typeof field.name != "undefined") {
            if (!field.null && value == null) {
                throw new Error(`El campo '${name}' no debe ser null`);
            }
            let type = value != null ? Checks.isType(field.type, value) : true;
            if (type) {
                fieldType = field.type;
                if (this.typeIsString(field.type) && typeof value == "string") {
                    let empty = value == "";
                    let length = typeof field.length != "undefined" ? value.length <= field.length : true;

                    if (!field.empty && empty) {
                        throw new Error(`El campo '${name}' no debe estar vacío`);
                    }
                    if (!length) {
                        throw new Error(`El campo '${name}' supera la longitud máxima '${field.length}'`);
                    }
                }
            } else {
                throw new Error(`El campo '${name}' no es del tipo '${field.type}'`);
            }
        } else if (extrict) {
            throw new Error(`El campo '${name}' no se reconoce en fields[].`);
        }
        return fieldType;
    }

    public static ignoreThisField(field: string) {
        return ActiveRecord.ignorableFields.includes(field);
    }

    private quoteField(value: string | number): string {
        return ActiveRecord.QUOTE_VALUES + value + ActiveRecord.QUOTE_VALUES;
    }

    private quoteTableOrColumn(value: string | number): string {
        return ActiveRecord.QUOTE_SUPS + value + ActiveRecord.QUOTE_SUPS;
    }

    private typeIsString(type: string): boolean {
        return this.stringTypes.includes(type)
    }

    private isNotSelect(action: string) {
        if (this.currentAction == ActiveRecord.ACTION_SELECT) {
            throw new Error(`La acción ${action} no se puede ejecutar junto a una función SELECT`);
        }
    }


    private async _executeDelete(limit: number | null = null) {
        this.query = `DELETE FROM ${this.table}`;
        if (this.whereSegment != "") {
            this.query += " WHERE " + this.whereSegment;
        } else {
            throw new Error("No se ejecutará una consulta DELETE sin una clausula WHERE");
        }
        if (limit != null) {
            this.query += " LIMIT " + limit;
        }
        return await this.pool.query(this.query);
    }

    private async _executeUpdate(limit: number | null = null) {
        this.query = `UPDATE ${this.table}`;
        if (this.updateSegment != "") {
            this.query += " SET " + this.updateSegment;
        } else {
            throw new Error("No se ejecutará una consulta UPDATE sin una clausula SET");
        }
        if (this.whereSegment != "") {
            this.query += " WHERE " + this.whereSegment;
        } else {
            throw new Error("No se ejecutará una consulta UPDATE sin una clausula WHERE");
        }

        if (this.whereSegment != "") {
            this.query += " WHERE " + this.whereSegment;
        } else {
            throw new Error("No se ejecutará una consulta UPDATE sin una clausula WHERE");
        }
        if (limit != null) {
            this.query += " LIMIT " + limit;
        }
        return await this.pool.query(this.query);
    }

    private async _executeSelect(limit: number | null = null, offset: number | null = null) {
        this.query = "";
        if (this.selectSegment != "") {
            this.query += `SELECT ${this.selectSegment} FROM ${this.table}`;
        } else {
            throw new Error("No se ejecutará una consulta SELECT si no hay campos que buscar");
        }
        if (this.joinSegment != "") {
            this.query += this.joinSegment;
        }
        if (this.whereSegment != "") {
            this.query += " WHERE " + this.whereSegment;
        }
        if (this.groupBySegment != "") {
            this.query += " GROUP BY " + this.groupBySegment;
        }
        if (this.havingSegment != "") {
            this.query += " HAVING " + this.havingSegment;
        }
        if (this.orderBySegment != "") {
            this.query += " ORDER BY " + this.orderBySegment;
        }
        if (limit != null) {
            this.query += " LIMIT " + limit;
        }
        if (offset != null) {
            this.query += " OFFSET " + offset;
        }
        return await this.pool.query(this.query);
    }

    private async _executeInsert(limit: number | null = null) {
        this.query = "";
        if (this.insertSegmentFields != "") {
            this.query += `INSERT INTO ${this.table} ${this.insertSegmentFields}`;
        } else {
            throw new Error("No se ejecutará una consulta INSERT si no hay campos que insertar");
        }
        if (this.insertSegmentValues != "") {
            this.query += ` VALUES ${this.insertSegmentValues}`;
        } else {
            throw new Error("No se ejecutará una consulta INSERT si no hay valores que insertar");
        }
        if (limit != null) {
            this.query += " LIMIT " + limit;
        }
        return await this.pool.query(this.query);
    }


    public resetAll() {
        this.selectSegment = "";
        this.insertSegmentFields = "";
        this.insertSegmentValues = "";
        this.updateSegment = "";
        this.whereSegment = "";
        this.havingSegment = "";
        this.joinSegment = "";
        this.groupBySegment = "";
        this.orderBySegment = "";
        this.currentAction = "";
        return this;
    }

    public getQuerySQL() {
        return this.query;
    }

}

export class FieldModel {
    name!: string;
    type!: 'varchar' | 'text' | 'mediumtext' | 'longtext' | 'int' | 'float' | 'double' | 'json' | 'datetime' | 'date' | 'serialized_object';
    length?: number = 99999999;
    null?: boolean = true;
    empty?: boolean = true;
    default?: number | string | null;
    primary_key?: boolean = false;
    auto_increment?: boolean = false;
    reference_table?: string | null = null;
    reference_field?: string | null = null;
    reference_primary_key?: string | null = null;
    has_many?: boolean = false;
    model?: any;
    representation_on_select_statement?: string | null;
}

export class WhereSegment {
    in?: string | string[];
    on?: string | string[];
    and?: string | string[];
    or?: string | string[];
    is?: string | string[] | null;
}

export class WhereSegmentSimple {
    and?: string | string[];
    or?: string | string[];
    is?: string | string[] | null;
}

export enum JoinType {
    NORMAL = "NORMAL",
    INNER = "INNER"
}