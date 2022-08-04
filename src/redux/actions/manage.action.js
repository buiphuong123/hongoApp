import * as types from './../constants/action-types';

export const RemoteManage = (isManage) => {
    return {
        type: types.IS_MANAGE,
        isManage
    }
}