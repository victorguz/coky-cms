export module Functions {

    export function checkSQLType(type: string, value: any): any {

        if (type.includes("varchar") || type.includes("text")) {
            type = "string";
        }
        if (type.includes("int")) {
            type = "int";
        }
        if (type.includes("number") || type.includes("double")) {
            type = "number";
        }
        switch (type) {
            case "datetime":
                return typeOf("datetime", value) ? true : false;
            case "date":
                return typeOf("date", value) ? true : false;
            case "string":
                return typeOf("string", value) ? true : false;
            case "boolean":
                return typeOf("boolean", value) ? true : false;
            case "number":
                return typeOf("number", value) ? true : false;
            case "int":
                return typeOf("int", value) ? true : false;
            default:
                return null;
        }
    }
}

function isNullNaNOrUndefined(value: any) {
    return (typeof value == "undefined" || value == null || isNaN(value)) ? true : false
}

function typeOf(type: string, value: any) {
    if (type == "date" || type == "datetime") {
        return new Date(value) ? true : false;
    }
    if (type.includes("int")) {
        return typeof value == "number" && Number.isInteger(value);
    }
    if (type.includes("number") || type.includes("double")) {
        return typeof value == "number" && Number(value);
    }
    return isNullNaNOrUndefined(value) || typeof value == type;
}