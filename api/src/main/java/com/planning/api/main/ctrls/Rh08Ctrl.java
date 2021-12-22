package com.planning.api.main.ctrls;

import com.planning.api.main.models.Rh08;
import com.planning.api.main.services.Rh08Service;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping(path = "/api/rh08")
@CrossOrigin("*")
public class Rh08Ctrl {

    private final Rh08Service rh08Service;

    public Rh08Ctrl(Rh08Service rh08Service) {
        this.rh08Service = rh08Service;
    }

    @GetMapping(path = "/generate")
    @PreAuthorize("hasRole('USER')")
    public String generateRef() {
        return rh08Service.generateRef();
    }

    @PostMapping
    @PreAuthorize("hasRole('USER')")
    public void save(@RequestBody Rh08 rh08) {
        rh08Service.save(rh08);
    }
}
