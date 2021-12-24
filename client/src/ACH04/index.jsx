import React, {useEffect, useState} from 'react';
import {Form, Input, Modal, Popover, Select} from "antd";
import Button from "antd-button-color";
import axios from "axios";
import moment from "moment";
import ach04 from '../assets/ACH04.xlsx'
import {ExportAch04} from "../tools";
import {DeleteOutlined, EditOutlined} from "@ant-design/icons";
import {bindActionCreators} from "redux";
import * as types from "../redux/actions/actions";
import {connect} from "react-redux";

const ACH04 = (props) => {
    const [state, setState] = useState({year: moment().year(), data: [], modalAdd: false});

    useEffect(() => {
        axios.create().get('/api/ach04/' + state.year).then(ft => {
            setState(f => ({...f, data: ft.data}))
        })

        props.actions.setHeaderTitle("Liste des prestataires et des prestataires evalues");
        return () => {
            props.actions.setHeaderTitle("");
        }
    }, [props.actions,state.year]);


    const modalAdd = <Modal footer={[]} title={"Ajouter"} onCancel={() => setState(f => ({...f, modalAdd: false}))}
                            onOk={() => setState(f => ({...f, modalAdd: false}))} visible={state.modalAdd}>
        <Form onFinish={val => {
            axios.create().post('/api/ach04', val).then(ft => {
                setState(f => ({...f, modalAdd: false}));
                console.log(ft);
            })
        }} labelAlign={"left"} labelCol={{span: 7}}>
            <Form.Item name={"entreprise"} label={"Nom ou siege social"}>
                <Input/>
            </Form.Item>
            <Form.Item name={"type"} label={"Type"}>
                <Input/>
            </Form.Item>
            <Form.Item name={"ice"} label={"ICE"}>
                <Input/>
            </Form.Item>
            <Form.Item name={"rep"} label={"Représentant"}>
                <Input/>
            </Form.Item>
            <Form.Item name={"tele"} label={"Telephone"}>
                <Input/>
            </Form.Item>
            <Form.Item name={"mail"} label={"E-mail"}>
                <Input/>
            </Form.Item>
            <Form.Item name={"banque"} label={"Banque"}>
                <Input/>
            </Form.Item>
            <Form.Item name={"compte"} label={"N°compte"}>
                <Input/>
            </Form.Item>
            <Form.Item label={"Classe"} name={"classe"}>
                <Select>
                    <Select.Option value={"A"} children={"A"}/>
                    <Select.Option value={"B"} children={"B"}/>
                    <Select.Option value={"C"} children={"C"}/>
                    <Select.Option value={null} children={"NON MOUVEMENTES"}/>
                </Select>
            </Form.Item>
            <Form.Item name={"just"} label={"Justification"}>
                <Input.TextArea/>
            </Form.Item>
            <Form.Item className={"text-center"}>
                <Button htmlType={"submit"} type={"success"} children={"Ajouter"}/>
            </Form.Item>
        </Form>
    </Modal>


    return (
        <div className={"container-fluid"}>
            {modalAdd}
            <div className="row mt-4">
                <div className="col-xs">
                    <Button type={"success"} onClick={() => setState(f => ({...f, modalAdd: true}))}
                            children={"Ajouter"}/>
                </div>
            </div>
            <div className="row mt-3">
                <div className="col text-center">
                    <table className={"table mt-2 table-bordered text-center table-align-middle"}>
                        <thead>
                        <tr>
                            <th>NOM OU SIEGE SOCIAL</th>
                            <th>TYPE</th>
                            <th>ICE</th>
                            <th>REPRÉSENTANT</th>
                            <th>TELEPHONE</th>
                            <th>E-MAIL</th>
                            <th>BANQUE</th>
                            <th>N°COMPTE</th>
                            <th>CLASSE</th>
                            <th>JUSTIFICATION</th>
                            <th>ACTION</th>
                        </tr>
                        </thead>
                        <tbody>
                        {
                            state.data?.map(x => {
                                return <tr key={x.id}>
                                    <td>{x.entreprise}</td>
                                    <td>{x.type}</td>
                                    <td>{x.ice}</td>
                                    <td>{x.rep}</td>
                                    <td>{x.tele}</td>
                                    <td>{x.mail}</td>
                                    <td>{x.banque}</td>
                                    <td>{x.compte}</td>
                                    {
                                        !x.classe ? <Popover content={"PRESTATAIRE NON MOUVEMENTES"}>
                                            <td className={x.classe || "bg-dark"}>{x.classe}</td>
                                        </Popover> : <td className={x.classe || "bg-dark"}>{x.classe}</td>
                                    }

                                    <td>{x.just}</td>
                                    <td><Button type={"primary"} className={"mr-1"} shape={"circle"}
                                                icon={<EditOutlined/>}/>
                                        <Button type={"danger"} onClick={() => {
                                            axios.create().delete("/api/ach04/" + x.id).then(() => {
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
            <div className="row">
                <div className="col text-center">
                    <Button type={"success"} onClick={() => {
                        ExportAch04({data: state.data, year: state.year}, ach04, "ACH04_" + state.year)
                    }} children={"Export as Xlsx"}/>
                </div>
            </div>
        </div>
    );
};

const dtp = (dsp) => ({actions: bindActionCreators(types, dsp)})


export default connect(null, dtp)(ACH04);
