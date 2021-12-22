import React, {useEffect} from 'react';
import {DatePicker, Form, Input} from "antd";
import Button from "antd-button-color";
import {ConvertDate, ExportTest} from "../tools";
import axios from "axios";
import {bindActionCreators} from "redux";
import * as types from "../redux/actions/actions";
import {connect} from "react-redux";

const GMQ09 = (props) => {
    const [form] = Form.useForm();

    useEffect(() => {
        axios.create().get("/api/gmq09/generate").then(ft => {
            form.setFieldsValue({ref: ft.data, realisation: [""], decisions: [{}]})
        });

        props.actions.setHeaderTitle("PV");
        return () => {
            props.actions.setHeaderTitle("");
        }

    }, [props.actions,form]);

    return (
        <div className={"container"}>
            <div className="row mt-5 justify-content-center">
                <div className="col-10">
                    <Form form={form} labelAlign={"left"}
                          onFinish={(val) => {

                              val = {
                                  ...val,
                                  decisions: [...val.decisions.map(x => {
                                      x.datePre = ConvertDate(x.datePre);
                                      x.dateReel = ConvertDate(x.dateReel);
                                      return x;
                                  }),],
                                  date: ConvertDate(val.date)
                              }
                              ExportTest(val);

                              axios.create().post("/api/gmq09", {...val, data: JSON.stringify(val)}).then(() => {


                                  axios.create().get("/api/gmq09/generate").then(x => {
                                      form.resetFields();
                                      form.setFieldsValue({ref: x.data, realisation: [""], decisions: [{}]})
                                  });
                              })
                          }} labelCol={{span: 5}}>
                        <Form.Item label={"N°"} name={"ref"}>
                            <Input/>
                        </Form.Item>
                        <Form.Item label={"Date"} name={"date"}>
                            <DatePicker format={"DD/MM/YYYY"} className={"w-100"}/>
                        </Form.Item>
                        <Form.Item label={"Étaient présents"} name={"presents"}>
                            <Input/>
                        </Form.Item>
                        <Form.Item label={"Ordre du jour"} name={"ordre"}>
                            <Input/>
                        </Form.Item>
                        <Form.List name={"realisation"}>
                            {((fields, {add, remove}) => {
                                return <div className={"row align-items-center flex-column"}>
                                    <div className="col">
                                        <div className="h4 text-center">
                                            Realisation
                                        </div>
                                    </div>
                                    <div className="col w-50">
                                        {fields.map(x => {
                                            return <Form.Item
                                                key={x.key}
                                                {...x}>
                                                <Input/>
                                            </Form.Item>
                                        })}
                                    </div>
                                    <div className="col d-flex justify-content-center">
                                        <Button className={"mr-1"} onClick={() => add()} children={"+"}/>
                                        <Button className={"ml-1"} onClick={() => {
                                            if (fields.length === 1) return;
                                            remove(fields.at(-1).name)
                                        }} children={"-"}/>
                                    </div>
                                </div>
                            })}
                        </Form.List>
                        <div className="row mt-3"/>
                        <Form.List name={"decisions"}>
                            {
                                (fields, {add, remove}) => {
                                    return <div className={"row flex-column"}>
                                        <div className="col">
                                            <table className={"table table-bordered"}>
                                                <thead>
                                                <tr>
                                                    <th>Action</th>
                                                    <th>Responsable</th>
                                                    <th>Date prévue</th>
                                                    <th>Date de réelle</th>
                                                    <th>Commentaire et évaluation</th>
                                                </tr>
                                                </thead>
                                                <tbody>
                                                {
                                                    fields.map(({key, name, fieldKey, ...restField}) => {
                                                        return <tr key={key}>
                                                            <td>
                                                                <Form.Item
                                                                    name={[name, 'action']}
                                                                    fieldKey={[fieldKey, 'action']}
                                                                    {...restField}>
                                                                    <Input.TextArea/>
                                                                </Form.Item>
                                                            </td>
                                                            <td>
                                                                <Form.Item name={[name, 'responsable']}
                                                                           fieldKey={[fieldKey, 'responsable']} {...restField}>
                                                                    <Input.TextArea/>
                                                                </Form.Item>
                                                            </td>
                                                            <td>
                                                                <Form.Item name={[name, 'datePre']}
                                                                           fieldKey={[fieldKey, 'datePre']} {...restField}>
                                                                    <DatePicker format={"DD/MM/YYYY"}/>
                                                                </Form.Item>
                                                            </td>
                                                            <td>
                                                                <Form.Item name={[name, 'dateReel']}
                                                                           fieldKey={[fieldKey, 'dateReel']} {...restField}>
                                                                    <DatePicker format={"DD/MM/YYYY"}/>
                                                                </Form.Item>
                                                            </td>
                                                            <td>
                                                                <Form.Item name={[name, 'comment']}
                                                                           fieldKey={[fieldKey, 'comment']} {...restField}>
                                                                    <Input.TextArea/>
                                                                </Form.Item>
                                                            </td>
                                                        </tr>
                                                    })
                                                }
                                                </tbody>
                                            </table>
                                        </div>
                                        <div className="col d-flex justify-content-center">
                                            <Button className={"mr-1"} onClick={() => add()} children={"+"}/>
                                            <Button className={"ml-1"} onClick={() => {
                                                if (fields.length === 1) return;
                                                remove(fields.at(-1).name)
                                            }} children={"-"}/>
                                        </div>
                                    </div>
                                }
                            }
                        </Form.List>

                        <div className={"row mt-3 justify-content-center"}>
                            <Button type={"success"} children={"Enregistrer"} htmlType={"submit"}/>
                        </div>
                    </Form>
                </div>
            </div>
        </div>
    );
};


const dtp = (dsp) => ({actions: bindActionCreators(types, dsp)})

export default connect(null, dtp)(GMQ09);
