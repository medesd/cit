import React, {useState} from 'react';
import Button from "antd-button-color";
import {Modal} from "antd";
import AddTache from "./addTaches";

const LocalModel = () => {
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    return (
        <>
            <div className="row justify-content-center">
                <div className="col-xs mt-2">
                    <Button type="primary" onClick={handleShow}>
                        Ajouter une tache
                    </Button>
                </div>
            </div>

            <Modal footer={[<Button onClick={handleClose} type={"primary"} key={1}>Fermer</Button>]} title={"Ajouter une Tache"} visible={show} onOk={handleClose} onCancel={handleClose}>
                <AddTache/>
            </Modal>
        </>
    );
};


export default LocalModel;
