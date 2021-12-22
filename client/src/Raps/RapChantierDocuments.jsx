import React, {useEffect, useState} from "react";
import Docxtemplater from "docxtemplater";
import PizZip from "pizzip";
import PizZipUtils from "pizzip/utils/index.js";
import {saveAs} from "file-saver";
import ps04 from "../assets/PS04.docx";
import axios from "axios";
import {Form, Input, Select} from "antd";
import Button from "antd-button-color";
import {bindActionCreators} from "redux";
import * as types from "../redux/actions/actions";
import {connect} from "react-redux";

function loadFile(url, callback) {
    PizZipUtils.getBinaryContent(url, callback);
}

const RapChantierDocuments = (props) => {
    const [form] = Form.useForm();
    const [state, setState] = useState({projects: [], ref: null, form: null, currentProject: null});

    useEffect(() => {
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

                // render the document (replace all occurences of {first_name} by John, {last_name} by Doe, ...)
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
            <div className="row mt-5 d-flex justify-content-center">
                <div className="col-8">
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
                        labelCol={{span: 4}}
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
                        <Form.Item wrapperCol={{offset: 12}}>
                            <Button type={"success"} htmlType={"submit"}>Generate</Button>
                        </Form.Item>
                    </Form>
                </div>
            </div>
        </div>
    );
};
const dtp = (dsp) => ({actions: bindActionCreators(types, dsp)})

export default connect(null, dtp)(RapChantierDocuments);
