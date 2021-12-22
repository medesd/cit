package com.planning.api.main.reps;

import com.planning.api.main.models.Intervention;
import org.springframework.data.jpa.repository.JpaRepository;

public interface InterventionRep extends JpaRepository<Intervention, Long> {
}
