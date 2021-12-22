package com.planning.api.main.models;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import javax.persistence.*;
import java.util.Date;

@Entity(name = "Conges")
@Setter
@Getter
@ToString
public class Conge {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;
    private Date firstDate;
    private Date lastDate;
    @Column(columnDefinition = "Text")
    private String comment;

    @ToString.Exclude

    @ManyToOne(fetch = FetchType.LAZY, cascade = {CascadeType.DETACH, CascadeType.MERGE, CascadeType.PERSIST, CascadeType.REFRESH})
    private Employee employee;

}
