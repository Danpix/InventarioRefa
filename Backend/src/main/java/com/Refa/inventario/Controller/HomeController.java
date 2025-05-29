package com.Refa.inventario.Controller;

import org.springframework.ui.Model;

import com.Refa.inventario.Model.Productos;
import com.Refa.inventario.Services.Productos_services;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

import java.util.List;

@Controller
public class HomeController {


    @Autowired
    private Productos_services productos_services;

    @GetMapping("/login")
    public String login() {
        return "login";
    }


    @GetMapping("/index")
    public String homes(Model model) {
        model.addAttribute("mensaje", "Hola desde el controlador");
        List<Productos> productos = productos_services.listarProductos();
        model.addAttribute("productos", productos);
        return "index"; // nombre de la plantilla Thymeleaf o JSP
    }
}
