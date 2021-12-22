package com.planning.api.main.ctrls;

import com.planning.api.main.models.Rh03;
import com.planning.api.main.services.Rh03Service;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping(path = "/api/rh03")
@CrossOrigin("*")
public class Rh03Ctrl {

    private final Rh03Service rh03Service;

    public Rh03Ctrl(Rh03Service rh03Service) {
        this.rh03Service = rh03Service;
    }

    @GetMapping(path = "/generate")
    @PreAuthorize("hasRole('USER')")
    public String generateRef() {
        return rh03Service.generateRef();
    }

    @PostMapping
    @PreAuthorize("hasRole('USER')")
    public void save(@RequestBody Rh03 rh03) {
        rh03Service.save(rh03);
    }
}
