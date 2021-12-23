package com.planning.api.main.models;


import com.fasterxml.jackson.annotation.JsonIgnore;
import com.planning.api.security.models.Role;
import com.sun.istack.NotNull;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import javax.persistence.*;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

@Entity(name = "employees")
@Getter
@Setter
@ToString
public class Employee {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private long id;
    @NotNull
    private String username;
    @NotNull
    @ToString.Exclude
    private String password;
    @ElementCollection
    private List<String> posts;
    private String firstName;
    private String ref;
    private String dateNaissance;
    private String lastName;
    private String etat;
    private String cnss;
    private String mail;
    private String phone;
    private String cin;
    private boolean main;


    @JsonIgnore
    @ToString.Exclude
    @OneToMany(mappedBy = "employee", cascade = CascadeType.ALL)
    private List<Element> elements;

    @ManyToMany(fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    @ToString.Exclude
    @JoinTable(name = "user_roles", joinColumns = @JoinColumn(name = "user_id"), inverseJoinColumns = @JoinColumn(name = "role_id"))
    private Set<Role> roles = new HashSet<>();

    @OneToMany(mappedBy = "employee")
    @ToString.Exclude
    @JsonIgnore
    private List<Conge> conges;

    @OneToMany(cascade = CascadeType.ALL, mappedBy = "employee")
    @ToString.Exclude
    @JsonIgnore
    private List<Sui05> sui05;


    public Employee() {
    }

    public Employee(String username, String password, Set<Role> roles) {
        this.username = username;
        this.password = password;
        this.roles = roles;
    }
}
