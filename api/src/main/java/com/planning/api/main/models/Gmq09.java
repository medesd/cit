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
public class Gmq09 {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;
    private String ref;
    @Column(columnDefinition = "Text")
    private String data;
    private Date entryDate;
}
