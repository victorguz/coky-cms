/**
 * Módulo de funciones globales de tipo evaluativo
 */
export module Checks {
    /**
         * Evalúa si el valor es del tipo de dato SQL dado
         * @param type tipo de dato SQL
         * @param value valor a evaluar
         */
    export function isSQLType(type: string, value: any): boolean {
        //Null es un valor válido
        if (isNullUndefinedOrEmpty(value)) {
            return true;
        }
        if (type.includes("varchar") || type.includes("text")) {
            type = "string";
        }
        if (type.includes("int")) {
            type = "int";
        }
        if (type.includes("number") || type.includes("double")) {
            type = "number";
        }
        return isType(type, value) ? true : false;
    }
    /**
     * Evalúa si un valor es null o undefined
     * @param value 
     */
    export function isNullOrUndefined(value: any): boolean {
        return value == undefined || value == null
    }

    /**
     * Evalúa si un valor es null, undefined y si es un string, evaluará si está vacío
     * @param value valor a evaluar
     */
    export function isNullUndefinedOrEmpty(value: any): boolean {
        let result = isNullOrUndefined(value);
        if (!result && isType("string", value)) {
            result = isEmpty(value);
        }
        return result;
    }
    /**
     * Evalúa si la cadena está vacía
     * @param value valor a evaluar
     */
    export function isEmpty(value: string): boolean {
        return value.trim() == ""
    }
    /**
     * Evalúa si el valor es del tipo de dato dado
     * @param type tipo de dato
     * @param value valor
     */
    export function isType(type: string, value: any): boolean {
        type = type.toLocaleLowerCase()
        if (type == "string" || type == "varchar" || type == "text") {
            return typeof value == "string";
        }
        if (type == "date" || type == "datetime") {
            return new Date(value) ? true : false;
        }
        if (type == "int" || type == "integer") {
            return typeof value == "number" && Number.isInteger(value);
        }
        if (type.includes("number") || type.includes("double")) {
            return typeof value == "number" && Number(value) ? true : false;
        }
        return typeof value == type;
    }
    /**
     * Evalúa si un valor cumple con los requerimientos de la evaluación 
     * @param type tipo de evaluación que se debe hacer
     * @param value valor a evaluar
     */
    export function isByRegex(type: string, value: string) {
        if (!isNullUndefinedOrEmpty(value)) {
            type = isNullUndefinedOrEmpty(type) ? "null" : type
            switch (type) {
                case "email": return isEmail(value);
                case "password": return isPassword(value);
                case "json": return isPassword(value);
                case "null": return true;
            }
            return false;
        }
        return true;//Si el valor es nulo, true
    }

    /**
     * Evalúa si una cadena es un email válido. Este email debe empezar por 
     * una letra o número, contener un @ un dominio y un dominio de nivel superior. 
     * El único caracter especial permitido es el punto, el guión medio y el guión bajo.
     * Los caracteres especiales mencionados no pueden estar consecutivamente.
     * @param value cadena a evaluar
     */
    export function isEmail(value: string): boolean {
        let regex = /^[a-zA-Z0-9]+(?:[\.|\-|\_][a-zA-Z]+)+@[a-zA-Z]+(?:\.[a-zA-Z]+)+$/;
        if (value.match(regex) != null) {
            return true;
        }
        return false;
    }

    /**
     * Evalúa si una cadena es una contraseña válida. Esta contraseña debe tener 
     * por lo menos 8 dígitos y 3 de los 4 siguientes tipos de caracter: 
     * minúsculas, mayúsculas, números, especiales
     * @param value cadena a evaluar
     */
    export function isPassword(value: string): boolean {
        let regex = /^((?=.*[\d])(?=.*[a-z])(?=.*[A-Z])|(?=.*[a-z])(?=.*[A-Z])(?=.*[^\w\d\s])|(?=.*[\d])(?=.*[A-Z])(?=.*[^\w\d\s])|(?=.*[\d])(?=.*[a-z])(?=.*[^\w\d\s])).{8,}$/;
        if (value.match(regex) != null) {
            return true;
        }
        return false;
    }
}
