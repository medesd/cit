import {call, put, takeEvery} from 'redux-saga/effects';
import axios from 'axios';
import * as types from './actions/actionTypes';

const ROOT_URL = '/api/';

// Watcher sagas
// Listen for an action and run the appropriate Worker saga
export function* watchFetchPost() {
    yield takeEvery(types.AddProject, workFetchPost);
}


export function* workFetchPost() {
    try {
        // Try to call the API
        const uri = `${ROOT_URL}/project-names`;
        const response = yield call(axios.get, uri);

        // Dispatch the action to
        // the reducers
        yield put({
            type: types.AddProject,
            payload: response.data
        });
    } catch (error) {
        // Act on the error
    }
}
