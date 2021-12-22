package com.planning.api.main.reps;

import com.planning.api.main.models.Project;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface ProjectRep extends JpaRepository<Project, Long> {
    boolean existsByName(String name);
    Optional<Project> findByRef(String ref);
}
