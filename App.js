import Toast from '@phamhuuan/react-native-toast-message';
import React from 'react';
import {Provider} from 'react-redux';
import io from 'socket.io-client';
import GlobalLoading from './src/GlobalLoading';
import Home from './src/navigations/Home';
import {persistor, Store} from './src/redux/store';
import {PersistGate} from 'redux-persist/integration/react';
import {NetworkProvider} from 'react-native-offline';
// import { useSelector } from 'react-redux';
// import {RealmManager} from './src/realm';

export const socket = io('https://nameless-spire-67072.herokuapp.com');
const App = () => {
  // const dataTake = async () => {
  //   console.log('data take day ne');
  //   await RealmManager.open();
  // };

  // useEffect(() => {
  //   dataTake();
  // }, []);

  return (
    <Provider store={Store}>
      <PersistGate persistor={persistor}>
        <NetworkProvider>
          <Home />
          <Toast ref={ref => Toast.setRef(ref)} />
          <GlobalLoading />
        </NetworkProvider>
      </PersistGate>
    </Provider>
  );
};

export default App;
