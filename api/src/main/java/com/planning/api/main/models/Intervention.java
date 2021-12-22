package com.planning.api.main.models;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import javax.persistence.*;
import java.util.Date;
@Entity(name = "interventions")
@Getter
@Setter
@ToString
public class Intervention {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private long id;
    private int principal;
    private int document;
    private int donnes;
    private Date entryDate;
    private String ref;
    @ToString.Exclude
    @OneToOne(cascade = {CascadeType.DETACH, CascadeType.MERGE, CascadeType.PERSIST, CascadeType.REFRESH})
    private Project project;
}
