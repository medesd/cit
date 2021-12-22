package com.planning.api.main.ctrls;

import com.planning.api.main.models.Com01;
import com.planning.api.main.services.Com01Service;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping(path = "/api/com01")
@CrossOrigin("*")
public class Com01Ctrl {


    private final Com01Service com01Service;

    @Autowired
    public Com01Ctrl(Com01Service com01Service) {
        this.com01Service = com01Service;
    }

    @GetMapping(path = "/generate")
    @PreAuthorize("hasRole('ADMIN')")
    public String generateRef() {
        return com01Service.generateRef();
    }


    @PostMapping
    @PreAuthorize("hasRole('ADMIN')")
    public void saveAch01(@RequestBody Com01 com01) {
        com01Service.saveCom01(com01);
    }

}
