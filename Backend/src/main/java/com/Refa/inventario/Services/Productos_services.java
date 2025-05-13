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
}
