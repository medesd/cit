import React, {useEffect} from 'react';
import {DatePicker, Form, Input, Radio} from "antd";
import Button from "antd-button-color";
import {MinusOutlined, PlusOutlined} from "@ant-design/icons";
import rh06 from '../assets/RH06.docx';
import {ExportRH06} from "../tools";
import axios from "axios";
import moment from "moment";

const {RangePicker} = DatePicker;

const RH06 = () => {
    const [form] = Form.useForm();

    useEffect(() => {
        form.setFieldsValue({
            date: moment(),
            donnes: [
                {
                    theme: "",
                    objectifs: [
                        ""
                    ],
                    personnes: [
                        ""
                    ],
                    periods: [
                        moment(),
                        moment().add(1, "days")
                    ],
                    lieu: "",
                    formateurs: "",
                    suivi: "PasFait",
                    comment: ""
                }
            ]
        })
    }, [form])

    return (
        <div className={"container-fluid"}>
            <div className="row mt-5 justify-content-center">
                <div className="col">
                    <Form form={form} onFinish={(val) => {
                        axios.create().post('/api/rh06', {data: JSON.stringify(val)}).then(() => {
                            ExportRH06(val, rh06)
                            form.setFieldsValue({
                                date: moment(),
                                donnes: [
                                    {
                                        theme: "",
                                        objectifs: [
                                            ""
                                        ],
                                        personnes: [
                                            ""
                                        ],
                                        periods: [
                                            moment(),
                                            moment().add(1, "days")
                                        ],
                                        lieu: "",
                                        formateurs: "",
                                        suivi: "PasFait",
                                        comment: ""
                                    }
                                ]
                            })
                        })
                    }} labelAlign={"left"} labelCol={{span: 3, offset: 3}}>
                        <Form.Item name={"date"} label={"Date"}>
                            <DatePicker className={"w-100"} format={"DD/MM/YYYY"}/>
                        </Form.Item>
                        <Form.List name={"donnes"}>
                            {
                                ((fields, {add, remove}) => {
                                    return <div className={"row flex-column m-0"}>
                                        <div className="col">
                                            <table className={"table table-align-middle text-center table-bordered"}>
                                                <thead>
                                                <tr>
                                                    <th>
                                                        Thèmes de formation
                                                    </th>
                                                    <th>
                                                        Objectifs
                                                    </th>
                                                    <th>
                                                        Personnes concernées
                                                    </th>
                                                    <th>
                                                        Période
                                                    </th>
                                                    <th>
                                                        Lieu
                                                    </th>
                                                    <th>
                                                        Formateurs
                                                    </th>
                                                    <th>
                                                        Suivi
                                                    </th>
                                                    <th>
                                                        Commentaire
                                                    </th>
                                                </tr>
                                                </thead>
                                                <tbody>
                                                {
                                                    fields.map((donnes) => {
                                                        return <tr key={donnes.key}>
                                                            <td>
                                                                <Form.Item className={"m-0"} {...donnes}
                                                                           fieldKey={[donnes.fieldKey, "theme"]}
                                                                           name={[donnes.name, "theme"]}>
                                                                    <Input.TextArea/>
                                                                </Form.Item>
                                                            </td>
                                                            <td className={"px-0"}>
                                                                <Form.List name={[donnes.name, "objectifs"]}>
                                                                    {
                                                                        (fields1, manage) => <div
                                                                            className={"col px-0 d-flex flex-column"}>
                                                                            {fields1.map((object) => {
                                                                                return <div key={object.key}
                                                                                            className={"col px-1"}>
                                                                                    <Form.Item
                                                                                        className={"mb-1"}
                                                                                        fieldKey={[object.fieldKey, "object"]}
                                                                                        name={[object.name, "object"]}
                                                                                        {...object}
                                                                                    >
                                                                                        <Input.TextArea/>
                                                                                    </Form.Item>
                                                                                </div>
                                                                            })}
                                                                            <div
                                                                                className="col d-flex justify-content-center flex-nowrap">
                                                                                <Button shape={"circle"}
                                                                                        type={"success"}
                                                                                        className={"mr-1"}
                                                                                        onClick={() => manage.add()}
                                                                                        icon={<PlusOutlined/>}/>
                                                                                <Button shape={"circle"} type={"danger"}
                                                                                        className={"ml-1"}
                                                                                        onClick={() => fields1.length <= 1 || manage.remove(fields1.at(-1).name)}
                                                                                        icon={<MinusOutlined/>}/>
                                                                            </div>
                                                                        </div>
                                                                    }
                                                                </Form.List>
                                                            </td>
                                                            <td className={"px-0"}>
                                                                <Form.List name={[donnes.name, "personnes"]}>
                                                                    {
                                                                        (fields1, manage) => <div
                                                                            className={"col d-flex px-0 flex-column"}>


                                                                            {fields1.map(personnes => {

                                                                                console.log(personnes)


                                                                                return <div key={personnes.key}
                                                                                            className={"px-1 col"}>
                                                                                    <Form.Item className={"mb-1"}
                                                                                               fieldKey={[personnes.fieldKey, "personne"]}
                                                                                               name={[personnes.name, "personne"]}
                                                                                               {...personnes}

                                                                                    >
                                                                                        <Input.TextArea/>
                                                                                    </Form.Item>
                                                                                </div>
                                                                            })}


                                                                            <div
                                                                                className="col d-flex justify-content-center flex-nowrap">
                                                                                <Button shape={"circle"}
                                                                                        type={"success"}
                                                                                        className={"mr-1"}
                                                                                        onClick={() => manage.add()}
                                                                                        icon={<PlusOutlined/>}/>
                                                                                <Button shape={"circle"} type={"danger"}
                                                                                        className={"ml-1"}
                                                                                        onClick={() => fields1.length <= 1 || manage.remove(fields1.at(-1).name)}
                                                                                        icon={<MinusOutlined/>}/>
                                                                            </div>
                                                                        </div>
                                                                    }
                                                                </Form.List>
                                                            </td>
                                                            <td>
                                                                <Form.Item className={"m-0"}  {...donnes}
                                                                           fieldKey={[donnes.fieldKey, "periods"]}
                                                                           name={[donnes.name, "periods"]}>
                                                                    <RangePicker format={"DD/MM/YYYY"}/>
                                                                </Form.Item>
                                                            </td>
                                                            <td>
                                                                <Form.Item className={"m-0"} {...donnes}
                                                                           fieldKey={[donnes.fieldKey, "lieu"]}
                                                                           name={[donnes.name, "lieu"]}>
                                                                    <Input.TextArea/>
                                                                </Form.Item>
                                                            </td>
                                                            <td>
                                                                <Form.Item className={"m-0"} {...donnes}
                                                                           fieldKey={[donnes.fieldKey, "formateurs"]}
                                                                           name={[donnes.name, "formateurs"]}>
                                                                    <Input.TextArea/>
                                                                </Form.Item>
                                                            </td>
                                                            <td>
                                                                <Form.Item className={"m-0"} {...donnes}
                                                                           fieldKey={[donnes.fieldKey, "suivi"]}
                                                                           name={[donnes.name, "suivi"]}>
                                                                    <Radio.Group buttonStyle={"solid"}>
                                                                        <Radio children={"Fait"} value={"Fait"}/>
                                                                        <Radio children={"Pas Fait"}
                                                                               value={"PasFait"}/>
                                                                    </Radio.Group>
                                                                </Form.Item>
                                                            </td>
                                                            <td>
                                                                <Form.Item className={"m-0"} {...donnes}
                                                                           fieldKey={[donnes.fieldKey, "comment"]}
                                                                           name={[donnes.name, "comment"]}>
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
                                            <Button className={"mr-1"} onClick={() => {
                                                add(
                                                    {
                                                        theme: "",
                                                        objectifs: [
                                                            ""
                                                        ],
                                                        personnes: [
                                                            ""
                                                        ],
                                                        periods: [
                                                            moment(),
                                                            moment().add(1, "days")
                                                        ],
                                                        lieu: "",
                                                        formateurs: "",
                                                        suivi: "PasFait",
                                                        comment: ""
                                                    }
                                                )
                                            }} shape={"circle"}
                                                    type={"success"} icon={<PlusOutlined/>}/>
                                            <Button className={"ml-1"}
                                                    onClick={() => fields.length <= 1 || remove(fields.at(-1).name)}
                                                    shape={"circle"} type={"danger"}
                                                    icon={<MinusOutlined/>}/>
                                        </div>
                                    </div>
                                })
                            }
                        </Form.List>
                        <Form.Item className={"text-center mt-2"}>
                            <Button htmlType={"submit"} children={"Enregistrer"} type={"success"}/>
                        </Form.Item>
                    </Form>
                </div>
            </div>
        </div>
    );
};

export default RH06;
