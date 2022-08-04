import * as types from './../constants/action-types';

export function getListScheduleRequest (user_id) {
    return {
        type: types.GET_SCHEDULE_REQUEST,
        payload: {user_id},
    }
}

export const getListScheduleSuccess = (scheduleList) => {
    console.log('goi o day r nhe');
    console.log('SCHEDULE LIST LA ', scheduleList);
    return {
        type: types.GET_SCHEDULE_SUCCESS,
        payload: {scheduleList}
    }
}