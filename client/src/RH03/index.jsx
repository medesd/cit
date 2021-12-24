import React, {useEffect} from 'react';
import {DatePicker, Form, Input} from "antd";
import Button from "antd-button-color";
import {MinusOutlined, PlusOutlined} from "@ant-design/icons";
import {ConvertDate, ExportRH03, ReplaceWithEmpty} from "../tools";
import rh03 from "../assets/RH03.docx";
import axios from "axios";
import moment from "moment";
import {bindActionCreators} from "redux";
import * as types from "../redux/actions/actions";
import {connect} from "react-redux";

const RH03 = (props) => {
    const [form] = Form.useForm();

    useEffect(() => {
        axios.create().get("/api/rh03/generate").then(ft => {
            form.setFieldsValue({date: moment(), ref: ft.data, donnes: [{}]})
        })

        props.actions.setHeaderTitle("Feuille de presence");
        return () => {
            props.actions.setHeaderTitle("");
        }
    }, [props.actions,form])


    return (
        <div className={"container-fluid"}>
            <div className="row justify-content-center mt-5">
                <div className="col-8">
                    <Form form={form} onFinish={val => {
                        val = ReplaceWithEmpty(val);
                        val.date = ConvertDate(val.date);
                        axios.create().post("/api/rh03", {...val, data: JSON.stringify(val)}).then(() => {
                            axios.create().get("/api/rh03/generate").then(ft2 => {
                                ExportRH03(val, rh03);
                                form.resetFields();
                                form.setFieldsValue({date: moment(), ref: ft2.data, donnes: [{}]})
                            })
                        })
                        console.log(val)
                    }} labelAlign={"left"} labelCol={{span: 4}}>
                        <Form.Item name={"ref"} label={"N°"}>
                            <Input/>
                        </Form.Item>
                        <Form.Item name={"date"} label={"Date"}>
                            <DatePicker className={"w-100"} format={"DD/MM/YYYY"}/>
                        </Form.Item>
                        <Form.Item name={"theme"} label={"Thème"}>
                            <Input/>
                        </Form.Item>
                        <Form.List name={"donnes"}>
                            {
                                ((fields, {add, remove}) => {
                                    return <div className={"row flex-column m-0"}>
                                        <div className="col">
                                            <table className={"table table-bordered"}>
                                                <thead>
                                                <tr>
                                                    <th>Nom du participant</th>
                                                    <th>Service</th>
                                                    <th>Emergement</th>
                                                </tr>
                                                </thead>
                                                <tbody>
                                                {
                                                    fields.map(({name, key, fieldKey, ...rest}) => {
                                                        return <tr key={key}>
                                                            <td>
                                                                <Form.Item fieldKey={[fieldKey, "name"]}
                                                                           name={[name, "name"]} {...rest}>
                                                                    <Input/>
                                                                </Form.Item>
                                                            </td>
                                                            <td>
                                                                <Form.Item fieldKey={[fieldKey, "service"]}
                                                                           name={[name, "service"]} {...rest} >
                                                                    <Input/>
                                                                </Form.Item>
                                                            </td>
                                                            <td>
                                                                <Form.Item fieldKey={[fieldKey, "emergement"]}
                                                                           name={[name, "emergement"]} {...rest}>
                                                                    <Input/>
                                                                </Form.Item>
                                                            </td>
                                                        </tr>
                                                    })
                                                }
                                                </tbody>
                                            </table>
                                        </div>
                                        <div className="col d-flex justify-content-center">
                                            <Button className={"mr-1"} onClick={() => add()} shape={"circle"}
                                                    type={"success"} icon={<PlusOutlined/>}/>
                                            <Button className={"ml-1"}
                                                    onClick={() => fields.length === 1 || remove(fields.at(-1).name)}
                                                    shape={"circle"} type={"danger"}
                                                    icon={<MinusOutlined/>}/>
                                        </div>
                                    </div>
                                })
                            }
                        </Form.List>
                        <Form.Item className={"text-center mt-2"}>
                            <Button htmlType={"submit"} type={"success"} children={"Enregistrer"}/>
                        </Form.Item>
                    </Form>
                </div>
            </div>
        </div>
    );
};

const dtp = (dsp) => ({actions: bindActionCreators(types, dsp)})


export default connect(null, dtp)(RH03);
