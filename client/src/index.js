import React from 'react';
import ReactDOM from 'react-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Provider} from 'react-redux';
import {store} from './redux/store';
import 'antd/dist/antd.css';
import 'antd-button-color/dist/css/style.css';
import Root from "./Root";
import './index.css';
import {ConfigProvider} from 'antd';
import frFR from 'antd/lib/locale/fr_FR';
import {Router} from "react-router";
import {createBrowserHistory} from "history";

const history = createBrowserHistory();

ReactDOM.render(
    <Provider store={store}>
        <ConfigProvider locale={frFR}>
            <Router history={history}>
                <Root/>
            </Router>
        </ConfigProvider>
    </Provider>,
    document.getElementById('root')
);
