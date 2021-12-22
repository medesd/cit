import React from "react";
import {Modal} from "antd";
import Button from "antd-button-color";
import EditTache from "./editTaches";

const Modals = (props) => {


    return (
        <div>
            <Modal title="Modifier une tache" visible={props.modal}
                   footer={[<Button key="cancel" type="primary" onClick={props.closeModal}>
                       Fermer
                   </Button>,]} onCancel={props.closeModal}>
                <EditTache data={props?.data}/>
            </Modal>
        </div>
    );
}

export default Modals;
