// all de chay nhieu saga cung motj luc
import { all, fork } from 'redux-saga/effects';

import { watchLoginUser, watchRegisterUser, watchsendMail, watchLogoutUser } from './userSaga';
import { watchgetComment, watchgetGrammar } from './grammarSaga';
import { watchgetNotifi } from './notiSaga';
import { watchgetWord, watchgetWordComment } from './wordSaga';
import { watchgetGrammarQuestion } from './grammarquestionSaga';
import { watchgetKanji, watchgetCommentKanji } from './kanjiSaga';
import { watchgetSchedule } from './scheduleSaga';
import { watchgetVocabulary, watchgetshareVocabulary } from './vocabularySaga';
import {watchgetPost} from './postSaga';

export default function* rootSaga() {
    yield all([
        watchLoginUser(),
        watchRegisterUser(),
        watchLogoutUser(),
        watchsendMail(),
        watchgetGrammar(),
        watchgetComment(),
        watchgetNotifi(),
        watchgetWord(),
        watchgetWordComment(),
        watchgetGrammarQuestion(),
        watchgetKanji(),
        watchgetCommentKanji(),
        watchgetSchedule(),
        watchgetVocabulary(),
        watchgetPost(),
        watchgetshareVocabulary(),
        // watchgetWordLocal(),
    ])
}