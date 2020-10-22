package com.cokycms.cokybackend.model.coky.DynamicTables;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;

@Entity
public class DynamicTable {

    @Id
    private int id;

    @Column(name = "name", nullable = false)
    private String name;

    @Column(name = "columns", nullable = false, columnDefinition = "text")
    private String columns;

    @Column(name = "state", nullable = false)
    private int state;

    public DynamicTable() {
    }

}
