import React, {useEffect, useState} from 'react';
import {DatePicker, Form, Input, Radio, Select} from "antd";
import Button from "antd-button-color";
import Logo from '../assets/logo.jpg';
import {jsPDF} from "jspdf";
import html2canvas from "html2canvas";
import axios from "axios";
import moment from "moment";
import {ArrowLeftOutlined} from "@ant-design/icons";

const {TextArea} = Input;

const {Option} = Select;


const OrdreService = () => {
    const [form] = Form.useForm();
    const [state, setState] = useState({
        projects: [],
        currentProject: null,
        currentResp: [],
        submitted: false,
        form: null,
        ordreServiceType: "etude"
    });

    useEffect(() => {
        axios.create().get("/api/projects").then(ft => {
            setState(f => ({...f, projects: ft.data}))
        });
    }, [])

    const formData = <>
        <div className="row">
            <div className="col">
                <h2 className="text-center">Ordre Service</h2>
            </div>
        </div>
        <div className="row justify-content-center">
            <div className="col-8">
                <Form
                    form={form}
                    name="basic"
                    onFinish={(values) => {

                        setState(f => ({...f, form: values, submitted: true}))
                    }}
                    labelCol={{span: 12}}
                    labelAlign={"left"}
                    wrapperCol={{span: 12}}
                >
                    <Form.Item
                        name="ordreService"
                        label="Type"
                        initialValue={"etude"}
                        rules={[{required: true, message: ''}]}
                    >
                        <Radio.Group onChange={(e) => {
                            setState(f => ({...f, ordreServiceType: e.target.value}));
                            axios.create().get('/api/ordre-services/ref/' + form.getFieldValue('ordreService')).then(ft => {
                                form.setFieldsValue({number: ft.data});
                            });
                        }
                        } buttonStyle="solid">
                            <Radio.Button value="etude">Etude</Radio.Button>
                            <Radio.Button value="suivi">Suivi</Radio.Button>
                        </Radio.Group>
                    </Form.Item>
                    <Form.Item
                        label="Référence"
                        name="ref"
                        rules={[{required: true, message: ''}]}
                    >
                        <Select onChange={(_, e) => {
                            const current = state.projects.find(x => x.id.toString() === e.key);
                            if (current === undefined) return;
                            axios.create().get('/api/projects/employee/' + current.id).then(ft => {
                                setState(f => ({...f, currentResp: ft.data}));
                                form.setFieldsValue({
                                    project:current.name,
                                    dateNotif: moment(current.dateNotif),
                                    dateDebut: current.dateDebut ? moment(current.dateDebut) : null,
                                    nemMarche: current.nemMarche || current.ref,
                                    resp: ft.data,
                                    client: current.client || "-"
                                });
                            })
                            axios.create().get('/api/ordre-services/ref/' + form.getFieldValue('ordreService')).then(ft => {
                                form.setFieldsValue({number: ft.data});
                            });
                        }} showSearch>
                            <Option value={""} children={""}/>
                            {state.projects?.map(x => {
                                return <Option key={x.id} value={x.ref}>{x.ref}</Option>
                            })}
                        </Select>
                    </Form.Item>

                    <Form.Item
                        label="projet"
                        name="project"
                        rules={[{required: true, message: ''}]}
                    >
                        <Input/>
                    </Form.Item>


                    <Form.Item
                        label="N°"
                        name="number"
                    >
                        <Input/>
                    </Form.Item>


                    <Form.Item
                        name="client"
                        label="Client"
                        rules={[{required: true, message: ''}]}
                    >
                        <Input/>
                    </Form.Item>
                    <Form.Item
                        name="resp"
                        label="Titulaire"
                        rules={[{required: true, message: ''}]}
                    >
                        <Select mode="tags">
                            {state.currentResp?.map((x, i) => {
                                return <Option key={i} value={x}>{x}</Option>
                            })}
                        </Select>
                    </Form.Item>
                    <Form.Item
                        name="nemMarche"
                        label="N° de marché"
                        rules={[{required: true, message: ''}]}>
                        <Input/>
                    </Form.Item>
                    <Form.Item
                        name="dateNotif"

                        label="Date de notification"
                        rules={[{required: true, message: ''}]}>
                        <DatePicker format="DD/MM/YYYY" className="w-100"/>
                    </Form.Item>

                    <Form.Item
                        name="dateDebut"
                        label="Date de démarrage"
                        rules={[{required: true, message: ''}]}>
                        <DatePicker format="DD/MM/YYYY" className="w-100"/>
                    </Form.Item>

                    {
                        state.ordreServiceType === "suivi" ? <Form.Item
                            name="lieu"
                            label="Lieu d’exécution du chantier "
                            rules={[{required: true, message: ''}]}>
                            <TextArea/>
                        </Form.Item> : null
                    }


                    <Form.Item className="mt-5" wrapperCol={{offset: 11, span: 16}}>
                        <Button htmlType={"submit"} type="success">Afficher</Button>
                    </Form.Item>
                </Form>
            </div>
        </div>
    </>;


    const makeNumber = (i) => {
        let value = parseInt(state.form?.number.substring(state.form?.number.indexOf('S') + 1, state.form?.number.indexOf('/'))) + i;
        if (value < 10) value = "0" + value;

        const first = state.form?.number.substring(0, state.form?.number.indexOf('S') + 1);
        const last = state.form?.number.substring(state.form?.number.indexOf('/'));


        return first + value + last;
    }


    const pagePrinter = <>
        <div className="row">
            <div className="col"><Button type="primary" onClick={() => setState(f => ({...f, submitted: false}))}
                                         icon={<ArrowLeftOutlined/>}/></div>
        </div>
        {state.form?.resp.map((x, i) => {
            return <div key={i}>
                <div style={{width: 960}}
                     className="row forPrintPages m-auto flex-column align-items-center">
                    <div
                        className="row border w-100 mx-0 mb-5 justify-content-between flex-nowrap align-items-center">
                        <div className="col-xs border-right">
                            <img height="80" src={Logo} alt="logo"/>
                        </div>
                        <div className="col-xs"><h4 className="font-weight-bold my-1">
                            Ordre de service de démarrage {state.ordreServiceType === "suivi" ? "de suivi" : "d’étude"}
                        </h4></div>
                        <div className="col-xs mh-100 border-left">
                            <table>
                                <tbody>
                                <tr>
                                    <th>Code</th>
                                    <td>: {state.ordreServiceType === "suivi" ? "SUI03" : "ETU03"}</td>
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
                    }}/><b className="text-capitalize">{state.ordreServiceType}</b>
                    </div>
                    <div style={{backgroundColor: "#afafaf"}} className="col p-0 border py-1 mt-5">
                        <p className="m-0 p-0 text-center font-weight-bold">ORDRE DE SERVICE
                            N°{makeNumber(i)}</p>
                    </div>
                    <div className="col border p-0 my-5">
                        <div className="d-flex flex-column">
                            <div className="d-flex border-bottom">
                                <div className="col-2">Titulaire:</div>
                                <div className="col-10">{x}</div>
                            </div>
                            <div className="d-flex border-bottom">
                                <div className="col-2">Projet:</div>
                                <div className="col-10">{state.form?.project}</div>
                            </div>
                            <div className="d-flex border-bottom">
                                <div className="col-2">Client:</div>
                                <div className="col-10">{state.form?.client}</div>
                            </div>
                            <div className="d-flex border-bottom">
                                <div className="col-2">N° de marché:</div>
                                <div className="col-4">{state.form?.nemMarche}</div>
                                <div className="col-2">Notifié le:</div>
                                <div className="col-4">{moment(state.form?.dateNotif).format("DD/MM/YYYY")}</div>
                            </div>
                            <div className="d-flex">
                                <div className="col-2">Date de démarrage:</div>
                                <div className="col-10">{moment(state.form?.dateDebut).format("DD/MM/YYYY")}</div>
                            </div>
                        </div>
                    </div>
                    {
                        state.ordreServiceType === "suivi" ? <div className="col mb-2 border">
                            <p>Lieu d’exécution du chantier : {state.form?.lieu}</p>
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
                <hr/>
            </div>
        })}


        <div className="row justify-content-center">
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


                                const values = state.form?.resp.map((x, i) => {
                                    return {
                                        project: state.form?.project,
                                        ref: makeNumber(i),
                                        client: state.form?.client,
                                        titulaire: x,
                                        lieu: state.form?.lieu,
                                        nemMarche: state.form?.nemMarche,
                                        dateNotif: state.form?.dateNotif.toDate(),
                                        dateDebut: state.form?.dateDebut.toDate(),
                                        type: state.form?.ordreService,
                                    }
                                })



                                axios.create().post('/api/ordre-services', values).then(null)

                                window.open(pdf.output('bloburl'))
                            }
                        })
                    }

                }} type="success">Imprimer</Button>
            </div>
        </div>
    </>

    return <div className="container mt-5">

        {state.submitted ? pagePrinter : formData}
    </div>
}

export default OrdreService;
