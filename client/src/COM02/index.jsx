import React, {useEffect, useState} from "react";
import {Form, Input, Select} from "antd";
import axios from "axios";
import {GenerateDocument} from "../tools";
import com02 from "../assets/COM02.docx";
import Button from "antd-button-color";
import {bindActionCreators} from "redux";
import * as types from "../redux/actions/actions";
import {connect} from "react-redux";


const COM02 = (props) => {
    const [form] = Form.useForm();
    const [state, setState] = useState({project: null, projects: []});


    useEffect(() => {
        axios.create().get("/api/projects/names").then(ft => setState(f => ({...f, projects: ft.data})));
        props.actions.setHeaderTitle("Convention des etudes technique et suivi des travaux");
        return () => {
            props.actions.setHeaderTitle("");
        }
    }, [props.actions]);


    return <div className={"container"}>
        <div className="row mt-4 justify-content-center">
            <div className="col-8">
                <Form form={form} onFinish={values => {
                    GenerateDocument(values, com02, values.projectRef + "_CETST");
                    axios.post("/api/com02", {
                        data: JSON.stringify(values),
                        projectRef: state.project.ref
                    }).then(() => null);
                }} labelAlign={"left"} labelCol={{span: 6}}>
                    <Form.Item name={"projectRef"} label={"ref"}>
                        <Select onChange={(_, e) => {
                            if (!e.key) return;
                            axios.create().get("/api/projects/" + e.key).then(x => {
                                form.setFieldsValue({...x.data, object: x.data.name});
                                setState(f => ({...f, project: x.data}));
                            })
                        }} showSearch>
                            <Select.Option value={null} children={null}/>
                            {state.projects?.map(x => <Select.Option key={x.id} value={x.ref} children={x.ref}/>)}
                        </Select>
                    </Form.Item>

                    <Form.Item name={"object"} label={"Object"}>
                        <Input/>
                    </Form.Item>

                    <Form.Item name={"maitreDouvrage"} label={"Maitre D'ouvrage"}>
                        <Input/>
                    </Form.Item>

                    <Form.Item name={"situation"} label={"Situation"}>
                        <Input/>
                    </Form.Item>
                    <Form.Item name={"tf"} label={"T.F"}>
                        <Input/>
                    </Form.Item>


                    <Form.Item>
                        <Button htmlType={"submit"} type={"success"} children={"Generate"}/>
                    </Form.Item>


                </Form>
            </div>
        </div>
    </div>
}


const dtp = (dsp) => ({actions: bindActionCreators(types, dsp)})

export default connect(null, dtp)(COM02);
