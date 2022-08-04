import {call, put, takeLatest, delay } from 'redux-saga/effects';
import * as types from '../redux/constants/action-types';
import { showLoading, hideLoading,  } from '../redux/actions/index';
import { allGrammarQuestion } from '../apis/user';
import {getListQuestionSuccess} from '../redux/actions/grammarquestion.action'

function* getGrammarQuestion({ payload, navigation }) {
    const { grammar_id } = payload;
    yield put(showLoading());
    const resp = yield call(allGrammarQuestion, {
        grammar_id: grammar_id
    });
    const { data } = resp;
    if (data.code == 1) {
        yield put(getListQuestionSuccess(data.question));
        navigation.navigate("ChooseAnswer", {grammar_id: grammar_id});
    }
    else {
        console.log('error');
    }
    // yield delay(100);
    yield put(hideLoading());
}


export function* watchgetGrammarQuestion() {
    yield takeLatest(types.GET_QUESTION_REQUEST, getGrammarQuestion);
}
