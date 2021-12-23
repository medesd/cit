package com.planning.api.main.services;

import com.planning.api.main.models.Sui05;
import com.planning.api.main.models.Sui05Element;
import com.planning.api.main.reps.EmployeeRep;
import com.planning.api.main.reps.ProjectRep;
import com.planning.api.main.reps.Sui05ElementRep;
import com.planning.api.main.reps.Sui05Rep;
import com.planning.api.utils.Mapper;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Service
public class Sui05Service {
    private final Sui05Rep sui05Rep;
    private final ProjectRep projectRep;
    private final Sui05ElementRep sui05ElementRep;
    private final Mapper mapper;
    private final EmployeeRep employeeRep;
    private final EmployeeService employeeService;

    public Sui05Service(Sui05Rep sui05Rep, ProjectRep projectRep, Sui05ElementRep sui05ElementRep, EmployeeRep employeeRep, EmployeeService employeeService) {
        this.sui05Rep = sui05Rep;
        this.projectRep = projectRep;
        this.sui05ElementRep = sui05ElementRep;
        this.employeeRep = employeeRep;
        this.employeeService = employeeService;
        mapper = new Mapper();
    }

    public void save(Sui05 sui05) {
        var p = projectRep.getById(sui05.getProject().getId());
        var e = employeeRep.getById(sui05.getEmployee().getId());
        sui05.setEntryDate(new Date());
        sui05.setProject(p);
        sui05.setEmployee(e);
        sui05Rep.save(sui05);
    }


    public List<Map<String, Object>> findAll() {
        var list = sui05Rep.findAll();
        return list.stream().map(x -> {
            x.setSui05Elements(sui05Rep.getById(x.getId()).getSui05Elements());
            var emp = employeeService.getEmployeesNames().stream().filter(s -> (long) s.get("id") == x.getEmployee().getId()).findFirst();
            var mp = mapper.convertOneValue(x);
            mp.replace("employee", emp.orElse(null));
            mp.put("sui05Elements", x.getSui05Elements());
            return mp;
        }).collect(Collectors.toList());
    }


    public void addElements(List<Sui05Element> element) {
        var s = sui05Rep.getById(element.get(0).getSui05().getId());
        sui05ElementRep.saveAll(element.stream().peek(x -> {
            x.setEndDate(new Date());
            x.setSui05(s);
        }).collect(Collectors.toList()));
    }

    public void deleteElements(List<Sui05Element> element) {
        var list = sui05ElementRep.findAll().stream().filter(x -> element.stream().map(Sui05Element::getIdentifier).collect(Collectors.toList()).contains(x.getIdentifier())).collect(Collectors.toList());
        sui05ElementRep.deleteAll(list);
    }
}
