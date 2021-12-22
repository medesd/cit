package com.planning.api.main.ctrls;

import com.planning.api.main.models.Conge;
import com.planning.api.main.services.CongeService;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping(path = "/api/conges")
@CrossOrigin("*")
public class CongeCtrl {
    private final CongeService congeService;

    public CongeCtrl(CongeService congeService) {
        this.congeService = congeService;
    }

    @PostMapping
    public Map<String, Object> addConge(@RequestBody Conge conge) {
        return congeService.addConge(conge);
    }

    @GetMapping(path = "/{year}")
    public List<Map<String, Object>> getCongesByYear(@PathVariable("year") int year) {
        return congeService.getCongesByYear(year);
    }

    @PatchMapping
    public void deleteData(@RequestBody List<Long> data) {
        congeService.deleteData(data);
    }
}
