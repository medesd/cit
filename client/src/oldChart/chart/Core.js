import * as controller from "./controller";
import $ from 'jquery';
import * as ChartForType from './ChartForType';

let core = {
    elementFromPoint: (function () {
        if (document.compatMode === "CSS1Compat") {
            return function (x, y) {
                x -= window.pageXOffset;
                y -= window.pageYOffset;
                return document.elementFromPoint(x, y);
            };
        }
        return function (x, y) {
            x -= $(document).scrollLeft();
            y -= $(document).scrollTop();
            return document.elementFromPoint(x, y);
        };
    })(),
    create: controller.create,
    init: controller.init,
    render: controller.render,
    leftPanel: ChartForType.leftPanel,
    dataPanel: controller.dataPanel,
    rightPanel: ChartForType.rightPanel,
    navigation: controller.navigation,
    createProgressBar: ChartForType.createProgressBar,
    fillData: ChartForType.fillData,
    zoomInOut: controller.zoomInOut,
    waitToggle: controller.waitToggle
};

export default core;
