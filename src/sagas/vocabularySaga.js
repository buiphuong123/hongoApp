import {call, put, takeLatest } from 'redux-saga/effects';
import * as types from '../redux/constants/action-types';
import { showLoading, hideLoading } from '../redux/actions/index';
import { allVocabulary, allshareVocabulary } from '../apis/user';
import {getListVocaSuccess, getListShareVocaSuccess} from '../redux/actions/vocabulary.action';

function* getListVocabulary({ payload }) {
    const { user_id } = payload;
    // yield put(showLoading());
    const resp = yield call(allVocabulary, {
        user_id: user_id,
    });
    const { data } = resp;
    if (data.code == 1) {
        yield put(getListVocaSuccess(data.vocabulary));
    }
    else {
        console.log('vocabulary error');
    }
    // yield delay(100);
    // yield put(hideLoading());
}

function* getListShareVocabulary({ payload }) {
    const { user_id } = payload;
    // yield put(showLoading());
    const resp = yield call(allshareVocabulary, {
        user_id: user_id,
    });
    const { data } = resp;
    if (data.code == 1) {
        yield put(getListShareVocaSuccess(data.vocabulary));
    }
    else {
        console.log('vocabulary error');
    }
    // yield delay(100);
    // yield put(hideLoading());
}

export function* watchgetVocabulary() {
    yield takeLatest(types.GET_LIST_VOCABULARY_REQUEST, getListVocabulary);
}
export function* watchgetshareVocabulary() {
    yield takeLatest(types.GET_LIST_VOCABULARY_SHARE_REQUEST, getListShareVocabulary);
}