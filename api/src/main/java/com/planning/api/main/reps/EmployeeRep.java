package com.planning.api.main.reps;

import com.planning.api.main.models.Element;
import com.planning.api.main.models.Employee;
import com.planning.api.main.models.Project;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Repository
public interface EmployeeRep extends JpaRepository<Employee, Long> {

    Optional<Employee> findByUsername(String user);

    List<Employee> findAllByUsernameIn(Iterable<String> usernames);

    boolean existsByUsername(String usr);
}
