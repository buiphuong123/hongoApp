import { combineReducers } from "redux";
import userReducer from './userReducer';
import languageReducer from './languageReducer';
import fetchDataReducer from './fetchDataReducer';
import uiReducer from './uiReducer';
import commentReducer from "./commentReducer";
import grammarReducer from "./grammarReducer";
import notifiReducer from "./notifiReducer";
import wordReducer from "./wordReducer";
import grammarquestionReducer from "./grammarquestionReducer";
import kanjiReducer from "./kanjiReducer";
import scheduleReducer from "./scheduleReducer";
import vocabularyReducer from "./vocabularyReducer";
import postReducer from "./postReducer";
import manageReducer from "./manageReducer";

const appReducers = combineReducers({
    userReducer,
    uiReducer,
    languageReducer,
    fetchDataReducer,
    commentReducer,
    grammarReducer,
    notifiReducer,
    wordReducer,
    grammarquestionReducer,
    kanjiReducer,
    scheduleReducer,
    vocabularyReducer,
    postReducer,
    manageReducer
});

export default appReducers;