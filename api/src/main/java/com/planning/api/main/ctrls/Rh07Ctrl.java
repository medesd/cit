package com.planning.api.main.ctrls;

import com.planning.api.main.models.Rh07;
import com.planning.api.main.services.Rh07Service;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping(path = "/api/rh07")
@CrossOrigin("*")
public class Rh07Ctrl {

    private final Rh07Service rh07Service;

    public Rh07Ctrl(Rh07Service rh07Service) {
        this.rh07Service = rh07Service;
    }

    @GetMapping(path = "/generate")
    @PreAuthorize("hasRole('USER')")
    public String generateRef() {
        return rh07Service.generateRef();
    }

    @PostMapping
    @PreAuthorize("hasRole('USER')")
    public void save(@RequestBody Rh07 rh07) {
        rh07Service.save(rh07);
    }
}
