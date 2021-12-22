package com.planning.api.main.classes;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import java.util.List;

@Getter
@Setter
@ToString
@JsonIgnoreProperties(ignoreUnknown = true)
public class CusTache {
    private long id;
    private String name;
    private int currentKey;
    private String phase;
    private String jest;
    private String jreel;
    private long jreelStart;
    private long jestStart;
    private int realJreel;
    private int realJest;
    private String comment;
    private String lot;
    private int complete;
    private boolean end;
    private String inex;
    private List<String> recent;
    private List<CusElement> elements;
}
