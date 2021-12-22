package com.planning.api.main.ctrls;

import com.planning.api.main.models.Gmq02;
import com.planning.api.main.services.Gmq02Service;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping(path = "/api/gmq02")
@CrossOrigin("*")
public class Gmq02Ctrl {

    private final Gmq02Service gmq02Service;

    public Gmq02Ctrl(Gmq02Service gmq02Service) {
        this.gmq02Service = gmq02Service;
    }

    @GetMapping(path = "/generate")
    @PreAuthorize("hasRole('USER')")
    public String generateRef() {
        return gmq02Service.generateRef();
    }

    @PostMapping
    @PreAuthorize("hasRole('USER')")
    public void save(@RequestBody Gmq02 gmq02) {
        gmq02Service.save(gmq02);
    }
}
