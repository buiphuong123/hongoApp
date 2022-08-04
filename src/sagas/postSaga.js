import {call, put, takeLatest, delay } from 'redux-saga/effects';
import * as types from '../redux/constants/action-types';
import { allPost } from '../apis/user';
import { getListPostSuccess} from '../redux/actions/post.action';
import { showLoading, hideLoading} from '../redux/actions/index';
import AsyncStorage from '@react-native-async-storage/async-storage';

// const storePost = async (value) => {
//     try {
//     //   const jsonValue = JSON.stringify(value);
//       await AsyncStorage.setItem('@post',JSON.stringify(value));
//       console.log('save post success');
//     } catch (e) {
//       // saving error
//       console.log('save error', e);
//     }
//   }
function* getListPost({payload}) {
    const {id} = payload;
    // yield put(showLoading());
    const resp = yield call(allPost, {
        id: id
    });
    const { data } = resp;
    if(data.code === 1) {
    //   console.log(data.postData);
        // storePost(data.postData);
        yield put(getListPostSuccess(data.postData));
    }
    else {
        console.log('error');
    }
    // yield put(hideLoading());
}

export function* watchgetPost() {
    yield takeLatest(types.GET_POST, getListPost);
}
