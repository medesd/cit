import React, {useEffect, useState} from 'react';
import {DatePicker, Form, Input, InputNumber, Modal, Select} from "antd";
import moment from "moment";
import Button from "antd-button-color";
import {MinusOutlined, PlusOutlined} from "@ant-design/icons";
import {bindActionCreators} from "redux";
import * as AcTypes from "../redux/actions/actions";
import {connect} from "react-redux";
import axios from "axios";
import ReactDirective from "react-directive";

const GMQ07 = (props) => {
    const [form] = Form.useForm();

    const [state, setState] = useState({col: "N°PV", year: moment(), modalAdd: false, suites: []})

    useEffect(() => {
        axios.create().get('/api/gmq07/' + state.year.year()).then(ft => {
            setState(f => ({...f, suites: ft.data}));
        })
        props.actions.setHeaderTitle("Etat des action d'amélioration");
        return () => {
            props.actions.setHeaderTitle("");
        }
    }, [props.actions, state.year])


    const formChange = () => {
        const data = form.getFieldsValue().donnes;
        const map = data.filter(x => {
            return x && Object.keys(x).length >= 3
        });
        if (map.length < 1) return;

        const res = map.map(x => {
            x.nonRealise = (x.realise / x.prevues).toFixed(2);
            return x;
        })
        console.log(form.getFieldsValue())
        let totalRealise = res.map(x => x.realise).reduce((f, n) => f + n, 0);
        let totalPrevues = res.map(x => x.prevues).reduce((f, n) => f + n, 0);

        form.setFieldsValue({
            donnes: res,
            totalRealise,
            totalPrevues,
            totalNonRealise: (totalRealise / totalPrevues).toFixed(2)
        })
    }

    const calculate = (val, type) => state.suites?.filter(x => x.suite === val).map(x => x.data).flat().map(x => x[type]).reduce((f, n) => f + n, 0)


    const checkAction = (val) => state.suites?.filter(x => x.suite === val).map(x => x.data).flat().length !== 0


    const modalAdd = <Modal forceRender={true} title={"Ajouter"} footer={null} width={800} visible={state.modalAdd}
                            onCancel={() => setState(f => ({...f, modalAdd: false}))}
                            onOk={() => setState(f => ({...f, modalAdd: false}))}>
        <Form form={form} onClick={formChange} onChange={formChange} initialValues={{date: moment(), suite: "reunions"}}
              labelCol={{span: 4}}
              labelAlign={"left"}
              onFinish={val => {
                  axios.create().post('/api/gmq07', {...val, data: JSON.stringify(val.donnes)}).then(() => {
                      console.log('...');
                  })
              }}>
            <Form.Item name={"date"} label={"Date"}>
                <DatePicker className={"w-100"} format={"DD/MM/YYYY"}/>
            </Form.Item>
            <Form.Item label={"Suite"} name={"suite"}>
                <Select onChange={(_, e) => {
                    setState(f => ({...f, col: e.key}))
                }}>
                    <Select.Option key={"N°PV"} value={"reunions"} children={"aux réunions"}/>
                    <Select.Option key={"N°NC"} value={"non-conformités"} children={"aux non-conformités"}/>
                    <Select.Option key={"Processus"} value={"indicateurs"} children={"aux indicateurs"}/>
                    <Select.Option key={"Processus\n"} value={"audit"} children={"à l'audit"}/>
                    <Select.Option key={"Revue N°"} value={"revue"} children={" à la revue"}/>
                    <Select.Option key={"NOM"} value={"recommandations"} children={"aux recommandations"}/>
                    <Select.Option key={"Réf du plan"} value={"analyse"}
                                   children={"a l'analyse des risques et opportunités"}/>
                </Select>
            </Form.Item>
            <Form.List initialValue={[{}]} name={"donnes"}>
                {
                    (fields, {add, remove}) => <div className="row flex-column">
                        <div className="col">
                            <table className="table table-bordered table-align-middle text-center">
                                <thead>
                                <tr>
                                    <th>{state.col}</th>
                                    <th>Total des actions prévues</th>
                                    <th>Total des actions réalisées</th>
                                    <th>Total des actions non réalisées</th>
                                </tr>
                                </thead>
                                <tbody>
                                {
                                    fields.map(({name, fieldKey, key, ...rest}) => <tr key={key}>
                                        <td>
                                            <Form.Item name={[name, "col"]}
                                                       fieldKey={[fieldKey, "col"]}
                                                       {...rest}>
                                                <Input/>
                                            </Form.Item>
                                        </td>
                                        <td>
                                            <Form.Item name={[name, "prevues"]}
                                                       fieldKey={[fieldKey, "prevues"]} {...rest}>
                                                <InputNumber/>
                                            </Form.Item>
                                        </td>
                                        <td>
                                            <Form.Item name={[name, "realise"]}
                                                       fieldKey={[fieldKey, "realise"]} {...rest}>
                                                <InputNumber/>
                                            </Form.Item>
                                        </td>
                                        <td>
                                            <Form.Item name={[name, "nonRealise"]}
                                                       fieldKey={[fieldKey, "nonRealise"]} {...rest}>
                                                <InputNumber disabled/>
                                            </Form.Item>
                                        </td>
                                    </tr>)
                                }
                                </tbody>
                            </table>
                        </div>
                        <div className="col text-center">
                            <Button type={"success"} onClick={() => add({col: '', prevues: 0, realise: 0})}
                                    className="mr-1" shape={"circle"}
                                    icon={<PlusOutlined/>}/>
                            <Button type={"danger"}
                                    onClick={() => fields.length <= 1 || remove(fields.at(-1).name)}
                                    className="ml-1" shape={"circle"} icon={<MinusOutlined/>}/>
                        </div>
                    </div>
                }
            </Form.List>
            <table className={"table mt-2"}>
                <tfoot>
                <tr>
                    <td>
                        TAUX DE REALISATION
                    </td>
                    <td>
                        <Form.Item className={"m-0"} name={"totalPrevues"}>
                            <InputNumber disabled/>
                        </Form.Item>
                    </td>
                    <td>
                        <Form.Item className={"m-0"} name={"totalRealise"}>
                            <InputNumber disabled/>
                        </Form.Item>
                    </td>
                    <td>
                        <Form.Item className={"m-0"} name={"totalNonRealise"}>
                            <InputNumber disabled/>
                        </Form.Item>
                    </td>
                </tr>
                </tfoot>
            </table>
            <Form.Item className="text-center mt-3">
                <Button htmlType={"submit"} children={"Enregistrer"} type={"success"}/>
            </Form.Item>
        </Form>
    </Modal>


    return (<ReactDirective>
        <div className="container-fluid">
            {modalAdd}
            <div className="row mt-5 justify-content-around">
                <div className="col-xs">
                    <Button type={"success"} children={"Ajouter"}
                            onClick={() => setState(f => ({...f, modalAdd: true}))}/>
                </div>
                <div className="col-xs">
                    <DatePicker onChange={(val) => {
                        if (!val) return;
                        setState(f => ({...f, year: val}))
                    }} value={state.year} picker={"year"}/>
                </div>
                <div className="col-xs">
                    <Input.Search/>
                </div>
            </div>
            <div className="row flex-column px-5 mt-3">
                <div
                    data-react-if={checkAction("reunions")}
                    className="col">
                    <h5 className="text-center">Suite aux réunions</h5>
                </div>


                <div
                    data-react-if={checkAction("reunions")}
                    className="col">
                    <table className="table table-bordered text-center table-align-middle">
                        <thead>
                        <tr>
                            <th>Pv N°</th>
                            <th>Total des actions prévues</th>
                            <th>Total des actions réalisées</th>
                            <th>Total des actions non réalisées</th>
                        </tr>
                        </thead>
                        <tbody>
                        {
                            state.suites?.filter(x => x.suite === "reunions").map(x => x.data).flat().map((x, i) => <tr
                                key={i}>
                                <td>{x.col}</td>
                                <td>{x.prevues}</td>
                                <td>{x.realise}</td>
                                <td>{x.nonRealise}</td>
                            </tr>)
                        }
                        </tbody>
                        <tfoot>
                        <tr>
                            <td>TAUX DE REALISATION</td>
                            <td>{calculate("reunions", "prevues")}</td>
                            <td>{calculate("reunions", "realise")}</td>
                            <td>{calculate("reunions", "nonRealise")}</td>
                        </tr>
                        </tfoot>
                    </table>
                </div>

                <div
                    data-react-if={checkAction("non-conformités")}
                    className="col">
                    <h5 className="text-center">Suite aux non-conformités</h5>
                </div>
                <div
                    data-react-if={checkAction("non-conformités")}
                    className="col">
                    <table className="table table-bordered text-center table-align-middle">
                        <thead>
                        <tr>
                            <th>N° NC</th>
                            <th>Total des actions prévues</th>
                            <th>Total des actions réalisées</th>
                            <th>Total des actions non réalisées</th>
                        </tr>
                        </thead>
                        <tbody>
                        {
                            state.suites?.filter(x => x.suite === "non-conformités").map(x => x.data).flat().map((x, i) =>
                                <tr
                                    key={i}>
                                    <td>{x.col}</td>
                                    <td>{x.prevues}</td>
                                    <td>{x.realise}</td>
                                    <td>{x.nonRealise}</td>
                                </tr>)
                        }
                        </tbody>
                        <tfoot>
                        <tr>
                            <td>TAUX DE REALISATION</td>
                            <td>0</td>
                            <td>0</td>
                            <td>0</td>
                        </tr>
                        </tfoot>
                    </table>
                </div>

                <div
                    data-react-if={checkAction("indicateurs")}
                    className="col">
                    <h5 className="text-center">Suite aux indicateurs</h5>
                </div>


                <div
                    data-react-if={checkAction("indicateurs")}
                    className="col">
                    <table className="table table-bordered text-center table-align-middle">
                        <thead>
                        <tr>
                            <th>Processus</th>
                            <th>Total des actions prévues</th>
                            <th>Total des actions réalisées</th>
                            <th>Total des actions non réalisées</th>
                        </tr>
                        </thead>
                        <tbody>
                        {
                            state.suites?.filter(x => x.suite === "indicateurs").map(x => x.data).flat().map((x, i) =>
                                <tr
                                    key={i}>
                                    <td>{x.col}</td>
                                    <td>{x.prevues}</td>
                                    <td>{x.realise}</td>
                                    <td>{x.nonRealise}</td>
                                </tr>)
                        }
                        </tbody>
                        <tfoot>
                        <tr>
                            <td>TAUX DE REALISATION</td>
                            <td>0</td>
                            <td>0</td>
                            <td>0</td>
                        </tr>
                        </tfoot>
                    </table>
                </div>


                <div data-react-if={checkAction("audit")}
                     className="col">
                    <h5 className="text-center">Suite à l'audit</h5>
                </div>
                <div
                    data-react-if={checkAction("audit")}
                    className="col">
                    <table className="table table-bordered text-center table-align-middle">
                        <thead>
                        <tr>
                            <th>Processus</th>
                            <th>Total des actions prévues</th>
                            <th>Total des actions réalisées</th>
                            <th>Total des actions non réalisées</th>
                        </tr>
                        </thead>
                        <tbody>
                        {
                            state.suites?.filter(x => x.suite === "audit").map(x => x.data).flat().map((x, i) => <tr
                                key={i}>
                                <td>{x.col}</td>
                                <td>{x.prevues}</td>
                                <td>{x.realise}</td>
                                <td>{x.nonRealise}</td>
                            </tr>)
                        }
                        </tbody>
                        <tfoot>
                        <tr>
                            <td>TAUX DE REALISATION</td>
                            <td>0</td>
                            <td>0</td>
                            <td>0</td>
                        </tr>
                        </tfoot>
                    </table>
                </div>

                <div data-react-if={checkAction("revue")}
                     className="col">
                    <h5 className="text-center">Suite à la revue</h5>
                </div>
                <div data-react-if={checkAction("revue")}
                     className="col">
                    <table className="table table-bordered text-center table-align-middle">
                        <thead>
                        <tr>
                            <th>Revue n°</th>
                            <th>Total des actions prévues</th>
                            <th>Total des actions réalisées</th>
                            <th>Total des actions non réalisées</th>
                        </tr>
                        </thead>
                        <tbody>
                        {
                            state.suites?.filter(x => x.suite === "revue").map(x => x.data).flat().map((x, i) => <tr
                                key={i}>
                                <td>{x.col}</td>
                                <td>{x.prevues}</td>
                                <td>{x.realise}</td>
                                <td>{x.nonRealise}</td>
                            </tr>)
                        }

                        </tbody>
                        <tfoot>
                        <tr>
                            <td>TAUX DE REALISATION</td>
                            <td>0</td>
                            <td>0</td>
                            <td>0</td>
                        </tr>
                        </tfoot>
                    </table>
                </div>
                <div
                    data-react-if={checkAction("recommandations")}
                    className="col">
                    <h5 className="text-center">Suite aux recommandations</h5>
                </div>
                <div
                    data-react-if={checkAction("recommandations")}
                    className="col">
                    <table className="table table-bordered text-center table-align-middle">
                        <thead>
                        <tr>
                            <th>Nom</th>
                            <th>Total des actions prévues</th>
                            <th>Total des actions réalisées</th>
                            <th>Total des actions non réalisées</th>
                        </tr>
                        </thead>
                        <tbody>

                        {
                            state.suites?.filter(x => x.suite === "recommandations").map(x => x.data).flat().map((x, i) =>
                                <tr
                                    key={i}>
                                    <td>{x.col}</td>
                                    <td>{x.prevues}</td>
                                    <td>{x.realise}</td>
                                    <td>{x.nonRealise}</td>
                                </tr>)
                        }

                        </tbody>
                        <tfoot>
                        <tr>
                            <td>TAUX DE REALISATION</td>
                            <td>0</td>
                            <td>0</td>
                            <td>0</td>
                        </tr>
                        </tfoot>
                    </table>
                </div>
                <div data-react-if={checkAction("analyse")} className="col">
                    <h5 className="text-center">Suite a l'analyse des risques et opportunités</h5>
                </div>
                <div data-react-if={checkAction("analyse")} className="col">
                    <table className="table table-bordered text-center table-align-middle">
                        <thead>
                        <tr>
                            <th>Réf du plan</th>
                            <th>Total des actions prévues</th>
                            <th>Total des actions réalisées</th>
                            <th>Total des actions non réalisées</th>
                        </tr>
                        </thead>
                        <tbody>
                        {
                            state.suites?.filter(x => x.suite === "analyse").map(x => x.data).flat().map((x, i) => <tr
                                key={i}>
                                <td>{x.col}</td>
                                <td>{x.prevues}</td>
                                <td>{x.realise}</td>
                                <td>{x.nonRealise}</td>
                            </tr>)
                        }
                        </tbody>
                        <tfoot>
                        <tr>
                            <td>TAUX DE REALISATION</td>
                            <td>0</td>
                            <td>0</td>
                            <td>0</td>
                        </tr>
                        </tfoot>
                    </table>
                </div>
            </div>
        </div>
    </ReactDirective>);
};

const dtp = (dsp) => ({actions: bindActionCreators(AcTypes, dsp)})

export default connect(null, dtp)(GMQ07);

