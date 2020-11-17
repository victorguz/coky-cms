export module Functions {

    export function checkSQLType(type: string, value: any): boolean {
        //Null es un valor válido
        if (isNullNaNOrUndefined(value)) {
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
        return typeOf(type, value) ? true : false;
    }

    export function isNullNaNOrUndefined(value: any): boolean {
        return (typeof value == "undefined" || value == undefined || value == null || isNaN(value)) ? true : false
    }

    export function isNullNaNUndefinedOrEmpty(value: any): boolean {
        let result = isNullNaNOrUndefined(value);
        if (!result) {
            result = isEmpty(value);
        }
        return result;
    }

    export function isEmpty(value: string): boolean {
        return value.trim() == ""
    }

    export function typeOf(type: string, value: any): boolean {
        if (type == "date" || type == "datetime") {
            return new Date(value) ? true : false;
        }
        if (type.includes("int")) {
            return typeof value == "number" && Number.isInteger(value);
        }
        if (type.includes("number") || type.includes("double")) {
            return typeof value == "number" && Number(value) ? true : false;
        }
        return typeof value == type;
    }
}
