package com.planning.api.main.ctrls;

import com.planning.api.main.models.Fac02;
import com.planning.api.main.services.Fac02Service;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RequestMapping(path = "/api/fac02")
@RestController
@CrossOrigin("*")
public class Fac02Ctrl {
    private final Fac02Service fac02Service;

    public Fac02Ctrl(Fac02Service fac02Service) {
        this.fac02Service = fac02Service;
    }

    @PostMapping
    public void save(@RequestBody Fac02 fac02) {
        fac02Service.save(fac02);
    }

    @PutMapping
    public Long edit(@RequestBody Fac02 fac02) {
        return fac02Service.edit(fac02);
    }

    @GetMapping(path = "/{year}")
    public List<Fac02> findByYear(@PathVariable("year") int year) {
        return fac02Service.findByYear(year);
    }
}
