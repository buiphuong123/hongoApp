import axios from 'axios';
import { API_ENDPOINT } from '../../constants';
import * as types from './../constants/action-types';

export function getListCommentRequest (grammar_id, user_id) { 
    return {
      type: types.GET_LIST_COMMENT_REQUEST,
      payload: {grammar_id, user_id},
      
    }
}

export const getListCommentSuccess = (commentList) => {
    return {
        type: types.GET_LIST_COMMENT,
        payload: {commentList},
    }
};

export function getListWordCommentRequest (word_id, user_id) { 
    console.log('vao day ne');
    return {
      type: types.GET_LIST_WORD_COMMENT_REQUEST,
      payload: {word_id, user_id},
      
    }
}

export const getListWordCommentSuccess = (commentWordList) => {
    return {
        type: types.GET_LIST_WORD_COMMENT,
        payload: {commentWordList},
    }
};

export function getListKanjiCommentRequest (kanji_id, user_id) { 
    return {
      type: types.GET_LIST_KANJI_COMMENT_REQUEST,
      payload: {kanji_id, user_id},
      
    }
}

export const getListKanjiCommentSuccess = (commentKanjiList) => {
    // console.log('ben comment action', commentKanjiList);
    return {
        type: types.GET_LIST_KANJI_COMMENT_SUCCESS,
        payload: {commentKanjiList},
    }
};

export const getAllcommentWord = (allCommentWord) => {
    return {
        type: types.ALL_COMMENT_WORD,
        allCommentWord
    }
}
export const getAllcommentGrammar = (allCommentGrammar) => {
    return {
        type: types.ALL_COMMENT_GRAMMAR,
        allCommentGrammar
    }
}
export const getAllcommentKanji = (allCommentKanji) => {
    return {
        type: types.ALL_COMMENT_KANJI,
        allCommentKanji
    }
}
