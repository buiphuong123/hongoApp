import axios from "axios";
import React, { useState } from "react";
import { View, Text, StyleSheet, ScrollView, Image, TextInput, Animated, TouchableOpacity, ImageBackground, Dimensions } from "react-native";
import { set } from "react-native-reanimated";
import Icon from 'react-native-vector-icons/Ionicons';
import pass from '../../assets/images/pass.jpg';
import AppText from "../../components/app-text";
import { showToastSuccess, showToastError } from "../../helpers/toastHelper";
const { width: WIDTH } = Dimensions.get('window');
import { useTheme } from 'react-native-paper';
const NewPassword = ({navigation, route}) => {
    const { colors } = useTheme();

    const [data, setData] = React.useState({
        newPass: '',
        confirm: '',
        check_textInputChange: false,
        check_match: true,
        isValidPassword: true,
        keyput: true,
        keyputconfirm: true

    })
    const { email } = route.params;

    const handlePasswordChange = (val) => {
        if (val.trim().length >= 4) {
            setData({
                ...data,
                newPass: val,
                isValidPassword: true,
                keyput: true,
                keyputconfirm: true
            });
        } else {
            setData({
                ...data,
                newPass: val,
                isValidPassword: false,
                keyput: true,
                keyputconfirm: true
            });
        }
    }

    const handlePasswordMatch = (val) => {
        if (val.localeCompare(data.newPass) === 0) {
            setData({
                ...data,
                confirm: val,
                check_match: true,
                keyput: true,
                keyputconfirm: true
            });
        } else {
            setData({
                ...data,
                confirm: val,
                check_match: false,
                keyput: true,
                keyputconfirm: true
                
            });
        }
    }
    const changePassword = () => {
        if(data.isValidPassword === false || data.check_match === false || data.newPass === '' || data.confirm ==='') {
            if(data.newPass === '') {
                setData({...data, keyput: false});
            }
            else if(data.confirm === '') {
                setData({...data, keyputconfirm: false});
            }
        }
        else {
            axios.post('https://nameless-spire-67072.herokuapp.com/language/changePassword', {
            "email": email,
            "password": data.newPass
          }, {
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json"
            }
          })
          .then((response) => {
            //   console.log('data la', response.data);
              if (response.data.code ===1 ) {
                showToastSuccess(response.data.success);
                  navigation.navigate("Login");
              }
              else {
                showToastError(response.data.error);
              }
          })
        }
    }
    return (
        <View style={{ flex: 1 }}>
            {/* <View style={{flex: 2}}>
                <Image
                    source={pass}
                />
            </View> */}
            <View style={[styles.card, styles.elevation, {backgroundColor: colors.background, justifyContent: "center"}]}>
                <View>
                    <Text style={{ textAlign: 'center', fontSize: 20, color: colors.text }}>LẤY LẠI MẬT KHẨU</Text>
                </View>
                <View style={styles.boxinput}>
                    <Icon name={'lock-open'} size={28} color={'gray'} style={styles.inputIcon} />
                    <TextInput
                        style={styles.input}
                        placeholder={'new password'}
                        placeholderTextColor={'gray'}
                        secureTextEntry={true}
                        underlineColorAndroid='transparent'
                        // onChangeText={(newPass) => setNewPass(newPass)}
                        // value={newPass}
                        onChangeText={(val) => handlePasswordChange(val)}
                    />
                </View>
                {data.isValidPassword ? null :
                    <Animated.View animation="fadeInLeft" duration={500}>
                        <Text style={styles.errorMsg}>Password must be 4 characters long</Text>
                    </Animated.View>
                }
                {data.keyput ? null : 
                     <Animated.View animation="fadeInLeft" duration={500}>
                         <Text style={styles.errorMsg}>Input pass</Text>
                     </Animated.View>
                }

                <View style={styles.boxinput}>
                    <Icon name={'lock-open'} size={28} color={'gray'} style={styles.inputIcon} />
                    <TextInput
                        style={styles.input}
                        placeholder={'confirm password'}
                        placeholderTextColor={'gray'}
                        secureTextEntry={true}
                        underlineColorAndroid='transparent'
                        // onChangeText={(username) => this.setState({ username })}
                        // value={this.state.username}
                        onChangeText={(val) => handlePasswordMatch(val)}
                    />
                </View>
                {data.check_match ? null :
                    <Animated.View animation="fadeInLeft" duration={500}>
                        <Text style={styles.errorMsg}>Password not match</Text>
                    </Animated.View>
                }
                {data.keyputconfirm ? null : 
                     <Animated.View animation="fadeInLeft" duration={500}>
                         <Text style={styles.errorMsg}>Input pass confirm</Text>
                     </Animated.View>
                }

                <TouchableOpacity style={[styles.login, {backgroundColor: colors.header}]} onPress={() => { changePassword() }}>
                    <Text style={[styles.textLogin, {color: '#fff'}]}>Lấy lại mật khẩu</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}
var styles = StyleSheet.create({
    backgourndContainer: { flex: 1, width: null, height: null, justifyContent: "center", alignItems: "center" },
    input: { width: WIDTH - 55, height: 45, borderRadius: 25, color: "black", fontSize: 16, paddingLeft: 45, alignItems: "center", justifyContent: "center", borderColor: 'gray', borderWidth: 1, marginHorizontal: 25 },
    logoText: { color: "black", fontSize: 20, padding: 20, fontWeight: "500", marginTop: 10 },
    inputIcon: { position: 'absolute', top: 4, left: 37 },
    boxinput: { marginTop: 50, marginLeft: -29 },
    eyess: { position: 'absolute', top: 4, right: 37 },
    login: { width: '50%', height: 50, marginLeft: WIDTH / 2 - 30, borderRadius: 25, backgroundColor: 'rgba(0, 0, 0, 0.35)', justifyContent: "center", alignItems: "center", marginTop: 20 },
    textLogin: { color: "black", justifyContent: "center", alignItems: "center" },
    heading: {
        fontSize: 18,
        fontWeight: '600',
        marginBottom: 13,
    },
    card: {
        borderRadius: 8,
        paddingVertical: 45,
        paddingHorizontal: 25,
        width: '100%',
        marginVertical: 10,
        marginTop: 20,
        flex: 3
    },
    elevation: {
        elevation: 20,
        shadowColor: '#52006A',
    },
    errorMsg: {
        color: '#FF0000',
        fontSize: 14,
    },
})

export default NewPassword;