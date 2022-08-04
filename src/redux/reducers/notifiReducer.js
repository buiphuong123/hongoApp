import * as types from './../constants/action-types';

const initState = { 
    notifiList: [],
    noti10mintuesbefore: 'checked',
    noti30mintuesbefore: 'unchecked',
    noti1hourbefore: 'unchecked',
    noti1daybefore: 'unchecked',
    mailNoti: true,
    iphoneNoti: false,

 }
const notifiReducer = (state = initState, action) => {
    switch (action.type) {
        case types.GET_NOTIFI: {
            return {
                ...state,
            }
        }

        case types.GET_NOTIFI_SUCCESS: {
            const data = action.payload;
            return {
                ...state,
                notifiList: data.notifiList,
            }
        }

        case types.NOTI_10BEFORE: {
            return {
                ...state,
                noti10mintuesbefore: action.noti10mintuesbefore,
            }
        }
        
        case types.NOTI_30BEFORE: {
            return {
                ...state,
                noti30mintuesbefore: action.noti30mintuesbefore,
            }
        }
        case types.NOTI_1HOURBEFORE: {
            return {
                ...state,
                noti1hourbefore: action.noti1hourbefore,
            }
        }
        case types.NOTI_1DAYBEFORE: {
            return {
                ...state,
                noti1daybefore: action.noti1daybefore,
            }
        }
        case types.MAIL_NOTI: {
            return {
                ...state,
                mailNoti: action.mailNoti,
            }
        }
        case types.IPHONE_NOTI: {
            return {
                ...state,
                iphoneNoti: action.iphoneNoti,
            }
        }
        default: 
            return state;
    }
}
export default notifiReducer;