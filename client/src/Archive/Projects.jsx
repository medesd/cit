import React, {useEffect, useState} from 'react';
import axios from "axios";
import {bindActionCreators} from "redux";
import {connect} from "react-redux";
import * as types from "../redux/actions/actions";
import {withRouter} from "react-router";
import Button from "antd-button-color";
import Search from "antd/es/input/Search";
import moment from "moment";
import {message, Popconfirm} from "antd";
import {RollbackOutlined} from "@ant-design/icons";

const Projects = (props) => {

    const [state, setState] = useState({
        projects: [],
        employees: [],
    });


    useEffect(() => {


        axios.create().get('/api/employees/names').then(r =>
            r.data === '' || setState(f => ({...f, employees: r.data}))
        )
        axios.create().get('/api/projects/archived?main=true&filter=').then(r => {
            console.log(r);
            if (r.data !== "")
                setState(f => ({...f, projects: r.data}))
        });
        props.actions.setHeaderTitle("Les projets archivée");
        return () => {
            props.actions.setHeaderTitle("");
        }


    }, [props.actions])

    const projectGet = async (search = null) => {
        return await axios.create().get('/api/projects/archived?main=true&filter=' + search);
    }

    const onSearch = (e) => {
        projectGet(e.target.value.trim()).then(r => {
            setState(f => ({...f, projects: r.data}))
        });
    }

    const confirm = (e, id) => {
        axios.create().get('/api/projects/archived/' + id).then(ft => {
            const res = state.projects.filter(k => k.id !== ft.data);
            setState(f => ({...f, projects: res}));
        })
        message.success('Restauré').then(null);
    }


    return (
        <div className="container-fluid px-5">
            <div className="row m-2 justify-content-between">
                <div className="col-xs"/>

                <div className="col-xs">
                    <Search placeholder="Rechercher" onInput={onSearch} style={{width: 200}}/>
                </div>
            </div>
            <div className="row justify-content-center">
                <div className="table-responsive">
                    <table className="w-100 text-center table-striped table-bordered">
                        <thead>
                        <tr>
                            <th style={{backgroundColor: "black"}} className="text-light">Référence</th>
                            <th className="text-light bg-black">Projet</th>
                            <th className="text-light bg-black">Maitre d'ouvrage</th>
                            <th className="text-light bg-black">Architecte</th>
                            <th className="text-light bg-black">Date Notification</th>
                            <th className="text-light bg-black">Etat</th>
                            <th className="text-light bg-black">Responsable Projet</th>
                            <th className="text-light bg-black">Action</th>
                        </tr>
                        </thead>
                        <tbody>
                        {
                            state.projects?.map((f, i) => {

                                return <tr key={i}>
                                    <td className="text-light bg-black">{f.ref}</td>
                                    <td className="text-left pl-2 text-lowercase font-weight-bold"><span
                                        className="text-capitalize">{f.name[0]}</span>{f.name.substring(1, f.name.length)}
                                    </td>
                                    <td className="text-left text-uppercase">{f.maitreDouvrage}</td>
                                    <td>{f.architecte}</td>
                                    <td>{moment(f.dateNotif).format("DD/MM/YYYY")}</td>
                                    <td className="text-capitalize">{f.autre ? f.autre : f.etat}</td>
                                    <td>
                                        <table className="w-100 text-left">
                                            <tbody>
                                            {
                                                f.piloteTechnique ? <tr>
                                                    <td>TEC</td>
                                                    <td>{f.piloteTechnique}</td>
                                                </tr> : null
                                            }

                                            {

                                                f.piloteVRD ? <tr>
                                                    <td>VRD</td>
                                                    <td>{f.piloteVRD}</td>
                                                </tr> : null
                                            }
                                            {
                                                f.piloteStructure ? <tr>
                                                    <td>STR</td>
                                                    <td>{f.piloteStructure}</td>
                                                </tr> : null
                                            }
                                            {
                                                f.piloteMetreur ? <tr>
                                                    <td>Metreur</td>
                                                    <td>{f.piloteMetreur}</td>
                                                </tr> : null
                                            }


                                            </tbody>
                                        </table>
                                    </td>
                                    <td>
                                        <Popconfirm
                                            title="Êtes-vous sûr de restaurer ce projet?"
                                            onConfirm={e => confirm(e, f.id)}
                                            okText="Oui"
                                            cancelText="Non"
                                        >
                                            <Button shape="circle" icon={<RollbackOutlined/>} type="danger"/>
                                        </Popconfirm>
                                    </td>
                                </tr>
                            })
                        }
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

const dtp = (dsp) => ({actions: bindActionCreators(types, dsp)})

export default connect(null, dtp)(withRouter(Projects));