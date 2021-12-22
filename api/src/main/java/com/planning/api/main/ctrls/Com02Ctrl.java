package com.planning.api.main.ctrls;

import com.planning.api.main.models.Com02;
import com.planning.api.main.services.Com02Service;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping(path = "/api/com02")
@CrossOrigin("*")
public class Com02Ctrl {
    private final Com02Service com02Service;

    public Com02Ctrl(Com02Service com02Service) {
        this.com02Service = com02Service;
    }

    @PostMapping
    @PreAuthorize("hasRole('ADMIN')")
    public void save(@RequestBody Com02 com02) {
        com02Service.save(com02);
    }
}
