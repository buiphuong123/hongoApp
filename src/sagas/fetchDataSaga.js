import { call, put, takeEvery } from 'redux-saga/effects';
import * as types from '../redux/constants/action-types';
import axios from 'axios';
import { fetchDataSuccess, fetchDataFailure } from '../redux/actions/index';

function* ayscFetchDataRequest(action) {
    try{
        const url = `https://language-backend.vercel.app/getWord/${action.payload}`;
        // console.log('duowng dan day nhe' + "https://language-backend.vercel.app/getWord/"+ action.payload)
        const response = yield call(()=> axios.get(url));
        // console.log(response.data);
        yield put(fetchDataSuccess(response.data));
    }
    catch(error) {
        yield put(fetchDataFailure(error));
    }
}
export function *watchFetchDataSaga() {
    yield takeEvery( types.SEND_REQUEST, ayscFetchDataRequest)

}