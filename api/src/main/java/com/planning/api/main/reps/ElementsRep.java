package com.planning.api.main.reps;

import com.planning.api.main.models.Element;
import com.planning.api.main.models.Employee;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import javax.transaction.Transactional;
import java.util.List;

@Repository
public interface ElementsRep extends JpaRepository<Element, Long> {
    List<Element> getAllByIdentifier(String ide);
    @Modifying
    @Transactional
    @Query("delete from elements u where u.id in ?1")
    void deleteElementsWithIds(List<Long> ids);

    List<Element> getElementsByEmployee(Employee employee);
    List<Element> getElementsByValue(String value);

    List<Element> getElementsByProjectName(String p);
}
