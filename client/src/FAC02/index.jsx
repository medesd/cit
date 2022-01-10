import React, {useEffect, useState} from 'react';
import {DatePicker, Form, Input, InputNumber, Modal, Select, Tabs} from "antd";
import Button from "antd-button-color";
import axios from "axios";
import moment from "moment";
import fac02 from '../assets/FAC02.xlsx';
import {ConvertDate, ExportFac02} from "../tools";
import {bindActionCreators} from "redux";
import * as types from "../redux/actions/actions";
import {connect} from "react-redux";

const FAC02 = (props) => {
    const [form] = Form.useForm();
    const [state, setState] = useState({
        modalAdd: false,
        data: [],
        facturesByYear: [],
        year: moment().year(),
        factures: []
    });

    useEffect(() => {
        axios.create().get("/api/factures/" + state.year).then(ft => {

            setState(f => ({
                ...f, facturesByYear: ft.data.map(x => {
                    x.entryDate = ConvertDate(x.entryDate);
                    x.dateReg = !x.dateReg || ConvertDate(x.dateReg);
                    x.totalPrix = (x.totalPrix * 0.2) + x.totalPrix
                    return x;
                })
            }));
        })

        axios.create().get('/api/fac02/' + state.year).then(ft2 => {
            axios.create().get('/api/factures').then(ft => {

                ft2.data = ft2.data?.map(x => {
                    x.banqueDate = ConvertDate(x.banqueDate);
                    x.entryDate = ConvertDate(x.entryDate);
                    x.factureDate = ConvertDate(x.factureDate);
                    return x;
                })


                setState(f => ({...f, factures: ft.data.filter(s => !ft2.data.map(y => y.facture.id).includes(s.id))}));

                ft2.data = ft2.data.map(x => {
                    x.facture.totalPrix = (x.facture.totalPrix * 0.2) + x.facture.totalPrix;
                    return x;
                })
                setState(f => ({...f, data: ft2.data}))
            });
        });


        props.actions.setHeaderTitle("Etat de suivi des paiements et rapprochement");
        return () => {
            props.actions.setHeaderTitle("");
        }
    }, [props.actions, state.year]);


    const modalAdd = <Modal forceRender={true} title={"Ajouter"} visible={state.modalAdd} footer={[]}
                            onOk={() => setState(f => ({...f, modalAdd: false}))}
                            onCancel={() => setState(f => ({...f, modalAdd: false}))}>
        <Form onFinish={(val) => {
            val.banqueDate = moment(val.banqueDate).toDate();
            val.entryDate = moment(val.entryDate).toDate();
            val.factureDate = moment(val.factureDate).toDate();


            const fac02 = {
                ...val,
                facture: {id: val.ref}
            }

            axios.create().post('/api/fac02', fac02).then(ft => {

            })

        }} form={form} labelAlign={"left"} labelCol={{span: 6}}>
            <div className="col">
                <h5 className={"text-center"}>Chez la comptabilité</h5>
            </div>
            <Form.Item name={"ref"} label={"Facture Référence"}>
                <Select onChange={(_, e) => {
                    if (!e.key) {
                        form.resetFields();
                        return;
                    }

                    const facture = state.factures?.find(x => x.id.toString() === e.key);
                    facture.entryDate = moment(facture.entryDate);

                    const tv = facture.totalPrix * 0.2;

                    facture.ttc = tv + facture.totalPrix;


                    form.setFieldsValue({...facture, factureDate: facture.entryDate, banqueDate: moment()})


                }} showSearch>
                    <Select.Option value={null} children={null}/>
                    {
                        state.factures?.map(x => <Select.Option key={x.id} value={x.id}
                                                                children={x.factureRef}/>)
                    }
                </Select>
            </Form.Item>
            <Form.Item name={"client"} label={"Libelle"}>
                <Input disabled/>
            </Form.Item>
            <Form.Item name={"ttc"} label={"Débit"}>
                <InputNumber className={"w-100"} disabled/>
            </Form.Item>
            <Form.Item name={"factureDate"} label={"Date"}>
                <DatePicker className={"w-100"} format={"DD/MM/YYYY"}/>
            </Form.Item>
            <Form.Item name={"comCredit"} label={"Crédit"}>
                <InputNumber className={"w-100"}/>
            </Form.Item>
            <div className="col">
                <h5 className={"text-center"}>Chez la banque</h5>
            </div>
            <Form.Item name={"banqueDate"} label={"Date"}>
                <DatePicker className={"w-100"} format={"DD/MM/YYYY"}/>
            </Form.Item>
            <Form.Item name={"banqueLibelle"} label={"Libelle"}>
                <Input/>
            </Form.Item>
            <Form.Item name={"banqueDebit"} label={"Débit"}>
                <InputNumber className={"w-100"}/>
            </Form.Item>
            <Form.Item name={"banqueCredit"} label={"Crédit"}>
                <InputNumber className={"w-100"}/>
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

                    <Button type={"success"} onClick={() => setState(f => ({...f, modalAdd: true}))}
                            children={"Ajouter"}/>
                </div>
                <div className="col-xs">

                    <DatePicker value={moment().set("year", state.year)}
                                onChange={(val) => !val || setState(f => ({...f, year: val.year()}))}
                                picker="year"
                                allowClear={false}
                                placeholder={"Année"}/>
                </div>
                <div className="col-xs">

                    <Input.Search/>
                </div>
            </div>
            <div className="row mt-3">
                <Tabs defaultActiveKey="1" className={"w-100 mx-5"} type="card">
                    <Tabs.TabPane tab="RAPPROCH" key="1">
                        <div className="row mt-3">
                            <div className="col">
                                <table className={"table text-center table-bordered"}>
                                    <thead>
                                    <tr>
                                        <th colSpan={4}>Chez la comptabilité</th>
                                        <th colSpan={4}>Chez la banque</th>
                                    </tr>
                                    <tr>
                                        <th>Date</th>
                                        <th>Libelle</th>
                                        <th>Débit</th>
                                        <th>Crédit</th>
                                        <th>Date</th>
                                        <th>Libelle</th>
                                        <th>Débit</th>
                                        <th>Crédit</th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    {
                                        state.data?.map(x => {
                                            return <tr key={x.id}>
                                                <td>{x.factureDate}</td>
                                                <td>{x.facture.client}</td>
                                                <td>{x.facture.totalPrix}</td>
                                                <td>{x.comCredit}</td>
                                                <td>{x.banqueDate}</td>
                                                <td>{x.banqueLibelle}</td>
                                                <td>{x.banqueDebit}</td>
                                                <td>{x.banqueCredit}</td>
                                            </tr>
                                        })
                                    }
                                    </tbody>
                                    <tfoot>
                                    <tr>
                                        <th colSpan={2}>Solde</th>
                                        <td>{state.data?.map(x => x.facture.totalPrix).reduce((f, n) => f + n, 0)}</td>
                                        <td>{state.data?.map(x => x.comCredit).reduce((f, n) => f + n, 0)}</td>
                                        <th colSpan={2}>Solde</th>
                                        <td>{state.data?.map(x => x.banqueDebit).reduce((f, n) => f + n, 0)}</td>
                                        <td>{state.data?.map(x => x.banqueCredit).reduce((f, n) => f + n, 0)}</td>
                                    </tr>
                                    </tfoot>
                                </table>
                            </div>
                        </div>

                    </Tabs.TabPane>
                    <Tabs.TabPane tab="ETAT SUIVI DES PAIEMENT" key="2">
                        <div className="row mt-3">
                            <div className="col">
                                <table className={"table table-align-middle text-center table-bordered"}>
                                    <thead>
                                    <tr>
                                        <th>
                                            Facture N°
                                        </th>
                                        <th>
                                            Date Facture
                                        </th>
                                        <th>
                                            Projet
                                        </th>
                                        <th>
                                            Client
                                        </th>
                                        <th>
                                            MT TTC
                                        </th>
                                        <th>
                                            Etat du règlement
                                        </th>
                                        <th>
                                            Échéance
                                        </th>
                                        <th>
                                            Date de règlement
                                        </th>
                                        <th>
                                            Mode de règlement
                                        </th>
                                        <th>
                                            Observation
                                        </th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    {
                                        state.facturesByYear?.map(x => {
                                            return <tr key={x.id}>
                                                <td>{x.factureRef}</td>
                                                <td>{x.entryDate}</td>
                                                <td>{x.project.name}</td>
                                                <td>{x.client}</td>
                                                <td>{x.totalPrix}</td>
                                                <td>{x.etatReg}</td>
                                                <td>{x.enhance}</td>
                                                <td>{x.dateReg}</td>
                                                <td>{x.modeReg}</td>
                                                <td>{x.observation}</td>
                                            </tr>
                                        })
                                    }
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </Tabs.TabPane>
                </Tabs>
                <div className="col mt-3">
                    <div className="col text-center">
                        <Button type={"success"} onClick={() => {
                            const o = {etat: state.data, rap: state.facturesByYear};

                            ExportFac02(o, fac02, 'FAC02_' + state.year)
                        }} children={"Export as Xslx"}/>
                    </div>
                </div>
            </div>
        </div>
    );
};

const dtp = (dsp) => ({actions: bindActionCreators(types, dsp)})


export default connect(null, dtp)(FAC02);
