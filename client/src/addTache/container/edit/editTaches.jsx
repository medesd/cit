import React, {useEffect, useState} from "react";
import {useLocation, withRouter} from "react-router";
import axios from "axios";
import {DatePicker, Form, Input, InputNumber} from "antd";
import Checkbox from "antd/es/checkbox";
import Radio from "antd/es/radio";
import Button from "antd-button-color";
import moment from "moment";
import {GetLastTacheEdit, RemoveEmpty, ReplaceWeekendDays} from "../../../tools";


function useQuery() {
    return new URLSearchParams(useLocation().search);
}


const EditTache = (props) => {
    const [form] = Form.useForm();
    const [state, setState] = useState({project: null, taches: [], currentTache: null, inex: false});
    const lot = atob(useQuery().get('lot'));
    useEffect(() => {


        const fetchData = async () => {
            await axios.create().get('/api/projects/taches/' + props.match.params.id).then(ft => {
                const cur = ft.data.find(x => x.id === props.data.id);

                if (cur.inex === "Externe") {
                    cur.lesJoursReel = moment(cur.jreelStart).add(parseInt(cur.jreel) - 1, 'days');
                }

                form.setFieldsValue({
                    ...cur,
                    nb: cur.recent.map(x => parseInt(x)),
                    dayEstimated: cur.realJest
                })

                setState(f => ({
                    ...f,
                    taches: ft.data,
                    currentTache: cur,
                    inex: cur.inex
                }));
            })

            await axios.create().get('/api/projects/' + props.match.params.id).then(ft => {
                setState(f => ({...f, project: ft.data}))
            })
        }
        fetchData().then(() => null);


    }, [props.match.params.id,form,props.data])

    const onFinish = (values) => {


        const old = moment(state.currentTache.jestStart).clone();

        let cpt = 0;
        while (old.isBefore(moment(values.lesJoursReel))) {
            if (old.day() === 0 || old.day() === 6) cpt++;
            old.add(1, 'days');
        }


        if (values.nb === undefined) values.nb = [];
        values = RemoveEmpty(values);
        const jours = GetLastTacheEdit(state, values)

        const jest = ReplaceWeekendDays(jours.jestStart, values.dayEstimated);

        const value = {
            comment: values.comment,
            realJest: values.dayEstimated,
            realJreel: moment(values.lesJoursReel).clone().diff(state.currentTache.jreelStart, "days") - cpt,
            jest,
            jreel: moment(values.lesJoursReel).clone().diff(state.currentTache.jreelStart, "days") + 1,
            jreelStart: moment(state.currentTache.jreelStart).valueOf(),
            jestStart: moment(jours.jestStart).valueOf(),
            lot: lot,
            name: values.name,
            complete: values.complete,
            recent: values.nb,
            phase: values.phase,
            inex: values.inex
        }
        




        axios.create().put('/api/taches/' + props.data.id, value).then(() => window.location.reload());

    }


    return <Form form={form} onFinish={onFinish} title="Modifier une Tache">

        <div className="row justify-content-center">
            <div className="col-xs m-2">
                <div className="col-xs m-2">
                    <Form.Item
                        label="Tache"
                        name="name"
                        rules={[{required: true}]}
                    >
                        <Input/>
                    </Form.Item>
                </div>
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
            {state.inex !== 'Externe' ?
                <div className="col-xs m-2">
                    <Form.Item
                        label="Heurs Estimé"
                        name="complete"
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
                        <DatePicker format={"DD/MM/YYYY"}/>
                    </Form.Item>
                </div>}
        </div>


        <div className="row justify-content-center">
            <Form.Item name="nb" label="ancien Taches">
                <Checkbox.Group>
                    {
                        state.taches.filter(x => x.id !== state.currentTache.id && x.lot.toLocaleLowerCase() === lot.toLocaleLowerCase()).map((f, i) => {
                            if (f.currentKey >= state.currentTache.currentKey) return null;
                            return (
                                <Checkbox key={i} value={f.currentKey} style={{lineHeight: '32px'}}>{f.name}</Checkbox>)
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
                <Form.Item name="inex" rules={[{required: true}]} label="Interne ou Externe">
                    <Radio.Group buttonStyle="solid" onChange={x => setState(f => ({...f, inex: x.target.value}))}>
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
                    Enregister
                </Button>
            </div>
        </div>

    </Form>
}

export default withRouter(EditTache);

