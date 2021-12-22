package com.planning.api.main.ctrls;

import com.planning.api.main.services.InterventionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/interventions")
@CrossOrigin("*")
public class InterventionCtrl {
    private final InterventionService interventionService;

    @Autowired
    public InterventionCtrl(InterventionService interventionService) {
        this.interventionService = interventionService;
    }
}
