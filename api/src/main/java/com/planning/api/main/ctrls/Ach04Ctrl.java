package com.planning.api.main.ctrls;

import com.planning.api.main.models.Ach04;
import com.planning.api.main.services.Ach04Service;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping(path = "/api/ach04")
@CrossOrigin("*")
public class Ach04Ctrl {
    private final Ach04Service ach04Service;

    public Ach04Ctrl(Ach04Service ach04Service) {
        this.ach04Service = ach04Service;
    }

    @PostMapping
    public void save(@RequestBody Ach04 ach04) {
        ach04Service.save(ach04);
    }

    @GetMapping(path = "/{year}")
    public List<Ach04> findByYear(@PathVariable("year") int year) {
        return ach04Service.findByYear(year);
    }
}
