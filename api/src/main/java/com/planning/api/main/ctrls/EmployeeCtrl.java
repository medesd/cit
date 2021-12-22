package com.planning.api.main.ctrls;

import com.planning.api.main.models.Employee;
import com.planning.api.main.services.EmployeeService;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/employees")
@CrossOrigin("*")
public class EmployeeCtrl {
    private final EmployeeService employeeService;

    public EmployeeCtrl(EmployeeService employeeService) {
        this.employeeService = employeeService;
    }


    @PostMapping
    @PreAuthorize("hasRole('ADMIN')")
    public Map<String, Object> addEmployee(@RequestBody Employee employee) {
        return employeeService.addEmployee(employee);
    }


    @GetMapping(path = "/names")
    @PreAuthorize("hasRole('USER')")
    public List<Map<String, Object>> getEmployeesNames() {
        return employeeService.getEmployeesNames();
    }

    @GetMapping(path = "/all-names")
    @PreAuthorize("hasRole('ADMIN')")
    public List<Map<String, Object>> getAllEmployeesNames() {
        return employeeService.getAllEmployeesNames();
    }


    @PutMapping(path = "/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public Map<String, Object> editEmployee(@PathVariable("id") Long Eid, @RequestBody Employee employee) {
        return employeeService.editEmployee(Eid, employee);
    }


    @GetMapping
    @PreAuthorize("hasRole('ADMIN')")
    public List<Map<String, Object>> getAllEmployees(@RequestParam(value = "filter",required = false) String filter) {
        if (filter == null) filter = "";
        return employeeService.getAllEmployees(filter);
    }


    @DeleteMapping(path = "/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public Long deleteEmployee(@PathVariable("id") Long id) {
        return employeeService.deleteEmployee(id);
    }


    @GetMapping(path = "/elements/{id}")
    @PreAuthorize("hasRole('USER')")
    public List<Map<String,Object>> getElementsByEmployee(@PathVariable("id") Long Eid) {
        return employeeService.getElementsByEmployee();
    }



    @GetMapping(path = "/element-by-employee/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public List<Map<String,Object>> getElementsByAdmin(@PathVariable("id") Long Eid) {
        return employeeService.getElementsByAdmin(Eid);
    }





}
