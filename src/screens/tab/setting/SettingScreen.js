import React, { useEffect, useState } from 'react'
import { Text, View, SafeAreaView, TouchableOpacity, Dimensions } from 'react-native'
import CustomHeader from '../../CustomHeader';
import { Kanji } from 'react-native-kanji-animation';
import { useDispatch, useSelector } from 'react-redux';
import { getListScheduleRequest } from '../../../redux/actions/schedule.action';
import { getListVocaRequest } from '../../../redux/actions/vocabulary.action';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import Icon from 'react-native-vector-icons/Ionicons';
import Icons from 'react-native-vector-icons/MaterialIcons';
import Entypo from 'react-native-vector-icons/Entypo';
import Entypos from 'react-native-vector-icons/FontAwesome5';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { getListShareVocaRequest } from '../../../redux/actions/vocabulary.action';
import { useTheme } from 'react-native-paper';

const WIDTH = Dimensions.get('window').width;

const SettingScreen = ({ navigation }) => {
    const { colors } = useTheme();

    const dispatch = useDispatch();
    const users = useSelector(state => state.userReducer.user);
    const moveCalendar = () => {
        console.log('move calendar');
        dispatch(getListScheduleRequest(users._id));
        navigation.navigate("Calendar", { navigation: navigation });
    }
    const moveVocabulary = () => {
        dispatch(getListVocaRequest(users._id));
        dispatch(getListShareVocaRequest(users._id));
        navigation.navigate("VocabularyScreen", { navigation: navigation });
    }
    // useEffect(() => {
    //     const unsubscribe = navigation.addListener('focus', () => {
    //         dispatch(getListVocaRequest(users._id));
    //       //Put your Data loading function here instead of my loadData()
    //     });
    
    //     return unsubscribe;
    //   }, [navigation]);

    return (
        <View>
            <View>
                <Text style={{ fontSize: 20, color: colors.header, paddingTop: 20, paddingLeft: 20 }}>Tiện ích</Text>
            </View>
            <View style={{flexDirection: 'row', marginTop: 20, justifyContent: 'center'}}>
                {/* <Text>Tiện ích</Text> */}
                <View style={{ alignItems: 'center', margin: 5, justifyContent: 'center', backgroundColor: colors.setting, padding: 20, width: WIDTH / 4 - 10 }}>
                    <TouchableOpacity
                        onPress={() => moveVocabulary()}
                    >
                        <SimpleLineIcons name={'notebook'} size={35} style={{ color: '#a6a6a6', }} />
                    </TouchableOpacity>
                    <Text style={{color: colors.text}}>Sổ tay</Text>
                </View>

                <View style={{ alignItems: 'center', margin: 5,justifyContent: 'center', backgroundColor: colors.setting, padding: 10, width: WIDTH / 4 - 10 }}>
                    <TouchableOpacity
                        onPress={() => navigation.navigate("AddCalendar", { navigation: navigation, type: 0})}
                    >
                        <Icon name={'ios-notifications-outline'} size={35} style={{ color: '#a6a6a6', }} />
                    </TouchableOpacity>
                    <Text style={{color: colors.text}}>Nhắc nhở</Text>
                </View>

                <View style={{ alignItems: 'center', margin: 5,justifyContent: 'center', backgroundColor: colors.setting, padding: 10, width: WIDTH / 4 - 10 }}>
                    <TouchableOpacity
                        onPress={() => moveCalendar()}
                    >
                        <Icons name={'schedule'} size={35} style={{ color: '#a6a6a6', }} />
                    </TouchableOpacity>
                    <Text style={{color: colors.text}}>Lịch trình</Text>
                </View>

                {/* <View style={{ alignItems: 'center',margin: 5, justifyContent: 'center', backgroundColor: colors.setting, padding: 10, width: WIDTH / 4 - 10 }}>
                    <TouchableOpacity
                    >
                        <Entypo name={'share-alternative'} size={35} style={{ color: '#a6a6a6', }} />
                    </TouchableOpacity>
                    <Text style={{color: colors.text}}>Chia sẻ</Text>
                </View> */}
            </View>
            {/* <TouchableOpacity onPress={() => navigation.navigate("AddCalendar", { navigation: navigation })}>
                <Text> Nhắc nhở luyện tập</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => moveCalendar()}>
                <Text> Xem schedule</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => moveVocabulary()}>
                <Text> Tạo sổ tay</Text>
            </TouchableOpacity> */}
            <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
                <View style={{ alignItems: 'center', justifyContent: 'center', backgroundColor: colors.setting, padding: 10, width: WIDTH / 4 - 10, margin: 5 }}>
                    <TouchableOpacity
                    onPress={() => navigation.navigate("Profile", {user: users})}
                    >
                        <Entypos name={'user-cog'} size={35} style={{ color: '#a6a6a6', }} />
                    </TouchableOpacity>
                    <Text style={{color: colors.text}}>Thông tin tài khoản</Text>
                </View>

                <View style={{ alignItems: 'center', justifyContent: 'center', backgroundColor: colors.setting, padding: 10, width: WIDTH / 4 - 10, margin:5 }}>
                    <TouchableOpacity
                    onPress={() => navigation.navigate("PlainSuggest", {navigation: navigation})}
                    >
                        <Icons name={'settings-system-daydream'} size={35} style={{ color: '#a6a6a6', }} />
                    </TouchableOpacity>
                    <Text style={{color: colors.text}}>Gợi ý kế hoạch học tập</Text>
                </View>
            </View>
        </View>
    )
}
export default SettingScreen;