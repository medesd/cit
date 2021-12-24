package com.planning.api.main.ctrls;

import com.planning.api.main.models.Etu04;
import com.planning.api.main.services.Etu04Service;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping(path = "/api/etu04")
@CrossOrigin("*")
public class Etu04Ctrl {
    private final Etu04Service etu04Service;

    public Etu04Ctrl(Etu04Service etu04Service) {
        this.etu04Service = etu04Service;
    }

    @PreAuthorize("hasRole('ADMIN')")
    @GetMapping("/generate")
    public String generateRef() {
        return etu04Service.generateRef();
    }

    @PostMapping
    @PreAuthorize("hasRole('ADMIN')")
    public void saveEtu04(@RequestBody Etu04 etu04) {
        etu04Service.saveEtu04(etu04);
    }


    @GetMapping
    @PreAuthorize("hasRole('ADMIN')")
    public List<Etu04> findAll() {
        return etu04Service.findAll();
    }

}
