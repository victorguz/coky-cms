import { CokyError } from "./exceptions";
import { Checks as check } from "./checks";

/**
 * Clase que se hereda a todos los modelos.
 */
export abstract class Model {

    public static ENTITY: ModelEntity;
    public MAPPER!: FieldMapper[];

    constructor(json?: any) {
        if (json) {
            this.set(json)
        }
    }
    /**
     * Evalúa los campos de un json y si los nombres coinciden con los campos de la clase, asigna sus valores.
     * @param json elemento que contiene los datos para el objeto de la clase
     */
    abstract set(json: any): void;
    /**
     * retorna un json con todos los datos obtenidos de la clase
     */
    abstract get(): any;
    /**
     * Evalúa si un valor cumple con los parámetros del campo dados en el mapper.
     * @param field_name nombre del campo a evaluar
     * @param value valor evaluado
     */
    check(field_name: string, value: any): any {
        let new_value: any;
        this.MAPPER.forEach(element => {
            if (field_name == element.name) {

                value = check.isNullUndefinedOrEmpty(value) ? null : value;//Chequear si el valor es null, NaN o undefined
                let checkNull = element.null == false && value == null;//Chequear si NO está permitido el valor nulo y si el valor es nulo.

                /**
                 * Si no puede ser nulo y es null:error
                 * Si no puede ser nulo y no es null: false/next
                 * Si puede ser nulo:false/next
                 */
                if (element.null == false && check.isNullUndefinedOrEmpty(value)) {
                    throw new CokyError("NOT_NULL", "MAPPER", element);
                }
                //Chequear si el valor es del tipo SQL correcto.
                if (!check.isSQLType(element.type, value)) {
                    throw new CokyError("TYPE_ERROR", "MAPPER", element);
                }
                //Chequear si el valor tiene longitud correcta.
                if (!check.isType("string", value) && element.length != undefined && value.length > element.length) {
                    throw new CokyError("MAX_LENGTH", "MAPPER", element);
                }
                //Chequear si el valor es del tipo de match correcto.
                if (!check.isByRegex(element.check, value)) {
                    throw new CokyError("NOT_ALLOWED", "MAPPER", element);
                }
                new_value = value;
            }
        });
        return new_value;
    }


}
/**
 * Datos básicos de una entidad de un modelo
 */
export interface ModelEntity {
    name: String;
    plural_name: String;
    table: String;
    model: Model;
}
/**
 * Campos de los mappers
 */
export class FieldMapper {
    name!: string;
    type!: string;
    length?: number = 99999999;
    null?: boolean = true;
    key?: string | null;
    default?: any = null;
    extra?: any = null;
    check?: any = null;
}