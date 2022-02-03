import React, {useState} from 'react';
import Chart from "./chart/Chart";
import moment from "moment";
import {ParseJwt} from "../../tools";
import {message, Popconfirm} from "antd";
import Button from "antd-button-color";
import {DeleteOutlined, EditOutlined} from "@ant-design/icons";
import JsPDF from "jspdf";
import html2canvas from "html2canvas";
import Edit from "./Edit";
import axios from "axios";

const Gantt = (props) => {
    const [state, setState] = useState({editModal: {type: false, data: null}});


    const data = props.taches.map(f => {
        return {
            rows: {
                Phase: f.phase,
                Tache: f.name,
                Heurs_Réel: f.elements === 0 ? '-' : f.elements,
                Heurs_Estimé: f.complete === 0 ? '-' : f.complete
            },
            jest: f.realJest,
            jreel: f.realJreel,
            type: f.inex,
            dayES: moment(f.jestStart).clone(),
            dayRS: moment(f.jreelStart).clone(),
            dayEE: moment(f.jestStart).add(f.jest > 0 ? f.jest - 1 : f.jest, "days").clone(),
            dayRE: (f.end || f.inex !== 'Interne') ? moment(f.jreelStart).add(f.jreel > 0 ? f.jreel - 1 : f.jreel, "days").clone() : moment()
        }
    })

    const closeEditModal = () => {
        setState(f => ({...f, editModal: {type: false, data: null}}));
    }

    const confirm = (e, id) => {

        axios.create().delete('/api/taches/' + id).then(() => window.location.reload());

        message.success('supprimé');
    }


    return (
        <div>
            <div className="table-responsive">
                <table id="print-table" className="table table-hover table-bordered table-striped mt-2 text-center">
                    <thead>
                    <tr>
                        <th>Phase</th>
                        <th>Taches</th>
                        <th>Responsable</th>
                        <th>Commentaire</th>
                        <th className="action">Action</th>
                    </tr>
                    </thead>
                    <tbody>
                    {
                        props.taches.map((f, i) => {
                            return (<tr key={i}>
                                <td>{f.phase}</td>
                                <td>{f.name}</td>
                                <td>{f.inex}</td>
                                <td>{f.commentaires}</td>
                                <td className="action">{ParseJwt().roles.map(f => f.authority).includes("ROLE_USER") ?

                                    <Popconfirm
                                        title="Êtes-vous sûr de supprimer cette tâche?"
                                        onConfirm={e => confirm(e, f.id)}
                                        okText="Yes"
                                        cancelText="No"
                                    >
                                        <Button shape="circle" icon={<DeleteOutlined/>} type="danger"/>
                                    </Popconfirm> : null
                                }
                                    <Button className="ml-1" onClick={() => {
                                        setState(s => ({...s, editModal: {type: true, data: f}}));
                                    }} shape="circle" icon={<EditOutlined/>}
                                            type="primary"/>
                                </td>
                            </tr>)
                        })
                    }
                    </tbody>
                </table>
            </div>
            <div className="row justify-content-center">

                <div id="chart-print" className="col-xs w-100">
                    <Chart options={{lang: 'fr', data, weekEnd: true, type: "details"}}/>
                </div>
            </div>
            <Edit lot={props.lot} taches={props.taches} project={props.project} closeModal={closeEditModal}
                  modal={state.editModal}/>
            <div className="row justify-content-center">
                <div className="col-xs mt-2">
                    <Button hidden={props.taches.length === 0} onClick={async () => {
                        for (let i = 0; i < document.getElementsByClassName('action').length; i++) {
                            document.getElementsByClassName('action').item(i).style.display = "none";
                        }
                        let pdf = new JsPDF('landscape', "px", 'a4');
                        const btns = [...document.getElementsByClassName('ant-btn')];
                        btns.forEach((f) => {
                            f.style.display = "none";
                        })

                        document.getElementById('data-items').parentElement.style.minWidth = document.getElementById('data-items').scrollWidth + "px";
                        document.getElementById('chart-print').style.minWidth = (document.getElementById('left-items').scrollWidth+document.getElementById('data-items').scrollWidth) + "px";
                       // return;
                        html2canvas(document.querySelector("#chart-print"), {scale: 2}).then(canvas => {
                            let y;
                            if ((canvas.height / window.devicePixelRatio) > pdf.internal.pageSize.getHeight()) {
                                y = 15;
                            } else {
                                const rest = pdf.internal.pageSize.getHeight() - (canvas.height / window.devicePixelRatio);
                                y = rest / 2
                            }


                            let width;
                            let x;
                            if ((canvas.width / window.devicePixelRatio) > pdf.internal.pageSize.getWidth()) {
                                width = pdf.internal.pageSize.getWidth() - 32;
                                x = 15;
                            } else {
                                width = canvas.width / window.devicePixelRatio;
                                const rest = pdf.internal.pageSize.getWidth() - width;
                                x = rest / 2
                            }


                            pdf.addImage(canvas.toDataURL(), 'JPEG', x, y, width, 0);

                        }).then(() => {

                            document.getElementById('chart-print').style.display = "none";

                            html2canvas(document.getElementById("printer"), {scale: 2}).then(canvas => {
                                canvas.style.opacity = '1';
                                pdf.addPage(null, "portrait").addImage(canvas.toDataURL(), 'JPEG', 3, 15, 440, 0)
                            }).then(() => {
                                btns.forEach((f) => {
                                    f.style.display = "block";
                                })
                                document.getElementById('chart-print').style.display = "block";
                                document.getElementById('data-items').parentElement.style.removeProperty("min-width")
                                document.getElementById('chart-print').style.removeProperty("min-width")


                                for (let i = 0; i < document.getElementsByClassName('action').length; i++) {
                                    document.getElementsByClassName('action').item(i).style.display = "flex";
                                    document.getElementsByClassName('action').item(i).style.justifyContent = "center";
                                    document.getElementsByClassName('action').item(i).style.alignItems = "center";
                                }
                                pdf.save();
                            })


                        })


                    }} type="primary">Imprimer</Button>
                </div>
            </div>
        </div>
    );
};

export default Gantt;