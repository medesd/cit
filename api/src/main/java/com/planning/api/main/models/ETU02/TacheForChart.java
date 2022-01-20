package com.planning.api.main.models.ETU02;

import lombok.Getter;
import lombok.Setter;

import java.util.Date;

@Getter
@Setter
public class TacheForChart {
    private String name;
    private int est;
    private int reel;
    private int realEst;
    private int realReel;
    private Date dayReelStart;
    private Date dayReelEnd;
    private Date dayEstStart;
    private Date dayEstEnd;
    private String comment;
    private String estHours;
    private String reelHours;
    private String conceptType;
}
