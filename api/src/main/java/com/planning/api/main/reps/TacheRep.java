package com.planning.api.main.reps;

import com.planning.api.main.models.Element;
import com.planning.api.main.models.Tache;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface TacheRep extends JpaRepository<Tache, Long> {

    @Query("select t from taches t where t.project.id=?2 and ?1 in (select r from t.recent r)")
    List<Tache> findAllByRecent(String currentKey, long projectId);

    @Query("select t from taches t where ?1 in (select e.identifier from t.elements e)")
    Tache findAllByElements(String element);
}
