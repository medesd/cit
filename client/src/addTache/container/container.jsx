import React from 'react';
import Gantt from './chart/gantt';
import LocalModel from './insert/LocalModel';

function Container() {
    return (<div className="container">
            <LocalModel/>
            <Gantt/>
        </div>
    );
}

export default Container;
