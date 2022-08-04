import * as types from './../constants/action-types';

const initState = {
    listPost: [],
}

const postReducer = (state= initState, action) => {
    switch(action.type) {
        case types.GET_POST: {
            return {
                ...state,
            }
        }
        
        case types.GET_POST_SUCCESS: {
            const data = action.payload;
            return {
                ...state,
                listPost: data.listPost,
            }
        }
        default: 
        return state;
    }
}

export default postReducer;