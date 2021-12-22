package com.planning.api.main.services;

import com.planning.api.main.models.OrdreService;
import com.planning.api.main.reps.OrdreServiceRep;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Calendar;
import java.util.Comparator;
import java.util.Date;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class OrdreServiceService {
    private final OrdreServiceRep ordreServiceRep;

    @Autowired
    public OrdreServiceService(OrdreServiceRep ordreServiceRep) {
        this.ordreServiceRep = ordreServiceRep;
    }



    public String generateOrdreServiceRef(String type) {
        var c = Calendar.getInstance();
        c.setTime(new Date());

        var services = ordreServiceRep.findAll().stream().filter(x -> x.getType().equals(type)).collect(Collectors.toList());
        if (services.isEmpty()) return "OS01/" + c.get(Calendar.YEAR);

        var ref = "OS";

        var max = services
                .stream()
                .filter(x -> new Date().getYear() == x.getEntryDate().getYear())
                .map(x -> Integer.parseInt(x.getRef().substring(x.getRef().indexOf('S') + 1, x.getRef().indexOf('/'))))
                .max(Comparator.naturalOrder());
        if (max.isEmpty()) return ref + ("01/" + c.get(Calendar.YEAR));

        if (max.get() < 10) ref += "0" + (max.get() + 1);
        else ref += (max.get() + 1);


        ref += "/" + c.get(Calendar.YEAR);

        return ref;
    }


    public List<OrdreService> addOrdreService(List<OrdreService> ordreServices) {
        ordreServiceRep.saveAll(ordreServices.stream().peek(x -> x.setEntryDate(new Date())).collect(Collectors.toList()));
        return ordreServices;
    }

    public List<OrdreService> getAllOrdreService(String type) {
        return ordreServiceRep.findAllByType(type);
    }
}
