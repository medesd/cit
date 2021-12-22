import 'regenerator-runtime/runtime';

import {watchFetchPost} from './PostsSagas';

// Root sagas
// Single entry point to start all sagas at once
export default function* rootSaga() {
    yield [
        watchFetchPost()
    ];
}
