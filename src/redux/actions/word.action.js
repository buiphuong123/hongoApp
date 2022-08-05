import * as types from './../constants/action-types';

export const RemoteWord = isWord => {
  return {
    type: types.WORD,
    isWord,
  };
};
export const RemoteAllWord = isAll => {
  return {
    type: types.ALL_WORD,
    isAll,
  };
};
export const RemoteHiraWord = isHira => {
  return {
    type: types.ALL_HIRA,
    isHira,
  };
};
export const RemoteKanjiWord = isKanji => {
  return {
    type: types.ALL_KANJI,
    isKanji,
  };
};
export const RemoteMeanWord = isMean => {
  return {
    type: types.ALL_MEAN,
    isMean,
  };
};
export const RemoteReverseWord = isReverse => {
  return {
    type: types.ALL_REVERSE,
    isReverse,
  };
};
export const RemoteMemerizeWord = isMemerize => {
  return {
    type: types.ALL_MEMERIZE,
    isMemerize,
  };
};
export const RemoteNotMemerizeWord = isNotMemerize => {
  return {
    type: types.ALL_NOTMEMERIZE,
    isNotMemerize,
  };
};
export const RemoteLikeWord = isLike => {
  return {
    type: types.ALL_LIKE,
    isLike,
  };
};

//saga
export function getListWordRequest(id) {
  return {
    type: types.GET_LIST_WORD_REQUEST,
    payload: {id},
  };
}
export const getListWordSuccess = wordList => {
  return {
    type: types.GET_LIST_WORD_SUCCESS,
    payload: {wordList},
  };
};

export const getListWordLevel = wordlevel => {
  return {
    type: types.GET_LIST_WORD_LEVEL_SUCCESS,
    wordlevel,
  };
};

// flashcard action
export const RemotewordBeforeFlashcard = wordBeforeFlashcard => {
  return {
    type: types.WORD_FLASHCARD_BEFORE,
    wordBeforeFlashcard,
  };
};

export const RemotemeanBeforeFlashcard = meanBeforeFlashcard => {
  return {
    type: types.MEAN_FLASHCARD_BEFORE,
    meanBeforeFlashcard,
  };
};

export const RemotespellBeforeFlashcard = spellBeforeFlashcard => {
  return {
    type: types.SPELL_FLASHCARD_BEFORE,
    spellBeforeFlashcard,
  };
};

export const RemotewordAfterFlashcard = wordAfterFlashcard => {
  return {
    type: types.WORD_FLASHCARD_AFTER,
    wordAfterFlashcard,
  };
};

export const RemotemeanAfterFlashcard = meanAfterFlashcard => {
  return {
    type: types.MEAN_FLASHCARD_AFTER,
    meanAfterFlashcard,
  };
};

export const RemotespellAfterFlashcard = spellAfterFlashcard => {
  return {
    type: types.SPELL_FLASHCARD_AFTER,
    spellAfterFlashcard,
  };
};

export const RemoteimageAfterFlashcard = imageFlashcard => {
  return {
    type: types.IMAGE_FLASHCARD_AFTER,
    imageFlashcard,
  };
};

export const RemoteexampleFlashcard = exampleFlashcard => {
  return {
    type: types.EXAMPLE_FLASHCARD_AFTER,
    exampleFlashcard,
  };
};

export const RemotemeanexampleFlashcard = meanExampleFlashcard => {
  return {
    type: types.MEANEXAMPLE_FLASHCARD_AFTER,
    meanExampleFlashcard,
  };
};

// level
export const RemoteN5 = isN5 => {
  return {
    type: types.GET_LIST_N5,
    isN5,
  };
};
export const RemoteN4 = isN4 => {
  return {
    type: types.GET_LIST_N4,
    isN4,
  };
};
export const RemoteN3 = isN3 => {
  return {
    type: types.GET_LIST_N3,
    isN3,
  };
};
export const RemoteN2 = isN2 => {
  return {
    type: types.GET_LIST_N2,
    isN2,
  };
};

// test wordd
export const RemoteN5Test = isN5test => {
  return {
    type: types.GET_N5_TEST,
    isN5test,
  };
};

export const RemoteN4Test = isN4test => {
  return {
    type: types.GET_N4_TEST,
    isN4test,
  };
};
export const RemoteN3Test = isN3test => {
  return {
    type: types.GET_N3_TEST,
    isN3test,
  };
};
export const RemoteN2Test = isN2test => {
  return {
    type: types.GET_N2_TEST,
    isN2test,
  };
};

// TEST

export const RemoteAllWordTest = isAlltest => {
  return {
    type: types.GET_ALL_WORD_TEST,
    isAlltest,
  };
};
export const RemoteMemerizeWordTest = isMemerizetest => {
  return {
    type: types.GET_MEMERIZE_WORD_TEST,
    isMemerizetest,
  };
};
export const RemoteNotMemerizeWordTest = isNotMemerizetest => {
  return {
    type: types.GET_NOTMEMERIZE_WORD_TEST,
    isNotMemerizetest,
  };
};

export const RemoteLikeTest = islikeTest => {
  return {
    type: types.GET_LIKE_TEST,
    islikeTest,
  };
};

export const RemoteChooseQuestion = ischooseQuestion => {
  return {
    type: types.GET_CHOOSE_QUESTION,
    ischooseQuestion,
  };
};
export const RemoteJoinQuestion = isjoinQuestion => {
  return {
    type: types.GET_JOIN_QUESTION,
    isjoinQuestion,
  };
};

export const RemoteTextVocabulary = textVocabulary => {
  return {
    type: types.WORD_VOCABULARY,
    textVocabulary,
  };
};

export const getlocalWord = id => {
  return {
    type: types.GET_LIST_WORD_LOCAL,
    payload: {id},
  };
};

