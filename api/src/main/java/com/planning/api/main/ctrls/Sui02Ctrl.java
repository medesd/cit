package com.planning.api.main.ctrls;

import com.planning.api.main.models.Sui02;
import com.planning.api.main.services.Sui02Service;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping(path = "/api/sui02")
@CrossOrigin("*")
public class Sui02Ctrl {
    private final Sui02Service sui02Service;

    public Sui02Ctrl(Sui02Service sui02Service) {
        this.sui02Service = sui02Service;
    }

    @PostMapping
    public void save(@RequestBody Sui02 sui02) {
        sui02Service.save(sui02);
    }

    @GetMapping
    public List<Sui02> findAll() {
        return sui02Service.findAll();
    }
}
