import jQuery from 'jquery'
import * as Tools from './DateTools';
import './DatePrototype';
import settings from "./Settings";
import core from "./Core";


(function ($) {
    $.expr.pseudos.findday = $.expr.createPseudo ?
        $.expr.createPseudo(function (text) {
            return function (elt) {
                return Tools.findDay(elt, text);
            };
        }) :
        function (elt, i, match) {
            return Tools.findDay(elt, match[3]);
        };

    $.expr.pseudos.findweek = $.expr.createPseudo ?
        $.expr.createPseudo(function (text) {
            return function (elt) {
                return Tools.findWeek(elt, text);
            };
        }) :
        function (elt, i, match) {
            return Tools.findWeek(elt, match[3]);
        };


    $.expr[':'].findmonth = $.expr.createPseudo ?
        $.expr.createPseudo(function (text) {
            return function (elt) {
                return Tools.findMonth(elt, text);
            };
        }) :
        function (elt, i, match) {
            return Tools.findMonth(elt, match[3]);
        };
    $.fn.gantt = function (options) {

        $.extend(settings, options);

        settings.useCookie = settings.useCookie && $.isFunction($.cookie);


        this.each(function () {
            this.data = null;
            this.pageNum = 0;
            this.rowsNum = 0;
            this.hPosition = 0;
            this.dateStart = null;
            this.dateEnd = null;
            this.scaleOldWidth = null;
            this.headerRows = null;
            this.typeFor = null;

            if (settings.useCookie) {
                let sc = $.cookie(settings.cookieKey + "CurrentScale");
                if (sc) {
                    settings.scale = sc;
                } else {
                    $.cookie(settings.cookieKey + "CurrentScale", settings.scale);
                }
            }

            switch (settings.scale) {
                case "hours":
                    this.headerRows = 5;
                    this.scaleStep = 1;
                    break;
                case "weeks":
                    this.headerRows = 3;
                    this.scaleStep = 13;
                    break;
                case "months":
                    this.headerRows = 2;
                    this.scaleStep = 14;
                    break;
                case "days":
                /* falls through */
                default:
                    this.headerRows = 4;
                    this.scaleStep = 13;
            }

            this.scrollNavigation = {
                panelMouseDown: false,
                scrollerMouseDown: false,
                mouseX: null,
                panelMargin: 0,
                repositionDelay: 0,
                panelMaxPos: 0,
                canScroll: true
            };

            this.gantt = null;
            this.loader = null;

            core.create(this);

        });

    };
})(jQuery);
