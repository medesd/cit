import React, {useEffect} from 'react';
import {DatePicker, Form, Input, Radio} from "antd";
import {MinusOutlined, PlusOutlined} from "@ant-design/icons";
import Button from "antd-button-color";
import {ConvertDate, ExportRH08} from "../tools";
import rh08 from '../assets/RH08.docx';
import axios from "axios";
import moment from "moment";

const RH08 = () => {
    const [form] = Form.useForm();


    useEffect(() => {
        axios.create().get("/api/rh08/generate").then(ft => {
            form.setFieldsValue({ref: ft.data, date: moment(),motivation:[""],taches:[""], demande: true, date2: moment(), postType: "stage"});
        })
    }, [form]);


    return (
        <div className={"container-fluid"}>
            <div className="row mt-5 justify-content-center">
                <div className="col-8">
                    <Form form={form} onFinish={val => {
                        val.date = ConvertDate(val.date)
                        val.date2 = ConvertDate(val.date2)

                        axios.create().post("/api/rh08", {ref: val.ref, data: JSON.stringify(val)}).then(() => {
                            ExportRH08(val, rh08)
                            axios.create().get("/api/rh08/generate").then(ft => {
                                form.resetFields();
                                form.setFieldsValue({ref: ft.data, date: moment(),motivation:[""],taches:[""], demande: true, date2: moment(), postType: "stage"});
                            })
                        })
                    }} labelAlign={"left"} labelCol={{span: 5}}>
                        <Form.Item name={"ref"} label={"N°"}>
                            <Input/>
                        </Form.Item>
                        <div className="col"><h5 className={"text-center"}>Cadre réservé au demandeur</h5></div>
                        <Form.Item name={"date"} label={"Date"}>
                            <DatePicker format={"DD/MM/YYYY"} className={"w-100"}/>
                        </Form.Item>
                        <Form.Item name={"service"} label={"Service"}>
                            <Input/>
                        </Form.Item>
                        <Form.Item name={"demandeur"} label={"Demandeur"}>
                            <Input/>
                        </Form.Item>
                        <Form.Item name={"post"} label={"Poste recherché"}>
                            <Input/>
                        </Form.Item>
                        <Form.Item name={"postType"} label={"Type poste"}>
                            <Radio.Group buttonStyle={"solid"}>
                                <Radio.Button value={"plein"} children={"Temps plein"}/>
                                <Radio.Button value={"partiel"} children={"Temps partiel"}/>
                                <Radio.Button value={"stage"} children={"Stage"}/>
                            </Radio.Group>
                        </Form.Item>
                        <Form.List name={"motivation"}>
                            {(fields, {add, remove}) => <div className={"row align-items-center flex-column"}>
                                <div className="col"><h6 className={"text-center"}>Motivation de la demande</h6></div>
                                <div className="col-8 d-flex flex-column">
                                    {
                                        fields.map((field, i) => <div key={i} className={"col"}>
                                            <Form.Item{...field}>
                                                <Input/>
                                            </Form.Item>
                                        </div>)
                                    }
                                </div>
                                <div className="col text-center">
                                    <Button onClick={() => add("")} type={"success"} shape={"circle"}
                                            icon={<PlusOutlined/>}
                                            className={"mr-1"}/>
                                    <Button onClick={() => fields.length <= 1 || remove(fields.at(-1).name)}
                                            type={"danger"} shape={"circle"} icon={<MinusOutlined/>}
                                            className={"ml-1"}/>
                                </div>
                            </div>}
                        </Form.List>
                        <hr/>
                        <Form.List name={"taches"}>
                            {(fields, {add, remove}) => <div className={"row align-items-center flex-column"}>
                                <div className="col"><h6 className={"text-center"}>Taches principales</h6></div>
                                <div className="col-8 d-flex flex-column">
                                    {
                                        fields.map((field, i) => <div key={i} className={"col"}>
                                            <Form.Item{...field}>
                                                <Input/>
                                            </Form.Item>
                                        </div>)
                                    }
                                </div>
                                <div className="col text-center">
                                    <Button onClick={() => add("")} type={"success"} shape={"circle"}
                                            icon={<PlusOutlined/>}
                                            className={"mr-1"}/>
                                    <Button onClick={() => fields.length <= 1 || remove(fields.at(-1).name)}
                                            type={"danger"} shape={"circle"} icon={<MinusOutlined/>}
                                            className={"ml-1"}/>
                                </div>
                            </div>}
                        </Form.List>
                        <div className="col"><h5 className={"text-center"}>Cadre réservé au DG</h5></div>
                        <Form.Item name={"date2"} label={"Date"}>
                            <DatePicker format={"DD/MM/YYYY"} className={"w-100"}/>
                        </Form.Item>

                        <Form.Item name={"demande"} label={"Demande"}>
                            <Radio.Group buttonStyle={"solid"}>
                                <Radio.Button value={true} children={"Approuvée"}/>
                                <Radio.Button value={false} children={"Refusée"}/>
                            </Radio.Group>
                        </Form.Item>
                        <Form.Item name={"comment"} label={"Commentaire"}>
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

export default RH08;
