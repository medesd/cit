package com.planning.api.main.services;

import com.planning.api.main.models.Ach04;
import com.planning.api.main.reps.Ach04Rep;
import jdk.dynalink.linker.LinkerServices;
import org.springframework.stereotype.Service;

import java.util.Calendar;
import java.util.Date;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class Ach04Service {
    private final Ach04Rep ach04Rep;

    public Ach04Service(Ach04Rep ach04Rep) {
        this.ach04Rep = ach04Rep;
    }

    public List<Ach04> findByYear(int year) {
        return ach04Rep.findAll().stream().filter(x -> {
            var c = Calendar.getInstance();
            c.setTime(x.getEntryDate());
            return year == c.get(Calendar.YEAR);
        }).collect(Collectors.toList());
    }

    public void save(Ach04 ach04) {
        ach04.setEntryDate(new Date());
        ach04Rep.save(ach04);
    }

    public void delete(long id) {
        ach04Rep.deleteById(id);
    }
}
