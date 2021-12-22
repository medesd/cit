package com.planning.api.main.ctrls;

import com.planning.api.main.models.OrdreService;
import com.planning.api.main.services.OrdreServiceService;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/ordre-services")
@CrossOrigin("*")
public class OrdreServiceCtrl {

    private final OrdreServiceService ordreServiceService;

    public OrdreServiceCtrl(OrdreServiceService ordreServiceService) {
        this.ordreServiceService = ordreServiceService;
    }


    @GetMapping(path = "/ref/{type}")
    @PreAuthorize("hasRole('ADMIN')")
    public String generateOrdreServiceRef(@PathVariable("type") String type) {
        return ordreServiceService.generateOrdreServiceRef(type);
    }


    @PostMapping
    @PreAuthorize("hasRole('ADMIN')")
    public List<OrdreService> addOrdreService(@RequestBody List<OrdreService> ordreServices) {
        return ordreServiceService.addOrdreService(ordreServices);
    }

    @GetMapping("/{type}")
    @PreAuthorize("hasRole('ADMIN')")
    public List<OrdreService> getAllOrdreService(@PathVariable("type") String type) {
        return ordreServiceService.getAllOrdreService(type);
    }

}
