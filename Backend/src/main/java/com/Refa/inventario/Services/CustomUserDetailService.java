package com.Refa.inventario.Services;

import com.Refa.inventario.Repository.UserRepository;
import com.Refa.inventario.Model.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Service
public class CustomUserDetailService implements UserDetailsService {
    @Autowired
    private UserRepository usuariosRepository;

    @Override
    public UserDetails loadUserByUsername(String nombreUsuarios) throws UsernameNotFoundException {
        User usuario = usuariosRepository.findByNombreUsuarios(nombreUsuarios)
                .orElseThrow(() -> new UsernameNotFoundException("Usuario no encontrado: " + nombreUsuarios));

        return org.springframework.security.core.userdetails.User
                .withUsername(usuario.getNombreUsuarios())
                .password(usuario.getPassword())
                .roles(usuario.getRol())
                .build();


    }
}
