import React, {useEffect, useState} from "react";
import {useLocation, withRouter} from "react-router";
import axios from "axios";
import {DatePicker, Form, Input, InputNumber} from "antd";
import Checkbox from "antd/es/checkbox";
import Radio from "antd/es/radio";
import Button from "antd-button-color";
import moment from "moment";
import {GetLastTacheAdd, RemoveEmpty, ReplaceWeekendDays} from "../../../tools";

const AddTache = (props) => {
    const instance = axios.create();
    const [state, setState] = useState({taches: [], project: null, resp: true})
    const lot = new URLSearchParams(useLocation().search).get('lot');
    const [form] = Form.useForm();
    useEffect(() => {
        const fetchData = async () => {

            await axios.create().get('/api/projects/taches/' + props.match.params.id).then(ft => {
                setState(f => ({...f, taches: ft.data}));
            })

            await axios.create().get('/api/projects/' + props.match.params.id).then(ft => {
                setState(f => ({...f, project: ft.data}))
            })
        }
        fetchData().then(null);
    }, [props.match.params.id])


    const onFinish = (values) => {


        if (values.nb === undefined) values.nb = [];
        values = RemoveEmpty(values);
        const jours = GetLastTacheAdd(state, values)

        const prevTache = state.taches.filter(x => x.lot === atob(lot)).at(-1);
        let prevReelDate;
        if (prevTache) prevReelDate = moment(prevTache.jreelStart).add(prevTache.jreel, 'days');
        else prevReelDate = moment(state.project.dateDebut).clone();


        const jreel = moment(values.lesJoursReel).diff(prevReelDate, 'days');


        let cpt = 0;
        while (prevReelDate.isBefore(values.lesJoursReel)) {
            if (prevReelDate.day() === 0 || prevReelDate.day() === 6)
                cpt++;
            prevReelDate.add(1, 'days');
        }
        const cje = ReplaceWeekendDays(jours.jestStart, values.dayEstimated);

        const value = {
            currentKey: state.taches.length !== 0 ? state.taches.at(-1).currentKey + 1 : 1,
            project: {id: props.match.params.id},
            comment: values.comment,
            realJest: values.dayEstimated,
            realJreel: jreel - cpt,
            jest: cje,
            jreel,
            jreelStart: moment(jours.jreelStart).valueOf(),
            jestStart: moment(jours.jestStart).valueOf(),
            lot: atob(lot),
            name: values.tache,
            complete: state.resp ? values.percent : 0,
            recent: values.nb,
            phase: values.phase,
            inex: values.inex
        }


        instance.post('/api/taches', value).then(() => window.location.reload());
    };


    return (
        <Form form={form} initialValues={{inex: 'Interne'}} onFinish={onFinish} title="Ajouter une Tache">

            <div className="row justify-content-center">

                <div className="col-xs m-2">
                    <Form.Item
                        label="Nom"
                        name="tache"
                        rules={[{required: true}]}
                    >
                        <Input/>
                    </Form.Item>
                </div>
            </div>


            <div className="row justify-content-center">
                <div className="col-xs m-2">
                    <Form.Item
                        label="jours Estimé"
                        name="dayEstimated"
                        rules={[{required: true}]}
                    >
                        <InputNumber min={1}/>
                    </Form.Item>
                </div>
                {state.resp ? <div className="col-xs m-2">
                    <Form.Item
                        label="Heurs Estimé"
                        name="percent"
                        rules={[{required: true}]}
                    >
                        <InputNumber min={1}/>
                    </Form.Item>
                </div> : <div className="col-xs m-2">
                    <Form.Item
                        label="jours Reel"
                        name="lesJoursReel"
                        rules={[{required: true}]}
                    >
                        <DatePicker format="DD/MM/YYYY"/>
                    </Form.Item>
                </div>}

            </div>
            <div className="row justify-content-center">
                <Form.Item name="nb" label="ancien Taches">
                    <Checkbox.Group>
                        {
                            state.taches.filter(x => x.lot.toLocaleLowerCase() === atob(lot).toLocaleLowerCase()).map((f, i) => {

                                return <Checkbox key={i} value={f.currentKey}
                                                 style={{lineHeight: '32px'}}>
                                    {f.name}
                                </Checkbox>
                            })
                        }

                    </Checkbox.Group>
                </Form.Item>
            </div>
            <div className="row justify-content-center">
                <div className="col-xs m-2">
                    <Form.Item
                        label="phase"
                        name="phase"
                        rules={[{required: true}]}
                    >
                        <Input/>
                    </Form.Item>
                </div>
            </div>
            <div className="row justify-content-center">
                <div className="col-xs m-2">
                    <Form.Item name="inex" rules={[{required: true}]} label="Responsable">
                        <Radio.Group onChange={(e) => {
                            if (e.target.value === "Externe") {
                                setState(f => ({...f, resp: false}));
                            } else {
                                setState(f => ({...f, resp: true}));
                            }
                        }} buttonStyle="solid">
                            <Radio.Button value="Externe">Externe</Radio.Button>
                            <Radio.Button value="Interne">Interne</Radio.Button>
                        </Radio.Group>
                    </Form.Item>
                </div>
            </div>
            <div className="row justify-content-center">
                <div className="col">
                    <Form.Item name="comment" label="commontaires">
                        <Input.TextArea/>
                    </Form.Item>
                </div>
            </div>
            <div className="row justify-content-center">
                <div className="col-xs m-1">
                    <Button type="success" htmlType="submit">
                        Ajouter
                    </Button>
                </div>
            </div>

        </Form>
    )
}

export default withRouter(AddTache);
