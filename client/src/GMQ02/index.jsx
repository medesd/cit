import React, {useEffect} from "react";
import {bindActionCreators} from "redux";
import * as types from "../redux/actions/actions";
import {connect} from "react-redux";
import {DatePicker, Form, Input} from "antd";
import {ConvertDate, ExportTest, GenerateSheet} from "../tools";
import gmq02 from "../assets/GMQ02.xlsx";
import axios from "axios";
import Button from "antd-button-color";
import moment from "moment";


const GMQ02 = (props) => {
    const [form] = Form.useForm();

    useEffect(() => {
        axios.create().get("/api/gmq02/generate").then(ft => {
            form.setFieldsValue({ref: ft.data, date: moment()});
        });
        props.actions.setHeaderTitle("Bordereau de diffusion");
        return () => {
            props.actions.setHeaderTitle("");
        }
    }, [props.actions, form]);


    return <div className={"container"}>
        <div className="row mt-4 justify-content-center">
            <div className="col-8">
                <Form form={form} onFinish={values => {
                    GenerateSheet({...values, date: ConvertDate(values.date)}, gmq02, values.ref + "_FN");
                    axios.post("/api/gmq02", {
                        ref: values.ref
                    }).then(() => {
                        axios.create().get("/api/gmq02/generate").then(ft => {
                            form.setFieldsValue({ref: ft.data});
                        })
                    });
                }} labelAlign={"left"} labelCol={{span: 6}}>

                    <Form.Item name={"ref"} label={"N°"}>
                        <Input/>
                    </Form.Item>
                    <Form.Item name={"date"} label={"Date"}>
                        <DatePicker className={"w-100"} format={"DD/MM/YYYY"}/>
                    </Form.Item>

                    <Form.Item>
                        <Button htmlType={"submit"} type={"success"} children={"Generate"}/>
                    </Form.Item>
                    <Button onClick={() => {
                        ExportTest()
                    }} children={"click"}/>
                </Form>
            </div>
        </div>
    </div>
}

const dtp = (dsp) => ({actions: bindActionCreators(types, dsp)})

export default connect(null, dtp)(GMQ02);
