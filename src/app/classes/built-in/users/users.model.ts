import { ActiveRecord, FieldModel } from "../../../../app/core/classes/active-record";
import { Model, ModelInterface } from "../../../../app/core/classes/model";
import { DatabaseConfig } from "../../../../app/core/database";

export class User extends Model<UserI> implements UserI {


    public table: string = 'coky_users';

    protected fields: FieldModel[] = [
        {
            name: "id",
            primary_key: true,
            auto_increment: true,
            type: 'int',
        },
        {
            name: "first_name",
            type: 'varchar',
            length: 50,
            null: false
        },
        {
            name: "second_name",
            type: 'varchar',
            length: 50,
            null: true
        },
        {
            name: "first_lastname",
            type: 'varchar',
            length: 50,
            null: false
        },
        {
            name: "second_lastname",
            type: 'varchar',
            length: 50,
            null: true
        },
        {
            name: "username",
            type: 'varchar',
            length: 50,
            null: false
        },
        {
            name: "password",
            type: 'varchar',
            length: 50,
            null: false
        },
        {
            name: "email",
            type: 'varchar',
            length: 100,
            null: false
        },
        {
            name: "data",
            type: 'json',
            null: true
        },
        {
            name: "role",
            type: 'int',
            null: false
        },
        {
            name: "status",
            type: 'int',
            null: false
        },
        {
            name: "created",
            type: 'datetime',
            null: false
        },
        {
            name: "modified",
            type: 'datetime',
            null: false
        },
    ];

    protected defaultFieldsForSelect: string[] = [
        "id",
        "first_name",
        "second_name",
        "first_lastname",
        "second_lastname",
        "status",
        "role",
        "username",
        "email",
    ];
    private static db_conf: DatabaseConfig | null = null;

    protected record: ActiveRecord<UserI> = new ActiveRecord<UserI>(this.table, this.fields);


    public first_name: string = "Nombre 1";
    public second_name?: string | undefined | null = null;
    public first_lastname: string = "Apellido 1";
    public second_lastname?: string | undefined | null = null;
    public username: string = "username1";
    public password: string = "password1";
    public data: any = null;
    public email: string = "email1@gmail.com";
    public status: number = 1;
    public role: number = 0;

    public constructor(value_compare: number | null = null, field_compare: string | null = "primary_key") {
        super(value_compare, field_compare, User.db_conf);
        this.record.printQueries = true;

        this.hola();
    }

    public async hola() {
        // const result = await this.save();
        // const status = result ? 200 : 404;
        // console.log(result, status);
    }
}


export interface UserI extends ModelInterface {
    first_name: string,
    second_name?: string | null,
    first_lastname: string,
    second_lastname?: string | null,
    username: string,
    password: string,
    data: any,
    email: string,
    status: number,
    role: number,
}