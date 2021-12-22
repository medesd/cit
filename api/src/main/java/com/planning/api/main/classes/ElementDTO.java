package com.planning.api.main.classes;


import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@JsonIgnoreProperties(ignoreUnknown = true)
@ToString
public class ElementDTO {
    private int id;
    private String value;
    private String bgcolor;
    private String color;
    private String identifier;
    private String projectName;
    private String comment;
    private TacheDTO tache;
    private String end;
    private EmployeeDTO employee;
}
