package com.cokycms.cokybackend.global.classes;

public class CokyRole {

    private int id;
    private String name;

    public CokyRole() {
    }

    public CokyRole(int id, String name) throws CokyException {
        setId(id);
        setName(name);
    }

    public int getId() {
        return this.id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getName() {
        return this.name;
    }

    public void setName(String name) throws CokyException {
        if (name == null || name.isEmpty()) {
            throw new CokyException("No se puede generar un rol sin nombre");
        }
        this.name = name;
    }

    @Override
    public String toString() {
        return getId() + "";
    }

}
