package com.planning.api.main.ctrls;

import com.planning.api.main.models.Gmq01;
import com.planning.api.main.services.Gmq01Service;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping(path = "/api/gmq01")
@CrossOrigin("*")
public class Gmq01Ctrl {

    private final Gmq01Service gmq01Service;

    public Gmq01Ctrl(Gmq01Service gmq01Service) {
        this.gmq01Service = gmq01Service;
    }

    @GetMapping(path = "/generate")
    @PreAuthorize("hasRole('USER')")
    public String generateRef() {
        return gmq01Service.generateRef();
    }

    @PostMapping
    @PreAuthorize("hasRole('USER')")
    public void save(@RequestBody Gmq01 gmq01) {
        gmq01Service.save(gmq01);
    }
}
