import * as types from './../constants/action-types';

const initState = { 
    questionList: [],
 }
const grammarquestionReducer = (state = initState, action) => {
    switch (action.type) {
        case types.GET_QUESTION_REQUEST: {
            return {
                ...state,
            }
        }

        case types.GET_QUESTION_SUCCESS: {
            const data = action.payload;
            return {
                ...state,
                questionList: data.questionList,
            }
        }
        
        default: 
            return state;
    }
}
export default grammarquestionReducer;