package com.planning.api.main.services;

import com.planning.api.main.models.Gmq01;
import com.planning.api.main.reps.Gmq01Rep;
import com.planning.api.utils.Tools;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Calendar;
import java.util.Comparator;
import java.util.Date;

@Service
public class Gmq01Service {
    private final Gmq01Rep gmq01Rep;

    @Autowired
    public Gmq01Service(Gmq01Rep gmq01Rep) {
        this.gmq01Rep = gmq01Rep;
    }

    public String generateRef() {
        var c = Calendar.getInstance();

        c.setTime(new Date());
        var refs = gmq01Rep.findAll();
        if (refs.isEmpty()) return "FN/001/" + c.get(Calendar.YEAR);

        var maxOpt = refs.stream()
                .filter(x -> Tools.compareYears(x.getEntryDate(), new Date()))
                .map(x -> Integer.parseInt(x.getRef().substring(x.getRef().indexOf("/") + 1, x.getRef().lastIndexOf("/"))))
                .max(Comparator.naturalOrder());
        if (maxOpt.isEmpty()) return "FN/001/" + c.get(Calendar.YEAR);

        var max = maxOpt.get() + 1;

        return Tools.CheckCount("FN", max);

    }

    public void save(Gmq01 gmq01) {
        gmq01.setEntryDate(new Date());
        gmq01Rep.save(gmq01);
    }

}
