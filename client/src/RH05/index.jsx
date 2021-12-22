import React, {useEffect, useState} from 'react';
import axios from "axios";
import moment from "moment";
import Button from "antd-button-color";
import {ArrowLeftOutlined, ArrowRightOutlined} from "@ant-design/icons";
import {DatePicker, Form, Input, Modal, Popover, Select} from "antd";

const {RangePicker} = DatePicker;

const RH05 = () => {
    const [form] = Form.useForm();

    const [state, setState] = useState({congesModal: false, year: 2021, months: [], employees: []});

    useEffect(() => {
        axios.create().get('/api/conges/' + state.year).then(ft => {
            const date = moment("15-06-" + state.year, "DD-MM-YYYY");
            const months = Array.apply(0, Array(12)).map((_, i) => ({
                date: moment(date).month(i),
                month: moment(date).month(i).format("MMMM")
            }))
            setState(f => ({...f, months, employees: ft.data}));

        });
    }, [state.year]);


    const CongesModal = <Modal title={"Ajouter des congés"} footer={[]}
                               onCancel={() => setState(f => ({...f, congesModal: false}))}
                               onOk={() => setState(f => ({...f, congesModal: false}))} visible={state.congesModal}>

        <Form form={form} onFinish={(val) => {

            const [firstDate, lastDate] = val.date;

            axios.create().post('/api/conges', {
                comment: val.comment,
                employee: {id: val.employee},
                firstDate,
                lastDate
            }).then(() => {

                axios.create().get('/api/conges/' + state.year).then(ft => {
                    const date = moment("15-06-" + state.year, "DD-MM-YYYY");
                    const months = Array.apply(0, Array(12)).map((_, i) => ({
                        date: moment(date).month(i),
                        month: moment(date).month(i).format("MMMM")
                    }))
                    setState(f => ({...f, months, employees: ft.data, congesModal: false}));

                });
            });


        }} labelCol={{span: 5}} labelAlign={"left"}>
            <Form.Item rules={[{required: true, message: ''}]} name={"employee"} label={"Employee"}>
                <Select showSearch>
                    {
                        state.employees?.map(x => {
                            return <Select.Option key={x.id} value={x.id}
                                                  children={x.firstName[0] + "." + x.lastName}/>
                        })
                    }
                </Select>
            </Form.Item>

            <Form.Item rules={[{required: true, message: ''}]} name={"date"} label={"Date"}>
                <RangePicker className={"w-100"} format={"DD/MM/YYYY"}/>
            </Form.Item>

            <Form.Item name={"comment"} label={"Commentaire"}>
                <Input.TextArea/>
            </Form.Item>

            <Form.Item className={"text-center"}>
                <Button type={"success"} htmlType={"submit"} children={"Enregistrer"}/>
            </Form.Item>
        </Form>

    </Modal>


    return (
        <div className={"container-fluid"}>
            {CongesModal}
            <div className="row flex-column mt-4">
                <div className="col d-flex justify-content-around">
                    <Button type={"primary"} onClick={() => setState(f => ({...f, year: f.year - 1}))}
                            icon={<ArrowLeftOutlined/>}/>
                    <h5 className={"text-center"}>{state.year}</h5>
                    <Button onClick={() => setState(f => ({...f, year: f.year + 1}))} type={"primary"}
                            icon={<ArrowRightOutlined/>}/>
                </div>
                <div className="col">
                    <table className={"table text-center table-bordered"}>
                        <thead>
                        <tr>
                            <th className={"align-middle"}>Noms</th>
                            <th className={"align-middle"}>Nombre <br/> de jours</th>
                            {state.months?.map((x, i) => <th className={"align-middle"} key={i}>{x.month}</th>)}
                            <th className={"align-middle"}>Remplacement</th>
                        </tr>
                        </thead>
                        <tbody>
                        {
                            state.employees?.map((x, i) => {
                                return <tr data-id={x.id} key={x.id}>
                                    <td className={"align-middle"}>{x.lastName}</td>
                                    <td className={"align-middle"}>{x
                                        .conges.map(x => moment(x.lastDate).diff(x.firstDate, 'days'))
                                        .reduce((v, a) => v + a, 0)
                                    }</td>
                                    {
                                        state.months.map(s => {

                                            const congesFirst = x
                                                .conges
                                                .filter(f => moment(f.firstDate).format("MM-YYYY") === moment(s.date).format("MM-YYYY"))
                                                .map(f => ({
                                                    date: "Du " + moment(f.firstDate).format("DD/MM"),
                                                    id: f.id
                                                }));
                                            const congesLast = x
                                                .conges
                                                .filter(f => moment(f.lastDate).format("MM-YYYY") === moment(s.date).format("MM-YYYY"))
                                                .map(f => ({
                                                    date: "Au " + moment(f.lastDate).format("DD/MM"),
                                                    id: f.id
                                                }));

                                            congesFirst.push(...congesLast);

                                            if (congesFirst.length === 0) return <td key={s.date}/>


                                            return <Popover content={
                                                <div className="row mx-2 justify-content-center">
                                                    <div className="col-xs">
                                                        <Button onClick={() => {


                                                            axios.create().patch("/api/conges", congesFirst.map(v => v.id)).then(() => {
                                                                const e = state.employees[i];

                                                                e.conges = e.conges.filter(t => !congesFirst.map(v => v.id).includes(t.id));

                                                                const em = state.employees;
                                                                em[i] = e;

                                                                setState(f => ({...f, employees: em}));

                                                            });
                                                        }} type={"danger"} children={"Supprimer"}/>
                                                    </div>
                                                </div>} trigger={"click"} key={s.date}>
                                                <td style={{cursor: "pointer"}} className={"align-middle"}
                                                >{congesFirst.map(g => g.date).join(" ")}</td>
                                            </Popover>
                                        })
                                    }
                                    <td id={"REP" + x.id}/>
                                </tr>
                            })
                        }
                        </tbody>
                    </table>
                </div>
                <div className="col">
                    <Button onClick={() => setState(f => ({...f, congesModal: true}))} type={"success"}
                            children={"Ajouter des congés"}/>
                </div>
            </div>
        </div>
    );
};

export default RH05;
