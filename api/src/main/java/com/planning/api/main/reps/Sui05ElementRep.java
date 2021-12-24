package com.planning.api.main.reps;

import com.planning.api.main.models.Sui05Element;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

public interface Sui05ElementRep extends JpaRepository<Sui05Element, Long> {

    @Query("delete from Sui05Element s where s.identifier in ?1")
    @Modifying
    @Transactional
    void findAllByIdentifier(List<String> ids);
}
