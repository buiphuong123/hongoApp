import React, {useEffect, useState} from 'react';
import { 
    View, 
    Text, 
    Button, 
    TouchableOpacity, 
    Dimensions,
    TextInput,
    Platform,
    StyleSheet,
    ScrollView,
    StatusBar,
    Animated
} from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Feather from 'react-native-vector-icons/Feather';
import Fontisto from 'react-native-vector-icons/Fontisto';
import { useTheme } from 'react-native-paper';
import AppText from '../../components/app-text';
import Toast from '@phamhuuan/react-native-toast-message';
import i18n from '../../i18n/i18n';
import { useSelector, useDispatch } from 'react-redux';
import Loading from './Loading';
import axios from 'axios';
import { registerRequest } from '../../redux/actions/index';

const SignUp = (props) => {

    const dispatch = useDispatch();
    const loading = useSelector(state => state.userReducer.loading);

    const registerRequestUser = (username, email, password) => dispatch(registerRequest(username, email, password));
    const [data, setData] = React.useState({
        username: '',
        password: '',
        email: '',
        confirm_password: '',
        check_textInputChange: false,
        secureTextEntry: true,
        isValidUser: true,
        isValidPassword: true,
        isValidEmail: true,
    });
    const { colors } = useTheme();

    const dosignUp = () => {
        registerRequestUser(data.username, data.email, data.password);
    }

    const textInputChange = (val) => {
        if( val.trim().length >= 4 ) {
            setData({
                ...data,
                username: val,
                check_textInputChange: true,
                isValidUser: true
            });
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
        if( val.trim().length >= 4 ) {
            setData({
                ...data,
                password: val,
                isValidPassword: true
            });
        } else {
            setData({
                ...data,
                password: val,
                isValidPassword: false
            });
        }
    }

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

    const updateSecureTextEntry = () => {
        setData({
            ...data,
            secureTextEntry: !data.secureTextEntry
        });
    }

    const handleValidUser = (val) => {
        if( val.trim().length >= 4 ) {
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

    
    return (
      <View style={[styles.container, {backgroundColor: colors.header}]}>
          <StatusBar backgroundColor={colors.header} barStyle="light-content"/>
        <View style={styles.header}>
            <AppText style={styles.text_header} i18nKey={'SignUp'}/>
        </View>
        <Animated.View 
            animation="fadeInUpBig"
            style={[styles.footer,{
                backgroundColor: colors.background
            }]}
        >
            <ScrollView>
            <AppText style={[styles.text_footer, {
                color: colors.text
            }]} i18nKey={'username'}/>
            <View style={styles.action}>
                <FontAwesome 
                    name="user-o"
                    size={20}
                    color={colors.text}
                />
                <TextInput 
                    placeholder = {i18n.t('enter your username')}
                    placeholderTextColor="#666666"
                    style={[styles.textInput, {
                        color: colors.text
                    }]}
                    autoCapitalize="none"
                    onChangeText={(val) => textInputChange(val)}
                    onEndEditing={(e)=>handleValidUser(e.nativeEvent.text)}
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
            { data.isValidUser ? null : 
            <Animated.View animation="fadeInLeft" duration={500}>
            <AppText style={styles.errorMsg} i18nKey={'Username must be 4 characters long'} />
            </Animated.View>
            }
            
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

            <AppText style={[styles.text_footer, {
                marginTop: 15,
                color: colors.text
            }]} i18nKey={'password'}/>
            <View style={styles.action}>
                <Feather 
                    name="lock"
                    size={20}
                    color={colors.text}
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

            
            { data.isValidPassword ? null : 
            <Animated.View animation="fadeInLeft" duration={500}>
            <AppText style={styles.errorMsg} i18nKey={'Password must be 4 characters long'} />
            </Animated.View>
            }
            
            <View style={styles.button}>
                <TouchableOpacity
                    style={[styles.signIn, {backgroundColor: colors.header}]}
                    // onPress = {() => doRegister()}
                    onPress = {() => dosignUp()}
                >
                <View
                    colors={['#08d4c4', '#01ab9d']}
                    style={styles.signIn}
                >
                    <AppText style={[styles.textSign, {
                        color:'white'
                    }]} i18nKey={'SignUp'}/>
                </View>
                </TouchableOpacity>

                <TouchableOpacity
                    onPress={() => props.navigation.navigate('Login')}
                    style={[styles.signIn, {
                        borderColor: colors.header,
                        borderWidth: 1,
                        marginTop: 15
                    }]}
                >
                    <AppText style={[styles.textSign, {
                        color: colors.header
                    }]} i18nKey={'Login'}/>
                </TouchableOpacity>
            </View>
            </ScrollView>
        </Animated.View>
        {loading && <Loading />}
      </View>
    );
};

export default SignUp;

const styles = StyleSheet.create({
    container: {
        flex: 1, 
        backgroundColor: '#009387'
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
          flex: 4,
          backgroundColor: '#fff',
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
      },
      extPrivate: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        marginTop: 20
        },
        color_textPrivate: {
            color: 'grey'
        }
    
  });