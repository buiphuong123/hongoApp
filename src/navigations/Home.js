import React, { useEffect, useState } from "react";
import { Text , ActivityIndicator} from "react-native";
import 'react-native-gesture-handler';
import { createStackNavigator } from '@react-navigation/stack';
import {
    NavigationContainer,
    DefaultTheme as NavigationDefaultTheme,
    DarkTheme as NavigationDarkTheme,
} from '@react-navigation/native';
import {
    Provider as PaperProvider,
    DefaultTheme as PaperDefaultTheme,
    DarkTheme as PaperDarkTheme
} from 'react-native-paper';
import { AuthContext } from '../components/context';
import RootScreen from './RootScreen';
import { createDrawerNavigator } from '@react-navigation/drawer';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { connect } from 'react-redux';
import * as actions from './../redux/actions/index';
import DrawerTab from './DrawerTab';
import { navigationRef } from './NavigationService';
import { useSelector, useDispatch } from 'react-redux';
import { loginUserSuccess } from '../redux/actions/index';
import {useIsConnected} from 'react-native-offline';
import messaging from '@react-native-firebase/messaging';
import axios from 'axios';
import { getListUser } from "./../redux/actions/index";
import { getListWordSuccess } from "../redux/actions/word.action";
import RNFS from 'react-native-fs';
import { showLoading, hideLoading } from "./../redux/actions/index";
import { showToastError, showToastSuccess } from "../helpers/toastHelper";
const Home = (props) => {
    // const readFile = async (path) => {
    //     const exists = await RNFS.exists(path);
    //     if (exists === true) {
    //         const response = await RNFS.readFile(path);
    //         console.log('read file ne');
    //         console.log(response);
    //         dispatch(getListWordSuccess(JSON.parse(response)));
    //         setisEnd(false);
    //     }
    //     else {
    //         console.log('file khong ton tai');
    //         return;
    //     }

    //     // setFileData(response); //set the value of response to the fileData Hook.
    // };
    const isConnected = useIsConnected();

    const [isDarkTheme, setIsDarkTheme] = React.useState(false);
    const dispatch = useDispatch();
    // AsyncStorage.setItem('@language', isDarkTheme);
    const dataUser = useSelector(state => state.userReducer.user);
    const takeData = async (filePath) => {
        const value = await AsyncStorage.getItem("@language");
        user = await AsyncStorage.getItem("@user");
        // console.log('ben async ', user);
        if (user !== null) {
            dispatch(loginUserSuccess(JSON.parse(user)));
            // readFile(filePath);
            
        }
        if (value !== null) {
            props.setLanguage(value)
        }




    }

    // const takeNotifi = () => {

    // } 

    useEffect(() => {
        if (isConnected === true) showToastSuccess('B???n ??ang online');
        else if (isConnected === false) {
          showToastError('B???n ??ang offline');
        }
      }, [isConnected]);

    useEffect(() => {
        console.log('vao take data');
        const filePath = RNFS.DocumentDirectoryPath + "/listword.txt"; //absolute path of our file
        takeData(filePath);
        
        //     console.log('vao day');
        //     messaging().onMessage(async remoteMessage => {
        //         console.log('A new FCM message arrived!', JSON.stringify(remoteMessage));
        //         // setNotification({
        //         //   ...notification,
        //         //   title: remoteMessage.notification.title,
        //         //   body: remoteMessage.notification.body,
        //         //   time: remoteMessage.data.sentTime,
        //         //   action: remoteMessage.data.action,
        //         // });
        //         // console.log('body sau khi set', notification.body);
        //         // console.log(notification.body + 'at'+ notification.time);
        //       });



        //       messaging().onNotificationOpenedApp(remoteMessage => {
        //         console.log('onNotificationOpenedApp: ', JSON.stringify(remoteMessage));
        //         // setNotification({
        //         //   title: remoteMessage.notification.title,
        //         //   body: remoteMessage.notification.body
        //         // })
        //       });

        //       messaging().setBackgroundMessageHandler(async remoteMessage => {
        //         console.log('Message handled in the background!', remoteMessage);
        //         // setNotification({
        //         //   title: remoteMessage.notification.title,
        //         //   body: remoteMessage.notification.body
        //         // })
        //       });

        //       messaging()
        //       .getInitialNotification()
        //       .then(remoteMessage => {
        //         if (remoteMessage) {
        //           props.navigation.navigate("ExplainScreen", {word: remoteMessage.data.routedata})
        //           console.log(
        //             'Notification caused app to open from quit state:',
        //             (remoteMessage.data.routedata),

        //           );
        //         }
        //       });
    }, []);
    // useEffect(() => {
    //     console.log('LAY TRONG ASYNC LA ',dataUser);
    // }, [dataUser]);
    // CustomDarkTheme
    // CustomDefaultTheme
    const CustomDefaultTheme = {
        ...NavigationDefaultTheme,
        ...PaperDefaultTheme,
        colors: {
            ...NavigationDefaultTheme.colors,
            ...PaperDefaultTheme.colors,
            header: '#2929a3',
            background: '#ffffff',
            text: 'black',
            color_of_light: '#fff',
            block: '#f2f2f2',
            text_of_box: '#fff',
            text_of_input: '#cccccc',
            borderblock: '#e6e6e6',
            backkmodel: '#fff',
            notifi: '#f2f2f2',
            question: 'blue',
            dropdown: '#fff',
            comment: '#f2f2f2',
            setting: '#f2f2f2',
        }
    }

    const CustomDarkTheme = {
        ...NavigationDarkTheme,
        ...PaperDarkTheme,
        colors: {
            ...NavigationDarkTheme.colors,
            ...PaperDarkTheme.colors,
            dropdown: 'gray',
            header: '#f86132',
            background: '#333333',
            text: '#ffffff',
            block: '#595959',
            color_of_light: '#333333',
            textinput: '#f2f2f2',
            text_of_box: '#fff',
            text_of_input: '#808080',
            borderblock: 'gray',
            backkmodel: 'black',
            notifi: '#595959',
            question: '#00ff00',
            comment: 'gray',
            setting: 'gray'
        }
    }
    const theme = isDarkTheme ? CustomDarkTheme : CustomDefaultTheme;

    const authContext = React.useMemo(() => ({
        toggleTheme: () => {
            setIsDarkTheme(isDarkTheme => !isDarkTheme);
        }
    }), []);
    return (
        <PaperProvider theme={theme}>
            <AuthContext.Provider value={authContext}>
                <NavigationContainer ref={navigationRef} theme={theme}>
                    {dataUser.token === undefined ?
                        // <Drawer.Navigator drawerContent={props => <DrawerContent {...props} />}>
                        //     <Drawer.Screen name="HomeDrawer" component={Main} />
                        //     <Drawer.Screen name="Profile" component={Profile} />
                        //     <Drawer.Screen name="Homepages" component={HomePages} />
                        //     <Drawer.Screen name="Language" component={Language} />
                        // </Drawer.Navigator>

                        <RootScreen />
                        // <Text>rong</Text>
                        :
                        <DrawerTab />
                        // <Text>khong rong</Text>
                    }
                    
                    {/* <RootScreen /> */}
                    {/* <Drawer.Navigator drawerContent={props => <DrawerContent {...props} />}>
                    <Drawer.Screen name="Main" component={Main} />
                    <Drawer.Screen name="Profile" component={Profile} />
                    <Drawer.Screen name="Homepages" component={HomePages} />
                    <Drawer.Screen name="Language" component={Language} />
                </Drawer.Navigator>  */}
                </NavigationContainer>
            </AuthContext.Provider>
        </PaperProvider>
    )

}


// const mapStateToProps = (state) => {        
//     return {        
//         user: state.userReducer.user,
//     }
// };

// const mapDispatchToProps = dispatch => {
//     return {
//         setLanguage: language => {
//             dispatch(actions.changeLanguage(language));
//         }
//     }
// }

// export default connect(mapStateToProps, mapDispatchToProps)(Home);
export default Home;