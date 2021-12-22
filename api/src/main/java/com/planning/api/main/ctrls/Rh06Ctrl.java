package com.planning.api.main.ctrls;

import com.planning.api.main.models.Rh06;
import com.planning.api.main.services.Rh06Service;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping(path = "/api/rh06")
@CrossOrigin("*")
public class Rh06Ctrl {

    private final Rh06Service rh06Service;

    public Rh06Ctrl(Rh06Service rh06Service) {
        this.rh06Service = rh06Service;
    }

    @PostMapping
    public void save(@RequestBody Rh06 rh06) {
        rh06Service.save(rh06);
    }

    @GetMapping
    public List<Map<String, Object>> findAll() {
        return rh06Service.findAll();
    }
}
