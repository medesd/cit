package com.planning.api.main.services;

import com.planning.api.main.models.Ach05;
import com.planning.api.main.reps.Ach05Rep;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.List;

@Service
public class Ach05Service {
    private final Ach05Rep ach05Rep;

    public Ach05Service(Ach05Rep ach05Rep) {
        this.ach05Rep = ach05Rep;
    }

    public void save(Ach05 ach05) {
        ach05.setEntryDate(new Date());
        ach05Rep.save(ach05);
    }

    public List<Ach05> findAll() {
        return ach05Rep.findAll();
    }
}
