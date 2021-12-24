package com.planning.api.main.services;

import com.planning.api.main.models.RapportChantierDocuments;
import com.planning.api.main.reps.RapportChantierDocumentsRep;
import com.planning.api.utils.Tools;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.autoconfigure.amqp.RabbitAutoConfiguration;
import org.springframework.stereotype.Service;

import java.util.Calendar;
import java.util.Comparator;
import java.util.Date;
import java.util.List;

@Service
public class RapportChantierDocumentsService {
    private final RapportChantierDocumentsRep rapportChantierDocumentsRep;

    @Autowired
    public RapportChantierDocumentsService(RapportChantierDocumentsRep rapportChantierDocumentsRep) {
        this.rapportChantierDocumentsRep = rapportChantierDocumentsRep;
    }

    public String saveDocument(RapportChantierDocuments rap) {
        rap.setEntryDate(new Date());
        rapportChantierDocumentsRep.save(rap);
        return rap.getRef();
    }


    public String generateRef() {
        var refs = rapportChantierDocumentsRep.findAll();
        var c = Calendar.getInstance();
        c.setTime(new Date());
        if (refs.isEmpty()) return "PRO/001/" + c.get(Calendar.YEAR);
        var maxOpt = refs
                .stream()
                .filter(x -> Tools.compareYears(x.getEntryDate(), new Date()))
                .map(x -> {
                    var num = x.getRef().substring(x.getRef().indexOf("/") + 1, x.getRef().lastIndexOf("/"));
                    return Integer.parseInt(num);
                }).max(Comparator.naturalOrder());
        if (maxOpt.isEmpty()) return "PRO/001/" + c.get(Calendar.YEAR);
        var max = maxOpt.get() + 1;

        switch (String.valueOf(max).length()) {
            case 1:
                return "PRO/00" + max + "/" + c.get(Calendar.YEAR);
            case 2:
                return "PRO/0" + max + "/" + c.get(Calendar.YEAR);
            case 3:
                return "PRO/" + max + "/" + c.get(Calendar.YEAR);
            default:
                return "PRO/001/" + c.get(Calendar.YEAR);
        }
    }

    public List<RapportChantierDocuments> findAll() {
        return rapportChantierDocumentsRep.findAll();
    }
}
