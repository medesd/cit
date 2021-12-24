import React, {Fragment, useEffect, useState} from 'react';
import {Form, Input, Modal} from "antd";
import {MinusOutlined, PlusOutlined} from "@ant-design/icons";
import Button from "antd-button-color";
import axios from "axios";
import {bindActionCreators} from "redux";
import * as types from "../redux/actions/actions";
import {connect} from "react-redux";

const ACH05 = (props) => {
    const [state, setState] = useState({modalAdd: false, data: []})


    useEffect(() => {
        axios.create().get("/api/ach05").then(ft => {
            setState(f => ({...f, data: ft.data}))
        })
        props.actions.setHeaderTitle("Tableau comparatif des prestataires");
        return () => {
            props.actions.setHeaderTitle("");
        }
    }, [props.actions])


    const modalAdd = <Modal footer={[]} style={{minWidth: 800}} title={"Ajouter"}
                            onCancel={() => setState(f => ({...f, modalAdd: false}))}
                            onOk={() => setState(f => ({...f, modalAdd: false}))} visible={state.modalAdd}>
        <Form onFinish={val => {
            axios.create().post("/api/ach05", {ref: val.ref, data: JSON.stringify(val.donnes)}).then(ft => {
                console.log(ft);
            })
        }
        } labelAlign={"left"} labelCol={{span: 4}}>
            <Form.Item label={"Reference produit"} name={"ref"}>
                <Input/>
            </Form.Item>
            <Form.List name={"donnes"}>
                {
                    (fields, {add, remove}) => <div className="container-fluid">
                        <div className="row">
                            <div className="col"><h5 className="text-center">Services</h5></div>
                        </div>
                        <div className="row">
                            <div className="col">
                                <table className="table table-bordered table-align-middle text-center">
                                    <thead>
                                    <tr>
                                        <th>Prestataire</th>
                                        <th>P.U</th>
                                        <th>Qualité</th>
                                        <th>Délai</th>
                                        <th>Modalité</th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    {
                                        fields.map(({name, fieldKey, key, ...rest}) => {
                                            return <tr key={key}>
                                                <td>
                                                    <Form.Item fieldKey={[fieldKey, "prestataire"]}
                                                               name={[name, "prestataire"]} {...rest}>
                                                        <Input.TextArea/>
                                                    </Form.Item>
                                                </td>
                                                <td>
                                                    <Form.Item fieldKey={[fieldKey, "pu"]}
                                                               name={[name, "pu"]} {...rest}>
                                                        <Input/>
                                                    </Form.Item>
                                                </td>
                                                <td>
                                                    <Form.Item fieldKey={[fieldKey, "quality"]}
                                                               name={[name, "quality"]} {...rest}>
                                                        <Input/>
                                                    </Form.Item>
                                                </td>
                                                <td>
                                                    <Form.Item fieldKey={[fieldKey, "detail"]}
                                                               name={[name, "detail"]} {...rest}>
                                                        <Input/>
                                                    </Form.Item>
                                                </td>
                                                <td>
                                                    <Form.Item fieldKey={[fieldKey, "modality"]}
                                                               name={[name, "modality"]} {...rest}>
                                                        <Input/>
                                                    </Form.Item>
                                                </td>

                                            </tr>
                                        })
                                    }
                                    </tbody>
                                </table>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col text-center">
                                <Button shape={"circle"} className={"mr-1"} type={"success"}
                                        onClick={() => add()} icon={<PlusOutlined/>}/>
                                <Button shape={"circle"} className={"ml-1"} type={"danger"}
                                        onClick={() => fields.length <= 1 || remove(fields.at(-1).name)}
                                        icon={<MinusOutlined/>}/>
                            </div>
                        </div>
                    </div>
                }
            </Form.List>
            <Form.Item className="text-center mt-3">
                <Button type={"success"} htmlType={"submit"} children={"Ajouter"}/>
            </Form.Item>
        </Form>
    </Modal>
    return (
        <div className="container-fluid">
            {modalAdd}
            <div className="row justify-content-around mt-5">
                <div className="col-xs">
                    <Button type={"success"} onClick={() => setState(f => ({...f, modalAdd: true}))}
                            children={"Ajouter"}/>
                </div>
                <div className="col-xs">
                    <Input.Search/>
                </div>
            </div>
            <div className="row mt-2">
                <div className="col">
                    <table className="table text-center table-align-middle table-bordered">
                        <thead>
                        <tr>
                            <th rowSpan={2}>REFERENCES PRODUITS/ SERVICE</th>
                            {
                                Array.from(new Set(state.data?.map(x => x.data).flat().map(x => x.prestataire))).map((x, i) => {
                                    return <th key={i} colSpan={4}>{x}</th>
                                })
                            }
                        </tr>
                        <tr>
                            {
                                Array.from(new Set(state.data?.map(x => x.data).flat().map(x => x.prestataire))).map((x, i) => {
                                    return ["P.U", "Qualité", "Délai", "Modalité"].map(f => <th
                                        key={i + "" + f}>{f}</th>)
                                })
                            }
                        </tr>
                        </thead>

                        <tbody>
                        {
                            state.data?.map(x => <tr key={x.id}>
                                <td>{x.ref}</td>
                                {
                                    Array.from(new Set(state.data?.map(x => x.data).flat().map(x => x.prestataire))).map((y, i) => {
                                        if (!x.data.map(s => s.prestataire).includes(y)) return Array.from(Array(4).keys()).map(e =>
                                            <td key={e}/>)


                                        const current = x.data.find(d => d.prestataire === y);

                                        return <Fragment key={x.id + "" + y}>
                                            <td>{current.pu}</td>
                                            <td>{current.quality}</td>
                                            <td>{current.detail}</td>
                                            <td>{current.modality}</td>
                                        </Fragment>
                                    })
                                }
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


export default connect(null, dtp)(ACH05);