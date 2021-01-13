/**
 * Clase que se hereda a todos los modelos.
 */
export abstract class Model {

    public static ENTITY: ModelEntity

}
/**
 * Datos básicos de una entidad de un modelo
 */
export interface ModelEntity {
    name: string;
    plural_name: string;
    table: string;
    model: Model;
}