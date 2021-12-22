package com.planning.api.main.services;

import com.planning.api.main.models.Com01;
import com.planning.api.main.reps.Com01Rep;
import com.planning.api.utils.Tools;
import org.springframework.stereotype.Service;

import java.util.Calendar;
import java.util.Comparator;
import java.util.Date;
import java.util.stream.Collectors;

@Service
public class Com01Service {
    private final Com01Rep com01Rep;

    public Com01Service(Com01Rep com01Rep) {
        this.com01Rep = com01Rep;
    }

    public String generateRef() {
        var c = Calendar.getInstance();

        c.setTime(new Date());
        var refs = com01Rep.findAll();
        if (refs.isEmpty()) return "CIT/001/" + c.get(Calendar.YEAR);
        var maxOpt = refs.stream()
                .filter(x -> Tools.compareYears(x.getEntryDate(), new Date()))
                .map(x -> Integer.parseInt(x.getRef().substring(x.getRef().indexOf("/") + 1, x.getRef().lastIndexOf("/"))))
                .max(Comparator.naturalOrder());
        if (maxOpt.isEmpty()) return "CIT/001/" + c.get(Calendar.YEAR);

        var max = maxOpt.get() + 1;

        return Tools.CheckCount("CIT", max);

    }

    public void saveCom01(Com01 com01) {
        com01.setEntryDate(new Date());
        com01Rep.save(com01);
    }
}
