package com.planning.api.main.reps;

import com.planning.api.main.models.OrdreService;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface OrdreServiceRep extends JpaRepository<OrdreService, Long> {
    List<OrdreService> findAllByType(String type);
}
