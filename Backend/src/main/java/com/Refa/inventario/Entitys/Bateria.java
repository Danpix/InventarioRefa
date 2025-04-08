package com.Refa.inventario.Entitys;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Data
@Table(name = "Baterias")
public class Bateria {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private String id_bateria;
    @Column(nullable = false,length = 50,unique = true)
    private String modelo;
}
