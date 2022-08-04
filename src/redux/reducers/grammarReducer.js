import * as types from './../constants/action-types';

const initState = { 
    grammarList: [],
    grammarlevel: [],
 }
const grammarReducer = (state = initState, action) => {
    switch (action.type) {
        case types.GET_GRAMMAR: {
            return {
                ...state,
            }
        }

        case types.GET_GRAMMAR_SUCCESS: {
            const data = action.payload;
            return {
                ...state,
                grammarList: data.grammarList,
            }
        }

        case types.GET_LIST_GRAMMAR_LEVEL_SUCCESS: {
            return {
                ...state,
                grammarlevel: action.grammarlevel,
            }
        }
        
        default: 
            return state;
    }
}
export default grammarReducer;