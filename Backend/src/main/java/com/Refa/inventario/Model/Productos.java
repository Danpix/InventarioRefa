package com.Refa.inventario.Model;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Data
@Table(name = "productos", schema = "public")
public class Productos {
    @Id
    private String id_producto;
    @Column(nullable = false,length = 25,unique = true)
    private String nombre;
    @Column(nullable = false,length = 25, unique = false, name = "id_tipo")
    private int idTipo;
    @Column(nullable = false)
    private float precio;
    @Column(nullable = false)
    private int cantidad;

}
