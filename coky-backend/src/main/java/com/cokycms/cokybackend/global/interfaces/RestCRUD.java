package com.cokycms.cokybackend.global.interfaces;

import java.util.List;

import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RestController;

/**
 * CRUD Interface for the rest services
 */
@RestController
public interface RestCRUD<T, K> {

    @GetMapping
    public List<T> list();

    @PostMapping
    public void insert();

    @PutMapping
    public void update();

    @DeleteMapping
    public void delete();

}
