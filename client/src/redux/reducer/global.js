import * as types from '../actions/actionTypes';
import moment from "moment";

const currencyReducer = (state = [], action) => {
    switch (action.type) {
        case types.AddEvent:
            return [...state, action.payload]
        case types.ReplaceEvent:
            return action.payload
        case types.EditEvent:
            const prev = state.filter(f => f.countKey !== action.payload.countKey);
            return [...prev, action.payload]
        default:
            return state;
    }
}


const projectReducer = (state = [], action) => {
    switch (action.type) {
        case types.AddProject:
            return [action.payload]
        default:
            return state;
    }
}

const dataReducer = (state = {
    names: [],
    date: moment().format('DD/MM/YYYY'),
    days: [],
    element: [],
    projects: [],
    currentEmp: null
}, action) => {
    switch (action.type) {
        case types.SetDataDate:
            return {...state, date: action.payload}
        case types.SetDataDays:
            return {...state, days: action.payload}
        case types.SetDataCurrentEmp:
            return {...state, currentEmp: action.payload}
        case types.SetDataNames:
            return {...state, names: action.payload}
        case types.SetDataProjects:
            return {...state, projects: action.payload}
        case types.AddDataElements:
            return {...state, element: action.payload}
        case types.SetDataElement:
            const current = [...new Set(state.element)].filter(s => s.id !== action.payload.id);
            return {...state, element: [...current, action.payload]}
        default:
            return state;
    }
}


const headerTitle = (state = null, action) => {
    switch (action.type) {
        case types.SetHeaderTitle:
            return action.payload;
        default:
            return state;
    }
}

export {currencyReducer, projectReducer, dataReducer, headerTitle};
