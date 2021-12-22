package com.planning.api.main.models;

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
    @Column(columnDefinition = "Text")
    private String data;
    private float totalPrix;

    @ManyToOne(cascade = {CascadeType.DETACH, CascadeType.MERGE, CascadeType.PERSIST, CascadeType.REFRESH})
    private Project project;
}
