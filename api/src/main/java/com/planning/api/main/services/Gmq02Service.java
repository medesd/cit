package com.planning.api.main.services;

import com.planning.api.main.models.Gmq02;
import com.planning.api.main.reps.Gmq02Rep;
import com.planning.api.utils.Tools;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Calendar;
import java.util.Comparator;
import java.util.Date;

@Service
public class Gmq02Service {
    private final Gmq02Rep gmq02Rep;

    @Autowired
    public Gmq02Service(Gmq02Rep gmq02Rep) {
        this.gmq02Rep = gmq02Rep;
    }

    public String generateRef() {
        var c = Calendar.getInstance();

        c.setTime(new Date());
        var refs = gmq02Rep.findAll();
        if (refs.isEmpty()) return "BD/001/" + c.get(Calendar.YEAR);

        var maxOpt = refs.stream()
                .filter(x -> Tools.compareYears(x.getEntryDate(), new Date()))
                .map(x -> Integer.parseInt(x.getRef().substring(x.getRef().indexOf("/") + 1, x.getRef().lastIndexOf("/"))))
                .max(Comparator.naturalOrder());
        if (maxOpt.isEmpty()) return "BD/001/" + c.get(Calendar.YEAR);

        var max = maxOpt.get() + 1;

        return Tools.CheckCount("BD", max);

    }

    public void save(Gmq02 gmq02) {
        gmq02.setEntryDate(new Date());
        gmq02Rep.save(gmq02);
    }

}
