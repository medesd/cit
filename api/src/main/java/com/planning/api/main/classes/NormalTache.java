package com.planning.api.main.classes;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.planning.api.main.models.Element;
import com.planning.api.main.models.Project;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;



import java.util.List;
@Getter
@Setter
@JsonIgnoreProperties(ignoreUnknown = true)
@ToString
public class NormalTache {
    private long id;
    private String name;
    private int currentKey;
    private String phase;
    private String jest;
    private String jreel;
    private long jreelStart;
    private long jestStart;
    private String comment;
    private int complete;
    private boolean end;
    private int realJreel;
    private int realJest;
    private String lot;
    private String inex;
    private List<String> recent;
    private Project project;
    private List<Element> elements;
}
