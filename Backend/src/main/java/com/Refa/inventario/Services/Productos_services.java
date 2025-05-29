package com.Refa.inventario.Services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.Refa.inventario.Model.Productos;
import com.Refa.inventario.Repository.ProductosRepository;

@Service
public class Productos_services {

    @Autowired
    private ProductosRepository productosRepository;

    public List<Productos> listarProductos() {
        return productosRepository.findAll();
    }
    public Productos guardarProducto(Productos producto) {
        if (productosRepository.existsByIdTipo(producto.getIdTipo())) {
            return null;
        } else {
            return productosRepository.save(producto);
        }

    }
    public void eliminarProducto(String id) {
        productosRepository.deleteById(id);
    }
    public Productos actualizarProducto(String id, Productos productoActualizado) {
        // Buscar el producto existente
        Productos productoExistente = productosRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Producto no encontrado con id: " + id));

        // Actualizar los campos que quieres modificar
        productoExistente.setNombre(productoActualizado.getNombre());
        productoExistente.setIdTipo(productoActualizado.getIdTipo());
        productoExistente.setPrecio(productoActualizado.getPrecio());
        productoExistente.setCantidad(productoActualizado.getCantidad());

        // Guardar cambios
        return productosRepository.save(productoExistente);
    }

}
