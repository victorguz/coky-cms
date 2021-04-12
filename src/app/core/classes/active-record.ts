import { Checks } from "../../../app/config/checks";
import { Database, DatabaseConfig } from "../database";
import { Model } from "./model";

/**
 * Implementación básica de modelo ActiveRecord.
 */
export class ActiveRecord<MapperInterface> {

    protected defaultSelectFields: string[] = [];

    protected db_conf!: DatabaseConfig | null;

    protected stringTypes = ['varchar', 'text'];

    private static QUOTE = "`";

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

    protected fields: FieldMapper[] = [];

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
    protected sql: string = '';

    protected selectClass: any = null;
    protected resultSet: any = null;




    public constructor(table: string, fields: FieldMapper[], db_conf: DatabaseConfig | null = null) {
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
    }

    private getPrimaryKeyName(): string {
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

    public select(select: string[] | string | null = null): ActiveRecord<MapperInterface> {
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

    public insert(object: any): ActiveRecord<MapperInterface> {
        this.isNotSelect(ActiveRecord.ACTION_INSERT);
        let insertFields: string[] = [];
        let insertValues: string[] = [];

        if (typeof object == "object") {
            for (const field in object) {
                if (Object.prototype.hasOwnProperty.call(object, field)) {
                    const value = object[field];
                    let check = this.checkField(field, value);
                    if (check !== false) {
                        insertFields.push(field);
                        insertValues.push(`${this.typeIsString(check) ? this.quoteField(value) : value}`);
                    }
                }
            }
            if (insertFields.length > 0) {
                this.insertSegmentFields = `(${insertFields.join(", ")})`
            } else {
                throw new Error("No hay ningún campo que insertar este registro");
            }
            if (insertValues.length > 0) {
                this.insertSegmentValues = `(${insertValues.join(", ")})`
            } else {
                throw new Error("No hay ningún value que insertar este registro");
            }
        } else {
            throw new Error('Parámetro no aceptado en insert()');
        }

        this.currentAction = ActiveRecord.ACTION_INSERT;
        return this;
    }

    public update(object: any): ActiveRecord<MapperInterface> {
        this.isNotSelect(ActiveRecord.ACTION_INSERT);

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

    public delete(): ActiveRecord<MapperInterface> {
        this.currentAction = ActiveRecord.ACTION_DELETE;
        return this;
    }

    public where(object: WhereSegment | WhereSegmentSimple | string | string[]): ActiveRecord<MapperInterface> {
        if (object instanceof WhereSegment || object instanceof WhereSegmentSimple) {
            this.whereSegment = ActiveRecord.objectToWhere(object);
        } else if (Array.isArray(object) && object.length > 0) {
            this.whereSegment = object.join(" AND ");
        } else if (typeof object == "string") {
            this.whereSegment = object;
        } else {
            throw new Error('Parámetro no aceptado en where()');
        }
        return this;
    }

    public having(object: WhereSegment | WhereSegmentSimple | string | string[]): ActiveRecord<MapperInterface> {
        if (object instanceof WhereSegment || object instanceof WhereSegmentSimple) {
            this.havingSegment = ActiveRecord.objectToWhere(object);
        } else if (Array.isArray(object) && object.length > 0) {
            this.havingSegment = object.join(" AND ");
        } else if (typeof object == "string") {
            this.havingSegment = object;
        } else {
            throw new Error('Parámetro no aceptado en having()');
        }
        return this;
    }

    public orderBy(object: string | string[]): ActiveRecord<MapperInterface> {
        if (Array.isArray(object) && object.length > 0) {
            this.orderBySegment = object.join(" , ");
        } else if (typeof object == "string") {
            this.orderBySegment = object;
        } else {
            throw new Error('Parámetro no aceptado en orderBy()');
        }
        return this;
    }

    public groupBy(object: string | string[]): ActiveRecord<MapperInterface> {
        if (Array.isArray(object) && object.length > 0) {
            this.groupBySegment = object.join(" , ");
        } else if (typeof object == "string") {
            this.groupBySegment = object;
        } else {
            throw new Error('Parámetro no aceptado en groupBy()');
        }
        return this;
    }

    public join(table: string, on: string | string[], type: JoinType = JoinType.NORMAL): ActiveRecord<MapperInterface> {
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

    public async execute(limit: number, offset: number): Promise<boolean> {
        let result: boolean = false;

        switch (this.currentAction) {

            case ActiveRecord.ACTION_INSERT:

                this.resultSet = this._executeInsert();
                result = true;

                break;

            case ActiveRecord.ACTION_SELECT:

                this.resultSet = this._executeSelect(limit, offset);
                result = true;

                break;

            case ActiveRecord.ACTION_UPDATE:

                this.resultSet = this._executeUpdate();
                result = true;

                break;

            case ActiveRecord.ACTION_DELETE:

                this.resultSet = this._executeDelete();
                result = true;

                break;
            default:
                throw new Error("Aún no ha seleccionado ninguna método de consulta");
        }

        this.resetAll();
        return result;
    }

    public getResult(): any {
        return this.resultSet;
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

    public checkField(name: string, value: any): string | false {
        let field: FieldMapper = new FieldMapper;
        let fieldType: string | false = false;
        this.fields.forEach(fieldMapper => {
            if (fieldMapper.name == name) {
                field = fieldMapper;
                return;
            }
        });

        if (typeof field.name != "undefined") {
            if (!field.null && value == null) {
                throw new Error(`El campo '${name}' no debe ser null`);
            }
            let type = Checks.isType(field.type, value);
            if (type) {
                fieldType = field.type;
                if (this.typeIsString(field.type) && typeof value == "string") {
                    let empty = value == "";
                    let length = value.length <= field.length;

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
        } else {
            throw new Error(`El campo '${name}' no se reconoce en fields[].`);
        }
        return fieldType;
    }

    private quoteField(field: string | number): string {
        return ActiveRecord.QUOTE + field + ActiveRecord.QUOTE;
    }

    private typeIsString(type: string): boolean {
        return this.stringTypes.includes(type)
    }

    private isNotSelect(action: string) {
        if (this.currentAction == ActiveRecord.ACTION_SELECT) {
            throw new Error(`La acción ${action} no se puede ejecutar en una función SELECT`);
        }
    }


    private async _executeDelete(limit: number | null = null) {
        let query = `DELETE FROM ${this.table}`;
        if (this.whereSegment != "") {
            query += " WHERE " + this.whereSegment;
        } else {
            throw new Error("No se ejecutará una consulta DELETE sin una clausula WHERE");
        }
        if (limit != null) {
            query += " LIMIT " + limit;
        }
        return await this.pool.query(query);
    }

    private async _executeUpdate(limit: number | null = null) {
        let query = `UPDATE ${this.table}`;
        if (this.updateSegment != "") {
            query += " SET " + this.updateSegment;
        } else {
            throw new Error("No se ejecutará una consulta UPDATE sin una clausula SET");
        }
        if (this.whereSegment != "") {
            query += " WHERE " + this.whereSegment;
        } else {
            throw new Error("No se ejecutará una consulta UPDATE sin una clausula WHERE");
        }

        if (this.whereSegment != "") {
            query += " WHERE " + this.whereSegment;
        } else {
            throw new Error("No se ejecutará una consulta DELETE sin una clausula WHERE");
        }
        if (limit != null) {
            query += " LIMIT " + limit;
        }
        return await this.pool.query(query);
    }

    private async _executeSelect(limit: number, offset: number) {
        let query = "";

        if (this.selectSegment != "") {
            query += `SELECT ${this.selectSegment} FROM ${this.table}`;
        } else {
            throw new Error("No se ejecutará una consulta SELECT si no hay campos que buscar");
        }
        if (this.joinSegment != "") {
            query += this.joinSegment;
        }
        if (this.whereSegment != "") {
            query += " WHERE " + this.whereSegment;
        } else {
            throw new Error("No se ejecutará una consulta DELETE sin una clausula WHERE");
        }
        if (this.groupBySegment != "") {
            query += " GROUP BY " + this.groupBySegment;
        }
        if (this.havingSegment != "") {
            query += " HAVING " + this.havingSegment;
        }
        if (this.orderBySegment != "") {
            query += " ORDER BY " + this.orderBySegment;
        }
        if (limit != null) {
            query += " LIMIT " + limit;
        }
        if (offset != null) {
            query += " OFFSET " + offset;
        }
        return await this.pool.query(query);
    }

    private async _executeInsert() {
        let query = "";
        if (this.insertSegmentFields != "") {
            query += `INSERT INTO ${this.table} ${this.insertSegmentFields}`;
        } else {
            throw new Error("No se ejecutará una consulta INSERT si no hay campos que insertar");
        }
        if (this.insertSegmentValues != "") {
            query += ` VALUES ${this.insertSegmentValues}`;
        } else {
            throw new Error("No se ejecutará una consulta INSERT si no hay valores que insertar");
        }
        return await this.pool.query(query);
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


}

export class FieldMapper {
    name!: string;
    type!: 'varchar' | 'text' | 'mediumtext' | 'longtext' | 'int' | 'float' | 'double' | 'json' | 'datetime' | 'date' | 'serialized_object';
    length!: number;
    null?: boolean = true;
    empty?: boolean = true;
    default!: number | string | null;
    primary_key?: boolean = false;
    auto_increment?: boolean = false;
    reference_table?: string | null = null;
    reference_field?: string | null = null;
    reference_primary_key?: string | null = null;
    has_many?: boolean = false;
    mapper!: Model | null;
    representation_on_select_statement!: string | null;
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