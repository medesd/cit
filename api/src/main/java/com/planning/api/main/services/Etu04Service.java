package com.planning.api.main.services;

import com.planning.api.main.models.Etu04;
import com.planning.api.main.reps.Etu04Rep;
import com.planning.api.utils.Tools;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Calendar;
import java.util.Comparator;
import java.util.Date;

@Service
public class Etu04Service {
    private final Etu04Rep etu04Rep;

    @Autowired
    public Etu04Service(Etu04Rep etu04Rep) {
        this.etu04Rep = etu04Rep;
    }

    public String generateRef() {
        var c = Calendar.getInstance();
        c.setTime(new Date());
        var refs = etu04Rep.findAll();
        if (refs.isEmpty()) return "DES/001/" + c.get(Calendar.YEAR);

        var maxOpt = refs.stream()
                .filter(x -> Tools.compareYears(x.getEntryDate(), new Date()))
                .map(x -> Integer.parseInt(x.getRef().substring(x.getRef().indexOf("/") + 1, x.getRef().lastIndexOf("/"))))
                .max(Comparator.naturalOrder());

        if (maxOpt.isEmpty()) return "DES/001/" + c.get(Calendar.YEAR);

        var max = maxOpt.get() + 1;
        switch (String.valueOf(max).length()) {
            case 1:
                return "DES/00" + max + "/" + c.get(Calendar.YEAR);
            case 2:
                return "DES/0" + max + "/" + c.get(Calendar.YEAR);
            case 3:
                return "DES/" + max + "/" + c.get(Calendar.YEAR);
            default:
                return null;
        }
    }

    public void saveEtu04(Etu04 etu04) {
        etu04.setEntryDate(new Date());
        etu04Rep.save(etu04);
    }
}
