package com.planning.api.main.models;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import java.util.Date;

@Entity
@Getter
@Setter
@ToString
public class Ach04 {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;
    private String entreprise;
    private String type;
    private String ice;
    private String rep;
    private String tele;
    private String mail;
    private String banque;
    private String compte;
    private String classe;
    private String just;
    private Date entryDate;
}
