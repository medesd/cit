import React, {useState} from 'react';
import Chart from "./chart/Chart";
import moment from "moment";
import {ParseJwt} from "../../tools";
import {message, Popconfirm} from "antd";
import Button from "antd-button-color";
import {DeleteOutlined, EditOutlined} from "@ant-design/icons";
import jsPDF from "jspdf";
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
            dayRE: !f.end ? moment(f.jreelStart).add(f.jreel > 0 ? f.jreel - 1 : f.jreel, "days").clone() : moment()
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
                <table className="table table-hover table-bordered table-striped mt-2 text-center">
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

                <div className="col-xs w-100">
                    <Chart options={{lang: 'fr', data, weekEnd: true, type: "details"}}/>
                </div>
            </div>
            <Edit lot={props.lot} taches={props.taches} project={props.project} closeModal={closeEditModal}
                  modal={state.editModal}/>
            <div className="row justify-content-center">
                <div className="col-xs">
                    <Button hidden={props.taches.length === 0} onClick={async () => {
                        document.getElementsByClassName('action').item(0).style.display = "none";
                        document.getElementsByClassName('action').item(1).style.display = "none";

                        for (let i = 0; i < document.getElementsByClassName('action').length; i++) {
                            document.getElementsByClassName('action').item(i).style.display = "none";
                        }
                        let pdf = new jsPDF('landscape', "px", 'a4');


                        const cw = document.getElementsByClassName('dataPanel').item(0).offsetWidth + document.getElementsByClassName('leftPanel').item(0).offsetWidth;
                        const withhold = document.getElementsByClassName('gantt').item(0).style.width;
                        document.getElementsByClassName('gantt').item(0).style.width = cw + 'px';
                        html2canvas(document.querySelector("#capture"), {scale: 2}).then(canvas => {
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
                            document.getElementsByClassName('gantt').item(0).style.width = withhold;
                            //pdf.save();
                            const btns = [...document.getElementsByClassName('ant-btn')];
                            document.getElementsByClassName('gantt').item(0).style.display = "none";
                            document.getElementsByClassName('btn').item(0);
                            btns.forEach((f) => {
                                f.style.display = "none";
                            })


                            const width = document.body.style.width;
                            document.body.style.width = '950px';
                            document.body.style.width = '950px';

                            html2canvas(document.getElementById("printer"), {scale: 1}).then(canvas => {
                                canvas.style.opacity = '1';
                                pdf.addPage(null, "portrait").addImage(canvas.toDataURL(), 'JPEG', 0, 15, 440, 0)
                            }).then(() => {
                                btns.forEach((f) => {
                                    f.style.display = "block";
                                })
                                document.body.style.width = width;
                                document.getElementsByClassName('gantt').item(0).style.display = "block";
                                document.getElementsByClassName('bottom').item(0).style.display = "block";

                                document.getElementById('navbar').classList.remove("d-none");
                                document.getElementById('navbar').classList.add("d-flex");


                                for (let i = 0; i < document.getElementsByClassName('action').length; i++) {
                                    document.getElementsByClassName('action').item(i).style.display = "flex";
                                    document.getElementsByClassName('action').item(i).style.justifyContent = "center";
                                }
                                pdf.save();
                            })


                        })


                    }} type="primary" href={null}>Imprimer</Button>
                </div>
            </div>
        </div>
    );
};

export default Gantt;