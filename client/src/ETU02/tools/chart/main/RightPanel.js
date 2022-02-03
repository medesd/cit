import React, {useRef} from 'react';
import DateItem from "./DateItem";
import moment from "moment";
import FillData from "./FillData";


const RightPanel = ({data, scale, weekEnd, excludeToolTip, scroll, lang}) => {

    const dataRef = useRef(null);


    const end = Math.max(...data.map(x => x.dayRE.valueOf()), ...data.map(x => x.dayEE.valueOf()))
    const start = Math.min(...data.map(x => x.dayRS.valueOf()), ...data.map(x => x.dayES.valueOf()))

    const position = {
        top: 0,
        left: 0,
        x: 0
    };


    const mouseMoveHandler = function (e) {
        const {current} = dataRef;
        const dx = e.clientX - position.x;
        if (!current) return;
        current.scrollLeft = position.left - dx;
    };

    const mouseUpHandler = function () {
        const {current} = dataRef;
        if (!current) return;
        window.removeEventListener('mousemove', mouseMoveHandler);
        window.removeEventListener('mouseup', mouseUpHandler);
        current.style.cursor = 'grab';
        current.style.removeProperty('user-select');
    };


    return (
        <div ref={dataRef}
            onMouseDown={(e) => {
            const {current} = dataRef;
            if (!current) return;
            current.style.cursor = 'grabbing';
            current.style.userSelect = 'none';
            position.left = current.scrollLeft;
            position.top = current.scrollTop;
            position.x = e.clientX;
            window.addEventListener('mousemove', mouseMoveHandler);
            window.addEventListener('mouseup', mouseUpHandler);
        }} style={{cursor: 'grab'}}
             id={"data-items"}
             className="w-100 table-responsive h-100">
            <DateItem scale={scale} weekEnd={weekEnd} lang={lang} dataLength={data.length} dateStart={moment(start)}
                      dateEnd={moment(end)}/>
            <FillData scale={scale} excludeToolTip={excludeToolTip} start={moment(start).clone()}
                      data={data}/>
        </div>
    );
};

export default RightPanel;
