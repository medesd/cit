package com.planning.api.main.services;

import com.planning.api.main.models.Rh03;
import com.planning.api.main.reps.Rh03Rep;
import com.planning.api.utils.Tools;
import org.springframework.stereotype.Service;

import java.util.Calendar;
import java.util.Comparator;
import java.util.Date;

@Service
public class Rh03Service {
    private final Rh03Rep rh03Rep;

    public Rh03Service(Rh03Rep rh03Rep) {
        this.rh03Rep = rh03Rep;
    }


    public String generateRef() {
        var c = Calendar.getInstance();

        c.setTime(new Date());
        var refs = rh03Rep.findAll();
        if (refs.isEmpty()) return "FP/001/" + c.get(Calendar.YEAR);

        var maxOpt = refs.stream()
                .filter(x -> Tools.compareYears(x.getEntryDate(), new Date()))
                .map(x -> Integer.parseInt(x.getRef().substring(x.getRef().indexOf("/") + 1, x.getRef().lastIndexOf("/"))))
                .max(Comparator.naturalOrder());
        if (maxOpt.isEmpty()) return "FP/001/" + c.get(Calendar.YEAR);

        var max = maxOpt.get() + 1;

        return Tools.CheckCount("FP", max);

    }

    public void save(Rh03 rh03) {
        System.out.println(rh03);
        rh03.setEntryDate(new Date());
        rh03Rep.save(rh03);
    }

}
