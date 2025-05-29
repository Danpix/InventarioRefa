package com.Refa.inventario.Services;

import com.Refa.inventario.Model.User;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.Collection;
import java.util.Collections;

public class CustomUserDetail implements UserDetails {
    private final User usuario;

    public CustomUserDetail(User usuario) {
        this.usuario = usuario;
    }

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        // Spring Security requiere los roles con prefijo "ROLE_"
        return Collections.singleton(new SimpleGrantedAuthority("ROLE_" + usuario.getRol()));
    }

    @Override
    public String getPassword() {
        return usuario.getPassword(); // Este campo debe estar en tu entidad Usuarios
    }

    @Override
    public String getUsername() {
        return usuario.getNombreUsuarios(); // Aquí va tu campo de nombre de usuario
    }

    @Override
    public boolean isAccountNonExpired() {
        return true; // Cambia si manejas expiración de cuenta
    }

    @Override
    public boolean isAccountNonLocked() {
        return true; // Cambia si manejas bloqueo de cuenta
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true; // Cambia si manejas expiración de contraseña
    }

    @Override
    public boolean isEnabled() {
        return true; // Cambia si manejas usuarios deshabilitados
    }
}
