import * as types from './../constants/action-types';

export function getPostRequest(id) {
    return {
        type: types.GET_POST,
        payload: {id}
    }
}

export const getListPostSuccess = (listPost) => {
    return {
        type: types.GET_POST_SUCCESS,
        payload: {listPost},
    }
};