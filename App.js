import React, { useState, useEffect } from 'react'
import { View, Text, Platform, Button } from 'react-native';
import Home from './src/navigations/Home';
import { createStore, applyMiddleware, compose  } from 'redux';
import { Provider } from 'react-redux';
import appReducers from './src/redux/reducers';
import createSagaMiddleware from 'redux-saga';
import { AppRegistry } from 'react-native';
import rootSaga from './src/sagas/rootSaga';
import Fetchdata from './src/screens/Fetchdata';
import Toast from '@phamhuuan/react-native-toast-message';
import GlobalLoading from './src/GlobalLoading';
import NewPassword from './src/screens/user/NewPassword';
import FlatListitem from './src/screens/Flatlistitem';
const sagaMiddleware = createSagaMiddleware();
import {NetworkProvider} from 'react-native-offline';
import HomeScreenDetail from './src/screens/tab/home/HomeScreenDetail';
import HomeScreen from './src/screens/tab/home/HomeScreen';
import ExplainScreen from './src/screens/tab/home/ExplainScreen';
import ListGrammer from './src/screens/tab/home/ListGrammer';
import Grammer from './src/screens/tab/home/Grammer';
import GrammarScreenDetail from './src/screens/tab/home/GrammarScreenDetail';
import GrammerScreen from './src/screens/tab/home/GrammerScreen';
import ModalScreen from './src/screens/tab/home/ModalScreen';
import io from 'socket.io-client';
import messaging from '@react-native-firebase/messaging';
import firebase from '@react-native-firebase/app';
import { kaka } from './src/apis/user';
// import { useSelector } from 'react-redux';
import HomeGrammar from './src/screens/tab/home/HomeGrammar';
import ResultScreen from './src/screens/tab/home/ResultScreen';
import Calendar from './src/screens/tab/home/Calendar';
import AddCalendar from './src/screens/tab/home/AddCalendar';
import TestScreen from './src/screens/tab/home/TestScreen';
import Flashcard from './src/screens/tab/home/word/Flashcard';
import WordScreenDetail from './src/screens/tab/home/word/WordScreenDetail';
import SettingScreen from './src/screens/tab/setting/SettingScreen';
import AsyncStorage from '@react-native-async-storage/async-storage';
import ModelSelect from './src/screens/tab/home/word/ModelSelect';
import BeforeFlashcard from './src/screens/tab/home/word/BeforeFlashcard';
import TestWord from './src/screens/tab/home/word/TestWord';
import SelectQuestion from './src/screens/tab/home/word/SelectQuestion';
import TestJoinWord from './src/screens/tab/home/word/TestJoinWord';
import ExplainKanji from './src/screens/tab/home/kanji/ExplainKanji';
import TestScreenss from './src/screens/tab/home/word/TestScreen';
import VocabularyScreen from './src/screens/tab/home/VocabularyScreen';
import ListWordVocabulary from './src/screens/tab/home/ListWordVocabulary';
import PracticeScreen from './src/screens/tab/home/practice/PracticeScreen';
import NewPostScreen from './src/screens/tab/contact/NewPostScreen';
import axios from 'axios';
import GrammarTest from './src/screens/tab/home/practice/GrammarTest';
import NewWord from './src/screens/tab/home/word/NewWord';
import NewGrammar from './src/screens/tab/home/grammar/NewGrammar';
import NewKanji from './src/screens/tab/home/kanji/NewKanji';
import PlainSuggest from './src/screens/tab/contact/PlainSuggest';
import Toggle from './src/screens/user/Toggle';
import Login from './src/screens/user/Login';
import CheckLogin from './src/navigations/CheckLogin';
import ReadFile from './src/screens/tab/home/word/ReadFile';
import { RealmManager } from './src/realm';
const store = createStore(
  appReducers,
  applyMiddleware(sagaMiddleware)
);
export const socket = io("https://nameless-spire-67072.herokuapp.com");
const App = () => {
  const dataTake = async() => {
    console.log('data take day ne');
    await RealmManager.open();
    
  }

  useEffect(() => {
    dataTake();
    
  }, []);
  
  // const [token, setToken] = useState("");
 
  // const getToken = async() => {
  //   const firebaseToken = await firebase.messaging().getToken();
  //   console.log(firebaseToken);
  // }
  // create channel 
//   useEffect(() => {
//       createChannel();
//       notificationListener();
//   }, []);

//  const createChannel = () => {
//     const channel = new firebase.notifications.Android.Channel(
//       'channelId',
//       'channelName',
//       https://nameless-spire-67072.herokuapp.com/.notifications.Android.Importance.Max,
//     ).setDescription('Description');

//     firebase.notifications().android.createChannel(channel);
//   };
//   // foreground notification
//   const notificationListener = () => {
//     firebase.notifications().onNotification((notification) => {
//       if(Platform.OS ==='android') {
//         const localNotification = new firebase.notifications.Notification({
//           sound: 'default',
//           show_in_foreground: true,
//         })
//         .setNotificationId(notification.notificationId)
//         .setTitle(notification.title)
//         .setSubTitle(notification.subtitle)
//         .setBody(notification.body)
//         .setData(notification.data)
//         .android.setChannelId('channelId')
//         .android.setPriority(firebase.notifications.Android.Priority.Hight);
        
//         firebase
//         .notifications()
//         .displayNotification(localNotification)
//         .catch((err) => console.log(err));
//       }
//     });
//   };
//   useEffect(() => {
//     getToken();
//   //  console.log('TOKEN DAY NHA', token);
//     messaging().onMessage(async remoteMessage => {
//       console.log('A new FCM message arrived!', JSON.stringify(remoteMessage));
//       axios.post('https://nameless-spire-67072.herokuapp.com/language/createNotifi', {
//             // "username": user._id,
//             "content": remoteMessage.notification.body,
//             "time": remoteMessage.sentTime,
//             "action": remoteMessage.data.action
//         }, {
//             headers: {
//                 "Accept": "application/json",
//                 "Content-Type": "application/json"
//             }
//         })
//             .then((response) => {
//                 console.log(response.data);
//             })
//       // setNotification({
//       //   ...notification,
//       //   title: remoteMessage.notification.title,
//       //   body: remoteMessage.notification.body,
//       //   time: remoteMessage.data.sentTime,
//       //   action: remoteMessage.data.action,
//       // });
//       // console.log('body sau khi set', notification.body);
//       // console.log(notification.body + 'at'+ notification.time);
//     });


//     messaging().onNotificationOpenedApp(remoteMessage => {
//       console.log('onNotificationOpenedApp: ', JSON.stringify(remoteMessage));
//       setNotification({
//         title: remoteMessage.notification.title,
//         body: remoteMessage.notification.body
//       })
//     });

//     messaging().setBackgroundMessageHandler(async remoteMessage => {
//       console.log('Message handled in the background!', remoteMessage);
//       setNotification({
//         title: remoteMessage.notification.title,
//         body: remoteMessage.notification.body
//       })
//     });

//     messaging()
//     .getInitialNotification()
//     .then(remoteMessage => {
//       if (remoteMessage) {
//         console.log(
//           'Notification caused app to open from quit state:',
//           JSON.stringify(remoteMessage),
//         );
//         setNotification({
//           title: remoteMessage.notification.title,
//           body: remoteMessage.notification.body
//         })
//       }
//     });

// }, []);

  // useEffect(() => {
   
  // });
  return (
      <Provider store={store}>
        <NetworkProvider>
        {/* <PracticeScreen /> */}
        {/* <GrammarTest /> */}
        <Home />
        {/* <ReadFile /> */}
        {/* <PlainSuggest /> */}
        {/* <CheckLogin /> */}
        {/* <Login /> */}
        {/* <Toggle /> */}
        {/* <PlainSuggest /> */}
        {/* <NewGrammar /> */}
        {/* <NewKanji /> */}
        {/* <NewWord /> */}
        {/* <Button onPress={dataTake} title="Hello" /> */}
        <Toast ref={(ref) => Toast.setRef(ref)} />
        <GlobalLoading />
        {/* <Fetchdata /> */}
          </NetworkProvider>
      </Provider>
  );
};
sagaMiddleware.run(rootSaga);
export default App;