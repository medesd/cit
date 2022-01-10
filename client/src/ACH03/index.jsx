import React, {useEffect, useState} from 'react';
import {DatePicker, Form, Input, InputNumber, Modal} from "antd";
import Button from "antd-button-color";
import axios from "axios";
import {ConvertDate, ExportAch03} from "../tools";
import ach03 from '../assets/ACH03.xlsx';
import {DeleteOutlined, EditOutlined} from "@ant-design/icons";
import {bindActionCreators} from "redux";
import * as types from "../redux/actions/actions";
import {connect} from "react-redux";

const ACH03 = (props) => {
    const [state, setState] = useState({data: [], modalAdd: false})

    useEffect(() => {
        axios.create().get("/api/ach03").then(ft => {
            ft.data = ft.data.map(x => {
                x.dateFac = ConvertDate(x.dateFac)
                x.enhance = ConvertDate(x.enhance)
                x.dateReg = ConvertDate(x.dateReg)
                return x;
            })
            setState(f => ({...f, data: ft.data}))
        })
        props.actions.setHeaderTitle("Etat de suivi des prestataires");
        return () => {
            props.actions.setHeaderTitle("");
        }
    }, [props.actions])


    const modalAdd = <Modal title={"Ajouter"} footer={[]} visible={state.modalAdd}
                            onOk={() => setState(f => ({...f, modalAdd: false}))}
                            onCancel={() => setState(f => ({...f, modalAdd: false}))}>

        <Form onFinish={val => {
            axios.create().post('/api/ach03', val).then(ft => {

            })
        }} labelAlign={"left"} labelCol={{span: 7}}>
            <Form.Item name={"ref"} label={"Facture N°"}>
                <Input/>
            </Form.Item>
            <Form.Item name={"dateFac"} label={"Date Facture"}>
                <DatePicker className={"w-100"} format={"DD/MM/YYYY"}/>
            </Form.Item>
            <Form.Item name={"name"} label={"Nom"}>
                <Input/>
            </Form.Item>
            <Form.Item name={"details"} label={"Détails"}>
                <Input.TextArea/>
            </Form.Item>
            <Form.Item name={"ttc"} label={"MT TTC"}>
                <InputNumber className={"w-100"}/>
            </Form.Item>
            <Form.Item label={"Etat du règlement"} name={"etatReg"}>
                <Input/>
            </Form.Item>
            <Form.Item label={"Échéance"} name={"enhance"}>
                <DatePicker className={"w-100"} format={"DD/MM/YYYY"}/>
            </Form.Item>
            <Form.Item name={"dateReg"} label={"Date de règlement"}>
                <DatePicker className={"w-100"} format={"DD/MM/YYYY"}/>
            </Form.Item>
            <Form.Item name={"modeReg"} label={"Mode de règlement"}>
                <Input/>
            </Form.Item>
            <Form.Item className={"text-center"}>
                <Button type={"success"} htmlType={"submit"} children={"Ajouter"}/>
            </Form.Item>
        </Form>

    </Modal>
    return (
        <div className={"container-fluid"}>
            {modalAdd}
            <div className="row justify-content-around mt-4">
                <div className="col-xs">
                    <Button type={"success"} children={"Ajouter"}
                            onClick={() => setState(f => ({...f, modalAdd: true}))}/>
                </div>
                <div className="col-xs">
                    <Input.Search/>
                </div>
            </div>
            <div className="row mt-2">
                <div className="col">
                    <table className={"table text-center table-align-middle table-bordered"}>
                        <thead>
                        <tr>
                            <th>Facture N°</th>
                            <th>Date Facture</th>
                            <th>Nom</th>
                            <th>Détails</th>
                            <th>MT TTC</th>
                            <th>Etat du règlement</th>
                            <th>Échéance</th>
                            <th>Date de règlement</th>
                            <th>Mode de règlement</th>
                            <th>Action</th>
                        </tr>
                        </thead>
                        <tbody>
                        {
                            state.data?.map(x => {
                                return <tr key={x.id}>
                                    <td>{x.ref}</td>
                                    <td>{x.dateFac}</td>
                                    <td>{x.name}</td>
                                    <td>{x.details}</td>
                                    <td>{x.ttc}</td>
                                    <td>{x.etatReg}</td>
                                    <td>{x.enhance}</td>
                                    <td>{x.dateReg}</td>
                                    <td>{x.modeReg}</td>
                                    <td><Button type={"primary"} className={"mr-1"} shape={"circle"}
                                                icon={<EditOutlined/>}/>
                                        <Button type={"danger"} onClick={() => {
                                            axios.create().delete("/api/ach03/" + x.id).then(() => {
                                                const data = state.data.filter(f => f.id !== x.id);
                                                setState(f => ({...f, data}));
                                            })
                                        }} className={"ml-1"} shape={"circle"} icon={<DeleteOutlined/>}/></td>
                                </tr>
                            })
                        }
                        </tbody>
                    </table>
                </div>
            </div>
            <div className="row mt-3">
                <div className="col text-center">
                    <Button type={"success"} onClick={() => {
                        ExportAch03({data: state.data}, ach03, "ACH03")
                    }} children={"Export as Xlsx"}/>
                </div>
            </div>
        </div>
    );
};

const dtp = (dsp) => ({actions: bindActionCreators(types, dsp)})


export default connect(null, dtp)(ACH03);
