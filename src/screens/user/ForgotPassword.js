import React, { useState } from 'react';
import { 
    View, 
    Text, 
    TouchableOpacity, 
    TextInput,
    Platform,
    StyleSheet ,
    StatusBar,
    Alert, 
    Animated,
    ActivityIndicator,
    ImageBackground,
    StackActions
} from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Feather from 'react-native-vector-icons/Feather';
import { useTheme } from 'react-native-paper';
import AppText from '../../components/app-text';
import Toast from '@phamhuuan/react-native-toast-message';
import i18n from '../../i18n/i18n';
import { loginRequest, setIsEnd } from '../../redux/actions/index';
import { useSelector, useDispatch } from 'react-redux';
import Loading from './Loading';
import Fontisto from 'react-native-vector-icons/Fontisto';
import passApi from '../../apis/passApi';
import axios from 'axios';
import { showToastSuccess, showToastError } from '../../helpers/toastHelper';
import { forgotPasswordRequest } from '../../redux/actions/index';

const ForgotPassword = (props) => {
    const [data, setData] = React.useState({
        email: '',
        isValidEmail: true,
    });

    const { colors } = useTheme();
    
    const loading = useSelector(state => state.userReducer.loading);
    const dispatch = useDispatch();

    const forgotRequest = (email, props) => dispatch(forgotPasswordRequest(email, props));
    const handleEmailChange = (val) => {
        if( val.includes('@') == true ) {
            setData({
                ...data,
                email: val,
                isValidEmail: true
            });
        } else {
            setData({
                ...data,
                email: val,
                isValidEmail: false
            });
        }
    }

    // const showToastSuccess = () => {
    //     Toast.show({
    //         type: 'success',
    //         text1: 'Login success',
    //       });
    //     setBooleadisEnd();
    // }

    // const showToastError = (text) => {
    //     Toast.show({
    //         type: 'error',
    //         text1: text,
    //       });
    //     setBooleadisEnd();
    // }
    const doLogin = () => {
        // axios.post('http://192.168.1.3:3002/language/forgot', {
        //     "email": data.email,
        // }, {
        //     headers: {
        //         "Accept": "application/json",
        //         "Content-Type": "application/json"
        //     }
        // })
        // .then((response) => {
        //     console.log('RESPOND.DATA O DAY LA' , response.data);
        //     if (response.data.success != undefined) {
        //         showToastSuccess(response.data.success);
        //         props.navigation.navigate("VerifyCode");
        //     }
        //     else {
        //         showToastError(response.data.error);
        //     }
        // });
        forgotRequest(data.email, props);
    }
  
    return (
      <View style={[styles.container, {backgroundColor: colors.header}]}>
          <StatusBar backgroundColor={colors.header} barStyle="light-content"/>
        <View style={styles.header}>
            <AppText style={styles.text_header} i18nKey={'forgot pass'} />
        </View>
        <Animated.View 
            animation="fadeInUpBig"
            style={[styles.footer, {
                backgroundColor: colors.background
            }]}
        >
            <AppText style={[styles.text_footer, {
                marginTop: 15,
                color: colors.text
            }]} i18nKey={'email'}/>
            <View style={styles.action}>
                <Fontisto 
                    name="email"
                    size={20}
                    color={colors.text}
                />
                <TextInput 
                    placeholder = {i18n.t('enter your email')}
                    placeholderTextColor="#666666"
                    style={[styles.textInput, {
                        color: colors.text
                    }]}
                    autoCapitalize="none"
                    onChangeText={(val) => handleEmailChange(val)}
                />
                {data.check_textInputChange ? 
                <Animated.View
                    animation="bounceIn"
                >
                    <Feather 
                        name="check-circle"
                        color="green"
                        size={20}
                    />
                </Animated.View>
                : null}
            </View>
            { data.isValidEmail ? null : 
            <Animated.View animation="fadeInLeft" duration={500}>
            <AppText style={styles.errorMsg} i18nKey={'Email must contain @'} />
            </Animated.View>
            }
            
            <View style={styles.button}>
                <TouchableOpacity
                    style={[styles.signIn, {backgroundColor: colors.header}]}
                    onPress = {() => doLogin()}
                >
                <View
                    colors={['#08d4c4', '#01ab9d']}
                    style={styles.signIn}
                >
                    <AppText style={[styles.textSign, {
                        color:'white'
                    }]} i18nKey={'take code'}/>
                </View>
                </TouchableOpacity>
            </View>
        </Animated.View>
        {loading && <Loading />}
      </View>
    );
};

export default ForgotPassword;

const styles = StyleSheet.create({
    container: {
      flex: 1, 
    },
    containerloading: {
    flex: 1,
    justifyContent: "center"
    },
    horizontal: {
        flexDirection: "row",
        justifyContent: "space-around",
        padding: 10
    },
    header: {
        flex: 1,
        justifyContent: 'flex-end',
        paddingHorizontal: 20,
        // paddingBottom: 50,
        alignItems: 'center',
        justifyContent: 'center'
    },
    footer: {
        flex: 3,
        // backgroundColor: 'red',
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        paddingHorizontal: 20,
        paddingVertical: 30
    },
    text_header: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 30
    },
    text_footer: {
        color: '#05375a',
        fontSize: 18
    },
    action: {
        flexDirection: 'row',
        marginTop: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#f2f2f2',
        paddingBottom: 5
    },
    actionError: {
        flexDirection: 'row',
        marginTop: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#FF0000',
        paddingBottom: 5
    },
    textInput: {
        flex: 1,
        marginTop: Platform.OS === 'ios' ? 0 : -12,
        paddingLeft: 10,
        color: '#05375a',
    },
    errorMsg: {
        color: '#FF0000',
        fontSize: 14,
    },
    button: {
        alignItems: 'center',
        marginTop: 50
    },
    signIn: {
        width: '100%',
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10
    },
    textSign: {
        fontSize: 18,
        fontWeight: 'bold'
    }
  });

