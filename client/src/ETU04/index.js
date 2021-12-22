import React, {useEffect, useState} from 'react';
import axios from "axios";
import {DatePicker, Form, Input, Select} from "antd";
import moment from "moment";
import {bindActionCreators} from "redux";
import * as types from "../redux/actions/actions";
import {connect} from "react-redux";
import {ConvertDate, FindAllPilotes, GenerateDocument} from "../tools";
import Button from "antd-button-color";
import etu04 from '../assets/ETU04.docx';


const ETU04 = (props) => {
    const [form] = Form.useForm();
    const [state, setState] = useState({project: null, ref: null, employees: [], projects: []});


    useEffect(() => {
        axios.create().get("/api/projects/names").then(ft => setState(f => ({...f, projects: ft.data})));
        axios.create().get("/api/employees/names").then(ft => ft.data === '' || setState(f => ({
            ...f,
            employees: ft.data
        })));
        props.actions.setHeaderTitle("Demande d’étude Supplémentaire");
        return () => {
            props.actions.setHeaderTitle("");
        }
    }, [props.actions]);

    useEffect(() => {
        axios.create().get("/api/etu04/generate").then(x => {
            setState(f => ({...f, ref: x.data}))
            form.setFieldsValue({
                etu04Ref: x.data,
                pole: "A.BELKHALFI",
                dateReel: moment(),
                date: moment(),
                datePre: moment()
            })
        });
    }, [form])


    return <div className={"container"}>
        <div className="row mt-4 justify-content-center">
            <div className="col-8">
                <Form form={form} onFinish={values => {
                    values.datePre = ConvertDate(values.datePre);
                    values.date = ConvertDate(values.date);
                    values.dateReel = ConvertDate(values.dateReel);
                    GenerateDocument(values, etu04, values.code + "_DES");

                    axios.create().post("/api/etu04", {ref: values.etu04Ref, data: JSON.stringify(values)}).then(x => {
                        form.resetFields();
                        axios.create().get("/api/etu04/generate").then(x => {
                            setState(f => ({...f, ref: x.data}))
                            form.setFieldsValue({
                                etu04Ref: x.data,
                                pole: "A.BELKHALFI",
                                dateReel: moment(),
                                date: moment(),
                                datePre: moment()
                            })
                        });
                    })
                }} labelAlign={"left"} labelCol={{span: 6}}>
                    <Form.Item name={"code"} label={"Code projet"}>
                        <Select onChange={(_, e) => {
                            if (!e.key) return;
                            axios.create().get("/api/projects/" + e.key).then(x => {
                                setState(f => ({...f, project: x.data}));
                            })

                        }} showSearch>
                            <Select.Option value={null} children={null}/>
                            {state.projects?.map(x => <Select.Option key={x.id} value={x.ref} children={x.ref}/>)}
                        </Select>
                    </Form.Item>

                    <Form.Item name={"etu04Ref"} label={"N°"}>
                        <Input/>
                    </Form.Item>

                    <Form.Item name={"date"} label={"Date"}>
                        <DatePicker className={"w-100"} format={"DD/MM/YYYY"}/>
                    </Form.Item>

                    <Form.Item name={"datePre"} label={"Date prévue d'exécution"}>
                        <DatePicker className={"w-100"} format={"DD/MM/YYYY"}/>
                    </Form.Item>

                    <Form.Item name={"pilote"} label={"Destinataire"}>
                        <Select>
                            <Select.Option value={null} children={null}/>
                            {
                                FindAllPilotes(state.project, state.employees)?.map(x => <Select.Option key={x}
                                                                                                        value={x}
                                                                                                        children={x}/>)
                            }
                        </Select>
                    </Form.Item>


                    <Form.Item name={"commercial"} label={"Nom et Visa Commercial"}>
                        <Input/>
                    </Form.Item>

                    <Form.Item name={"pole"} label={"Responsable pôle"}>
                        <Select>
                            {
                                state.employees?.map(x => <Select.Option key={x.id}
                                                                         value={x.firstName[0] + "." + x.lastName}
                                                                         children={x.firstName[0] + "." + x.lastName}/>)
                            }
                        </Select>
                    </Form.Item>

                    <Form.Item name={"dateReel"} label={"date Réelle d'exécution"}>
                        <DatePicker className={"w-100"} format={"DD/MM/YYYY"}/>
                    </Form.Item>

                    <Form.Item>
                        <Button htmlType={"submit"} type={"success"} children={"Generate"}/>
                    </Form.Item>


                </Form>
            </div>
        </div>
    </div>
}


const dtp = (dsp) => ({actions: bindActionCreators(types, dsp)})

export default connect(null, dtp)(ETU04);
