package com.planning.api.main.reps;

import com.planning.api.main.models.Conge;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CongeRep extends JpaRepository<Conge, Long> {
}
