/**
 * Interface que contiene la forma original de la tabla 'Personas' con sus _id de referencia
 */
export interface User {

    id?: number;
    first_name?: string;
    second_name?: string;
    first_lastname?: string;
    second_lastname?: string;
    username?: string;
    password?: string;
    email?: string;
    data?: string;
    role?: number;
    status?: number;
    created?: Date;
    modified?: Date;

}