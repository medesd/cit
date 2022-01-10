import React, {useEffect, useState} from 'react';
import ps04 from "../assets/ps03.docx";
import OrdreServiceSuivi from "../assets/ordreServiceSuivi.docx";
import PizZip from "pizzip";
import Docxtemplater from "docxtemplater";
import PizZipUtils from "pizzip/utils";
import {saveAs} from "file-saver";
import {DatePicker, Form, Radio, Input, Select} from "antd";
import axios from "axios";
import Button from "antd-button-color";
import moment from "moment";
import {useHistory, useParams, withRouter} from "react-router";
import {bindActionCreators} from "redux";
import * as types from "../redux/actions/actions";
import {connect} from "react-redux";


function loadFile(url, callback) {
    PizZipUtils.getBinaryContent(url, callback);
}

const NewOrdreService = (props) => {
    const params = useParams();
    const history = useHistory();
    const [form] = Form.useForm();
    const [state, setState] = useState({
        type: params.type,
        projects: [],
        plt: [],
        names: [],
        form: null,
        currentProject: null
    });

    useEffect(() => {
        setState(f => ({...f, type: params.type}))

        axios.create().get("/api/projects/names").then(x =>
            x.data === '' || setState(f => ({...f, projects: x.data}))
        )

        axios.create().get("/api/employees/names").then(x => x.data === '' || setState(f => ({...f, names: x.data})))

        props.actions.setHeaderTitle(`Ordre service ${params.type === "Etude" ? "d'" + params.type : "de " + params.type}`);
        return () => {
            props.actions.setHeaderTitle("");
        }

    }, [props.actions, params.type])

    const generateDocument = (data, file) => {
        data = {
            ...data,
            dateDebut: data.dateDebut.format("DD/MM/YYYY"),
            dateNotif: data.dateNotif.format("DD/MM/YYYY")
        }
        loadFile(
            file,
            function (error, content) {
                if (error) {
                    throw error;
                }
                const zip = new PizZip(content);
                const doc = new Docxtemplater(zip, {
                    paragraphLoop: true,
                    linebreaks: true,
                });

                doc.render(data);
                const out = doc.getZip().generate({
                    type: "blob",
                    mimeType:
                        "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
                });

                saveAs(out, `${data?.numMarche}_OS_${state.type}.docx`);
            }
        );
    };

    const getEmp = (projet) => {
        const data = Object.keys(projet).filter(x => x.includes("pilote"));
        const plt = [];

        const x = state.names;

        data.forEach(s => {
            if (!projet[s]) return;
            const items = x.find(f => f.name === projet[s]);
            plt.push(items?.firstName[0] + "." + items?.lastName);
        })
        setState(f => ({...f, plt: plt}));

        return plt;
    }


    const formEtude = <div className="col-8">
        <Form
            form={form}
            labelAlign={"left"}
            onFinish={values => {
                const keys = Object.keys(values)
                keys.forEach(x => {

                    if (values[x] === undefined) values[x] = "";
                })


                setState(f => ({...f, form: values}));
                getEmp(state.currentProject).forEach(x => {
                    values.emp = x;
                    generateDocument(values, ps04);
                })
            }}
            labelCol={{span: 4}}
        >
            <Form.Item name={"ref"} label={"Réf"}>
                <Select onChange={(_, e) => {
                    if (!e.key) {
                        form.resetFields();
                        return;
                    }
                    axios.create().get("/api/projects/" + e.key).then(ft => {
                        setState(f => ({...f, currentProject: ft.data}));
                        form.setFieldsValue({
                            ...ft.data,
                            project: ft.data.name,
                            emp: getEmp(ft.data).join(" | "),
                            numMarche: ft.data.ref,
                            dateDebut: moment(ft.data.dateDebut),
                            dateNotif: moment(ft.data.dateNotif)
                        });
                    })
                }} showSearch>
                    <Select.Option value={null} children={null}/>
                    {
                        state.projects?.map(x => {
                            return <Select.Option key={x.id} value={x.ref} children={x.ref}/>
                        })
                    }
                </Select>
            </Form.Item>
            <Form.Item name={"project"} label={"Projet"}>
                <Input/>
            </Form.Item>
            <Form.Item name={"emp"} label={"Tutélaire"}>
                <Input/>
            </Form.Item>
            <Form.Item name={"maitreDouvrage"} label={"Maitre D'ouvrage"}>
                <Input/>
            </Form.Item>
            <Form.Item name={"numMarche"} label={"N° Marche"}>
                <Input/>
            </Form.Item>
            <Form.Item name={"dateNotif"} label={"notifié le"}>
                <DatePicker className={"w-100"} format="DD/MM/YYYY"/>
            </Form.Item>
            <Form.Item name={"dateDebut"} label={"Date de démarrage"}>
                <DatePicker className={"w-100"} format="DD/MM/YYYY"/>
            </Form.Item>
            <Form.Item wrapperCol={{offset: 12}}>
                <Button type={"success"} htmlType={"submit"}>Generate</Button>
            </Form.Item>
        </Form>
    </div>


    const formSuivi = <div className="col-8">
        <Form
            form={form}
            labelAlign={"left"}
            onFinish={values => {
                const keys = Object.keys(values)
                keys.forEach(x => {

                    if (values[x] === undefined) values[x] = "";
                })


                setState(f => ({...f, form: values}));
                getEmp(state.currentProject).forEach(x => {
                    values.emp = x;
                    generateDocument(values, OrdreServiceSuivi);
                })
            }}
            labelCol={{span: 6}}
        >
            <Form.Item name={"ref"} label={"Réf"}>
                <Select onChange={(_, e) => {
                    if (!e.key) {
                        form.resetFields();
                        return;
                    }
                    axios.create().get("/api/projects/" + e.key).then(ft => {
                        setState(f => ({...f, currentProject: ft.data}));
                        form.setFieldsValue({
                            ...ft.data,
                            project: ft.data.name,
                            emp: getEmp(ft.data).join(" | "),
                            numMarche: ft.data.ref,
                            dateDebut: moment(ft.data.dateDebut),
                            dateNotif: moment(ft.data.dateNotif)
                        });
                    })
                }} showSearch>
                    <Select.Option value={null} children={null}/>
                    {
                        state.projects?.map(x => {
                            return <Select.Option key={x.id} value={x.ref} children={x.ref}/>
                        })
                    }
                </Select>
            </Form.Item>
            <Form.Item name={"project"} label={"Projet"}>
                <Input/>
            </Form.Item>
            <Form.Item name={"emp"} label={"Tutélaire"}>
                <Input/>
            </Form.Item>
            <Form.Item name={"maitreDouvrage"} label={"Maitre D'ouvrage"}>
                <Input/>
            </Form.Item>
            <Form.Item name={"numMarche"} label={"N° Marche"}>
                <Input/>
            </Form.Item>
            <Form.Item name={"dateNotif"} label={"notifié le"}>
                <DatePicker className={"w-100"} format="DD/MM/YYYY"/>
            </Form.Item>
            <Form.Item name={"dateDebut"} label={"Date de démarrage"}>
                <DatePicker className={"w-100"} format="DD/MM/YYYY"/>
            </Form.Item>
            <Form.Item name={"comment"} label={"Lieu d’exécution du chantier"}>
                <Input.TextArea/>
            </Form.Item>
            <Form.Item wrapperCol={{offset: 12}}>
                <Button type={"success"} htmlType={"submit"}>Generate</Button>
            </Form.Item>
        </Form>
    </div>


    return <div className={"container"}>
        <div className="row mt-4 justify-content-center">
            <div className="col-xs">
                <Radio.Group buttonStyle={"solid"} onChange={x => {
                    setState(f => ({...f, type: x.target.value}));
                }
                } value={state.type}>
                    <Radio.Button onClick={() => history.push("/new-ordre-service/Etude")}
                                  value="Etude">Etude</Radio.Button>
                    <Radio.Button onClick={() => history.push("/new-ordre-service/Suivi")}
                                  value="Suivi">Suivi</Radio.Button>
                </Radio.Group>
            </div>
        </div>
        <div className="row mt-5 d-flex justify-content-center">
            {state.type === "Etude" ? formEtude : formSuivi}

        </div>
    </div>
}


const dtp = (dsp) => ({actions: bindActionCreators(types, dsp)})


export default connect(null, dtp)(withRouter(NewOrdreService));
