package com.planning.api.main.ctrls;

import com.planning.api.main.models.Ach01;
import com.planning.api.main.services.Ach01Service;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping(path = "/api/ach01")
@CrossOrigin("*")
public class Ach01Ctrl {
    private final Ach01Service ach01Service;

    public Ach01Ctrl(Ach01Service ach01Service) {
        this.ach01Service = ach01Service;
    }

    @GetMapping(path = "/generate")
    @PreAuthorize("hasRole('USER')")
    public String generateRef() {
        return ach01Service.generateRef();
    }


    @PostMapping
    @PreAuthorize("hasRole('USER')")
    public void saveAch01(@RequestBody Ach01 ach01) {
        ach01Service.saveAch01(ach01);
    }
}
