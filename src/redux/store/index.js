import {applyMiddleware, createStore} from 'redux';
import rootReducers from '../reducers';
import createSagaMiddleware from 'redux-saga';
import rootSaga from '../../sagas/rootSaga';
import {persistStore, persistReducer} from 'redux-persist';
import AsyncStorage from '@react-native-async-storage/async-storage';
import autoMergeLevel2 from 'redux-persist/lib/stateReconciler/autoMergeLevel2';
import FSStorage from 'redux-persist-fs-storage';

const persistConfig = {
  key: 'persistRoot',
  storage: FSStorage(),
  version: 1,
  // storage: AsyncStorage,
  whitelist: ['wordReducer', 'kanjiReducer', 'grammarquestionReducer','grammarReducer'],
  // whitelist: ['vocabularyReducer', 'postReducer'],
  writeFailHandler: error => {
    console.log('[ERROR] - persis writeFailHandler', error);
  },
  stateReconciler: autoMergeLevel2,
};
const persistedReducer = persistReducer(persistConfig, rootReducers);

const sagaMiddleware = createSagaMiddleware();
const store = createStore(persistedReducer, applyMiddleware(sagaMiddleware));
let persistor = persistStore(store);
sagaMiddleware.run(rootSaga);

export {store as Store, persistor};
