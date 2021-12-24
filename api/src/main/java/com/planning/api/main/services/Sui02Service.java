package com.planning.api.main.services;

import com.planning.api.main.models.Sui02;
import com.planning.api.main.reps.ProjectRep;
import com.planning.api.main.reps.Sui02Rep;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class Sui02Service {
    private final Sui02Rep sui02Rep;
    private final ProjectRep projectRep;

    public Sui02Service(Sui02Rep sui02Rep, ProjectRep projectRep) {
        this.sui02Rep = sui02Rep;
        this.projectRep = projectRep;
    }

    public void save(Sui02 sui02) {
        var p = projectRep.findByRef(sui02.getProject().getRef());
        if (p.isEmpty()) return;
        sui02.setEntryDate(new Date());
        sui02.setProject(p.get());
        sui02Rep.save(sui02);
    }

    public List<Sui02> findAll(String filter) {
        return sui02Rep.findAll().stream().filter(x -> x.toString().toLowerCase().contains(filter.toLowerCase())).collect(Collectors.toList());
    }
}
