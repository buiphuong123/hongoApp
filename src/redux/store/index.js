import {applyMiddleware, createStore} from 'redux';
import rootReducers from '../reducers';
import createSagaMiddleware from 'redux-saga';
import rootSaga from '../../sagas/rootSaga';
import {persistStore, persistReducer} from 'redux-persist';
import AsyncStorage from '@react-native-async-storage/async-storage';

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  blacklist: ['uiReducer'],
  throttle: 1000,
  writeFailHandler: error => {
    console.log('[ERROR] - persis writeFailHandler', error);
  },
};
const persistedReducer = persistReducer(persistConfig, rootReducers);

const sagaMiddleware = createSagaMiddleware();
const store = createStore(persistedReducer, applyMiddleware(sagaMiddleware));
let persistor = persistStore(store);
sagaMiddleware.run(rootSaga);

export {store as Store, persistor};
