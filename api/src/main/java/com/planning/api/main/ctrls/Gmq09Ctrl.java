package com.planning.api.main.ctrls;

import com.planning.api.main.models.Gmq09;
import com.planning.api.main.services.Gmq09Service;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping(path = "/api/gmq09")
@CrossOrigin("*")
public class Gmq09Ctrl {

    private final Gmq09Service gmq09Service;

    public Gmq09Ctrl(Gmq09Service gmq09Service) {
        this.gmq09Service = gmq09Service;
    }

    @GetMapping(path = "/generate")
    @PreAuthorize("hasRole('USER')")
    public String generateRef() {
        return gmq09Service.generateRef();
    }

    @PostMapping
    @PreAuthorize("hasRole('USER')")
    public void save(@RequestBody Gmq09 gmq09) {
        gmq09Service.save(gmq09);
    }
}
