package com.planning.api.main.classes;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.Getter;
import lombok.Setter;


import java.util.Date;

@JsonIgnoreProperties(ignoreUnknown = true)
@Getter
@Setter
public class DataDTO {
    private String id;
    private String type;
    private String comment;
    private String fileName;
    private String fileDownloadUri;
    private Date entryDate;
    private String fileType;
    private long size;
}
