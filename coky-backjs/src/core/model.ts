import { Functions as func } from "./functions";

export abstract class Model {

    public static ENTITY: ModelEntity;
    public MAPPER!: FieldMapper[];

    constructor(json?: any) {
        if (json) {
            this.set(json)
        }
    }

    abstract set(json: any): void;

    abstract get(): any;

    check(field_name: string, value: any): any {
        let new_value: any;
        this.MAPPER.forEach(element => {

            if (field_name == element.name) {
                let check = func.checkSQLType(element.type, value);

                console.log(check ? true : false)
                // console.log(check)
                if (check) {
                    new_value = value;
                    // } if (isNaN(check)) {
                    // console.log("El campo '" + field_name + "' no es de tipo " + element.type);
                    // new_value = check;
                } else {
                    let isNumber = element.type.includes("number") || element.type.includes("int") || element.type.includes("double");
                    new_value = isNumber ? -1 : null;
                };

            }

        });
        return new_value;
    }


}

export interface ModelEntity {
    name: String;
    plural_name: String;
    table: String;
}

export interface FieldMapper {
    name: string,
    type: string,
    null?: boolean,
    key?: string | null,
    default?: any,
    extra?: any
    check?: any
}