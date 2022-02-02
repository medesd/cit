import React, {useEffect, useState} from 'react';
/*import ReactTooltip from "react-tooltip";*/
import moment from "moment";
import {Tooltip} from "antd";


const FillData = ({data, start, scale, excludeToolTip}) => {
    const [barPosition, setBarPosition] = useState();

    const [dataPresent, setDataPresent] = useState(0);


    useEffect(() => {
        const fillData = [];
        data.forEach(x => {
            if (x.dayRE < x.dayRS || x.dayEE < x.dayES) {
                console.error(`End Date must greater then Start Date`)
                return;
            }

            let leftEst;
            let widthCalc;
            let startItem;


            switch (scale) {
                case "month":
                    leftEst = document.getElementById(moment(x.dayES.valueOf()).format("MM-YYYY"))?.offsetLeft;
                    widthCalc = document.getElementById(moment(x.dayEE.valueOf()).format("MM-YYYY"))?.offsetLeft;
                    startItem = document.getElementById(start.format('MM-YYYY'))?.offsetLeft;
                    break;
                case "year":
                    leftEst = document.getElementById(moment(x.dayES.valueOf()).format("YYYY"))?.offsetLeft;
                    widthCalc = document.getElementById(moment(x.dayEE.valueOf()).format("YYYY"))?.offsetLeft;
                    startItem = document.getElementById(start.format('YYYY'))?.offsetLeft;
                    break;
                case "day":
                    leftEst = document.getElementById(moment(x.dayES.valueOf()).format("DD-MM-YYYY"))?.offsetLeft;
                    widthCalc = document.getElementById(moment(x.dayEE.valueOf()).format("DD-MM-YYYY"))?.offsetLeft;
                    startItem = document.getElementById(start.clone().format('DD-MM-YYYY'))?.offsetLeft;
                    break;
                default:
                    leftEst = document.getElementById(moment(x.dayES.valueOf()).format("DD-MM-YYYY"))?.offsetLeft;
                    widthCalc = document.getElementById(moment(x.dayEE.valueOf()).format("DD-MM-YYYY"))?.offsetLeft;
                    startItem = document.getElementById(start.clone().format('DD-MM-YYYY'))?.offsetLeft;
                    break;
            }


            if (leftEst && widthCalc && startItem) {
                const rootPosition = leftEst - startItem;
                const rootWidth = widthCalc - leftEst;

                fillData.push({
                    jreel: x.jreel,
                    jest:x.jest,
                    content: x.rows,
                    color: x.type === "Interne" ? "#28a745" : "#4C4848",
                    width: rootWidth + 24,
                    left: rootPosition
                })
            } else {
                setDataPresent(f => (f + 1));
            }

            let leftReel;
            let widthCalcR;
            switch (scale) {
                case "month":
                    leftReel = document.getElementById(moment(x.dayRS.valueOf()).format("MM-YYYY"))?.offsetLeft;
                    widthCalcR = document.getElementById(moment(x.dayRE.valueOf()).format("MM-YYYY"))?.offsetLeft;
                    break;
                case "year":
                    leftReel = document.getElementById(moment(x.dayRS.valueOf()).format("YYYY"))?.offsetLeft;
                    widthCalcR = document.getElementById(moment(x.dayRE.valueOf()).format("YYYY"))?.offsetLeft;
                    break;
                case "day":
                    leftReel = document.getElementById(moment(x.dayRS.valueOf()).format("DD-MM-YYYY"))?.offsetLeft;
                    widthCalcR = document.getElementById(moment(x.dayRE.valueOf()).format("DD-MM-YYYY"))?.offsetLeft;
                    break;
                default:
                    leftReel = document.getElementById(moment(x.dayRS.valueOf()).format("DD-MM-YYYY"))?.offsetLeft;
                    widthCalcR = document.getElementById(moment(x.dayRE.valueOf()).format("DD-MM-YYYY"))?.offsetLeft;
                    break;
            }


            if (leftReel && widthCalcR && startItem) {
                const rootPosition = leftReel - startItem;
                const rootWidth = widthCalcR - leftReel;

                fillData.push({
                    jreel: x.jreel,
                    jest:x.jest,
                    content: x.rows,
                    color: x.type === "Interne" ? "#dc3545" : "#773A04",
                    width: rootWidth + 24,
                    left: rootPosition
                })
            } else {
                setDataPresent(f => (f + 1));
            }
        })
        setBarPosition(fillData);



    }, [start, scale, data, dataPresent]);

    return (
        <div style={{height: 48 * data.length}} className="w-100 position-relative">
            {
                barPosition?.map((x, i) => {

                    const elements = Object.keys(x.content).filter(f => !excludeToolTip.includes(f)).map(f => {
                        return `<tr><td>${f}</td><td>: ${x.content[f]}</td></tr>`
                    })


                    return <Tooltip key={i} color={"white"} placement={"topRight"} title={<div className="text-dark">
                        <div className="d-flex">
                            <div className="col">Jours Estimé :</div>
                            <div className="col-xs">{x.jest}</div>
                        </div>
                        <div className="d-flex">
                            <div className="col">Jours Reél :</div>
                            <div className="col-xs">{x.jreel}</div>
                        </div>
                    </div>}>
                        <div data-tip={`<table class="table-dark w-100"><tbody>${elements.join('')}</tbody></table>`}

                             className="position-absolute"
                             style={{
                                 margin: "1px 0",
                                 top: 24 * i,
                                 backgroundColor: x.color,
                                 height: 22,
                                 borderRadius: 5,
                                 width: x.width,
                                 left: x.left
                             }}>
                        </div>
                    </Tooltip>
                })
            }
        </div>
    );
};

export default FillData;
