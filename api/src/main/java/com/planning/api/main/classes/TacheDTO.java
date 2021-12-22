package com.planning.api.main.classes;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;


import java.util.List;
@Getter
@Setter
@JsonIgnoreProperties(ignoreUnknown = true)
@ToString
public class TacheDTO {
    private long id;
    private String name;
    private int currentKey;
    private String phase;
    private String jest;
    private String jreel;
    private String comment;
    private long jreelStart;
    private long jestStart;
    private int realJreel;
    private int realJest;
    private int complete;
    private String lot;
    private boolean end;
    private String inex;
    private List<String> recent;
    private ProjectDTO project;
}
