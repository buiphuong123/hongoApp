import * as types from './../constants/action-types';

const kanjiAc = {
    kanjiList: [],
    kanjilevel: [],
    isAll: 'checked',
    isMemerize: 'unchecked', 
    isNotMemerize: 'unchecked',
    isLike: 'unchecked',
};

var kanjiReducer = (state = kanjiAc, action) => {
    switch (action.type) {
        case types.GET_LIST_KANJI_REQUEST: {
            return {
                ...state,
            };
        }
        case types.GET_LIST_KANJI_SUCCESS: {
            const data = action.payload;
            return {
                ...state,
                kanjiList: data.kanjiList,
            }
        }
        case types.GET_LIST_KANJI_LEVEL_SUCCESS: {
            return {
                ...state,
                kanjilevel: action.kanjilevel,
            }
        }

        case types.ALL_KANJI_LIST: {
            return { 
                ...state,
                isAll: action.isAll,
            };
        }
        case types.ALL_MEMERIZE_KANJI: {
            return { 
                ...state,
                isMemerize: action.isMemerize,
            };
        }
        case types.ALL_NOTMEMERIZE_KANJI: {
            return { 
                ...state,
                isNotMemerize: action.isNotMemerize,
            };
        }
        case types.ALL_LIKE_KANJI: {
            return { 
                ...state,
                isLike: action.isLike,
            };
        }
        default:
            return state;
    }
}

export default kanjiReducer;