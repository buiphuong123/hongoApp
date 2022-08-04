import * as types from './../constants/action-types';
var wordAc = {
    isWord: true, 
    isAll: 'checked',
    isHira: true,
    isKanji: false,
    isMean: true,
    isReverse: false,
    isMemerize: 'unchecked', 
    isNotMemerize: 'unchecked',
    isLike: 'unchecked',
    wordList: [],
    wordlevel: [],
    //flashcard
    wordBeforeFlashcard: 'checked',
    meanBeforeFlashcard: 'unchecked',
    spellBeforeFlashcard: 'unchecked',// phien âm
    wordAfterFlashcard: true,
    meanAfterFlashcard: true,
    spellAfterFlashcard: true,
    imageFlashcard: false,
    exampleFlashcard: false,
    meanExampleFlashcard: false,

    isN5: 'checked',
    isN4: 'unchecked',
    isN3: 'unchecked',
    isN2: 'unchecked',

    isN5test: true,
    isN4test: false,
    isN3test: false,
    isN2test: false,

    isAlltest: 'checked',
    isMemerizetest: 'unchecked',
    isNotMemerizetest: 'unchecked',
    islikeTest: 'unchecked',

    ischooseQuestion: 'checked',
    isjoinQuestion: 'unchecked',

    textVocabulary: ""
};

var wordReducer = (state = wordAc, action) => {
    switch (action.type) {
        case types.WORD_VOCABULARY : {
            return {
                ...state,
                textVocabulary: action.textVocabulary,
            }
        }
        case types.WORD: {
            return { 
                ...state,
                isWord: action.isWord,
            };
        }
        case types.ALL_WORD: {
            return { 
                ...state,
                isAll: action.isAll,
            };
        }
        case types.ALL_HIRA: {
            return { 
                ...state,
                isHira: action.isHira,
            };
        }
        case types.ALL_KANJI: {
            return { 
                ...state,
                isKanji: action.isKanji,
            };
        }
        case types.ALL_MEAN: {
            return { 
                ...state,
                isMean: action.isMean,
            };
        }
        case types.ALL_REVERSE: {
            return { 
                ...state,
                isReverse: action.isReverse,
            };
        }
        case types.ALL_MEMERIZE: {
            return { 
                ...state,
                isMemerize: action.isMemerize,
            };
        }
        case types.ALL_NOTMEMERIZE: {
            return { 
                ...state,
                isNotMemerize: action.isNotMemerize,
            };
        }
        case types.ALL_LIKE: {
            return { 
                ...state,
                isLike: action.isLike,
            };
        }
        case types.GET_LIST_WORD_REQUEST: {
            return { 
                ...state,
            };
        }
        case types.GET_LIST_WORD_SUCCESS: {
            const data = action.payload;
            return {
                ...state,
                wordList: data.wordList,
            }
        }

        case types.GET_LIST_WORD_LEVEL_SUCCESS: {
            return {
                ...state,
                wordlevel: action.wordlevel,
            }
        }

        // flashcard
        case types.WORD_FLASHCARD_BEFORE: {
            return { 
                ...state,
                wordBeforeFlashcard: action.wordBeforeFlashcard,
            };
        }
        case types.MEAN_FLASHCARD_BEFORE: {
            return { 
                ...state,
                meanBeforeFlashcard: action.meanBeforeFlashcard,
            };
        }
        case types.SPELL_FLASHCARD_BEFORE: {
            return { 
                ...state,
                spellBeforeFlashcard: action.spellBeforeFlashcard,
            };
        }
        case types.WORD_FLASHCARD_AFTER: {
            return { 
                ...state,
                wordAfterFlashcard: action.wordAfterFlashcard,
            };
        }
        case types.MEAN_FLASHCARD_AFTER: {
            return { 
                ...state,
                meanAfterFlashcard: action.meanAfterFlashcard,
            };
        }
        case types.SPELL_FLASHCARD_AFTER: {
            return { 
                ...state,
                spellAfterFlashcard: action.spellAfterFlashcard,
            };
        }
        case types.IMAGE_FLASHCARD_AFTER: {
            return { 
                ...state,
                imageFlashcard: action.imageFlashcard,
            };
        }
        case types.EXAMPLE_FLASHCARD_AFTER: {
            return { 
                ...state,
                exampleFlashcard: action.exampleFlashcard,
            };
        }
        case types.MEANEXAMPLE_FLASHCARD_AFTER: {
            return { 
                ...state,
                meanExampleFlashcard: action.meanExampleFlashcard,
            };
        }
        case types.GET_LIST_N5: {
            return { 
                ...state,
                isN5: action.isN5,
            };
        }
        case types.GET_LIST_N4: {
            return { 
                ...state,
                isN4: action.isN4,
            };
        }
        case types.GET_LIST_N3: {
            return { 
                ...state,
                isN3: action.isN3,
            };
        }
        case types.GET_LIST_N2: {
            return { 
                ...state,
                isN2: action.isN2,
            };
        }
        // test word
        case types.GET_N5_TEST: {
            return { 
                ...state,
                isN5test: action.isN5test,
            };
        }
        case types.GET_N4_TEST: {
            return { 
                ...state,
                isN4test: action.isN4test,
            };
        }
        case types.GET_N3_TEST: {
            return { 
                ...state,
                isN3test: action.isN3test,
            };
        }
        case types.GET_N2_TEST: {
            return { 
                ...state,
                isN2test: action.isN2test,
            };
        }

        case types.GET_ALL_WORD_TEST: {
            return { 
                ...state,
                isAlltest: action.isAlltest,
            };
        }

        case types.GET_MEMERIZE_WORD_TEST: {
            return { 
                ...state,
                isMemerizetest: action.isMemerizetest,
            };
        }
        case types.GET_NOTMEMERIZE_WORD_TEST: {
            return { 
                ...state,
                isNotMemerizetest: action.isNotMemerizetest,
            };
        }
        case types.GET_LIKE_TEST: {
            return { 
                ...state,
                islikeTest: action.islikeTest,
            };
        }

        case types.GET_CHOOSE_QUESTION: {
            return { 
                ...state,
                ischooseQuestion: action.ischooseQuestion,
            };
        }
        case types.GET_JOIN_QUESTION: {
            return { 
                ...state,
                isjoinQuestion: action.isjoinQuestion,
            };
        }
        

        default:
            return state;
    }
}
export default wordReducer;