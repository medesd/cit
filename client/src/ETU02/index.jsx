import React, {useEffect, useState} from "react";
import {useLocation, withRouter} from "react-router";
import axios from "axios";
import image from "../assets/image002.png";
import moment from "moment";
import Modal from "antd/es/modal";
import Button from "antd-button-color";
import {Form} from "antd";
import DatePicker from "antd/es/date-picker";
import Add from "./tools/Add";

function useQuery() {
    return new URLSearchParams(useLocation().search);
}

function ETU02(props) {
    const [state, setState] = useState({project: null, projectModal: false});

    useEffect(() => {
        axios.create().get('/api/projects/' + props.match.params.id).then(ft => {
            setState(f => ({...f, project: ft.data}));
        });
    }, [props.match.params.id])


    const modals = () => {
        return <Modal
            footer={[<Button onClick={() => setState(f => ({...f, projectModal: false}))} key="test">Fermer</Button>]}
            title="Basic Modal" visible={state.projectModal}
            onOk={() => setState(f => ({...f, projectModal: false}))}
            onCancel={() => setState(f => ({...f, projectModal: false}))}>
            <Form
                name="basic"
                initialValues={{dateDebut: moment(state.dateDebut ? state.dateDebut : moment())}}
                onFinish={async (data) => {


                    await axios.create().post('/api/projects/set-date', {
                        date: data.dateDebut,
                        pid: props.match.params.id
                    }).then(ft => {


                        setState(f => ({
                            ...f,
                            projectModal: false,
                            project: {...f.project, dateDebut: ft.data.dateDebut}
                        }));
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


    const query = atob(useQuery().get("lot"));
    if (!["Technique", "Structure", "VRD", "Metreur"].includes(query)) return null;

    return (
        <div id="printer" className="container">
            {modals()}
            <div className="row bg-dark flex-nowrap align-items-center justify-content-between">
                <div className="col-xs m-1">
                    <img height={80} src={image} alt="..."/>
                </div>
                <div className="col-xs d-flex justify-content-center align-items-center">
                    <h3 className="text-center m-0 text-light">PLANNING DETAILLE DU PROJET D'ETUDE ({query})</h3>
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
                            <tr onClick={() => {
                                setState(f => ({...f, projectModal: false}));
                            }}>

                                <th className="text-center">Date Début Projet</th>
                                <td id="dateDebut"
                                    className="text-center">{moment(state.project?.dateDebut).format("DD/MM/YYYY")}</td>
                            </tr>
                            </tbody>
                        </table>

                    </div>
                </div>
            </div>
            <hr/>
            <Add project={state.project} lot={query} id={props.match.params.id}/>

        </div>);
}

export default withRouter(ETU02);

