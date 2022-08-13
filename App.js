import Toast from '@phamhuuan/react-native-toast-message';
import React from 'react';
import {NetworkProvider} from 'react-native-offline';
import {Provider} from 'react-redux';
import {PersistGate} from 'redux-persist/integration/react';
import io from 'socket.io-client';
import GlobalLoading from './src/GlobalLoading';
import Home from './src/navigations/Home';
import {persistor, Store} from './src/redux/store';
export const socket = io('https://nameless-spire-67072.herokuapp.com');
const App = () => {
  return (
    <Provider store={Store}>
      <NetworkProvider>
        {/* <PersistGate persistor={persistor}> */}
          <Home />
          <Toast ref={ref => Toast.setRef(ref)} />
          <GlobalLoading />
        {/* </PersistGate> */}
      </NetworkProvider>
    </Provider>
  );
};

export default App;
