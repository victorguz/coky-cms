package com.cokycms.cokybackend.global.classes;

public class CokyRoute {

    String routeName;
    String route;

    private CokyRoute() {
    }

    public CokyRoute(String routeName, String route) {
        try {
            setRoute(route);
            setRouteName(routeName);
        } catch (CokyException e) {
            e.printStackTrace();
            System.out.println(e.getMessage());
        }
    }

    public String getRouteName() {
        return this.routeName;
    }

    public void setRouteName(String routeName) throws CokyException {
        if (routeName == null || routeName.isEmpty()) {
            throw new CokyException("No se puede generar una ruta sin nombre");
        }
        this.routeName = routeName;
    }

    public String getRoute() {
        return this.route;
    }

    public void setRoute(String route) throws CokyException {
        if (route == null || route.isEmpty()) {
            throw new CokyException("No se puede generar una ruta sin url");
        }
        this.route = route;
    }

    @Override
    public String toString() {
        return getRoute();
    }

}
