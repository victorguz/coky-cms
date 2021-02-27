
import { FieldMapper, Model } from "../core/model";

export class User extends Model<UserI> {


    public MAPPER: FieldMapper[] = [
        {
            name: "id",
            type: "int",
            key: "primary",
            extra: "auto_increment",
        },
        {
            name: "first_name",
            type: "varchar", length: 50,
            null: false,
        },
        {
            name: "second_name",
            type: "varchar", length: 50,
            null: true,
        },
        {
            name: "first_lastname",
            type: "varchar", length: 50,
            null: false,
        },
        {
            name: "second_lastname",
            type: "varchar", length: 50,
            null: true,
        },
        {
            name: "username",
            type: "varchar", length: 50,
            null: false,
        },
        {
            name: "password",
            type: "varchar", length: 50,
            null: false,
            check: "password",
        },
        {
            name: "email",
            type: "text",
            null: false,
            check: "email",
        },
        {
            name: "data",
            type: "text",
            null: true,
            check: "json",
        },
        {
            name: "role",
            type: "int",
            null: false,
            default: "1",
        },
        {
            name: "status",
            type: "int",
            null: false,
            default: "1",
        },
        {
            name: "created",
            type: "datetime",
            null: true,
        },
        {
            name: "modified",
            type: "datetime",
            null: true,
        }
    ];




    set(json: UserI): void {
        for (const key in json) {
            if (Object.prototype.hasOwnProperty.call(json, key)) {
                const value = json[key];
                this.setKeyValue(key, value);
            }
        }
    }

    setKeyValue(key: string, value: any) {
        switch (key) {
            case "id":
                this.entity.id = this.check(key, value);
                break;
            case "first_name":
                this.entity.first_name = this.check(key, value);
                break;
            case "second_name":
                this.entity.second_name = this.check(key, value);
                break;
            case "first_lastname":
                this.entity.first_lastname = this.check(key, value);
                break;
            case "second_lastname":
                this.entity.second_lastname = this.check(key, value);
                break;
            case "email":
                this.entity.email = this.check(key, value);
                break;
            case "username":
                this.entity.username = this.check(key, value);
                break;
            case "password":
                this.entity.password = this.check(key, value);
                break;
            case "data":
                this.entity.data = this.check(key, value);
                break;
            case "role":
                this.entity.role = this.check(key, value);
                break;
            case "status":
                this.entity.status = this.check(key, value);
                break;
            case "created":
                this.entity.created = this.check(key, value);
                break;
            case "modified":
                this.entity.modified = this.check(key, value);
                break;
            default:
                throw key + " no es un campo del tipo usuario";
        }
    }
    getKeyValue(key: string) {
        switch (key) {
            case "id":
                return this.entity.id;
            case "first_name":
                return this.entity.first_name;
            case "second_name":
                return this.entity.second_name;
            case "first_lastname":
                return this.entity.first_lastname;
            case "second_lastname":
                return this.entity.second_lastname;
            case "email":
                return this.entity.email;
            case "username":
                return this.entity.username;
            case "password":
                return this.entity.password;
            case "data":
                return this.entity.data;
            case "role":
                return this.entity.role;
            case "status":
                return this.entity.status;
            case "created":
                return this.entity.created;
            case "modified":
                return this.entity.modified;
            default:
                throw "El campo " + key + " no existe.";
        }
    }
    get(): any {
        return this.entity;
    }

}



export interface UserI {
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
}