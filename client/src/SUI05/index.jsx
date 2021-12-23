import React, {useEffect, useState} from 'react';
import {DatePicker, Form, Input, Modal, Select} from "antd";
import moment from "moment";
import Button from "antd-button-color";
import {ParseJwt} from "../tools";
import axios from "axios";
import $ from "jquery";

const SUI05 = () => {
    const [form] = Form.useForm();

    const [state, setState] = useState({
        range: [],
        startDate: moment().set({month: 0, dayOfYear: 1}),
        endDate: moment().set({month: 11, dayOfYear: 1}).add(3, "years"),
        projects: [],
        projectsNames: [],
        employee: null,
        modalAdd: false,
        element: [],
        elements: [],
        choisModal: false
    });


    useEffect(() => {
        $(function () {
            let list = [];
            let isMouseDown = false;
            $("#suivi_table td")
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

            $("#suivi_table td")
                .mouseup(function () {
                    setState(f => ({...f, elements: list}));
                    list = [];
                    if (parseInt($(this).attr('data-select'))) {

                        setState(f => ({...f, choisModal: true}));
                    }
                    $('#suivi_table td').attr('data-select', 0);
                    $('#suivi_table td').css({border: "1px solid #dee2e6"})
                    isMouseDown = false;
                });
        });
    }, [state.element])


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
        const dateStart = state.startDate;
        const dateEnd = state.endDate;
        const range = [];

        while (dateStart.format('MM-YYYY') !== dateEnd.format('MM-YYYY')) {
            if (dateStart > dateEnd) break;
            range.push(dateStart.format('MMM-YY'));
            dateStart.add(1, 'month');
        }

        setState(f => ({...f, range}))

    }, [state.startDate, state.endDate]);


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
                console.log("...")
            })

            console.log()

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


    const modalChois = <Modal onOk={() => setState(f => ({...f, choisModal: false}))} onCancel={() => setState(f => ({...f, choisModal: false}))} visible={state.choisModal} footer={null}>
        <div className="row flex-column">
            <div className="col">
                <Button children={"Supprimer"}/>
                <Button children={"ajouter"}/>
            </div>
        </div>
    </Modal>


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
                                {state.range?.map(s => <td onMouseLeave={() => {
                                    setState(f => ({...f, element: [s + "." + x.id]}))
                                }} id={s + "." + x.id} key={s}/>)}
                            </tr>)
                        }
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default SUI05;
