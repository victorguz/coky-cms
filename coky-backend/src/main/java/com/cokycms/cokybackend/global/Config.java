package com.cokycms.cokybackend.global;

import java.util.Arrays;
import java.util.List;

import com.cokycms.cokybackend.global.classes.CokyException;
import com.cokycms.cokybackend.global.classes.CokyRoute;

/**
 * Clase de configuración global. Desarrollado por Victorguz en 2020
 */
public abstract class Config {

    /**
     * Se define un nombre identificador por medio del cual será llamado y un código
     * para base de datos
     */
    private static final String[][] roles = { { "superuser", "747" }, { "admin", "746" }, { "general", "745" } };

    /**
     * La lista de routes de servicio solo cumple fines de desarrollo y
     * probablemente no requiera ser almacenada en bases de datos. Ejemplo: {
     * "nombreroute", "route" }
     */
    private static List<CokyRoute> routes = Arrays.asList(new CokyRoute("users", "/users"));

    /**
     * To get the route url we need the route name like was registered
     * 
     * @param routeName
     * @return
     * @throws CokyException
     */
    public static String getRoute(String routeName) {
        if (routeName != null && !routeName.isEmpty()) {
            for (CokyRoute strings : routes) {
                if (strings.getRouteName().equalsIgnoreCase(routeName)) {
                    return strings.getRoute();
                }
            }
        }
        return null;
    }

    /**
     * To get the route name we need the route url like was registered
     * 
     * @param route
     * @return
     * @throws CokyException
     */
    public static String getRouteName(String route) {
        if (route != null && !route.isEmpty()) {
            for (CokyRoute strings : routes) {
                if (strings.getRouteName().equalsIgnoreCase(route)) {
                    return strings.getRouteName();
                }
            }
        }
        return null;
    }

    /**
     * To add a route dynamicly on the class
     * 
     * @param routeName
     * @param route
     */
    public static void addRoute(String routeName, String route) {
        routes.add(new CokyRoute(routeName, route));
    }

    /**
     * To add a route dynamicly on the class
     * 
     * @param routeName
     * @param route
     */
    public static void removeRoute(String routeName, String route) {
        routes.remove(new CokyRoute(routeName, route));
    }

}
