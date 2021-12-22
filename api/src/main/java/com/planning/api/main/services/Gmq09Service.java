package com.planning.api.main.services;

import com.planning.api.main.models.Gmq09;
import com.planning.api.main.reps.Gmq09Rep;
import com.planning.api.utils.Tools;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Calendar;
import java.util.Comparator;
import java.util.Date;

@Service
public class Gmq09Service {
    private final Gmq09Rep gmq09Rep;

    @Autowired
    public Gmq09Service(Gmq09Rep gmq09Rep) {
        this.gmq09Rep = gmq09Rep;
    }

    public String generateRef() {
        var c = Calendar.getInstance();

        c.setTime(new Date());
        var refs = gmq09Rep.findAll();
        if (refs.isEmpty()) return "PV/001/" + c.get(Calendar.YEAR);

        var maxOpt = refs.stream()
                .filter(x -> Tools.compareYears(x.getEntryDate(), new Date()))
                .map(x -> Integer.parseInt(x.getRef().substring(x.getRef().indexOf("/") + 1, x.getRef().lastIndexOf("/"))))
                .max(Comparator.naturalOrder());
        if (maxOpt.isEmpty()) return "PV/001/" + c.get(Calendar.YEAR);

        var max = maxOpt.get() + 1;

        return Tools.CheckCount("PV", max);

    }

    public void save(Gmq09 gmq09) {
        gmq09.setEntryDate(new Date());
        gmq09Rep.save(gmq09);
    }

}
