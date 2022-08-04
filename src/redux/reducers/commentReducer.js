import * as types from './../constants/action-types';

const initState = { 
    commentList: [],
    commentWordList: [],
    commentKanjiList: [],
    allCommentWord: [],
    allCommentKanji: [],
    allCommentGrammar: [],
 }
const commentReducer = (state = initState, action) => {
    switch (action.type) {
        case types.GET_LIST_COMMENT_REQUEST: {
            return {
                ...state,
            }
        }

        case types.GET_LIST_COMMENT: {
            const data = action.payload;
            return {
                ...state,
                commentList: data.commentList,
            }
        }

        case types.GET_LIST_WORD_COMMENT_REQUEST: {
            return {
                ...state,
            }
        }

        case types.GET_LIST_WORD_COMMENT: {
            const data = action.payload;
            return {
                ...state,
                commentWordList: data.commentWordList,
            }
        }

        case types.GET_LIST_KANJI_COMMENT_REQUEST: {
            return {
                ...state,
            }
        }

        case types.GET_LIST_KANJI_COMMENT_SUCCESS: {
            const data = action.payload;
            return {
                ...state,
                commentKanjiList: data.commentKanjiList,
            }
        }

        case types.ALL_COMMENT_WORD: {
            return {
                ...state,
                allCommentWord: action.allCommentWord,
            };
        }
        case types.ALL_COMMENT_GRAMMAR: {
            return {
                ...state,
                allCommentGrammar: action.allCommentGrammar,
            };
        }
        case types.ALL_COMMENT_KANJI: {
            return {
                ...state,
                allCommentKanji: action.allCommentKanji,
            };
        }


        
        default: 
            return state;
    }
}
export default commentReducer;