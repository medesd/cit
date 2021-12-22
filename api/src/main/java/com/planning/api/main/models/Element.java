package com.planning.api.main.models;


import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import javax.persistence.*;

@Entity(name = "elements")
@Getter
@Setter
@ToString
public class Element {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private long id;
    private String identifier;
    private String color;
    private String bgcolor;
    private String value;
    private String projectName;
    private String end;
    @Column(columnDefinition = "Text")
    private String comment;

    @ManyToOne(fetch = FetchType.LAZY, cascade = {CascadeType.DETACH, CascadeType.MERGE, CascadeType.PERSIST, CascadeType.REFRESH})
    @ToString.Exclude
    private Tache tache;

    @ManyToOne(fetch = FetchType.LAZY, cascade = {CascadeType.DETACH, CascadeType.MERGE, CascadeType.PERSIST, CascadeType.REFRESH})
    @ToString.Exclude
    private Employee employee;
}
