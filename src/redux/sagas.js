import {takeEvery, put, call} from 'redux-saga/effects';
import {REQUEST_POSTS} from "./types";
import {hideLoader, showAlert, showLoader} from "./actions";

export function* sagasWatcher() {
    yield takeEvery(REQUEST_POSTS, sagaWorker)
}

function* sagaWorker() {
    try {
        yield put(showLoader()) // put used in saga like dispatch
        const payload = yield call(fetchPosts)
        yield put({type: REQUEST_POSTS, payload})
        yield put(hideLoader())
    } catch (e) {
        yield put(showAlert('Something goes wrong!!!'))
        yield put(hideLoader())
    }
}

async function fetchPosts() {
    const response = await fetch('https://jsonplaceholder.typicode.com/posts?_limit=5');
    return await response.json();
}


