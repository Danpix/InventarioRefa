package com.Refa.inventario.Controller;

import com.Refa.inventario.Model.Productos;
import com.Refa.inventario.Services.Productos_services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model; // ✅ Importar Model
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/productos")
public class ProductosController {
    
    @Autowired
    private Productos_services productos_services;

    @GetMapping("/mostrar")
    public List<Productos> listProductos() {
        return productos_services.listarProductos();
    }

}
