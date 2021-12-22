import $ from 'jquery';
import settings from "./Settings";
import scales from "./scales";
import core from "./Core";
import moment from "moment";
import "popper.js"
import "bootstrap/dist/js/bootstrap.min";

export const waitToggle = (element, showCallback) => {


    if (typeof showCallback === "function") {
        let $elt = $(element);

        if (!element.loader) {
            element.loader = $('<div class="fn-gantt-loader">' +
                '<div class="fn-gantt-loader-spinner"><span>' + settings.waitText + '</span></div></div>');
        }
        $elt.append(element.loader);
        setTimeout(showCallback, 500);

    } else if (element.loader) {
        element.loader.detach();
    }
}

export const zoomInOut = (element, val) => {
    core.waitToggle(element, function () {

        let zoomIn = (val < 0);
        let scaleSt = element.scaleStep + val * 3;
        // adjust hour scale to desired factors of 24
        scaleSt = {4: 3, 5: 6, 9: 8, 11: 12}[scaleSt] || (scaleSt < 1 ? 1 : scaleSt);
        let scale = settings.scale;
        let headerRows = element.headerRows;
        if (settings.scale === "hours" && scaleSt >= 13) {
            scale = "days";
            headerRows = 4;
            scaleSt = 13;
        } else if (settings.scale === "days" && zoomIn) {
            scale = "hours";
            headerRows = 5;
            scaleSt = 12;
        } else if (settings.scale === "days" && !zoomIn) {
            scale = "weeks";
            headerRows = 3;
            scaleSt = 13;
        } else if (settings.scale === "weeks" && !zoomIn) {
            scale = "months";
            headerRows = 2;
            scaleSt = 14;
        } else if (settings.scale === "weeks" && zoomIn) {
            scale = "days";
            headerRows = 4;
            scaleSt = 13;
        } else if (settings.scale === "months" && zoomIn) {
            scale = "weeks";
            headerRows = 3;
            scaleSt = 13;
        }

        // do nothing if attempting to zoom past max/min
        if ((zoomIn && $.inArray(scale, scales) < $.inArray(settings.minScale, scales)) ||
            (!zoomIn && $.inArray(scale, scales) > $.inArray(settings.maxScale, scales))) {
            core.init(element);
            return;
        }

        element.scaleStep = scaleSt;
        settings.scale = scale;
        element.headerRows = headerRows;
        let $rightPanel = $(element).find(".fn-gantt .rightPanel");
        let $dataPanel = $rightPanel.find(".dataPanel");
        element.hPosition = $dataPanel.css("left").replace("px", "");
        element.scaleOldWidth = ($dataPanel.width() - $rightPanel.width());

        if (settings.useCookie) {
            $.cookie(settings.cookieKey + "CurrentScale", settings.scale);
            // reset scrollPos
            $.cookie(settings.cookieKey + "ScrollPos", null);
        }
        core.init(element);
    });
}


export const navigation = (element) => {
    const ganttNavigate = $('<div class="navigate p-3 w-100 d-flex justify-content-center" />')
        .append($('<div class="d-flex" />')
            .append($('<div class="d-flex" />')
                .append(element.typeFor === "details" ? $('<div class="col-xs mx-3"><span class="btn btn-secondary"></span> Jours Estimé (Externe)</div>') : null)
                .append(element.typeFor === "details" ? $('<div class="col-xs mx-3"><span style="background-color: #773A04" class="btn"></span> Jours Reél (Externe)</div>') : null)
                .append($('<div class="col-xs mx-3"><span class="btn btn-danger"></span> Jours Reél</div>'))
                .append($('<div class="col-xs mx-3"><span class="btn btn-success"></span> Jours Estimé</div>'))
            ).append($('<div class="nav-slider-left d-flex flex-nowrap" />')
                .append($('<button type="button" class="nav-link nav-zoomIn"/>')
                    .html('&#43;')
                    .click(function () {
                        core.zoomInOut(element, -1);
                    }))
                .append($('<button type="button" class="nav-link nav-zoomOut"/>')
                    .html('&#45;')
                    .click(function () {
                        core.zoomInOut(element, 1);
                    }))
            )
        );
    return $('<div class="bottom d-flex justify-content-center"></div>').append(ganttNavigate);
}


export const dataPanel = (element, width) => {
    return $('<div class="dataPanel" style="width: ' + width + 'px;"/>');
}

export const render = (element) => {
    let content = $('<div class="fn-content"/>');
    let $leftPanel = core.leftPanel(element);
    content.append($leftPanel);
    let $rightPanel = core.rightPanel(element);

    content.append($rightPanel);
    content.append(core.navigation(element));

    let $dataPanel = $rightPanel.find(".dataPanel");

    element.gantt = $('<div class="fn-gantt" />').append(content);

    $(element).empty().append(element.gantt);

    element.scrollNavigation.panelMargin = parseInt($dataPanel.css("left").replace("px", ""), 10);
    element.scrollNavigation.panelMaxPos = ($dataPanel.width() - $rightPanel.width());

    element.scrollNavigation.canScroll = ($dataPanel.width() > $rightPanel.width());


    core.fillData(element, $dataPanel);

    $dataPanel.css({height: $leftPanel.height()});
    core.waitToggle(element);
    settings.onRender();
}

export const init = (element) => {
    element.rowsNum = element.data.length;
    element.pageCount = Math.ceil(element.rowsNum / settings.itemsPerPage);
    element.rowsOnLastPage = element.rowsNum - (Math.floor(element.rowsNum / settings.itemsPerPage) * settings.itemsPerPage);


    const dates = [...element.data.map(f => f.dayEE), ...element.data.map(f => f.dayRE), ...element.data.map(f => f.dayRS), ...element.data.map(f => f.dayES)];


    const max = Math.max(...dates);
    const min = Math.min(...dates);


    element.dateStart = moment(min).toDate();
    element.dateEnd = moment(max).toDate();
    element.typeFor = settings.typeFor;


    core.waitToggle(element, function () {
        core.render(element);
    });
}

export const create = (element) => {

    // Initialize data with a json object or fetch via an xhr
    // request depending on `settings.source`
    if (typeof settings.source !== "string") {
        element.data = settings.source;
        core.init(element);
    } else {
        $.getJSON(settings.source, function (jsData) {

            element.data = jsData;
            core.init(element);
        });
    }
}
