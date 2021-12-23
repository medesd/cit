package com.planning.api.main.models;


import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import javax.persistence.*;
import java.util.Date;


@Entity
@Setter
@Getter
@ToString
public class Gmq01 {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;
    private String ref;
    private Date date;
    private String type;
    private String client;
    @Column(columnDefinition = "Text")
    private String description;
    private String service;
    private String interneRef;
    private String quality;
    private String etape;
    private String ncName;
    @Column(columnDefinition = "Text")
    private String cause;
    private String causeName;
    @Column(columnDefinition = "Text")
    private String correction;
    private Date dateCorrection;
    private String respCorrection;
    @Column(columnDefinition = "Text")
    private String action;
    private Date dateAction;
    private String respAction;
    private Date entryDate;
}
