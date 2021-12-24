package com.planning.api.main.ctrls;


import com.planning.api.main.models.Gmq07;
import com.planning.api.main.services.Gmq07Service;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping(path = "/api/gmq07")
@CrossOrigin("*")
public class Gmq07Ctrl {
    private final Gmq07Service gmq07Service;

    public Gmq07Ctrl(Gmq07Service gmq07Service) {
        this.gmq07Service = gmq07Service;
    }

    @PostMapping
    public void save(@RequestBody Gmq07 gmq07) {
        gmq07Service.save(gmq07);
    }

    @GetMapping(path = "/{year}")
    public List<Gmq07> findAllByYear(@PathVariable("year") int year) {
        return gmq07Service.findAllByYear(year);
    }
}
