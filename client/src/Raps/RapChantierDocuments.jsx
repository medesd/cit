import React, {useEffect, useState} from "react";
import Docxtemplater from "docxtemplater";
import PizZip from "pizzip";
import PizZipUtils from "pizzip/utils/index.js";
import {saveAs} from "file-saver";
import ps04 from "../assets/PS04.docx";
import axios from "axios";
import {Form, Input, Modal, Select} from "antd";
import Button from "antd-button-color";
import {bindActionCreators} from "redux";
import * as types from "../redux/actions/actions";
import {connect} from "react-redux";
import {DownloadOutlined} from "@ant-design/icons";

function loadFile(url, callback) {
    PizZipUtils.getBinaryContent(url, callback);
}

const RapChantierDocuments = (props) => {
    const [form] = Form.useForm();
    const [state, setState] = useState({
        raps: [],
        projects: [],
        modalAdd: false,
        ref: null,
        form: null,
        currentProject: null
    });


    const modalAdd = <Modal footer={null} onCancel={() => setState(f => ({...f, modalAdd: false}))}
                            onOk={() => setState(f => ({...f, modalAdd: false}))} title={"Ajouter"}
                            visible={state.modalAdd}>
        <Form
            form={form}
            labelAlign={"left"}
            onFinish={values => {
                const keys = Object.keys(values)
                keys.forEach(x => {
                    if (values[x] === undefined) values[x] = "";
                })


                setState(f => ({...f, form: values}));
                axios.create().post("/api/rap-chantier-documents", {
                    ref: values.rapRef,
                    data: JSON.stringify(values)
                }).then(() => {
                    form.resetFields();
                })
                generateDocument(values);
            }}
            labelCol={{span: 6}}
        >
            <Form.Item name={"ref"} label={"Réf"}>
                <Select onChange={(_, e) => {
                    if (!e.key) {
                        form.resetFields();
                        return;
                    }
                    axios.create().get("/api/rap-chantier-documents/generate").then(x => {
                        axios.create().get("/api/projects/" + e.key).then(ft => {
                            setState(f => ({...f, ref: x.data}))
                            form.setFieldsValue({...ft.data, rapRef: x.data, project: ft.data.name});
                        })
                    })
                }} showSearch>
                    <Select.Option value={null} children={null}/>
                    {
                        state.projects?.map(x => {
                            return <Select.Option key={x.id} value={x.ref} children={x.ref}/>
                        })
                    }
                </Select>
            </Form.Item>
            <Form.Item name={"project"} label={"Projet"}>
                <Input/>
            </Form.Item>
            <Form.Item name={"maitreDouvrage"} label={"Maitre d'ouvrage"}>
                <Input/>
            </Form.Item>
            <Form.Item name={"architecte"} label={"Architecte"}>
                <Input/>
            </Form.Item>
            <Form.Item name={"rapRef"} label={"N° dossier"}>
                <Input/>
            </Form.Item>
            <Form.Item className="text-center">
                <Button type={"success"} htmlType={"submit"}>Generate</Button>
            </Form.Item>
        </Form>
    </Modal>

    useEffect(() => {
        axios.create().get('/api/rap-chantier-documents').then(ft => {
            setState(f => ({...f, raps: ft.data}))
        })
        axios.create().get("/api/rap-chantier-documents/generate").then(x => {
            setState(f => ({...f, ref: x.data}))
            axios.create().get("/api/projects/names").then(x => {
                setState(f => ({...f, projects: x.data}));
            })
        })

        props.actions.setHeaderTitle("Rapport (de visite chantier, d'examen des documents)");
        return () => {
            props.actions.setHeaderTitle("");
        }
    }, [props.actions])


    const generateDocument = (data) => {
        loadFile(
            ps04,
            function (error, content) {
                if (error) {
                    throw error;
                }
                const zip = new PizZip(content);
                const doc = new Docxtemplater(zip, {
                    paragraphLoop: true,
                    linebreaks: true,
                });

                doc.render(data);
                const out = doc.getZip().generate({
                    type: "blob",
                    mimeType:
                        "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
                });

                saveAs(out, `${data?.project}.docx`);
            }
        );
    };

    return (
        <div className={"container"}>
            {modalAdd}
            <div className="row mt-5 d-flex justify-content-around">
                <div className="col-xs">
                    <Button onClick={() => setState(f => ({...f, modalAdd: true}))} type="success"
                            children={"Ajouter"}/>
                </div>
                <div className="col-xs">
                    <Input.Search/>
                </div>
            </div>
            <div className="row mt-3">
                <div className="col">
                    <table className="text-center table-hover table table-bordered table-striped table-align-middle">
                        <thead>
                        <tr>
                            <th>N°dossier</th>
                            <th>Référence</th>
                            <th>Projet</th>
                            <th>Maitre d'ouvrage</th>
                            <th>Architecte</th>
                            <th>Action</th>
                        </tr>
                        </thead>
                        <tbody>
                        {
                            state.raps?.map(x => <tr key={x.id}>
                                <td>{x.data.rapRef}</td>
                                <td>{x.data.ref}</td>
                                <td>{x.data.project}</td>
                                <td>{x.data.maitreDouvrage}</td>
                                <td>{x.data.architecte}</td>
                                <td className="d-flex justify-content-around">
                                    <Button type={"success"} shape={"circle"} onClick={() => generateDocument(x.data)}
                                            icon={<DownloadOutlined/>}/>
                                </td>
                            </tr>)
                        }
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};
const dtp = (dsp) => ({actions: bindActionCreators(types, dsp)})

export default connect(null, dtp)(RapChantierDocuments);
