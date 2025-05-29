package com.Refa.inventario.Controller;

import com.Refa.inventario.Model.Productos;
import com.Refa.inventario.Services.Productos_services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model; // ✅ Importar Model
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

@RestController
@RequestMapping("/productos")
public class ProductosController {
    
    @Autowired
    private Productos_services productos_services;

    @GetMapping("/mostrar")
    public List<Productos> listProductos() {
        return productos_services.listarProductos();
    }

    @PostMapping("/insertar")
    public Productos insertarProducto(@RequestBody Productos producto) {
        try {
            return productos_services.guardarProducto(producto);
        } catch (Exception e) {
            // Captura cualquier error y lo loguea
            System.out.println("Error al insertar producto: " + e.getMessage());
            throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, "Error interno del servidor", e);
        }
    }
    @DeleteMapping("/eliminar/{id}")
    public void eliminarProducto(@PathVariable("id") String id) {
        try {
            productos_services.eliminarProducto(id);
        } catch (Exception e) {
            System.out.println("Error al eliminar producto: " + e.getMessage());
            throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, "Error interno del servidor", e);
        }
    }
    @PutMapping("/actualizar/{id}")
    public Productos actualizarProducto(@PathVariable("id") String id, @RequestBody Productos productoActualizado) {
        try {
            return productos_services.actualizarProducto(id, productoActualizado);
        } catch (Exception e) {
            System.out.println("Error al actualizar producto: " + e.getMessage());
            throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, "Error interno del servidor", e);
        }
    }

}
