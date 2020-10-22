package com.cokycms.cokybackend.controller;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;

@Controller
public class DemoController {

    // @Autowired
    // private UsuarioImpl usuarios;

    @GetMapping("/greeting")
    public String greeting(@RequestParam(name = "name", required = false, defaultValue = "World") String name,
            Model model) {
        // usuarios.save(new Usuario(1, "Victor"));
        model.addAttribute("usuarios", "");
        return "greeting";
    }
}