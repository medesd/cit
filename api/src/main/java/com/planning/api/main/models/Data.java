package com.planning.api.main.models;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;
import org.hibernate.annotations.GenericGenerator;

import javax.persistence.*;
import java.util.Date;
import java.util.UUID;

@Entity(name = "data")
@Getter
@Setter
@JsonIgnoreProperties(ignoreUnknown = true)
@ToString
public class Data {
    @Id
    @GeneratedValue(generator = "uuid")
    @GenericGenerator(name = "uuid", strategy = "org.hibernate.id.UUIDGenerator")
    @Column(unique = true)
    private String id;
    private String type;
    @Column(columnDefinition = "Text")
    private String comment;
    private String fileName;
    private String fileDownloadUri;
    private String fileType;
    private Date entryDate;
    private long size;
    @ToString.Exclude
    @ManyToOne(fetch = FetchType.LAZY, cascade = {CascadeType.DETACH, CascadeType.MERGE, CascadeType.PERSIST, CascadeType.REFRESH})
    private Project project;
}
