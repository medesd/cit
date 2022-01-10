import React, {useEffect, useState} from 'react';
import Form from "antd/es/form";
import Input from "antd/es/input";
import Button from "antd-button-color";
import axios from "axios";
import {DatePicker, message, notification, Popconfirm, Select} from "antd";
import Search from "antd/es/input/Search";
import Modal from "antd/es/modal";
import {DeleteOutlined, EditOutlined} from "@ant-design/icons";
import moment from "moment";
import {ParseJwt} from "../tools";
import {bindActionCreators} from "redux";
import * as types from "../redux/actions/actions";
import {connect} from "react-redux";

const {Option} = Select;
const ops = [
    {name: 'Directeur_general', value: 'Directeur général'},
    {name: 'Assistence_de_direction', value: 'Assistance de direction'},
    {name: 'Resp_Management_Qualite', value: 'Resp Management Qualité'},
    {name: 'Resp_Commercial', value: 'Resp Commercial'},
    {name: 'Charge_de_facturation', value: 'Chargé de facturation'},
    {name: 'Chargee_des_RH', value: 'Chargée des RH'},
    {name: 'Chargee_des_achats', value: 'Chargée des achats'},
    {name: "Chargee_d_infrastructure", value: "Chargée d'infrastructure"},
    {name: 'Dircteur_technique', value: 'Directeur technique'},
    {name: 'Resp_Pole_etudes', value: 'Resp Pole études'},
    {name: 'Metreur', value: 'Metreur'},
    {name: 'Resp_structure', value: 'Resp structure'},
    {name: 'Resp_lot_technique', value: 'Resp lot technique'},
    {name: 'Resp_VRD', value: 'Resp VRD'},
    {name: 'Dessinateur_projeteur', value: 'Dessinateur projeteur'},
    {name: 'Ingenieur_agronome', value: 'Ingénieur agronome'},
    {name: 'Ingeneur_fluide', value: 'Ingénieur fluide'},
    {name: 'Ingeneur_electricite', value: 'Ingénieur électricité'},
    {name: 'Resp_suivi', value: 'Resp. suivi'},
    {name: 'Agent_suivi_structure', value: 'Agent suivi structure'},
    {name: 'Agent_suivi_lot_technique_et_VRD', value: 'Agent suivi lot technique et VRD'},
    {name: 'Chauffeur/Coursier', value: 'Chauffeur/Coursier'}
]

const AjouteEmployee = (props) => {
    const instance = axios.create();
    const [form] = Form.useForm();

    const [state, setState] = useState({
        selectedItems: [],
        currentEmp: null,
        filtered: [],
        employees: [],
        modal: false,
        editMode: false,
        filter: '',
    });


    useEffect(() => {
        setState(f => ({...f, filtered: ops.filter(s => !f.selectedItems.includes(s))}))
    }, [state.selectedItems])

    useEffect(() => {
        axios.create().get('/api/employees?filter=').then(ft => {

            setState(f => ({...f, employees: ft.data.map(x => ({...x, dateN: moment(x.dateNaissance,"DD/MM/YYYY")}))}));
        })
        props.actions.setHeaderTitle("Personnel")

        return () => {
            props.actions.setHeaderTitle("")
        }

    }, [props.actions])


    const makeSome = (role) => {
        switch (role) {
            case "ROLE_ADMIN":
                return [{id: 1, name: "ROLE_USER"}, {id: 2, name: "ROLE_ADMIN"}];
            case "ROLE_USER":
                return [{id: 1, name: "ROLE_USER"}];
            default:
                return [{id: 1, name: "ROLE_USER"}];
        }
    }

    const getAllEmployees = async (filter) => {
        return await instance.get('/api/employees?filter=' + filter);
    }

    const editEmployee = async (id, emp) => {
        return await instance.put('/api/employees/' + id, emp)
    }

    const onFinish = (values) => {
        if (state.editMode) {
            form.resetFields();
            const roles = makeSome(values.role);
            editEmployee(state.currentEmp.id, {
                ...values,
                roles,
                dateNaissance: moment(values.dateN).format("DD/MM/YYYY")
            }).then(x => {
                openNotification(x.data)
                if (x.data) {
                    setState(d => ({
                        ...d,
                        modal: false,
                        editMode: false,
                        currentEmp: null,
                        employees: [...d.employees.filter(q => q.id !== x.data.id), x.data]
                    }))
                    form.resetFields()
                } else {
                    openNotificationFail()
                }
            })
        } else {
            const roles = makeSome(values.role);
            axios.create().post('/api/employees', {
                ...values,
                roles,
                dateNaissance: moment(values.dateN).format("DD/MM/YYYY")
            }).then(f => {
                if (f.data) {
                    form.resetFields();
                    openNotification(f.data)
                    setState(s => ({
                        ...s,
                        modal: false,
                        editMode: false,
                        currentEmp: null,
                        employees: [...s.employees, f.data]
                    }))
                } else openNotificationFail()
            });
        }
    };

    const openNotification = (f) => {
        notification.open({
            message: `${f.username} ${state.editMode ? 'Modifier' : 'Ajouter'} avec success`
        });
    };

    const openNotificationFail = () => {
        notification.error({
            message: 'deja exists',
        });
    };

    const onSearch = (e) => {
        getAllEmployees(e).then(ft => {
            setState(f => ({...f, employees: ft.data}));
        })
    }

    const confirm = async (e, id) => {
        await axios.create().delete('/api/employees/' + id).then(ft => {
            setState(f => ({...f, employees: f.employees.filter(x => x.id !== ft.data)}))
            message.success('supprimé').then(null);
        })
    }

    const Capitalize = (str) => {
        return str.charAt(0).toUpperCase() + str.slice(1);
    }


    const modal = () => {
        return <Modal footer={[]} title={state.editMode ? "Modifier Employee" : "Ajouter Employee"}
                      visible={state.modal}
                      onOk={() => {
                          form.resetFields();
                          setState(f => ({...f, modal: false, currentEmp: null, editMode: false}))
                      }}
                      onCancel={() => {
                          form.resetFields();
                          setState(f => ({...f, modal: false, currentEmp: null, editMode: false}))
                      }}>
            <div className="row mt-5 justify-content-center text-center">
                <div className="col-xs">
                    <Form form={form}
                          wrapperCol={{span: 14}}
                          labelCol={{span: 10}}
                          labelAlign={"left"}

                          name="basic"
                          onFinish={onFinish}
                    >
                        <div className="row text-center">
                            <div className="col">
                                <Form.Item
                                    label="Nom d’utilisateur"
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
                                    label="Prénom"
                                    name="firstName"
                                    normalize={value => Capitalize(value || '')}
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
                                    normalize={value => (value || '').toUpperCase()}
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
                        <div className="row">
                            <div className="col">
                                <Form.Item
                                    label="Role"
                                    name="role"
                                    rules={[{required: true}]}
                                >
                                    <Select>
                                        <Option value="ROLE_USER">Utilisateur</Option>
                                        <Option value="ROLE_ADMIN">Administrateur</Option>
                                    </Select>
                                </Form.Item>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col">
                                <Form.Item
                                    style={{maxWidth: '400px'}}
                                    label="Poste"
                                    name="posts"
                                    rules={[{required: true}]}
                                >

                                    <Select
                                        mode="tags"
                                        value={state.selectedItems}
                                        onChange={(x) => {
                                            setState(f => ({
                                                ...f,
                                                selectedItems: f.selectedItems.filter(e => e.value !== x)
                                            }))
                                        }}
                                        style={{width: '100%'}}
                                    >
                                        {state.filtered.map(item => (
                                            <Select.Option key={item.name} value={item.name}>
                                                {item.value}
                                            </Select.Option>
                                        ))}
                                    </Select>
                                </Form.Item>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col">
                                <Form.Item
                                    label="Mot de passe"
                                    name="password"
                                    rules={[{required: !state.editMode}]}
                                >
                                    <Input.Password/>
                                </Form.Item>
                            </div>
                        </div>
                        <div className="row text-center">
                            <div className="col">
                                <Form.Item
                                    label="cnss"
                                    name="cnss"
                                >
                                    <Input/>
                                </Form.Item>
                            </div>
                        </div>

                        <div className="row text-center">
                            <div className="col">
                                <Form.Item
                                    label="N°"
                                    name="ref"
                                >
                                    <Input/>
                                </Form.Item>
                            </div>
                        </div>

                        <div className="row text-center">
                            <div className="col">
                                <Form.Item

                                    label="Date de naissance"
                                    name="dateN"
                                >
                                    <DatePicker className="w-100" format="DD/MM/YYYY"/>
                                </Form.Item>
                            </div>
                        </div>


                        <div className="row text-center">
                            <div className="col">
                                <Form.Item
                                    label="Etat actual"
                                    name="etat"
                                >
                                    <Select>
                                        <Option value="Période d’essai">Période d’essai</Option>
                                        <Option value="Actif">Actif</Option>
                                        <Option value="Préavise">Préavise</Option>
                                        <Option value="Démission">Démission</Option>
                                        <Option value="Congé">Congé</Option>
                                    </Select>
                                </Form.Item>
                            </div>
                        </div>
                        <div className="row text-center">
                            <div className="col">
                                <Form.Item
                                    label="E-mail"
                                    name="mail"
                                    rules={[{type: "email"}]}
                                >
                                    <Input/>
                                </Form.Item>
                            </div>
                        </div>
                        <div className="row text-center">
                            <div className="col">
                                <Button htmlType="submit"
                                        type="success">{state.editMode ? "Enregistrer" : "Ajouter"}</Button>
                            </div>
                        </div>
                    </Form>
                </div>
            </div>
        </Modal>
    }

    return (
        <div className="container-fluid px-5">
            {modal()}
            <div className="row justify-content-between m-2">
                <div className="col-xs">
                    <Button onClick={() => {
                        form.resetFields();
                        setState(f => ({...f, modal: true, editMode: false}))
                    }} type="success">Ajouter</Button>
                </div>
                <div className="col-xs">
                    <Search enterButton placeholder="Rechercher" allowClear onSearch={onSearch}/>
                </div>
            </div>
            <div className="row">
                <div className="table-responsive">
                    <table className="table text-center table-bordered table-striped">
                        <thead>
                        <tr>
                            <td>Nom d'utilisateur</td>
                            <td>Prenom</td>
                            <td>Nom</td>
                            <td>Email</td>
                            <td>Telephone</td>
                            <td>Cin</td>
                            <td>cnss</td>
                            <td>Date de naissance</td>
                            <td>N°</td>
                            <td>Roles</td>
                            <td>Posts</td>
                            <td>Etat actual</td>
                            <td>Action</td>
                        </tr>
                        </thead>
                        <tbody>
                        {
                            state.employees?.map((f, i) => {
                                return <tr key={i}>
                                    <td>{f.username}</td>
                                    <td>{f.firstName}</td>
                                    <td>{f.lastName}</td>
                                    <td><a href={"mailto:" + f.mail}>{f.mail}</a></td>
                                    <td>{f.phone}</td>
                                    <td>{f.cin}</td>
                                    <td>{f.cnss}</td>
                                    <td>{f.dateNaissance}</td>
                                    <td>{f.ref}</td>
                                    <td>{!f.roles?.map(s => s.name).includes('ROLE_ADMIN') ? 'Utilisateur' : 'Administrateur'}</td>
                                    <td>{f.posts?.map((x, i) => <div
                                        key={i}>{ops.find(d => d.name === x).value}</div>)}</td>
                                    <td>
                                        {f.etat}
                                    </td>
                                    <td>
                                        {ParseJwt(localStorage.getItem('token')).roles.map(f => f.authority).includes("ROLE_ADMIN") ?

                                            <Popconfirm
                                                title="Êtes-vous sûr de supprimer cette tâche?"
                                                onConfirm={e => confirm(e, f.id)}
                                                okText="Yes"
                                                cancelText="No"
                                            >
                                                <Button shape="circle" icon={<DeleteOutlined/>} type="danger"/>
                                            </Popconfirm> : null
                                        }

                                        <Button className="ml-1" shape="circle" onClick={() => {
                                            setState(v => ({...v, modal: true, currentEmp: f, editMode: true}))
                                            form.setFieldsValue({
                                                ...f,
                                                role: f.roles?.map(d => d.name).includes('ROLE_ADMIN') ? 'ROLE_ADMIN' : 'ROLE_USER'
                                            });

                                        }} icon={<EditOutlined/>} type="info"/>

                                    </td>
                                </tr>
                            })
                        }
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

const dtp = (dsp) => ({actions: bindActionCreators(types, dsp)})

export default connect(null, dtp)(AjouteEmployee);
