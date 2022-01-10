import React, {useEffect, useState} from 'react';
import {DatePicker, Form, Input} from "antd";
import axios from "axios";
import moment from "moment";
import {ConvertDate, GenerateDocument, ParseJwt} from "../tools";
import ach01 from "../assets/ACH01.docx";
import {bindActionCreators} from "redux";
import * as types from "../redux/actions/actions";
import {connect} from "react-redux";
import Button from "antd-button-color";


const ACH01 = (props) => {
    const [form] = Form.useForm();
    const [state, setState] = useState({ref: null, user: null});


    useEffect(() => {

        axios.create().get("/api/employees/names").then(x => {
            if (x.data === '') return;
            const user = x.data.find(d => d.id === ParseJwt().id);
            if (!user) return;
            setState(f => ({...f, user: user?.firstName[0] + "." + user?.lastName}));
        })

        props.actions.setHeaderTitle("Demande d'achat");
        return () => {
            props.actions.setHeaderTitle("");
        }
    }, [props.actions]);

    useEffect(() => {
        axios.create().get("/api/ach01/generate").then(x => {
            setState(f => ({...f, ref: x.data}))
            form.setFieldsValue({
                ref: x.data,
                date: moment(),
                user: state.user
            })
        });
    }, [state.user, form])


    return <div className={"container"}>
        <div className="row mt-4 justify-content-center">
            <div className="col-8">
                <Form form={form} onFinish={values => {
                    values.date = ConvertDate(values.date);
                    GenerateDocument(values, ach01, values.ref + "_DA");

                    axios.create().post("/api/ach01", {ref: values.ref, data: JSON.stringify(values)}).then(() => {
                        form.resetFields();
                        axios.create().get("/api/ach01/generate").then(x => {
                            setState(f => ({...f, ref: x.data}))
                            form.setFieldsValue({
                                ref: x.data,
                                date: moment(),
                                user: state.user
                            })
                        });
                    })
                }} labelAlign={"left"} labelCol={{span: 6}}>


                    <Form.Item name={"ref"} label={"N°"}>
                        <Input/>
                    </Form.Item>

                    <Form.Item name={"date"} label={"Date"}>
                        <DatePicker className={"w-100"} format={"DD/MM/YYYY"}/>
                    </Form.Item>

                    <Form.Item name={"user"} label={"Demandeur"}>
                        <Input/>
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

export default connect(null, dtp)(ACH01);
