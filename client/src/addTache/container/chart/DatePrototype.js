import * as Tools from "./DateTools";

let firstDay = 1; // ISO week starts with Monday (1); use Sunday (0) for, e.g., North America
let weekOneDate = 4;


export const getWeekId = (rday) => {
    let y = rday.getFullYear();
    let w = getWeekOfYear(rday);
    let m = rday.getMonth();
    if (m === 11 && w === 1) {
        y++;
    } else if (!m && w > 51) {
        y--;
    }
    return 'dh-' + y + "-" + w;
};


export const getRepDate = (d, scale) => {
    switch (scale) {
        case "hours":
            return d.getTime();
        case "weeks":
            return getDayForWeek(d).getTime();
        case "months":
            return new Date(d.getFullYear(), d.getMonth(), 1).getTime();
        case "days":
        /* falls through */
        default:
            return d.getTime();
    }
};

export const getDayOfYear = (d) => {
    let year = d.getFullYear();
    return (Date.UTC(year, d.getMonth(), d.getDate()) -
        Date.UTC(year, 0, 0)) / Tools.UTC_DAY_IN_MS;
};

export const getWeekOfYear = (d) => {
    let year = d.getFullYear(),
        month = d.getMonth(),
        date = d.getDate(),
        day = d.getDay();
    //let diff = weekOneDate - day + 7 * (day < firstDay ? -1 : 1);
    let diff = weekOneDate - day;
    if (day < firstDay) {
        diff -= 7;
    }
    if (diff + 7 < weekOneDate - firstDay) {
        diff += 7;
    }
    return Math.ceil(getDayOfYear(new Date(year, month, date + diff)) / 7);
};

export const getDayForWeek = (d) => {
    let day = d.getDay();
    let diff = (day < firstDay ? -7 : 0) + firstDay - day;
    return new Date(d.getFullYear(), d.getMonth(), d.getDate() + diff);
};
