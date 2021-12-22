package com.planning.api.main.classes;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
@JsonIgnoreProperties(ignoreUnknown = true)
public class CusElement {
    private int id;
    private String value;
    private String bgcolor;
    private String color;
    private String identifier;
    private String comment;
    private String end;
    private EmployeeDTO employee;
}
