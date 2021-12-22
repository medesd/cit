package com.planning.api.main.services;

import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.SerializationFeature;
import com.planning.api.main.models.Facture;
import com.planning.api.main.models.FactureDTO;
import com.planning.api.main.models.OrdreService;
import com.planning.api.main.reps.*;
import com.planning.api.security.dao.RoleRepo;
import com.planning.api.utils.Mapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.*;
import java.util.stream.Collectors;

@Service
public class FactureService {
    private final ProjectRep projectRep;
    private final Mapper mapper;


    private final FactureRep factureRep;


    @Autowired
    public FactureService(ProjectRep projectRep, FactureRep factureRep) {
        this.projectRep = projectRep;
        this.factureRep = factureRep;
        this.mapper = new Mapper();
    }


    public String generateFactureRef(Long pid) {

        var factureRefs = factureRep.findAll();
        var ref = "CIT";

        Calendar calendar = Calendar.getInstance();

        var year = calendar.get(Calendar.YEAR);

        var filteredFacturesByYears = factureRefs.stream().filter(x -> {
            Calendar filter = Calendar.getInstance();
            filter.setTime(x.getEntryDate());
            return filter.get(Calendar.YEAR) == year;
        }).collect(Collectors.toList());


        if (filteredFacturesByYears.isEmpty()) {
            ref += "001/" + year + "/";
        } else {

            int max = filteredFacturesByYears.stream().map(x -> Integer.parseInt(x.getFactureRef().substring(x.getFactureRef().indexOf("T") + 1, x.getFactureRef().indexOf("/")))).max(Comparator.naturalOrder()).get();
            max++;

            if (max < 10) {
                ref += "00" + max + "/" + year + "/";
            }
            if (max >= 10 && max < 100) {
                ref += "0" + max + "/" + year + "/";
            }
            if (max >= 100) {
                ref += max + "/" + year + "/";
            }
        }

        var filteredFacturesByProjects = factureRefs.stream().filter(x -> x.getProject() == projectRep.getById(pid)).collect(Collectors.toList());

        if (filteredFacturesByProjects.isEmpty()) {
            ref += "01";
        } else {

            int max = filteredFacturesByProjects.stream().map(x -> Integer.parseInt(x.getFactureRef().substring(x.getFactureRef().lastIndexOf('/') + 1))).max(Comparator.naturalOrder()).get();
            max++;

            if (max < 10) {
                ref += "0" + max;
            }
            if (max >= 10) {
                ref += "0" + max;
            }
        }
        return ref;

    }


    public Map<String, Object> addFacture(Facture facture) {
        var pid = projectRep.getById(facture.getProject().getId());

        facture.setProject(pid);
        if (pid.getNemMarche() == null) {
            facture.setNemMarche(pid.getRef());
        } else {
            facture.setNemMarche(pid.getNemMarche());

        }
        var c = Calendar.getInstance();
        facture.setEntryDate(c.getTime());
        facture.setClient(pid.getClient() != null ? pid.getClient() : pid.getMaitreDouvrage());
        facture.setProjectName(pid.getName());
        Facture f = factureRep.save(facture);
        return mapper.convertOneValue(f);

    }


    public List<Map<String, Object>> getAllFactures() {
        return mapper.convertListValue(factureRep.findAll());
    }


    public List<Map<String, Object>> getFacturesByYear(int year) {
        return mapper.convertListValue(factureRep.findAll().stream().filter(x -> {
            x.setData(null);
            var c = Calendar.getInstance();
            c.setTime(x.getEntryDate());
            return c.get(Calendar.YEAR) == year;
        }).collect(Collectors.toList()));
    }
}
