import React, {useEffect, useState} from "react";
import {DatePicker, Form, Input, InputNumber, Modal} from "antd";
import Button from "antd-button-color";
import moment from "moment";
import {GetLastTacheEdit, RemoveEmpty, ReplaceWeekendDays} from "../../tools";
import axios from "axios";
import Checkbox from "antd/es/checkbox";
import Radio from "antd/es/radio";

const Edit = (props) => {
    const [form] = Form.useForm();

    const [inex, setInex] = useState(props.modal.data?.inex);


    useEffect(() => {
        setInex(props.modal.data?.inex)

        if (props.modal.data?.inex === "Externe") {
            props.modal.data.lesJoursReel = moment(props.modal.data.jreelStart).add(parseInt(props.modal.data.jreel) - 1, 'days');
        }

        form.setFieldsValue({
            ...props.modal.data,
            nb: props.modal.data?.recent.map(x => parseInt(x)),
            dayEstimated: props.modal.data?.realJest
        })


    }, [props.modal.data, form])


    const onFinish = (values) => {


        const old = moment(props.modal.data.jestStart).clone();

        let cpt = 0;
        while (old.isBefore(moment(values.lesJoursReel))) {
            if (old.day() === 0 || old.day() === 6) cpt++;
            old.add(1, 'days');
        }


        if (values.nb === undefined) values.nb = [];
        values = RemoveEmpty(values);
        const jours = GetLastTacheEdit({taches: props.taches, project: props.project}, values)

        const jest = ReplaceWeekendDays(jours.jestStart, values.dayEstimated);

        const value = {
            comment: values.comment,
            realJest: values.dayEstimated,
            realJreel: moment(values.lesJoursReel).clone().diff(props.modal.data.jreelStart, "days") - cpt + 1,
            jest,
            jreel: moment(values.lesJoursReel).clone().diff(props.modal.data.jreelStart, "days") + 1,
            jreelStart: moment(props.modal.data.jreelStart).valueOf(),
            jestStart: moment(jours.jestStart).valueOf(),
            lot: props.lot,
            name: values.name,
            complete: values.complete,
            recent: values.nb,
            phase: values.phase,
            inex: values.inex
        }
        axios.create().put('/api/taches/' + props.modal.data.id, value).then(() => window.location.reload());
    }

    return (
        <div>
            <Modal forceRender={true} title="Modifier une tache" visible={props.modal.type}
                   footer={[<Button key="cancel" type="primary" onClick={props.closeModal}>
                       Fermer
                   </Button>,]} onCancel={props.closeModal}>


                <Form form={form} onFinish={onFinish} title="Modifier une Tache">

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
                        {inex !== 'Externe' ?
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
                                    props.taches.filter(x => x.id !== props.modal.data?.id && x.lot.toLocaleLowerCase() === props.lot.toLocaleLowerCase()).map((f, i) => {
                                        if (f.currentKey >= props.modal.data?.currentKey) return null;
                                        return (
                                            <Checkbox key={i} value={f.currentKey}
                                                      style={{lineHeight: '32px'}}>{f.name}</Checkbox>)
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
                                <Radio.Group buttonStyle="solid"
                                             onChange={x => setInex(x.target.value)}>
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


            </Modal>
        </div>
    );
}

export default Edit;
