package com.planning.api.main.services;

import com.planning.api.main.reps.InterventionRep;
import com.planning.api.utils.Mapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class InterventionService {
    private final InterventionRep interventionRep;
    private final Mapper mapper;

    @Autowired
    public InterventionService(InterventionRep interventionRep) {
        this.interventionRep = interventionRep;
        this.mapper = new Mapper();
    }
}
