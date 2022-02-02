import React, {useEffect, useRef, useState} from "react";

import axios from "axios";
import moment from "moment";
import $ from "jquery";
import '../oldChart/chart/jquery.fn.gantt'
import '../oldChart/chart/gantt.css'
import image from '../assets/GG.png'
import Select from "antd/es/select";
import {Pie} from 'react-chartjs-2';
import {Input} from "antd";
import ChartDataLabels from 'chartjs-plugin-datalabels';
import Button from "antd-button-color";
import {jsPDF} from "jspdf";
import html2canvas from "html2canvas";
import {PlaySquareFilled} from '@ant-design/icons'
import {bindActionCreators} from "redux";
import * as types from "../redux/actions/actions";
import {connect} from "react-redux";


const {Search} = Input;

const {Option} = Select;


const PlanningGeneral = (props) => {
    const [state, setState] = useState({
        charts: [],
        employees: [],
        search: '',
        resp: '',
        type: '',
        projects: null
    });

    const employeesRef = useRef([]);

    const makeSomeData = (lots) => {
        const date = Math.min(...lots.map(x => moment(x.project.dateDebut).valueOf()));

        if (employeesRef.current.length === 0) employeesRef.current = state.employees;
        const fillData = lots.map(x => {
            return {
                type: "1",
                ref: x.project.ref,
                dateDebut: x.project?.dateDebut,
                service: {
                    metreur: employeesRef.current.find(r => r.name === x.project.piloteMetreur),
                    structure: employeesRef.current.find(r => r.name === x.project.piloteStructure),
                    technique: employeesRef.current.find(r => r.name === x.project.piloteTechnique),
                    vrd: employeesRef.current.find(r => r.name === x.project.piloteVRD)
                },
                project: x.project.name,
                dayES: x.startEst,
                dayRS: x.startReel,
                percent: x.acheves,
                realJreel: x.realJreel,
                realJest: x.realJest,
                hoursReel: x.duree,
                tachePercent: x.tachesPercent,
                dayEE: x.endEst,
                dayRE: x.endReel,
            }
        })

        $(".gantt").gantt({
            source: fillData,
            navigate: "scroll",
            scale: "days",
            typeFor: "general",
            date: date,
            minScale: "hours",
            maxScale: "months",
            itemsPerPage: 10,
            scrollToToday: false,
            useCookie: true,
        });
    }

    useEffect(() => {
        const lots = state.charts;
        const date = Math.min(...lots.map(x => moment(x.project.dateDebut).valueOf()));

        if (employeesRef.current.length === 0) employeesRef.current = state.employees;
        const fillData = lots.map(x => {
            return {
                type: "1",
                ref: x.project.ref,
                dateDebut: x.project?.dateDebut,
                service: {
                    metreur: employeesRef.current.find(r => r.name === x.project.piloteMetreur),
                    structure: employeesRef.current.find(r => r.name === x.project.piloteStructure),
                    technique: employeesRef.current.find(r => r.name === x.project.piloteTechnique),
                    vrd: employeesRef.current.find(r => r.name === x.project.piloteVRD)
                },
                project: x.project.name,
                dayES: x.startEst,
                dayRS: x.startReel,
                percent: x.acheves,
                realJreel: x.realJreel,
                realJest: x.realJest,
                hoursReel: x.duree,
                tachePercent: x.tachesPercent,
                dayEE: x.endEst,
                dayRE: x.endReel,
            }
        })

        $(".gantt").gantt({
            source: fillData,
            navigate: "scroll",
            scale: "days",
            typeFor: "general",
            date: date,
            minScale: "hours",
            maxScale: "months",
            itemsPerPage: 10,
            scrollToToday: false,
            useCookie: true,
        });
    }, [state.employees, state.charts])


    const instance = axios.create();
    useEffect(() => {


        axios.create().get('/api/employees/names').then(x => {
            if (x.data !== '') {
                setState(f => ({...f, employees: x.data}))
                employeesRef.current = x.data;
            }
            axios.create().get('/api/projects/planning-general').then(s => {

                if (s.data === '') return;
                setState(f => ({...f, charts: s.data}));
            })
        })


        axios.create().get('/api/projects').then(x => {
            const cloture = [];
            const actif = [];
            const attente = [];
            const suspendu = []


            x.data.forEach(f => {
                switch (f.etat) {
                    case "cloturé":
                        cloture.push(f);
                        break;
                    case "actif":
                        actif.push(f);
                        break;
                    case "en attente":
                        attente.push(f);
                        break;
                    case "suspendu":
                        suspendu.push(f);
                        break;
                    default:
                        break;
                }
            });
            setState(f => ({
                ...f, projects: {
                    cloture: cloture.length,
                    actif: actif.length,
                    attente: attente.length,
                    suspendu: suspendu.length
                }
            }))
        });

        props.actions.setHeaderTitle("Planning general d'Etude");
        return () => {
            props.actions.setHeaderTitle("");
        }
    }, [props.actions]);

    const findButton = (evt) => {


        const button = evt.nativeEvent.path.find(x => x.nodeName === "BUTTON");
        const list = [...button.parentElement.childNodes].filter(x => x !== button);
        list.forEach(x => x.style.border = "none")
        if (button.style.border === "2px solid black")
            button.style.border = "none";
        else button.style.border = "2px solid black";

        if (button.style.border === "none") {
            instance.get("/api/projects/planning-general?filter=" + state.search + "&resp=" + state.resp + "&type=").then(x => {
                setState(f => ({...f, charts: x.data}))
                makeSomeData(x.data)
            })
        } else {
            instance.get("/api/projects/planning-general?filter=" + state.search + "&resp=" + state.resp + "&type=" + button.textContent).then(x => {
                setState(f => ({...f, charts: x.data}))
                makeSomeData(x.data)
            })
        }

        setState(f => ({...f, type: button.textContent}))
    }


    return <div style={{width: "90vw"}} id="printPlanningGeneral" className="mx-auto">

        <div className="row border mb-3 flex-nowrap justify-content-between">
            <div className="col-xs"><img className="border h-100" width={100} src={image} alt=""/></div>
            <div className="col-xs d-flex justify-content-center align-items-center"><h3
                className="text-center m-0">PLANNING GENERAL DES
                PROJETS</h3></div>
            <div className="col-xs">
                <table className="border">
                    <tbody>
                    <tr>
                        <td>Code :</td>
                        <td>ETU01</td>
                    </tr>
                    <tr>
                        <td>Version :</td>
                        <td>A</td>
                    </tr>
                    <tr>
                        <td>Date :</td>
                        <td>06/09/2021</td>
                    </tr>
                    </tbody>
                </table>
            </div>
        </div>
        <div id="filter" className="col d-flex">
            <div className="col d-flex justify-content-end border-right">
                <div className="col-xs my-1 text-right">Responsable</div>
                <div className="col-6"><Select onChange={(value) => {
                    if (value === null) value = '';
                    setState(f => ({...f, resp: value}))

                    instance.get("/api/projects/planning-general?filter=" + state.search + "&resp=" + value + "&type=" + state.type).then(x => {
                        setState(f => ({...f, charts: x.data}))
                        makeSomeData(x.data)
                    })


                }
                } className="w-100">
                    <Option value={null} children={""}/>
                    {
                        state.employees.map(x => {
                            return <Option key={x.id} value={x.name}>{x.name}</Option>
                        })
                    }
                </Select></div>
            </div>
            <div className="col d-flex border-left">
                <div className="col-xs my-1 text-right">Projet</div>
                <div className="col"><Search className="w-50" placeholder="Recherche" allowClear onSearch={(v) => {
                    setState(f => ({...f, search: v}));
                    instance.get("/api/projects/planning-general?filter=" + v + "&resp=" + state.resp + "&type=" + state.type).then(x => {
                        setState(f => ({...f, charts: x.data}))
                        makeSomeData(x.data)
                    })
                }}/>
                </div>
            </div>
        </div>
        <div className="row py-3 m-0 flex-column align-items-center">
            <div className="col-xs border">
                <Button type="link" icon={<PlaySquareFilled
                    style={{fontSize: "20px", color: "rgb(0,103,0)", backgroundColor: "rgb(0,103,0)"}}/>}
                        onClick={(evt) => {
                            findButton(evt)
                        }}>
                    Cloturé
                </Button>


                <Button type="link" icon={<PlaySquareFilled
                    style={{fontSize: "20px", color: "rgb(0,32,255)", backgroundColor: "rgb(0,32,255)"}}/>}
                        onClick={(evt) => {
                            findButton(evt)
                        }}>
                    Actif
                </Button>


                <Button type="link" icon={<PlaySquareFilled
                    style={{fontSize: "20px", color: "rgb(255,0,0)", backgroundColor: "rgb(255,0,0)"}}/>}
                        onClick={(evt) => {
                            findButton(evt)
                        }}>
                    Suspendu
                </Button>


                <Button type="link" icon={<PlaySquareFilled
                    style={{fontSize: "20px", color: "rgb(255,255,0)", backgroundColor: "rgb(255,255,0)"}}/>}
                        onClick={(evt) => {
                            findButton(evt)
                        }}>
                    En attente
                </Button>

            </div>
            <div className="col-xs">
                {<Pie
                    plugins={[ChartDataLabels]}

                    height={150}
                    width={200}
                    data={{
                        labels: ['Clôturé', 'Actif', 'Suspendu', 'en attente'],
                        datasets: [
                            {
                                label: 'Population',
                                data: [
                                    state.projects?.cloture,
                                    state.projects?.actif,
                                    state.projects?.suspendu,
                                    state.projects?.attente,
                                ],
                                backgroundColor: [
                                    'rgb(0,103,0)',
                                    'rgb(0,32,255)',
                                    'rgb(255,0,0)',
                                    'rgb(255,255,0)',
                                ]
                            }

                        ],

                    }}
                    options={{
                        maintainAspectRatio: false,
                        title: {
                            display: true,
                            text: 'Largest Cities in Massachusetts',
                            fontSize: 25
                        },
                        plugins: {
                            legend: {
                                display: false,
                            },
                            datalabels: {
                                formatter: (value) => {
                                    if (value === 0) return null;
                                    return value;
                                },
                                color: '#000',
                                backgroundColor: '#fff',
                                borderRadius: 3,
                                padding: {
                                    top: 2,
                                    right: 3,
                                    left: 2
                                }
                            }
                        }
                    }}

                    type={"pie"}/>
                }

            </div>
        </div>

        {
            state.charts.length === 0 ? null : <>
                <div className="row m-0">
                    <div className="gantt"/>
                </div>
                <div className="row m-0 justify-content-center">
                    <div className="col-xs"><Button id="btn" type="primary" onClick={() => {
                        document.getElementById('navbar').classList.remove("d-flex");
                        document.getElementById('btn').style.display = "none";
                        document.getElementById('filter').classList.remove("d-flex");
                        document.getElementById('filter').classList.add("d-none");
                        document.getElementById('navbar').classList.add("d-none");
                        let pdf = new jsPDF('landscape', "px", 'a3');
                        const cw = document.getElementsByClassName('dataPanel').item(0).offsetWidth + document.getElementsByClassName('leftPanel').item(0).offsetWidth;
                        document.getElementsByClassName('bottom').item(0).style.display = "none";
                        document.getElementsByClassName('gantt').item(0).style.width = cw + 'px';
                        document.getElementById("printPlanningGeneral").style.width = (cw + 100) + "px";

                        html2canvas(document.getElementById("printPlanningGeneral"), {scale: window.devicePixelRatio}).then(canvas => {
                            let width;
                            if ((canvas.width / window.devicePixelRatio) > pdf.internal.pageSize.getWidth()) {
                                width = pdf.internal.pageSize.getWidth() - 32;
                            } else {
                                width = canvas.width / window.devicePixelRatio;
                            }


                            pdf.addImage(canvas.toDataURL(), 'JPEG', 15, 15, width, 0);

                        }).then(() => {
                            pdf.save();
                            document.getElementById("printPlanningGeneral").style.width = "100%"
                            document.getElementsByClassName('gantt').item(0).style.width = "100%"
                            document.getElementById('filter').classList.add("d-flex");
                            document.getElementById('filter').classList.remove("d-none");
                            document.getElementById('btn').style.display = "block";
                            document.getElementById('navbar').classList.add("d-flex");
                            document.getElementById('navbar').classList.remove("d-none");
                            document.getElementsByClassName('bottom').item(0).style.display = "block";
                        })
                    }}>Imprimer</Button></div>
                </div>
            </>
        }

    </div>
}


const dtp = (dsp) => ({actions: bindActionCreators(types, dsp)})

export default connect(null, dtp)(PlanningGeneral);
