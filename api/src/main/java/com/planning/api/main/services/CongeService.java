package com.planning.api.main.services;

import com.planning.api.main.models.Conge;
import com.planning.api.main.reps.CongeRep;
import com.planning.api.main.reps.EmployeeRep;
import com.planning.api.utils.Mapper;
import org.springframework.stereotype.Service;

import java.util.*;
import java.util.stream.Collectors;

@Service
public class CongeService {
    private final CongeRep congeRep;
    private final EmployeeRep employeeRep;
    private final Mapper mapper;
    private final EmployeeService employeeService;

    public CongeService(CongeRep congeRep, EmployeeRep employeeRep, EmployeeService employeeService) {
        this.congeRep = congeRep;
        this.employeeRep = employeeRep;
        this.employeeService = employeeService;
        this.mapper = new Mapper();
    }


    public Map<String, Object> addConge(Conge conge) {
        var e = employeeRep.getById(conge.getEmployee().getId());
        conge.setEmployee(e);

        congeRep.save(conge);

        var emp = employeeService.getAllEmployeesNames().stream().filter(x -> (long) x.get("id") == e.getId()).findFirst();

        if (emp.isEmpty()) return null;
        Map<String, Object> map = mapper.convertOneValue(conge);
        map.replace("employee", emp.get());
        return map;
    }


    public List<Map<String, Object>> getCongesByYear(int year) {
        var employees = employeeService.getAllEmployeesNames();
        return employees.stream().peek(x -> {
            var c = Calendar.getInstance();
            c.set(Calendar.YEAR, year);
            var emp = mapper.convertListValue(employeeRep
                    .getById((long) x.get("id"))
                    .getConges()
                    .stream()
                    .filter(s -> {

                        var v1 = Calendar.getInstance();
                        var v2 = Calendar.getInstance();
                        v1.setTime(s.getFirstDate());
                        v2.setTime(s.getLastDate());
                        return v1.get(Calendar.YEAR) == c.get(Calendar.YEAR) || v2.get(Calendar.YEAR) == c.get(Calendar.YEAR);
                    })
                    .collect(Collectors.toList()));
            x.put("conges", emp.stream().peek(s -> s.remove("employee")).collect(Collectors.toList()));
        }).collect(Collectors.toList());
    }

    public void deleteData(List<Long> data) {
        Set<Long> news = new HashSet<>(data);
        congeRep.deleteAllById(news);
    }
}
