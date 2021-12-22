package com.planning.api.main.services;

import com.planning.api.main.models.Ach01;
import com.planning.api.main.reps.Ach01Rep;
import com.planning.api.utils.Tools;
import org.springframework.stereotype.Service;

import java.util.Calendar;
import java.util.Comparator;
import java.util.Date;

@Service
public class Ach01Service {
    private final Ach01Rep ach01Rep;

    public Ach01Service(Ach01Rep ach01Rep) {
        this.ach01Rep = ach01Rep;
    }


    public String generateRef() {
        var c = Calendar.getInstance();
        c.setTime(new Date());
        var refs = ach01Rep.findAll();
        if (refs.isEmpty()) return "DA/001/" + c.get(Calendar.YEAR);
        var maxOpt = refs.stream()
                .filter(x -> Tools.compareYears(x.getEntryDate(), new Date()))
                .map(x -> Integer.parseInt(x.getRef().substring(x.getRef().indexOf("/") + 1, x.getRef().lastIndexOf("/"))))
                .max(Comparator.naturalOrder());
        if (maxOpt.isEmpty()) return "DA/001/" + c.get(Calendar.YEAR);

        var max = maxOpt.get() + 1;

        return Tools.CheckCount("DA", max);
    }

    public void saveAch01(Ach01 ach01) {
        ach01.setEntryDate(new Date());
        ach01Rep.save(ach01);
    }
}
