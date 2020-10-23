package com.cokycms.cokybackend.global.classes;

import java.util.Arrays;
import java.util.List;

public class CokyRoute {

    private String routeName;
    private String route;
    private List<CokyRole> roles;

    public CokyRoute(String routeName, String route, CokyRole role) throws CokyException {
        setRoute(route);
        setRouteName(routeName);
        addRole(role);
    }

    public CokyRoute(String routeName, String route, List<CokyRole> roles) {
        try {
            setRoute(route);
            setRouteName(routeName);
            setRoles(roles);
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

    public List<CokyRole> getRoles() {
        if (this.roles == null) {
            this.roles = Arrays.asList();
        }
        return this.roles;
    }

    public void setRoles(List<CokyRole> roles) throws CokyException {
        if (roles == null || roles.isEmpty()) {
            throw new CokyException("No se puede generar una ruta sin url");
        }
        this.roles = roles;
    }

    private void addRole(CokyRole role) throws CokyException {
        if (role == null) {
            throw new CokyException("No se puede añadir un rol nulo");
        }
        getRoles().add(role);
    }

    @Override
    public String toString() {
        return getRoute();
    }

}
