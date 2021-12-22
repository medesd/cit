package com.planning.api.main.ctrls;

import com.planning.api.main.models.Ach02;
import com.planning.api.main.services.Ach02Service;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping(path = "/api/ach02")
@CrossOrigin("*")
public class Ach02Ctrl {

    private final Ach02Service ach02Service;

    public Ach02Ctrl(Ach02Service ach02Service) {
        this.ach02Service = ach02Service;
    }

    @GetMapping(path = "/generate")
    @PreAuthorize("hasRole('USER')")
    public String generateRef() {
        return ach02Service.generateRef();
    }

    @PostMapping
    @PreAuthorize("hasRole('USER')")
    public void save(@RequestBody Ach02 ach02) {
        ach02Service.save(ach02);
    }
}
