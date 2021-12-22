import {createStore, compose, applyMiddleware, combineReducers} from 'redux'
import {currencyReducer, headerTitle, projectReducer, dataReducer} from './reducer/global';
import createSagaMiddleware from 'redux-saga'
import sagas from './sagas';

const sagaMiddleware = createSagaMiddleware();
// Add all middlewares into an array
const middleware = [sagaMiddleware];

// Add the Redux dev tools and middleware code together
const enhancers = compose(
    applyMiddleware(...middleware),
    window.__REDUX_DEVTOOLS_EXTENSION__ ? window.__REDUX_DEVTOOLS_EXTENSION__() : f => f
);


export const store = createStore(combineReducers({
    currencyReducer,
    headerTitle,
    projectReducer,
    dataReducer
}), enhancers)
sagaMiddleware.run(sagas);
