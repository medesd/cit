import React, {useEffect} from 'react';
import Button from "antd-button-color";
import {saveAs} from "file-saver";
import rh02 from '../assets/RH02.xlsx';
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import * as types from "../redux/actions/actions";

const RH02 = (props) => {

    useEffect(() => {

        props.actions.setHeaderTitle("Fiche d'évaluation de la formation");
        return () => {
            props.actions.setHeaderTitle("");
        }

    }, [props.actions]);


    return (
        <div className="container-fluid">
            <div className="row mt-5">
                <div className="col">
                    <h5 className={"text-center"}>Telecharger le fichier</h5>
                </div>
            </div>
            <div className="row mt-3 justify-content-center">
                <div className="col-xs">
                    <Button type={"success"} onClick={() => saveAs(rh02, 'Fiche d\'évaluation de la formation.xlsx')}
                            children={"Télécharger"}/>
                </div>
            </div>
        </div>
    );
};

const dtp = (dsp) => ({actions: bindActionCreators(types, dsp)})


export default connect(null, dtp)(RH02);
