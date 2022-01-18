package com.planning.api.main.services;

import com.planning.api.main.models.ETU02.Data;
import com.planning.api.main.models.ETU02.TacheForChart;
import com.planning.api.main.reps.ProjectRep;
import org.apache.poi.ss.usermodel.BorderStyle;
import org.apache.poi.ss.usermodel.FillPatternType;
import org.apache.poi.ss.usermodel.HorizontalAlignment;
import org.apache.poi.ss.usermodel.VerticalAlignment;
import org.apache.poi.ss.util.CellRangeAddress;
import org.apache.poi.ss.util.RegionUtil;
import org.apache.poi.xssf.usermodel.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.awt.*;
import java.io.File;
import java.io.FileInputStream;
import java.io.FileOutputStream;
import java.text.SimpleDateFormat;
import java.time.YearMonth;
import java.util.List;
import java.util.*;
import java.util.concurrent.TimeUnit;
import java.util.stream.Collectors;

@Service
public class Etu02Service {
    private final ProjectRep projectRep;

    @Autowired
    public Etu02Service(ProjectRep projectRep) {
        this.projectRep = projectRep;
    }


    public File generateChart(Long id, String lot) {


        var project = projectRep.getById(id);


        var taches = project.getTaches().stream().filter(x -> x.getLot().equalsIgnoreCase(lot)).map(x -> {
            var cReel = Calendar.getInstance();
            var cEst = Calendar.getInstance();
            cEst.setTimeInMillis(x.getJestStart());
            cReel.setTimeInMillis(x.getJreelStart());
            cEst.add(Calendar.DATE, Integer.parseInt(x.getJest()));
            cReel.add(Calendar.DATE, Integer.parseInt(x.getJreel()));


            var tache = new TacheForChart();
            tache.setName(x.getName());
            tache.setEst(Integer.parseInt(x.getJest()));
            tache.setReel(Integer.parseInt(x.getJreel()));
            tache.setDayReelStart(new Date(TimeUnit.SECONDS.toMillis(x.getJreelStart())));
            tache.setDayReelEnd(cReel.getTime());
            tache.setDayEstStart(new Date(TimeUnit.SECONDS.toMillis(x.getJestStart())));
            tache.setDayEstEnd(cEst.getTime());
            tache.setComment(x.getComment());
            tache.setEstHours(String.valueOf(x.getComplete()));
            tache.setReelHours(String.valueOf(x.getElements().size()));
            tache.setConceptType(x.getPhase());


            return tache;
        }).collect(Collectors.toList());


        var data = new Data();
        data.setProjectName(project.getName());
        data.setProjectRef(project.getRef());
        //TODO:set day position
        data.setStartCell(14);
        data.setTaches(taches);
        data.setDateDebut(project.getDateDebut());


        try {


            List<Date> dates = data.getTaches().stream().map(TacheForChart::getDayEstEnd).collect(Collectors.toList());
            dates.addAll(data.getTaches().stream().map(TacheForChart::getDayReelEnd).collect(Collectors.toList()));

            Date max = dates.stream().max(Date::compareTo).get();

            dates = data.getTaches().stream().map(TacheForChart::getDayEstStart).collect(Collectors.toList());
            dates.addAll(data.getTaches().stream().map(TacheForChart::getDayReelStart).collect(Collectors.toList()));
            Date min = dates.stream().max(Date::compareTo).get();

            if (max.toInstant().getEpochSecond() < min.toInstant().getEpochSecond()) return null;

            data.setEndDate(max);
            data.setStartDate(min);

            //TODO:ELSE

            List<String> wordsInData = new ArrayList<>();
            data.getTaches().forEach(x -> {
                if (wordsInData.contains(x.getConceptType())) return;
                wordsInData.add(x.getConceptType());
            });


            for (int i = 0; i < wordsInData.size(); i++) {
                wordsInData.set(i, wordsInData.get(i) + ":" + Collections.frequency(data.getTaches().stream().map(TacheForChart::getConceptType).collect(Collectors.toList()), wordsInData.get(i)));

            }

            XSSFWorkbook wb = new XSSFWorkbook(new FileInputStream("template.xlsx"));
            FileOutputStream fileOut = new FileOutputStream("z.xlsx");
            XSSFSheet sheet1 = wb.getSheetAt(0);
            XSSFCell projectName = sheet1.getRow(4).getCell(4);
            XSSFCell projectRef = sheet1.getRow(5).getCell(4);
            XSSFCell dateDebut = sheet1.getRow(6).getCell(4);


            projectName.setCellValue(data.getProjectName());
            projectRef.setCellValue(data.getProjectRef());
            dateDebut.setCellValue(data.getDateDebut());

            //TODO:fill data
            int cpt = 11;
            int indexReel = data.getStartCell();
            int indexEst = data.getStartCell();
            int index = 0;
            for (TacheForChart t : data.getTaches()) {

                if (cpt != 11) {
                    indexEst += data.getTaches().get(index - 1).getEst() - 1;
                    indexReel += data.getTaches().get(index - 1).getReel() - 1;
                }


                sheet1.shiftRows(cpt, sheet1.getLastRowNum(), 2);
                sheet1.createRow(cpt);


                for (int i = 3; i <= 12; i++) {
                    if (sheet1.getRow(cpt).getCell(i) == null) {
                        sheet1.getRow(cpt).createCell(i);
                    }

                    CellRangeAddress region = new CellRangeAddress(cpt, cpt + 1, i, i);
                    sheet1.addMergedRegion(region);


                    RegionUtil.setBorderBottom(BorderStyle.MEDIUM, region, sheet1);


                    XSSFCellStyle cellStyle = wb.createCellStyle();
                    cellStyle.setAlignment(HorizontalAlignment.CENTER);
                    cellStyle.setVerticalAlignment(VerticalAlignment.CENTER);
                    org.apache.poi.ss.usermodel.Font font = wb.createFont();
                    font.setBold(true);
                    font.setFontHeightInPoints((short) 14);
                    cellStyle.setFont(font);

                    sheet1.getRow(cpt).getCell(i).setCellStyle(cellStyle);
                }

                sheet1.getRow(cpt).getCell(3).setCellValue(t.getName());
                sheet1.getRow(cpt).getCell(4).setCellValue(t.getEst());
                sheet1.getRow(cpt).getCell(5).setCellValue(t.getReel());
                sheet1.getRow(cpt).getCell(6).setCellValue(new SimpleDateFormat("dd/MM/yyyy").format(t.getDayEstStart()));
                sheet1.getRow(cpt).getCell(7).setCellValue(new SimpleDateFormat("dd/MM/yyyy").format(t.getDayEstEnd()));
                sheet1.getRow(cpt).getCell(8).setCellValue(t.getEstHours());
                sheet1.getRow(cpt).getCell(9).setCellValue(new SimpleDateFormat("dd/MM/yyyy").format(t.getDayReelStart()));
                sheet1.getRow(cpt).getCell(10).setCellValue(new SimpleDateFormat("dd/MM/yyyy").format(t.getDayReelEnd()));
                sheet1.getRow(cpt).getCell(11).setCellValue(t.getReelHours());
                sheet1.getRow(cpt).getCell(12).setCellValue(t.getComment());


                for (int x = indexEst; x < indexEst + t.getEst() - 1; x++) {
                    if (sheet1.getRow(cpt).getCell(x) == null) sheet1.getRow(cpt).createCell(x);
                    XSSFCellStyle style1 = wb.createCellStyle();
                    style1.setFillForegroundColor(new XSSFColor(Color.GREEN, null));
                    style1.setFillPattern(FillPatternType.SOLID_FOREGROUND);
                    sheet1.getRow(cpt).getCell(x).setCellStyle(style1);
                }

                for (int x = indexReel; x < indexReel + t.getReel() - 1; x++) {
                    if (sheet1.getRow(cpt + 1).getCell(x) == null) sheet1.getRow(cpt + 1).createCell(x);
                    XSSFCellStyle style1 = wb.createCellStyle();
                    style1.setFillForegroundColor(new XSSFColor(Color.RED, null));
                    style1.setFillPattern(FillPatternType.SOLID_FOREGROUND);
                    sheet1.getRow(cpt + 1).getCell(x).setCellStyle(style1);
                }
                cpt += 2;
                index++;
            }
            int nextRow = 11;
            for (String key : wordsInData) {
                int length = Integer.parseInt(key.split(":")[1]);
                CellRangeAddress regionType2 = new CellRangeAddress(nextRow, nextRow + (length * 2) - 1, 2, 2);
                sheet1.addMergedRegion(regionType2);


                if (sheet1.getRow(nextRow).getCell(2) == null) {
                    sheet1.getRow(nextRow).createCell(2);
                }

                sheet1.getRow(nextRow).getCell(2).setCellValue(key.split(":")[0]);

                XSSFCellStyle cellStyle = wb.createCellStyle();
                cellStyle.setAlignment(HorizontalAlignment.CENTER);
                cellStyle.setVerticalAlignment(VerticalAlignment.CENTER);
                org.apache.poi.ss.usermodel.Font font = wb.createFont();
                font.setFontHeightInPoints((short) 14);
                font.setBold(true);
                cellStyle.setFont(font);
                cellStyle.setWrapText(true);

                sheet1.getRow(nextRow).getCell(2).setCellStyle(cellStyle);


                nextRow += (length * 2);
            }


            //TODO:row header data
            makeMonthForHeader(wb, sheet1, data.getStartDate(), data.getEndDate(), data.getTaches().size());

            wb.write(fileOut);

            fileOut.close();
        } catch (Exception e) {
            e.printStackTrace();
        }
        return null;
    }


    public void setMergedBorder(CellRangeAddress range, BorderStyle style, XSSFSheet sheet) {
        RegionUtil.setBorderBottom(style, range, sheet);
        RegionUtil.setBorderTop(style, range, sheet);
        RegionUtil.setBorderLeft(style, range, sheet);
        RegionUtil.setBorderRight(style, range, sheet);
    }


    public void setCellStyle(XSSFWorkbook wb, XSSFCell cell, BorderStyle style, Color color, int type) {
        XSSFCellStyle cellStyle = wb.createCellStyle();
        cellStyle.setBorderLeft(style);
        cellStyle.setBorderTop(style);
        cellStyle.setBorderBottom(style);
        cellStyle.setTopBorderColor(new XSSFColor(color, null));
        cellStyle.setBottomBorderColor(new XSSFColor(color, null));
        cellStyle.setLeftBorderColor(new XSSFColor(color, null));
        cellStyle.setAlignment(HorizontalAlignment.CENTER);
        if (type == 2) {
            cellStyle.setFillForegroundColor(new XSSFColor(new Color(48, 84, 150), null));
            cellStyle.setFillPattern(FillPatternType.SOLID_FOREGROUND);
            org.apache.poi.ss.usermodel.Font font = wb.createFont();
            font.setColor(org.apache.poi.ss.usermodel.Font.SS_SUPER);
            cellStyle.setFont(font);
        }
        if (type == 3) {
            cellStyle.setFillForegroundColor(new XSSFColor(new Color(255, 255, 255), null));
            cellStyle.setFillPattern(FillPatternType.SOLID_FOREGROUND);
            org.apache.poi.ss.usermodel.Font font = wb.createFont();
            font.setColor(org.apache.poi.ss.usermodel.Font.COLOR_NORMAL);
            cellStyle.setFont(font);
        }
        cell.setCellStyle(cellStyle);
    }


    public void makeMonthForHeader(XSSFWorkbook wb, XSSFSheet sheet, Date startDate, Date endDate, int tacheLength) {
        List<Map<String, Object>> dates = new ArrayList<>();
        HashMap<String, Object> map = new HashMap<>();
        Calendar start = Calendar.getInstance();
        start.setTime(startDate);

        YearMonth yearMonth = YearMonth.of(start.get(Calendar.YEAR), start.get(Calendar.MONTH) + 1);
        map.put("month", start.getTime());
        map.put("days", yearMonth.lengthOfMonth());
        System.out.println(yearMonth);

        dates.add(map);

        Calendar end = Calendar.getInstance();
        end.setTime(endDate);
        end.add(Calendar.MONTH, -1);


        while (end.after(start)) {
            map = new HashMap<>();
            start.add(Calendar.MONTH, 1);

            yearMonth = YearMonth.of(start.get(Calendar.YEAR), start.get(Calendar.MONTH) + 1);

            map.put("month", start.getTime());
            map.put("days", yearMonth.lengthOfMonth());
            dates.add(map);
        }


        if (sheet.getRow(8) == null) {
            sheet.createRow(8);
        }

        if (sheet.getRow(9) == null) {
            sheet.createRow(9);
        }

        int cpt = 14;


        for (Map<String, Object> date : dates) {


            CellRangeAddress region = new CellRangeAddress(8, 8, cpt, (cpt + (int) date.get("days")) - 1);
            sheet.addMergedRegion(region);
            setMergedBorder(region, BorderStyle.MEDIUM, sheet);


            if (sheet.getRow(8).getCell(cpt) == null) {
                sheet.getRow(8).createCell(cpt);
            }


            XSSFCell test = sheet.getRow(8).getCell(cpt);


            Calendar c = Calendar.getInstance();
            c.setTime((Date) date.get("month"));
            test.setCellValue(c.getDisplayName(Calendar.MONTH, Calendar.LONG, Locale.getDefault()));
            setCellStyle(wb, test, BorderStyle.MEDIUM, Color.BLACK, 1);

            for (int i = 0; i < (int) date.get("days"); i++) {


                Date date1 = (Date) date.get("month");
                date1.setDate(i + 1);

                Calendar calendar = Calendar.getInstance();
                calendar.setTime(date1);


                if (sheet.getRow(9).getCell(cpt + i) == null) {
                    sheet.getRow(9).createCell(cpt + i);
                }


                XSSFCell cell = sheet.getRow(9).getCell(cpt + i);
                cell.setCellValue(i + 1);

                if (calendar.get(Calendar.DAY_OF_WEEK) == Calendar.SUNDAY || calendar.get(Calendar.DAY_OF_WEEK) == Calendar.SATURDAY) {
                    setCellStyle(wb, cell, BorderStyle.MEDIUM, Color.BLACK, 3);
                    for (int s = 10; s < (tacheLength * 2) + 11; s++) {
                        if (sheet.getRow(s).getCell(cpt + i) == null) {
                            sheet.getRow(s).createCell(cpt + i);
                        }

                        XSSFCellStyle style = wb.createCellStyle();
                        style.setFillBackgroundColor(new XSSFColor(Color.BLACK, null));
                        style.setFillPattern(FillPatternType.SOLID_FOREGROUND);
                        sheet.getRow(s).createCell(cpt + i).setCellStyle(style);
                    }
                } else {
                    setCellStyle(wb, cell, BorderStyle.MEDIUM, Color.BLACK, 2);
                }

            }
            cpt += (int) date.get("days");
        }


    }
}
