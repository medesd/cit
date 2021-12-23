package com.planning.api.main.ctrls;

import com.planning.api.main.models.Ach03;
import com.planning.api.main.services.Ach03Service;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping(path = "/api/ach03")
@CrossOrigin("*")
public class Ach03Ctrl {
    private final Ach03Service ach03Service;

    public Ach03Ctrl(Ach03Service ach03Service) {
        this.ach03Service = ach03Service;
    }

    @PostMapping
    public void save(@RequestBody Ach03 ach03) {
        ach03Service.save(ach03);
    }

    @GetMapping
    public List<Ach03> findAll() {
        return ach03Service.findAll();
    }

    @DeleteMapping(path = "/{id}")
    public void delete(@PathVariable("id") long id){
        ach03Service.delete(id);
    }
}
