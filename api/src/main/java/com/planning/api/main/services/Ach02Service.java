package com.planning.api.main.services;

import com.planning.api.main.models.Ach02;
import com.planning.api.main.reps.Ach02Rep;
import com.planning.api.utils.Tools;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Calendar;
import java.util.Comparator;
import java.util.Date;

@Service
public class Ach02Service {
    private final Ach02Rep ach02Rep;

    @Autowired
    public Ach02Service(Ach02Rep ach02Rep) {
        this.ach02Rep = ach02Rep;
    }

    public String generateRef() {
        var c = Calendar.getInstance();

        c.setTime(new Date());
        var refs = ach02Rep.findAll();
        if (refs.isEmpty()) return "BC/001/" + c.get(Calendar.YEAR);

        var maxOpt = refs.stream()
                .filter(x -> Tools.compareYears(x.getEntryDate(), new Date()))
                .map(x -> Integer.parseInt(x.getRef().substring(x.getRef().indexOf("/") + 1, x.getRef().lastIndexOf("/"))))
                .max(Comparator.naturalOrder());
        if (maxOpt.isEmpty()) return "BC/001/" + c.get(Calendar.YEAR);

        var max = maxOpt.get() + 1;

        return Tools.CheckCount("BC", max);

    }

    public void save(Ach02 ach02) {
        ach02.setEntryDate(new Date());
        ach02Rep.save(ach02);
    }

}
