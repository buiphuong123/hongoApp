import React, {useState} from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import SettingScreen from '../SettingScreen';
import SettingScreenDetail from '../SettingScreenDetail';

const Stack = createStackNavigator();

const SetStack = () => {
    return (
        <Stack.Navigator 
            initialRouteName="Setting"
            screenOptions={{
                gestureEnabled: true,
                gestureDirection: "horizontal",
                headerShown: false
            }}
        >
            <Stack.Screen
                name='Setting'
                component={SettingScreen}
            />

            <Stack.Screen
                name='SettingDetail'
                component={SettingScreenDetail}
            />
        </Stack.Navigator>
    )
}
export default SetStack;