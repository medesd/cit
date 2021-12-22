import React, {useEffect, useState} from "react";
import axios from "axios";
import Button from "antd-button-color";
import {EyeOutlined} from "@ant-design/icons";
import {Drawer} from "antd";
import Logo from "../logo.jpg";
import {CutDonnes, SplitNumber} from "../tools";
import {jsPDF} from "jspdf";
import html2canvas from "html2canvas";


const FactureHistory = () => {

    const [state, setState] = useState({
        factures: [],
        currentFacture: null,
        drawer: false,
        donnesPerElement: [],
        currentTva: 0,
        currentPrixTTC: 0
    });


    useEffect(() => {
        axios.create().get('/api/factures').then(ft => {
            ft.data = ft.data.map(x => {
                x.donnes = JSON.parse(x.data);
                delete x.data;
                return x;
            })
            setState(f => ({...f, factures: ft.data}))
        })
    }, [])

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
                                        <td>{state.currentFacture?.totalPrix.toFixed(2)}</td>
                                    </tr>
                                    <tr>
                                        <td className="border-0" colSpan={4}/>
                                        <td>T.V.A (20%)</td>
                                        <td>{state.tva?.toFixed(2)}</td>
                                    </tr>
                                    <tr>
                                        <td className="border-0" colSpan={4}/>
                                        <td>Total T.T.C</td>
                                        <td>{state.prixTTC?.toFixed(2)}</td>
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
                                       className="font-weight-bold">{SplitNumber(state.prixTTC?.toFixed(2))}</p>
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
                    <div className="col-xs">MARCHE
                        N°: {state.currentFacture?.nemMarche || state.currentFacture?.ref}</div>
                </div>
                <div className="row">
                    <div className="col-xs">OBJET: {state.currentFacture?.object}</div>
                </div>
                <div className="row">
                    <div className="col-xs">MAITRE
                        D'OUVRAGE/CLIENT: {state.currentFacture?.maitreDouvrage || state.currentFacture?.client}</div>
                </div>
                <div className="row">
                    <div className="col-xs">ICE: {state.currentFacture?.ice}</div>
                </div>
                <div className="row mt-3 mb-0 justify-content-center">
                    <div className="col-xs"><h2 className="m-0">
                        Facture N° {state.currentFacture?.factureRef}
                        {/*Facture N°CIT001/2022/01*/}
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
                                <td>{state.currentFacture?.totalPrix.toFixed(2)}</td>
                            </tr>
                            <tr>
                                <td className="border-0" colSpan={4}/>
                                <td>T.V.A (20%)</td>
                                <td>{state.currentTva.toFixed(2)}</td>
                            </tr>
                            <tr>
                                <td className="border-0" colSpan={4}/>
                                <td>Total T.T.C</td>
                                <td>{state.currentPrixTTC.toFixed(2)}</td>
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
                                   className="font-weight-bold">{SplitNumber(state.currentPrixTTC.toFixed(2))}</p>
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
                            ref:{state.currentFacture?.factureRef}
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


    return <div className="container mt-5">
        <Drawer
            title="Facture Details"
            placement={"bottom"}
            height="100%"
            visible={state.drawer}
            onClose={() => setState(f => ({...f, drawer: false}))}
            key={"0"}
        >
            <div className="table-responsive">
                {dataFacture}
            </div>
            <div className="row mt-4">
                <div className="col-xs">
                    <Button type={"success"} onClick={() => {
                        const pdf = new jsPDF('portrait', "px", "a4");

                        const classes = document.getElementsByClassName("forPrintPages");

                        for (let print = 0; print < classes.length; print++) {
                            html2canvas(document.getElementsByClassName("forPrintPages").item(print), {scale: 3}).then(canvas => {
                                pdf.addImage(canvas.toDataURL(), 10, 10, 425, 0);
                                if (print < classes.length - 1)
                                    pdf.addPage();
                            }).then(() => {
                                if (print === classes.length - 1) {
                                    window.open(pdf.output('bloburl'))
                                }
                            })
                        }


                    }}>Imprimer</Button>
                </div>
            </div>
        </Drawer>
        <div className="row">
            <div className="col table-responsive">
                <table className="table text-center table-hover table-bordered">
                    <thead>
                    <tr>
                        <th>
                            Référence
                        </th>
                        <th>
                            Projet
                        </th>
                        <th>
                            Client
                        </th>
                        <th>
                            Objet
                        </th>
                        <th>
                            ICE
                        </th>
                        <th>
                            Action
                        </th>
                    </tr>
                    </thead>
                    <tbody>
                    {state.factures?.map(x => {
                        return <tr key={x.id}>
                            <td>
                                {x.factureRef}
                            </td>
                            <td>
                                {x.projectName}
                            </td>
                            <td>
                                {x.client}
                            </td>
                            <td>
                                {x.object}
                            </td>
                            <td>
                                {x.ice}
                            </td>
                            <td>
                                <Button type="primary" onClick={() => {

                                    const current = state.factures.find(y => y.id === x.id);

                                    setState(f => ({
                                        ...f,
                                        currentFacture: current,
                                        drawer: true,
                                        donnesPerElement: [],
                                        currentTva: current?.totalPrix * 0.2 || 0,
                                        currentPrixTTC: current?.totalPrix + (current?.totalPrix * 0.2 || 0)
                                    }));
                                    CutDonnes(state.factures.find(y => y.id === x.id).donnes,setState)

                                }} shape={"circle"} className="mx-1" icon={<EyeOutlined/>}/>
                            </td>
                        </tr>
                    })}
                    </tbody>
                </table>
            </div>
        </div>
    </div>
}

export default FactureHistory;
