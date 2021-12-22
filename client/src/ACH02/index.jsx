import React, {useEffect, useState} from 'react';
import {DatePicker, Form, Input, InputNumber, Select} from "antd";
import Button from "antd-button-color";
import {MinusOutlined, PlusOutlined} from "@ant-design/icons";
import ach02 from "../assets/ACH02.docx";
import {ConvertDate, ExportACH02, ReplaceWithEmpty} from "../tools";
import axios from "axios";
import {bindActionCreators} from "redux";
import * as types from "../redux/actions/actions";
import {connect} from "react-redux";

const ACH02 = (props) => {
    const [state, setState] = useState({ref: null, ttc: 0, tva: 0, totalHt: 0});

    const [form] = Form.useForm();

    useEffect(() => {
        axios.create().get("/api/ach02/generate").then(ft => {
            setState(f => ({...f, ref: ft.data}))
            form.setFieldsValue({
                ref: ft.data,
                donnes: [{description: "", unite: "%", quality: 0, prix: 0, montant: 0}]
            })
            setState(f => ({...f, ttc: 0, tva: 0, totalHt: 0}))
        });

        props.actions.setHeaderTitle("Bon de commande");
        return () => {
            props.actions.setHeaderTitle("");
        }
    }, [props.actions,form]);

    const CalculTable = () => {

        const donnes = form.getFieldsValue(["donnes"])?.donnes;
        if (!donnes || !donnes[0]) return;

        const data = [];
        donnes.forEach(x => {
            if (!x?.unite || x?.quality === undefined || x?.prix === undefined) return;
            let montant;
            switch (x.unite) {
                case "%":
                    if (x.quality > 100) x.quality = 100;
                    if (x.quality < 1) x.quality = 1;
                    montant = ((parseFloat(x.prix || 0) * (x.quality / 100)) || 0).toFixed(3)
                    break;
                case "U":
                case "F":
                    montant = ((parseFloat(x.prix || 0) * x.quality) || 0).toFixed(3)
                    break;
                default:
                    montant = 0;
                    break;
            }
            data.push({...x, montant})
        })

        const totalHt = data.map(x => parseFloat(x.montant)).reduce((x, y) => x + y);
        const tva = totalHt * 0.2;
        const ttc = totalHt + tva;

        setState(f => ({...f, totalHt, tva, ttc}));

        form.setFieldsValue({donnes: data});
    }


    return (
        <div className={"container"}>
            <div className="row mt-4 justify-content-center">
                <div className="col-8">
                    <Form form={form} onClick={() => CalculTable()} onChange={() => CalculTable()} onFinish={val => {
                        setTimeout(() => {

                            let value = {...val, ...state}
                            value.dateAf = ConvertDate(value.dateAf);
                            value.datePre = ConvertDate(value.datePre);
                            value = ReplaceWithEmpty(value);
                            axios.create().post("/api/ach02", {
                                data: JSON.stringify(value),
                                ref: state.ref
                            }).then(() => {
                                ExportACH02(value, ach02);
                                form.resetFields();
                                axios.create().get("/api/ach02/generate").then(ft => {
                                    setState(f => ({...f, ref: ft.data}))
                                    form.setFieldsValue({
                                        ref: ft.data,
                                        donnes: [{description: "", unite: "%", quality: 0, prix: 0, montant: 0}]
                                    })
                                    setState(f => ({...f, ttc: 0, tva: 0, totalHt: 0}))
                                });
                            })


                        }, 200);
                    }} labelAlign={"left"} labelCol={{span: 4}}>
                        <Form.Item name={"ref"} label={"N°"}>
                            <Input/>
                        </Form.Item>
                        <Form.Item name={"datePre"} label={"Date"}>
                            <DatePicker className={"w-100"} format={"DD/MM/YYYY"}/>
                        </Form.Item>
                        <Form.Item name={"dateAf"} label={"A"}>
                            <DatePicker className={"w-100"} format={"DD/MM/YYYY"}/>
                        </Form.Item>
                        <Form.Item name={"entreprise"} label={"Entreprise"}>
                            <Input/>
                        </Form.Item>
                        <Form.Item name={"adress"} label={"Adresse"}>
                            <Input/>
                        </Form.Item>
                        <Form.Item name={"tel"} label={"Telephone"}>
                            <Input/>
                        </Form.Item>
                        <Form.Item name={"fax"} label={"Fax"}>
                            <Input/>
                        </Form.Item>

                        <Form.List name={"donnes"}>
                            {
                                (fields, {remove}) => {
                                    return <div className={"container-fluid"}>
                                        <div className="row">
                                            <div className="col">
                                                <h5 className={"text-center"}>Table</h5>
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="col">
                                                <table className={"table table-bordered"}>
                                                    <thead>
                                                    <tr>
                                                        <th>
                                                            Description
                                                        </th>
                                                        <th>
                                                            Unité
                                                        </th>
                                                        <th>
                                                            Qualité
                                                        </th>
                                                        <th>
                                                            Prix Unitaire
                                                        </th>
                                                        <th>
                                                            Montant
                                                        </th>
                                                    </tr>
                                                    </thead>
                                                    <tbody>

                                                    {
                                                        fields.map(({name, fieldKey, key, ...rest}) => {
                                                            return <tr key={key}>
                                                                <td>
                                                                    <Form.Item
                                                                        {...rest}
                                                                        fieldKey={[fieldKey, 'description']}
                                                                        name={[name, "description"]}>
                                                                        <Input/>
                                                                    </Form.Item>


                                                                </td>
                                                                <td>
                                                                    <Form.Item
                                                                        {...rest}
                                                                        fieldKey={[fieldKey, 'unite']}
                                                                        name={[name, "unite"]}
                                                                    >
                                                                        <Select>
                                                                            <Select.Option value={"%"} children={"%"}/>
                                                                            <Select.Option value={"U"} children={"U"}/>
                                                                            <Select.Option value={"F"} children={"F"}/>
                                                                        </Select>
                                                                    </Form.Item>
                                                                </td>
                                                                <td>

                                                                    <Form.Item
                                                                        {...rest}
                                                                        fieldKey={[fieldKey, 'quality']}
                                                                        name={[name, "quality"]}
                                                                    >
                                                                        <InputNumber/>
                                                                    </Form.Item>
                                                                </td>
                                                                <td>
                                                                    <Form.Item
                                                                        {...rest}
                                                                        fieldKey={[fieldKey, 'prix']}
                                                                        name={[name, "prix"]}
                                                                    >
                                                                        <InputNumber/>
                                                                    </Form.Item>
                                                                </td>
                                                                <td>
                                                                    <Form.Item
                                                                        {...rest}
                                                                        fieldKey={[fieldKey, 'montant']}
                                                                        name={[name, "montant"]}
                                                                    >
                                                                        <InputNumber className={"w-100"} disabled/>
                                                                    </Form.Item>
                                                                </td>
                                                            </tr>
                                                        })
                                                    }

                                                    </tbody>
                                                    <tfoot>
                                                    <tr className={"border-0"}>
                                                        <td className={"border-0"} colSpan={"3"}/>
                                                        <td>Total HT</td>
                                                        <td>{state.totalHt.toFixed(2)}</td>
                                                    </tr>
                                                    <tr className={"border-0"}>
                                                        <td className={"border-0"} colSpan={"3"}/>
                                                        <td>T.V.A</td>
                                                        <td>{state.tva.toFixed(2)}</td>
                                                    </tr>
                                                    <tr className={"border-0"}>
                                                        <td className={"border-0"} colSpan={"3"}/>
                                                        <td>Total TTC</td>
                                                        <td>{state.ttc.toFixed(2)}</td>
                                                    </tr>
                                                    </tfoot>
                                                </table>
                                            </div>
                                        </div>
                                        <div className="row justify-content-center">
                                            <div className="col-xs">
                                                <Button shape={"circle"} onClick={() => {
                                                    form.setFieldsValue({
                                                        donnes: [...form.getFieldValue("donnes"), {
                                                            description: "",
                                                            unite: "%",
                                                            quality: 0,
                                                            prix: 0,
                                                            montant: 0
                                                        }]
                                                    })
                                                }} type={"success"}
                                                        className={"mr-1"} icon={<PlusOutlined/>}/>
                                                <Button shape={"circle"}
                                                        onClick={() => fields.length === 1 ? null : remove(fields.at(-1).name)}
                                                        type={"danger"} className={"ml-1"}
                                                        icon={<MinusOutlined/>}/>
                                            </div>
                                        </div>
                                    </div>
                                }
                            }
                        </Form.List>


                        <Form.Item className={"mt-2 text-center"}>
                            <Button htmlType={"submit"} type={"success"} children={"Enregistrer"}/>
                        </Form.Item>
                    </Form>
                </div>
            </div>
        </div>
    );
};


const dtp = (dsp) => ({actions: bindActionCreators(types, dsp)})

export default connect(null, dtp)(ACH02);
