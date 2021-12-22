import React, {useEffect} from "react";
import {Collapse,} from "antd";
import Button from "antd-button-color";
import Form from "antd/es/form";
import Input from "antd/es/input";
import Password from "antd/es/input/Password";
import axios from "axios";
import {bindActionCreators} from "redux";
import * as types from "../redux/actions/actions";
import {connect} from "react-redux";

const {Panel} = Collapse;

const Dash = (props) => {
    const instance = axios.create();
    const [form] = Form.useForm();


    useEffect(() => {
        const fetchData = async () => {
            await axios.create().get('/auth/employee').then(x => {
                form.setFieldsValue(x.data);
            })
        }
        fetchData().then(null);
        props.actions.setHeaderTitle("Settings")

        return () => {
            props.actions.setHeaderTitle("")
        }
    }, [props.actions, form])


    return <div className="container">
        <div className="row mt-5 justify-content-center flex-column text-center align-items-center">
            <div className="col-6">
                <Collapse>
                    <Panel forceRender={true} header="Modifier les détails" key="1">
                        <Form form={form}
                              wrapperCol={{span: 14}}
                              labelCol={{span: 10}}
                              labelAlign={"left"}

                              name="details"
                              onFinish={(values) => {
                                  instance.put('/auth/details', values).then(x => {
                                      form.setFieldsValue(x.data.employee);
                                      localStorage.setItem("token", x.data.jwt.token)
                                  })
                              }}>
                            <div className="row text-center">
                                <div className="col">
                                    <Form.Item
                                        label="Nom d'utilisateur"
                                        name="username"
                                        rules={[{required: true}]}
                                    >
                                        <Input/>
                                    </Form.Item>
                                </div>
                            </div>
                            <div className="row text-center">
                                <div className="col">
                                    <Form.Item
                                        label="Prenom"
                                        name="firstName"
                                        rules={[{required: true}]}
                                    >
                                        <Input/>
                                    </Form.Item>
                                </div>
                            </div>
                            <div className="row text-center">
                                <div className="col">
                                    <Form.Item
                                        label="Nom"
                                        name="lastName"
                                        rules={[{required: true}]}
                                    >
                                        <Input/>
                                    </Form.Item>
                                </div>
                            </div>
                            <div className="row text-center">
                                <div className="col">
                                    <Form.Item
                                        label="Cin"
                                        name="cin"
                                        rules={[{required: true}]}
                                    >
                                        <Input/>
                                    </Form.Item>
                                </div>
                            </div>
                            <div className="row text-center">
                                <div className="col">
                                    <Form.Item
                                        label="E-mail"
                                        name="mail"
                                        rules={[{required: true, type: "email"}]}
                                    >
                                        <Input/>
                                    </Form.Item>
                                </div>
                            </div>
                            <div className="row text-center">
                                <div className="col">
                                    <Form.Item
                                        label="Telephone"
                                        name="phone"
                                        rules={[{required: true}, {
                                            pattern: /^[0-9]{10}$/,
                                            message: `Incorrect`
                                        }]}
                                    >
                                        <Input className="w-100"/>
                                    </Form.Item>
                                </div>
                            </div>
                            <div className="row text-center">
                                <div className="col">
                                    <Form.Item
                                        label="Mot de passe"
                                        name="password"
                                        rules={[{required: true}]}
                                    >
                                        <Password/>
                                    </Form.Item>
                                </div>
                            </div>
                            <div className="row text-center">
                                <div className="col">
                                    <Button htmlType="submit"
                                            type="success">Enregistrer</Button>
                                </div>
                            </div>
                        </Form>
                    </Panel>
                    <Panel header="Changer le mot de passe" key="2">
                        <Form
                            wrapperCol={{span: 14}}
                            labelCol={{span: 10}}
                            labelAlign={"left"}

                            name="code"
                            onFinish={(values) => {
                                instance.post('/auth/password', values).then(null);
                            }}>
                            <div className="row text-center">
                                <div className="col">
                                    <Form.Item
                                        label="Ancien Mot de passe"
                                        name="curPassword"
                                        rules={[{required: true}]}
                                    >
                                        <Password/>
                                    </Form.Item>
                                </div>
                            </div>
                            <div className="row text-center">
                                <div className="col">
                                    <Form.Item
                                        label="Nouveau Mot de passe"
                                        name="newPassword"
                                        rules={[{required: true}]}
                                    >
                                        <Password/>
                                    </Form.Item>
                                </div>
                            </div>
                            <div className="row text-center">
                                <div className="col">
                                    <Form.Item
                                        label="Confirmer"
                                        dependencies={['newPassword']}
                                        name="confermpassword"
                                        hasFeedback
                                        rules={[{required: true}, ({getFieldValue}) => ({
                                            validator(_, value) {
                                                if (!value || getFieldValue('newPassword') === value) {
                                                    return Promise.resolve();
                                                }
                                                return Promise.reject(new Error('The two passwords that you entered do not match!'));
                                            },
                                        }),]}
                                    >
                                        <Password/>
                                    </Form.Item>
                                </div>
                            </div>
                            <div className="row text-center">
                                <div className="col">
                                    <Button htmlType="submit"
                                            type="success">Enregistrer</Button>
                                </div>
                            </div>
                        </Form>
                    </Panel>
                </Collapse>
            </div>
        </div>
    </div>
}


const dtp = (dsp) => ({actions: bindActionCreators(types, dsp)})

export default connect(null, dtp)(Dash);
