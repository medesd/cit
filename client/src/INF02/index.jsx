import React, {useEffect, useState} from 'react';
import axios from "axios";
import Button from "antd-button-color";
import {AutoComplete, Form, Input, Modal, Popconfirm} from "antd";
import {DeleteOutlined} from "@ant-design/icons";
import {bindActionCreators} from "redux";
import {connect} from "react-redux";
import * as AcTypes from "../redux/actions/actions";

const {Search} = Input;

const types = ["CPU", "RAM", "DISQUE DUR", "ÉCRAN", "ACCESSOIRES", "SYSTÈME", "ONDULEUR", "WEBCAM", "IP", "AUTRE"]

const INF02 = (props) => {
    const [form] = Form.useForm();
    const [state, setState] = useState({mats: [], employees: [], modalAdd: false});

    useEffect(() => {
        axios.create().get("/api/inf02").then(x => setState(f => ({...f, mats: x.data})));
        axios.create().get("/api/employees/names").then(x => x.data === '' || setState(f => ({
            ...f,
            employees: x.data
        })));
        form.setFieldsValue({type: [{}]})

        props.actions.setHeaderTitle("List du matériel");
        return () => {
            props.actions.setHeaderTitle("");
        }

    }, [props.actions, form]);


    const modalAdd = <Modal
        forceRender={true}
        title={"Ajouter"}
        footer={[]}
        visible={state.modalAdd} onOk={() => setState(f => ({...f, modalAdd: false}))}
        onCancel={() => setState(f => ({...f, modalAdd: false}))}>

        <Form form={form} onFinish={val => {
            axios.create().post("/api/inf02", {...val, type: JSON.stringify(val.type)}).then(ft => {
                setState(f => ({...f, mats: [...f.mats, ft.data]}));
                form.resetFields();
            });
        }} labelCol={{span: 4}} wrapperCol={{offset: 1}}>
            <Form.Item name={"designation"} label={"Désignation"}>
                <Input/>
            </Form.Item>
            <Form.List name={"type"}>
                {(fields, {add, remove}) => <div className={"container"}>
                    <div className="row flex-column mb-3 align-items-center justify-content-center">
                        <div className="col-xs"><h5>Type</h5></div>
                        <div className="col">
                            {fields.map(({key, name, fieldKey, ...restField}) => {
                                return <div key={key} className={"row"}>
                                    <div className="col">
                                        <Form.Item {...restField} name={[name, 'type']} label={"Type"}>
                                            <AutoComplete className={"w-100"} options={types.map(x => ({
                                                value: x
                                            }))}/>
                                        </Form.Item>
                                    </div>
                                    <div className="col">
                                        <Form.Item {...restField} name={[name, 'value']} label={"Nom"}>
                                            <Input/>
                                        </Form.Item>
                                    </div>
                                </div>
                            })}
                        </div>
                        <div className="col-xs">
                            <Button type={"success"} className={"mr-1"} onClick={() => add()} children={"+"}/>
                            <Button type={"danger"} className={"ml-1"} onClick={() => {
                                if (fields.length === 1) return;
                                remove(fields.at(-1).name)
                            }} children={"-"}/>
                        </div>
                    </div>
                </div>}
            </Form.List>


            <Form.Item name={"affectation"} label={"Affectation"}>
                <AutoComplete
                    onChange={c => console.log(state)}
                    options={state.employees?.map(x => ({value: x.firstName[0] + "." + x.lastName}))}/>
            </Form.Item>

            <Form.Item name={"comment"} label={"Commentaire"}>
                <Input.TextArea/>
            </Form.Item>

            <Form.Item wrapperCol={{offset: 5}}>
                <Button type={"success"} htmlType={"submit"} children={"Ajouter"}/>
            </Form.Item>
        </Form>


    </Modal>

    const makeType = (type = '') => {
        const o = JSON.parse(type);
        return o.map((x, i) => <div className={"row m-0 justify-content-center"} key={i}>
            <div className={"col-xs"}>{x.type}</div>
            <div className="col-xs">:</div>
            <div className={"col-xs"}>{x.value}</div>
        </div>)
    }


    return (
        <div className={"container"}>
            {modalAdd}
            <div className="row mt-5 mx-3 justify-content-between">
                <div className="col-xs">
                    <Button onClick={() => setState(f => ({...f, modalAdd: true}))} type={"success"}
                            children={"Ajouter"}/>
                </div>
                <div className="col-xs">
                    <Search allowClear onSearch={(e) => {
                        axios.create().get("/api/inf02?filter=" + e).then(x => setState(f => ({...f, mats: x.data})));
                    }} placeholder={"Rechercher"}/>
                </div>
            </div>
            <div className="row mt-2">
                <div className="col">
                    <table className={"table table-bordered table-hover"}>
                        <thead>
                        <tr>
                            <td>Désignation</td>
                            <td>Type</td>
                            <td>Affectation</td>
                            <td>Commentaire</td>
                            <td>Action</td>
                        </tr>
                        </thead>
                        <tbody>
                        {state.mats?.map((x, i) => {
                            return <tr key={i}>
                                <td>{x.designation}</td>
                                <td>{makeType(x.type)}</td>
                                <td>{x.affectation}</td>
                                <td>{x.comment}</td>
                                <td className={"align-middle text-center"}>
                                    <Popconfirm title="Êtes-vous sûr de supprimer ce Element?" onConfirm={() => {
                                        axios.create().delete("/api/inf02/" + x.id).then(() => {

                                            setState(f => ({
                                                ...f,
                                                mats: f.mats.filter(s => s.id !== x.id)
                                            }))

                                        });
                                    }}>
                                        <Button
                                            type={"danger"} shape={"circle"}
                                            icon={<DeleteOutlined/>}/>
                                    </Popconfirm>
                                </td>
                            </tr>
                        })}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

const dtp = (dsp) => ({actions: bindActionCreators(AcTypes, dsp)})

export default connect(null, dtp)(INF02);
