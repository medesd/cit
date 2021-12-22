package com.planning.api.main.ctrls;

import com.planning.api.main.models.RapportChantierDocuments;
import com.planning.api.main.services.RapportChantierDocumentsService;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping(path = "/api/rap-chantier-documents")
@CrossOrigin("*")
public class RapportChantierDocumentsCtrl {
    private final RapportChantierDocumentsService rapportChantierDocumentsService;

    public RapportChantierDocumentsCtrl(RapportChantierDocumentsService rapportChantierDocumentsService) {
        this.rapportChantierDocumentsService = rapportChantierDocumentsService;
    }

    @PostMapping
    public String saveDocument(@RequestBody RapportChantierDocuments rap) {
        return rapportChantierDocumentsService.saveDocument(rap);
    }

    @GetMapping("/generate")
    public String generateRef() {
        return rapportChantierDocumentsService.generateRef();
    }
}
