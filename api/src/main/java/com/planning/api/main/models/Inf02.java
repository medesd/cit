package com.planning.api.main.models;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import javax.persistence.*;
import java.util.Date;

@Entity
@Getter
@Setter
@ToString
public class Inf02 {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;
    private String cat;
    private String designation;
    @Column(columnDefinition = "Text")
    private String type;
    private String affectation;
    @Column(columnDefinition = "Text")
    private String comment;
    private Date entryDate;
}
