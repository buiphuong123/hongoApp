import * as types from './../constants/action-types';

const vocabularyAc = {
    vocabularyList: [],
   vocabularyShare: [],
};

var vocabularyReducer = (state = vocabularyAc, action) => {
    switch (action.type) {
        case types.GET_LIST_VOCABULARY_REQUEST: {
            return {
                ...state,
            };
        }
        case types.GET_LIST_VOCABULARY_SUCCESS: {
            const data = action.payload;
            return {
                ...state,
                vocabularyList: data.vocabularyList,
            }
        }
        case types.GET_LIST_VOCABULARY_SHARE_REQUEST: {
            return {
                ...state,
            };
        }
        case types.GET_LIST_VOCABULARY_SHARE_SUCCESS: {
            const data = action.payload;
            return {
                ...state,
                vocabularyShare: data.vocabularyShare,
            }
        }
        
        default:
            return state;
    }
}

export default vocabularyReducer