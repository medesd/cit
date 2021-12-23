package com.planning.api.main.ctrls;

import com.planning.api.main.models.Sui05;
import com.planning.api.main.services.Sui05Service;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RequestMapping(path = "/api/sui05")
@RestController
@CrossOrigin("*")
public class Sui05Ctrl {
    private final Sui05Service sui05Service;

    public Sui05Ctrl(Sui05Service sui05Service) {
        this.sui05Service = sui05Service;
    }

    @PostMapping
    public void save(@RequestBody Sui05 sui05) {
        sui05Service.save(sui05);
    }

    @GetMapping
    public List<Map<String, Object>> findAll() {
        return sui05Service.findAll();
    }
}
