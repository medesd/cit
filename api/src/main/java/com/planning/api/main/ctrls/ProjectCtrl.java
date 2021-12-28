package com.planning.api.main.ctrls;

import com.planning.api.main.models.Project;
import com.planning.api.main.services.ProjectService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.time.Instant;
import java.util.*;

@RequestMapping("/api/projects")
@RestController
@CrossOrigin("*")
public class ProjectCtrl {
    private final ProjectService projectService;

    @Autowired
    public ProjectCtrl(ProjectService projectService) {
        this.projectService = projectService;
    }


    @PreAuthorize("hasRole('ADMIN')")
    @PostMapping
    public Map<String, Object> addProject(@RequestBody Project project, @RequestParam(value = "intervention", required = false) String int1) {
        return projectService.addProject(project, int1);
    }

    @GetMapping
    @PreAuthorize("hasRole('USER')")
    public List<Map<String, Object>> getAllProjects(@RequestParam(name = "filter", required = false) String filter, @RequestParam(name = "main", required = false) boolean main) {
        if (filter == null) filter = "";
        return projectService.getAllProjects(filter, main);
    }

    @GetMapping(path = "/{id}")
    @PreAuthorize("hasRole('USER')")
    public Map<String, Object> getProject(@PathVariable("id") Long id) {
        return projectService.getProject(id);
    }

    @PutMapping(path = "/{id}")
    @PreAuthorize("hasRole('USER')")
    public Map<String, Object> editProject(@PathVariable("id") Long Pid, @RequestBody Project project) {
        return projectService.editProject(project, Pid);
    }


    @DeleteMapping(path = "/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public void deleteProject(@PathVariable("id") Long id) {
        projectService.deleteProject(id);
    }


    @GetMapping(path = "/ref/{id}")
    @PreAuthorize("hasRole('USER')")
    public Map<String, Object> getProjectByRef(@PathVariable("id") String ref) {
        return projectService.getProjectByRef(ref.replaceAll("-", "/"));
    }


    @PostMapping("/set-date")
    @PreAuthorize("hasRole('USER')")
    public Map<String, Object> setDateDebut(@RequestBody Map<String, Object> data) {
        Instant date = Instant.parse((String) data.get("date"));
        return projectService.setDateDebut(Date.from(date), Long.valueOf(data.get("pid").toString()));
    }


    @GetMapping(path = "/sommaire-projects")
    @PreAuthorize("hasRole('ADMIN')")
    public List<List<String>> getProjectsSomme(@RequestParam("dd") Long dd, @RequestParam("df") Long df) {
        if (dd >= df) return null;
        var date1 = new Date(dd);
        var date2 = new Date(df);
        return projectService.getAllProjectsSomme(date1, date2);
    }

    @GetMapping(path = "/sommaire-chantiers")
    @PreAuthorize("hasRole('ADMIN')")
    public List<List<String>> getAllChantiersSomme(@RequestParam("dd") Long dd, @RequestParam("df") Long df) {
        if (dd >= df) return null;
        var date1 = new Date(dd);
        var date2 = new Date(df);
        return projectService.getAllChantiersSomme(date1, date2);
    }


    @GetMapping(path = "/names")
    @PreAuthorize("hasRole('USER')")
    public List<Map<String, Object>> getProjectsNames() {
        return projectService.getProjectsNames();
    }


    @GetMapping(path = "/taches/{id}")
    @PreAuthorize("hasRole('USER')")
    public List<Map<String, Object>> getTachesByProjectAndLot(@PathVariable("id") Long id, @RequestParam(value = "lot", required = false) String lot) {
        return projectService.getProjectTachesAntLot(id, lot);
    }


    @GetMapping(path = "/lot/{id}")
    @PreAuthorize("hasRole('USER')")
    public HashMap<String, List<Map<String, Object>>> getAllTacheByLot(@PathVariable("id") Long id) {
        return projectService.getAllTacheByLot(id);
    }

    @GetMapping(path = "/planning-general")
    public List<HashMap<Object, Object>> getPlanning(@RequestParam(name = "resp", required = false) String resp, @RequestParam(name = "filter", required = false) String filter, @RequestParam(name = "type", required = false) String type) {
        return projectService.getPlanningGeneral(resp, filter, type);
    }


    @GetMapping(path = "/change-date/{id}")
    @PreAuthorize("hasRole('USER')")
    public Long changeDateByLot(@PathVariable("id") Long Pid, @RequestParam("date") String date, @RequestParam("lot") String lot) {
        return projectService.changeDateByLot(Pid, date, lot);
    }


    @GetMapping(path = "/employee/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public List<String> getEmployeeByProject(@PathVariable("id") Long pid) {
        return projectService.getEmployeeByProject(pid);
    }


    @GetMapping("/intervention/{pid}")
    @PreAuthorize("hasRole('ADMIN')")
    public Map<String, Object> getInterventionByProject(@PathVariable("pid") Long pid) {
        return projectService.getInterventionByProject(pid);
    }


}
