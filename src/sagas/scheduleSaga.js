import {call, put, takeLatest } from 'redux-saga/effects';
import * as types from '../redux/constants/action-types';
import { showLoading, hideLoading } from '../redux/actions/index';
import { allSchedule } from '../apis/user';
import {getListScheduleSuccess} from '../redux/actions/schedule.action';

function* getListSchedule({ payload }) {
    const { user_id } = payload;
    yield put(showLoading());
    const resp = yield call(allSchedule, {
        user_id: user_id,
    });
    const { data } = resp;
    if (data.code == 1) {
        console.log('schedule day ne');
        yield put(getListScheduleSuccess(data.listschedule));
    }
    else {
        console.log('error');
    }
    // yield delay(100);
    yield put(hideLoading());
}

export function* watchgetSchedule() {
    yield takeLatest(types.GET_SCHEDULE_REQUEST, getListSchedule);
}