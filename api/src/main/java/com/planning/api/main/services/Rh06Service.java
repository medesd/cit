package com.planning.api.main.services;

import com.planning.api.main.models.Rh06;
import com.planning.api.main.reps.Rh06Rep;
import com.planning.api.utils.Mapper;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.List;
import java.util.Map;

@Service
public class Rh06Service {
    private final Rh06Rep rh06Rep;
    private final Mapper mapper;

    public Rh06Service(Rh06Rep rh06Rep) {
        this.mapper = new Mapper();
        this.rh06Rep = rh06Rep;
    }

    public void save(Rh06 rh06) {
        rh06.setEntryDate(new Date());
        rh06Rep.save(rh06);
    }

    public List<Map<String, Object>> findAll() {
        return mapper.convertListValue(rh06Rep.findAll());
    }
}
