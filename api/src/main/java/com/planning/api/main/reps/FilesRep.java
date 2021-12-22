package com.planning.api.main.reps;

import com.planning.api.main.models.Data;
import org.springframework.data.jpa.repository.JpaRepository;


public interface FilesRep extends JpaRepository<Data, String> {
}
