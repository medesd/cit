import React, {Component} from 'react';
import './gantt.css';
import './jquery.fn.gantt';
import $ from 'jquery';
import moment from "moment";
import {connect} from "react-redux";
import Modals from '../edit/Modals';
import Button from "antd-button-color";
import {withRouter} from "react-router";
import axios from "axios";
import {bindActionCreators} from "redux";
import * as types from "../../../redux/actions/actions";
import {message, Popconfirm} from "antd";
import {DeleteOutlined, EditOutlined} from "@ant-design/icons";
import {ParseJwt} from "../../../tools";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";

class Gantt extends Component {
    projectDate = null;
    lot = atob(new URLSearchParams(this.props.location.search).get('lot'));


    closeModal = () => {
        this.setState(f => ({...f, modal: false}))
    }

    datasource = [];

    makeSomeData = () => {
        const data = [];
        this.props.form.forEach((f) => {

            data.push({
                end: f.end,
                hoursReel: f.hoursReel,
                phase: f.phase,
                nb: f.nb,
                inex: f.inex,
                realJest: f.realJest,
                realJreel: f.realJreel,
                commentaires: f.commentaires,
                percent: f.percent,
                countKey: f.countKey,
                tache: f.tache,
                dayE: f.dayEstimated,
                dayR: f.reelDays,
                dayES: f.jestStart,
                dayRS: f.jreelStart,
                dayEE: moment(f.jestStart).clone().add(f.dayEstimated - 1, 'days').valueOf(),
                dayRE: f.end || f.inex === "Externe" ? moment(f.jreelStart).clone().add(f.reelDays - 1, 'days').valueOf() : moment().subtract(1, "days").valueOf(),
            })
        })
        if (data.length === 0) return;
        this.datasource = data;
        $(".gantt").gantt({
            source: data,
            navigate: "scroll",
            typeFor: "details",
            date: moment(this.projectDate).valueOf(),
            scale: "days",
            minScale: "hours",
            maxScale: "months",
            itemsPerPage: 10,
            scrollToToday: false,
            useCookie: true,
        });
    }


    constructor(props) {
        super(props);
        this.state = {...this.props.form, modal: false};
    }

    instance = axios.create();


    async componentDidMount() {
        await this.instance.get('/api/projects/taches/' + this.props.match.params.id + '?lot=' + this.lot).then(async ft => {
            await this.instance.get('/api/projects/' + this.props.match.params.id).then(f => {
                this.projectDate = moment(f.data.dateDebut).format("YYYY-MM-DD")
            })


            this.props.actions.replaceEvent(ft.data.map(f => {

                return {
                    id: f.id,
                    end: f.end,
                    hoursReel: f.elements,
                    phase: f.phase,
                    tache: f.name,
                    realJest: f.realJest,
                    realJreel: f.realJreel,
                    jestStart: f.jestStart,
                    jreelStart: f.jreelStart,
                    dayEstimated: f.jest,
                    reelDays: f.jreel,
                    commentaires: f.comment,
                    nb: f.recent,
                    percent: f.complete,
                    inex: f.inex,
                    countKey: f.currentKey
                }
            }))
            this.makeSomeData();
        });
    }

    confirm = async (e, id) => {

        this.instance.delete('/api/taches/' + id).then(() => window.location.reload());

        message.success('supprimé');
    }

    render() {
        return (
            <div>
                <div className="table-responsive">
                    <table className="table table-hover table-bordered table-striped mt-2 text-center">
                        <thead>
                        <tr>
                            <th>Phase</th>
                            <th>Taches</th>
                            <th>Responsable</th>
                            <th>Commentaire</th>
                            <th className="action">Action</th>
                        </tr>
                        </thead>
                        <tbody>
                        {
                            this.props.form.map((f, i) => {
                                return (<tr key={i}>
                                    <td>{f.phase}</td>
                                    <td>{f.tache}</td>
                                    <td>{f.inex}</td>
                                    <td>{f.commentaires}</td>
                                    <td className="action">{ParseJwt().roles.map(f => f.authority).includes("ROLE_USER") ?

                                        <Popconfirm
                                            title="Êtes-vous sûr de supprimer cette tâche?"
                                            onConfirm={e => this.confirm(e, f.id)}
                                            okText="Yes"
                                            cancelText="No"
                                        >
                                            <Button shape="circle" icon={<DeleteOutlined/>} type="danger"/>
                                        </Popconfirm> : null
                                    }
                                        <Button className="ml-1" onClick={() => {
                                            this.setState(st => ({...st, modal: true, data: f}))
                                        }} shape="circle" icon={<EditOutlined/>}
                                                type="primary"/>
                                    </td>
                                </tr>)
                            })
                        }
                        </tbody>
                    </table>
                </div>
                <div className="row justify-content-center">

                    <div className="col-xs w-100">
                        <div id="capture" className="gantt"/>
                    </div>
                </div>
                <Modals closeModal={this.closeModal} modal={this.state.modal} data={this.state.data}/>
                <div className="row justify-content-center">
                    <div className="col-xs">
                        <Button hidden={this.props.form.length === 0} onClick={async () => {
                            document.getElementsByClassName('action').item(0).style.display = "none";
                            document.getElementsByClassName('action').item(1).style.display = "none";

                            for (let i = 0; i < document.getElementsByClassName('action').length; i++) {
                                document.getElementsByClassName('action').item(i).style.display = "none";
                            }
                            let pdf = new jsPDF('landscape', "px", 'a4');


                            const cw = document.getElementsByClassName('dataPanel').item(0).offsetWidth + document.getElementsByClassName('leftPanel').item(0).offsetWidth;
                            const withhold = document.getElementsByClassName('gantt').item(0).style.width;
                            document.getElementsByClassName('gantt').item(0).style.width = cw + 'px';
                            html2canvas(document.querySelector("#capture"), {scale: 2}).then(canvas => {
                                let y;
                                if ((canvas.height / window.devicePixelRatio) > pdf.internal.pageSize.getHeight()) {
                                    y = 15;
                                } else {
                                    const rest = pdf.internal.pageSize.getHeight() - (canvas.height / window.devicePixelRatio);
                                    y = rest / 2
                                }


                                let width;
                                let x;
                                if ((canvas.width / window.devicePixelRatio) > pdf.internal.pageSize.getWidth()) {
                                    width = pdf.internal.pageSize.getWidth() - 32;
                                    x = 15;
                                } else {
                                    width = canvas.width / window.devicePixelRatio;
                                    const rest = pdf.internal.pageSize.getWidth() - width;
                                    x = rest / 2
                                }


                                pdf.addImage(canvas.toDataURL(), 'JPEG', x, y, width, 0);

                            }).then(() => {
                                document.getElementsByClassName('gantt').item(0).style.width = withhold;
                                //pdf.save();
                                const btns = [...document.getElementsByClassName('ant-btn')];
                                document.getElementsByClassName('gantt').item(0).style.display = "none";
                                document.getElementsByClassName('btn').item(0);
                                btns.forEach((f) => {
                                    f.style.display = "none";
                                })


                                const width = document.body.style.width;
                                document.body.style.width = '950px';
                                document.body.style.width = '950px';

                                html2canvas(document.getElementById("printer"), {scale: 1}).then(canvas => {
                                    canvas.style.opacity = '1';
                                    pdf.addPage(null, "portrait").addImage(canvas.toDataURL(), 'JPEG', 0, 15, 440, 0)
                                }).then(() => {
                                    btns.forEach((f) => {
                                        f.style.display = "block";
                                    })
                                    document.body.style.width = width;
                                    document.getElementsByClassName('gantt').item(0).style.display = "block";
                                    document.getElementsByClassName('bottom').item(0).style.display = "block";

                                    document.getElementById('navbar').classList.remove("d-none");
                                    document.getElementById('navbar').classList.add("d-flex");


                                    for (let i = 0; i < document.getElementsByClassName('action').length; i++) {
                                        document.getElementsByClassName('action').item(i).style.display = "flex";
                                        document.getElementsByClassName('action').item(i).style.justifyContent = "center";
                                    }
                                    pdf.save();
                                })


                            })


                        }} type="primary" href={null}>Imprimer</Button>
                    </div>
                </div>
            </div>

        );
    }
}


function

mapStateToProps(state) {
    return {
        form: state.currencyReducer,
        project: state.projectReducer
    };
}

const
    dtp = (dsp) => ({actions: bindActionCreators(types, dsp)})

export default connect(mapStateToProps, dtp)

(
    withRouter(Gantt)
)
;
