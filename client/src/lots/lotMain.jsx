import React, {useEffect, useRef, useState} from "react";
import image from '../assets/image002.png';
import Modal from "antd/es/modal";
import DatePicker from "antd/es/date-picker";
import Button from "antd-button-color";
import {Form, Select} from "antd";
import moment from "moment";
import axios from "axios";
import '../oldChart/chart/jquery.fn.gantt'
import '../oldChart/chart/gantt.css'
import {withRouter} from "react-router";
import $ from "jquery";

const {Option} = Select;


const LotMain = (props) => {
    const [form] = Form.useForm();

    const [state, setState] = useState({
        name: null,
        project: null,
        modal: false,
        lots: [],
        dateModal: false,
    });

    const instance = axios.create();
    const dateRef = useRef(moment());

    useEffect(() => {
        const fetchData = async () => {

            await axios.create().get('/api/projects/' + props.match.params.id).then(ft => {

                dateRef.current = moment(ft.data.dateDebut);
                form.setFieldsValue({dateDebut: ft.data.dateDebut ? moment(ft.data.dateDebut) : moment()})
                setState(f => ({...f, project: ft.data}));
            });
            await axios.create().get('/api/projects/lot/' + props.match.params.id).then(ft => {
                setState(f => ({...f, lots: ft.data}))
                makeSomeData(ft.data);
            });
        }
        fetchData().then(null);

    }, [props.match.params.id,form])

    const modals = () => {
        return <Modal
            footer={[<Button onClick={() => setState(f => ({...f, modal: false}))} key="test">Fermer</Button>]}
            title="Modifier la date de projet " visible={state.modal}
            onOk={() => setState(f => ({...f, modal: false}))}
            forceRender={true}
            onCancel={() => setState(f => ({...f, modal: false}))}>
            <Form
                form={form}
                name="basic"
                onFinish={async (data) => {

                    await instance.get('/api/projects/set-date?Pid=' + props.match.params.id + '&date=' + data.dateDebut.format("YYYY-MM-DD")).then(ft => {
                        setState(f => ({...f, dateDebut: ft.data.dateDebut, modal: false}))
                        window.location.reload();
                    })
                }}
                autoComplete="off"
            >
                <div className="row justify-content-center">
                    <div className="col-xs">
                        <Form.Item
                            label="Date Debut :"
                            name="dateDebut"
                            rules={[{required: true}]}>
                            <DatePicker/>
                        </Form.Item>
                    </div>
                </div>
                <div className="row justify-content-center">
                    <div className="col-xs">

                        <Form.Item>
                            <Button type="primary" htmlType="submit">
                                Ajouter
                            </Button>
                        </Form.Item>
                    </div>
                </div>

            </Form>
        </Modal>
    }


    const makeSomeData = (lots) => {

        const data = Object.keys(lots).map(x => {
            let jestMin;
            let jestMax;
            let jreelMin;
            let jreelMax;
            if (lots[x].length === 0) return {key: null};


            const globalDate = lots[x].map(x => {
                return {
                    ...x,
                    jestEnd: moment(x.jestStart).clone().add(x.jest, 'days').valueOf(),
                    jreelEnd: moment(x.jreelStart).clone().add(x.jreel, 'days').valueOf()
                }
            });

            const hreel = globalDate.map(x => x.elements).reduce((p, n) => p + n);

            const hest = globalDate.map(x => x.complete).reduce((p, n) => p + n);

            jestMin = Math.min(...globalDate.map(x => x.jestStart));
            jreelMin = Math.min(...globalDate.map(x => x.jreelStart));


            jestMax = Math.max(...globalDate.map(x => x.jestEnd));
            jreelMax = Math.max(...globalDate.map(x => x.jreelEnd));


            return {key: x, jestMin, jestMax, jreelMin, jreelMax, hreel, hest}
        })
        const extra = data.filter(f => f.key !== null);

        if (extra.length === 0) return;
        const fillData = extra.map(x => {

            return {
                name: x.key,
                dayES: x.jestMin,
                dayRS: x.jreelMin,
                percent: x.hest,
                hoursReel: x.hreel,
                dayEE: moment(x.jestMax).clone().subtract(1, 'days').valueOf(),
                dayRE: moment(x.jreelMax).clone().subtract(1, 'days').valueOf(),
            }
        })

        $(".gantt").gantt({
            source: fillData,
            navigate: "scroll",
            scale: "days",
            typeFor: "global",
            date: dateRef.current.valueOf(),
            minScale: "hours",
            maxScale: "months",
            itemsPerPage: 10,
            scrollToToday: false,
            useCookie: true,
        });
    }

    const dateModal = () => {
        return <Modal footer={[]} visible={state.dateModal} onCancel={() => setState(f => ({...f, dateModal: false}))}
                      onOk={() => setState(f => ({...f, dateModal: false}))}>
            <Form
                name="some"
                initialValues={{dateDebut: moment(state.dateDebut ? state.dateDebut : moment())}}
                onFinish={async (data) => {
                    await instance.get('/api/projects/change-date/' + props.match.params.id + '?date=' + moment(data.dateDebut).add(1, 'days').format("YYYY-MM-DD") + '&lot=' + data.lot).then(ft => {
                        setState(f => ({...f, dateDebut: ft.data.dateDebut, dateModal: false}))
                        window.location.reload();
                    })
                }}
                autoComplete="off">

                <div className="row justify-content-center">
                    <div className="col-xs w-50">
                        <Form.Item
                            label="Lot :"
                            name="lot"
                            rules={[{required: true}]}>
                            <Select>
                                <Option value="Technique">Technique</Option>
                                <Option value="Structure">Structure</Option>
                                <Option value="VRD">VRD</Option>
                                <Option value="Metreur">Metreur</Option>
                            </Select>
                        </Form.Item>
                    </div>
                </div>


                <div className="row justify-content-center">
                    <div className="col-xs">
                        <Form.Item
                            label="Date Debut :"
                            name="dateDebut"
                            rules={[{required: true}]}>
                            <DatePicker/>
                        </Form.Item>
                    </div>
                </div>
                <div className="row justify-content-center">
                    <div className="col-xs">

                        <Form.Item>
                            <Button type="primary" htmlType="submit">
                                Modifier
                            </Button>
                        </Form.Item>
                    </div>
                </div>

            </Form>

        </Modal>
    }


    return (<div className="container">
        {dateModal()}
        {modals()}
        <div className="row bg-dark flex-nowrap justify-content-between">
            <div className="col-xs m-1">
                <img height={80} src={image} alt="..."/>
            </div>
            <div className="col-xs d-flex justify-content-center align-items-center">
                <h3 className="text-center m-0 text-light">PLANNING GLOBAL DU PROJET D'ETUDE</h3>
            </div>
            <div className="col-xs d-flex justify-content-center align-items-center">
                <table className=" bg-light m-1">
                    <tbody>
                    <tr>
                        <td>Code:</td>
                        <td>ETU02</td>
                    </tr>
                    <tr>
                        <td>Version:</td>
                        <td>A</td>
                    </tr>
                    <tr>
                        <td>Date:</td>
                        <td>06/09/2021</td>
                    </tr>
                    </tbody>
                </table>
            </div>
        </div>
        <br/>

        <div className="row">
            <div className="col">
                <div className="table-responsive">

                    <table className="table table-striped table-bordered">
                        <tbody>
                        <tr>
                            <th className="text-center">Projet</th>
                            <td className="text-center">{state.project?.name}</td>
                        </tr>
                        <tr>

                            <th className="text-center">Référence Projet</th>
                            <td className="text-center">{state.project?.ref}</td>
                        </tr>
                        <tr onClick={() => setState(f => ({...f, modal: true}))}>

                            <th className="text-center">Date Debut Projet</th>
                            <td id="dateDebut"
                                className="text-center">{moment(state.project?.dateDebut).format("DD/MM/YYYY")}</td>
                        </tr>
                        </tbody>
                    </table>

                </div>
            </div>
        </div>
        <div className="row mt-3">
            <div className="col">
                <table className="table text-center table-striped table-bordered">
                    <thead>
                    <tr>
                        <th>Lot</th>
                        <th>Etat d'avence</th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr>
                        <td className="align-middle">Technique</td>
                        <td className="align-middle">{state.lots.length !== 0 ? state.lots.technique.length : null}</td>
                    </tr>

                    <tr>
                        <td className="align-middle">VRD</td>
                        <td className="align-middle">{state.lots.length !== 0 ? state.lots.vrd.length : null}</td>
                    </tr>

                    <tr>
                        <td className="align-middle">Métreur</td>
                        <td className="align-middle">{state.lots.length !== 0 ? state.lots.metreur.length : null}</td>
                    </tr>

                    <tr>
                        <td className="align-middle">Structure</td>
                        <td className="align-middle">{state.lots.length !== 0 ? state.lots.structure.length : null}</td>
                    </tr>
                    </tbody>
                </table>
            </div>
        </div>

        <div className="row justify-content-center">
            <Button onClick={() => setState(f => ({...f, dateModal: true}))} type="primary">Changer la date</Button>
        </div>


        <div className="row">
            <div className="gantt"></div>
        </div>

    </div>);
}


export default withRouter(LotMain);
