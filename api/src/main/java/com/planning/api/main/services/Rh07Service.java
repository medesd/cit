package com.planning.api.main.services;

import com.planning.api.main.models.Rh07;
import com.planning.api.main.reps.Rh07Rep;
import com.planning.api.utils.Tools;
import org.springframework.stereotype.Service;

import java.util.Calendar;
import java.util.Comparator;
import java.util.Date;

@Service
public class Rh07Service {
    private final Rh07Rep rh07Rep;

    public Rh07Service(Rh07Rep rh07Rep) {
        this.rh07Rep = rh07Rep;
    }


    public String generateRef() {
        var c = Calendar.getInstance();

        c.setTime(new Date());
        var refs = rh07Rep.findAll();
        if (refs.isEmpty()) return "DF/001/" + c.get(Calendar.YEAR);

        var maxOpt = refs.stream()
                .filter(x -> Tools.compareYears(x.getEntryDate(), new Date()))
                .map(x -> Integer.parseInt(x.getRef().substring(x.getRef().indexOf("/") + 1, x.getRef().lastIndexOf("/"))))
                .max(Comparator.naturalOrder());
        if (maxOpt.isEmpty()) return "DF/001/" + c.get(Calendar.YEAR);

        var max = maxOpt.get() + 1;

        return Tools.CheckCount("DF", max);

    }

    public void save(Rh07 rh07) {
        rh07.setEntryDate(new Date());
        rh07Rep.save(rh07);
    }

}
