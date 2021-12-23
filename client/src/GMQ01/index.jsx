import React, {useEffect, useState} from "react";
import {bindActionCreators} from "redux";
import * as types from "../redux/actions/actions";
import {connect} from "react-redux";
import {DatePicker, Form, Input, Radio} from "antd";
import {ConvertDate, ExportGmq01, GenerateDocument} from "../tools";
import gmq01 from "../assets/GMQ01.docx";
import axios from "axios";
import Button from "antd-button-color";
import moment from "moment";


const GMQ01 = (props) => {

    const [state, setState] = useState({client: false})
    const [form] = Form.useForm();

    useEffect(() => {
        axios.create().get("/api/gmq01/generate").then(ft => {
            form.setFieldsValue({ref: ft.data,dateCorrection:moment(),dateAction:moment(),date:moment(),type:"nc"});
        })
        props.actions.setHeaderTitle("Fiche de non-Conformité");
        return () => {
            props.actions.setHeaderTitle("");
        }
    }, [props.actions, form]);


    return <div className={"container"}>
        <div className="row mt-4 justify-content-center">
            <div className="col-8">
                <Form form={form} onFinish={values => {
                    axios.post("/api/gmq01", {
                        ...values
                    }).then(() => {
                        axios.create().get("/api/gmq01/generate").then(ft => {
                            form.setFieldsValue({ref: ft.data});
                            values.date = ConvertDate(values.date);
                            values.dateCorrection = ConvertDate(values.dateCorrection);
                            values.dateAction = ConvertDate(values.dateAction);
                            if (!values.client) values.client="............................";
                            ExportGmq01(values, gmq01)
                        })
                    });
                }} labelAlign={"left"} labelCol={{span: 6}}>

                    <Form.Item name={"ref"} label={"N°"}>
                        <Input disabled/>
                    </Form.Item>

                    <Form.Item label={"Date"} name={"date"}>
                        <DatePicker format={"DD/MM/YYYY"} className={"w-100"}/>
                    </Form.Item>
                    <Form.Item className={"text-center"} name={"type"}>
                        <Radio.Group onChange={(val) => {
                            setState(f => ({...f, client: val.target.value === "rec"}))
                        }
                        } buttonStyle={"solid"}>
                            <Radio.Button value={"nc"} children={"NC interne"}/>
                            <Radio.Button value={"rec"} children={"Réclamation client"}/>
                            <Radio.Button value={"prop"} children={"Propriété client"}/>
                        </Radio.Group>
                    </Form.Item>
                    {
                        !state.client || <Form.Item name={"client"} label={"Client"}>
                            <Input/>
                        </Form.Item>
                    }

                    <div className="col"><h5 className={"text-center"}>Description de la NC</h5></div>

                    <Form.Item name={"description"} label={"Description"}>
                        <Input.TextArea/>
                    </Form.Item>
                    <Form.Item name={"service"} label={"Produit/ Service  NC"}>
                        <Input/>
                    </Form.Item>
                    <Form.Item name={"interneRef"} label={"Ref"}>
                        <Input/>
                    </Form.Item>
                    <Form.Item name={"quality"} label={"Quantité"}>
                        <Input/>
                    </Form.Item>
                    <Form.Item name={"etape"} label={"Étape"}>
                        <Input/>
                    </Form.Item>
                    <Form.Item label={"Nom et prénom détecteur"} name={"ncName"}>
                        <Input/>
                    </Form.Item>
                    <div className="col"><h5 className={"text-center"}>Analyse de cause</h5></div>
                    <Form.Item name={"cause"} label={"Cause"}>
                        <Input.TextArea/>
                    </Form.Item>
                    <Form.Item label={"Noms et prénoms"} name={"causeName"}>
                        <Input/>
                    </Form.Item>
                    <div className="col"><h5 className={"text-center"}>Traitement</h5></div>
                    <Form.Item name={"correction"} label={"Correction"}>
                        <Input.TextArea/>
                    </Form.Item>
                    <Form.Item label={"Date prévue de réalisation"} name={"dateCorrection"}>
                        <DatePicker format={"DD/MM/YYYY"} className={"w-100"}/>
                    </Form.Item>
                    <Form.Item label={"Responsable action"} name={"respCorrection"}>
                        <Input/>
                    </Form.Item>
                    <Form.Item name={"action"} label={"Action corrective"}>
                        <Input.TextArea/>
                    </Form.Item>
                    <Form.Item label={"Date prévue de réalisation"} name={"dateAction"}>
                        <DatePicker format={"DD/MM/YYYY"} className={"w-100"}/>
                    </Form.Item>
                    <Form.Item label={"Responsable action"} name={"respAction"}>
                        <Input/>
                    </Form.Item>


                    <Form.Item className="text-center">
                        <Button htmlType={"submit"} type={"success"} children={"Enregistrer"}/>
                    </Form.Item>


                </Form>
            </div>
        </div>
    </div>
}

const dtp = (dsp) => ({actions: bindActionCreators(types, dsp)})

export default connect(null, dtp)(GMQ01);
