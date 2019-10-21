package com.gucci.luminaries.repository;

import com.gucci.luminaries.model.Role;
import com.gucci.luminaries.model.RoleName;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.Optional;

//Repository for the Roles. Uses custom enumerated RoleName type specified in RoleName.java
@Repository
public interface RoleRepository extends JpaRepository<Role, Long> {
    Optional<Role> findByName(RoleName roleName);
}