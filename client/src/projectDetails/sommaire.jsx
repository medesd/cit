import React, {useState} from 'react';
import axios from "axios";
import moment from "moment";
import {DatePicker} from 'antd';
import image from '../assets/image002.png'

const {RangePicker} = DatePicker;

const Sommaire = () => {
    const instance = axios.create();
    const [state, setState] = useState({
        num: '',
        elements: [],
        chantier: [],
    });

    const getAllElement = async (dd, df) => {
        return instance.get('/api/projects/sommaire-projects?df=' + df + '&dd=' + dd)
    }

    const getAllChantier = async (dd, df) => {
        return instance.get('/api/projects/sommaire-chantiers?df=' + df + '&dd=' + dd)
    }

    return (
        <div className="container">
            <div className="row mt-4 justify-content-between">
                <div className="border col-xs">
                    <img height={80} src={image} alt=""/>
                </div>
                <div className="border col d-flex align-items-center justify-content-center">
                    <h4 className="font-weight-bold text-center">Récapitulatif général</h4>
                </div>
                <div className="border col-xs d-flex align-items-center justify-content-center">
                    <h4 className="mx-2 font-weight-bold text-center">DRAFT</h4>
                </div>
            </div>
            <div className="row ml-5 mr-5 mt-3 mb-3 justify-content-between">
                <div className="col d-flex">
                    <RangePicker onChange={(f) => {
                        if (f === null) return;
                        moment().valueOf()


                        f = f.map(d => d.valueOf());

                        getAllElement(moment(f[0]).subtract(1, 'days').valueOf(), f[1]).then(ft => {
                            setState(s => ({...s, elements: ft.data}))
                        })

                        getAllChantier(moment(f[0]).subtract(1, 'days').valueOf(), f[1]).then(ft => {
                            setState(s => ({...s, chantier: ft.data}));
                        })


                    }} format="DD/MM/YYYY"/>
                </div>
                <div className="col d-flex justify-content-end">
                    N° : V1
                </div>
            </div>
            <hr className="border"/>
            {
                state.chantier.length !== 0 && state.elements.length!==0 ? <>
                    <div className="row">
                        <div className="table-responsive">
                            <table className="w-100 text-center table-bordered table-striped">
                                <tbody>
                                <tr>
                                    <td colSpan={state.chantier[0]?.length}><h3>Projets</h3></td>
                                </tr>
                                {
                                    state.elements?.map((p, i) => {
                                        return (<tr key={i}>
                                            {
                                                p.map((e, j) => {
                                                    return <td key={j}>{e}</td>
                                                })
                                            }
                                        </tr>)
                                    })
                                }
                                <tr>
                                    <td style={{borderTop:"2px solid #000"}} colSpan={state.chantier[0]?.length}><h3>Visite Chantier</h3></td>
                                </tr>

                                {
                                    state.chantier?.map((p, i) => {
                                        return (<tr key={i}>
                                            {
                                                p.map((e, j) => {
                                                    return <td key={j}>{e}</td>
                                                })
                                            }
                                        </tr>)
                                    })
                                }

                                </tbody>
                            </table>


                        </div>
                    </div>
                </> : null
            }

        </div>
    );


};


export default Sommaire;
