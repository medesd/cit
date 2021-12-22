package com.planning.api.main.services;

import com.planning.api.main.models.Rh08;
import com.planning.api.main.reps.Rh08Rep;
import com.planning.api.utils.Tools;
import org.springframework.stereotype.Service;

import java.util.Calendar;
import java.util.Comparator;
import java.util.Date;

@Service
public class Rh08Service {
    private final Rh08Rep rh08Rep;

    public Rh08Service(Rh08Rep rh08Rep) {
        this.rh08Rep = rh08Rep;
    }


    public String generateRef() {
        var c = Calendar.getInstance();

        c.setTime(new Date());
        var refs = rh08Rep.findAll();
        if (refs.isEmpty()) return "DR/001/" + c.get(Calendar.YEAR);

        var maxOpt = refs.stream()
                .filter(x -> Tools.compareYears(x.getEntryDate(), new Date()))
                .map(x -> Integer.parseInt(x.getRef().substring(x.getRef().indexOf("/") + 1, x.getRef().lastIndexOf("/"))))
                .max(Comparator.naturalOrder());
        if (maxOpt.isEmpty()) return "DR/001/" + c.get(Calendar.YEAR);

        var max = maxOpt.get() + 1;

        return Tools.CheckCount("DR", max);

    }

    public void save(Rh08 rh08) {
        rh08.setEntryDate(new Date());
        rh08Rep.save(rh08);
    }

}
