import React, {useEffect, useState} from "react";
import Main from "./addTache/main";
import PContainer from './taches/tachesDetails/container';
import * as types from './redux/actions/actionTypes';
import {BrowserRouter as Router, Link, NavLink, Redirect, Route, Switch} from "react-router-dom";
import {store} from "./redux/store";
import AjouteEmployee from "./employee/ajouteEmployee";
import Sommaire from "./projectDetails/sommaire";
import AllProjects from "./projects/allProjects";
import {Dropdown, notification, Menu} from 'antd';
import moment from "moment";
import LotMain from "./lots/lotMain";
import Dash from "./manage/dash";
import Files from "./files/files";
import PlanningGeneral from "./planningGeneral/planningGeneral";
import ProjectDetails from "./projects/projectDetails";
import Facture from "./factures/Facture";
import {ParseJwt} from "./tools";
import FactureHistory from "./factures/FactureHistory";
import OrdreService from "./ordreService/OrdreService";
import OrdreServiceHistory from "./ordreService/OrdreServiceHistory";
import FicheIntervention from "./ficheIntervention/FicheIntervention";
import {CoffeeOutlined, SettingOutlined, UserOutlined} from "@ant-design/icons";
import Button from "antd-button-color";
import {connect} from "react-redux";
import RapChantierDocuments from "./Raps/RapChantierDocuments";
import NewOrdreService from "./ordreService/NewOrdreService";
import ETU04 from "./ETU04";
import ACH01 from "./ACH01";
import COM01 from "./COM01";
import COM02 from "./COM02";
import GMQ01 from "./GMQ01";
import GMQ02 from "./GMQ02";
import GMQ09 from "./GMQ09";
import INF02 from "./INF02";
import ACH02 from "./ACH02";
import MenuLink from "./MenuLink";
import {withRouter} from "react-router";
import RH02 from "./RH02";
import RH03 from "./RH03";
import RH05 from "./RH05";
import RH06 from "./RH06";
import RH07 from "./RH07";
import RH08 from "./RH08";
import FAC02 from "./FAC02";
import ACH04 from "./ACH04";


function App(props) {
    const [state, setState] = useState({menu: false})
    const makeTest = () => {
        if (moment().valueOf() > (ParseJwt(localStorage.getItem('token')).exp * 1000)) {
            localStorage.clear();
            window.location.reload();
        }
    }

    makeTest();

    setInterval(() => {
        makeTest();
    }, 2000)
    const user = ParseJwt(localStorage.getItem('token')).username;

    useEffect(() => {
        if (localStorage.getItem("token") && !localStorage.getItem("notif")) {
            notification.open({
                message: `Bienvenue ${user}`,
                icon: <CoffeeOutlined/>,
                type: "success",
                placement: "bottomRight",
                className: "bg-success text-light"
            })
        }
        localStorage.setItem("notif", "1");
    }, [props.actions,user])




    const action = type => store.dispatch({type})
    action(types.AddProject);

    const menu = (
        <Menu>
            <Menu.Item key="0">
                <NavLink to="/"
                         onClick={() => {
                             setTimeout(() => {
                                 localStorage.clear();
                                 window.location.reload();
                             }, 100)
                         }}
                         className="h-100 d-flex text-primary justify-content-center align-items-center"
                         activeClassName="text-info">Déconnecter ({user})</NavLink>
            </Menu.Item>
        </Menu>
    );

    return (
        <Router>
            <div className={"d-flex vh-100"}>
                <div onMouseLeave={() => {
                    setState(f => ({...f, menu: false}))
                }
                } onMouseEnter={() => {
                    setState(f => ({...f, menu: true}))
                }
                } className="col-xs" style={{maxHeight: "calc(100vh-600)"}}>
                    <MenuLink menu={state.menu}/>
                </div>

                <div className="col vh-100 p-0">
                    <nav
                        id="navbar"
                        className="navbar py-3 d-flex justify-content-between w-100 p-0 pb-1 pt-1 navbar-expand-lg navbar-light"
                        style={{backgroundColor: "#424247"}}>
                        <div className="col-xs"/>

                        <div className="col-xs mr-3 d-flex justify-content-center align-items-center">
                            <h3 className="m-0 p-0 text-light">{props.title}</h3>
                        </div>

                        <div className="d-flex">
                            <div className="col-xs mr-3 d-flex justify-content-center align-items-center">
                                <Link to={"/main"}>
                                    <Button onClick={() => {
                                    }} shape={"circle"} icon={<SettingOutlined/>}/>
                                </Link>
                            </div>


                            <div className="col-xs mr-3 d-flex justify-content-center align-items-center">
                                <Dropdown overlay={menu} trigger={['click']}>
                                    <Button shape={"circle"} icon={<UserOutlined/>}/>
                                </Dropdown>
                            </div>
                        </div>
                    </nav>

                    <div style={{maxHeight: "calc(100vh - 66px)", overflow: "auto"}}>

                        <Switch>

                            {/*TODO:ETUDE*/}
                            <Route path="/project-detail/:id">
                                <ProjectDetails/>
                            </Route>
                            <Route path="/fiche-intervention/:id">
                                <FicheIntervention/>
                            </Route>
                            <Route path="/project-res">
                                <Sommaire/>
                            </Route>
                            <Route path="/main">
                                <Dash/>
                            </Route>
                            <Route path="/taches-details">
                                <PContainer/>
                            </Route>
                            <Route path="/planning-general">
                                <PlanningGeneral/>
                            </Route>
                            <Route path="/project-details/:id">
                                <Main/>
                            </Route>
                            <Route path="/lots/:id">
                                <LotMain/>
                            </Route>
                            <Route path="/etu-04">
                                <ETU04/>
                            </Route>

                            {/*TODO:SUIVI*/}
                            <Route path="/rap-chantier-documents">
                                <RapChantierDocuments/>
                            </Route>
                            <Route path="/new-ordre-service/:type">
                                <NewOrdreService/>
                            </Route>

                            {/*TODO:ACH*/}
                            <Route path="/ach-01">
                                <ACH01/>
                            </Route>
                            <Route path="/ach-02">
                                <ACH02/>
                            </Route>

                            <Route path="/ach-04">
                                <ACH04/>
                            </Route>

                            {/*TODO:FAC*/}
                            <Route path="/facture">
                                <Facture/>
                            </Route>
                            <Route path="/facture-history">
                                <FactureHistory/>
                            </Route>
                            <Route path="/fac-02">
                                <FAC02/>
                            </Route>

                            {/*TODO:INF*/}
                            <Route path="/inf-02">
                                <INF02/>
                            </Route>

                            {/*TODO:COM*/}
                            <Route path="/com-01">
                                <COM01/>
                            </Route>
                            <Route path="/com-02">
                                <COM02/>
                            </Route>

                            {/*TODO:GMQ*/}
                            <Route path="/gmq-01">
                                <GMQ01/>
                            </Route>
                            <Route path="/gmq-02">
                                <GMQ02/>
                            </Route>
                            <Route path="/gmq-09">
                                <GMQ09/>
                            </Route>

                            {/*TODO:RH*/}
                            <Route path="/ajoute-emp">
                                <AjouteEmployee/>
                            </Route>
                            <Route path="/rh-02">
                                <RH02/>
                            </Route>
                            <Route path="/rh-03">
                                <RH03/>
                            </Route>
                            <Route path="/rh-05">
                                <RH05/>
                            </Route>

                            <Route path="/rh-06">
                                <RH06/>
                            </Route>

                            <Route path="/rh-07">
                                <RH07/>
                            </Route>
                            <Route path="/rh-08">
                                <RH08/>
                            </Route>


                            {/*TODO:AUTRE*/}
                            <Route path="/ordre-service-history">
                                <OrdreServiceHistory/>
                            </Route>

                            <Route path="/ordre-service">
                                <OrdreService/>
                            </Route>
                            <Route path="/files/:id">
                                <Files/>
                            </Route>
                            <Route exact path="/">
                                <AllProjects/>
                            </Route>
                            <Redirect to="/"/>


                        </Switch>
                    </div>
                </div>
            </div>
        </Router>
    );
}


const msp = (state) => {
    return {
        title: state.headerTitle
    };
}


export default connect(msp)(withRouter(App));
