import React, {useState} from 'react';
import logo2 from "./logo.jpg";
import {Menu} from "antd";
import classes from "./MenuLink.module.css";
import {
    BookOutlined,
    BuildOutlined,
    IdcardOutlined,
    LaptopOutlined,
    ShopOutlined,
    SnippetsOutlined,
    TeamOutlined,
    WalletOutlined
} from "@ant-design/icons";
import {useHistory, withRouter} from "react-router";

const {SubMenu} = Menu;

const rootSubmenuKeys = ["sub1", "sub2", "sub3", "sub4", "sub5", "sub6", "sub7", "sub8"]
const MenuLink = (props) => {


    const [openKeys, setOpenKeys] = useState([]);

    const onOpenChange = keys => {
        const latestOpenKey = keys.find(key => openKeys.indexOf(key) === -1);
        if (rootSubmenuKeys.indexOf(latestOpenKey) === -1) {
            setOpenKeys(keys);
        } else {
            setOpenKeys(latestOpenKey ? [latestOpenKey] : []);
        }
    };


    const history = useHistory();
    return <>
        <div className={classes.animation}>
            <div className={classes.content}/>
            <img src={logo2} width={250} className="" height="65" alt=""/>
        </div>
        <Menu
            openKeys={openKeys}
            onOpenChange={onOpenChange}
            inlineCollapsed={!props.menu}
            style={{
                marginTop: 65,
                width: props.menu ? 256 : 62,
                height: "calc(100vh - 65px)",
                backgroundColor: "rgb(66, 66, 71)",
                overflow: "hidden"
            }}
            theme={"dark"}

            mode={"inline"}
        >
            <SubMenu key="sub1" icon={<BookOutlined/>} title="Etude">
                <Menu.Item onClick={() => history.push("/")} key="0">Projets</Menu.Item>
                <Menu.Item onClick={() => history.push("/planning-general")} key="1">Planning général</Menu.Item>
                <Menu.Item onClick={() => history.push("/new-ordre-service/Etude")} key="2">Ordre service</Menu.Item>
                <Menu.Item onClick={() => history.push("/etu-04")} key="3">Demande supplémentaire</Menu.Item>
                <Menu.Item onClick={() => history.push("/fiche-intervention/none")} key="4">Fiche
                    d'intervention</Menu.Item>
                <Menu.Item key="5">Rapport d'avancement</Menu.Item>
                <Menu.Item onClick={() => history.push("/taches-details")} key="32">Récapitulatif de la
                    semaine</Menu.Item>
                <Menu.Item onClick={() => history.push("/project-res")} key="33">Récapitulatif</Menu.Item>
            </SubMenu>

            <SubMenu key="sub2" icon={<BuildOutlined/>} title="Suivi">
                <Menu.Item onClick={() => history.push("/rap-chantier-documents")} key="6">Rapport</Menu.Item>
                <Menu.Item key="7">Rapport d'avancement</Menu.Item>
                <Menu.Item onClick={() => history.push("/new-ordre-service/Suivi")} key="8">Ordre service</Menu.Item>
                <Menu.Item key="9">Planning général</Menu.Item>
            </SubMenu>

            <SubMenu key="sub3" icon={<ShopOutlined/>} title="Achat">
                <Menu.Item onClick={() => history.push("/ach-01")} key="10">Demande d'achat</Menu.Item>
                <Menu.Item onClick={() => history.push("/ach-02")} key="11">Bon de commande</Menu.Item>
                <Menu.Item onClick={() => history.push("/ach-03")} key="12">Etat de suivi des prestataires</Menu.Item>
                <Menu.Item onClick={() => history.push("/ach-04")} key="13">Liste des prestataires & prestataires évolues</Menu.Item>
                <Menu.Item onClick={() => history.push("/ach-05")} key="14">Tableau comparatif des prestataires</Menu.Item>
            </SubMenu>
            <SubMenu key="sub4" icon={<SnippetsOutlined/>} title="Facturation">
                <Menu.Item onClick={() => history.push("/facture")} key="15">Facture</Menu.Item>
                <Menu.Item onClick={() => history.push("/fac-02")} key="16">Etat de suivi des paiements et
                    rapprochement</Menu.Item>
            </SubMenu>

            <SubMenu key="sub5" icon={<TeamOutlined/>} title="Ressources Humains">
                <Menu.Item onClick={() => history.push("/ajoute-emp")} key="17">Personnel</Menu.Item>
                <Menu.Item onClick={() => history.push("/rh-02")} key="31">Fiche d'évaluation des formations</Menu.Item>
                <Menu.Item onClick={() => history.push("/rh-03")} key="18">Feuille de présence</Menu.Item>
                <Menu.Item onClick={() => history.push("/rh-05")} key="19">Planning des congés</Menu.Item>
                <Menu.Item onClick={() => history.push("/rh-06")} key="20">Planning et suivi des formations</Menu.Item>
                <Menu.Item onClick={() => history.push("/rh-07")} key="21">Demande de formation</Menu.Item>
                <Menu.Item onClick={() => history.push("/rh-08")} key="22">Demande de recrutement</Menu.Item>
            </SubMenu>

            <SubMenu key="sub6" icon={<LaptopOutlined/>} title="Infrastructure">
                <Menu.Item onClick={() => history.push("/inf-02")} key="23">Liste du matériel</Menu.Item>
            </SubMenu>
            <SubMenu key="sub7" icon={<IdcardOutlined/>} title="Commercial">
                <Menu.Item onClick={() => history.push("/com-01")} key="24">Devis</Menu.Item>
                <Menu.Item onClick={() => history.push("/com-02")} key="25">Contrat/Convention</Menu.Item>

            </SubMenu>
            <SubMenu key="sub8" icon={<WalletOutlined/>} title="GMQ">
                <Menu.Item onClick={() => history.push("/gmq-01")} key="26">Fiche de non-conformité</Menu.Item>
                <Menu.Item onClick={() => history.push("/gmq-02")} key="27">Bordereau de diffusion</Menu.Item>
                <Menu.Item key="28">Fiche indicateur</Menu.Item>
                <Menu.Item key="29">Etat des actions d'amélioration</Menu.Item>
                <Menu.Item onClick={() => history.push("/gmq-09")} key="30">PV</Menu.Item>
            </SubMenu>
        </Menu>
    </>
};

export default withRouter(MenuLink);
