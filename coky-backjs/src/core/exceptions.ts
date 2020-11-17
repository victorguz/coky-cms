import { exception } from "console";

export class CokyError extends Error {

    TYPE_ERRORS = [
        {
            "MAPPER": [
                { name: "TYPE_ERROR", message: "El campo {{field}} debe ser de tipo {{type}}." },
                { name: "NOT_EMPTY", message: "El campo {{field}} no puede ser null o estar vacío." },
                { name: "NOT_NULL", message: "El campo {{field}} no puede ser de tipo null." },
                { name: "MAX_LENGTH", message: "El campo {{field}} supera la longitud máxima {{length}}." },
            ]
        },
        {
            "ROUTES": [

            ]
        },
    ]

    constructor(name: string, type: string, element?: any) {
        super();
        this.message = this.getMessage(name, type, element);
        this.name = name;
    }

    getMessage(name: string, type: string, element?: any): string {
        for (const key in this.TYPE_ERRORS) {
            if (Object.prototype.hasOwnProperty.call(this.TYPE_ERRORS, key)) {
                const error = this.TYPE_ERRORS[key];
                for (const key in error) {
                    if (Object.prototype.hasOwnProperty.call(error, key)) {
                        if (key == type) {
                            return "";
                        }
                    }
                }
            }
        }
    }


    setExtraData(message: string, type: string, element: any): string {
        switch (type) {
            case "MAPPER":
                for (const key in element) {
                    if (Object.prototype.hasOwnProperty.call(element, key)) {
                        switch (key) {
                            case "name": message.replace("{{field}}", element.name); break;
                            case "type": message.replace("{{type}}", element.type); break;
                            case "length": message.replace("{{length}}", element.length); break;
                            default:
                                console.log("setExtraData:", key);
                                break;
                        }
                    }
                }
        }
        return message;
    }
}