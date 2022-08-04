import * as types from './../constants/action-types';

export function getListQuestionRequest ( grammar_id, navigation ) { 
    return {
      type: types.GET_QUESTION_REQUEST,
      payload: {grammar_id},
      navigation
    }
}

export const getListQuestionSuccess = (questionList) => {
    return {
        type: types.GET_QUESTION_SUCCESS,
        payload: {questionList},
    }
};
