package com.Refa.inventario.Repository;

import com.Refa.inventario.Model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {
    Optional<User> findByNombreUsuarios(String nombreUsuarios);
}
