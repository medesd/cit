package com.planning.api.main.ctrls;

import com.planning.api.main.models.Ach05;
import com.planning.api.main.services.Ach05Service;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping(path = "/api/ach05")
@CrossOrigin("*")
public class Ach05Ctrl {
    private final Ach05Service ach05Service;

    public Ach05Ctrl(Ach05Service ach05Service) {
        this.ach05Service = ach05Service;
    }

    @PostMapping
    public void save(@RequestBody Ach05 ach05) {
        ach05Service.save(ach05);
    }

    @GetMapping
    public List<Ach05> findAll() {
        return ach05Service.findAll();
    }
}
