package com.planning.api.main.classes;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import java.util.Date;
import java.util.List;

@Getter
@Setter
@ToString
@JsonIgnoreProperties(ignoreUnknown = true)
public class CusProject {
    private long id;
    private String name;
    private String ref;
    private Date dateDebut;
    private String code;
    private String nemMarche;
    private String client;
    private int nombreNonConferment;
    private int nombreDeModificationArchi;
    private int nombreDeModificationBCT;
    private int nombreDeModificationAutre;
    private String piloteTechnique;
    private String maitreDouvrage;
    private String piloteVRD;
    private String piloteStructure;
    private String piloteMetreur;
    private String intervention;
    private String etat;
    private List<CusTache> taches;
}
