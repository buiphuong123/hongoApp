import React, {useEffect, useState} from "react";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { loginUserSuccess } from "../redux/actions";
import Home from "./Home";
const CheckLogin = (props) => {
    const takeData = async() => {
        const user = await AsyncStorage.getItem("@user");
        if(user !== null) {
            dispatch(loginUserSuccess(JSON.parse(user)));
            return user;
        }
    }
    useEffect(() => {
       const user=  takeData();
       if(user.token !== undefined) {
        props.navigation.navigate("Home", {props: props});
       }
       else {
        props.navigation.navigate("Login", {props: props});
       }
    })
    return (
        <Home />
    )
}

export default CheckLogin;