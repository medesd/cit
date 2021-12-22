package com.planning.api.main.ctrls;

import com.planning.api.main.classes.ElementDTO;
import com.planning.api.main.models.Element;
import com.planning.api.main.services.ElementService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/elements")
@CrossOrigin("*")
public class ElementCtrl {
    private final ElementService elementService;

    @Autowired
    public ElementCtrl(ElementService elementService) {
        this.elementService = elementService;
    }


    @PreAuthorize("hasRole('USER')")
    @PostMapping
    public List<Map<String,Object>> addElement(@RequestBody List<Element> element) {
        return elementService.addElement(element);
    }


    @PatchMapping
    @PreAuthorize("hasRole('USER')")
    public void deleteElement(@RequestBody List<String> id) {
        elementService.deleteElement(id);
    }





}
