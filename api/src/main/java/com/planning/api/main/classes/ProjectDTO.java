package com.planning.api.main.classes;


import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import java.util.Date;

@Getter
@Setter
@JsonIgnoreProperties(ignoreUnknown = true)
@ToString
public class ProjectDTO {
    private long id;
    private String name;
    private String ref;
    private Date dateDebut;
    private Date dateNotif;
    private String autre;
    private String nemMarche;
    private String client;
    private String maitreDouvrage;
    private int nombreNonConferment;
    private int nombreDeModificationArchi;
    private int nombreDeModificationBCT;
    private int nombreDeModificationAutre;
    private String piloteTechnique;
    private String piloteVRD;
    private String piloteStructure;
    private String piloteMetreur;
    private String intervention;
    private String etat;
}
