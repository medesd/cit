import React, {useEffect, useState} from "react";
import Button from "antd-button-color";
import Search from "antd/es/input/Search";
import {DeleteOutlined, DownloadOutlined, EyeOutlined, InboxOutlined} from "@ant-design/icons";
import {Drawer, Form, message, Popconfirm, Select, Upload} from "antd";
import TextArea from "antd/es/input/TextArea";
import axios from "axios";
import {withRouter} from "react-router";
import moment from "moment";


const {Option, OptGroup} = Select;


const obj = {
    etude: [{
        name: "Ordre de service démarrage D’étude",
        code: "ETU03",
        version: "A",
        dateVersion: "06/09/2021",
    }, {
        name: "Demande d’étude supplémentaire",
        code: "ETU04",
        version: "A",
        dateVersion: "06/09/2021",
    }, {
        name: "Fiche d’intervention",
        code: "ETU05",
        version: "A",
        dateVersion: "06/09/2021",
    }, {
        name: "Rapport d’avancement des études",
        code: "ETU06",
        version: "A",
        dateVersion: "06/09/2021",
    }],
    suivi: [{
        name: "Rapport (de visite de chantier, d’examen des documents)",
        code: "SUI01",
        version: "A",
        dateVersion: "06/09/2021",
    }, {
        name: "Rapport d’avancement de suivi",
        code: "SUI02",
        version: "A",
        dateVersion: "06/09/2021",
    }, {
        name: "OS démarrage de suivi",
        code: "SUI03",
        version: "A",
        dateVersion: "06/09/2021",
    }, {
        name: "Tableau récapitulatif des documents",
        code: "SUI04",
        version: "A",
        dateVersion: "06/09/2021",
    }, {
        name: "Planning général des projets d’étude",
        code: "SUI05",
        version: "A",
        dateVersion: "06/09/2021",
    }],
    achat: [{
        name: "Demande d’achat",
        code: "ACH01",
        version: "A",
        dateVersion: "06/09/2021",
    }, {
        name: "Bon de commande",
        code: "ACH02",
        version: "A",
        dateVersion: "06/09/2021",
    }, {
        name: "Etat de suivi des prestataires",
        code: "ACH03",
        version: "A",
        dateVersion: "06/09/2021",
    }, {
        name: "Liste des prestataires et des prestataires évalues",
        code: "ACH04",
        version: "A",
        dateVersion: "06/09/2021",
    }, {
        name: "Tableau comparatif des prestataires",
        code: "ACH05",
        version: "A",
        dateVersion: "06/09/2021",
    }],
    facturation: [{
        name: "Facture",
        code: "FAC01",
        version: "A",
        dateVersion: "06/09/2021",
    }, {
        name: "Etat de suivi des paiements et rapprochement",
        code: "FAC02",
        version: "A",
        dateVersion: "06/09/2021",
    }, {
        name: "Note d’honoraire",
        code: "FAC03",
        version: "A",
        dateVersion: "06/09/2021",
    }],
    ressourcesHumains: [{
        name: "Attestations",
        code: "RH01",
        version: "A",
        dateVersion: "06/09/2021",
    }, {
        name: "Fiche d’évaluation des formations",
        code: "RH02",
        version: "A",
        dateVersion: "06/09/2021",
    }, {
        name: "Feuille de présence",
        code: "RH03",
        version: "A",
        dateVersion: "06/09/2021",
    }, {
        name: "Fiche d’entretien intégration et évaluation",
        code: "RH04",
        version: "A",
        dateVersion: "06/09/2021",
    }, {
        name: "Note d’information",
        code: "RH05",
        version: "A",
        dateVersion: "06/09/2021",
    }, {
        name: "Planning des congés",
        code: "RH06",
        version: "A",
        dateVersion: "06/09/2021",
    }, {
        name: "Planning et suivi des formations",
        code: "RH07",
        version: "A",
        dateVersion: "06/09/2021",
    }, {
        name: "Demande de formation",
        code: "RH08",
        version: "A",
        dateVersion: "06/09/2021",
    }, {
        name: "Demande de recrutement",
        code: "RH09",
        version: "A",
        dateVersion: "06/09/2021",
    }],
    infrastructure: [{
        name: "Rapport d’intervention et évaluation de maintenance",
        code: "INF01",
        version: "A",
        dateVersion: "06/09/2021",
    }, {
        name: "Liste du matériel",
        code: "INF02",
        version: "A",
        dateVersion: "06/09/2021",
    }],
    commercial: [{
        name: "Devis",
        code: "COM01",
        version: "A",
        dateVersion: "06/09/2021",
    }, {
        name: "Contrat/Convention",
        code: "COM02",
        version: "A",
        dateVersion: "06/09/2021",
    }, {
        name: "Questionnaire satisfaction client",
        code: "COM03",
        version: "A",
        dateVersion: "06/09/2021",
    }],
    gmq: [{
        name: "Fiche de non-conformité",
        code: "GMQ01",
        version: "A",
        dateVersion: "06/09/2021",
    }, {
        name: "Bordereau de diffusion",
        code: "GMQ02",
        version: "A",
        dateVersion: "06/09/2021",
    }, {
        name: "Fiche indicateur",
        code: "GMQ03",
        version: "A",
        dateVersion: "06/09/2021",
    }, {
        name: "Etat de planification des audits qualité 2021",
        code: "GMQ04",
        version: "A",
        dateVersion: "06/09/2021",
    }, {
        name: "Plan d’audit qualité interne N°1",
        code: "GMQ05",
        version: "A",
        dateVersion: "06/09/2021",
    }, {
        name: "Rapport d’audit interne",
        code: "GMQ06",
        version: "A",
        dateVersion: "06/09/2021",
    }, {
        name: "Etat des actions d'amélioration/ 2021",
        code: "GMQ07",
        version: "A",
        dateVersion: "06/09/2021",
    }, {
        name: "Revue de direction",
        code: "GMQ08",
        version: "A",
        dateVersion: "06/09/2021",
    }, {
        name: "PV-CIT-REUNION",
        code: "GMQ09",
        version: "A",
        dateVersion: "06/09/2021",
    }]
}

const fileViewer = ["application/pdf", "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet", "application/vnd.ms-excel", "application/msword", "application/vnd.openxmlformats-officedocument.wordprocessingml.document"];

const Files = (props) => {
    const instance = axios.create();
    const [state, setState] = useState({
        fileList: [],
        drawer: false,
        data: [],
        fileType: null,
        drawerView: false,
        current: null,
        url: null
    }, [])


    useEffect(() => {
        const fetchData = async () => {
            await axios.create().get("/files/data-by-project/" + props.match.params.id).then(ft => {
                setState(x => ({...x, data: ft.data}));
            })
        }
        fetchData().then(null);
    }, [props.match.params.id])

    const {fileList} = state;
    const uploadProps = {
        onRemove: file => {
            setState(state => {
                const index = state.fileList.indexOf(file);
                const newFileList = state.fileList.slice();
                newFileList.splice(index, 1);
                return {
                    ...state,
                    fileList: newFileList,
                };
            });
        },
        beforeUpload: file => {
            setState(state => ({
                ...state,
                fileList: [...state.fileList, file],
            }));
            return false;
        },
        fileList,
    };

    const normFile = (e) => {

        if (Array.isArray(e)) {
            return e;
        }
        return e && e.fileList;
    };

    function formatBytes(bytes, decimals = 2) {
        if (bytes === 0) return '0 Bytes';

        const k = 1024;
        const dm = decimals < 0 ? 0 : decimals;
        const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];

        const i = Math.floor(Math.log(bytes) / Math.log(k));

        return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
    }

    const renderData = async (x) => {
        await axios({
            url: 'http://localhost:8080/files/downloadFile/' + x.id,
            headers: {Authorization: localStorage.getItem("type") + " " + localStorage.getItem("token")},
            method: 'GET',
        }).then(async (response) => {
            setState(f => ({...f, url: response.data}))

        });

    }


    return <>
        <Drawer title={state.fileType?.name} placement="right" width={'50%'}
                onClose={() => setState(x => ({...x, drawer: false}))} visible={state.drawer}>
            <Form
                name="basic"
                labelAlign={"left"}
                labelCol={{span: 8}}
                wrapperCol={{span: 16}}
                initialValues={{remember: true}}
                onFinish={(value) => {
                    let formData = new FormData();
                    formData.append('data', JSON.stringify({
                        comment: value.comment,
                        type: state.fileType.name,
                        project: {id: props.match.params.id}
                    }))

                    formData.append('file', value.fichier[0].originFileObj, value.fichier[0].name);

                    instance.post('/files/uploadFile', formData, {
                        headers: {
                            "Content-Type": "multipart/form-data",
                        }
                    }).then(ft => {
                        setState(x => ({...x, drawer: false, data: [...x.data, ft.data]}))
                    })
                }}
            >

                <Form.Item
                    label="fichier"
                    name="fichier"
                    valuePropName="fileList"
                    getValueFromEvent={normFile}
                    rules={[{required: true}]}
                >
                    <Upload.Dragger {...uploadProps} multiple={false} name="files">
                        <p className="ant-upload-drag-icon">
                            <InboxOutlined/>
                        </p>
                        <p className="ant-upload-text">
                            Cliquez sur ou glisser un fichier</p>
                    </Upload.Dragger>
                </Form.Item>

                <Form.Item
                    label="Commantaire"
                    name="comment"
                >
                    <TextArea rows={5}/>
                </Form.Item>

                <Form.Item wrapperCol={{offset: 8, span: 16}}>
                    <Button className="m-1" type="success" htmlType="submit">
                        Enrigistrer
                    </Button>
                    <Button className="m-1" type="danger" onClick={() => {
                        setState(x => ({...x, drawer: false}))
                    }} htmlType="button">
                        Fermer
                    </Button>
                </Form.Item>
            </Form>

        </Drawer>

        <Drawer visible={state.drawerView} title={state.current?.type} placement={"bottom"} height={'100%'}
                onClose={() => setState(x => ({...x, drawerView: false}))}>
            {
                state.current ? <>
                    <div className="row h-100 align-items-center justify-content-center">
                        <div className="col-4">
                            <table className="table text-center table-bordered table-striped">
                                <tbody>
                                <tr>
                                    <th>Name</th>
                                    <td>{state.current.fileName}</td>
                                </tr>
                                <tr>
                                    <th>Taille</th>
                                    <td>{formatBytes(state.current.size)}</td>
                                </tr>
                                <tr>
                                    <th>Date</th>
                                    <td>{moment(state.current.entryDate).format("hh:mm - DD/MM/YYYY")}</td>
                                </tr>
                                </tbody>
                            </table>
                        </div>
                        <div className="col-8 h-100">
                            <iframe title={state.current?.fileName}
                                    width={"100%"}
                                    height={"100%"}
                                    src={state.url}/>
                        </div>
                    </div>

                </> : null
            }

        </Drawer>
        <div className="container">
            <div className="row mt-3">
                <div className="col"><h3 className="text-center">Fichiers</h3></div>
            </div>
            <div className="row justify-content-between">
                <div className="col">
                    <Select onChange={r => setState(f => ({
                        ...f, fileType: Object
                            .keys(obj)
                            .map(x => obj[x])
                            .flat()
                            .filter(x => x.code === r)[0]
                    }))} className="w-50">
                        {Object.keys(obj).map((x, i) => {
                            return <OptGroup key={i} label={x}>
                                {
                                    obj[x].map(f => {
                                        return <Option key={f.code} value={f.code}>{f.name}</Option>
                                    })
                                }
                            </OptGroup>
                        })}
                    </Select>
                    <Button type="info" disabled={!state.fileType} onClick={() => {
                        setState(x => ({...x, drawer: true}))
                    }} className="mx-1">Ajouter un fichier</Button>
                </div>
                <div className="col-xs">
                    <Search placeholder="Recherche" allowClear onSearch={async (value) => {
                        await instance.get("/files/data-by-project/" + props.match.params.id + "?filter=" + value).then(ft => {
                            setState(x => ({...x, data: ft.data}));
                        })
                    }}/>
                </div>
            </div>
            <div className="row mt-2">
                <table className="table text-center table-striped table-bordered">
                    <thead>
                    <tr>
                        <td>Nom</td>
                        <td>Type</td>
                        <td>Commantaire</td>
                        <td>Action</td>
                    </tr>
                    </thead>
                    <tbody>
                    {state.data.map(x => {
                        return <tr key={x.id}>
                            <td>{x.fileName}</td>
                            <td>{x.type}</td>
                            <td>{x.comment}</td>
                            <td>
                                <Button className={"mx-1"} onClick={() => {
                                    axios({
                                        url: 'http://localhost:8080/files/getFile/' + x.id,
                                        headers: {Authorization: localStorage.getItem("type") + " " + localStorage.getItem("token")},
                                        method: 'GET',
                                        responseType: 'blob',
                                    }).then((response) => {
                                        const url = window.URL.createObjectURL(new Blob([response.data]));
                                        const link = document.createElement('a');
                                        link.href = url;
                                        link.setAttribute('download', x.fileName); //or any other extension
                                        document.body.appendChild(link);


                                        link.click();
                                    });


                                }} shape="circle" icon={<DownloadOutlined/>} type="success"/>
                                {
                                    fileViewer.includes(x.fileType) ?
                                        <Button className={"mx-1"} shape={"circle"} type={"info"}
                                                onClick={async () => {
                                                    setState(f => ({
                                                        ...f,
                                                        drawerView: true,
                                                        current: x
                                                    }))
                                                    await renderData(x);
                                                }}
                                                icon={<EyeOutlined/>}/> : null
                                }


                                <Popconfirm
                                    title="Êtes-vous sûr de supprimer cette tâche?"
                                    onConfirm={async () => {
                                        await instance.delete("/files/delete-data/" + x.id).then(ft => {
                                            setState(s => ({...s, data: [...s.data.filter(f => f.id !== ft.data)]}));
                                            message.success('supprimé');
                                        })
                                    }}
                                    okText="Yes"
                                    cancelText="No"
                                >
                                    <Button shape="circle" icon={<DeleteOutlined/>} type="danger"/>
                                </Popconfirm>
                            </td>
                        </tr>
                    })}

                    </tbody>
                </table>
            </div>
        </div>
    </>
}

export default withRouter(Files);
