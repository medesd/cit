package com.planning.api.main.services;

import com.fasterxml.jackson.core.type.TypeReference;
import com.planning.api.main.classes.ElementDTO;
import com.planning.api.main.models.Element;
import com.planning.api.main.reps.ElementsRep;
import com.planning.api.main.reps.EmployeeRep;
import com.planning.api.main.reps.TacheRep;
import com.planning.api.security.services.UserDetailsImpl;
import com.planning.api.utils.Mapper;
import com.planning.api.utils.Tools;
import lombok.SneakyThrows;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.*;
import java.util.stream.Collectors;

@Service
public class ElementService {
    private final ElementsRep elementsRep;
    private final EmployeeRep employeeRep;
    private final TacheRep tacheRep;
    private final Mapper mapper;

    @Autowired
    public ElementService(ElementsRep elementsRep, EmployeeRep employeeRep, TacheRep tacheRep) {
        this.elementsRep = elementsRep;
        this.employeeRep = employeeRep;
        this.tacheRep = tacheRep;
        this.mapper=new Mapper();
    }


    @SneakyThrows
    public List<Map<String,Object>> addElement(List<Element> elements) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        UserDetailsImpl currentPrincipalName = (UserDetailsImpl) authentication.getPrincipal();
        var employee = this.employeeRep.getById(currentPrincipalName.getId());


        elements.forEach(element -> {
            String date = element.getIdentifier().substring(0, element.getIdentifier().indexOf('-'));
            try {
                var compare = new SimpleDateFormat("dd/MM/yyyy").parse(date);
                if (element.getTache() != null && element.getTache().getId() != 0) {
                    var tache = this.tacheRep.getById(element.getTache().getId());
                    int days = Tools.getDifferenceDays(new Date(tache.getJreelStart()), compare);
                    if (Integer.parseInt(tache.getJreel()) < days) {
                        tache.setJreel(String.valueOf(days));


                        Date date1 = new Date(tache.getJreelStart());
                        Calendar cal1 = Calendar.getInstance();
                        Calendar cal2 = Calendar.getInstance();
                        cal1.setTime(date1);
                        cal2.setTime(compare);

                        int numberOfDays = 0;
                        while (cal1.before(cal2)) {
                            if ((Calendar.SATURDAY != cal1.get(Calendar.DAY_OF_WEEK))
                                    && (Calendar.SUNDAY != cal1.get(Calendar.DAY_OF_WEEK))) {
                                numberOfDays++;
                            }
                            cal1.add(Calendar.DATE, 1);
                        }
                        tache.setRealJreel(numberOfDays + 1);
                    }


                    tache.setEnd(element.getTache().isEnd());
                    element.setTache(tache);
                    element.setProjectName(tache.getProject().getName());
                    Tools.makeSomeLogic(tache, false,tacheRep);

                } else {
                    element.setProjectName(null);
                }
            } catch (ParseException e) {
                e.printStackTrace();
            }

        });

        elements = elements.stream().peek(x -> x.setEmployee(employee)).collect(Collectors.toList());


        return mapper.convertListValue(elementsRep.saveAll(elements));
    }


    public void deleteElement(List<String> id) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        UserDetailsImpl currentPrincipalName = (UserDetailsImpl) authentication.getPrincipal();
        var elms = employeeRep.getById(currentPrincipalName.getId()).getElements();

        var filter = elms.stream().filter(x -> id.contains(x.getIdentifier())).collect(Collectors.toList());
        if (filter.isEmpty()) return;

        Set<Long> taches = new HashSet<>();

        filter.forEach(f -> {
            taches.add(f.getTache().getId());
            f.getTache().setEnd(false);
            tacheRep.save(f.getTache());
        });

        elementsRep.deleteElementsWithIds(filter.stream().map(Element::getId).collect(Collectors.toList()));


        tacheRep.findAllById(taches).forEach(x -> {

            var collect = x.getElements().stream().map(f -> {
                try {
                    return new SimpleDateFormat("dd/MM/yyyy").parse(f.getIdentifier().substring(0, f.getIdentifier().indexOf('-')));
                } catch (ParseException e) {
                    e.printStackTrace();
                    return null;
                }
            }).filter(Objects::nonNull).max(Date::compareTo);


            if (collect.isPresent()) {
                int days = Tools.getDifferenceDays(new Date(x.getJreelStart()), collect.get());
                x.setJreel(String.valueOf(days));

                Date date1 = new Date(x.getJreelStart());
                Calendar cal1 = Calendar.getInstance();
                Calendar cal2 = Calendar.getInstance();
                cal1.setTime(date1);
                cal2.setTime(collect.get());

                int numberOfDays = 0;
                while (cal1.before(cal2)) {
                    if ((Calendar.SATURDAY != cal1.get(Calendar.DAY_OF_WEEK))
                            && (Calendar.SUNDAY != cal1.get(Calendar.DAY_OF_WEEK))) {
                        numberOfDays++;
                    }
                    cal1.add(Calendar.DATE, 1);
                }
                x.setRealJreel(numberOfDays + 1);
            } else {
                x.setJreel("0");
                x.setRealJreel(0);
            }

            Tools.makeSomeLogic(x, false,tacheRep);
        });
    }

}
