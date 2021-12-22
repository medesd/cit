package com.planning.api.main.ctrls;

import com.planning.api.main.models.Inf02;
import com.planning.api.main.services.Inf02Service;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping(path = "/api/inf02")
@CrossOrigin("*")
public class Inf02Ctrl {
    private final Inf02Service inf02Service;

    @Autowired
    public Inf02Ctrl(Inf02Service inf02Service) {
        this.inf02Service = inf02Service;
    }

    @PostMapping
    @PreAuthorize("hasRole('USER')")
    public Map<String, Object> save(@RequestBody Inf02 inf02) {
        return inf02Service.save(inf02);
    }


    @GetMapping
    @PreAuthorize("hasRole('USER')")
    public List<Map<String, Object>> findAll(@RequestParam(value = "filter", required = false) String filter) {
        if (filter == null) filter = "";
        return inf02Service.findAll(filter);
    }

    @DeleteMapping(path = "/{id}")
    @PreAuthorize("hasRole('USER')")
    public void delete(@PathVariable("id") Long id) {
        inf02Service.delete(id);
    }


}
