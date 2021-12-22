package com.planning.api.main.ctrls;

import com.planning.api.main.models.Tache;
import com.planning.api.main.services.TacheService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/taches")
@CrossOrigin("*")
public class TacheCtrl {
    private final TacheService tacheService;

    @Autowired
    public TacheCtrl(TacheService tacheService) {
        this.tacheService = tacheService;
    }


    @PreAuthorize("hasRole('USER')")
    @PostMapping
    public Map<String, Object> addTache(@RequestBody Tache tache) {
        return tacheService.addTache(tache);
    }


    @DeleteMapping(path = "/{id}")
    @PreAuthorize("hasRole('USER')")
    public Long deleteTache(@PathVariable("id") Long Tid) {
        return tacheService.deleteTache(Tid);
    }


    @PutMapping(path = "/{id}")
    @PreAuthorize("hasRole('USER')")
    public Map<String, Object> editTache(@PathVariable("id") Long Pid, @RequestBody Tache tache) {
        return tacheService.editTache(tache, Pid);
    }


    @GetMapping(path = "/names/{id}")
    @PreAuthorize("hasRole('USER')")
    public List<Map<String, Object>> getTachesNames(@PathVariable("id") Long id) {
        return tacheService.getTachesNames(id);
    }
}
