import React, { useState, useEffect } from 'react';
import { View, Text, Button, Dimensions, Imgae, StyleSheet, TouchableOpacity,TextInput } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/Ionicons';
import HomeStack from '../screens/tab/home/homestack/HomeStack';
import SetStack from '../screens/tab/setting/setstack/SetStack';
import ContactStack from '../screens/tab/contact/ContactStack';
import NotificationStack from '../screens/tab/notification/NotificationStack';
import { useSelector, useDispatch } from 'react-redux';
import ManageStack from '../screens/tab/manage/ManageStack';
import { getPostRequest } from '../redux/actions/post.action';
const Tab = createBottomTabNavigator();
const getTabBarVisible = (route) => {
    const params = route.params;
    if (params) {
        if (params.tabBarVisible === false) {
            return false;
        }
    }
    return true;
};
const Main = () => {
    const dispatch = useDispatch();
    const users = useSelector(state => state.userReducer.user);
    const notifiList = useSelector(state => state.notifiReducer.notifiList);
    var count = notifiList.reduce((pre, cur) => (cur.isRead === false) ? ++pre : pre, 0);
    return (
        <Tab.Navigator
            screenOptions={({ route }) => ({
                tabBarIcon: ({ focused, color, size }) => {
                    let iconName;
                    if (route.name === "Trang chủ") {
                        iconName = focused ? 'home' : 'home';
                    } else if (route.name === 'Cài đặt') {
                        iconName = focused ? 'settings-outline' : 'settings-outline';
                    } else if (route.name === 'Cộng đồng') {
                        iconName = focused ? 'people' : 'people';
                    }
                    else if (route.name === 'Thông báo') {
                        iconName = focused ? 'notifications-outline' : 'notifications-outline';
                    }
                    // if (users.role === 1 || users.role === 2) {
                       else if(route.name === 'Quản lý'){
                            iconName = focused ? 'md-bookmarks-sharp' : 'md-bookmarks-sharp';
                        }
                    // }
                    return <Icon name={iconName} size={size} color={color} />;
                },
            })}
            tabBarOptions={{
                activeTintColor: 'tomato',
                inactiveTintColor: 'gray',
                keyboardHidesTabBar: true

            }}

        >
            <Tab.Screen
                name="Trang chủ"
                component={HomeStack}
            />

            {
                users.role === 1 || users.role === 2 ?
                    <Tab.Screen
                        name="Quản lý"
                        component={ManageStack}
                    />
                    : null
                }

            <Tab.Screen
                name="Cộng đồng"
                component={ContactStack}
                options={({ route }) => ({
                    // tabBarVisible: getTabBarVisible(route),
                    // unmountOnBlur: true,
                    // tabBarButton: props => (
                    //     <TouchableOpacity {...props} onPress={() => dispatch(getPostRequest(users._id))} />
                    //   ),
                })}
                // listeners={{
                //     tabPress: () => {
                //         dispatch(getPostRequest(users._id));

                //     },
                //   }}
            />

            <Tab.Screen
                name="Cài đặt"
                component={SetStack}
            />

            <Tab.Screen
                name="Thông báo"
                component={NotificationStack}
                options={{ tabBarBadge: count!==0 ? count: null }}
            />


        </Tab.Navigator>

    )


}
export default Main;



