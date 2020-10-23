package com.cokycms.cokybackend.global;

import java.util.Arrays;
import java.util.List;

import com.cokycms.cokybackend.global.classes.CokyException;
import com.cokycms.cokybackend.global.classes.CokyRole;
import com.cokycms.cokybackend.global.classes.CokyRoute;

/**
 * Clase de configuración global. Desarrollado por Victorguz en 2020
 */
public abstract class Config {

    public static Database db = Database.getInstance();
    /**
     * La lista de roles permite señalar la accesibilidad en cada ruta o API
     */
    private static List<CokyRole> roles = Arrays.asList();

    /**
     * La lista de rutas es utilizada para tener rutas globales que sean llamadas
     * por nombres que las identifiquen
     */
    private static List<CokyRoute> routes = Arrays.asList();

    /**
     * To get the route url we need the route name like was registered
     * 
     * @param routeName
     * @return
     * @throws CokyException
     */
    public static String getRouteLink(String routeName) throws CokyException {
        if (routeName != null && !routeName.isEmpty()) {
            for (CokyRoute strings : routes) {
                if (strings.getRouteName().equalsIgnoreCase(routeName)) {
                    return strings.getRoute();
                }
            }
            return null;
        }
        throw new CokyException("No se puede buscar una ruta sin el nombre de la ruta");
    }

    /**
     * To get the route name we need the route url like was registered
     * 
     * @param route
     * @return
     * @throws CokyException
     */
    public static String getRouteName(String route) throws CokyException {
        if (route != null && !route.isEmpty()) {
            for (CokyRoute strings : routes) {
                if (strings.getRouteName().equalsIgnoreCase(route)) {
                    return strings.getRouteName();
                }
            }
            return null;
        }
        throw new CokyException("No se puede buscar un nombre de ruta sin la ruta");
    }

    /**
     * To add a route dynamicly on the class
     * 
     * @param routeName
     * @param route
     * @throws CokyException
     */
    public static void addRoute(String routeName, String route, CokyRole role) throws CokyException {
        routes.add(new CokyRoute(routeName, route, role));
    }

    /**
     * To add a route dynamicly on the class
     * 
     * @param routeName
     * @param route
     * @throws CokyException
     */
    public static void removeRoute(String routeName, String route, CokyRole role) throws CokyException {
        routes.remove(new CokyRoute(routeName, route, role));
    }

    public static CokyRole getRole(String name) throws CokyException {
        if (name != null && !name.isEmpty()) {
            for (CokyRole cokyRole : roles) {
                if (cokyRole.getName().equalsIgnoreCase(name)) {
                    return cokyRole;
                }
            }
            return null;
        }
        throw new CokyException("No se puede buscar un rol sin nombre");
    }

    /**
     * Este método ajusta todas las configuraciones iniciales y debe ser lanzado al
     * inicio del programa
     * 
     * @throws CokyException
     * 
     */
    public static void initialize() throws CokyException {
        /**
         * Configuración de la base de datos. Primero local, luego producción, luego
         * iniciamos la conexión. [Singleton]
         */
        db.setDriver("mariadb");
        db.setLocalConnection("localhost", "my-project", "admin", "");
        db.setProdConnection("localhost", "my-project", "admin", "");
        db.enableLocalMode();
        /**
         * Lista de roles admitidos
         */
                roles.add(new CokyRole(747, "superuser")); // Developer
        roles.add(new CokyRole(748, "admin")); // Owner or manager
        roles.add(new CokyRole(749, "general")); // General user
        roles.add(new CokyRole(749, "app")); // some required by the APIS

        /**
         * Lista de rutas estáticas
         */
        routes.add(
                new CokyRoute("users", "/users", roles)); /**
                                                           * Es probable que esta ruta sea accesible por todos los roles
                                                           */
        
    }
}
