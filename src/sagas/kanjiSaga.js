import {call, put, takeLatest } from 'redux-saga/effects';
import * as types from '../redux/constants/action-types';
import { showLoading, hideLoading } from '../redux/actions/index';
import { allKanji, allkanjicomment } from '../apis/user';
import {getListKanjiSuccess} from '../redux/actions/kanji.action';
import {getListKanjiCommentSuccess} from '../redux/actions/comment.action';

function* getKanji({ payload}) {
    const { id } = payload;
    // yield put(showLoading());
    const resp = yield call(allKanji, {
        id: id,
    });
    const { data } = resp;
    if (data.code == 1) {
        yield put(getListKanjiSuccess(data.kanjiData));
    }
    else {
        console.log('error');
    }
    // yield delay(100);
    // yield put(hideLoading());
}

function* getKanjiComment({payload}) {
    const {kanji_id, user_id} = payload;
    yield put(showLoading());
    const resp = yield call(allkanjicomment, {
        kanji_id,
        user_id
    });
    const { data } = resp;
    if(data.code === 1) {
        yield put(getListKanjiCommentSuccess(data.comment));
    }
    else {
        console.log('error');
    }
    yield put(hideLoading());
}


export function* watchgetKanji() {
    yield takeLatest(types.GET_LIST_KANJI_REQUEST, getKanji);
}


export function* watchgetCommentKanji() {
    yield takeLatest(types.GET_LIST_KANJI_COMMENT_REQUEST, getKanjiComment);
}
