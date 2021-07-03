package com.example.shopping.repository;

import com.example.shopping.entity.ERole;
import com.example.shopping.entity.Role;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface RoleRepository extends JpaRepository<Role, Long> {

    Optional<Role> findByName(ERole name);

}
