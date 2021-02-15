import { Routes } from "@angular/router";

export abstract class ViewComponent {

    static routes: Routes;

    /**
     * Contiene las rutas de cada componente
     */
    static setRoutes() { }

    /**
     * Valida que el usuario actual sea de un rol válido para la ruta actual.
     */
    static validateRole(): boolean { return false }

}