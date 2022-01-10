import React, {useEffect, useRef, useState} from 'react';
import {Collapse, DatePicker, Form, Input, Modal, Select} from "antd";
import moment from "moment";
import Button from "antd-button-color";
import {ParseJwt} from "../tools";
import axios from "axios";
import {bindActionCreators} from "redux";
import * as AcTypes from "../redux/actions/actions";
import {connect} from "react-redux";

const SUI05 = (props) => {
    const [form] = Form.useForm();

    const [state, setState] = useState({
        range: [],
        startDate: moment().set({month: 0, dayOfYear: 1}),
        endDate: moment().set({month: 11, dayOfYear: 1}).add(3, "years"),
        projects: [],
        projectsNames: [],
        employee: null,
        modalAdd: false,
        elements: [],
        choisModal: false,
        projectId: null
    });

    const mouseRef = useRef(false);

    useEffect(() => {
        const map = state.projects?.map(x => {

            return x.sui05Elements
        }).flat()
        map.forEach(x => {
            if (!document.getElementById(x.identifier)) return;
            const e = document.getElementById(x.identifier);
            e.style.backgroundColor = "#0fb400";
        })
    }, [state.projects,state.elements])


    useEffect(() => {


        axios.create().get('/api/employees/names').then(ft => setState(f => ({
            ...f,
            employee: ft.data.find(x => x.id === ParseJwt().id)
        })))

        axios.create().get('/api/projects/names').then(ft => {
            setState(f => ({...f, projectsNames: ft.data}))
        })

        axios.create().get('/api/sui05').then(ft => {
            setState(f => ({...f, projects: ft.data}));
        })
        const dateStart = state.startDate.clone();
        const dateEnd = state.endDate.clone();
        const range = [];

        while (dateStart.format('MM-YYYY') !== dateEnd.format('MM-YYYY')) {
            if (dateStart > dateEnd) break;
            range.push(dateStart.format('MMM-YY'));
            dateStart.add(1, 'month');
        }

        setState(f => ({...f, range}))

        props.actions.setHeaderTitle("Planning general des projets de suivi");
        return () => {
            props.actions.setHeaderTitle("");
        }

    }, [props.actions,state.startDate, state.endDate]);


    const modalAdd = <Modal okButtonProps={{color: "#ddd"}} okText={"Enregistrer"} title={"Ajouter"}
                            visible={state.modalAdd}
                            onOk={() => {
                                form.submit();
                            }}
                            onCancel={() => setState(f => ({...f, modalAdd: false}))}>
        <Form form={form} onFinish={val => {
            axios.create().post('/api/sui05', {
                ...val,
                employee: {id: ParseJwt().id},
                project: {id: state.projectsNames.find(x => x.ref === val.ref).id}
            }).then(() => {

            })



        }} labelCol={{span: 5}} labelAlign={"left"}
              initialValues={{agent: state.employee ? state.employee?.firstName[0] + "." + state.employee?.lastName : ""}}>
            <Form.Item name={"ref"} label={"Référence"}>
                <Select onChange={(_, e) => {
                    if (!e.key) return;
                    form.setFieldsValue({...state.projectsNames?.find(x => x.id === parseInt(e.key))})
                }}>
                    <Select.Option value={null} children={null}/>
                    {
                        state.projectsNames?.map(x => <Select.Option value={x.ref} children={x.ref} key={x.id}/>)
                    }
                </Select>
            </Form.Item>
            <Form.Item name={"name"} label={"Projet"}>
                <Input/>
            </Form.Item>
            <Form.Item name={"agent"} label={"Agent de Suivi"}>
                <Input/>
            </Form.Item>
        </Form>
    </Modal>


    const modalChois = <Modal onOk={() => setState(f => ({...f, choisModal: false}))}
                              onCancel={() => setState(f => ({...f, choisModal: false}))} visible={state.choisModal}
                              footer={null}>
        <div className="row mt-5 flex-column">
            <Collapse defaultActiveKey={1}>
                <Collapse.Panel key={1} header={"Ajouter"}>
                    <Form onFinish={val => {
                        const data = state.elements.map(x => ({
                            identifier: x,
                            data: JSON.stringify(val),
                            sui05: {id: parseInt(state.projectId)}
                        }))
                        axios.create().post('/api/sui05/add', data).then(x => {
                            const p = state.projects.find(f => f.id === parseInt(state.projectId));
                            p.sui05Elements = [...p.sui05Elements, ...data];
                            setState(f => ({...f, projects: [...f.projects.filter(r => r.id !== p.id), p]}))
                        })
                    }}>
                        <Form.Item label={"Commentaire"} name={"comment"}>
                            <Input.TextArea/>
                        </Form.Item>
                        <Form.Item className={"text-center"}>
                            <Button htmlType={"submit"} type={"success"} children={"Enregistrer"}/>
                        </Form.Item>
                    </Form>
                </Collapse.Panel>
                <Collapse.Panel className={"text-center"} key={2} header={"Supprimer"}>
                    <Button type={"danger"} onClick={() => {
                        axios.create().post('/api/sui05/delete', state.elements).then(() => {

                            state.elements.forEach(x => {
                                document.getElementById(x).style.backgroundColor = "#fff"
                            })

                            const p = state.projects.find(f => f.id === parseInt(state.projectId));
                            p.sui05Elements = p.sui05Elements.filter(d => !state.elements.includes(d.identifier));
                            setState(f => ({...f, projects: [...f.projects.filter(r => r.id !== p.id), p]}))
                        });
                    }} className={"mr-1"} children={"Oui"}/>
                    <Button type={"primary"} onClick={() => setState(f => ({...f, choisModal: false}))}
                            className={"ml-1"} children={"Non"}/>
                </Collapse.Panel>
            </Collapse>
        </div>
    </Modal>


    const tdMouseDown = (val) => {
        mouseRef.current = true;
        if (parseInt(val.currentTarget.dataset["select"])) {
            val.currentTarget.style.border = "1px solid #dee2e6";
        } else {
            val.currentTarget.dataset["select"] = "1";
            val.currentTarget.style.border = "1px solid black"
            val.currentTarget.style.borderLeft = "2px solid black"
            val.currentTarget.style.borderTop = "2px solid black"
        }
    };


    const tdMouseEnter = val => {
        if (!mouseRef.current) return;

        if (parseInt(val.currentTarget.dataset["select"])) {
            val.currentTarget.dataset["select"] = "0";
            val.currentTarget.style.border = "1px solid #dee2e6"
        } else {
            val.currentTarget.dataset["select"] = "1";
            val.currentTarget.style.border = "1px solid black"
            val.currentTarget.style.borderLeft = "2px solid black"
            val.currentTarget.style.borderTop = "2px solid black"
        }
    };


    window.onmouseup = () => {
        const t = Array.from(document.querySelectorAll("#suivi_table td")).filter(f => !f.classList.contains("disabled-cells") && f.dataset["select"] === "1");

        if (t.length < 1) return;
        setState(f => ({
            ...f,
            elements: Array.from(t).filter(f => f.dataset["select"] === "1").map(f => f.id),
            choisModal: true,
            projectId: Array.from(t).filter(f => f.dataset["select"] === "1")[0].dataset["project"]
        }))

        t.map(f => f.id).forEach(f => {
            const element = document.getElementById(f);
            element.dataset["select"] = "0";
            element.style.border = "1px solid #dee2e6";
        })
        mouseRef.current = false;
    }


    return (
        <div className="container-fluid">
            {modalAdd}
            {modalChois}
            <div className="row justify-content-around mt-5">
                <div className="col-xs">
                    <Button type={"success"} onClick={() => setState(f => ({...f, modalAdd: true}))}
                            children={"Ajouter"}/>
                </div>
                <div className="col-xs">
                    <DatePicker.RangePicker defaultValue={[state.startDate, state.endDate]} picker={"year"}
                                            onChange={(val) => {
                                                if (!val) return;
                                                setState(f => ({
                                                    ...f,
                                                    startDate: val[0].set({month: 0, dayOfYear: 1}),
                                                    endDate: val[1].set({month: 0, dayOfYear: 1})
                                                }))
                                            }} format={"DD/MM/YYYY"}/>
                </div>
                <div className="col-xs">
                    <Input.Search/>
                </div>
            </div>
            <div style={{width: "calc(100vw - 100px)"}} className="row mt-3 px-0 mx-0">
                <div className="col table-responsive">
                    <table id={"suivi_table"}
                           className="table user-select-none  text-center table-align-middle table-bordered">
                        <thead>
                        <tr>
                            <th className={"px-2"}>Projects</th>
                            <th>Responsable</th>
                            {
                                state.range?.map(x => <th style={{transform: "rotate(-90deg)", padding: 0, height: 80}}
                                                          key={x}>{x}</th>)
                            }
                        </tr>
                        </thead>
                        <tbody>
                        {
                            state.projects?.map(x => <tr key={x.id}>
                                <td className="disabled-cells">{x.project.name}</td>
                                <td className="disabled-cells">{x.employee.firstName[0] + "." + x.employee.lastName}</td>
                                {state.range?.map(s => <td
                                    onMouseDown={tdMouseDown}

                                    onMouseEnter={tdMouseEnter}
                                    id={s + "." + x.id} key={s} data-project={x.id} data-select={"0"}/>)}
                            </tr>)
                        }
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

const dtp = (dsp) => ({actions: bindActionCreators(AcTypes, dsp)})

export default connect(null, dtp)(SUI05);

