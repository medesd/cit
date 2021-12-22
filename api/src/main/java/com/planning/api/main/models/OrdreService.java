package com.planning.api.main.models;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import java.util.Date;

@Getter
@Setter
@Entity(name = "ordre_services")
@ToString
public class OrdreService {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;
    private String project;
    private String ref;
    private String client;
    private String titulaire;
    private String lieu;
    private String nemMarche;
    private Date dateNotif;
    private Date dateDebut;
    private String type;
    private Date entryDate;
}
