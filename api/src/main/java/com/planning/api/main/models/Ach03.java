package com.planning.api.main.models;

import jdk.jfr.Enabled;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import javax.persistence.*;
import java.util.Date;

@Entity
@Setter
@Getter
@ToString
public class Ach03 {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;
    private String ref;
    private Date dateFac;
    private String name;
    @Column(columnDefinition = "Text")
    private String details;
    private float ttc;
    private Date enhance;
    private Date dateReg;
    private String modeReg;
    private Date entryDate;
}
