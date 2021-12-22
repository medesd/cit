import $ from 'jquery';
import moment from "moment";

let settings = {
    source: [],
    typeFor: "details",
    holidays: [],
    itemsPerPage: 30,
    dow: ["D", "L", "M", "M", "J", "V", "S"],
    months: ["Janvier", "Février", "Mars", "Avril", "Mai", "Juin", "Juillet", "Août", "September", "Octobre", "Novembre", "Décembre"],
    waitText: "Please wait...",
    // navigation
    navigate: "scroll",
    date: moment().valueOf(),
    scrollToToday: true,
    // cookie options
    useCookie: false,
    cookieKey: "jquery.fn.gantt",
    // scale parameters
    scale: "days",
    maxScale: "months",
    minScale: "hours",
    onRender: $.noop
};
export default settings;
