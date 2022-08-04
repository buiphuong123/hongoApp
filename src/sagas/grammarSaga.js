import {call, put, takeLatest, delay } from 'redux-saga/effects';
import * as types from '../redux/constants/action-types';
import { showLoading, hideLoading } from '../redux/actions/index';
import { allcomment, getGra } from '../apis/user';
import {getListCommentSuccess} from '../redux/actions/comment.action'
import { getGrammarSuccess } from '../redux/actions/grammar.action';

function* getGrammar({ payload, navigation }) {
    const { id } = payload;
    yield put(showLoading());
    const resp = yield call(getGra, {
        id: id
    });
    const { data } = resp;
    if (data.code == 1) {
        yield put(getGrammarSuccess(data.grammar));
        // navigation.navigate("GrammarScr");
        // navigation.navigate("HomeGrammar");
    }
    else {
        yield put(getGrammarFail(data.error));
    }
    // yield delay(100);
    yield put(hideLoading());
}

function* getComment({payload}) {
    const {grammar_id, user_id} = payload;
    yield put(showLoading());
    const resp = yield call(allcomment, {
        grammar_id,
        user_id
    });
    const { data } = resp;
    if(data.code === 1) {
        yield put(getListCommentSuccess(data.comment));
    }
    yield put(hideLoading());
}


export function* watchgetGrammar() {
    yield takeLatest(types.GET_GRAMMAR, getGrammar);
}
export function* watchgetComment() {
    yield takeLatest(types.GET_LIST_COMMENT_REQUEST, getComment);
}

