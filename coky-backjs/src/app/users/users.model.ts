import { FieldMapper, Model, ModelEntity } from "../../core/model";


export class User extends Model {

    public static ENTITY: ModelEntity = {
        name: "User",
        plural_name: "Users",
        table: "coky_users"
    };

    public MAPPER: FieldMapper[] = [
        {
            name: "id",
            type: "int",
            null: false,
            key: "PRI",
            default: null,
            extra: "auto_increment",
            check: "int",
        },
        {
            name: "first_name",
            type: "varchar", length: 50,
            null: false,
            key: null,
            default: null,
            extra: null,
        },
        {
            name: "second_name",
            type: "varchar", length: 50,
            null: true,
            key: null,
            default: null,
            extra: null,
        },
        {
            name: "first_lastname",
            type: "varchar", length: 50,
            null: false,
            key: null,
            default: null,
            extra: null,
        },
        {
            name: "second_lastname",
            type: "varchar", length: 50,
            null: true,
            key: null,
            default: null,
            extra: null,
        },
        {
            name: "username",
            type: "varchar", length: 50,
            null: false,
            key: null,
            default: null,
            extra: null,
        },
        {
            name: "password",
            type: "varchar", length: 50,
            null: false,
            key: null,
            default: null,
            extra: null,
        },
        {
            name: "email",
            type: "text",
            null: false,
            key: null,
            default: null,
            extra: null,
        },
        {
            name: "data",
            type: "text",
            null: true,
            key: null,
            default: null,
            extra: null,
        },
        {
            name: "role",
            type: "int",
            null: false,
            key: null,
            default: "1",
            extra: null,
        },
        {
            name: "status",
            type: "int",
            null: false,
            key: null,
            default: "1",
            extra: null,
        }
    ];

    id?: number;
    first_name?: string;
    second_name?: string;
    first_lastname?: string;
    second_lastname?: string;
    username?: string;
    password?: string;
    email?: string;
    data?: any;
    role?: number;
    status?: number;
    created?: Date;
    modified?: Date;


    set(json: any): void {
        for (const key in json) {
            if (Object.prototype.hasOwnProperty.call(json, key)) {
                const value = json[key];
                this.setKeyValue(key, value);
                console.log(key, this.getKeyValue(key))
            }
        }
    }

    setKeyValue(key: string, value: any) {
        switch (key) {
            case "id":
                this.id = this.check(key, value);
                break;
            case "first_name":
                this.first_name = this.check(key, value);
                break;
            case "second_name":
                this.second_name = this.check(key, value);
                break;
            case "first_lastname":
                this.first_lastname = this.check(key, value);
                break;
            case "second_lastname":
                this.second_lastname = this.check(key, value);
                break;
            case "email":
                this.email = this.check(key, value);
                break;
            case "username":
                this.username = this.check(key, value);
                break;
            case "password":
                this.password = this.check(key, value);
                break;
            case "data":
                this.data = this.check(key, value);
                break;
            case "role":
                this.role = this.check(key, value);
                break;
            case "status":
                this.status = this.check(key, value);
                break;
            case "created":
                this.created = this.check(key, value);
                break;
            case "modified":
                this.modified = this.check(key, value);
                break;
            default:
                throw key + " no es un campo del tipo " + User.ENTITY.name;
        }
    }
    getKeyValue(key: string) {
        switch (key) {
            case "id":
                return this.id;
            case "first_name":
                return this.first_name;
            case "second_name":
                return this.second_name;
            case "first_lastname":
                return this.first_lastname;
            case "second_lastname":
                return this.second_lastname;
            case "email":
                return this.email;
            case "username":
                return this.username;
            case "password":
                return this.password;
            case "data":
                return this.data;
            case "role":
                return this.role;
            case "status":
                return this.status;
            case "created":
                return this.created;
            case "modified":
                return this.modified;
            default:
                throw "El campo " + key + " no existe.";
        }
    }
    get(): any {
        return {
            id: this.id,
            first_name: this.first_name,
            second_name: this.second_name,
            first_lastname: this.first_lastname,
            second_lastname: this.second_lastname,
            username: this.username,
            password: this.password,
            email: this.email,
            data: this.data,
            role: this.role,
            status: this.status,
            created: this.created,
            modified: this.modified
        };
    }

}
