import React, { useEffect, useState, useRef } from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    TextInput,
    Platform,
    StyleSheet,
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
// import firebase from '@react-native-firebase/app';
import messaging from '@react-native-firebase/messaging';
import { showToastError } from '../../helpers/toastHelper';

const Login = (props) => {
    const [data, setData] = React.useState({
        username: '',
        password: '',
        check_textInputChange: false,
        secureTextEntry: true,
        isValidUser: true,
        isValidPassword: true,
    });
    const [datauser, setDatauser] = useState({ username: data.username, password: data.password});
    const { colors } = useTheme();
    const [notifiToken, setNotifiToken] = useState("");
    const [kaka, setKaka] = useState('');
    const user = useSelector(state => state.userReducer.user);

    const dispatch = useDispatch();

    const loginRequestUser = (username, password, notifiToken) => dispatch(loginRequest(username, password, notifiToken, props));
    const getToken = async () => {
        // await messaging().registerDeviceForRemoteMessages();
        // await messaging().registerDeviceForRemoteMessages();
        // const firebaseToken = await messaging().getToken();
        // console.log('day ne', firebaseToken);
        // setNotifiToken(firebaseToken);
        try {
            const token = await messaging().getToken();
            console.log('lấy đượ token ơi day', token);
            setNotifiToken(await messaging().getToken());
            setKaka(token);
        } catch (error) {
            console.log('lỗi');
            console.log('Firebase permission rejected', error);
        }
    }
   
    // useEffect(() => {
    //     console.log('vao lay token khong');
    //     getToken();
    //     // checkToken();
    //     // print_fcm_token();
    //     // _checkPermission()
    //     // getFCMToken();
    // }, []);
    // useEffect(() => {
    //     // Get the device token
    //     messaging()
    //       .getToken()
    //       .then(token => {
    //         console.log(token);
    //         setNotifiToken(token);
    //         // return saveTokenToDatabase(token);
    //       });

    //     // If using other push notification providers (ie Amazon SNS, etc)
    //     // you may need to get the APNs token instead for iOS:
    //     // if(Platform.OS == 'ios') { messaging().getAPNSToken().then(token => { return saveTokenToDatabase(token); }); }

    //     // Listen to whether the token changes
    //     return messaging().onTokenRefresh(token => {
    //         setNotifiToken(token);
    //     //   saveTokenToDatabase(token);
    //     });
    //   }, []);

    const textInputChange = (val) => {
        if (val.trim().length >= 4) {
            setData({
                ...data,
                username: val,
                check_textInputChange: true,
                isValidUser: true
            });
            setDatauser({ ...datauser, username: val });
        } else {
            setData({
                ...data,
                username: val,
                check_textInputChange: false,
                isValidUser: false
            });
        }
    }

    const handlePasswordChange = (val) => {
        if (val.trim().length >= 4) {
            setData({
                ...data,
                password: val,
                isValidPassword: true
            });
            setDatauser({ ...datauser, password: val });
        } else {
            setData({
                ...data,
                password: val,
                isValidPassword: false
            });
        }
    }

    const updateSecureTextEntry = () => {
        setData({
            ...data,
            secureTextEntry: !data.secureTextEntry
        });
    }

    const handleValidUser = (val) => {
        if (val.trim().length >= 4) {
            setData({
                ...data,
                isValidUser: true
            });
        } else {
            setData({
                ...data,
                isValidUser: false
            });
        }
    }

    const doLogin = async () => {
        if(data.username=== ""|| data.password=== "") {
            showToastError("Vui lòng nhập đầy đủ thông tin!!!");
            return;
        }
        const token = await messaging().getToken();
        console.log('kaka nen akak',token);
        console.log(data.username, data.password, token);
        loginRequestUser(data.username, data.password, token);
    }

    const forgot = () => {
        props.navigation.navigate("ForgotPassword");
    }

    const showUser = () => {
        console.log(user.user);
        console.log(user);
    }

    return (
        <View style={[styles.container, { backgroundColor: colors.header }]}>
            <StatusBar backgroundColor={colors.header} barStyle="light-content" />
            <View style={styles.header}>
                <AppText style={[styles.text_header, { color: '#fff' }]} i18nKey={'Login'} />
            </View>
            <Animated.View
                animation="fadeInUpBig"
                style={[styles.footer, {
                    backgroundColor: colors.background
                }]}
            >
                <AppText style={[styles.text_footer, {
                    color: colors.text
                }]} i18nKey={'username'} />
                <View style={styles.action}>
                    <FontAwesome
                        name="user-o"
                        color={colors.text}
                        size={20}
                    />
                    <TextInput
                        placeholder={i18n.t('enter your username')}
                        placeholderTextColor="#666666"
                        style={[styles.textInput, {
                            color: colors.text
                        }]}
                        autoCapitalize="none"
                        onChangeText={(val) => textInputChange(val)}
                        onEndEditing={(e) => handleValidUser(e.nativeEvent.text)}
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
                {data.isValidUser ? null :
                    <Animated.View animation="fadeInLeft" duration={500}>
                        <AppText style={styles.errorMsg} i18nKey={'Username must be 4 characters long'} />
                    </Animated.View>
                }


                <AppText style={[styles.text_footer, {
                    marginTop: 35,
                    color: colors.text
                }]} i18nKey={'password'} />
                <View style={styles.action}>
                    <Feather
                        name="lock"
                        color={colors.text}
                        size={20}
                    />
                    <TextInput
                        placeholder={i18n.t('enter your password')}
                        placeholderTextColor="#666666"
                        secureTextEntry={data.secureTextEntry ? true : false}
                        style={[styles.textInput, {
                            color: colors.text
                        }]}
                        autoCapitalize="none"
                        onChangeText={(val) => handlePasswordChange(val)}
                    />
                    <TouchableOpacity
                        onPress={updateSecureTextEntry}
                    >
                        {data.secureTextEntry ?
                            <Feather
                                name="eye-off"
                                color="grey"
                                size={20}
                            />
                            :
                            <Feather
                                name="eye"
                                color="grey"
                                size={20}
                            />
                        }
                    </TouchableOpacity>
                </View>
                {data.isValidPassword ? null :
                    <Animated.View animation="fadeInLeft" duration={500}>
                        <AppText style={styles.errorMsg} i18nKey={'Password must be 4 characters long'} />
                    </Animated.View>
                }


                <TouchableOpacity onPress={() => forgot()}>
                    <AppText style={{ color: colors.header, marginTop: 15 }} i18nKey={'forgot pass'} />
                </TouchableOpacity>
                <View style={styles.button}>
                    <TouchableOpacity
                        style={[styles.signIn, { backgroundColor: colors.header }]}
                        onPress={() => doLogin()}
                    >
                        {/* {
                    loading ?
                    <ActivityIndicator animating={loading} size={"large"} color={"white"} />
                    :
                    <View
                    colors={['#08d4c4', '#01ab9d']}
                    style={styles.signIn}
                >
                    <AppText style={[styles.textSign, {
                        color:'white'
                    }]} i18nKey={'Login'}/>
                </View>

                } */}
                        <View
                            // colors={['#08d4c4', '#01ab9d']}
                            style={[styles.signIn, { backgroundColor: colors.header, borderRadius: 10 }]}
                        >
                            <AppText style={[styles.textSign, {
                                color: '#fff'
                            }]} i18nKey={'Login'} />
                        </View>
                    </TouchableOpacity>

                    <TouchableOpacity
                        onPress={() => props.navigation.navigate('SignUp')}
                        style={[styles.signIn, {
                            borderColor: colors.header,
                            borderWidth: 1,
                            marginTop: 15
                        }]}
                    >
                        <AppText style={[styles.textSign, {
                            color: colors.header
                        }]} i18nKey={'SignUp'} />
                    </TouchableOpacity>

                    {/* <TouchableOpacity
                    onPress={() => showUser()}
                    style={[styles.signIn, {
                        borderColor: '#009387',
                        borderWidth: 1,
                        marginTop: 15
                    }]}
                >
                    <AppText style={[styles.textSign, {
                        color: '#009387'
                    }]} i18nKey={'SignUp'}/>
                </TouchableOpacity> */}

                </View>
            </Animated.View>
        </View>
    );
};

export default Login;

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
        backgroundColor: '#fff',
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        paddingHorizontal: 20,
        paddingVertical: 30
    },
    text_header: {
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

