import {call, put, takeEvery, takeLatest, takeLeading, delay } from 'redux-saga/effects';
import axios from 'axios';
import * as types from '../redux/constants/action-types';
import { showLoading, hideLoading, loginUserSuccess, loginUserFail, registerUserFail, registerUserSuccess, logoutSuccess, sendMailSuccess, sendMailFail } from '../redux/actions/index';
// import {}
import { login, register, sendMailPass, logoutUser } from '../apis/user';
import AsyncStorage from '@react-native-async-storage/async-storage';
const storeData = async (value) => {
    try {
      const jsonValue = JSON.stringify(value);
      console.log('setlaij value moi', jsonValue);
      await AsyncStorage.setItem('@user', jsonValue);
    } catch (e) {
      // saving error
      console.log('save error');
    }
  }
function* loginUs({ payload, props }) {
    const { username, password, notifiToken } = payload;
    yield put(showLoading());
    try {
        const resp = yield call(login, {
            username: username,
            password: password,
            notifiToken: notifiToken
        });
        const { data } = resp;
        if (data.code == 1) {
        storeData(data.user);
            yield put(loginUserSuccess(data.user));
            props.navigation.navigate("Drawer",{navigation: props});
        }
        else {
            yield put(loginUserFail(data.error));
        }
        yield delay(100);
        yield put(hideLoading());
    } catch (e) {
        console.log('error', JSON.stringify(e));
    }
}

function *registerUs({ payload }) {
    const { username, email, password } = payload;
    yield put(showLoading());
    const resp = yield call(register, {
        username, 
        email,
        password
    });
    const { data } = resp;
    if (data.code == 1) {
        yield put(registerUserSuccess(data.success));
    }
    else {
        yield put(registerUserFail(data.error));
    }
    yield delay(100);
    yield put(hideLoading());
}

function *sendMail({ payload, props }) {
    const { email } = payload;
    yield put(showLoading());
    const resp = yield call(sendMailPass, {
        email: email
    });
    const { data } = resp;
    console.log('DATA NE ', data);
    if (data.code === 1) {
        yield put(sendMailSuccess(data.success));
        props.navigation.navigate("VerifyCode", {props, email: email});
    }
    else {
        yield put(sendMailFail(data.error));
    }
    yield delay(100);
    yield put(hideLoading());
}

function* logoutUserss({ payload, props }) {
    const { id } = payload;
    // console.log('user saga logout', token);
    yield put(showLoading());
    const resp = yield call(logoutUser, {
      id
    });
    const { data } = resp;
    if (data.code == 1) {
        storeData({});
        console.log('logout succs')
;        yield put(logoutSuccess({}));
        props.navigation.navigate("Login");
    }
    else {
        console.log('logout error');
    }
    yield delay(100);
    yield put(hideLoading());
    
}

export function* watchLoginUser() {
    yield takeLatest(types.LOGIN_REQUESTING, loginUs);
}

export function* watchRegisterUser() {
    yield takeLatest(types.REGISTER_REQUESTING, registerUs);
}

export function* watchLogoutUser() {
    yield takeLatest(types.LOGOUT_USER, logoutUserss);
}

export function* watchsendMail() {
    yield takeLatest(types.PASSWORD_REQUESTING, sendMail);
}