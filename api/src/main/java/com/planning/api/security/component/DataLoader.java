package com.planning.api.security.component;


import com.planning.api.main.services.FactureService;
import com.planning.api.main.models.Employee;
import com.planning.api.main.reps.EmployeeRep;
import com.planning.api.security.dao.RoleRepo;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.ApplicationArguments;
import org.springframework.boot.ApplicationRunner;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;


import java.util.HashSet;

@Component
public class DataLoader implements ApplicationRunner {
    JdbcTemplate base;
    RoleRepo roleRepo;
    PasswordEncoder passwordEncoder;
    EmployeeRep employeeRep;
    FactureService generalService;

    @Autowired
    public DataLoader(JdbcTemplate base, EmployeeRep employeeRep, RoleRepo roleRepo, PasswordEncoder passwordEncoder, FactureService generalService) {
        this.base = base;
        this.roleRepo = roleRepo;
        this.passwordEncoder = passwordEncoder;
        this.employeeRep = employeeRep;
        this.generalService = generalService;
    }

    @Override
    public void run(ApplicationArguments args) throws Exception {


        int count = roleRepo.findAll().size();
        if (count == 0) {
            base.update("insert into roles(id,name) values (1,'ROLE_USER'),(2,'ROLE_ADMIN'),(3,'ROLE_PILOTE')");
        }


        count = employeeRep.findAll().size();
        if (count == 0) {
            Employee user = new Employee();
            user.setUsername("admin");
            user.setMain(true);
            user.setPassword(passwordEncoder.encode("admin"));
            employeeRep.save(user);
            user.setRoles(new HashSet<>(roleRepo.findAll()));
            employeeRep.save(user);
            System.out.println("...");
        }




    }

}
