import * as types from './../constants/action-types';

export function getListKanjiRequest (id, navigation) {
    return {
        type: types.GET_LIST_KANJI_REQUEST,
        payload: { id },
        navigation
    }
}
export const getListKanjiSuccess = (kanjiList) => {
    return {
        type: types.GET_LIST_KANJI_SUCCESS,
        payload: {kanjiList},
    }
};
export const getListKanjiLevel = (kanjilevel) => {
    return {
        type: types.GET_LIST_KANJI_LEVEL_SUCCESS,
        kanjilevel
    }
};

export const RemoteMemerizeKanji = (isMemerize)=> {
    return {
        type: types.ALL_MEMERIZE_KANJI,
        isMemerize
    }
}
export const RemoteNotMemerizeKanji = (isNotMemerize)=> {
    return {
        type: types.ALL_NOTMEMERIZE_KANJI,
        isNotMemerize
    }
}
export const RemoteLikeKanji = (isLike)=> {
    return {
        type: types.ALL_LIKE_KANJI,
        isLike
    }
}

export const RemoteAllKanji = (isAll)=> {
    return {
        type: types.ALL_KANJI_LIST,
        isAll
    }
}

