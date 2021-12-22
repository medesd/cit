package com.planning.api.main.services;

import com.planning.api.main.models.Inf02;
import com.planning.api.main.reps.Inf02Rep;
import com.planning.api.utils.Mapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Locale;
import java.util.Map;
import java.util.stream.Collectors;

@Service
public class Inf02Service {
    private final Inf02Rep inf02Rep;
    private final Mapper mapper;

    @Autowired
    public Inf02Service(Inf02Rep inf02Rep) {
        this.inf02Rep = inf02Rep;
        mapper = new Mapper();
    }

    public List<Map<String, Object>> findAll(String filter) {
        return mapper.convertListValue(inf02Rep.findAll().stream().filter(x -> x.toString().toLowerCase().contains(filter.toLowerCase())).collect(Collectors.toList()));
    }


    public Map<String, Object> save(Inf02 inf02) {
        return mapper.convertOneValue(inf02Rep.save(inf02));
    }

    public void delete(Long id) {
        inf02Rep.deleteById(id);
    }
}
