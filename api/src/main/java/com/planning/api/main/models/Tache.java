package com.planning.api.main.models;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import javax.persistence.*;
import java.util.List;

@Entity(name = "taches")
@Getter
@Setter
@JsonIgnoreProperties(ignoreUnknown = true)
@ToString
public class Tache {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private long id;
    private String name;
    private int currentKey;
    private String phase;
    private int realJreel;
    private int realJest;
    private String jest;
    private String jreel;
    @Column(columnDefinition = "Text")
    private String comment;
    private int complete;
    private boolean end;
    private String inex;
    private long jreelStart;
    private long jestStart;
    private String lot;
    @ElementCollection
    private List<String> recent;
    @ToString.Exclude
    @ManyToOne(fetch = FetchType.LAZY, cascade = {CascadeType.DETACH, CascadeType.MERGE, CascadeType.PERSIST, CascadeType.REFRESH})
    private Project project;
    @JsonIgnore
    @ToString.Exclude
    @OneToMany(mappedBy = "tache", cascade = CascadeType.ALL)
    private List<Element> elements;

}
