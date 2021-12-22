package com.planning.api.main.classes;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import javax.persistence.ElementCollection;
import java.util.List;

@Getter
@Setter
@JsonIgnoreProperties(ignoreUnknown = true)
@ToString
public class EmployeeDTO {
    private int id;
    private String username;
    @ElementCollection
    private List<String> posts;
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
