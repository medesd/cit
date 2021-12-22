package com.planning.api.main.classes;


import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.planning.api.security.models.Role;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;


import java.util.List;
import java.util.Set;

@Getter
@Setter
@JsonIgnoreProperties(ignoreUnknown = true)
@ToString
public class CusEmployee {
    private long id;
    private String username;
    private List<String> posts;
    private Set<Role> roles;
    private String firstName;
    private String etat;
    private String cnss;
    private String ref;
    private String dateNaissance;
    private String lastName;
    private String mail;
    private String phone;
    private String cin;
}
