package com.planning.api.main.services;

import com.planning.api.main.models.*;
import com.planning.api.main.reps.*;
import com.planning.api.utils.Mapper;
import lombok.SneakyThrows;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.text.SimpleDateFormat;
import java.util.*;
import java.util.concurrent.TimeUnit;
import java.util.concurrent.atomic.AtomicInteger;
import java.util.stream.Collectors;

import static com.planning.api.utils.Tools.*;

@Service
public class ProjectService {
    private final ProjectRep projectRep;
    private final InterventionRep interventionRep;
    private final Mapper mapper;
    private final ElementsRep elementsRep;
    private final EmployeeRep employeeRep;
    private final TacheRep tacheRep;

    @Autowired
    public ProjectService(ProjectRep projectRep, InterventionRep interventionRep, ElementsRep elementsRep, EmployeeRep employeeRep, TacheRep tacheRep) {
        this.projectRep = projectRep;
        this.interventionRep = interventionRep;
        this.elementsRep = elementsRep;
        this.employeeRep = employeeRep;
        this.tacheRep = tacheRep;
        this.mapper = new Mapper();
    }


    public Map<String, Object> addProject(Project project, String int1) {
        if (projectRep.findByRef(project.getRef()).isPresent()) return null;

        var c = Calendar.getInstance();
        c.setTime(project.getDateNotif());
        var intervention = new Intervention();
        intervention.setEntryDate(new Date());

        var inv = interventionRep
                .findAll()
                .stream()
                .filter(f -> compareYears(f.getEntryDate(), new Date()))
                .map(Intervention::getRef)
                .collect(Collectors.toList());

        if (int1 != null) intervention.setRef(int1);
        else if (inv.isEmpty()) intervention.setRef("FI/001/" + c.get(Calendar.YEAR));
        else {
            String ref = "FI/";
            int max = inv
                    .stream()
                    .map(f -> Integer.parseInt(f.substring(f.indexOf('/') + 1, f.lastIndexOf('/'))))
                    .max(Comparator.naturalOrder())
                    .get();

            switch (Integer.toString(max).length()) {
                case 1:
                    ref += "00" + (max + 1);
                    break;
                case 2:
                    ref += "0" + (max + 1);
                    break;
                case 3:
                    ref += (max + 1);
                    break;
            }
            ref += "/" + c.get(Calendar.YEAR);

            intervention.setRef(ref);
        }
        project.setIntervention(intervention);


        projectRep.save(project);
        intervention.setProject(project);
        interventionRep.save(intervention);
        Map<String, Object> map = mapper.convertOneValue(project);
        map.put("intervention", intervention);
        return map;
    }


    public List<Map<String, Object>> getAllProjects(String filter, boolean main) {

        var projects = projectRep.findAll();
        var employees = employeeRep.findAll();
        if (projects.isEmpty()) return null;

        return projects
                .stream()
                .map(x -> {
                    Map<String, Object> map = mapper.convertOneValue(x);
                    Map<String, Object> inter = mapper.convertOneValue(x.getIntervention());
                    map.put("intervention", inter);
                    if (main) {


                        Optional<Employee> piloteStructure = employees.stream().filter(f -> f.getUsername().equals(map.get("piloteStructure"))).findFirst();
                        Optional<Employee> piloteVRD = employees.stream().filter(f -> f.getUsername().equals(map.get("piloteVRD"))).findFirst();
                        Optional<Employee> piloteTechnique = employees.stream().filter(f -> f.getUsername().equals(map.get("piloteTechnique"))).findFirst();
                        Optional<Employee> piloteMetreur = employees.stream().filter(f -> f.getUsername().equals(map.get("piloteMetreur"))).findFirst();


                        map.replace("piloteStructure", piloteStructure.isEmpty() ? null : piloteStructure.get().getFirstName().charAt(0) + "." + piloteStructure.get().getLastName());
                        map.replace("piloteVRD", piloteVRD.isEmpty() ? null : piloteVRD.get().getFirstName().charAt(0) + "." + piloteVRD.get().getLastName());
                        map.replace("piloteTechnique", piloteTechnique.isEmpty() ? null : piloteTechnique.get().getFirstName().charAt(0) + "." + piloteTechnique.get().getLastName());
                        map.replace("piloteMetreur", piloteMetreur.isEmpty() ? null : piloteMetreur.get().getFirstName().charAt(0) + "." + piloteMetreur.get().getLastName());
                    }
                    return map;
                })
                .filter(x -> x.toString().toLowerCase().contains(filter.toLowerCase()))
                .sorted(Comparator.comparing(e -> (new Date((long) e.get("dateNotif")))))
                .collect(Collectors.toList());
    }


    public Map<String, Object> getProject(Long Pid) {
        if (!projectRep.existsById(Pid)) return null;
        Project p = projectRep.getById(Pid);
        Map<String, Object> map = mapper.convertOneValue(p);
        map.put("intervention", mapper.convertOneValue(p.getIntervention()));
        return map;
    }

    public Map<String, Object> editProject(Project project, Long id) {
        var p = projectRep.findById(id);

        var allProjects = projectRep.findAll().stream().filter(x -> x.getId() != id).collect(Collectors.toList());

        if (p.isEmpty()) return null;
        var projectOld = p.get();

        if (!allProjects
                .stream()
                .map(Project::getName)
                .collect(Collectors.toList())
                .contains(project.getName())) {
            if (!allProjects
                    .stream()
                    .map(Project::getRef)
                    .collect(Collectors.toList())
                    .contains(project.getRef())) {
                project.setId(id);
                project.setTaches(projectOld.getTaches());
                var elem = elementsRep
                        .getElementsByValue(projectOld.getName())
                        .stream()
                        .peek(f -> f.setValue(project.getName()))
                        .collect(Collectors.toList());


                elementsRep.saveAll(elem);
                var elms = elementsRep.getElementsByProjectName(projectOld.getName()).stream().peek(f -> f.setProjectName(project.getName())).collect(Collectors.toList());
                elementsRep.saveAll(elms);

                project.setId(id);
                this.projectRep.save(project);
                return mapper.convertOneValue(project);
            } else return null;
        } else return null;


    }

    public void deleteProject(Long Pid) {
        if (!projectRep.existsById(Pid)) return;
        projectRep.deleteById(Pid);
    }

    public Map<String, Object> getProjectByRef(String ref) {
        var p = projectRep.findByRef(ref);
        if (p.isEmpty()) return null;
        Map<String, Object> map = mapper.convertOneValue(p.get());
        map.put("intervention", p.get().getIntervention());
        return map;
    }

    @SneakyThrows
    public Map<String, Object> setDateDebut(String date, Long Pid) {
        var p = projectRep.getById(Pid);
        var ini = p.getDateDebut();
        var now = new SimpleDateFormat("yyyy-MM-dd").parse(date);
        if (ini == null) ini = now;


        long diffInMillis = now.getTime() - ini.getTime();
        long diff = TimeUnit.DAYS.convert(diffInMillis, TimeUnit.MILLISECONDS);
        var taches = p.getTaches().stream().peek(x -> {
            Calendar c1 = Calendar.getInstance();
            Calendar c2 = Calendar.getInstance();

            c1.setTimeInMillis(x.getJestStart());
            c2.setTimeInMillis(x.getJreelStart());

            c1.add(Calendar.DATE, (int) diff);
            c2.add(Calendar.DATE, (int) diff);

            x.setJestStart(c1.getTimeInMillis());
            x.setJreelStart(c2.getTimeInMillis());

        }).collect(Collectors.toList());
        p.setDateDebut(now);
        p.setTaches(taches);


        return mapper.convertOneValue(projectRep.save(p));
    }


    @SneakyThrows
    public List<List<String>> getAllProjectsSomme(Date dd, Date df) {

        var elementFiltered = elementsRep.findAll().stream().filter(f -> makeElement(dd, df, f)).collect(Collectors.toList());

        List<List<String>> pmNames = new ArrayList<>();
        List<String> col1 = new ArrayList<>();
        col1.add("project");

        var empFiltered = employeeRep.findAll().stream().filter(x -> !x.getPosts().contains("Chauffeur/Coursier")).peek(f -> f.setElements(f.getElements().stream().filter(s -> makeElement(dd, df, s)).collect(Collectors.toList()))).collect(Collectors.toList());
        empFiltered = empFiltered.stream().filter(f -> f.getRoles().stream().noneMatch(s -> s.getId() == 2)).collect(Collectors.toList());


        col1.addAll(empFiltered.stream().map(Employee::getUsername).collect(Collectors.toList()));
        col1.add("Total");
        pmNames.add(col1);
        var prgNames = projectRep.findAll().stream().map(Project::getName).collect(Collectors.toList());

        prgNames = prgNames.stream().filter(f -> elementFiltered.stream().map(Element::getProjectName).collect(Collectors.toList()).contains(f)).collect(Collectors.toList());

        List<Employee> finalEmpFiltered = empFiltered;
        prgNames.forEach(f -> {
            List<String> cols = new ArrayList<>();
            cols.add(f);
            AtomicInteger length = new AtomicInteger();
            finalEmpFiltered.forEach(k -> {

                var fs = k.getElements().stream().filter(s -> s.getProjectName().equals(f)).count();
                length.addAndGet((int) fs);
                cols.add(String.valueOf((int) fs));
            });
            cols.add(String.valueOf(length.get()));
            pmNames.add(cols);
        });

        List<String> fil = new ArrayList<>();
        fil.add("Total");
        empFiltered.forEach(f -> fil.add(String.valueOf(f.getElements().size())));
        pmNames.add(fil);
        return pmNames;
    }

    @SneakyThrows
    public List<List<String>> getAllChantiersSomme(Date dd, Date df) {

        var elementFiltered = elementsRep
                .findAll()
                .stream()
                .filter(x -> x.getBgcolor() != null && x.getBgcolor().equalsIgnoreCase("#eca52b"))
                .filter(f -> forChantier(dd, df, f))
                .collect(Collectors.toList());


        List<List<String>> pmNames = new ArrayList<>();
        List<String> col1 = new ArrayList<>();
        col1.add("Visite Chantier");


        var empFiltered = employeeRep
                .findAll()
                .stream()
                .filter(x -> !x.getPosts().contains("Chauffeur/Coursier"))
                .peek(f -> f
                        .setElements(f
                                .getElements()
                                .stream()
                                .filter(x -> x.getBgcolor() != null && x.getBgcolor().equalsIgnoreCase("#eca52b"))
                                .filter(x -> forChantier(dd, df, x))
                                .collect(Collectors.toList())))
                .filter(f -> f
                        .getRoles()
                        .stream()
                        .noneMatch(s -> s.getId() == 2))
                .collect(Collectors.toList());


        col1.addAll(empFiltered
                .stream()
                .filter(x -> !x.getPosts().contains("Chauffeur/Coursier"))
                .map(Employee::getUsername)
                .collect(Collectors.toList()));

        col1.add("Total");

        pmNames.add(col1);


        var prgNames = projectRep
                .findAll()
                .stream()
                .map(Project::getName)
                .filter(f -> elementFiltered
                        .stream()
                        .map(Element::getValue)
                        .collect(Collectors.toList())
                        .contains(f))
                .collect(Collectors.toList());


        prgNames.forEach(f -> {
            List<String> cols = new ArrayList<>();
            cols.add(f);
            AtomicInteger length = new AtomicInteger();
            empFiltered.forEach(k -> {

                var fs = k
                        .getElements()
                        .stream()
                        .filter(s -> s
                                .getValue()
                                .equals(f))
                        .count();

                length.addAndGet((int) fs);
                cols.add(String.valueOf((int) fs));
            });
            cols.add(String.valueOf(length.get()));
            pmNames.add(cols);
        });

        List<String> fil = new ArrayList<>();
        fil.add("Total");
        empFiltered.forEach(f -> fil.add(String.valueOf(f.getElements().size())));
        pmNames.add(fil);

        return pmNames;

    }


    public List<Map<String, Object>> getProjectsNames() {
        var projects = projectRep.findAll();
        if (projects.isEmpty()) return null;

        return projects.stream().map(x -> {
            Map<String, Object> map = new HashMap<>();
            map.put("id", x.getId());
            map.put("name", x.getName());
            map.put("ref", x.getRef());
            return map;
        }).collect(Collectors.toList());
    }

    public List<Map<String, Object>> getProjectTachesAntLot(Long Pid, String lot) {
        return projectRep.getById(Pid).getTaches().stream().map(f -> {
            var map = mapper.convertOneValue(f);
            map.put("elements", f.getElements().size());
            return map;
        }).filter(f -> lot == null || f.get("lot").equals(lot)).collect(Collectors.toList());
    }


    public HashMap<String, List<Map<String, Object>>> getAllTacheByLot(Long Pid) {
        if (!projectRep.existsById(Pid)) return null;
        var hash = new HashMap<String, List<Map<String, Object>>>();

        var lots = List.of("VRD", "Metreur", "Technique", "Structure");

        var t = projectRep.getById(Pid).getTaches();

        var data = t.stream().map(x -> {
            var cus = mapper.convertOneValue(x);
            cus.replace("elements", x.getElements().size());
            cus.remove("project");
            return cus;
        }).collect(Collectors.toList());


        lots
                .forEach(f -> hash.put(f.toLowerCase(), data
                        .stream().filter(x -> String.valueOf(x.get("lot")).equalsIgnoreCase(f))
                        .collect(Collectors.toList())));
        return hash;
    }


    public List<HashMap<Object, Object>> getPlanningGeneral(String resp, String filter, String type) {
        List<Project> projects;
        if (resp != null && !resp.isEmpty()) {
            projects = projectRep.findAll().stream().filter(x -> (x.getPiloteMetreur() != null && x.getPiloteMetreur().contains(resp)) ||
                    (x.getPiloteStructure() != null && x.getPiloteStructure().contains(resp)) ||
                    (x.getPiloteVRD() != null && x.getPiloteVRD().contains(resp)) ||
                    (x.getPiloteTechnique() != null && x.getPiloteTechnique().contains(resp))).collect(Collectors.toList());
        } else {
            projects = projectRep.findAll();
        }
        if (type != null && !type.isEmpty()) {
            projects = projects.stream().filter(x -> x.getEtat().contains(type.toLowerCase())).collect(Collectors.toList());
        }

        if (filter != null && !filter.isEmpty()) {
            projects = projects.stream().filter(x -> x.toString().toLowerCase().contains(filter.toLowerCase())).collect(Collectors.toList());
        }


        var projectTache = projects.stream().filter(x -> x.getDateDebut() != null).sorted(Comparator.comparing(Project::getDateDebut).reversed()).map(x -> {
            var some = new HashMap<>();
            if (!x.getTaches().isEmpty()) {
                some.put("acheves", x.getTaches().stream().map(Tache::getComplete).reduce(0, Integer::sum));
                some.put("duree", x.getTaches().stream().map(f -> f.getElements().size()).reduce(0, Integer::sum));


                some.put("realJest", x.getTaches().stream().map(Tache::getRealJest).reduce(0, Integer::sum));
                some.put("realJreel", x.getTaches().stream().map(Tache::getRealJreel).reduce(0, Integer::sum) - 1);

                float tachesPercent = (float) x.getTaches().stream().filter(Tache::isEnd).count() / (float) x.getTaches().size();
                some.put("tachesPercent", tachesPercent * 100);


            }
            some.put("project", x);
            some.put("startEst", x.getTaches().stream().min(Comparator.comparing(Tache::getJestStart)).stream().findFirst().isEmpty() ? null : x.getTaches().stream().min(Comparator.comparing(Tache::getJestStart)).stream().findFirst().get().getJestStart());
            some.put("startReel", x.getTaches().stream().min(Comparator.comparing(Tache::getJreelStart)).stream().findFirst().isEmpty() ? null : x.getTaches().stream().min(Comparator.comparing(Tache::getJreelStart)).stream().findFirst().get().getJreelStart());
            var taches = x.getTaches().stream().peek(f -> {
                Calendar cest = Calendar.getInstance();
                Calendar creel = Calendar.getInstance();


                cest.setTimeInMillis(f.getJestStart());
                creel.setTimeInMillis(f.getJreelStart());

                cest.add(Calendar.DATE, Integer.parseInt(f.getJest()) - 1);
                creel.add(Calendar.DATE, Integer.parseInt(f.getJreel()) - 1);

                f.setJestStart(cest.getTimeInMillis());
                f.setJreelStart(creel.getTimeInMillis());
            }).collect(Collectors.toList());
            some.put("endEst", taches.stream().max(Comparator.comparing(Tache::getJestStart)).stream().findFirst().isEmpty() ? null : taches.stream().max(Comparator.comparing(Tache::getJestStart)).stream().findFirst().get().getJestStart());
            some.put("endReel", taches.stream().max(Comparator.comparing(Tache::getJreelStart)).stream().findFirst().isEmpty() ? null : taches.stream().max(Comparator.comparing(Tache::getJestStart)).stream().findFirst().get().getJreelStart());
            return some;
        }).collect(Collectors.toList());


        return projectTache.stream().filter(x -> x.get("endReel") != null && x.get("endEst") != null && x.get("startEst") != null && x.get("startReel") != null).collect(Collectors.toList());

    }

    @SneakyThrows
    public Long changeDateByLot(Long Pid, String date, String lot) {
        var now = new SimpleDateFormat("yyyy-MM-dd").parse(date);
        var p = projectRep.getById(Pid);
        var taches = p.getTaches().stream().filter(x -> x.getLot().equalsIgnoreCase(lot)).collect(Collectors.toList());
        if (now.getTime() < p.getDateDebut().getTime()) return null;

        if (!taches.isEmpty()) {

            var delete = Calendar.getInstance();

            delete.setTimeInMillis(taches.get(0).getJreelStart());

            var diffInMillies = now.getTime() - new Date(taches.get(0).getJreelStart()).getTime();

            long diff = TimeUnit.DAYS.convert(diffInMillies, TimeUnit.MILLISECONDS);


            var tmp = taches.stream().peek(x -> {
                var calr = Calendar.getInstance();
                var cale = Calendar.getInstance();

                calr.setTimeInMillis(x.getJreelStart());
                cale.setTimeInMillis(x.getJestStart());

                cale.add(Calendar.DATE, (int) diff);
                calr.add(Calendar.DATE, (int) diff);

                x.setJreelStart(calr.getTimeInMillis());
                x.setJestStart(cale.getTimeInMillis());


            }).collect(Collectors.toList());

            tacheRep.saveAll(tmp);
        }
        return 1L;
    }

    public List<String> getEmployeeByProject(Long pid) {
        var project = projectRep.getById(pid);
        List<String> usernames = new ArrayList<>();
        usernames.add(project.getPiloteStructure());
        usernames.add(project.getPiloteTechnique());
        usernames.add(project.getPiloteVRD());
        usernames.add(project.getPiloteMetreur());

        var names = employeeRep.findAllByUsernameIn(usernames);
        return names.stream().map(x -> x.getLastName() + " " + x.getFirstName()).collect(Collectors.toList());
    }


    public Map<String, Object> getInterventionByProject(Long pid) {
        if (!projectRep.existsById(pid)) return null;
        Project project = projectRep.getById(pid);

        var p = mapper.convertOneValue(project);
        Map<String, Object> inv = mapper.convertOneValue(project.getIntervention());
        if (inv != null)
            inv.remove("project");
        p.put("intervention", inv);
        return p;
    }
}


