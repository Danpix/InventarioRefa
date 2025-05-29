package com.Refa.inventario.Model;

import jakarta.persistence.*;
import lombok.Data;
import org.hibernate.annotations.IdGeneratorType;

@Entity
@Data
@Table(name = "\"Usuarios\"")
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_usuarios", nullable = false)
    private Long idUsuario;
    @Column(name = "nombre_usuarios", nullable = false)
    private String nombreUsuarios;
    @Column(name = "correo_usuario", nullable = false)
    private String CorreoUsuarios;
    @Column(name = "rol")
    private String rol;
    @Column(name = "password")
    private String password;
}
