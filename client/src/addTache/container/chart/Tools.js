import $ from 'jquery';
import settings from "./Settings";
import * as DatePrototype from './DatePrototype';

let tools = {


    // Return an array of Date objects between `from` and `to`
    parseDateRange: (from, to) => {
        let year = from.getFullYear();
        let month = from.getMonth();
        let date = from.getDate();
        let range = [], i = 0;
        do {
            range[i] = new Date(year, month, date + i);
        } while (range[i++] < to);
        return range;
    },

    // Return an array of Date objects between `from` and `to`,
    // scaled hourly
    parseTimeRange: (from, to, scaleStep) => {
        let year = from.getFullYear();
        let month = from.getMonth();
        let date = from.getDate();
        let hour = from.getHours();
        hour -= hour % scaleStep;
        let range = [], h = 0, i = 0;
        do {
            range[i] = new Date(year, month, date, hour + h++ * scaleStep);
            // overwrite any hours repeated due to DST changes
            if (i > 0 && range[i].getHours() === range[i - 1].getHours()) {
                i--;
            }
        } while (range[i++] < to);
        return range;
    },

    // Return an array of Date objects between a range of weeks
    // between `from` and `to`
    parseWeeksRange: (from, to) => {
        let current = DatePrototype.getDayForWeek(from);

        let ret = [];
        let i = 0;
        do {
            ret[i++] = DatePrototype.getDayForWeek(current);
            current.setDate(current.getDate() + 7);
        } while (current <= to);

        return ret;
    },


    // Return an array of Date objects between a range of months
    // between `from` and `to`
    parseMonthsRange: (from, to) => {
        let current = new Date(from);

        let ret = [];
        let i = 0;
        do {
            ret[i++] = new Date(current.getFullYear(), current.getMonth(), 1);
            current.setMonth(current.getMonth() + 1);
        } while (current <= to);

        return ret;
    },

    // Deserialize a date from a string or integer
    dateDeserialize: (date) => {
        if (typeof date === "string") {
            date = date.replace(/\/Date\((.*)\)\//, "$1");
            date = $.isNumeric(date) ? parseInt(date, 10) : $.trim(date);
        }
        return new Date(date);
    },

    // Generate an id for a date
    genId: function (t) { // varargs
        if ($.isNumeric(t)) {
            t = new Date(t);
        }
        switch (settings.scale) {
            case "hours":
                let hour = t.getHours();
                if (arguments.length >= 2) {
                    hour = (Math.floor(t.getHours() / arguments[1]) * arguments[1]);
                }
                return (new Date(t.getFullYear(), t.getMonth(), t.getDate(), hour)).getTime();
            case "weeks":
                let y = t.getFullYear();
                let w = t.getWeekOfYear();
                let m = t.getMonth();
                if (m === 11 && w === 1) {
                    y++;
                } else if (!m && w > 51) {
                    y--;
                }
                return y + "-" + w;
            case "months":
                return t.getFullYear() + "-" + t.getMonth();
            case "days":
            /* falls through */
            default:
                return (new Date(t.getFullYear(), t.getMonth(), t.getDate())).getTime();
        }
    },

    // normalizes an array of dates into a map of start-of-day millisecond values
    _datesToDays: function (dates) {
        let dayMap = {};
        for (let i = 0, len = dates.length, day; i < len; i++) {
            day = tools.dateDeserialize(dates[i]);
            dayMap[day.setHours(0, 0, 0, 0)] = true;
        }
        return dayMap;
    },
    // Returns true when the given date appears in the array of holidays, if provided
    isHoliday: (function () { // IIFE
        // short-circuits the function if no holidays option was passed
        if (!settings.holidays || !settings.holidays.length) {
            return function () {
                return false;
            };
        }
        let holidays = false;
        // returns the function that will be used to check for holidayness of a given date
        return function (date) {
            if (!holidays) {
                holidays = tools._datesToDays(settings.holidays);
            }
            return !!holidays[
                // assumes numeric dates are already normalized to start-of-day
                $.isNumeric(date) ?
                    date :
                    (new Date(date.getFullYear(), date.getMonth(), date.getDate())).getTime()
                ];
        };
    })(),

    // Get the current cell height
    getCellSize: function () {
        if (typeof tools._getCellSize === "undefined") {
            let measure = $('<div style="display: none; position: absolute;" class="fn-gantt"><div class="row"></div></div>');
            $("body").append(measure);
            tools._getCellSize = measure.find(".row").height();
            measure.empty().remove();
        }
        return tools._getCellSize;
    },
};
export default tools;
