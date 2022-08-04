import * as types from './../constants/action-types';

export const getListGrammarLevel = (grammarlevel) => {
    return {
        type: types.GET_LIST_GRAMMAR_LEVEL_SUCCESS,
        grammarlevel
    }
};

export function getGrammarRequest (id) { 
    return {
      type: types.GET_GRAMMAR,
      payload: {id}
    }
}

export const getGrammarSuccess = (grammarList) => {
    return {
        type: types.GET_GRAMMAR_SUCCESS,
        payload: { grammarList },
    }
}

export const getGrammarFail = (error) => {
    return {
        type: types.GET_GRAMMAR_FAIL,
        payload: {error}
    }
}
