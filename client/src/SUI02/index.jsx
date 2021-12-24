import React, {useEffect, useState} from 'react';
import {DatePicker, Form, Input, InputNumber, Modal, Select} from "antd";
import Button from "antd-button-color";
import {DownloadOutlined, MinusOutlined, PlusOutlined} from "@ant-design/icons";
import {ConvertDate, ExportSui02} from "../tools";
import sui02 from '../assets/SUI02.xlsx';
import axios from "axios";
import moment from "moment";
import {bindActionCreators} from "redux";
import * as types from "../redux/actions/actions";
import {connect} from "react-redux";

const SUI02 = (props) => {
    const [state, setState] = useState({raps: [], modalAdd: false, projectNames: [], lastValue: 0});
    const [form] = Form.useForm();


    const updateForm = () => {
        const donnes = form.getFieldsValue().donnes;

        if (!donnes || donnes.length < 1) {
            setState(f => ({...f, lastValue: 0}));
            return;
        }

        const res = donnes.filter(x => x?.avancement !== undefined).map(x => parseFloat(x.avancement));
        if (res.length < 1) return;
        setState(f => ({...f, lastValue: res.reduce((f, n) => f + n, 0) / res.length}));

    }

    const modalAdd = <Modal
        width={"80%"}
        title={"Ajouter"}
        footer={null}
        onOk={() => setState(f => ({...f, modalAdd: false}))}
        onCancel={() => setState(f => ({...f, modalAdd: false}))}
        visible={state.modalAdd}>
        <Form initialValues={{date: moment(), donnes: [{}]}} form={form} onFinish={val => {
            const data = val.donnes;
            delete val.donnes;
            axios.create().post('/api/sui02', {
                ...val,
                project: {ref: val.ref},
                data: JSON.stringify(data)
            }).then(() => {
                val.date = ConvertDate(val.date);
                ExportSui02({data, ...val, res: state.lastValue.toFixed(2) + "%"}, sui02, "sui02")
                form.resetFields();
                form.setFieldsValue({date: moment(), donnes: [{}]})
            })
        }} onChange={updateForm} onClick={updateForm} labelAlign={"left"} labelCol={{span: 4}}>
            <Form.Item name={"ref"} label={"Référence"}>
                <Select onChange={(_, e) => {
                    if (!e.key) return;
                    axios.create().get('/api/projects/' + e.key).then(ft => {
                        form.setFieldsValue({
                            ...ft.data,
                            id: ft.data.id,
                            numMarche: ft.data.numMarche || ft.data.ref,
                        })
                    })
                }} showSearch>
                    <Select.Option value={null} children={null}/>
                    {
                        state.projectNames?.map(x => <Select.Option key={x.id} value={x.ref}
                                                                    children={x.ref}/>)
                    }
                </Select>
            </Form.Item>
            <Form.Item name={"name"} label={"Projet"}>
                <Input/>
            </Form.Item>
            <Form.Item name={"numMarche"} label={"Marché N°"}>
                <Input/>
            </Form.Item>
            <Form.Item name={"maitreDouvrage"} label={"Maitre d'ouvrage"}>
                <Input/>
            </Form.Item>
            <Form.Item name={"date"} label={"Date"}>
                <DatePicker className="w-100" format={"DD/MM/YYYY"}/>
            </Form.Item>
            <Form.List name={"donnes"}>
                {
                    (fields, {add, remove}) => <div className="row flex-column">
                        <div className="col">
                            <table className="table text-center table-align-middle table-bordered">
                                <thead>
                                <tr>
                                    <th>
                                        Phase
                                    </th>
                                    <th>
                                        Designation
                                    </th>
                                    <th>
                                        U
                                    </th>
                                    <th>
                                        QTE Matché
                                    </th>
                                    <th>
                                        QTE exécuté
                                    </th>
                                    <th>
                                        Avancement
                                    </th>
                                </tr>
                                </thead>
                                <tbody>
                                {
                                    fields.map(({name, fieldKey, key, ...rest}) => <tr key={key}>
                                        <td>
                                            <Form.Item name={[name, "phase"]}
                                                       fieldKey={[fieldKey, "phase"]} {...rest}>
                                                <Input/>
                                            </Form.Item>
                                        </td>
                                        <td>
                                            <Form.Item name={[name, "designation"]}
                                                       fieldKey={[fieldKey, "designation"]} {...rest}>
                                                <Input/>
                                            </Form.Item>
                                        </td>
                                        <td>
                                            <Form.Item name={[name, "u"]}
                                                       fieldKey={[fieldKey, "u"]} {...rest}>
                                                <Input/>
                                            </Form.Item>
                                        </td>
                                        <td>
                                            <Form.Item name={[name, "qteMarche"]}
                                                       fieldKey={[fieldKey, "qteMarche"]} {...rest}>
                                                <Input/>
                                            </Form.Item>
                                        </td>
                                        <td>
                                            <Form.Item name={[name, "qteExecute"]}
                                                       fieldKey={[fieldKey, "qteExecute"]} {...rest}>
                                                <Input/>
                                            </Form.Item>
                                        </td>
                                        <td>
                                            <Form.Item
                                                rules={[{required: true, message: ''}, {
                                                    type: "number",
                                                    max: 100,
                                                    min: 0,
                                                    message: ''
                                                }]}
                                                name={[name, "avancement"]}
                                                fieldKey={[fieldKey, "avancement"]} {...rest}>
                                                <InputNumber addonAfter={"%"}/>
                                            </Form.Item>
                                        </td>
                                    </tr>)
                                }
                                </tbody>
                                <tfoot>
                                <tr>
                                    <td colSpan={5}/>
                                    <td>{!isNaN(state.lastValue) ? state.lastValue.toFixed(2) : 0}%</td>
                                </tr>
                                </tfoot>
                            </table>
                        </div>
                        <div className="col text-center">
                            <Button shape={"circle"} type={"success"} onClick={() => add()} className="mr-1"
                                    icon={<PlusOutlined/>}/>
                            <Button shape={"circle"} type={"danger"}
                                    onClick={() => fields.length <= 1 || remove(fields.at(-1).name)}
                                    className="ml-1" icon={<MinusOutlined/>}/>
                        </div>
                    </div>
                }
            </Form.List>
            <Form.Item className="text-center mt-2">
                <Button type={"success"} children={"Enregistrer"} htmlType={"submit"}/>
            </Form.Item>
        </Form>
    </Modal>


    useEffect(() => {
        axios.create().get('/api/sui02').then(ft => {
            setState(f => ({...f, raps: ft.data}))
            axios.create().get('/api/projects/names').then(ft2 => {
                setState(f => ({
                    ...f,
                    projectNames: ft2.data.filter(x => !ft.data.map(v => v.project.id).includes(x.id))
                }))
            })
        });
        props.actions.setHeaderTitle("Rapport d'avencemnt de suivi");
        return () => {
            props.actions.setHeaderTitle("");
        }
    }, [props.actions, form]);


    return (
        <div className="container-fluid">
            {modalAdd}
            <div className="row justify-content-around mt-4">
                <div className="col-xs">
                    <Button type={"success"} onClick={() => setState(f => ({...f, modalAdd: true}))}
                            children={"Ajouter"}/>
                </div>
                <div className="col-xs">
                    <Input.Search allowClear onSearch={(e) => {
                        axios.create().get('/api/sui02?filter=' + e).then(ft => setState(f => ({...f, raps: ft.data})));
                    }}/>
                </div>
            </div>
            <div className="row mt-3">
                <div className="col">
                    <table className="text-center table table-bordered table-striped table-hover table-align-middle">
                        <thead>
                        <tr>
                            <th>Référence</th>
                            <th>Projet</th>
                            <th>N°Marché</th>
                            <th>Maitre d'ouvrage</th>
                            <th>Date</th>
                            <th>Action</th>
                        </tr>
                        </thead>
                        <tbody>
                        {
                            state.raps?.map(x => <tr key={x.id}>
                                <td>{x.project.ref}</td>
                                <td>{x.project.name}</td>
                                <td>{x.project.numMarche || x.project.ref}</td>
                                <td>{x.project.maitreDouvrage}</td>
                                <td>{ConvertDate(x.date)}</td>
                                <td className="d-flex justify-content-around">
                                    <Button type={"success"} onClick={() => {


                                    }} shape={"circle"} icon={<DownloadOutlined/>}/>
                                </td>
                            </tr>)
                        }
                        </tbody>
                    </table>
                </div>
            </div>

        </div>
    );
};

const dtp = (dsp) => ({actions: bindActionCreators(types, dsp)})


export default connect(null, dtp)(SUI02);

