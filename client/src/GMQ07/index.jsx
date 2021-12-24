import React, {useEffect, useState} from 'react';
import {DatePicker, Form, Input, Modal, Select} from "antd";
import moment from "moment";
import Button from "antd-button-color";
import {MinusOutlined, PlusOutlined} from "@ant-design/icons";
import {bindActionCreators} from "redux";
import * as AcTypes from "../redux/actions/actions";
import {connect} from "react-redux";

const GMQ07 = (props) => {

    const [state, setState] = useState({col: "N°PV", modalAdd: false})

    useEffect(() => {
        props.actions.setHeaderTitle("Etat des action d'amélioration");
        return () => {
            props.actions.setHeaderTitle("");
        }

    }, [props.actions])


    const modalAdd = <Modal title={"Ajouter"} footer={null} width={800} visible={state.modalAdd}
                            onCancel={() => setState(f => ({...f, modalAdd: false}))}
                            onOk={() => setState(f => ({...f, modalAdd: false}))}>
        <Form>
            <Form.Item initialValue={moment()} name={"date"} label={"Date"}>
                <DatePicker className={"w-100"} format={"DD/MM/YYYY"}/>
            </Form.Item>
            <Form.Item label={"Suite"} name={"suite"}>
                <Select defaultValue={"reunions"} onChange={(_, e) => {
                    setState(f => ({...f, col: e.key}))
                }}>
                    <Select.Option key={"N°PV"} value={"reunions"} children={"aux réunions"}/>
                    <Select.Option key={"N°NC"} value={"non-conformités"} children={"aux non-conformités"}/>
                    <Select.Option key={"Processus"} value={"indicateurs"} children={"aux indicateurs"}/>
                    <Select.Option key={"Processus"} value={"audit"} children={"à l'audit"}/>
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
                                                <Input/>
                                            </Form.Item>
                                        </td>
                                        <td>
                                            <Form.Item name={[name, "realise"]}
                                                       fieldKey={[fieldKey, "realise"]} {...rest}>
                                                <Input/>
                                            </Form.Item>
                                        </td>
                                        <td>
                                            <Form.Item name={[name, "nonRealise"]}
                                                       fieldKey={[fieldKey, "nonRealise"]} {...rest}>
                                                <Input/>
                                            </Form.Item>
                                        </td>
                                    </tr>)
                                }
                                </tbody>
                            </table>
                        </div>
                        <div className="col text-center">
                            <Button type={"success"} onClick={() => add()} className="mr-1" shape={"circle"}
                                    icon={<PlusOutlined/>}/>
                            <Button type={"danger"}
                                    onClick={() => fields.length <= 1 || remove(fields.at(-1).name)}
                                    className="ml-1" shape={"circle"} icon={<MinusOutlined/>}/>
                        </div>
                    </div>
                }
            </Form.List>
            <Form.Item className="text-center mt-3">
                <Button htmlType={"submit"} children={"Enregistrer"} type={"success"}/>
            </Form.Item>
        </Form>
    </Modal>


    return (
        <div className="container-fluid">
            {modalAdd}
            <div className="row mt-5 justify-content-around">
                <div className="col-xs">
                    <Button type={"success"} children={"Ajouter"}
                            onClick={() => setState(f => ({...f, modalAdd: true}))}/>
                </div>
                <div className="col-xs">
                    <DatePicker picker={"year"}/>
                </div>
                <div className="col-xs">
                    <Input.Search/>
                </div>
            </div>
            <div className="row flex-column px-5 mt-3">
                <div className="col">
                    <h5 className="text-center">Suite aux réunions</h5>
                </div>


                <div className="col">
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
                        <tr>
                            <td>...</td>
                            <td>...</td>
                            <td>...</td>
                            <td>...</td>
                        </tr>
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
                <div className="col">
                    <h5 className="text-center">Suite aux non-conformités</h5>
                </div>
                <div className="col">
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
                        <tr>
                            <td>...</td>
                            <td>...</td>
                            <td>...</td>
                            <td>...</td>
                        </tr>
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


            <div className="row flex-column mt-3">
                <div className="col">
                    <h5 className="text-center">Suite aux indicateurs</h5>
                </div>


                <div className="col">
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
                        <tr>
                            <td>...</td>
                            <td>...</td>
                            <td>...</td>
                            <td>...</td>
                        </tr>
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


                <div className="col">
                    <h5 className="text-center">Suite à l'audit</h5>
                </div>
                <div className="col">
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
                        <tr>
                            <td>...</td>
                            <td>...</td>
                            <td>...</td>
                            <td>...</td>
                        </tr>
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

                <div className="col">
                    <h5 className="text-center">Suite à la revue</h5>
                </div>
                <div className="col">
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
                        <tr>
                            <td>...</td>
                            <td>...</td>
                            <td>...</td>
                            <td>...</td>
                        </tr>
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
                <div className="col">
                    <h5 className="text-center">Suite aux recommandations</h5>
                </div>
                <div className="col">
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
                        <tr>
                            <td>...</td>
                            <td>...</td>
                            <td>...</td>
                            <td>...</td>
                        </tr>
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
                <div className="col">
                    <h5 className="text-center">Suite a l'analyse des risques et opportunités</h5>
                </div>
                <div className="col">
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
                        <tr>
                            <td>...</td>
                            <td>...</td>
                            <td>...</td>
                            <td>...</td>
                        </tr>
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
        </div>);
};

const dtp = (dsp) => ({actions: bindActionCreators(AcTypes, dsp)})

export default connect(null, dtp)(GMQ07);

