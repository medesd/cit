import * as types from './actionTypes';

export function addEvent(payload) {
    return {type: types.AddEvent, payload: payload};
}


export function editEvent(payload) {
    return {type: types.EditEvent, payload: payload};
}

export function addProject(payload) {
    return {type: types.AddProject, payload: payload}
}


export function setDataDate(payload) {
    return {type: types.SetDataDate, payload: payload}
}


export function setDataDays(payload) {
    return {type: types.SetDataDays, payload: payload}
}


export function setDataCurrentEmp(payload) {
    return {type: types.SetDataCurrentEmp, payload: payload}
}


export function setDataElement(payload) {
    return {type: types.SetDataElement, payload: payload}
}


export function setDataProjects(payload) {
    return {type: types.SetDataProjects, payload: payload}
}

export function setDataNames(payload) {
    return {type: types.SetDataNames, payload: payload}
}

export function addDataElements(payload) {
    return {type: types.AddDataElements, payload: payload}
}

export function replaceEvent(payload) {
    return {type: types.ReplaceEvent, payload: payload}
}


export function setHeaderTitle(payload) {
    return {type: types.SetHeaderTitle, payload: payload}
}
