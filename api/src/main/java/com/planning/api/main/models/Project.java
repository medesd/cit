package com.planning.api.main.models;


import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import javax.persistence.*;
import java.util.Date;
import java.util.List;

@Entity(name = "projects")
@Getter
@Setter
@ToString
@JsonIgnoreProperties(ignoreUnknown = true)
public class Project {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private long id;
    private String name;
    @Column(unique = true)
    private String ref;
    private Date dateDebut;
    private Date dateNotif;
    private String nemMarche;
    private String client;
    private String code;
    private String autre;
    private String control;
    private int nombreNonConferment;
    private int nombreDeModificationArchi;
    private int nombreDeModificationBCT;
    private int nombreDeModificationAutre;
    private String maitreDouvrage;
    private String piloteTechnique;
    private String piloteVRD;
    private String piloteStructure;
    private String piloteMetreur;
    private String etat;
    private String architecte;
    @JsonIgnore
    @ToString.Exclude
    @OneToMany(mappedBy = "project", cascade = CascadeType.ALL)
    private List<Tache> taches;
    @JsonIgnore
    @ToString.Exclude
    @OneToMany(cascade = CascadeType.ALL, fetch = FetchType.LAZY, mappedBy = "project")
    private List<Data> data;

    @JsonIgnore
    @ToString.Exclude
    @OneToMany(cascade = CascadeType.ALL, mappedBy = "project")
    private List<Facture> factures;


    @JsonIgnore
    @ToString.Exclude
    @OneToOne(cascade = CascadeType.ALL, mappedBy = "project")
    private Intervention intervention;


    @JsonIgnore
    @ToString.Exclude
    @OneToOne(cascade = CascadeType.ALL, mappedBy = "project")
    private Sui02 sui02;

    @JsonIgnore
    @ToString.Exclude
    @OneToOne(cascade = CascadeType.ALL, mappedBy = "project")
    private Sui05 sui05;
}
