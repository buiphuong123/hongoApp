import * as types from './../constants/action-types';

const initState = {
    isManage: true,
}

const manageReducer = (state= initState, action) => {
    switch(action.type) {
        case types.IS_MANAGE: {
            return {
                ...state,
                isManage: action.isManage
            }
        }
        
      
        default: 
        return state;
    }
}

export default manageReducer;