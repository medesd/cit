import React, {useEffect, useState} from 'react';
import axios from "axios";
import moment from "moment";
import Button from "antd-button-color";
import {ArrowRightOutlined, EditOutlined, SaveOutlined} from "@ant-design/icons";
import {withRouter} from "react-router";
import {DatePicker, InputNumber, message, notification, Popconfirm, Select} from "antd";
import Modal from "antd/es/modal";
import Form from "antd/es/form";
import Input from "antd/es/input";
import Search from "antd/es/input/Search";
import Popover from "antd/es/popover";
import {ParseJwt} from "../tools";
import {bindActionCreators} from "redux";
import * as types from "../redux/actions/actions";
import {connect} from "react-redux";
import {saveAs} from "file-saver"

const {Option} = Select;

const AllProjects = (props) => {
    const [form] = Form.useForm();
    const [formAdd] = Form.useForm();

    const [state, setState] = useState({
        projects: [],
        modalAdd: false,
        currentProject: null,
        modal: false,
        employees: [],
        etat: null,
        at: null,
        addPrefix: '',
        addLoading: false
    });

    const instance = axios.create();

    const onFinish = async (values) => {
        const [ref] = values.ref;
        instance.put('/api/projects/' + state.currentProject.id, {
            ...values,
            ref: 'CIT/' + ref.letter + ref.num + '/' + ref.year
        }).then(ft => {

            if (ft.data === '') {
                openNotification("Nom ou Référence de projet deja exist");
            } else {
                const items = state.projects;
                let item = items.findIndex(s => s.id === ft.data.id);
                items[item] = ft.data;
                setState(f => ({
                    ...f,
                    modal: false,
                    projects: [...items],
                }))
            }


        })
    }


    const deleteProject = async (id) => {
        return await instance.delete('/api/projects/' + id);
    }

    const projectGet = async (search = null) => {
        return await instance.get('/api/projects?main=true&filter=' + search);
    }


    const confirm = (e, id) => {
        const res = state.projects.filter(k => k.id !== id);
        setState(f => ({...f, projects: res}));
        deleteProject(id).then(null);
        message.success('archivé').then(null);
    }

    useEffect(() => {


        axios.create().get('/api/employees/names').then(r =>
            r.data === '' || setState(f => ({...f, employees: r.data}))
        )
        axios.create().get('/api/projects?main=true&filter=').then(r => {

            if (r.data !== "")
                setState(f => ({...f, projects: r.data}))
        });
        props.actions.setHeaderTitle("Liste des projets");
        return () => {
            props.actions.setHeaderTitle("");
        }


    }, [props.actions])

    const setAttribute = (frm) => {
        form.setFieldsValue({
            ...frm,
            fiche: frm.intervention?.ref,
            dateDebut: moment(frm.dateDebut ? frm.dateDebut : moment()),
            dateNotif: moment(frm.dateNotif ? frm.dateNotif : moment()),
            ref: frm.ref
        });
    }
    const modals = () => {
        return (
            <>
                <Modal footer={null} title="Modifier Projet" visible={state.modal}
                       onOk={() => setState(f => ({...f, modal: false}))}
                       onCancel={() => setState(f => ({...f, modal: false}))}>
                    <div className="row justify-content-center">
                        <div className="col-xs">
                            <Form form={form}
                                  labelCol={{span: 12}}
                                  labelAlign={"left"}
                                  name="basic"
                                  onClick={() => generateRef(state.currentProject.id)}
                                  onChange={() => generateRef(state.currentProject.id)}
                                  onInput={() => generateRef(state.currentProject.id)}
                                  onFinish={onFinish}
                                  autoComplete="off">
                                <div className="row">
                                    <div className="col">
                                        <Form.Item
                                            label="Projet"
                                            name="name"
                                            rules={[{required: true}]}
                                        >
                                            <Input/>
                                        </Form.Item>
                                    </div>
                                </div>


                                <div className="row">
                                    <div className="col">
                                        <Form.List name={"ref"}>
                                            {
                                                fields => {
                                                    return fields.map(({name, key, fieldKey, ...rest}) => {
                                                        return <Form.Item key={key} label={"Référence"}>
                                                            <div className="d-flex">
                                                                <Form.Item
                                                                    {...rest}
                                                                    name={[name, "letter"]}
                                                                    fieldKey={[fieldKey, 'letter']}
                                                                    rules={[{required: true, message: ''}, {
                                                                        message: '',
                                                                        pattern: new RegExp(/^[A-Z]$/)
                                                                    }]}
                                                                >
                                                                    <Input maxLength={1} addonBefore={"CIT"}/>
                                                                </Form.Item>
                                                                <Form.Item
                                                                    {...rest}
                                                                    name={[name, "num"]}
                                                                    fieldKey={[fieldKey, 'num']}
                                                                    rules={[{required: true, message: ''}]}
                                                                >
                                                                    <Input disabled/>
                                                                </Form.Item>
                                                                <Form.Item
                                                                    {...rest}
                                                                    name={[name, "year"]}
                                                                    fieldKey={[fieldKey, 'year']}
                                                                    rules={[
                                                                        {required: true, message: ''},
                                                                        {max: 99, type: "number", message: ''},
                                                                        {min: 10, type: "number", message: ''}]}
                                                                >
                                                                    <InputNumber maxLength={2}/>
                                                                </Form.Item>
                                                            </div>
                                                        </Form.Item>
                                                    })
                                                }
                                            }
                                        </Form.List>
                                    </div>
                                </div>

                                <div className="row">
                                    <div className="col">
                                        <Form.Item
                                            label="Fiche d’intervention"
                                            name="fiche"
                                            rules={[{required: true}]}
                                        >
                                            <Input/>
                                        </Form.Item>
                                    </div>
                                </div>

                                <div className="row">
                                    <div className="col">
                                        <Form.Item
                                            label="Etat"
                                            name="etat"
                                            rules={[{required: true}]}
                                        >
                                            <Select onChange={(at) => {
                                                setState(f => ({...f, etat: at}));
                                            }}>
                                                <Option value="actif">actif</Option>
                                                <Option value="suspendu">suspendu</Option>
                                                <Option value="en attente">en attente</Option>
                                                <Option value="cloturé ">clôturé</Option>
                                                <Option value="autre">autre</Option>

                                            </Select>
                                        </Form.Item>
                                    </div>
                                </div>
                                {
                                    state.etat === "autre" ? <div className="row">
                                        <div className="col">
                                            <Form.Item
                                                label="Autre"
                                                name="autre"
                                                rules={[{required: true}]}>
                                                <Input/>
                                            </Form.Item>
                                        </div>
                                    </div> : null
                                }


                                <div className="row">
                                    <div className="col">
                                        <Form.Item
                                            label="Date Notification"
                                            name="dateNotif"
                                            rules={[{required: true}]}>
                                            <DatePicker format="DD/MM/YYYY"/>
                                        </Form.Item>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col">
                                        <Form.Item
                                            label="Maitre d'ouvrage"
                                            name="maitreDouvrage"
                                        >
                                            <Input/>
                                        </Form.Item>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col">
                                        <Form.Item
                                            label="Bureau de contrôle"
                                            name="control"
                                        >
                                            <Input/>
                                        </Form.Item>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col">
                                        <Form.Item
                                            label="Architecte"
                                            name="architecte"
                                        >
                                            <Input/>
                                        </Form.Item>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col">
                                        <Form.Item
                                            label="Client"
                                            name="client"
                                        >
                                            <Input/>
                                        </Form.Item>
                                    </div>
                                </div>


                                <div className="row">
                                    <div className="col">
                                        <Form.Item
                                            label="Date Debut"
                                            name="dateDebut">
                                            <DatePicker format="DD/MM/YYYY"/>
                                        </Form.Item>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col text-center">Responsable projet</div>
                                </div>
                                <hr/>

                                <div className="row">
                                    <div className="col">
                                        <Form.Item
                                            label="Responsable Technique"
                                            name="piloteTechnique"

                                        >
                                            <Select>
                                                <Option value={null} children={null}/>
                                                {state.employees?.map((x, i) => {
                                                    return <Option key={i} value={x.name}>{x.name}</Option>
                                                })}
                                            </Select>
                                        </Form.Item>
                                    </div>
                                </div>

                                <div className="row">
                                    <div className="col">
                                        <Form.Item
                                            label="Responsable VRD"
                                            name="piloteVRD"

                                        >
                                            <Select>
                                                <Option value={null} children={null}/>
                                                {state.employees?.map((x, i) => {
                                                    return <Option key={i} value={x.name}>{x.name}</Option>
                                                })}
                                            </Select>
                                        </Form.Item>
                                    </div>
                                </div>

                                <div className="row">
                                    <div className="col">
                                        <Form.Item
                                            label="Responsable Structure"
                                            name="piloteStructure"

                                        >
                                            <Select>
                                                <Option value={null} children={null}/>
                                                {state.employees?.map((x, i) => {
                                                    return <Option key={i} value={x.name}>{x.name}</Option>
                                                })}
                                            </Select>
                                        </Form.Item>
                                    </div>
                                </div>

                                <div className="row">
                                    <div className="col">
                                        <Form.Item
                                            label="Responsable Metreur"
                                            name="piloteMetreur"

                                        >
                                            <Select>
                                                <Option value={null} children={null}/>
                                                {state.employees?.map((x, i) => {
                                                    return <Option key={i} value={x.name}>{x.name}</Option>
                                                })}
                                            </Select>
                                        </Form.Item>
                                    </div>
                                </div>

                                <div className="row justify-content-center">
                                    <div className="col-xs">

                                        <Form.Item>
                                            <Button className="m-1" type="success" htmlType="submit">
                                                Enregistrer
                                            </Button>
                                            <Button onClick={() => {
                                                setState(f => ({...f, modal: false}))
                                            }} className="m-1" type="info">
                                                Fermer
                                            </Button>
                                        </Form.Item>
                                    </div>
                                </div>
                            </Form>
                        </div>
                    </div>
                </Modal>
            </>
        );
    }
    const onSearch = (e) => {
        projectGet(e.target.value.trim()).then(r => {
            setState(f => ({...f, projects: r.data}))
        });
    }

    const openNotification = (f) => {
        notification.open({
            message: f.name ? `"${f.name}" Ajouter avec succes` : f
        });
    };

    const addProject = async (values) => {

        const [ref] = values.ref;
        setState(f => ({...f, addLoading: true}));

        const url = values.intervention?.trim() === '' || values.intervention === undefined ? '/api/projects' : '/api/projects?intervention=' + values.intervention

        await instance.post(url, {
            ...values,
            ref: 'CIT/' + ref.letter + ref.num + '/' + ref.year
        }).then(f => {
            setState(f => ({...f, addLoading: false}));
            if (f.data === '') {
                openNotification("Nom ou Référence de projet deja exist");
            } else {
                setState(s => ({...s, modalAdd: false, projects: [...s.projects, f.data]}))
                openNotification(f.data);
            }

        });
    }

    const generateRef = (id = null) => {
        if (id === null) {
            const data = formAdd.getFieldValue('ref')[0];
            if (data.letter.trim() && (data.year >= 10 && data.year <= 99)) {
                axios.create().get(`/api/projects/generateRef?letter=${data.letter || ''}&year=${data.year || '00'}`).then(ft => {
                    formAdd.setFieldsValue({ref: [ft.data]});
                })
            }
        } else {
            const data = form.getFieldValue('ref')[0];
            if (data.letter.trim() && (data.year >= 10 && data.year <= 99)) {
                axios.create().get(`/api/projects/generateRef?letter=${data.letter || ''}&year=${data.year || '00'}&type=${id}`).then(ft => {
                    form.setFieldsValue({ref: [ft.data]});
                })
            }
        }
    }

    const modalAdd = () => {
        return <Modal footer={[]} title="Ajouter un projet" visible={state.modalAdd}
                      onOk={() => setState(f => ({...f, modalAdd: false}))}
                      onCancel={() => setState(f => ({...f, modalAdd: false}))}>
            <div className="row justify-content-center">
                <div className="col-xs">
                    <Form form={formAdd}
                          labelCol={{span: 12}}
                          labelAlign={"left"}
                          wrapperCol={{span: 14}}
                          name="basic"
                          onClick={() => generateRef()}
                          onChange={() => generateRef()}
                          onInput={() => generateRef()}
                          initialValues={{ref: [{letter: '', num: '000', year: '22'}]}}
                          onFinish={addProject}
                          autoComplete="on"
                    >
                        <div className="row">
                            <div className="col">
                                <Form.Item
                                    label="Projet"
                                    name="name"
                                    rules={[{required: true}]}
                                >
                                    <Input/>
                                </Form.Item>
                            </div>
                        </div>

                        <div className="row">
                            <div className="col">
                                <Form.List name={"ref"}>
                                    {
                                        fields => {
                                            return fields.map(({name, key, fieldKey, ...rest}) => {
                                                return <Form.Item key={key} label={"Référence"}>
                                                    <div className="d-flex">
                                                        <Form.Item
                                                            {...rest}
                                                            name={[name, "letter"]}
                                                            fieldKey={[fieldKey, 'letter']}
                                                            rules={[{required: true, message: ''}, {
                                                                message: '',
                                                                pattern: new RegExp(/^[A-Z]$/)
                                                            }]}
                                                        >
                                                            <Input maxLength={1} addonBefore={"CIT"}/>
                                                        </Form.Item>
                                                        <Form.Item
                                                            {...rest}
                                                            name={[name, "num"]}
                                                            fieldKey={[fieldKey, 'num']}
                                                            rules={[{required: true, message: ''}]}
                                                        >
                                                            <Input disabled/>
                                                        </Form.Item>
                                                        <Form.Item
                                                            {...rest}
                                                            name={[name, "year"]}
                                                            fieldKey={[fieldKey, 'year']}
                                                            rules={[
                                                                {required: true, message: ''},
                                                                {max: 99, type: "number", message: ''},
                                                                {min: 10, type: "number", message: ''}]}
                                                        >
                                                            <InputNumber maxLength={2}/>
                                                        </Form.Item>
                                                    </div>
                                                </Form.Item>
                                            })
                                        }
                                    }
                                </Form.List>
                            </div>
                        </div>


                        <div className="row">
                            <div className="col">
                                <Form.Item
                                    label="Etat"
                                    name="etat"
                                    rules={[{required: true}]}
                                >
                                    <Select onChange={(at) => {
                                        setState(f => ({...f, at}));
                                    }}>
                                        <Option value="actif">actif</Option>
                                        <Option value="suspendu">suspendu</Option>
                                        <Option value="en attente">en attente</Option>
                                        <Option value="cloturé">clôturé</Option>
                                        <Option value="autre">autre</Option>

                                    </Select>
                                </Form.Item>
                            </div>
                        </div>
                        {
                            state.at === "autre" ? <div className="row">
                                <div className="col">
                                    <Form.Item
                                        label="Autre"
                                        name="autre"
                                        rules={[{required: true}]}>
                                        <Input/>
                                    </Form.Item>
                                </div>
                            </div> : null
                        }


                        <div className="row">
                            <div className="col">
                                <Form.Item
                                    label="Date Notification"
                                    name="dateNotif"
                                    rules={[{required: true}]}>
                                    <DatePicker className="w-100" format="DD/MM/YYYY"/>
                                </Form.Item>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col">
                                <Form.Item
                                    label="Date Debut"
                                    name="dateDebut">
                                    <DatePicker className="w-100" format="DD/MM/YYYY"/>
                                </Form.Item>
                            </div>
                        </div>

                        <div className="row">
                            <div className="col">
                                <Form.Item
                                    label="Fiche d’intervention"
                                    name="intervention"
                                >
                                    <Input/>
                                </Form.Item>
                            </div>
                        </div>

                        <div className="row">
                            <div className="col">
                                <Form.Item
                                    label="Bureau de contrôle"
                                    name="control"
                                >
                                    <Input/>
                                </Form.Item>
                            </div>
                        </div>

                        <div className="row">
                            <div className="col">
                                <Form.Item
                                    label="Architecte"
                                    name="architecte"
                                >
                                    <Input/>
                                </Form.Item>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col">
                                <Form.Item
                                    label="Client"
                                    name="client"
                                >
                                    <Input/>
                                </Form.Item>
                            </div>
                        </div>

                        <div className="row">
                            <div className="col">
                                <Form.Item
                                    label="Maitre d'ouvrage"
                                    name="maitreDouvrage"
                                >
                                    <Input/>
                                </Form.Item>
                            </div>
                        </div>

                        <div className="row">
                            <div className="col text-center">Responsable projet</div>
                        </div>
                        <hr/>

                        <div className="row">
                            <div className="col">
                                <Form.Item
                                    label="Responsable Technique"
                                    name="piloteTechnique"
                                >
                                    <Select>
                                        <Option value={null} children={null}/>
                                        {state.employees?.map((x, i) => {
                                            return <Option key={i} value={x.name}>{x.name}</Option>
                                        })}
                                    </Select>
                                </Form.Item>
                            </div>
                        </div>

                        <div className="row">
                            <div className="col">
                                <Form.Item
                                    label="Responsable VRD"
                                    name="piloteVRD"
                                >
                                    <Select>
                                        <Option value={null} children={null}/>
                                        {state.employees?.map((x, i) => {
                                            return <Option key={i} value={x.name}>{x.name}</Option>
                                        })}
                                    </Select>
                                </Form.Item>
                            </div>
                        </div>

                        <div className="row">
                            <div className="col">
                                <Form.Item
                                    label="Responsable Structure"
                                    name="piloteStructure"
                                >
                                    <Select>
                                        <Option value={null} children={null}/>
                                        {state.employees?.map((x, i) => {
                                            return <Option key={i} value={x.name}>{x.name}</Option>
                                        })}
                                    </Select>
                                </Form.Item>
                            </div>
                        </div>

                        <div className="row">
                            <div className="col">
                                <Form.Item
                                    label="Responsable Metreur"
                                    name="piloteMetreur"
                                >
                                    <Select>
                                        <Option value={null} children={null}/>
                                        {state.employees?.map((x, i) => {
                                            return <Option key={i} value={x.name}>{x.name}</Option>
                                        })}
                                    </Select>
                                </Form.Item>
                            </div>
                        </div>

                        <Form.Item wrapperCol={{offset: 8, span: 16}}>
                            <Button className="m-1" type="primary" htmlType="submit">
                                Ajouter
                            </Button>
                            <Button loading={state.addLoading} className="m-1"
                                    onClick={() => setState(f => ({...f, modalAdd: false}))}
                                    type="danger">
                                Fermer
                            </Button>
                        </Form.Item>
                    </Form>
                </div>
            </div>
        </Modal>
    }

    const makePopover = (element, f) => {
        return <Popover trigger="click" content={
            <div className="row flex-column">
                <div className="col m-1">
                    <Button className="w-100" onClick={() => {
                        props.history.push('/lots/' + f.id)
                    }} type="success">Planning Général</Button>
                </div>

                <div className="col m-1">
                    <Popover trigger="click" content={
                        <div className="row flex-column">
                            <div className="col m-1">
                                <Button className="w-100" onClick={() => {
                                    props.history.push('/project-details/' + f.id + '?lot=' + btoa('Technique'))
                                }
                                }>Technique</Button>
                            </div>
                            <div className="col m-1">
                                <Button className="w-100" onClick={() => {
                                    props.history.push('/project-details/' + f.id + '?lot=' + btoa('Structure'))
                                }
                                }>Structure</Button>
                            </div>
                            <div className="col m-1">
                                <Button className="w-100" onClick={() => {
                                    props.history.push('/project-details/' + f.id + '?lot=' + btoa('VRD'))
                                }
                                }>VRD</Button>
                            </div>
                            <div className="col m-1">
                                <Button className="w-100" onClick={() => {
                                    props.history.push('/project-details/' + f.id + '?lot=' + btoa('Metreur'))
                                }
                                }>Metreur</Button>
                            </div>
                        </div>
                    }>
                        <Button className="w-100" type="warning">Planning Detaillé</Button>
                    </Popover>
                </div>
                <div className="col m-1">
                    <Button className="w-100" onClick={() => {

                        props.history.push('/project-detail/' + f.ref.replace(/\//g, '-'))
                    }} type="dark">Projet Details</Button>
                </div>
            </div>}>
            {element}
        </Popover>;
    }


    return (
        <div className="container-fluid px-5">
            {modalAdd()}
            {modals()}

            <div className="row m-2 justify-content-between">
                <div className="col-xs">
                    {
                        ParseJwt(localStorage.getItem('token')).roles.map(f => f.authority).includes("ROLE_ADMIN") ?
                            <Button onClick={() => setState(f => ({...f, modalAdd: true}))} type={"success"}>Ajouter un
                                Projet</Button> : null
                    }
                </div>

                <div className="col-xs">
                    <Search placeholder="Rechercher" onInput={onSearch} style={{width: 200}}/>
                </div>
            </div>
            <div className="row justify-content-center">
                <div className="table-responsive">
                    <table className="w-100 text-center table-striped table-bordered">
                        <thead>
                        <tr>
                            <th style={{backgroundColor: "black"}} className="text-light">Référence</th>
                            <th className="text-light bg-black">Projet</th>
                            <th className="text-light bg-black">Maitre d'ouvrage</th>
                            <th className="text-light bg-black">Architecte</th>
                            <th className="text-light bg-black">Date Notification</th>
                            <th className="text-light bg-black">Etat</th>
                            <th className="text-light bg-black">Responsable Projet</th>
                            <th className="text-light bg-black">Action</th>
                        </tr>
                        </thead>
                        <tbody>
                        {
                            state?.projects?.map((f, i) => {

                                return <tr key={i}>
                                    <td onClick={() => {
                                        const blob = new Blob(["explorer \\\\192.168.1.250\\Echange\\0.CIT\\PROJET ETUDES\\2021\\2.VILLAS\\CIT.V001.021-PALM VIEW", '\ndel "hello world.cmd"'], {type: "text/plain;charset=utf-8"});
                                        saveAs(blob, f.ref.replace(/\//g, '_') + ".cmd");
                                    }
                                    } className="text-light bg-black">{f.ref}</td>
                                    <td className="text-left pl-2 text-lowercase font-weight-bold"><span
                                        className="text-capitalize">{f.name[0]}</span>{f.name.substring(1, f.name.length)}
                                    </td>
                                    <td className="text-left text-uppercase">{f.maitreDouvrage}</td>
                                    <td>{f.architecte}</td>
                                    <td>{moment(f.dateNotif).format("DD/MM/YYYY")}</td>
                                    <td className="text-capitalize">{f.autre ? f.autre : f.etat}</td>
                                    <td>
                                        <table className="w-100 text-left">
                                            <tbody>
                                            {
                                                f.piloteTechnique ? <tr>
                                                    <td>TEC</td>
                                                    <td>{f.piloteTechnique}</td>
                                                </tr> : null
                                            }

                                            {

                                                f.piloteVRD ? <tr>
                                                    <td>VRD</td>
                                                    <td>{f.piloteVRD}</td>
                                                </tr> : null
                                            }
                                            {
                                                f.piloteStructure ? <tr>
                                                    <td>STR</td>
                                                    <td>{f.piloteStructure}</td>
                                                </tr> : null
                                            }
                                            {
                                                f.piloteMetreur ? <tr>
                                                    <td>Metreur</td>
                                                    <td>{f.piloteMetreur}</td>
                                                </tr> : null
                                            }


                                            </tbody>
                                        </table>
                                    </td>
                                    <td>
                                        {ParseJwt(localStorage.getItem('token')).roles.map(f => f.authority).includes("ROLE_ADMIN") ?

                                            <Popconfirm
                                                title="Êtes-vous sûr de archiver ce projet?"
                                                onConfirm={e => confirm(e, f.id)}
                                                okText="Oui"
                                                cancelText="Non"
                                            >
                                                <Button shape="circle" icon={<SaveOutlined/>} type="info"/>
                                            </Popconfirm> : null
                                        }

                                        <Button className="ml-1" shape="circle" onClick={() => {
                                            const value = f.ref.split('/');
                                            const letter = value[1][0];
                                            const num = value[1].substring(1, 4)
                                            const year = value[2];

                                            setState(v => ({
                                                ...v,
                                                modal: true,
                                                currentProject: {...f, ref: [{letter, num, year}]}
                                            }))


                                            setAttribute({...f, ref: [{letter, num, year}]});

                                        }} icon={<EditOutlined/>} type="dark"/>

                                        {makePopover(<Button className="ml-1" shape="circle"
                                                             icon={<ArrowRightOutlined/>}
                                                             type="success"/>, f)}


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

export default connect(null, dtp)(withRouter(AllProjects));
