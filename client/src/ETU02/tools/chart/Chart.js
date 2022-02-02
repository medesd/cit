import React, {useEffect, useState} from 'react';
import LeftPanel from "./main/LeftPanel";
import RightPanel from "./main/RightPanel";
import {MinusOutlined, PlusOutlined} from "@ant-design/icons";
import Button from "antd-button-color";

function Chart({options}) {
    const [scale, setScale] = useState(options.defaultScale || "day");

    const [style, setStyle] = useState({});
    useEffect(() => {
        switch (scale) {
            case "month":
                setStyle({fontSize: 15, height: 24})
                break;
            case "year":
                setStyle({fontSize: 15})
                break;
            case "day":
                setStyle({fontSize: 15, height: 72})
                break;
            default:
                setStyle({fontSize: 15, height: 72})
                break;
        }
    }, [scale])

    return (
        <div style={{minWidth: 960}} className="border">
            <div className="d-flex w-100">
                <div className="w-50 h-100">


                    <div className="border-right border-left" style={style}/>


                    <LeftPanel exclude={options.excludeCol || []}
                               content={options.data.map(x => x.rows)}/>
                </div>
                <div className="w-50 h-100">
                    <RightPanel scale={scale} weekEnd={options.weekEnd || false} scroll={options.scroll || 1}
                                lang={options.lang || 'en'}
                                excludeToolTip={options.excludeToolTip || []}
                                data={options.data}/>
                </div>
            </div>
            <div className="row mx-5 my-1 justify-content-center align-items-center">
                <div className="col-xs m-1">
                    <span className="btn btn-success"/> Jours Estimé<br/>
                    <span className="btn btn-danger"/> Jours Reél
                </div>
                {options.type === 'details' ? <div className="col-xs m-1">
                    <span className="btn btn-secondary"/> Jours Estimé (Externe)<br/>
                    <span style={{backgroundColor: "#773A04"}} className="btn"/> Jours Reél (Externe)
                </div> : null}

                <div onClick={() => {
                    switch (scale) {
                        case "day":
                            setScale("month");
                            break;
                        case "month":
                            setScale("year")
                            break;
                        default:
                            setScale(scale);
                            break;
                    }
                }} className="col-xs m-1">
                    <Button shape={"circle"} icon={<MinusOutlined/>} type={"ghost"}/>
                </div>
                <div onClick={() => {
                    switch (scale) {
                        case "year":
                            setScale("month");
                            break;
                        case "month":
                            setScale("day")
                            break;
                        default:
                            setScale(scale);
                            break;
                    }
                }} className="col-xs m-1">
                    <Button shape={"circle"} icon={<PlusOutlined/>} type={"ghost"}/>
                </div>
            </div>
        </div>
    );
}

export default Chart;
