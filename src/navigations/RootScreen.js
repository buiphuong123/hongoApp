import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import Login from "../screens/user/Login";
import SignUp from "../screens/user/SignUp";
import Toggle from '../screens/user/Toggle';
import VerifyCode from '../screens/user/VerifyCode';
import ForgotPassword from '../screens/user/ForgotPassword';
import Main from './Main';
import DrawerTab from '../navigations/DrawerTab';
import NewPassword from '../screens/user/NewPassword';
const Stack = createStackNavigator();

const RootScreen = ({navigation}) => {
    return (
        <Stack.Navigator
            initialRouteName="Toggle"
            screenOptions={{
                gestureEnabled: false,
                gestureDirection: "horizontal",
                headerShown: false
            }}
        >
            <Stack.Screen
                name='Toggle'
                component={Toggle}
            />

            <Stack.Screen
                name='Login'
                component={Login}
            />

            <Stack.Screen
                name='SignUp'
                component={SignUp}
            />

            <Stack.Screen
                name='ForgotPassword'
                component={ForgotPassword}
            />

            <Stack.Screen
                name='VerifyCode'
                component={VerifyCode}
            />

            <Stack.Screen
                name='Drawer'
                component={DrawerTab}
            />

            <Stack.Screen
                name='NewPassword'
                component={NewPassword}
            />
        </Stack.Navigator>
    )
}
export default RootScreen;
