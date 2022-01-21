import React from "react";
import Header from "./header/header";
import Container from "./container/container";
import {useLocation} from "react-router";

function useQuery() {
    return new URLSearchParams(useLocation().search);
}

function Main() {
    const query = useQuery().get("lot");
    if (!["Technique", "Structure", "VRD", "Metreur"].includes(atob(query))) return null;

    return (
        <div id="printer" className="container">
            <Header/>
            <hr/>
            <Container/>
        </div>);
}

export default Main;

