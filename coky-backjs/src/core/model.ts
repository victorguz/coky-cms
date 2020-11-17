import { CokyError } from "./exceptions";
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

                value = func.isNullNaNOrUndefined(value) ? null : value;//Chequear si el valor es null, NaN o undefined
                let checkNull = element.null == false && value == null;//Chequear si NO está permitido el valor nulo y si el valor es nulo.

                /**
                 * Si no puede ser nulo y es null:true/error
                 * Si no puede ser nulo y no es null: false/next
                 * Si puede ser nulo:false/next
                 */
                if (checkNull) {
                    throw new CokyError("NOT_NULL", "MAPPER", element);
                } else {
                    //Chequear si value:any es del tipo correcto.
                    let checkType = func.checkSQLType(element.type, value);
                    if (checkType) {
                        if (func.typeOf("string", value) && element.length != undefined && value.length > element.length) {
                            throw new CokyError("MAX_LENGTH", "MAPPER", element);
                        }
                        new_value = value;
                    } else {
                        throw new CokyError("TYPE_ERROR", "MAPPER", element);
                    }
                }
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

export class FieldMapper {
    name!: string;
    type!: string;
    length?: number = 99999999
    null?: boolean = true
    key?: string | null
    default?: any
    extra?: any
    check?: any
}