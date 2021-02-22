
export class CokyError extends Error {

    //TYPE ERRORS
    MAPPER = [
        { name: "TYPE_ERROR", message: "El campo 'field_name' debe ser de tipo 'type_name'." },
        { name: "NOT_EMPTY", message: "El campo 'field_name' no puede ser null o estar vacío." },
        { name: "NOT_NULL", message: "El campo 'field_name' no puede ser null." },
        { name: "MAX_LENGTH", message: "La longitud máxima del campo 'field_name' es de 'length'." },
        { name: "NOT_ALLOWED", message: "El campo 'field_name' no hace match con el tipo 'check_name'." },
    ]

    CONTROLLER = [
        { name: "BODY_ERROR", message: "El cuerpo de la petición no tiene los parámetros necesarios." },
        { name: "FIELDS_VALUES_LENGTH", message: "La longitud de los campos debe ser igual que la de los valores." },
        { name: "TYPE_ERROR", message: "Tipo incorrecto para el campo 'field_name'." },
    ]
    constructor(name: string, type: string, element: any = null) {
        super();
        this.message = this.getMessage(name, type, element);
        this.name = name;
    }

    /**
     * Retorna el mensaje del error 'name' ubicado en la lista 'type' con los parametros de 'element'.
     * @param name Nombre del error en la lista.
     * @param type Nombre de la lista de errores deseada.
     * @param element json con los campos requeridos para el error.
     */
    getMessage(name: string, type: string, element: any = null): string {
        let message = type + "." + name;
        let arr = this.MAPPER;
        switch (type) {
            // case "MAPPER": arr = this.MAPPER; break;
            case "CONTROLLER": arr = this.CONTROLLER; break;
        }
        arr.forEach(item => {
            if (item.name == name) {
                message = this.setExtraData(item.message, type, element);
            }
        });
        return message;
    }

    /**
     * 
     * @param message Es el mensaje de error
     * @param type El tipo de error
     * @param element json con los campos requeridos para el error.
     */
    setExtraData(message: string, type: string, element: any): string {
        if (element) {
            switch (type) {
                case "MAPPER":
                    for (const key in element) {
                        if (Object.prototype.hasOwnProperty.call(element, key)) {
                            switch (key) {
                                case "name": message = message.replace("field_name", element.name); break;
                                case "type": message = message.replace("type_name", element.type); break;
                                case "length": message = message.replace("length", element.length); break;
                                case "check": message = message.replace("check_name", element.check); break;
                            }
                        }
                    }
                    break;
                case "CONTROLLER":
                    for (const key in element) {
                        if (Object.prototype.hasOwnProperty.call(element, key)) {
                            switch (key) {
                                case "field": message = message.replace("field_name", element.field); break;
                            }
                        }
                    }
                    break;
            }
        }
        return message;
    }
}