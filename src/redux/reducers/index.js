import {combineReducers} from 'redux';
import userReducer from './userReducer';
import languageReducer from './languageReducer';
import fetchDataReducer from './fetchDataReducer';
import uiReducer from './uiReducer';
import commentReducer from './commentReducer';
import grammarReducer from './grammarReducer';
import notifiReducer from './notifiReducer';
import wordReducer from './wordReducer';
import grammarquestionReducer from './grammarquestionReducer';
import kanjiReducer from './kanjiReducer';
import scheduleReducer from './scheduleReducer';
import vocabularyReducer from './vocabularyReducer';
import postReducer from './postReducer';
import manageReducer from './manageReducer';
import {reducer as network} from 'react-native-offline';
import {persistReducer} from 'redux-persist';
import FSStorage from 'redux-persist-fs-storage';

const rootReducers = combineReducers({
  userReducer,
  uiReducer,
  languageReducer,
  fetchDataReducer,
  commentReducer,
  grammarReducer,
  notifiReducer,
  // wordReducer,
  wordReducer: persistReducer(
    {
      key: 'wordReducer',
      storage: FSStorage(),
      whitelist: ['wordList'],
    },
    wordReducer,
  ),
  grammarquestionReducer,
  kanjiReducer,
  scheduleReducer,
  vocabularyReducer,
  postReducer,
  manageReducer,
  network,
});

export default rootReducers;
