import * as types from './../constants/action-types';

export function getListNotifiRequest (user_id) { 
    return {
      type: types.GET_NOTIFI,
      payload: {user_id},
      
    }
}

export const getListNotifiSuccess = (notifiList) => {
    return {
        type: types.GET_NOTIFI_SUCCESS,
        payload: {notifiList},
    }
};

export const remoteNoti10before = (noti10mintuesbefore) => {
    return {
        type: types.NOTI_10BEFORE,
        noti10mintuesbefore,
    }
};

export const remoteNoti30before = (noti30mintuesbefore) => {
    return {
        type: types.NOTI_30BEFORE,
       noti30mintuesbefore
    }
};
export const remoteNoti1hourbefore = (noti1hourbefore) => {
    return {
        type: types.NOTI_1HOURBEFORE,
       noti1hourbefore
    }
};
export const remoteNoti1daybefore = (noti1daybefore) => {
    return {
        type: types.NOTI_1DAYBEFORE,
       noti1daybefore
    }
};
export const remoteNotimail = (mailNoti) => {
    return {
        type: types.MAIL_NOTI,
       mailNoti
    }
};
export const remoteNotiiphone = (iphoneNoti) => {
    return {
        type: types.IPHONE_NOTI,
        iphoneNoti
    }
};
