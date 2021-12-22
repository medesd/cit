package com.planning.api.security.controllers;

import com.planning.api.main.classes.EmployeeDTO;
import com.planning.api.main.models.Employee;
import com.planning.api.security.dao.RoleRepo;
import com.planning.api.security.component.JwtUtils;
import com.planning.api.security.models.JwtResponse;
import com.planning.api.security.models.LoginRequest;
import com.planning.api.security.services.UserService;
import lombok.Getter;
import lombok.Setter;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;


@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/auth")
public class AuthController {
    AuthenticationManager authenticationManager;
    RoleRepo roleRepo;
    PasswordEncoder encoder;
    UserService userService;
    JwtUtils jwtUtils;

    @Autowired
    public AuthController(AuthenticationManager authenticationManager, UserService userService, RoleRepo roleRepo, PasswordEncoder encoder, JwtUtils jwtUtils) {
        this.authenticationManager = authenticationManager;
        this.roleRepo = roleRepo;
        this.encoder = encoder;
        this.jwtUtils = jwtUtils;
        this.userService = userService;
    }

    @PostMapping("/signin")
    public ResponseEntity<?> authenticateUser(@RequestBody LoginRequest loginRequest) {

        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(loginRequest.getUsername(), loginRequest.getPassword()));

        SecurityContextHolder.getContext().setAuthentication(authentication);
        String jwt = jwtUtils.generateJwtToken(authentication);


        return ResponseEntity.ok(new JwtResponse(jwt));
    }


    @GetMapping("/employee")
    @PreAuthorize("hasRole('USER')")
    public EmployeeDTO getEmployee() {
        return userService.getEmployee();
    }

    @PutMapping("/details")
    @PreAuthorize("hasRole('USER')")
    public HashMap<String, Object> changeDetails(@RequestBody Employee employee) {
        return userService.changeDetails(employee);
    }

    @PostMapping("/password")
    @PreAuthorize("hasRole('USER')")
    public EmployeeDTO changePassword(@RequestBody Password password) {
        return userService.changePassword(password.curPassword, password.newPassword);
    }

    @Getter
    @Setter
    static class Password {
        String curPassword;
        String newPassword;
    }
}

