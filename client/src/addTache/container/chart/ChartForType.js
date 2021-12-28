import $ from "jquery";
import tools from "./Tools";
import moment from "moment";
import settings from "./Settings";
import * as DatePrototype from "./DatePrototype";
import core from "./Core";
import * as Tools from "./DateTools";
import "popper.js"
import "bootstrap/dist/js/bootstrap.min";

export const leftPanel = (element) => {
    /* Left panel */
    let ganttLeftPanel = $('<div class="leftPanel"/>')
        .append($('<div class="row spacer"></div>')
            .css("height", tools.getCellSize() * (element.headerRows - 1)));
    //const styleWidth = 'width:' + 100 / 7 + '%';
    const styleWidth = 'border:1px solid #DDD;height:48px;min-height:48px';
    const styleWidthCol = 'border:1px solid #DDD;height:24px';

    let entries
    let tc;
    if (element.typeFor === "details") {
        tc = 'Tache';

        entries = ['<div id="rowheader" style="' + styleWidthCol + ';width: 40px" class="row d-flex justify-content-center name row" id="RowdId_">' +
        '<span>' +
        'Phase' +
        '</span>' +
        '</div>', '<div id="rowheader" style="' + styleWidthCol + ';width: calc(100% - 170px)" class="row d-flex justify-content-center name row" id="RowdId_">' +
        '<span>' +
        tc +
        '</span>' +
        '</div>',
            '<div id="rowheader" style="' + styleWidthCol + ';width: 60px" class="row d-flex justify-content-center name row" id="RowdId_">' +
            '<span>Heurs Réel</span>' +
            '</div>',
            '<div id="rowheader" style="' + styleWidthCol + ';width: 70px" class="row d-flex justify-content-center name row" id="RowdId_">' +
            '<span>Heurs Estimé</span>' +
            '</div>'];


    }


    if (element.typeFor === "global") {
        tc = 'Lot';

        entries = ['<div id="rowheader" style="' + styleWidthCol + ';width: 100%" class="row d-flex justify-content-center name row" id="RowdId_">' +
        '<span>' +
        tc +
        '</span>' +
        '</div>'];
    }

    if (element.typeFor === "general") {
        entries = [
            '<div id="rowheader" style="' + styleWidthCol + ';width: calc(100% - 63.9%)" class="row d-flex justify-content-center name row" id="RowdId_">' +
            '<span>' +
            "projet" +
            '</span>' +
            '</div>',
            '<div id="rowheader" style="' + styleWidthCol + ';width: calc(100% - 89.3%)" class="row d-flex justify-content-center name row" id="RowdId_">' +
            '<span>' +
            "Réference" +
            '</span>' +
            '</div>',

            '<div id="rowheader" style="' + styleWidthCol + ';width: calc(100% - 83%)" class="row d-flex justify-content-center name row" id="RowdId_">' +
            '<span>' +
            "Service:Resp" +
            '</span>' +
            '</div>',

            '<div id="rowheader" style="' + styleWidthCol + ';width: calc(100% - 91.5%)" class="row d-flex justify-content-center name row" id="RowdId_">' +
            '<span>' +
            "Date début" +
            '</span>' +
            '</div>',

            '<div id="rowheader" style="' + styleWidthCol + ';width: calc(100% - 91.5%)" class="row d-flex justify-content-center name row" id="RowdId_">' +
            '<span>' +
            "Date fin" +
            '</span>' +
            '</div>',
            '<div id="rowheader" style="' + styleWidthCol + ';width: calc(100% - 90.8%)" class="row d-flex justify-content-center name row" id="RowdId_">' +
            '<span>' +
            "Progression" +
            '</span>' +
            '</div>',
            '<div id="rowheader" style="' + styleWidthCol + ';width: calc(100% - 90%)" class="row d-flex justify-content-center name row" id="RowdId_">' +
            '<span>' +
            "CR" +
            '</span>' +
            '</div>'
        ];
    }


    element.data.forEach((entry, i) => {
        if (entry.key === undefined) entry.key = (String.fromCharCode(i + 65));
        if (element.typeFor === "global") {


            entries.push('<div id="rowheader' + i + '" style="' + styleWidth + ';width: 100% " class="row d-flex justify-content-center align-content-center desc row" id="RowdId_">' +
                '<span>' + entry.name + '</span>' +
                '</div>');
        }

        if (element.typeFor === "details") {

            if (entry.inex === "Externe") {
                entry.hoursReel = "-"
                entry.percent = "-"
            }

            entries.push('<div id="rowheader' + i + '" style="' + styleWidth + '; width: 40px" class="row d-flex justify-content-center align-content-center desc row" id="RowdId_">' +
                '<span>' + entry.phase + '</span>' +
                '</div>');

            entries.push('<div id="rowheader' + i + '" style="' + styleWidth + ';width: calc(100% - 170px)" class="row d-flex justify-content-center align-content-center desc row" id="RowdId_">' +
                '<span>' + entry.tache + '</span>' +
                '</div>');

            entries.push('<div id="rowheader' + i + '" style="' + styleWidth + ';width: 60px" class="row d-flex justify-content-center align-content-center desc row" id="RowdId_">' +
                '<span>' + entry.hoursReel + '</span>' +
                '</div>');

            entries.push('<div id="rowheader' + i + '" style="' + styleWidth + ';width: 70px" class="row d-flex justify-content-center align-content-center desc row" id="RowdId_">' +
                '<span>' + entry.percent + '</span>' +
                '</div>');
        }
        if (element.typeFor === "general") {
            entries.push('<div id="rowheader' + i + '" style="' + styleWidth + '; width: calc(100% - 63.9%);line-height: 13px" class="row d-flex justify-content-center align-content-center desc row" id="RowdId_">' +
                '<span>' + entry.project + '</span>' +
                '</div>');

            entries.push('<div id="rowheader' + i + '" style="' + styleWidth + ';width: calc(100% - 89.3%)" class="row d-flex justify-content-center align-content-center desc row" id="RowdId_">' +
                '<span>' + entry.ref + '</span>' +
                '</div>');
            //resp
            Object.keys(entry.service).forEach(key => {
                if (entry.service[key] === undefined) {
                    delete entry.service[key];
                }
            });

            const arr = [];
            Object.keys(entry.service).forEach(x => {
                switch (x) {
                    case 'structure':
                        arr.push('STR:' + entry.service[x].lastName.substring(0, 1).toUpperCase() + entry.service[x].firstName.substring(0, 1).toUpperCase());
                        break;
                    case 'vrd':
                        arr.push('VRD:' + entry.service[x].lastName.substring(0, 1).toUpperCase() + entry.service[x].firstName.substring(0, 1).toUpperCase());
                        break;
                    case 'metreur':
                        arr.push('Metreur:' + entry.service[x].lastName.substring(0, 1).toUpperCase() + entry.service[x].firstName.substring(0, 1).toUpperCase());
                        break;
                    case 'technique':
                        arr.push('Tech:' + entry.service[x].lastName.substring(0, 1).toUpperCase() + entry.service[x].firstName.substring(0, 1).toUpperCase());
                        break;
                    default:
                        arr.push(null);
                }
            })


            entries.push('<div id="rowheader' + i + '" style="' + styleWidth + ';width: calc(100% - 83%)" class="row d-flex justify-content-center align-content-center desc row" id="RowdId_">' +
                '<span class="d-flex flex-wrap justify-content-around row-cols-2"><div class="col mw-100 border p-0">' + arr.join('</div><div class="col mw-100 border p-0">') + '</div></span>' +
                '</div>');
            const min = Math.min(entry.dayES, entry.dayRS)
            const max = Math.max(entry.dayEE, entry.dayRE)

            //some logic : date debut
            entries.push('<div id="rowheader' + i + '" style="' + styleWidth + ';width: calc(100% - 91.5%)" class="row d-flex justify-content-center align-content-center desc row" id="RowdId_">' +
                '<span >' + (entry.dateDebut ? moment(entry.dateDebut).format("DD/MM/YYYY") : moment(min).format("DD/MM/YYYY")) + '</span>' +
                '</div>');

            //some logic : date fin
            entries.push('<div id="rowheader' + i + '" style="' + styleWidth + ';width: calc(100% - 91.5%);max-width: calc(100% - 91.5%)" class="row d-flex justify-content-center align-content-center desc row" id="RowdId_">' +
                '<span>' + moment(max).format("DD/MM/YYYY") + '</span>' +
                '</div>');

            const acheves = entry.percent;
            const duree = entry.hoursReel;

            const prog = (duree / acheves) * 100

            //some logic : prog
            entries.push('<div id="rowheader' + i + '" style="' + styleWidth + ';width: calc(100% - 90.8%)" class="row d-flex justify-content-center align-content-center desc row" id="RowdId_">' +
                '<span>' + entry.tachePercent.toFixed(1) + '%</span>' +
                '</div>');

            entries.push('<div id="rowheader' + i + '" style="' + styleWidth + ';width: calc(100% - 90%)" class="row d-flex justify-content-center align-content-center desc row" id="RowdId_">' +
                '<span>' + prog.toFixed(1) + '%</span>' +
                '</div>');
        }
    })
    if (element.typeFor === "general") {
        ganttLeftPanel[0].style.width = "700px";
    }
    if (element.typeFor === "details") {
        ganttLeftPanel[0].style.width = "400px";
    }
    ganttLeftPanel[0].style.fontSize = "11px";
    ganttLeftPanel[0].style.textAlign = "center";
    return ganttLeftPanel.append(entries.join(""));
}

export const rightPanel = (element) => {
    let range;
    // Days of the week have a class of one of
    // `sn` (Sunday), `sa` (Saturday), or `wd` (Weekday)
    let dowClass = ["sn", "wd", "wd", "wd", "wd", "wd", "sa"];
    //unused: was someone planning to allow styles to stretch to the bottom of the chart?
    //let gridDowClass = [" sn", "", "", "", "", "", " sa"];

    let yearArr = [];
    let scaleUnitsThisYear = 0;

    let monthArr = [];
    let scaleUnitsThisMonth = 0;

    let dayArr = [];
    let hoursInDay = 0;

    let dowArr = [];
    let horArr = [];

    let today = new Date();
    today.setHours(0, 0, 0, 0);

    // reused variables
    let $row = $('<div class="row header"></div>');
    let i, len;
    let year, month, week, day;
    let rday, dayClass;
    let dataPanel, dataPanelWidth;

    switch (settings.scale) {
        // **Hours**
        case "hours":
            element.dateStart = moment(element.dateStart).toDate();
            element.dateEnd = moment(element.dateEnd).toDate();

            range = tools.parseTimeRange(element.dateStart, element.dateEnd, element.scaleStep);
            dataPanelWidth = range.length * tools.getCellSize();

            year = range[0].getFullYear();
            month = range[0].getMonth();
            day = range[0];

            for (i = 0, len = range.length; i < len; i++) {
                rday = range[i];

                // Fill years
                let rfy = rday.getFullYear();
                if (rfy !== year) {
                    yearArr.push(
                        '<div class="row year" style="width: ' +
                        tools.getCellSize() * scaleUnitsThisYear +
                        'px;"><div class="fn-label">' +
                        year +
                        '</div></div>');

                    year = rfy;
                    scaleUnitsThisYear = 0;
                }
                scaleUnitsThisYear++;


                // Fill months
                let rm = rday.getMonth();
                if (rm !== month) {
                    monthArr.push(
                        '<div class="row month" style="width: ' +
                        tools.getCellSize() * scaleUnitsThisMonth + 'px"><div class="fn-label">' +
                        settings.months[month] +
                        '</div></div>');

                    month = rm;
                    scaleUnitsThisMonth = 0;
                }
                scaleUnitsThisMonth++;

                // Fill days & hours
                let rgetDay = rday.getDay();
                let getDay = day.getDay();
                if (rgetDay !== getDay) {
                    dayClass = (today - day === 0) ?
                        "today" : tools.isHoliday(day.getTime()) ?
                            "holiday" : dowClass[getDay];

                    dayArr.push(
                        '<div class="row date ' + dayClass + '" ' +
                        'style="width: ' + tools.getCellSize() * hoursInDay + 'px;">' +
                        '<div class="fn-label">' + day.getDate() + '</div></div>');

                    if (settings.dow[getDay] === settings.dow[0] || settings.dow[getDay] === settings.dow[6]) {
                        dowArr.push(
                            '<div class="row day vh-100 ' + dayClass + '" ' +
                            'style="width: ' + tools.getCellSize() * hoursInDay + 'px;background-color: rgb(0, 0, 0);color: #fff;z-index: 30;border: 0">' +
                            '<div class="fn-label">' + settings.dow[getDay] + '</div></div>');
                    } else {

                        dowArr.push(
                            '<div class="row day ' + dayClass + '" ' +
                            'style="width: ' + tools.getCellSize() * hoursInDay + 'px;">' +
                            '<div class="fn-label">' + settings.dow[getDay] + '</div></div>');
                    }


                    day = rday;
                    hoursInDay = 0;
                }
                hoursInDay++;

                dayClass = dowClass[rgetDay];
                if (tools.isHoliday(rday)) {
                    dayClass = "holiday";
                }
                horArr.push(
                    '<div class="row day ' +
                    dayClass +
                    '" id="dh-' +
                    rday.getTime() +
                    '" data-offset="' + i * tools.getCellSize() +
                    '" data-repdate="' + DatePrototype.getRepDate(rday, settings.scale) +
                    '"><div class="fn-label">' +
                    rday.getHours() +
                    '</div></div>');
            }

            // Last year
            yearArr.push(
                '<div class="row year" style="width: ' +
                tools.getCellSize() * scaleUnitsThisYear + 'px;"><div class="fn-label">' +
                year +
                '</div></div>');

            // Last month
            monthArr.push(
                '<div class="row month" style="width: ' +
                tools.getCellSize() * scaleUnitsThisMonth + 'px"><div class="fn-label">' +
                settings.months[month] +
                '</div></div>');

            dayClass = dowClass[day.getDay()];

            if (tools.isHoliday(day)) {
                dayClass = "holiday";
            }

            dayArr.push(
                '<div class="row date ' + dayClass + '" ' +
                'style="width: ' + tools.getCellSize() * hoursInDay + 'px;">' +
                '<div class="fn-label">' + day.getDate() + '</div></div>');

            dowArr.push(
                '<div class="row day ' + dayClass + '" ' +
                'style="width: ' + tools.getCellSize() * hoursInDay + 'px;">' +
                '<div class="fn-label">' + settings.dow[day.getDay()] + '</div></div>');

            dataPanel = core.dataPanel(element, dataPanelWidth);

            // Append panel elements
            dataPanel.append(
                $row.clone().html(yearArr.join("")),
                $row.clone().html(monthArr.join("")),
                $row.clone().html(dayArr.join("")),
                $row.clone().html(dowArr.join("")),
                $row.clone().html(horArr.join(""))
            );
            break;

        // **Weeks**
        case "weeks":

            element.dateStart = moment(element.dateStart).toDate();
            element.dateEnd = moment(element.dateEnd).toDate();

            range = tools.parseWeeksRange(element.dateStart, element.dateEnd);
            dataPanelWidth = range.length * tools.getCellSize();

            year = range[0].getFullYear();
            month = range[0].getMonth();
            week = DatePrototype.getWeekOfYear(range[0]);
            let diff;

            for (i = 0, len = range.length; i < len; i++) {
                rday = range[i];

                // Fill years
                if (week > (week = DatePrototype.getWeekOfYear(rday))) {
                    // partial weeks to subtract from year header
                    diff = rday.getDate() - 1;
                    // offset one month (December) if week starts in last year
                    diff -= !rday.getMonth() ? 0 : 31;
                    diff /= 7;
                    yearArr.push(
                        '<div class="row year" style="width: ' +
                        tools.getCellSize() * (scaleUnitsThisYear - diff) +
                        'px;"><div class="fn-label">' +
                        year +
                        '</div></div>');
                    year++;
                    scaleUnitsThisYear = diff;
                }
                scaleUnitsThisYear++;

                // Fill months
                if (rday.getMonth() !== month) {
                    // partial weeks to subtract from month header
                    diff = rday.getDate() - 1;
                    // offset one week if week starts in last month
                    //diff -= (diff <= 6) ? 0 : 7;
                    diff /= 7;
                    monthArr.push(
                        '<div class="row month" style="width:' +
                        tools.getCellSize() * (scaleUnitsThisMonth - diff) +
                        'px;"><div class="fn-label">' +
                        settings.months[month] +
                        '</div></div>');
                    month = rday.getMonth();
                    scaleUnitsThisMonth = diff;
                }
                scaleUnitsThisMonth++;

                // Fill weeks
                dayArr.push(
                    '<div class="row day wd"' +
                    ' id="' + DatePrototype.getWeekId(rday) +
                    '" data-offset="' + i * tools.getCellSize() +
                    '" data-repdate="' + DatePrototype.getRepDate(rday, settings.scale) + '">' +
                    '<div class="fn-label">' + week + '</div></div>');
            }

            // Last year
            yearArr.push(
                '<div class="row year" style="width: ' +
                tools.getCellSize() * scaleUnitsThisYear + 'px;"><div class="fn-label">' +
                year +
                '</div></div>');

            // Last month
            monthArr.push(
                '<div class="row month" style="width: ' +
                tools.getCellSize() * scaleUnitsThisMonth + 'px"><div class="fn-label">' +
                settings.months[month] +
                '</div></div>');

            dataPanel = core.dataPanel(element, dataPanelWidth);

            // Append panel elements
            dataPanel.append(
                $row.clone().html(yearArr.join("")),
                $row.clone().html(monthArr.join("")),
                $row.clone().html(dayArr.join(""))
            );
            break;

        // **Months**
        case 'months':
            element.dateStart = moment(element.dateStart).toDate();
            element.dateEnd = moment(element.dateEnd).toDate();

            range = tools.parseMonthsRange(element.dateStart, element.dateEnd);
            dataPanelWidth = range.length * tools.getCellSize();

            year = range[0].getFullYear();
            month = range[0].getMonth();

            for (i = 0, len = range.length; i < len; i++) {
                rday = range[i];

                // Fill years
                if (rday.getFullYear() !== year) {
                    yearArr.push(
                        '<div class="row year" style="width: ' +
                        tools.getCellSize() * scaleUnitsThisYear +
                        'px;"><div class="fn-label">' +
                        year +
                        '</div></div>');
                    year = rday.getFullYear();
                    scaleUnitsThisYear = 0;
                }
                scaleUnitsThisYear++;
                monthArr.push(
                    '<div class="row day wd" id="dh-' + tools.genId(rday) +
                    '" data-offset="' + i * tools.getCellSize() +
                    '" data-repdate="' + DatePrototype.getRepDate(rday, settings.scale) + '">' +
                    (1 + rday.getMonth()) + '</div>');
            }

            // Last year
            yearArr.push(
                '<div class="row year" style="width: ' +
                tools.getCellSize() * scaleUnitsThisYear + 'px;"><div class="fn-label">' +
                year +
                '</div></div>');

            dataPanel = core.dataPanel(element, dataPanelWidth);

            // Append panel elements
            dataPanel.append(
                $row.clone().html(yearArr.join("")),
                $row.clone().html(monthArr.join(""))
            );
            break;

        // **Days (default)**
        default:
            element.dateStart = moment(element.dateStart).toDate();
            element.dateEnd = moment(element.dateEnd).toDate();

            range = tools.parseDateRange(element.dateStart, element.dateEnd);
            dataPanelWidth = range.length * tools.getCellSize();

            year = range[0].getFullYear();
            month = range[0].getMonth();

            for (i = 0, len = range.length; i < len; i++) {
                rday = range[i];

                // Fill years
                if (rday.getFullYear() !== year) {
                    yearArr.push(
                        '<div class="row year" style="width:' +
                        tools.getCellSize() * scaleUnitsThisYear +
                        'px;"><div class="fn-label">' +
                        year +
                        '</div></div>');
                    year = rday.getFullYear();
                    scaleUnitsThisYear = 0;
                }
                scaleUnitsThisYear++;

                // Fill months
                if (rday.getMonth() !== month) {
                    monthArr.push(
                        '<div class="row month" style="width:' +
                        tools.getCellSize() * scaleUnitsThisMonth +
                        'px;"><div class="fn-label">' +
                        settings.months[month] +
                        '</div></div>');
                    month = rday.getMonth();
                    scaleUnitsThisMonth = 0;
                }
                scaleUnitsThisMonth++;

                day = rday.getDay();

                if (tools.isHoliday(rday)) {
                    dayClass = "holiday";
                }

                dayArr.push(
                    '<div class="row date ' + dayClass + '"' +
                    ' id="dh-' + tools.genId(rday) +
                    '" data-offset="' + i * tools.getCellSize() +
                    '" data-repdate="' + DatePrototype.getRepDate(rday, settings.scale) + '">' +
                    '<div class="fn-label">' + rday.getDate() + '</div></div>');
                if (settings.dow[day] === settings.dow[0] || settings.dow[day] === settings.dow[6]) {

                    dowArr.push(
                        '<div style="color: #fff;background-color: rgb(0, 0, 0);z-index: 30;border: 0" class="row vh-100 day ' + dayClass + '"' +
                        ' id="dw-' + tools.genId(rday) +
                        '" data-repdate="' + DatePrototype.getRepDate(rday, settings.scale) + '">' +
                        '<div class="fn-label">' + settings.dow[day] + '</div></div>');
                } else {
                    dowArr.push(
                        '<div class="row day ' + dayClass + '"' +
                        ' id="dw-' + tools.genId(rday) +
                        '" data-repdate="' + DatePrototype.getRepDate(rday, settings.scale) + '">' +
                        '<div class="fn-label">' + settings.dow[day] + '</div></div>');
                }
            } //for

            // Last year
            yearArr.push(
                '<div class="row year" style="width: ' +
                tools.getCellSize() * scaleUnitsThisYear + 'px;"><div class="fn-label">' +
                year +
                '</div></div>');

            // Last month
            monthArr.push(
                '<div class="row month" style="width: ' +
                tools.getCellSize() * scaleUnitsThisMonth + 'px"><div class="fn-label">' +
                settings.months[month] +
                '</div></div>');

            dataPanel = core.dataPanel(element, dataPanelWidth);

            // Append panel elements
            dataPanel.append(
                $row.clone().html(yearArr.join("")),
                $row.clone().html(monthArr.join("")),
                $row.clone().html(dayArr.join("")),
                $row.clone().html(dowArr.join(""))
            );
    }

    const panel = $('<div class="rightPanel"></div>');
    panel.css({overflowX: 'scroll', cursor: 'grab'});

    let pos = {top: 0, left: 0, x: 0, y: 0};

    const mouseDownHandler = function (e) {
        panel.css({cursor: 'grabbing', userSelect: 'none'});

        pos = {
            left: panel.scrollLeft(),
            top: panel.scrollTop(),
            x: e.clientX,
        };

        panel.mousemove = mouseMoveHandler;
        panel.mouseup = mouseUpHandler;
        $(document).on('mousemove', mouseMoveHandler);
        $(document).on('mouseup', mouseUpHandler);
    };

    const mouseMoveHandler = function (e) {
        const dx = e.clientX - pos.x;

        panel.scrollTop(0);
        panel.scrollLeft(pos.left - dx);
    };

    const mouseUpHandler = function () {
        panel.css({cursor: 'grab'});
        panel.prop('style').removeProperty('user-select');
        $(document).off('mousemove mouseup');
    };

    // Attach the handler
    panel.on('mousedown', mouseDownHandler);
    return panel.append(dataPanel);
}


export const fillData = (element, datapanel) => {


    let cellWidth = tools.getCellSize();
    let barOffset = (cellWidth - 18) / 2;
    let dataPanelWidth = datapanel.width();
    let invertColor = function (colStr) {
        try {
            colStr = colStr.replace("rgb(", "").replace(")", "");
            let rgbArr = colStr.split(",");
            let R = parseInt(rgbArr[0], 10);
            let G = parseInt(rgbArr[1], 10);
            let B = parseInt(rgbArr[2], 10);
            let gray = Math.round((255 - (0.299 * R + 0.587 * G + 0.114 * B)) * 0.9);
            return "rgb(" + gray + ", " + gray + ", " + gray + ")";
        } catch (err) {
            return "";
        }
    };
    element.data.forEach((day, j) => {
        let _bar;
        let from, to, cFrom, cTo, dFrom, dTo, dl, dp;
        let topEl, top;
        const backgroundInterneS = '#086d00';
        const backgroundExterneS = '#4c4848';
        const backgroundExterneR = '#773a04';
        const backgroundInterneR = '#ee2f2f';

        let bs, br;
        if (day.inex === 'Externe') {
            bs = backgroundExterneS
            br = backgroundExterneR
        } else {
            bs = backgroundInterneS
            br = backgroundInterneR
        }

        switch (settings.scale) {
            case "hours":
                dFrom = tools.genId(day.dayES, element.scaleStep);
                from = $(element).find('#dh-' + dFrom);

                dTo = tools.genId(day.dayEE, element.scaleStep);
                to = $(element).find('#dh-' + dTo);
                cFrom = from.data("offset");
                cTo = to.data("offset");
                dl = Math.floor((cTo - cFrom) / cellWidth) + 1;
                dp = 100 * (cellWidth * dl - 1) / dataPanelWidth;
                _bar = core.createProgressBar('', day.desc, day.customClass, day.dataObj);

                // find row
                topEl = $(element).find("#rowheader" + j);
                top = barOffset + topEl[0].offsetTop - 3;
                _bar.css({
                    top: top,
                    left: Math.floor(cFrom),
                    width: dp + '%',
                    background: bs
                });

                datapanel.append(_bar);

                dFrom = tools.genId(day.dayRS, element.scaleStep);
                from = $(element).find('#dh-' + dFrom);
                dTo = tools.genId(day.dayRE, element.scaleStep);
                to = $(element).find('#dh-' + dTo);
                cFrom = from.data("offset");
                cTo = to.data("offset");
                dl = Math.floor((cTo - cFrom) / cellWidth) + 1;
                dp = 100 * (cellWidth * dl - 1) / dataPanelWidth;

                _bar = core.createProgressBar('', day.desc, day.customClass, day.dataObj);

                // find row
                topEl = $(element).find("#rowheader" + j);
                top = barOffset + topEl[0].offsetTop + 22;
                _bar.css({
                    top: top,
                    left: Math.floor(cFrom),
                    width: dp + '%',
                    backgroundColor: br
                });

                datapanel.append(_bar);
                break;
            case "weeks":
                dFrom = moment(day.dayES).toDate();
                dTo = moment(day.dayEE).toDate();
                from = $(element).find("#" + DatePrototype.getWeekId(dFrom));
                cFrom = from.data("offset");

                to = $(element).find("#" + DatePrototype.getWeekId(dTo));
                cTo = to.data("offset");
                dl = Math.round((cTo - cFrom) / cellWidth) + 1;
                dp = 100 * (cellWidth * dl - 1) / dataPanelWidth;

                _bar = core.createProgressBar('', day.desc, day.customClass, day.dataObj);

                // find row
                topEl = $(element).find("#rowheader" + j);
                top = barOffset + topEl[0].offsetTop - 3;


                _bar.css({
                    top: top,
                    left: Math.floor(cFrom),
                    width: dp + '%',
                    background: bs
                });

                datapanel.append(_bar);

                dFrom = moment(day.dayRS).toDate();

                dTo = moment(day.dayRE).toDate();

                from = $(element).find("#" + DatePrototype.getWeekId(dFrom));
                cFrom = from.data("offset");
                to = $(element).find("#" + DatePrototype.getWeekId(dTo));
                cTo = to.data("offset");
                dl = Math.round((cTo - cFrom) / cellWidth) + 1;
                dp = 100 * (cellWidth * dl - 1) / dataPanelWidth;

                _bar = core.createProgressBar('', day.desc, day.customClass, day.dataObj);

                // find row
                topEl = $(element).find("#rowheader" + j);
                top = barOffset + topEl[0].offsetTop + 22;
                _bar.css({
                    top: top,
                    left: Math.floor(cFrom),
                    width: dp + '%',
                    backgroundColor: br
                });

                datapanel.append(_bar);
                break;
            case "months":

                dFrom = moment(day.dayES).toDate();
                dTo = moment(day.dayEE).toDate();

                if (dFrom.getDate() <= 3 && dFrom.getMonth() === 0) {
                    dFrom.setDate(dFrom.getDate() + 4);
                }

                if (dFrom.getDate() <= 3 && dFrom.getMonth() === 0) {
                    dFrom.setDate(dFrom.getDate() + 4);
                }

                if (dTo.getDate() <= 3 && dTo.getMonth() === 0) {
                    dTo.setDate(dTo.getDate() + 4);
                }

                from = $(element).find("#dh-" + tools.genId(dFrom));
                cFrom = from.data("offset");
                to = $(element).find("#dh-" + tools.genId(dTo));
                cTo = to.data("offset");
                dl = Math.round((cTo - cFrom) / cellWidth) + 1;
                dp = 100 * (cellWidth * dl - 1) / dataPanelWidth;

                _bar = core.createProgressBar('', day.desc, day.customClass, day.dataObj);

                // find row
                topEl = $(element).find("#rowheader" + j);
                top = barOffset + topEl[0].offsetTop - 3;
                _bar.css({
                    top: top,
                    left: Math.floor(cFrom),
                    width: dp + '%',
                    background: bs
                });

                datapanel.append(_bar);
                //----------------------------------------------
                dFrom = moment(day.dayRS).toDate();
                dTo = moment(day.dayRE).toDate();

                if (dFrom.getDate() <= 3 && dFrom.getMonth() === 0) {
                    dFrom.setDate(dFrom.getDate() + 4);
                }

                if (dFrom.getDate() <= 3 && dFrom.getMonth() === 0) {
                    dFrom.setDate(dFrom.getDate() + 4);
                }

                if (dTo.getDate() <= 3 && dTo.getMonth() === 0) {
                    dTo.setDate(dTo.getDate() + 4);
                }

                from = $(element).find("#dh-" + tools.genId(dFrom));
                cFrom = from.data("offset");
                to = $(element).find("#dh-" + tools.genId(dTo));
                cTo = to.data("offset");
                dl = Math.round((cTo - cFrom) / cellWidth) + 1;
                dp = 100 * (cellWidth * dl - 1) / dataPanelWidth;

                _bar = core.createProgressBar('-', day.desc, day.customClass, day.dataObj);

                // find row
                topEl = $(element).find("#rowheader" + j);
                top = barOffset + topEl[0].offsetTop + 22;
                _bar.css({
                    top: top,
                    left: Math.floor(cFrom),
                    width: dp + '%',
                    backgroundColor: br
                });

                datapanel.append(_bar);
                break;
            default:
                dFrom = moment(day.dayES).valueOf();
                dTo = moment(day.dayEE).valueOf();
                from = $(element).find("#dh-" + dFrom);
                let findids = document.getElementsByClassName("header row").item(2);
                let id = dFrom.toString().substring(0, 5);
                let is = [...findids?.childNodes]?.map(x => x.id).find(x => x.includes(id));
                if (from.length === 0) {
                    from = $(element).find("#" + is);
                }
                cFrom = from.data("offset");
                dl = Math.round((dTo - dFrom) / Tools.UTC_DAY_IN_MS) + 1;
                dp = 100 * (cellWidth * dl - 1) / dataPanelWidth;

                _bar = core.createProgressBar('', day.desc, day.name, day.dataObj);

                // find row
                topEl = $(element).find("#rowheader" + j);
                top = barOffset + topEl[0].offsetTop - 2;


                _bar.css({
                    top: top,
                    left: Math.floor(cFrom),
                    width: dp + '%',
                    background: bs
                });
                datapanel.append(_bar);
                let $l = _bar.find(".fn-label");
                if ($l.length) {
                    let gray = invertColor(_bar.css('backgroundColor'));
                    $l.css("color", gray);
                }
                dFrom = moment(day.dayRS).valueOf();
                dTo = moment(day.dayRE).valueOf();
                from = $(element).find("#dh-" + dFrom);
                findids = document.getElementsByClassName("header row").item(2);
                id = dFrom.toString().substring(0, 5);
                is = [...findids.childNodes].map(x => x.id).find(x => x.includes(id));
                if (from.length === 0) {
                    from = $(element).find("#" + is);
                }
                cFrom = from.data("offset");
                dl = Math.round((dTo - dFrom) / Tools.UTC_DAY_IN_MS) + 1;
                dp = 100 * (cellWidth * dl - 1) / dataPanelWidth;


                _bar = core.createProgressBar('', day.desc, day.name, day.dataObj);
                // find row
                topEl = $(element).find("#rowheader" + j);
                top = barOffset + topEl[0].offsetTop + 22;
                _bar.css({
                    top: top,
                    left: Math.floor(cFrom),
                    width: dp + '%',
                    backgroundColor: br
                });
                datapanel.append(_bar);
        }


        const prev = _bar[0].previousElementSibling;
        if (bs === '#4c4848') $(prev).css({color: "#fff", height: "21px"})
        else $(prev).css({color: "#fff", height: "21px"})
        $(_bar[0]).css({color: "#fff", height: "21px"})

        let joursReel;
        let joursEstime
        if (element.typeFor === "global") {
            joursEstime = moment(day.dayEE).diff(day.dayES, 'days') + 1;
            joursReel = moment(day.dayRE).diff(day.dayRS, 'days') + 1;
        } else if (element.typeFor === "details" || element.typeFor === "general") {
            joursEstime = day.realJest;
            joursReel = day.realJreel;
        } else {
            joursEstime = 0;
            joursReel = 0;
        }


        const popover = (ele) => {
            if (day.inex === "Externe") {
                $(ele).popover({
                    content: `<div>
                        <div class="d-flex">
                            <div class="col">Jours Estimé :</div>
                            <div class="col-xs">${joursEstime}</div>
                        </div>
                        <div class="d-flex">
                            <div class="col">Jours Reél :</div>
                            <div class="col-xs">${joursReel}</div>
                        </div>
                      </div>`,
                    html: true,
                    trigger: 'hover',
                    placement: 'bottom'
                })
            } else {
                $(ele).popover({
                    content: `<div>
                        <div class="d-flex">
                            <div class="col">Jours Estimé :</div>
                            <div class="col-xs">${joursEstime}</div>
                        </div>
                        <div class="d-flex">
                            <div class="col">Jours Reél :</div>
                            <div class="col-xs">${joursReel}</div>
                        </div>
                        <div class="d-flex">
                            <div class="col">Heurs Estimé :</div>
                            <div class="col-xs">${day.percent}</div>
                        </div>
                        <div class="d-flex">
                            <div class="col">Heurs Reél :</div>
                            <div class="col-xs">${day.hoursReel}</div>
                        </div>
                      </div>`,
                    html: true,
                    trigger: 'hover',
                    placement: 'bottom'
                })
            }
        }


        popover(prev);
        popover(_bar);


    })

}


export const createProgressBar = (label, desc, classNames, dataObj) => {
    if (label.includes("undefined")) label = label.substring(0, 1);
    label = label || "";
    let bar = $('<div class="bar">' + label + '</div>')
        .data("dataObj", dataObj);
    if (desc) {
        bar
            .mouseenter(function (e) {
                let hint = $('<div class="fn-gantt-hint" />').html(desc);
                $("body").append(hint);
                hint.css("left", e.pageX);
                hint.css("top", e.pageY);
                hint.show();
            })
            .mouseleave(function () {
                $(".fn-gantt-hint").remove();
            })
            .mousemove(function (e) {
                const hint = $(".fn-gantt-hint");
                hint.css("left", e.pageX);
                hint.css("top", e.pageY + 15);
            });
    }
    return bar;
}
