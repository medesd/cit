import React, {useEffect, useState} from "react";
import {DatePicker, Form, Input, InputNumber, Select} from "antd";
import {useParams, withRouter} from "react-router";
import axios from "axios";
import moment from "moment";
import Logo from "../assets/logo.jpg";
import Button from "antd-button-color";
import {jsPDF} from "jspdf";
import html2canvas from "html2canvas";
import {ArrowLeftOutlined, MinusOutlined, PlusOutlined} from "@ant-design/icons";
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import * as types from "../redux/actions/actions";


const FicheIntervention = (props) => {
    const [state, setState] = useState({
        projects: [],
        currentProject: null,
        submitted: false,
        loading: false,
        employees: [],
        form: null,
        pages: 0,
        lots: []
    });
    let {id} = useParams();
    const [form] = Form.useForm();

    useEffect(() => {
        setState(f => ({...f, pages: document.getElementsByClassName("forPrintPages").length}));
    }, [state.submitted])

    useEffect(() => {

        axios.create().get('/api/projects/names').then(async ft => {
            const res = (await axios.create().get('/api/employees/names')).data;

            setState(f => ({...f, employees: res}));
            setState(f => ({...f, projects: ft.data}));
            if (id !== "none") {


                const response = (await axios.create().get('/api/projects/' + id)).data;
                const plt = Object.keys(response).filter(x => x.includes("pilote"));
                const lot = [];

                plt.forEach(x => {
                    if (response[x] === null) return;
                    const name = res?.find(s => s.name === response[x]);
                    lot.push({
                        lot: x.split("pilote")[1],
                        resp: name.firstName[0] + '.' + name.lastName
                    });
                })
                form.setFieldsValue({lots: lot});


                axios.create().get('/api/projects/intervention/' + id).then(ft => {
                    setState(f => ({...f, currentProject: ft.data}))
                    form.setFieldsValue({
                        ...ft.data,
                        dateNotif: moment(ft.data.dateNotif),
                        dateDebut: moment(ft.data.dateDebut),
                        ficheRef: ft.data.intervention.ref,
                        principal: ft.data.intervention.principal,
                        document: ft.data.intervention.document,
                        donnes: ft.data.intervention.donnes,
                    })
                })
            }


        })

        props.actions.setHeaderTitle("Fiche d'intervention");
        return () => {
            props.actions.setHeaderTitle("");
        }


    }, [props.actions,form, id])


    const formData = <div className="row mt-5 justify-content-center">
        <div className="col-8">
            <Form
                form={form}
                name="basic"
                onFinish={async (values) => {
                    setState(f => ({
                        ...f,
                        lots: values.lots,
                        form: {...values, principal: values.principal - 1},
                        submitted: true
                    }));

                }}
                labelCol={{span: 12}}
                labelAlign={"left"}
                wrapperCol={{span: 12}}
            >
                <Form.Item
                    label="Projet"
                    name="name"
                    rules={[{required: true, message: ''}]}
                >
                    <Select onChange={async (_, e) => {
                        if (!e.key) return;


                        const response = (await axios.create().get('/api/projects/' + e.key)).data;
                        const plt = Object.keys(response).filter(x => x.includes("pilote"));
                        const lot = [];

                        plt.forEach(x => {
                            if (response[x] === null) return;
                            const name = state.employees?.find(s => s.name === response[x]);
                            lot.push({
                                lot: x.split("pilote")[1],
                                resp: name.firstName[0] + '.' + name.lastName
                            });
                        })
                        form.setFieldsValue({lots: lot});


                        axios.create().get('/api/projects/intervention/' + e.key).then(ft => {
                            setState(f => ({...f, currentProject: ft.data}))

                            form.setFieldsValue({
                                ...ft.data,
                                dateNotif: moment(ft.data.dateNotif),
                                dateDebut: moment(ft.data.dateDebut),
                                ficheRef: ft.data.intervention?.ref,
                                principal: ft.data.intervention?.principal,
                                document: ft.data.intervention?.document,
                                donnes: ft.data.intervention?.donnes,
                            })
                        })
                    }
                    } showSearch>
                        <Select.Option value={null} children={null}/>
                        {state.projects?.map(x => {
                            return <Select.Option key={x.id} value={x.name}>{x.name}</Select.Option>
                        })}
                    </Select>
                </Form.Item>
                <Form.Item
                    label="Référence de projet"
                    name="ref"
                    rules={[{required: true, message: ''}]}
                >
                    <Input disabled/>
                </Form.Item>
                <Form.Item
                    label="N°"
                    name="ficheRef"
                    rules={[{required: true, message: ''}]}
                >
                    <Input disabled/>
                </Form.Item>
                <Form.Item
                    label="Date"
                    name="dateNotif"
                    rules={[{required: true, message: ''}]}
                >
                    <DatePicker className="w-100" format="DD/MM/YYYY"/>
                </Form.Item>
                <Form.Item
                    label="Client"
                    name="client"
                    rules={[{required: true, message: ''}]}
                >
                    <Input/>
                </Form.Item>
                <Form.Item
                    label="maitre D'ouvrage"
                    name="maitreDouvrage"
                    rules={[{required: true, message: ''}]}
                >
                    <Input/>
                </Form.Item>
                <Form.Item
                    label="Architecte"
                    name="architecte"
                    rules={[{required: true, message: ''}]}
                >
                    <Input/>
                </Form.Item>
                <Form.Item
                    label="Bureau de contrôle"
                    name="bureauControl"
                    rules={[{required: true, message: ''}]}
                >
                    <Input/>
                </Form.Item>
                <div className="row mb-2">
                    <div className="col"><h4 className="text-center">Lots</h4></div>
                </div>

                <Form.List name="lots">
                    {(fields, {add, remove}) => (
                        <>

                            {fields.map(({key, name, fieldKey, ...restField}) => (

                                <div className="d-flex justify-content-around" key={key}>
                                    <Form.Item
                                        {...restField}
                                        wrapperCol={{span: 20, offset: 3}}
                                        name={[name, "lot"]}
                                        style={{minWidth: "50%"}}
                                        fieldKey={[fieldKey]}
                                        rules={[{required: true, message: ""}]}
                                    >
                                        <Input placeholder="Lot"/>
                                    </Form.Item>
                                    <Form.Item
                                        {...restField}
                                        wrapperCol={{span: 20, offset: 1}}
                                        style={{minWidth: "50%"}}
                                        name={[name, "resp"]}
                                        fieldKey={[fieldKey]}
                                        rules={[{required: true, message: ""}]}
                                    >
                                        <Select showSearch placeholder="Responsable">
                                            <Select.Option value={null} children={null}/>
                                            {
                                                state.employees?.map((x, i) => {
                                                    return <Select.Option key={x.id}
                                                                          value={x.firstName[0] + "." + x.lastName}
                                                                          children={x.firstName[0] + "." + x.lastName}/>
                                                })
                                            }
                                        </Select>
                                    </Form.Item>
                                </div>
                            ))}

                            <div className="row justify-content-center">
                                <div className="col-xs m-1">
                                    <Button onClick={() => {
                                        add();
                                    }} shape={"circle"} icon={<PlusOutlined/>} type={"success"}/>
                                </div>
                                <div className="col-xs m-1">
                                    <Button onClick={() => {
                                        if (fields.length === 1) return;
                                        remove(fields.at(-1).name)
                                    }} shape={"circle"} icon={<MinusOutlined/>} type={"danger"}/>
                                </div>
                            </div>
                        </>
                    )}

                </Form.List>

                <div className="row mb-2">
                    <div className="col"><h4 className="text-center">Nombre de pages</h4></div>
                </div>
                <Form.Item
                    label="Page principal"
                    name="principal"
                    rules={[{required: true, message: ''}, {type: "number", min: 1, message: ''}]}
                >
                    <InputNumber className="w-100"/>
                </Form.Item>
                <Form.Item
                    label="Documents entrants"
                    name="document"
                    rules={[{required: true, message: ''}, {type: "number", min: 1, message: ''}]}
                >
                    <InputNumber className="w-100"/>
                </Form.Item>
                <Form.Item
                    label="Base de données contacts"
                    name="donnes"
                    rules={[{required: true, message: ''}, {type: "number", min: 1, message: ''}]}
                >
                    <InputNumber className="w-100"/>
                </Form.Item>

                <Form.Item>
                    <Button type="success" htmlType="submit">Afficher</Button>
                </Form.Item>

            </Form>
        </div>
    </div>

    const mainPage = <div className="d-flex flex-column align-items-center">
        <div style={{width: 960}} className="row forPrintPages flex-column align-items-center">
            <div className="col mb-2 p-0">
                <div
                    className="row border w-100 mx-0 justify-content-between flex-nowrap align-items-center">
                    <div className="col-xs border-right">
                        <img height="80" src={Logo} alt="logo"/>
                    </div>
                    <div className="col-xs"><h4 className="font-weight-bold my-1">
                        FICHE D’INTERVENTION
                    </h4></div>
                    <div className="col-xs mh-100 border-left">
                        <table>
                            <tbody>
                            <tr>
                                <th>Code</th>
                                <td>: ETU05</td>
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
            </div>
            <div className="col p-0">
                <div className="row justify-content-end pr-5">
                    <div className="col-xs">
                        N° :{state.form?.ficheRef}
                    </div>
                </div>
            </div>
            <div className="col">
                <div className="row">
                    <div className="col-xs">
                        <b><u>Date</u></b>:{moment(state.form?.dateNotif).format("DD/MM/YYYY")}
                    </div>
                </div>
            </div>
            <div className="col-xs w-100 mt-3 border">
                <div className="row my-3 mx-4">
                    <table className="table m-0 table-bordered">
                        <thead>
                        <tr>
                            <th>PROJET:{state.form?.name}</th>
                            <th>REFERENCE PROJET:{state.form?.ref}</th>
                        </tr>
                        </thead>
                        <tbody>
                        <tr>
                            <td colSpan={2}>
                                <b>Les intervenants :</b>
                                <ul>
                                    <li>Client :{state.form?.client}</li>
                                    <li>Maitre d’ouvrage :{state.form?.maitreDouvrage}</li>
                                    <li>Architecte :{state.form?.architecte}</li>
                                    <li>Bureau de contrôle :{state.form?.bureauControl}</li>
                                </ul>
                            </td>
                        </tr>
                        </tbody>
                        <tfoot>
                        <tr>
                            <td colSpan={2}>
                                <div className="row">
                                    <div className="col">
                                        <b>Affectation : service [chargé de l’étude][chargé du suivi]</b>
                                    </div>
                                </div>
                                <div className="ant-row justify-content-between m-0">
                                    {
                                        state.lots?.map((x, y) => {
                                            return <div key={y} className="ant-col-xs-6 text-center">
                                                {x.lot}
                                                [{x.resp}][&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;]
                                            </div>
                                        })
                                    }
                                    {
                                        [...Array(8 - state.lots?.length).keys()].map(x => {
                                            return <div key={x} className="ant-col-xs-6 text-center">
                                                ......................
                                                [&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;][&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;]
                                            </div>
                                        })
                                    }
                                </div>
                            </td>
                        </tr>
                        </tfoot>
                    </table>
                </div>
                <div className="row mx-4">
                    <table className="table table-bordered text-center">
                        <thead>
                        <tr>
                            <th className="align-middle">
                                Version
                            </th>
                            <th className="align-middle">
                                Historique produits / services délivré
                            </th>
                            <th className="align-middle">Détail d’intervention</th>
                            <th>
                                Responsable / Sous-traitant
                            </th>
                            <th className="align-middle">Date</th>
                        </tr>
                        </thead>
                        <tbody>
                        {[...Array(14).keys()].map(x => <tr style={{height: 55}} key={x}>
                            <td/>
                            <td/>
                            <td/>
                            <td style={{width:"15%"}}/>
                            <td style={{width:"15%"}}/>
                        </tr>)}
                        </tbody>
                    </table>
                </div>
            </div>
            <div className="col mt-4">
                <div className="row justify-content-end">
                    <div className="col-xs">
                        1/{state.pages}
                    </div>
                </div>
            </div>
        </div>
        <hr style={{minWidth: "90%"}}/>

        {[...Array(state.form?.principal).keys()].map((x, i) => {
            return <div key={x}>
                <div style={{width: 960, height: 1400}} className="row forPrintPages flex-column align-items-center">
                    <div className="col mb-2 p-0">
                        <div
                            className="row border w-100 mx-0 justify-content-between flex-nowrap align-items-center">
                            <div className="col-xs border-right">
                                <img height="80" src={Logo} alt="logo"/>
                            </div>
                            <div className="col-xs"><h4 className="font-weight-bold my-1">
                                FICHE D’INTERVENTION
                            </h4></div>
                            <div className="col-xs mh-100 border-left">
                                <table>
                                    <tbody>
                                    <tr>
                                        <th>Code</th>
                                        <td>: ETU05</td>
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
                    </div>
                    <div className="col-xs w-100 mt-3 border">
                        <div className="row mt-4 mx-4">
                            <table className="table table-bordered text-center">
                                <thead>
                                <tr>
                                    <th className="align-middle">
                                        Version
                                    </th>
                                    <th className="align-middle">
                                        Historique produits / services délivré
                                    </th>
                                    <th className="align-middle">Détail d’intervention</th>
                                    <th>
                                        Responsable / Sous-traitant
                                    </th>
                                    <th className="align-middle">Date</th>
                                </tr>
                                </thead>
                                <tbody>
                                {[...Array(20).keys()].map(x => <tr style={{height: 55}} key={x}>
                                    <td/>
                                    <td/>
                                    <td/>
                                    <td style={{width:"15%"}}/>
                                    <td style={{width:"15%"}}/>
                                </tr>)}
                                </tbody>
                            </table>
                        </div>
                    </div>
                    <div className="col mt-4">
                        <div className="row mt-1 justify-content-end">
                            <div className="col-xs">
                                {i + 2}/{document.getElementsByClassName("forPrintPages").length}
                            </div>
                        </div>
                    </div>
                </div>
                <hr style={{minWidth: "100%"}}/>
            </div>
        })}

        {[...Array(state.form?.document).keys()].map((x, i) => {
            return <div key={x}>
                <div style={{width: 960, height: 1400}} className="row forPrintPages flex-column align-items-center">
                    <div className="col mb-2 p-0">
                        <div
                            className="row border w-100 mx-0 justify-content-between flex-nowrap align-items-center">
                            <div className="col-xs border-right">
                                <img height="80" src={Logo} alt="logo"/>
                            </div>
                            <div className="col-xs"><h4 className="font-weight-bold my-1">
                                FICHE D’INTERVENTION
                            </h4></div>
                            <div className="col-xs mh-100 border-left">
                                <table>
                                    <tbody>
                                    <tr>
                                        <th>Code</th>
                                        <td>: ETU05</td>
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
                    </div>
                    <div className="col-xs w-100 mt-3 border">
                        {
                            i === 0 ? <div className="row">
                                <div className="col-xs mt-3 mb-3 mx-4">
                                    <b>Documents entrants</b>
                                </div>
                            </div> : null
                        }

                        <div className="row mt-3 mx-4">
                            <table className="table table-bordered">
                                <thead>
                                <tr>
                                    <th>
                                        Document
                                    </th>
                                    <th>
                                        Délivré par
                                    </th>
                                    <th>Date de délivrance</th>
                                </tr>
                                </thead>
                                <tbody>
                                {[...Array(i === 0 ? 20 : 21).keys()].map(x => <tr style={{height: 55}} key={x}>
                                    <td/>
                                    <td/>
                                    <td/>
                                </tr>)}

                                </tbody>
                            </table>
                        </div>
                    </div>
                    <div className="col mt-4">
                        <div className="row justify-content-end">
                            <div className="col-xs">
                                {state.form?.principal + i + 2}/{document.getElementsByClassName("forPrintPages").length}
                            </div>
                        </div>
                    </div>
                </div>
                <hr style={{minWidth: "100%"}}/>
            </div>
        })}

        {[...Array(state.form?.donnes).keys()].map((x, i) => {
            return <div key={x}>
                <div style={{width: 960, height: 1400}} className="row forPrintPages flex-column align-items-center">
                    <div className="col mb-2 p-0">
                        <div
                            className="row border w-100 mx-0 justify-content-between flex-nowrap align-items-center">
                            <div className="col-xs border-right">
                                <img height="80" src={Logo} alt="logo"/>
                            </div>
                            <div className="col-xs"><h4 className="font-weight-bold my-1">
                                FICHE D’INTERVENTION
                            </h4></div>
                            <div className="col-xs mh-100 border-left">
                                <table>
                                    <tbody>
                                    <tr>
                                        <th>Code</th>
                                        <td>: ETU05</td>
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
                    </div>
                    <div className="col-xs w-100 mt-3 border">
                        {
                            i === 0 ? <div className="row">
                                <div className="col-xs mt-3 mb-3 mx-4">
                                    <b>Base de données contacts</b>
                                </div>
                            </div> : null
                        }

                        <div className="row mt-3 mx-4">
                            <table className="table table-bordered">
                                <thead>
                                <tr>
                                    <th>
                                        Intervenant
                                    </th>
                                    <th>
                                        Nom et prénom
                                    </th>
                                    <th>Email</th>
                                    <th>
                                        Numéro 1
                                    </th>
                                    <th>Numéro 2</th>
                                </tr>
                                </thead>
                                <tbody>
                                {[...Array(i === 0 ? 20 : 21).keys()].map(x => <tr style={{height: 55}} key={x}>
                                    <td/>
                                    <td/>
                                    <td/>
                                    <td/>
                                    <td/>
                                </tr>)}

                                </tbody>
                            </table>
                        </div>
                    </div>
                    <div className="col mt-4">
                        <div className="row justify-content-end">
                            <div className="col-xs">
                                {state.form?.document + state.form?.principal + i + 2}/{document.getElementsByClassName("forPrintPages").length}
                            </div>
                        </div>
                    </div>
                </div>
                <hr style={{minWidth: "100%"}}/>
            </div>
        })}


    </div>;

    return <div className="container">
        {state.submitted ?
            <div className="row mt-3"><Button type={"primary"} icon={<ArrowLeftOutlined/>}
                                              onClick={() => setState(f => ({...f, submitted: false}))}/></div> : null}
        {state.submitted ? mainPage : formData}
        {state.submitted ? <div className="row justify-content-center">
            <Button loading={state.loading} type={"success"}
                    onClick={() => {
                        setState(f => ({
                            ...f,
                            loading: true
                        }));

                        const pdf = new jsPDF('portrait', "px", "a4");

                        const classes = document.getElementsByClassName("forPrintPages");

                        for (let print = 0; print < classes.length; print++) {
                            html2canvas(document.getElementsByClassName("forPrintPages").item(print), {scale: 3}).then(canvas => {
                                pdf.addImage(canvas.toDataURL(), 10, 10, 425, 0);
                                if (print < classes.length - 1)
                                    pdf.addPage();
                            }).then(() => {
                                if (print === classes.length - 1) {
                                    setState(f => ({
                                        ...f,
                                        loading: false
                                    }));
                                    window.open(pdf.output('bloburl'))
                                }
                            })
                        }


                    }}>Imprimer</Button>
        </div> : null}
    </div>;
}


const dtp = (dsp) => ({actions: bindActionCreators(types, dsp)})



export default connect(null,dtp)(withRouter(FicheIntervention));
