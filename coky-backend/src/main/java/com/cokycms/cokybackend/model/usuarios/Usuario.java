package com.cokycms.cokybackend.model.usuarios;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;

@Entity
public class Usuario {

    @Id
    private int Usuario_id;

    @Column(name = "nombre", length = 50)
    private String nombre;

    public Usuario() {
    }

    public int getUsuario_id() {
        return this.Usuario_id;
    }

    public void setUsuario_id(int Usuario_id) {
        this.Usuario_id = Usuario_id;
    }

    public String getNombre() {
        return this.nombre;
    }

    public void setNombre(String nombre) {
        this.nombre = nombre;
    }

}
