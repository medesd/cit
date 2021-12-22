package com.planning.api.main.ctrls;


import com.planning.api.main.models.Facture;
import com.planning.api.main.services.FactureService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RequestMapping(value = "/api/factures")
@RestController
@CrossOrigin("*")
public class FactureCtrl {
    private final FactureService factureService;

    @Autowired
    public FactureCtrl(FactureService factureService) {
        this.factureService = factureService;
    }


    @GetMapping(path = "/ref/{pid}")
    @PreAuthorize("hasRole('USER')")
    public String generateFactureRef(@PathVariable("pid") long pid) {
        return factureService.generateFactureRef(pid);
    }

    @PostMapping
    @PreAuthorize("hasRole('ADMIN')")
    public Map<String,Object> addFacture(@RequestBody Facture facture) {
        return factureService.addFacture(facture);
    }

    @GetMapping
    @PreAuthorize("hasRole('ADMIN')")
    public List<Map<String,Object>> getAllFactures() {
        return factureService.getAllFactures();
    }

    @GetMapping(path = "/{year}")
    @PreAuthorize("hasRole('ADMIN')")
    public List<Map<String,Object>> getFacturesByYear(@PathVariable("year") int year) {
        return factureService.getFacturesByYear(year);
    }



}
