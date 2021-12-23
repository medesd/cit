import React, {useEffect, useRef, useState} from 'react';
import Select from "antd/es/select";
import Form from "antd/es/form";
import Button from "antd-button-color";
import {LeftOutlined, RightOutlined} from '@ant-design/icons';
import moment from "moment";
import 'moment/locale/fr'
import Popover from "antd/es/popover";
import Modal from "antd/es/modal";
import Input from "antd/es/input";
import {bindActionCreators} from "redux";
import * as types from "../../redux/actions/actions";
import {connect} from "react-redux";
import axios from "axios";
import image from "../../addTache/header/image002.png";
import {Checkbox} from "antd";
import $ from 'jquery';
import {ParseJwt} from "../../tools";

const {Option} = Select;


const Container = (props) => {
    const [form] = Form.useForm();

    const roles = useRef(ParseJwt(localStorage.getItem('token')).roles.map(f => f.authority));
    const instance = axios.create();


    //TODO: State

    const [state, setState] = useState({
        taches: [],
        elements: [],
        elementsUp: [],
        choisModal: false,
        employees: [],
        currentEmp: null,
        projectVisible: false,
        autreVisible: false,
        chantierVisible: false,
        reunionVisible: false,
        date: moment().format("DD/MM/YYYY"),
        days: [],
        tacheSelected: false,
    })

    //TODO: Http Requests

    const tachesGet = async (id) => {
        return await instance.get('/api/taches/names/' + id);
    }

    const sendElement = async (element) => {
        return await instance.post('/api/elements', element);
    }
    const getEmployeeElementAdmin = async (id) => {
        return await instance.get('/api/employees/element-by-employee/' + id);
    }

    const deleteElement = async () => {
        return await instance.patch('/api/elements', state.elementsUp);
    }


    //TODO: Effects


    useEffect(() => {
        if (!roles.current.includes('ROLE_ADMIN')) {
            $(function () {
                let list = [];
                let isMouseDown = false;
                $("#our_table td")
                    .mousedown(function (evt) {
                        isMouseDown = true;
                        if (parseInt($(this).attr('data-select'))) {
                            $(this).attr('data-select', 0)
                            evt.target.style.border = "1px solid #dee2e6"
                            list = list.filter(x => x !== evt.target.id)
                        } else if (!$(this).hasClass('disabled-cells')) {
                            $(this).attr('data-select', 1)
                            evt.target.style.border = "1px solid black"
                            evt.target.style.borderLeft = "2px solid black"
                            evt.target.style.borderTop = "2px solid black"
                            list.push(evt.target.id);
                        }
                        return false;
                    })
                    .mouseenter(function (evt) {
                        if (isMouseDown) {
                            if (parseInt($(this).attr('data-select'))) {
                                $(this).attr('data-select', 0)
                                evt.target.style.border = "1px solid #dee2e6"
                                list = list.filter(x => x !== evt.target.id)
                            } else if (!$(this).hasClass('disabled-cells')) {
                                $(this).attr('data-select', 1)
                                evt.target.style.border = "1px solid black"
                                evt.target.style.borderLeft = "2px solid black"
                                evt.target.style.borderTop = "2px solid black"
                                list.push(evt.target.id);
                            }
                        }
                    })

                $("#our_table td")
                    .mouseup(function () {
                        setState(f => ({...f, elementsUp: list}));
                        list = [];
                        if (parseInt($(this).attr('data-select'))) {
                            setState(f => ({...f, choisModal: true}));
                        }
                        $('#our_table td').attr('data-select', 0);
                        $('#our_table td').css({border: "1px solid #dee2e6"})
                        isMouseDown = false;
                    });
            });
        } else {
            axios.create().get('/api/employees/names').then(ft => {
                setState(f => ({...f, employees: ft.data}))
            })
        }
        const current = ParseJwt();
        setState(f => ({...f, currentEmp: current}));
        axios.create().get('/api/employees/elements/' + current.id).then(ft => {
            setState(f => ({...f, elements: ft.data}));
        })

    }, [])

    useEffect(() => {
        axios.create().get('/api/projects/names').then(r => {
            props.actions.setDataProjects(r.data);
        });
    }, [props.actions])

    useEffect(() => {
        makeDays(state.date);
        if (state.elements && state.currentEmp) {


            const tds = [...document.getElementById('core').childNodes].map(f => [...f.childNodes]).flat();
            const some = tds.filter(f => f.id !== "").map(f => f.id);

            some.forEach(f => {
                if (state.elements.map(s => s.identifier).includes(f)) {
                    const fs = state.elements.find(d => d.identifier === f);
                    document.getElementById(f).style.backgroundColor = fs.bgcolor;
                    document.getElementById(f).style.color = fs.color;
                    document.getElementById(f).innerHTML = fs.value;
                } else {
                    document.getElementById(f).style.backgroundColor = '#fff';
                    document.getElementById(f).innerHTML = '';
                    document.getElementById(f).style.color = '#fff';
                }
            })
        }
    }, [state.elements, state.date, state.currentEmp])


    const adminSelect = (value) => {
        getEmployeeElementAdmin(value).then(ft => {
            setState(f => ({...f, elements: ft.data}));
        })
    }

    //TODO: Functions

    const makeDays = (date) => {
        setState(f => ({...f, date}));
        let currentDate = moment(date, 'DD/MM/YYYY').locale('fr');
        let weekStart = currentDate.clone().startOf('week');
        const days = [];
        for (let i = 0; i <= 5; i++) {
            days.push(moment(weekStart).add(i, 'days').format("dddd (DD/MM/YYYY)"));
        }
        setState(f => ({...f, days}));

    }

    const makeElement = (value, bgcolor, comment, end = false) => {
        let tache = state.taches.find(f => f.id === value);
        if (tache === undefined) tache = null;
        else value = tache.name;

        let element = state.elementsUp.map(x => {
            return {
                bgcolor,
                comment,
                value,
                color: '#fff',
                identifier: x,
                tache: {...tache, end},
                employee: {id: state.currentEmp.id}
            }
        })
        sendElement(element).then(ft => {


            setState(f => ({
                ...f,
                elements: [...f.elements.filter(k => k.identifier !== ft.data.identifier), ...ft.data],
                currentElement: ft.data,
            }))
        })
    }

    const editDate = (type) => {
        if (type) {
            const date = moment(state.date, 'DD/MM/YYYY').add(1, 'weeks').format('DD/MM/YYYY');
            setState(f => ({...f, date}));
            makeDays(date);
        } else {
            const date = moment(state.date, 'DD/MM/YYYY').subtract(1, 'weeks').format('DD/MM/YYYY');
            setState(f => ({...f, date}));
            makeDays(date);
        }
    }

    //TODO: Forms Functions
    const onSelectProject = (_, evt) => {
        setState(f => ({...f, currentProjectId: evt.key}))
        console.log();
        form.setFieldsValue({tacheName: [], project: props.state.projects.find(x => x.id === parseInt(evt.key)).name});
        tachesGet(evt.key).then(ft => {
            setState(f => ({...f, taches: ft.data}));
        })
    }

    const onSelectTache = (values) => {
        deleteElement().then(() => {
            makeElement(values.tacheName, '#28a745', values.comment, values.end)
            setState(f => ({...f, projectVisible: false, tacheSelected: false, taches: []}));
            form.setFieldsValue({ref: null, project: null, end: false, tacheName: null})
        });
    }

    const onSelectAutre = (values) => {
        deleteElement().then(() => {
            makeElement(values.value, '#1890ff', values.comment)
            setState(f => ({...f, autreVisible: false}));
        });
    }

    const onSelectChantier = (values) => {
        deleteElement().then(() => {
            makeElement(values.value, '#eca52b', values.comment)
            setState(f => ({...f, chantierVisible: false}))
        });
    }

    const onSelectReunion = (values) => {
        deleteElement().then(() => {
            makeElement('Reunion', '#e700ff', values.comment)
            setState(f => ({...f, reunionVisible: false}))
        });
    }

    //TODO: Rendering

    const makePopover = (element, i, f) => {
        if (f.split(" ")[0] === 'samedi' && element > 5) {
            return <td key={element + "-" + i} className="disabled-cells" style={{backgroundColor: "#000"}}/>
        }

        if (element === 1) {
            return <td className="disabled-cells" key={element + "-" + i}>{f}</td>
        }

        const identifier = f.split("(")[1].replace(')', '-') + element;
        let findIdentifier = null;
        if (state.elements.map(x => x.identifier).includes(identifier)) {
            findIdentifier = state.elements.find(x => x.identifier === identifier);
        }

        if (!roles.current.includes('ROLE_ADMIN')) {
            return (
                <Popover key={element + "-" + i} trigger="hover" placement="bottom"
                         zIndex={findIdentifier?.bgcolor && findIdentifier?.value !== "Vide" ? 0 : -30}
                         content={() => {
                             if (findIdentifier === null) return null;
                             switch (findIdentifier.bgcolor) {
                                 case '#1890ff':
                                     return <div>
                                         <div className="row mx-2 my-1 border-bottom pb-1 flex-column text-center">
                                             <div className="col w-100">
                                                 Autre:
                                             </div>
                                             <div className="col border">
                                                 {findIdentifier.value}
                                             </div>
                                         </div>

                                         <div className="row mx-2 my-1 text-center flex-column">
                                             <div className="col">
                                                 Commentaire:
                                             </div>
                                             <div className="col border">
                                                 {findIdentifier.comment}
                                             </div>
                                         </div>

                                     </div>
                                 case '#28a745':
                                     return <div>
                                         <div className="row mx-2 my-1 border-bottom pb-1 flex-column text-center">
                                             <div className="col w-100">
                                                 Projet:
                                             </div>
                                             <div className="col border">
                                                 {findIdentifier.tache.project.name}
                                             </div>
                                         </div>

                                         <div className="row mx-2 my-1 border-bottom pb-1 flex-column text-center">
                                             <div className="col w-100">
                                                 Tache:
                                             </div>
                                             <div className="col border">
                                                 {findIdentifier.tache.name}
                                             </div>
                                         </div>


                                         <div className="row mx-2 my-1 text-center flex-column">
                                             <div className="col">
                                                 Commentaire:
                                             </div>
                                             <div className="col border">
                                                 {findIdentifier.comment}
                                             </div>
                                         </div>

                                     </div>

                                 case '#eca52b':
                                     return <div>
                                         <div className="row mx-2 my-1 border-bottom pb-1 flex-column text-center">
                                             <div className="col w-100">
                                                 Visite Chantier:
                                             </div>
                                             <div className="col border">
                                                 {findIdentifier.value}
                                             </div>
                                         </div>

                                         <div className="row mx-2 my-1 text-center flex-column">
                                             <div className="col">
                                                 Commentaire:
                                             </div>
                                             <div className="col border">
                                                 {findIdentifier.comment}
                                             </div>
                                         </div>

                                     </div>

                                 case '#e700ff':
                                     return <div>
                                         <div className="row mx-2 my-1 border-bottom pb-1 flex-column text-center">
                                             <div className="col border">
                                                 {findIdentifier.value}
                                             </div>
                                         </div>

                                         <div className="row mx-2 my-1 text-center flex-column">
                                             <div className="col">
                                                 Commentaire:
                                             </div>
                                             <div className="col border">
                                                 {findIdentifier.comment}
                                             </div>
                                         </div>
                                     </div>

                                 default:
                                     return null;
                             }
                         }}>
                    <td id={identifier} className="h-100" onClick={event => {
                        setState(f => ({
                            ...f, currentElement: {
                                bgcolor: event.target.style.backgroundColor,
                                identifier: event.target.id,
                                color: event.target.style.color,
                                value: event.target.innerHTML
                            }
                        }))
                    }}>
                    </td>
                </Popover>)
        } else {
            return <Popover key={element + "-" + i} trigger="hover" placement="right"
                            zIndex={findIdentifier?.bgcolor && findIdentifier?.value !== "Vide" ? 0 : -30}
                            content={() => {
                                if (findIdentifier === null) return null;
                                switch (findIdentifier.bgcolor) {
                                    case '#1890ff':
                                        return <div>
                                            <div className="row mx-2 my-1 border-bottom pb-1 flex-column text-center">
                                                <div className="col w-100">
                                                    Autre:
                                                </div>
                                                <div className="col border">
                                                    {findIdentifier.value}
                                                </div>
                                            </div>

                                            <div className="row mx-2 my-1 text-center flex-column">
                                                <div className="col">
                                                    Commentaire:
                                                </div>
                                                <div className="col border">
                                                    {findIdentifier.comment}
                                                </div>
                                            </div>

                                        </div>
                                    case '#28a745':
                                        return <div>
                                            <div className="row mx-2 my-1 border-bottom pb-1 flex-column text-center">
                                                <div className="col w-100">
                                                    Projet:
                                                </div>
                                                <div className="col border">
                                                    {findIdentifier.tache.project.name}
                                                </div>
                                            </div>

                                            <div className="row mx-2 my-1 border-bottom pb-1 flex-column text-center">
                                                <div className="col w-100">
                                                    Tache:
                                                </div>
                                                <div className="col border">
                                                    {findIdentifier.tache.name}
                                                </div>
                                            </div>


                                            <div className="row mx-2 my-1 text-center flex-column">
                                                <div className="col">
                                                    Commentaire:
                                                </div>
                                                <div className="col border">
                                                    {findIdentifier.comment}
                                                </div>
                                            </div>

                                        </div>

                                    case '#eca52b':
                                        return <div>
                                            <div className="row mx-2 my-1 border-bottom pb-1 flex-column text-center">
                                                <div className="col w-100">
                                                    Visite Chantier:
                                                </div>
                                                <div className="col border">
                                                    {findIdentifier.value}
                                                </div>
                                            </div>

                                            <div className="row mx-2 my-1 text-center flex-column">
                                                <div className="col">
                                                    Commentaire:
                                                </div>
                                                <div className="col border">
                                                    {findIdentifier.comment}
                                                </div>
                                            </div>

                                        </div>

                                    case '#e700ff':
                                        return <div>
                                            <div className="row mx-2 my-1 border-bottom pb-1 flex-column text-center">
                                                <div className="col border">
                                                    {findIdentifier.value}
                                                </div>
                                            </div>

                                            <div className="row mx-2 my-1 text-center flex-column">
                                                <div className="col">
                                                    Commentaire:
                                                </div>
                                                <div className="col border">
                                                    {findIdentifier.comment}
                                                </div>
                                            </div>
                                        </div>

                                    default:
                                        return null;
                                }
                            }}>
                <td id={identifier} className="h-100" onClick={event => {

                    setState(f => ({
                        ...f, currentElement: {
                            bgcolor: event.target.style.backgroundColor,
                            identifier: event.target.id,
                            color: event.target.style.color,
                            value: event.target.innerHTML
                        }
                    }))
                }} onMouseEnter={event => {
                    event.target.style.border = "1px solid black"
                    event.target.style.borderLeft = "2px solid black"
                    event.target.style.borderTop = "2px solid black"
                }}
                    onMouseLeave={event => {
                        event.target.style.border = "1px solid #dee2e6";
                    }}>
                </td>
            </Popover>
        }
    }

    //TODO:Modals

    const modalChois = () => {
        return <Modal title="Selectionné un chois" footer={[]}
                      visible={state.choisModal}
                      onCancel={() => setState(f => ({
                          ...f,
                          choisModal: false,
                      }))}
                      onOk={() => setState(f => ({
                          ...f, choisModal: false,
                      }))}>
            <div className="row justify-content-center">
                <Button className="w-75 m-2" onClick={() => {


                    setState(x => ({...x, projectVisible: true, choisModal: false}));
                }} type={"success"}>Projet</Button>
                <Button className="w-75 m-2"
                        onClick={() => setState(x => ({...x, chantierVisible: true, choisModal: false}))}
                        type={"warning"}>Visite chantier</Button>
                <Button className="w-75 m-2" style={{backgroundColor: 'rgb(231, 0, 255)'}}
                        onClick={() => setState(x => ({...x, reunionVisible: true, choisModal: false}))}
                        type={"success"}>Reunion</Button>
                <Button className="w-75 m-2"
                        onClick={() => setState(x => ({...x, autreVisible: true, choisModal: false}))}
                        type={"primary"}>Autre</Button>
                <Button className="w-75 m-2" onClick={() => {
                    deleteElement().then(() => {
                        makeElement('Vide', '#ff4d4f', null);
                        setState(x => ({...x, choisModal: false}))
                    })
                }} type={"danger"}>Vide</Button>
                <Button className="w-75 m-2" onClick={() => deleteElement().then(() => setState(f => ({
                    ...f,
                    elements: f.elements.filter(s => !state.elementsUp.includes(s.identifier)),
                    choisModal: false
                })))} type={"ghost"}>Rester</Button>
            </div>
        </Modal>
    }

    const modals = () => {
        return (<>
            <Modal title="Ajouter un Tache" footer={[]}
                   visible={state.projectVisible}
                   onCancel={() => {
                       setState(f => ({
                           ...f,
                           projectVisible: false,
                           taches: [],
                           tacheSelected: false
                       }))
                       form.setFieldsValue({ref: null, project: null, tacheName: null, end: false})
                   }}
                   onOk={() => {
                       setState(f => ({
                           ...f,
                           projectVisible: false,
                           taches: [],
                           tacheSelected: false
                       }))
                       form.setFieldsValue({ref: null, project: null, tacheName: null, end: false})
                   }}>
                {
                    <Form form={form} labelAlign={"left"} labelCol={{span: 8}}
                          wrapperCol={{span: 14}} name="control-hook" onFinish={onSelectTache}>

                        <Form.Item
                            name="ref"
                            label="Référence de Projet">
                            <Select showSearch onChange={onSelectProject}>
                                {
                                    props.state.projects.map((f, i) => {
                                        return (<Option key={f.id} value={f.ref}>{f.ref}</Option>)
                                    })
                                }
                            </Select>
                        </Form.Item>

                        <Form.Item
                            name="project"
                            label="Projet">
                            <Input disabled/>
                        </Form.Item>


                        <Form.Item
                            name="tacheName"
                            label="Tache"
                            rules={[{required: true}]}>
                            <Select onChange={() => setState(f => ({...f, tacheSelected: true}))}>
                                {
                                    state.taches.map((f, i) => {
                                        return (<Option key={i} value={f.id}>{f.name}</Option>)
                                    })
                                }
                            </Select>
                        </Form.Item>

                        {
                            state.tacheSelected ? <Form.Item
                                name="end"
                                className="w-100 text-center" valuePropName="checked">
                                <Checkbox>Tache Terminé</Checkbox>
                            </Form.Item> : null
                        }


                        <Form.Item name="comment" label="Commentaire">
                            <Input.TextArea/>
                        </Form.Item>


                        <Form.Item>
                            <Button className="m-1" type="primary" htmlType="submit">
                                Afficher
                            </Button>
                            <Button className="m-1" onClick={() => {
                                form.setFieldsValue({ref: null, project: null, tacheName: null, end: false})
                                setState(f => ({...f, projectVisible: false, taches: [], tacheSelected: false}));
                            }}>Fermer</Button>
                        </Form.Item>


                    </Form>
                }
            </Modal>
            <Modal title="Ajouter Autre" footer={[]} visible={state.autreVisible}
                   onCancel={() => setState(f => ({...f, autreVisible: false}))}
                   onOk={() => setState(f => ({...f, autreVisible: false}))}>
                {
                    <Form name="control-hookes" className="w-75" onFinish={onSelectAutre}>
                        <div className="row text-center justify-content-center">
                            <Form.Item
                                name="value"
                                className="w-100"
                                label="Autre"
                                rules={[{required: true,},]}>
                                <Input/>
                            </Form.Item>

                        </div>
                        <div className="row text-center justify-content-center">
                            <Form.Item name="comment" label="Commentaire">
                                <Input.TextArea/>
                            </Form.Item>
                        </div>
                        <div className="row text-center justify-content-center">
                            <Form.Item>
                                <Button type="primary" htmlType="submit">
                                    Afficher
                                </Button>
                                <Button onClick={() => {
                                    setState(f => ({...f, autreVisible: false}))
                                }}>Fermer</Button>
                            </Form.Item>
                        </div>
                    </Form>
                }
            </Modal>
            <Modal title="Ajouter Visite Chantier" footer={[]} visible={state.chantierVisible}
                   onCancel={() => setState(f => ({...f, chantierVisible: false}))}
                   onOk={() => setState(f => ({...f, chantierVisible: false}))}>
                {
                    <Form name="control-hooks" className="w-75" onFinish={onSelectChantier}>
                        <div className="row text-center justify-content-center">
                            <Form.Item
                                name="value"
                                className="w-100"
                                label="Project"
                                rules={[{required: true,},]}>
                                <Select className="w-75">
                                    {
                                        props.state.projects.map((f, i) => {
                                            return (<Option key={i} value={f.name}>{f.name}</Option>)
                                        })
                                    }
                                </Select>
                            </Form.Item>

                        </div>
                        <div className="row text-center justify-content-center">
                            <Form.Item name="comment" label="Commentaire">
                                <Input.TextArea/>
                            </Form.Item>
                        </div>
                        <div className="row text-center justify-content-center">
                            <Form.Item>
                                <Button type="primary" htmlType="submit">
                                    Afficher
                                </Button>
                                <Button onClick={() => {
                                    setState(f => ({...f, chantierVisible: false}))
                                }}>Fermer</Button>
                            </Form.Item>
                        </div>
                    </Form>
                }
            </Modal>

            <Modal title="Ajouter Reunion" footer={[]} visible={state.reunionVisible}
                   onCancel={() => setState(f => ({...f, reunionVisible: false}))}
                   onOk={() => setState(f => ({...f, reunionVisible: false}))}>
                {
                    <Form name="control-hookes" className="w-75" onFinish={onSelectReunion}>
                        <div className="row text-center justify-content-center">
                            <Form.Item name="comment" label="Commentaire">
                                <Input.TextArea/>
                            </Form.Item>
                        </div>
                        <div className="row text-center justify-content-center">
                            <Form.Item>
                                <Button type="primary" htmlType="submit">
                                    Afficher
                                </Button>
                                <Button onClick={() => {
                                    setState(f => ({...f, reunionVisible: false}))
                                }}>Fermer</Button>
                            </Form.Item>
                        </div>
                    </Form>
                }
            </Modal>
        </>)
    }

    //TODO:render

    return (
        <div className="container mt-4">
            <div className="row justify-content-between">
                <div className="border col-xs">
                    <img height={80} src={image} alt=""/>
                </div>
                <div className="border col d-flex align-items-center justify-content-center">
                    <h4 className="font-weight-bold text-center">Récapitulatif de la semaine</h4>
                </div>
                <div className="border col-xs d-flex align-items-center justify-content-center">
                    <h4 className="mx-2 font-weight-bold text-center">DRAFT</h4>
                </div>
            </div>
            {modals()}
            {modalChois()}
            {roles.current.includes('ROLE_ADMIN') ?
                <div className="row mt-2 justify-content-center">
                    <div className="col text-center">

                        <Select onChange={adminSelect} className="w-25">
                            {
                                state.employees.map((x, i) => {
                                    return <Option key={i} value={x.id}>{x.name}</Option>
                                })
                            }
                        </Select>
                    </div>
                </div> : null
            }
            {
                state.currentEmp ? (<div className="mt-5 container">
                    <div className="row mb-2 text-center">
                        <div className="col"><Button onClick={() => editDate(false)} type="primary"
                                                     icon={<LeftOutlined/>}/>
                        </div>


                        <div className="col m-1">{state.date}</div>


                        <div className="col"><Button onClick={() => editDate(true)} type="primary"
                                                     icon={<RightOutlined/>}/></div>
                    </div>
                    <div className="table-responsive">
                        <table id="our_table" className="text-center user-select-none table-bordered w-100">
                            <thead>
                            <tr>
                                <th/>
                                <th>9-10</th>
                                <th>10-11</th>
                                <th>11-12</th>
                                <th>12-13</th>
                                <th>14-15</th>
                                <th>15-16</th>
                                <th>16-17</th>
                                <th>17-18</th>
                            </tr>
                            </thead>
                            <tbody id="core">
                            {
                                state.days.map((f, i) => {
                                    return (<tr key={i}>
                                        {
                                            [1, 2, 3, 4, 5, 6, 7, 8, 9].map(s => {
                                                return makePopover(s, i, f)
                                            })
                                        }
                                    </tr>)
                                })
                            }


                            </tbody>
                        </table>
                    </div>
                </div>) : null
            }
        </div>
    );

}

const stp = (state) => {
    return {
        state: state.dataReducer
    }
}

const dtp = (dsp) => {
    return {
        actions: bindActionCreators(types, dsp)
    };
}

export default connect(stp, dtp)(Container);
