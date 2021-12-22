package com.planning.api.security.dao;

import com.planning.api.security.models.ERole;
import com.planning.api.security.models.Role;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

@Repository
public interface RoleRepo extends JpaRepository<Role, Integer> {
    @Transactional
    @Modifying
    @Query(nativeQuery = true, value = "delete from user_roles where user_id=?1")
    void deleteDeny(Long id);
}
