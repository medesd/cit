package com.planning.api.main.models.ETU02;

import lombok.Getter;
import lombok.Setter;

import java.util.Date;
import java.util.List;

@Getter
@Setter
public class Data {
    private String projectName;
    private String projectRef;
    private Date endDate;
    private int startCell;
    private Date startDate;
    private Date dateDebut;
    private List<TacheForChart> taches;
}
