import * as types from './../constants/action-types';

export function getListVocaRequest (user_id) { 
    return {
      type: types.GET_LIST_VOCABULARY_REQUEST,
      payload: {user_id},
      
    }
}

export const getListVocaSuccess = (vocabularyList) => {
    return {
        type: types.GET_LIST_VOCABULARY_SUCCESS,
        payload: {vocabularyList},
    }
};
export function getListShareVocaRequest (user_id) { 
    return {
      type: types.GET_LIST_VOCABULARY_SHARE_REQUEST,
      payload: {user_id},
      
    }
}

export const getListShareVocaSuccess = (vocabularyShare) => {
    return {
        type: types.GET_LIST_VOCABULARY_SHARE_SUCCESS,
        payload: {vocabularyShare},
    }
};
