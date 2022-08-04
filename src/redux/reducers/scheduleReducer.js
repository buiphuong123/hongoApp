import * as types from './../constants/action-types';

const initState = {
    scheduleList : {},
}

const scheduleReducer = (state = initState, action) => {
    switch(action.type) {
        case types.GET_SCHEDULE_REQUEST: {
            return {
                ...state,
            };
        }

        case types.GET_SCHEDULE_SUCCESS: {
            const data= action.payload;
            return {
                ...state,
                scheduleList: data.scheduleList,
            }
        }
        default: 
            return state;
    }
}

export default scheduleReducer;