package com.planning.api.security.services;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.SerializationFeature;
import com.planning.api.main.classes.EmployeeDTO;
import com.planning.api.main.models.Employee;
import com.planning.api.main.reps.EmployeeRep;
import com.planning.api.security.component.JwtUtils;
import com.planning.api.security.dao.RoleRepo;


import com.planning.api.security.models.JwtResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.stream.Collectors;


@Service
public class UserService {
    EmployeeRep employeeRep;
    PasswordEncoder passwordEncoder;
    AuthenticationManager authenticationManager;
    RoleRepo roleRepo;
    JwtUtils jwtUtils;
    ObjectMapper mapper;

    @Autowired
    public UserService(EmployeeRep employeeRep, JwtUtils jwtUtils, PasswordEncoder passwordEncoder, AuthenticationManager authenticationManager, RoleRepo roleRepo) {
        this.employeeRep = employeeRep;
        this.passwordEncoder = passwordEncoder;
        this.authenticationManager = authenticationManager;
        this.roleRepo = roleRepo;
        this.jwtUtils = jwtUtils;
        this.mapper = new ObjectMapper();
        mapper.configure(SerializationFeature.FAIL_ON_EMPTY_BEANS, false);
    }


    public EmployeeDTO getEmployee() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        UserDetailsImpl currentPrincipalName = (UserDetailsImpl) authentication.getPrincipal();

        var emp = employeeRep.getById(currentPrincipalName.getId());
        emp.setElements(null);
        emp.setRoles(null);
        emp.setPosts(null);
        emp.setPassword(null);
        return mapper.convertValue(emp, EmployeeDTO.class);
    }

    public EmployeeDTO changePassword(String curPassword, String newPassword) {

        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        UserDetailsImpl currentPrincipalName = (UserDetailsImpl) authentication.getPrincipal();

        Authentication authenticationx = authenticationManager
                .authenticate(new UsernamePasswordAuthenticationToken(employeeRep.getById(currentPrincipalName.getId()).getUsername(), curPassword));


        if (authenticationx.isAuthenticated()) {
            Employee user = employeeRep.getById(currentPrincipalName.getId());
            user.setPassword(passwordEncoder.encode(newPassword));
            employeeRep.save(user);
            user.setPassword(null);
            user.setRoles(null);
            user.setPosts(null);
            user.setElements(null);
            return mapper.convertValue(user, EmployeeDTO.class);
        }
        return null;
    }

    public HashMap<String, Object> changeDetails(Employee employee) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        UserDetailsImpl currentPrincipalName = (UserDetailsImpl) authentication.getPrincipal();



        Authentication authenticatiox = authenticationManager
                .authenticate(new UsernamePasswordAuthenticationToken(employeeRep.getById(currentPrincipalName.getId()).getUsername(), employee.getPassword()));



        if (authenticatiox.isAuthenticated()) {
            var emps = employeeRep.findAll().stream().filter(x -> x.getId() == employee.getId()).collect(Collectors.toList());
            if (emps.stream().noneMatch(x -> x.getUsername().equals(employee.getUsername()))) {
                var oldemp = employeeRep.getById(currentPrincipalName.getId());

                oldemp.setUsername(employee.getUsername());
                employeeRep.save(oldemp);



                System.out.println("...");
                authenticatiox = authenticationManager
                        .authenticate(new UsernamePasswordAuthenticationToken(employee.getUsername(), employee.getPassword()));
                System.out.println("...");

                employee.setPassword(oldemp.getPassword());
                employee.setPosts(oldemp.getPosts());
                employee.setElements(oldemp.getElements());
                employee.setRoles(oldemp.getRoles());
                employee.setId(oldemp.getId());
                employee.setMain(oldemp.isMain());
                employeeRep.save(employee);


                employee.setPassword(null);
                employee.setPosts(null);
                employee.setElements(null);
                employee.setRoles(null);

                String jwt = jwtUtils.generateJwtToken(authenticatiox);

                var map = new HashMap<String, Object>();
                map.put("employee", new ObjectMapper().convertValue(employee, EmployeeDTO.class));
                map.put("jwt", new JwtResponse(jwt));
                return map;
            }
        }
        return null;
    }
}
