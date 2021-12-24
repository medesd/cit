package com.planning.api.main.services;

import com.planning.api.main.models.Gmq07;
import com.planning.api.main.reps.Gmq07Rep;
import org.springframework.stereotype.Service;

import java.util.Calendar;
import java.util.Date;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class Gmq07Service {
    private final Gmq07Rep gmq07Rep;

    public Gmq07Service(Gmq07Rep gmq07Rep) {
        this.gmq07Rep = gmq07Rep;
    }

    public void save(Gmq07 gmq07) {
        gmq07.setEntryDate(new Date());
        gmq07Rep.save(gmq07);
    }

    public List<Gmq07> findAllByYear(int year) {
        return gmq07Rep.findAll().stream().filter(x -> {
            var c = Calendar.getInstance();
            c.setTime(x.getEntryDate());
            return c.get(Calendar.YEAR) == year;
        }).collect(Collectors.toList());
    }
}
