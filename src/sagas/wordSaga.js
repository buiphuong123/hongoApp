import {call, put, takeLatest, delay } from 'redux-saga/effects';
import * as types from '../redux/constants/action-types';
import { showLoading, hideLoading } from '../redux/actions/index';
import { allWord, allwordcomment } from '../apis/user';
import { getListWordCommentSuccess} from '../redux/actions/comment.action'
import {getListWordRequest, getListWordSuccess, getListWordLevel} from '../redux/actions/word.action';
import AsyncStorage from '@react-native-async-storage/async-storage';
import RNFS from 'react-native-fs';
import WordController from '../realm/controller/word.controller';

const makeFile = async (filePath, content) => {
    try {
      //create a file at filePath. Write the content data to it
      await RNFS.writeFile(filePath,JSON.stringify(content), "utf8");
      console.log("written to file");
    } catch (error) { //if the function throws an error, log it out.
      console.log(error);
    }
  };
// function* getLocalWords({payload}) {
//     const {id} = payload;
//     try {
//         yield put(showLoading());
//         let result = [];
//         const listWord = yield call(WordController.getListWord);
//         if(listWord.length===0) {
//             yield call(getWord, id);
            
//         }
//         else {
//             yield put(getListWordSuccess(listWord));
//         }
        
//         console.log(listWord);
//     } catch (error) {
//     console.log("🚀 ~ file: wordSaga.js ~ line 26 ~ function*getLocalWords ~ error", error)
        
//     } finally{
//         yield put(hideLoading());
//     }
// } 
// /**
//  * lưu dl từ server về localdata
//  * @param {*} param0 
//  */
// function* saveLocal(listWord) {
//     try {
//         yield call(WordController.saveListWord, listWord);
        
//     } catch (error) {
//     console.log("🚀 ~ file: wordSaga.js ~ line 42 ~ function*saveLocal ~ error", error)
        
//     }
// }

function* getWord({payload}) {
    // const filePath = RNFS.DocumentDirectoryPath + "/listword.txt"; //absolute path of our file
    const { id } = payload;
    // yield put(showLoading());
    const resp = yield call(allWord, {
        id: id,
    });
    const { data } = resp;

    if (data.code == 1) {
        yield put(getListWordSuccess(data.wordData));
        // yield call(saveLocal, data.wordData);

    }
    else {
        console.log('error');
    }
    // yield delay(100);
    yield put(hideLoading());
}

function* getWordComment({payload}) {
    const {word_id, user_id} = payload;
    console.log('vao word comment khong');
    yield put(showLoading());
    const resp = yield call(allwordcomment, {
        word_id,
        user_id
    });
    const { data } = resp;
    console.log('ô đcm');
    if(data.code === 1) {
        yield put(getListWordCommentSuccess(data.comment));
    }
    yield put(hideLoading());
}

// export function* watchgetWordLocal() {
//     yield takeLatest(types.GET_LIST_WORD_LOCAL, getLocalWords);
// }
export function* watchgetWord() {
    yield takeLatest(types.GET_LIST_WORD_REQUEST, getWord);
}

export function* watchgetWordComment() {
    yield takeLatest(types.GET_LIST_WORD_COMMENT_REQUEST, getWordComment);
}

