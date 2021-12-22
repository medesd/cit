import React, {useEffect, useState} from "react";
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import * as types from "../../redux/actions/actions";
import image from './image002.png';
import Modal from "antd/es/modal";
import DatePicker from "antd/es/date-picker";
import Button from "antd-button-color";
import {Form} from "antd";
import moment from "moment";
import axios from "axios";
import {useLocation, withRouter} from "react-router";

function useQuery() {
    return new URLSearchParams(useLocation().search);
}

const Header = (props) => {
    const lot = useQuery().get('lot');
    const [state, setState] = useState({
        name: null,
    });
    const [project, setProject] = useState(false);

    const instance = axios.create();

    useEffect(() => {
        axios.create().get('/api/projects/' + props.match.params.id).then(f => {
            props.actions.addProject(f.data);
            setState(f.data);

            props.actions.addProject(state);
        });
    }, [state, props.actions, props.match.params.id])

    const modals = () => {
        return <Modal footer={[<Button onClick={() => setProject(false)} key="test">Fermer</Button>]}
                      title="Basic Modal" visible={project} onOk={() => setProject(false)}
                      onCancel={() => setProject(false)}>
            <Form
                name="basic"
                initialValues={{dateDebut: moment(state.dateDebut ? state.dateDebut : moment())}}
                onFinish={async (data) => {

                    await instance.get('/api/projects/set-date?Pid=' + props.match.params.id + '&date=' + data.dateDebut.add(1, 'days').format("YYYY-MM-DD")).then(ft => {
                        setState(f => ({...f, dateDebut: ft.data.dateDebut}))
                        setProject(false);
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


    return (<div className="container">
        {modals()}
        <div className="row bg-dark flex-nowrap align-items-center justify-content-between">
            <div className="col-xs m-1">
                <img height={80} src={image} alt="..."/>
            </div>
            <div className="col-xs d-flex justify-content-center align-items-center">
                <h3 className="text-center m-0 text-light">PLANNING DETAILLE DU PROJET D'ETUDE ({atob(lot)})</h3>
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
                            <td className="text-center">{state.name}</td>
                        </tr>
                        <tr>

                            <th className="text-center">Référence Projet</th>
                            <td className="text-center">{state.ref}</td>
                        </tr>
                        <tr onClick={() => {
                            setProject(true);
                        }}>

                            <th className="text-center">Date Début Projet</th>
                            <td id="dateDebut"
                                className="text-center">{moment(state.dateDebut).format("DD/MM/YYYY")}</td>
                        </tr>
                        </tbody>
                    </table>

                </div>
            </div>
        </div>
    </div>);
}


const dispatchToProps = (dispatch) => {
    return {
        actions: bindActionCreators(types, dispatch)
    };
}

const stateToProps = (state) => {
    return {
        state: state.projectReducer
    };
}


export default connect(stateToProps, dispatchToProps)(withRouter(Header));
