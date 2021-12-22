import React, {useEffect} from "react";
import {bindActionCreators} from "redux";
import * as types from "../redux/actions/actions";
import {connect} from "react-redux";
import {Form, Input} from "antd";
import {GenerateDocument} from "../tools";
import gmq01 from "../assets/GMQ01.docx";
import axios from "axios";
import Button from "antd-button-color";


const GMQ01 = (props) => {
    const [form] = Form.useForm();

    useEffect(() => {
        axios.create().get("/api/gmq01/generate").then(ft => {
            form.setFieldsValue({ref: ft.data});
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
                    GenerateDocument(values, gmq01, values.ref + "_FN");
                    axios.post("/api/gmq01", {
                        ref: values.ref
                    }).then(() => {
                        axios.create().get("/api/gmq01/generate").then(ft => {
                            form.setFieldsValue({ref: ft.data});
                        })
                    });
                }} labelAlign={"left"} labelCol={{span: 6}}>

                    <Form.Item name={"ref"} label={"N°"}>
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

export default connect(null, dtp)(GMQ01);
