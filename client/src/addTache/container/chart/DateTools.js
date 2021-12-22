import $ from 'jquery';
import * as DatePrototype from './DatePrototype';

export let UTC_DAY_IN_MS = 24 * 60 * 60 * 1000;

export const findWeek = (elt, text) => {
    let cd = new Date(parseInt(text, 10));
    let y = cd.getFullYear();
    let w = DatePrototype.getWeekOfYear(cd);
    let m = cd.getMonth();
    if (m === 11 && w === 1) {
        y++;
    } else if (!m && w > 51) {
        y--;
    }
    cd = y + "-" + w;
    let id = $(elt).attr("id") || "";
    let si = id.indexOf("-") + 1;
    let ed = id.substring(si, id.length);
    return cd === ed;
}

export const findMonth = (elt, text) => {
    let cd = new Date(parseInt(text, 10));
    cd = cd.getFullYear() + "-" + cd.getMonth();
    let id = $(elt).attr("id") || "";
    let si = id.indexOf("-") + 1;
    let ed = id.substring(si, id.length);
    return cd === ed;
}


export const findDay = (elt, text) => {
    let cd = new Date(parseInt(text, 10));
    cd.setHours(0, 0, 0, 0);
    let id = $(elt).attr("id") || "";
    let si = id.indexOf("-") + 1;
    let ed = new Date(parseInt(id.substring(si, id.length), 10));
    ed.setHours(0, 0, 0, 0);
    return cd.getTime() === ed.getTime();
}