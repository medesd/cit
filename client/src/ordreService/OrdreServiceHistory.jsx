import React, {useEffect, useState} from "react";
import axios from "axios";
import Button from "antd-button-color";
import {EyeOutlined} from "@ant-design/icons";
import {Drawer, Radio} from "antd";
import Logo from "../assets/logo.jpg";
import moment from "moment";
import {jsPDF} from "jspdf";
import html2canvas from "html2canvas";


const OrdreServiceHistory = () => {
    const [state, setState] = useState({
        ordreServices: [],
        currentOrdre: null,
        type: "etude",
        drawer: false,
    });

    useEffect(() => {
        axios.create().get('/api/ordre-services/'+state.type).then(ft => {
            setState(f => ({...f, ordreServices: ft.data}))
        })
    }, [state.type])

    return <div className="container">
        <Drawer placement={"bottom"} title={state.currentOrdre?.ref} height={"100%"} visible={state.drawer}
                onClose={() => setState(f => ({...f, drawer: false}))}>
            <div className="row align-items-center flex-column">
                <div style={{width: 960}}
                     className="row forPrintPages m-auto flex-column align-items-center">
                    <div
                        className="row border w-100 mx-0 mb-5 justify-content-between flex-nowrap align-items-center">
                        <div className="col-xs border-right">
                            <img height="80" src={Logo} alt="logo"/>
                        </div>
                        <div className="col-xs"><h4 className="font-weight-bold my-1">
                            Ordre de service de
                            démarrage {state.currentOrdre?.type === "suivi" ? "de suivi" : "d’étude"}
                        </h4></div>
                        <div className="col-xs mh-100 border-left">
                            <table>
                                <tbody>
                                <tr>
                                    <th>Code</th>
                                    <td>: {state.currentOrdre?.type === "suivi" ? "SUI03" : "ETU03"}</td>
                                </tr>
                                <tr>
                                    <th>Version</th>
                                    <td>: A</td>
                                </tr>
                                <tr>
                                    <th>Date</th>
                                    <td>: 06/09/2021</td>
                                </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                    <div className="col mt-5">
                        <b>objet </b>: Ordre de service de démarrage: <div style={{
                        backgroundColor: "#afafaf",
                        border: "2px solid #000",
                        width: 18,
                        marginBottom: -5,
                        marginRight: 3,
                        height: 18,
                        display: "inline-block"
                    }}/><b className="text-capitalize">{state.currentOrdre?.type}</b>
                    </div>
                    <div style={{backgroundColor: "#afafaf"}} className="col p-0 border py-1 mt-5">
                        <p className="m-0 p-0 text-center font-weight-bold">ORDRE DE SERVICE
                            N°{state.currentOrdre?.ref}</p>
                    </div>
                    <div className="col border p-0 my-5">
                        <div className="d-flex flex-column">
                            <div className="d-flex border-bottom">
                                <div className="col-2">Titulaire:</div>
                                <div className="col-10">{state.currentOrdre?.titulaire}</div>
                            </div>
                            <div className="d-flex border-bottom">
                                <div className="col-2">Projet:</div>
                                <div className="col-10">{state.currentOrdre?.project}</div>
                            </div>
                            <div className="d-flex border-bottom">
                                <div className="col-2">Client:</div>
                                <div className="col-10">{state.currentOrdre?.client}</div>
                            </div>
                            <div className="d-flex border-bottom">
                                <div className="col-2">N° de marché:</div>
                                <div className="col-4">{state.currentOrdre?.nemMarche}</div>
                                <div className="col-2">Notifié le:</div>
                                <div
                                    className="col-4">{moment(state.currentOrdre?.dateNotif).format("DD/MM/YYYY")}</div>
                            </div>
                            <div className="d-flex">
                                <div className="col-2">Date de démarrage:</div>
                                <div
                                    className="col-10">{moment(state.currentOrdre?.dateDebut).format("DD/MM/YYYY")}</div>
                            </div>
                        </div>
                    </div>
                    {
                        state.ordreServiceType === "suivi" ? <div className="col mb-2 border">
                            <p>Lieu d’exécution du chantier : {state.currentOrdre?.lieu}</p>
                        </div> : null

                    }

                    <div className="col my-5">
                        <p>Ordre est donné au responsable de procéder au démarrage des prestations de son marché. </p>
                    </div>
                    <div className="col mt-5">
                        <div className="d-flex justify-content-between">
                            <div className="border d-flex flex-column justify-content-between p-2"
                                 style={{width: 430, height: 300}}>
                                <div>
                                    <span>Directeur Commercial</span><br/>
                                    <i>(Nom et fonction)</i>
                                </div>
                                <div>
                                    <p>Date et signature :</p>
                                </div>
                            </div>
                            <div className="border p-2" style={{width: 430, height: 300}}>
                                <span>Accusé réception titulaire</span><br/>
                                <i>(Nom et fonction)</i>
                            </div>
                        </div>
                    </div>
                    <div className="col mt-3">
                        <p>
                            Le présent ordre de service est envoyé en deux exemplaires au titulaire, qui devra en
                            retourner
                            un
                            exemplaire signé au Directeur Commercial.
                        </p>
                    </div>
                </div>
                <div className="col-xs">
                    <Button onClick={() => {

                        const pdf = new jsPDF('portrait', "px", "a4");

                        const classes = document.getElementsByClassName("forPrintPages");

                        for (let print = 0; print < classes.length; print++) {
                            html2canvas(document.getElementsByClassName("forPrintPages").item(print), {scale: 3}).then(canvas => {
                                pdf.addImage(canvas.toDataURL(), 10, 10, 425, 0);
                                if (print < classes.length - 1)
                                    pdf.addPage();
                            }).then(() => {
                                if (print === classes.length - 1) {
                                    window.open(pdf.output('bloburl'))
                                }
                            })
                        }

                    }} type="success">Imprimer</Button>
                </div>
            </div>
        </Drawer>
        <div className="row px-4 mt-5">
            <div className="col-xs mr-3">
                <b className="m-2">Objet</b>
            </div>
            <div className="col-xs">
                <Radio.Group onChange={(e) => {
                    setState(f => ({...f, type: e.target.value}));
                }
                } defaultValue={state.type} buttonStyle="solid">
                    <Radio.Button value="etude">Etude</Radio.Button>
                    <Radio.Button value="suivi">Suivi</Radio.Button>
                </Radio.Group>
            </div>
        </div>
        <div className="row mt-2">
            <div className="col">
                <table className="table-bordered text-center table table-hover">
                    <thead>
                    <tr>
                        <th>
                            N°
                        </th>
                        <th>
                            Projet
                        </th>
                        <th>
                            Client
                        </th>
                        <th>
                            Titulaire
                        </th>
                        <th>Action</th>
                    </tr>
                    </thead>
                    <tbody>
                    {state.ordreServices?.map(x => {
                        return <tr key={x.id}>
                            <td>{x.ref}</td>
                            <td>{x.project}</td>
                            <td>{x.client}</td>
                            <td>{x.titulaire}</td>
                            <td><Button shape={"circle"} onClick={() => {
                                setState(f => ({...f, currentOrdre: x, drawer: true}))
                            }
                            } type="primary" icon={<EyeOutlined/>}/></td>
                        </tr>
                    })}
                    </tbody>
                </table>
            </div>
        </div>
    </div>
}


export default OrdreServiceHistory;
