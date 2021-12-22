package com.planning.api.main.services;

import com.fasterxml.jackson.core.type.TypeReference;
import com.planning.api.main.classes.ElementDTO;
import com.planning.api.main.classes.EmployeeDTO;
import com.planning.api.main.classes.TacheDTO;
import com.planning.api.main.models.Employee;
import com.planning.api.main.reps.EmployeeRep;
import com.planning.api.security.dao.RoleRepo;
import com.planning.api.security.services.UserDetailsImpl;
import com.planning.api.utils.Mapper;
import lombok.SneakyThrows;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.function.Predicate;
import java.util.stream.Collectors;

@Service
public class EmployeeService {
    private final EmployeeRep employeeRep;
    private final PasswordEncoder passwordEncoder;
    private final Mapper mapper;
    private final RoleRepo roleRepo;

    @Autowired
    public EmployeeService(EmployeeRep employeeRep, PasswordEncoder passwordEncoder, RoleRepo roleRepo) {
        this.employeeRep = employeeRep;
        this.passwordEncoder = passwordEncoder;
        this.roleRepo = roleRepo;
        this.mapper = new Mapper();
    }


    public Map<String, Object> addEmployee(Employee employee) {
        if (employeeRep.existsByUsername(employee.getUsername())) return null;
        var roles = employee.getRoles();
        employee.setRoles(null);
        employee.setPassword(passwordEncoder.encode(employee.getPassword()));
        employeeRep.save(employee);
        employee.setRoles(roles);
        employee.setMain(false);

        return mapper.convertOneValue(employeeRep.save(employee));
    }


    public List<Map<String, Object>> getEmployeesNames() {

        var temps = this.employeeRep.findAll().stream().filter(f -> f.getRoles().stream().noneMatch(s -> s.getId() == 2)).collect(Collectors.toList());

        if (temps.isEmpty()) return null;


        return temps.stream().filter(x -> !x.getPosts().contains("Chauffeur/Coursier")).map(x -> {
            Map<String, Object> map = new HashMap<>();
            map.put("name", x.getUsername());
            map.put("id", x.getId());
            map.put("firstName", x.getFirstName());
            map.put("lastName", x.getLastName());
            return map;
        }).collect(Collectors.toList());
    }


    public List<Map<String, Object>> getAllEmployeesNames() {

        var temps = employeeRep.findAll();

        if (temps.isEmpty()) return null;


        return temps.stream().filter(Predicate.not(Employee::isMain)).map(x -> {
            Map<String, Object> map = new HashMap<>();
            map.put("name", x.getUsername());
            map.put("id", x.getId());
            map.put("firstName", x.getFirstName());
            map.put("lastName", x.getLastName());
            return map;
        }).collect(Collectors.toList());
    }


    public Map<String, Object> editEmployee(Long Eid, Employee employee) {
        if (!employeeRep.existsById(Eid)) return null;
        var temps = employeeRep.findAll();
        temps.removeIf(s -> s.getId() == Eid);
        if (temps.stream().map(Employee::getUsername).collect(Collectors.toList()).contains(employee.getUsername())) {
            return null;
        }
        var cur = employeeRep.getById(Eid);
        if (employee.getPassword() == null || employee.getPassword().isEmpty()) employee.setPassword(cur.getPassword());
        else employee.setPassword(passwordEncoder.encode(employee.getPassword()));
        employee.setElements(cur.getElements());
        employee.setId(Eid);
        employee.setMain(false);
        var e = mapper.convertOneValue(employeeRep.save(employee));
        e.remove("password");
        return e;
    }


    public List<Map<String, Object>> getAllEmployees(String filter) {

        var temps = employeeRep.findAll().stream().filter(f -> !f.isMain()).collect(Collectors.toList());
        return temps.stream().filter(f -> f.toString().toLowerCase().contains(filter.toLowerCase())).map(x -> {
            var map = mapper.convertOneValue(x);
            map.remove("password");

            return map;
        }).collect(Collectors.toList());
    }

    public Long deleteEmployee(Long Eid) {
        if (!employeeRep.existsById(Eid)) return null;
        var emp = employeeRep.getById(Eid);
        if (emp.isMain()) return null;
        roleRepo.deleteDeny(Eid);
        employeeRep.delete(emp);
        return Eid;
    }

    @SneakyThrows
    public List<Map<String, Object>> getElementsByEmployee() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        UserDetailsImpl currentPrincipalName = (UserDetailsImpl) authentication.getPrincipal();

        return employeeRep.getById(currentPrincipalName.getId()).getElements().stream().map(f -> {
            var ed = mapper.convertOneValue(f);

            var emp = mapper.convertOneValue(f.getEmployee());
            emp.remove("password");

            ed.replace("employee", emp);
            ed.replace("tache", mapper.convertOneValue(f.getTache()));
            return ed;
        }).collect(Collectors.toList());
    }


    public List<Map<String, Object>> getElementsByAdmin(Long Eid) {
        if (!employeeRep.existsById(Eid)) return null;
        var elms = employeeRep.getById(Eid).getElements();
        return mapper.convertListValue(elms);
    }


}
