import React, {useEffect, useState} from "react";
import {Form, Input, InputNumber, Select} from "antd";
import Button from "antd-button-color";
import axios from "axios";
import {ArrowLeftOutlined, MinusOutlined, PlusOutlined} from "@ant-design/icons";
import Logo from '../logo.jpg';
import html2canvas from "html2canvas";
import {jsPDF} from "jspdf";
import {CutDonnes, SplitNumber} from "../tools";
import {bindActionCreators} from "redux";
import * as types from "../redux/actions/actions";
import {connect} from "react-redux";

const {Option} = Select;


const Facture = (props) => {
    const [form] = Form.useForm();
    const [state, setState] = useState({
        form: {},
        employees: [],
        ttc: 0,
        tva: 0,
        prixTTC: 0,
        submittedData: false,
        projects: [],
        donnesPerElement: []
    });
    useEffect(() => {
        form.setFieldsValue({donnes: [{}]});
    }, [form])

    useEffect(() => {

        axios.create().get('/api/projects').then(ft => {
            setState(x => ({...x, projects: ft.data}));
        })
        axios.create().get('/api/employees/names').then(x => {
            setState(f => ({...f, employees: x.data}))
        })
        props.actions.setHeaderTitle("Facture");
        return () => {
            props.actions.setHeaderTitle("");
        }
    }, [props.actions]);


    const makeEdition = () => {
        form.setFieldsValue({
            ...form.getFieldsValue(),
            donnes: form.getFieldValue('donnes').map(f => {
                switch (f?.unite) {
                    case "%":
                        if (f?.quality > 100) f.quality = 100;
                        if (f?.quality < 1) f.quality = 1;
                        return {
                            ...f,
                            montant: ((parseFloat(f?.prix || "0") * (f['quality'] / 100)) || 0).toFixed(2)
                        }
                    case "F":
                        return {
                            ...f,
                            montant: ((parseFloat(f?.prix || "0") * f['quality']) || 0).toFixed(2)
                        }
                    case "U":
                        return {
                            ...f,
                            montant: ((parseFloat(f?.prix || "0") * f['quality']) || 0).toFixed(2)
                        }
                    default:
                        return 0;
                }

            })

        });

        const ttc = form.getFieldsValue()?.donnes?.map(x => parseFloat(x.montant))?.reduce((c, n) => {
            return c + n;
        }) || 0

        const tva = (ttc * 0.2) || 0
        const prixTTC = (ttc + tva) || 0
        setState(f => ({...f, ttc, prixTTC, tva, form: form.getFieldsValue()}))
    }


    const dataForm = <div className="container">
        <div className="row mt-5 justify-content-center">
            <div className="col-12">
                <Form
                    form={form}
                    name="basic"
                    labelCol={{span: 12}}
                    labelAlign={"left"}
                    wrapperCol={{span: 12}}
                    onFinish={() => {
                        setState(f => ({...f, donnesPerElement: []}))
                        CutDonnes(state.form?.donnes,setState)
                        setState(f => ({...f, submittedData: true}))
                    }}
                >
                    <Form.Item
                        label="Projet"
                        name="projet"
                        rules={[{required: true, message: ''}]}
                    >
                        <Select showSearch onChange={(x, e) => {
                            if (x !== null) {
                                axios.create().get('/api/factures/ref/' + e.key).then(ft => {
                                    form.setFieldsValue({factureRef: ft.data});
                                })
                                form.setFieldsValue({...state.projects.find(f => f.id === parseInt(e.key.toString()))})
                            }
                        }
                        }>
                            <Option value={null} children={null}/>
                            {state.projects.map(x => <Option key={x.id} value={x.name}>{x.name}</Option>)}
                        </Select>
                    </Form.Item>
                    <Form.Item
                        label="Marche N°"
                        name="nemMarche"
                        rules={[{required: true, message: ''}]}
                    >
                        <Input/>
                    </Form.Item>

                    <Form.Item
                        label="Maître d'Ouvrage/Client"
                        name="maitreDouvrage"
                        rules={[{required: true, message: ''}]}
                    >
                        <Input className="w-100"/>
                    </Form.Item>
                    <Form.Item
                        label="Objet"
                        name="object"
                        rules={[{required: true, message: ''}]}
                    >
                        <Input className="w-100"/>
                    </Form.Item>
                    <Form.Item
                        label="ICE"
                        name="ice"
                        rules={[{required: true, message: ''}]}
                    >
                        <Input className="w-100"/>
                    </Form.Item>

                    <Form.Item
                        label="Référence"
                        rules={[{required: true, message: ''}]}
                        name="factureRef"
                    >
                        <Input disabled/>
                    </Form.Item>

                    <Form.List name={"donnes"}>
                        {(fields, {add, remove}) => (
                            <>
                                <div className="table-responsive">
                                <table className="table table-hover table-bordered w-100">
                                    <thead>
                                    <tr>
                                        <th>N°Prix</th>
                                        <th>Designation des Prestations</th>
                                        <th>Unite</th>
                                        <th>Quantité</th>
                                        <th>Prix Unitaire H.T</th>
                                        <th>Montant</th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    {fields.map(({key, name, fieldKey, ...restField}) => (
                                        <tr key={key}>
                                            <td className="text-center align-middle">
                                                {key + 1}
                                            </td>
                                            <td className="editFormCol">
                                                <Form.Item
                                                    {...restField}
                                                    name={[name, 'designation']}
                                                    fieldKey={[fieldKey, 'designation']}
                                                    rules={[{required: true, message: ""}]}
                                                >
                                                    <Input/>
                                                </Form.Item>
                                            </td>
                                            <td className="editFormCol">
                                                <Form.Item
                                                    {...restField}
                                                    name={[name, 'unite']}
                                                    fieldKey={[fieldKey, 'unite']}
                                                    rules={[{required: true, message: ""}]}
                                                >
                                                    <Select onChange={makeEdition}>
                                                        <Option value={"%"}>%</Option>
                                                        <Option value={"U"}>U</Option>
                                                        <Option value={"F"}>F</Option>
                                                    </Select>
                                                </Form.Item>
                                            </td>
                                            <td className="editFormCol">
                                                <Form.Item
                                                    {...restField}
                                                    name={[name, 'quality']}

                                                    fieldKey={[fieldKey, 'quality']}
                                                    rules={[{required: true, message: ""}]}
                                                >
                                                    <Input onChange={makeEdition}/>
                                                </Form.Item>
                                            </td>
                                            <td className="editFormCol">
                                                <Form.Item
                                                    {...restField}
                                                    name={[name, 'prix']}
                                                    fieldKey={[fieldKey, 'prix']}
                                                    rules={[{required: true, message: ""}]}
                                                >
                                                    <Input onChange={makeEdition}/>
                                                </Form.Item>
                                            </td>
                                            <td>
                                                <Form.Item
                                                    {...restField}
                                                    name={[name, 'montant']}
                                                    fieldKey={[fieldKey, 'montant']}
                                                    rules={[{required: true, message: ""}]}
                                                >
                                                    <InputNumber disabled/>
                                                </Form.Item>
                                            </td>
                                        </tr>
                                    ))}
                                    </tbody>
                                </table></div>
                                <div className="row justify-content-center">
                                    <div className="col-xs m-1">
                                        <Button onClick={() => {
                                            add();
                                        }} shape={"circle"} icon={<PlusOutlined/>} type={"success"}/>
                                    </div>
                                    <div className="col-xs m-1">
                                        <Button onClick={() => {
                                            if (fields.length === 1) return;
                                            remove(fields.at(-1).name)
                                        }} shape={"circle"} icon={<MinusOutlined/>} type={"danger"}/>
                                    </div>
                                </div>
                            </>
                        )}
                    </Form.List>
                    <div className="row justify-content-center">
                        <div className="col-xs">
                            <table className="table-bordered text-center table">
                                <thead>
                                <tr>
                                    <th colSpan={2}>Total</th>
                                </tr>
                                </thead>
                                <tbody>
                                <tr>
                                    <td>Total H.T.V.A</td>
                                    <td>{state.ttc.toFixed(2)}</td>
                                </tr>
                                <tr>
                                    <td>T.V.A(20%)</td>
                                    <td>{state.tva.toFixed(2)}</td>
                                </tr>
                                <tr>
                                    <td>Total T.T.C</td>
                                    <td>{state.prixTTC.toFixed(2)}</td>
                                </tr>
                                <tr>
                                    <td colSpan={2}>
                                        {SplitNumber(state.prixTTC.toFixed(2))}
                                    </td>
                                </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>


                    <div className="row justify-content-center">
                        <Button type="success" htmlType="submit">
                            Afficher
                        </Button>
                    </div>
                </Form>
            </div>
        </div>
    </div>


    const multiPagesPrinter = () => {

        const elements = [];
        const presentArrayForm = state.donnesPerElement.slice(1);
        for (const key in presentArrayForm) {

            const element = presentArrayForm[key];

            const page = <React.Fragment key={key}>
                <hr className="m-5 border" style={{width: 960}}/>
                <div style={{minWidth: 960, width: 960, minHeight: 1000}}
                     className="forPrintPages d-flex flex-column align-items-center m-0">
                    <div style={{minWidth: 960, minHeight: 1300}} className="m-0 container">
                        <div className="row border justify-content-between flex-nowrap align-items-center">
                            <div className="col-xs border-right">
                                <img height={80} src={Logo} alt={"logo"}/>
                            </div>
                            <div className="col-xs">
                                <h2 className="font-weight-bold">Facture</h2>
                            </div>
                            <div className="col-xs mh-100 border-left">
                                <table>
                                    <tbody>
                                    <tr>
                                        <th>
                                            Code
                                        </th>
                                        <td>: FAC01</td>
                                    </tr>
                                    <tr>
                                        <th>
                                            Version
                                        </th>
                                        <td>: A</td>
                                    </tr>
                                    <tr>
                                        <th>
                                            Date
                                        </th>
                                        <td>
                                            : 06/09/2021
                                        </td>
                                    </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                        <br/>
                        <br/>
                        <div className="row mt-5">
                            <div className="col">
                                <table className="table w-100 text-center table-bordered">
                                    <thead>
                                    <tr>
                                        <th>
                                            Prix N°
                                        </th>
                                        <th>
                                            Désignation
                                        </th>
                                        <th>U</th>
                                        <th>Quantité</th>
                                        <th>PU</th>
                                        <th>Montant</th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    {element?.map((x, i) => {
                                        return <tr key={i}>
                                            <td>{((parseInt(key) + 1) * 16) + i + 1}</td>
                                            <td>{x?.designation}</td>
                                            <td>{x?.unite}</td>
                                            <td>{x?.quality}</td>
                                            <td>{x?.prix}</td>
                                            <td>{x?.montant}</td>
                                        </tr>
                                    })}

                                    </tbody>
                                    {parseInt(key) + 1 === presentArrayForm.length ? <tfoot>
                                    <tr>
                                        <td className="border-0" colSpan={4}/>
                                        <td>Total H.T.V.A</td>
                                        <td>{state.ttc.toFixed(2)}</td>
                                    </tr>
                                    <tr>
                                        <td className="border-0" colSpan={4}/>
                                        <td>T.V.A (20%)</td>
                                        <td>{state.tva.toFixed(2)}</td>
                                    </tr>
                                    <tr>
                                        <td className="border-0" colSpan={4}/>
                                        <td>Total T.T.C</td>
                                        <td>{state.prixTTC.toFixed(2)}</td>
                                    </tr>
                                    </tfoot> : null}

                                </table>
                            </div>
                        </div>
                        {parseInt(key) + 1 === presentArrayForm.length ? <div className="row justify-content-center">
                            <div className="col-xs">
                                <div className="text-center">
                                    <p className={"m-0"}>ARRÊTER LE MONTANT DE LA PRESENT FACTURE A LA SOMME DE :</p>
                                    <p style={{fontSize: 18}}
                                       className="font-weight-bold">{SplitNumber(state.prixTTC.toFixed(2))}</p>
                                </div>
                            </div>
                        </div> : null}
                        {parseInt(key) + 1 === presentArrayForm.length ?
                            <div className="row mr-5 mt-5 justify-content-end">
                                <div className="col-xs mr-5">
                                    <div className="text-center">
                                        <p className={"m-0"}>Visa Facturation</p>
                                    </div>
                                </div>
                            </div> : null}


                    </div>
                    <div style={{width: 960}} className="row">


                        <div className="col">
                            <p style={{lineHeight: 1}} className="text-center mb-0 w-100">
                                <small>Conseil Ingénierie Tensift S.A.R.L Bureau d'étude technique</small><br/>
                                <small>R.C: 46193 Pat: 45312363 IF: 40390269 ICE: 000058586000054</small><br/>
                                <small>Adresse: N°4, 2éme ETG IMM 535 Residence Salma, LOT N°3 AL MANAR III, LOT CHARAF
                                    Marrakech-40070,</small><br/>
                                <small>Tel: 05 24 29 09 47 Fax: 05 24 29 15 16</small><br/>
                                <small>E-mail: contact@cit.ma</small>
                            </p>
                            <div className="row justify-content-between">
                                <div className="col-xs">
                                    ref:{state.form?.factureRef}
                                </div>
                                <div className="col-xs">
                                    page:{parseInt(key) + 2}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </React.Fragment>;


            elements.push(page);
        }

        return elements;

    }


    const dataFacture = <div className="d-flex flex-column align-items-center">

        <div style={{minWidth: 960, width: 960, minHeight: 1000}}
             className="forPrintPages d-flex flex-column align-items-center m-0">
            <div style={{minWidth: 960, minHeight: 1300}} className="m-0 container">
                <div className="row border justify-content-between flex-nowrap align-items-center">
                    <div className="col-xs border-right">
                        <img height={80} src={Logo} alt={"logo"}/>
                    </div>
                    <div className="col-xs">
                        <h2 className="font-weight-bold">Facture</h2>
                    </div>
                    <div className="col-xs mh-100 border-left">
                        <table>
                            <tbody>
                            <tr>
                                <th>
                                    Code
                                </th>
                                <td>: FAC01</td>
                            </tr>
                            <tr>
                                <th>
                                    Version
                                </th>
                                <td>: A</td>
                            </tr>
                            <tr>
                                <th>
                                    Date
                                </th>
                                <td>
                                    : 06/09/2021
                                </td>
                            </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
                <div className="row mt-4">
                    <div className="col-xs">MARCHE N°: {state.form?.nemMarche || state.form?.ref}</div>
                </div>
                <div className="row">
                    <div className="col-xs">OBJET: {state.form?.object}</div>
                </div>
                <div className="row">
                    <div className="col-xs">MAITRE
                        D'OUVRAGE/CLIENT: {state.form?.maitreDouvrage || state.form?.client}</div>
                </div>
                <div className="row">
                    <div className="col-xs">ICE: {state.form?.ice}</div>
                </div>
                <div className="row mt-3 mb-0 justify-content-center">
                    <div className="col-xs"><h2 className="m-0">
                        Facture N° {state.form?.factureRef}
                    </h2></div>
                </div>
                <div className="row justify-content-center">
                    <div className="col-xs mb-2"><span>
                Nous vous prions de bien vouloir trouver, ci-après notre Facture pour l’étude et suivi relatif aux :
            </span></div>
                </div>
                <div className="row">
                    <div className="col">
                        <table className="table w-100 text-center table-bordered">
                            <thead>
                            <tr>
                                <th>
                                    Prix N°
                                </th>
                                <th>
                                    Désignation
                                </th>
                                <th>U</th>
                                <th>Quantité</th>
                                <th>PU</th>
                                <th>Montant</th>
                            </tr>
                            </thead>
                            <tbody>
                            {state.donnesPerElement[0]?.map((x, i) => {
                                return <tr key={i}>
                                    <td>{i + 1}</td>
                                    <td>{x?.designation}</td>
                                    <td>{x?.unite}</td>
                                    <td>{x?.quality}</td>
                                    <td>{x?.prix}</td>
                                    <td>{x?.montant}</td>
                                </tr>
                            })}

                            </tbody>
                            {state.donnesPerElement.length > 1 ? null : <tfoot>
                            <tr>
                                <td className="border-0" colSpan={4}/>
                                <td>Total H.T.V.A</td>
                                <td>{state.ttc.toFixed(2)}</td>
                            </tr>
                            <tr>
                                <td className="border-0" colSpan={4}/>
                                <td>T.V.A (20%)</td>
                                <td>{state.tva.toFixed(2)}</td>
                            </tr>
                            <tr>
                                <td className="border-0" colSpan={4}/>
                                <td>Total T.T.C</td>
                                <td>{state.prixTTC.toFixed(2)}</td>
                            </tr>
                            </tfoot>}

                        </table>
                    </div>
                </div>
                {state.donnesPerElement.length > 1 ? null :
                    <div className="row justify-content-center">
                        <div className="col-xs">
                            <div className="text-center">
                                <p className={"m-0"}>ARRÊTER LE MONTANT DE LA PRESENT FACTURE A LA SOMME DE :</p>
                                <p style={{fontSize: 18}}
                                   className="font-weight-bold">{SplitNumber(state.prixTTC.toFixed(2))}</p>
                            </div>
                        </div>
                    </div>}

            </div>
            <div style={{width: 960}} className="row">
                <div className="col">
                    <p style={{lineHeight: 1}} className="text-center mb-0 w-100">
                        <small>Conseil Ingénierie Tensift S.A.R.L Bureau d'étude technique</small><br/>
                        <small>R.C: 46193 Pat: 45312363 IF: 40390269 ICE: 000058586000054</small><br/>
                        <small>Adresse: N°4, 2éme ETG IMM 535 Residence Salma, LOT N°3 AL MANAR III, LOT CHARAF
                            Marrakech-40070,</small><br/>
                        <small>Tel: 05 24 29 09 47 Fax: 05 24 29 15 16</small><br/>
                        <small>E-mail: contact@cit.ma</small>
                    </p>
                    <div className="row justify-content-between">
                        <div className="col-xs">
                            ref:{state.form?.factureRef}
                        </div>
                        <div className="col-xs">
                            page:1
                        </div>
                    </div>
                </div>
            </div>
        </div>
        {multiPagesPrinter()}
    </div>


    return (<>
        {state.submittedData ? <>
            <Button type={"primary"} icon={<ArrowLeftOutlined/>} onClick={() => {
                setState(f => ({...f, submittedData: false}));
            }
            }/>
            {dataFacture}
        </> : dataForm}
        {state.submittedData ? <Button type={"success"} onClick={() => {
            const pdf = new jsPDF('portrait', "px", "a4");

            const classes = document.getElementsByClassName("forPrintPages");

            for (let print = 0; print < classes.length; print++) {
                html2canvas(document.getElementsByClassName("forPrintPages").item(print), {scale: 3}).then(canvas => {
                    pdf.addImage(canvas.toDataURL(), 10, 10, 425, 0);
                    if (print < classes.length - 1)
                        pdf.addPage();
                }).then(() => {
                    if (print === classes.length - 1) {

                        const value = {
                            ...state.form,
                            project: state.projects.find(t => t.name === state.form.projet),
                            client: state.form.maitreDouvrage,
                            data: JSON.stringify(state.form.donnes),
                            totalPrix: state.ttc
                        };
                        delete value.donnes;

                        axios.create().post('/api/factures', value).then(null)

                        window.open(pdf.output('bloburl'))
                    }
                })
            }


        }}>Imprimer</Button> : null}

    </>)
}



const dtp = (dsp) => ({actions: bindActionCreators(types, dsp)})

export default connect(null, dtp)(Facture);
