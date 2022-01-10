package com.planning.api.utils;

import com.planning.api.main.models.Element;
import com.planning.api.main.models.Tache;
import com.planning.api.main.reps.TacheRep;
import lombok.SneakyThrows;

import java.text.SimpleDateFormat;
import java.util.Calendar;
import java.util.Date;
import java.util.List;

public class Tools {

    @SneakyThrows
    public static boolean makeElement(Date dd, Date df, Element element) {
        if (element.getProjectName() == null) return false;
        var elementDate = new SimpleDateFormat("dd/MM/yyyy").parse(element.getIdentifier());
        return elementDate.after(dd) && elementDate.before(df);
    }

    @SneakyThrows
    public static boolean forChantier(Date dd, Date df, Element element) {
        var elementDate = new SimpleDateFormat("dd/MM/yyyy").parse(element.getIdentifier());
        return elementDate.after(dd) && elementDate.before(df);
    }


    public static boolean compareYears(Date first, Date second) {
        var firstC = Calendar.getInstance();
        var secondC = Calendar.getInstance();
        firstC.setTime(first);
        secondC.setTime(second);

        return firstC.get(Calendar.YEAR) == secondC.get(Calendar.YEAR);
    }

    public static void makeSomeLogic(Tache ts, boolean edit, TacheRep tacheRep) {
        tacheRep.save(ts);
        List<Tache> allByRecentIn = tacheRep.findAllByRecent(String.valueOf(ts.getCurrentKey()), ts.getProject().getId());


        if (allByRecentIn.isEmpty()) return;

        if (edit) {
            for (var x : allByRecentIn) {
                var jreel = Calendar.getInstance();
                var jest = Calendar.getInstance();


                jreel.setTimeInMillis(ts.getJreelStart());
                jest.setTimeInMillis(ts.getJestStart());


                jreel.add(Calendar.DATE, Integer.parseInt(ts.getJreel()));
                jest.add(Calendar.DATE, Integer.parseInt(ts.getJest()));


                x.setJestStart(jest.getTimeInMillis());
                x.setJreelStart(jreel.getTimeInMillis());


                tacheRep.save(x);
                makeSomeLogic(x, true, tacheRep);
            }
        } else {
            for (var x : allByRecentIn) {
                var jreel = Calendar.getInstance();


                jreel.setTimeInMillis(ts.getJreelStart());


                jreel.add(Calendar.DATE, Integer.parseInt(ts.getJreel()));


                x.setJreelStart(jreel.getTimeInMillis());


                tacheRep.save(x);
                makeSomeLogic(x, false, tacheRep);
            }
        }


    }

    public static int getDifferenceDays(Date d1, Date d2) {
        int daysDiff;
        long diff = d2.getTime() - d1.getTime();
        long diffDays = diff / (24 * 60 * 60 * 1000) + 1;
        daysDiff = (int) diffDays;
        return daysDiff;
    }


    public static String CheckCount(String code, int o) {
        var c = Calendar.getInstance();
        c.setTime(new Date());
        switch (String.valueOf(o).length()) {
            case 1:
                return code + "/00" + o +"/"+ c.get(Calendar.YEAR);
            case 2:
                return code + "/0" + o +"/"+ c.get(Calendar.YEAR);
            case 3:
                return code + "/" + o +"/"+ c.get(Calendar.YEAR);
            default:
                return null;
        }
    }

}
