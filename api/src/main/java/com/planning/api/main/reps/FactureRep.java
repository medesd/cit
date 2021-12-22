package com.planning.api.main.reps;

import com.planning.api.main.models.Facture;
import org.springframework.data.jpa.repository.JpaRepository;

public interface FactureRep extends JpaRepository<Facture, Long> {
}
