package com.planning.api.main.services;

import com.planning.api.main.models.Ach03;
import com.planning.api.main.reps.Ach03Rep;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.List;

@Service
public class Ach03Service {
    private final Ach03Rep ach03Rep;

    public Ach03Service(Ach03Rep ach03Rep) {
        this.ach03Rep = ach03Rep;
    }

    public void save(Ach03 ach03) {
        ach03.setEntryDate(new Date());
        ach03Rep.save(ach03);
    }

    public List<Ach03> findAll() {
        return ach03Rep.findAll();
    }

    public void delete(long id) {
        ach03Rep.deleteById(id);
    }
}
