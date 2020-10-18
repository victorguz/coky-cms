package com.cokycms.cokybackend.controller;

import com.cokycms.cokybackend.model.usuarios.Usuario;
import com.cokycms.cokybackend.model.usuarios.UsuarioImpl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;

@Controller
public class DemoController {

    @Autowired
    private UsuarioImpl usuarios;

    @GetMapping("/greeting")
    public String greeting(@RequestParam(name = "name", required = false, defaultValue = "World") String name,
            Model model) {

        usuarios.save(new Usuario());
        
        model.addAttribute("name", name);
        return "greeting";
    }
}