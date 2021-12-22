package com.planning.api.main.services;

import com.planning.api.main.models.Project;
import com.planning.api.main.models.Tache;
import com.planning.api.main.reps.ProjectRep;
import com.planning.api.main.reps.TacheRep;
import com.planning.api.utils.Mapper;
import com.planning.api.utils.Tools;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Service
public class TacheService {
    private final TacheRep tacheRep;
    private final Mapper mapper;
    private final ProjectRep projectRep;

    @Autowired
    public TacheService(TacheRep tacheRep, ProjectRep projectRep) {
        this.tacheRep = tacheRep;
        this.projectRep = projectRep;
        this.mapper = new Mapper();
    }

    public Map<String, Object> addTache(Tache tache) {
        tache.setElements(null);
        if (tache.getProject() == null) return null;
        Project project = this.projectRep.getById(tache.getProject().getId());
        tache.setProject(project);
        if (tache.getInex().equals("Externe")) {
            tache.setEnd(true);
        }else {
            tache.setElements(null);
            tache.setJreel("0");
            tache.setRealJreel(0);
        }

        return mapper.convertOneValue(tacheRep.save(tache));
    }


    public Long deleteTache(Long Tid) {
        if (!tacheRep.existsById(Tid)) return null;
        tacheRep.deleteById(Tid);
        return Tid;
    }

    public Map<String, Object> editTache(Tache tache, Long Tid) {
        if (!tacheRep.existsById(Tid)) return null;
        var ts = tacheRep.getById(Tid);


        if (!ts.getInex().equalsIgnoreCase("Externe")) {
            tache.setRealJreel(ts.getRealJreel());
            tache.setJreel(ts.getJreel());
            tache.setComplete(ts.getComplete());
        }
        tache.setProject(ts.getProject());
        tache.setElements(ts.getElements());
        tache.setCurrentKey(ts.getCurrentKey());
        tache.setId(Tid);
        tacheRep.save(tache);
        Tools.makeSomeLogic(tache, true, tacheRep);
        return mapper.convertOneValue(tache);
    }

    public List<Map<String, Object>> getTachesNames(Long Pid) {
        if (!projectRep.existsById(Pid)) return null;
        return projectRep
                .getById(Pid)
                .getTaches()
                .stream()
                .filter(x -> !x.isEnd() && !x.getInex().equalsIgnoreCase("Externe"))
                .map(f -> {
                    var tache = mapper.convertOneValue(f);
                    tache.replace("elements", f.getElements().size());
                    return tache;
                }).collect(Collectors.toList());
    }




}
