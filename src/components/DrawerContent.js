import React, {useState, useEffect} from 'react';
import { View, StyleSheet, Modal, TouchableOpacity, Image } from 'react-native';
import {
    useTheme,
    Avatar,
    Title,
    Caption,
    Paragraph,
    Drawer,
    Text,
    TouchableRipple,
    Switch
} from 'react-native-paper';
import {
    DrawerContentScrollView,
    DrawerItem
} from '@react-navigation/drawer';

import { connect } from 'react-redux';
import * as actions from './../redux/actions/index';

import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Iconss from 'react-native-vector-icons/Ionicons';
import{ AuthContext } from '../components/context';
import en from '../assets/images/en.png';
import vn from '../assets/images/vn.png';
import jpp from '../assets/images/jpp.png';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useSelector, useDispatch } from 'react-redux';
import { changeLanguage, logoutUser, setIsEnd } from '../redux/actions/index';
import SeeMore from 'react-native-see-more-inline';

const DrawerContent = (props) => {

    const paperTheme = useTheme();
    const { colors } = useTheme();
    const { toggleTheme } = React.useContext(AuthContext);
    const [show, setShow] = useState(false);
    const user = useSelector(state => state.userReducer.user)
    const dispatch = useDispatch();
    // const logout = (token, notifiToken, props) => dispatch(logoutUser(token, notifiToken, props));
    const setLanguages = (language) => dispatch(changeLanguage(language));
    
 
    const setLanguage = (language) => {
        setLanguages(language);
        setShow(false);
        try{
            AsyncStorage.setItem('@language', language);
        } catch(e){
            console.log('error store async storage');
        }
   }

   const logoutUs = () => {
    // props.navigation.navigate("Login");
    // console.log('USER HIEN TAI FORM ', user);
    dispatch(logoutUser(user._id, props));
    // logout(user.token, user.notifiToken, props);
    
   }
    return(
        <View style={{flex:1}}>
            <DrawerContentScrollView>
                <View style={styles.drawerContent}>
                    <View style={styles.userInfoSection}>
                        <View style={{flexDirection:'row',marginTop: 15}}>
                            <Avatar.Image 
                                source={{
                                    uri: user.avatar
                                }}
                                size={50}
                            />
                            <View style={{marginLeft:15, flexDirection:'column', }}>
                                <Title style={styles.title}>{user.username}</Title>
                                
                            <Text style={{marginRight: 20, width: 200}}>{user.email}</Text>
                            </View>
                        </View>

                    </View>

                    <Drawer.Section style={styles.drawerSection}>
                        <DrawerItem 
                            icon={({color, size}) => (
                                <Icon 
                                name="home-outline" 
                                color={color}
                                size={size}
                                />
                            )}
                            label="Trang chủ"
                            onPress={() => {props.navigation.navigate('Home')}}
                        />
                        <DrawerItem 
                            icon={({color, size}) => (
                                <Icon 
                                name="account-outline" 
                                color={color}
                                size={size}
                                />
                            )}
                            label="Trang cá nhân"
                            onPress={() => {props.navigation.navigate('Profile', {user: user})}}
                        />
                        {/* <DrawerItem 
                            icon={({color, size}) => (
                                <Icon 
                                name="bookmark-outline" 
                                color={color}
                                size={size}
                                />
                            )}
                            label="Bookmarks"
                            // onPress={() => {props.navigation.navigate('BookmarkScreen')}}
                        /> */}
                        {/* <DrawerItem 
                            icon={({color, size}) => (
                                <Icon 
                                name="settings-outline" 
                                color={color}
                                size={size}
                                />
                            )}
                            label="Settings"
                            // onPress={() => {props.navigation.navigate('SettingsScreen')}}
                        /> */}
                        {/* <DrawerItem 
                            icon={({color, size}) => (
                                <Icon 
                                name="account-check-outline" 
                                color={color}
                                size={size}
                                />
                            )}
                            label="Support"
                            // onPress={() => {props.navigation.navigate('SupportScreen')}}
                        /> */}
                    </Drawer.Section>

                    {/* <Drawer.Section title="Language">
                        <DrawerItem 
                                icon={({color, size}) => (
                                    <Iconss 
                                    name="language-outline" 
                                    color={color}
                                    size={size}
                                    />
                                )}
                                label="Language"
                                onPress={() => setShow(true)}
                        />
                    </Drawer.Section> */}

                    <Drawer.Section title="Cài đặt">
                        <TouchableRipple onPress={() => {toggleTheme()}}>
                            <View style={styles.preference}>
                                <Text>Dark Mode</Text>
                                <View pointerEvents="none">
                                    <Switch value={paperTheme.dark}/>
                                </View>
                            </View>
                        </TouchableRipple>
                    </Drawer.Section>
                </View>
            </DrawerContentScrollView>
            <Drawer.Section style={styles.bottomDrawerSection}>
                <DrawerItem 
                    icon={({color, size}) => (
                        <Icon 
                        name="exit-to-app" 
                        color={color}
                        size={size}
                        />
                    )}
                    label="Đăng xuất"
                    onPress={() => {logoutUs()}}
                />
            </Drawer.Section>

            <Modal 
                transparent={true}
                visible={show}
             >
                <View style={{backgroundColor: '#000000aa', flex: 1}}>
                    <View style={{backgroundColor: colors.background, margin: 30, padding:20, paddingTop: 0,borderRadius: 10, flex: 1}}>
                        <Iconss name="close-circle-outline" 
                            size={28} 
                            style={{position: 'absolute', right: 5, top: 10, color: colors.text}} 
                            onPress={() => setShow(false)} 
                        />
                        <View style={{alignItems: 'center', justifyContent: 'center', marginTop: 50, marginBottom: 20}}>
                            <Text style={{fontSize: 23,}}>Choose language</Text>
                        </View>
                        <View style={{borderWidth: 1, borderColor: '#d9d9d9'}}>
                            <TouchableOpacity onPress={() => setLanguage('vi')}>
                                <View style={{ borderBottomWidth: 1, borderBottomColor: '#d9d9d9', margin: 10}}>
                                    <View style={{ flexDirection: 'row', marginBottom: 10, alignItems: 'center', }}>
                                        <Image source={vn} style={{width: 60, height: 60}} />
                                        <View >
                                            <Text style={{marginLeft: 20}}>Vietnamese</Text>
                                        </View>
                                    </View>
                                </View>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => setLanguage('jp')}>
                                <View style={{ borderBottomWidth: 1, borderBottomColor: '#d9d9d9', margin: 10}}>
                                    <View style={{ flexDirection: 'row', marginBottom: 10, alignItems: 'center', }}>
                                        <Image source={jpp} style={{width: 60, height: 60}} />
                                        <View >
                                            <Text style={{marginLeft: 20}}>Japanese</Text>
                                        </View>
                                    </View>
                                </View>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => setLanguage('en')}>
                                <View style={{borderBottomColor: '#d9d9d9', margin: 10}}>
                                    <View style={{ flexDirection: 'row', marginBottom: 10, alignItems: 'center', }}>
                                        <Image source={en} style={{width: 60, height: 60}} />
                                        <View >
                                            <Text style={{marginLeft: 20}}>English</Text>
                                        </View>
                                    </View>
                                </View>

                            </TouchableOpacity>
                        </View>
                    </View>

                </View>
            </Modal>
           
        </View>
    );
}

export default DrawerContent;

const styles = StyleSheet.create({
    drawerContent: {
      flex: 1,
    },
    userInfoSection: {
      paddingLeft: 10,
    },
    title: {
      fontSize: 16,
      marginTop: 3,
      fontWeight: 'bold',
    },
    caption: {
      fontSize: 14,
      lineHeight: 14,
      width: 220,
      paddingRight: 10
    },
    row: {
      marginTop: 20,
      flexDirection: 'row',
      alignItems: 'center',
    },
    section: {
      flexDirection: 'row',
      alignItems: 'center',
      marginRight: 15,
    },
    paragraph: {
      fontWeight: 'bold',
      marginRight: 3,
    },
    drawerSection: {
      marginTop: 15,
    },
    bottomDrawerSection: {
        marginBottom: 15,
        borderTopColor: '#f4f4f4',
        borderTopWidth: 1
    },
    preference: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      paddingVertical: 12,
      paddingHorizontal: 16,
    },
    languages: {
        flexDirection: 'row',
         marginTop: 10, 
         justifyContent: 'center', 
         alignItems: "center", 
         marginTop: 28
    }
  });