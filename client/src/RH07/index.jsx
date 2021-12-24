import React, {useEffect} from 'react';
import {DatePicker, Form, Input, Radio} from "antd";
import Button from "antd-button-color";
import {ConvertDate, ExportRH07} from "../tools";
import rh07 from '../assets/RH07.docx';
import axios from "axios";
import moment from "moment";
import {bindActionCreators} from "redux";
import * as types from "../redux/actions/actions";
import {connect} from "react-redux";

const RH07 = (props) => {
    const [form] = Form.useForm();


    useEffect(() => {
        axios.create().get("/api/rh07/generate").then(ft => {
            form.setFieldsValue({ref: ft.data, date: moment(), datePre: moment(), decision: true});
        })

        props.actions.setHeaderTitle("Demande de formation");
        return () => {
            props.actions.setHeaderTitle("");
        }
    }, [props.actions,form]);


    return (
        <div className={"container-fluid"}>
            <div className="row mt-5 justify-content-center">
                <div className="col-8">
                    <Form form={form} onFinish={val => {
                        val.date = ConvertDate(val.date)
                        val.datePre = ConvertDate(val.datePre)


                        axios.create().post("/api/rh07", {ref: val.ref, data: JSON.stringify(val)}).then(() => {
                            ExportRH07(val, rh07)
                            axios.create().get("/api/rh07/generate").then(ft => {
                                form.resetFields();
                                form.setFieldsValue({ref: ft.data, date: moment(), datePre: moment(), decision: true});
                            })
                        })
                    }} labelAlign={"left"} labelCol={{span: 7}}>


                        <Form.Item label={"N°"} name={"ref"}>
                            <Input/>
                        </Form.Item>

                        <Form.Item label={"Date"} name={"date"}>
                            <DatePicker className={"w-100"} format={"DD/MM/YYYY"}/>
                        </Form.Item>

                        <div className="col">
                            <h5 className={"text-center"}>Cadre réservé au demandeur</h5>
                        </div>

                        <Form.Item label={"Nom et prénom"} name={"name"}>
                            <Input/>
                        </Form.Item>

                        <Form.Item label={"Fonction"} name={"fonction"}>
                            <Input/>
                        </Form.Item>

                        <Form.Item label={"Thème de formation demandé"} name={"theme"}>
                            <Input/>
                        </Form.Item>

                        <Form.Item label={"Modif"} name={"modif"}>
                            <Input.TextArea/>
                        </Form.Item>

                        <Form.Item label={"Date prévue souhaitée"} name={"datePre"}>
                            <DatePicker className={"w-100"} format={"DD/MM/YYYY"}/>
                        </Form.Item>

                        <Form.Item label={"Formateur proposé"} name={"formateur"}>
                            <Input/>
                        </Form.Item>

                        <div className="col"><h5 className={"text-center"}>Cadre réservé au DG</h5></div>


                        <Form.Item label={"Décision"} name={"decision"}>
                            <Radio.Group buttonStyle={"solid"}>
                                <Radio.Button value={true} children={"Demande accordée"}/>
                                <Radio.Button value={false} children={"Demande refusée"}/>
                            </Radio.Group>
                        </Form.Item>

                        <Form.Item label={"Modif"} name={"modif2"}>
                            <Input.TextArea/>
                        </Form.Item>

                        <Form.Item className={"text-center"}>
                            <Button type={"success"} htmlType={"submit"} children={"Enregistrer"}/>
                        </Form.Item>

                    </Form>
                </div>
            </div>
        </div>
    );
};

const dtp = (dsp) => ({actions: bindActionCreators(types, dsp)})


export default connect(null, dtp)(RH07);

