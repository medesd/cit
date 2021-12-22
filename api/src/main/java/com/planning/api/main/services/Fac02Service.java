package com.planning.api.main.services;

import com.planning.api.main.models.Fac02;
import com.planning.api.main.reps.Fac02Rep;
import com.planning.api.main.reps.FactureRep;
import org.springframework.stereotype.Service;

import java.util.Calendar;
import java.util.Date;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class Fac02Service {
    private final Fac02Rep fac02Rep;
    private final FactureRep factureRep;

    public Fac02Service(Fac02Rep fac02Rep, FactureRep factureRep) {
        this.fac02Rep = fac02Rep;
        this.factureRep = factureRep;
    }

    public List<Fac02> findByYear(int year) {
        return fac02Rep.findAll().stream().filter(x -> {
            var c = Calendar.getInstance();
            c.setTime(x.getFacture().getEntryDate());
            return c.get(Calendar.YEAR) == year;
        }).collect(Collectors.toList());
    }

    public void save(Fac02 fac02) {
        var f = factureRep.getById(fac02.getFacture().getId());
        fac02.setFacture(f);
        fac02.setEntryDate(new Date());
        fac02Rep.save(fac02);
    }


    public Long edit(Fac02 fac02) {
        var fac = fac02Rep.getById(fac02.getId());
        fac.setBanqueCredit(fac02.getBanqueCredit());
        fac.setBanqueDebit(fac02.getBanqueDebit());
        fac.setBanqueLibelle(fac02.getBanqueLibelle());
        fac.setBanqueDate(fac02.getBanqueDate());
        fac.setComCredit(fac02.getComCredit());
        fac02Rep.save(fac);
        return fac.getId();
    }
}
