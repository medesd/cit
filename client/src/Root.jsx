import React from "react";
import App from "./App";
import axios from "axios";
import Auth from "./auth";


axios.defaults.baseURL = 'http://localhost:8080';
axios.defaults.headers.common['Authorization'] = localStorage.getItem("type") + " " + localStorage.getItem("token");
axios.defaults.headers.post['Content-Type'] = 'application/json';
const Root = () => {
    if (localStorage.getItem("type") && localStorage.getItem("token"))
        return <App/>
    else return <Auth/>
}
export default Root;
