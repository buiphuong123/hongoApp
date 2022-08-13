import {applyMiddleware, createStore} from 'redux';
import rootReducers from '../reducers';
import createSagaMiddleware from 'redux-saga';
import rootSaga from '../../sagas/rootSaga';
import {persistStore, persistReducer} from 'redux-persist';
import AsyncStorage from '@react-native-async-storage/async-storage';
import autoMergeLevel2 from 'redux-persist/lib/stateReconciler/autoMergeLevel2';
import FSStorage from 'redux-persist-fs-storage';
import {createTransform} from 'redux-persist';

const setTransform = createTransform(
  // transform state on its way to being serialized and persisted.
  (inboundState, key) => {
    // convert mySet to an Array.
    console.log('FSStorage inboundState', inboundState);
    return {
      ...inboundState,
    };
  },
  // transform state being rehydrated
  (outboundState, key) => {
    console.log('FSStorage outboundState', outboundState);
    // convert mySet back to a Set.
    return {
      ...outboundState,
      wordList: [
        ...inboundState.wordList.slice(
          0,
          outboundState?.wordList?.length() ?? 0 / 10,
        ),
      ],
    };
  },
  // define which reducers this transform gets called for.
  {whitelist: ['wordReducer']},
);

const persistConfig = {
  key: 'persistRoot',
  storage: FSStorage(),
  // storage: AsyncStorage,
  // whitelist: [
  //   'wordReducer',
  //   'kanjiReducer',
  //   'grammarquestionReducer',
  //   'grammarReducer',
  // ],
  whitelist: [],
  writeFailHandler: error => {
    console.log('[ERROR] - persis writeFailHandler', error);
  },
  // transforms: [setTransform],
  stateReconciler: autoMergeLevel2,
};
const persistedReducer = persistReducer(persistConfig, rootReducers);

const sagaMiddleware = createSagaMiddleware();
// const store = createStore(persistedReducer, applyMiddleware(sagaMiddleware));
// let persistor = persistStore(store);
const store = createStore(rootReducers, applyMiddleware(sagaMiddleware));

sagaMiddleware.run(rootSaga);

// export {store as Store, persistor};
export {store as Store};
