package com.planning.api.main.ctrls;

import com.planning.api.main.models.Sui05;
import com.planning.api.main.models.Sui05Element;
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

    @PostMapping("/add")
    public void addElements(@RequestBody List<Sui05Element> sui05Elements) {
        sui05Service.addElements(sui05Elements);
    }

    @PostMapping("/delete")
    public void deleteElements(@RequestBody List<String> sui05Elements) {
        sui05Service.deleteElements(sui05Elements);
    }
}
