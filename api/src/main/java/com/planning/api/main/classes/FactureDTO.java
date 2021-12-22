package com.planning.api.main.models;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import java.util.Date;


@Getter
@Setter
@JsonIgnoreProperties(ignoreUnknown = true)
public class FactureDTO {
    private long id;
    private String projectName;
    private String nemMarche;
    private String client;
    private String object;
    private String ice;
    private String factureRef;
    private Date entryDate;
    private String data;
    private Project project;
    private float totalPrix;
}
