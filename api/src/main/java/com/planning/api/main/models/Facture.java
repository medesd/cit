package com.planning.api.main.models;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonRawValue;
import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import java.util.Date;

@Entity(name = "factures")
@Getter
@Setter
public class Facture {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;
    private String projectName;
    private String nemMarche;
    private String client;
    private String object;
    private String ice;
    private String factureRef;
    private Date entryDate;
    @Column(columnDefinition = "json")
    @JsonRawValue
    private String data;
    private float totalPrix;
    private String etatReg;
    private String enhance;
    private Date dateReg;
    private String modeReg;
    @Column(columnDefinition = "Text")
    private String observation;

    @ManyToOne(cascade = {CascadeType.DETACH, CascadeType.MERGE, CascadeType.PERSIST, CascadeType.REFRESH})
    private Project project;

    @JsonIgnore
    @OneToOne(mappedBy = "facture", cascade = CascadeType.ALL)
    private Fac02 fac02;
}
