package com.Refa.inventario.Model;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Data
@Table(name = "Productos")
public class Productos {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private String id_producto;
    @Column(nullable = false,length = 25,unique = true)
    private String nombre;
    @Column(nullable = false,length = 25,unique = true)
    private int id_tipo;
    @Column(nullable = false)
    private float precio;
    @Column(nullable = false)
    private int cantidad;

}
