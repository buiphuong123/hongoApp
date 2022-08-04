import React, { useEffect, useState } from 'react'
import { Text, Alert, View, StyleSheet, ActivityIndicator, TouchableOpacity, Image, Dimensions, FlatList } from 'react-native'
import { useSelector, useDispatch } from 'react-redux';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Iconss from 'react-native-vector-icons/MaterialCommunityIcons';
import ImagePicker from 'react-native-image-crop-picker';
import axios from 'axios';
import SelectDropdown from 'react-native-select-dropdown';
import { TextInput } from 'react-native-paper';
import CustomHeader from "../../CustomHeader";
import Modal from 'react-native-modal'; // 2.4.0
const WIDTH = Dimensions.get('window').width;
import Icons from 'react-native-vector-icons/AntDesign';
import { useTheme } from 'react-native-paper';
import DateTimePicker from '@react-native-community/datetimepicker';
import Icon from 'react-native-vector-icons/Ionicons';
import { remoteNotiiphone } from '../../../redux/actions/notifi.action';
import { showToastSuccess, showToastError } from '../../../helpers/toastHelper';
export default PlainSuggest = ({ navigation }) => {
    const { colors } = useTheme();
    const dispatch = useDispatch();
    const [level, setLevel] = useState("N5");
    const [levelfulture, setLevelFulture] = useState("N5");
    const leveloptions = ["Bắt đầu", "N5", "N4", "N3", "N2"];
    const [time, setTime] = useState(1);
    const [listTime, setListTime] = useState([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]);
    const [type, setType] = useState("tháng");
    const users = useSelector(state => state.userReducer.user);
    const [isVisible, setisVisible] = useState(false);
    const [listtype, setListType] = useState(["tháng", "năm"]);
    const [listtypenoti, setListTypenoti] = useState(["10 phút trước", "20 phút trước", "1 giờ trước"]);
    const [timenoti, setTimeNoti] = useState("10 phút trước");
    const [mode, setMode] = useState('date');
    const [show, setShow] = useState(false);
    var now = new Date();
    const [dateCalen, setdateCalen] = useState(now);
    const [date, setDate] = useState(new Date());
    const noti10mintuesbefore = useSelector(state => state.notifiReducer.noti10mintuesbefore);
    const noti30mintuesbefore = useSelector(state => state.notifiReducer.noti30mintuesbefore);
    const noti1hourbefore = useSelector(state => state.notifiReducer.noti1hourbefore);
    const noti1daybefore = useSelector(state => state.notifiReducer.noti1daybefore);
    const iphoneNoti = useSelector(state => state.notifiReducer.iphoneNoti);
    const [scheduleee, setScheduleee] = useState([]);
    const [isend, setisEnd] = useState(false);
    const showMode = (currentMode) => {
        setShow(true);
        setMode(currentMode);
    }
    const onChange = (event, selectedDate) => {
        const currentDate = selectedDate || date;
        setShow(false);
        setDate(currentDate);
        let tempDate = new Date(currentDate);
        setdateCalen(tempDate);
    }
    const fixDigit = (val) => {
        return (val < 10 ? '0' : '') + val;
    }
    const suggest = () => {
        var now = 5; var fulture = 5;
        var timeDo;
        if (level === "N5") {
            now = 5;
        }
        else if (level === "N4") {
            now = 4;
        }
        else if (level === "N3") {
            now = 3;
        }
        else if (level === "N2") {
            now = 2;
        }
        else {
            now = 0;
        }
        if (levelfulture === "N5") {
            fulture = 5;
        }
        else if (levelfulture === "N4") {
            fulture = 4;
        }
        else if (levelfulture === "N3") {
            fulture = 3;
        }
        else if (levelfulture === "N2") {
            fulture = 2;
        }
        else {
            fulture = 0;
        }
        if (type === "tháng") {
            timeDo = time * 30 * 2;
        }
        else if (type === "năm") {
            timeDo = time * 12 * 30 * 2;
        }
        axios.post('https://nameless-spire-67072.herokuapp.com/language/suggesst1', {
            "now": now,
            "future": fulture,
            "time": timeDo,
            "user_id": users._id
        }, {
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json"
            }
        })
            .then((response) => {
                console.log(response.data);
                if (response.data.code === 0) {
                    Alert.alert(
                        "Thông báo",
                        response.data.mess + "!",
                        [
                            {
                                text: "Yes", onPress: () => {
                                    console.log('yes press');
                                }
                            }
                        ]
                    )
                }
                else if (response.data.code === 2) {
                    Alert.alert(
                        "Thông báo",
                        response.data.mess + "!",
                        [
                            {
                                text: "Yes", onPress: () => {
                                    console.log('yes press');
                                }
                            },
                            {
                                text: "Xoá kế hoạch", onPress: () => {
                                    axios.post('https://nameless-spire-67072.herokuapp.com/language/deletesuggestPlain', {
                                        "user_id": users._id
                                    }, {
                                        headers: {
                                            "Accept": "application/json",
                                            "Content-Type": "application/json"
                                        }
                                    })
                                        .then((response1) => {
                                            console.log(response1.data);
                                            if (response1.data.code === 1) {
                                                showToastSuccess(response1.data.mess);
                                            }
                                            else {
                                                showToastError(response1.data.err);
                                            }
                                            // dispatch(getListScheduleRequest(users._id));
                                        })
                                        .catch(function (error) {
                                            throw error;
                                        })
                                }
                            }
                        ]
                    )
                }
                else {
                    Alert.alert(
                        "Thông báo",
                        response.data.mess,
                        [
                            {
                                text: "No",
                                onPress: () => {
                                    console.log('no');
                                },
                                style: "cancel"

                            },
                            {
                                text: "Yes", onPress: () => {
                                    console.log('bat dau laap ke hoach');
                                    setScheduleee(response.data.result);
                                    setisVisible(true);

                                }
                            },

                        ]
                    )
                }
            })
            .catch(function (error) {
                throw error;
            })
    }

    const setIphone = () => {
        if (iphoneNoti === false) {
            dispatch(remoteNotiiphone(true));
        }
        else {
            dispatch(remoteNotiiphone(false));
        }
    }
    const setListSchedule = () => {
        setisVisible(false);
        setisEnd(true);
        var timenotikk = 1;
        var method = 0;

        if (timenoti === "20 phút trước") {
            timenotikk = 2;
        }
        else if (timenoti === "1 giờ trước") {
            timenotikk = 3;
        }

        if (iphoneNoti) {
            method = 1;
        }
        console.log('time ', dateCalen.getHours() + ':' + fixDigit(dateCalen.getMinutes()));
        console.log(timenotikk, method);
        axios.post('https://nameless-spire-67072.herokuapp.com/language/startLearn', {
            "result": scheduleee,
            "user_id": users._id,
            "method": method,
            "timenoti": timenotikk,
            "time": dateCalen.getHours() + ':' + fixDigit(dateCalen.getMinutes())
        }, {
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json"
            }
        })
            .then((response) => {
                console.log(response.data);
                if (response.data.code === 1) {

                    setisEnd(false);
                    showToastSuccess("Lập lịch thành công");
                    axios.post('https://nameless-spire-67072.herokuapp.com/language/runNotifi', {
                        "user_id": users._id
                    }, {
                        headers: {
                            "Accept": "application/json",
                            "Content-Type": "application/json"
                        }
                    })
                        .then((response) => {
                            console.log(response.data);
                        })
                        .catch(function (error) {
                            throw error;
                        })
                }
                // dispatch(getListScheduleRequest(users._id));
            })
            .catch(function (error) {
                throw error;
            })
    }
    return (
        <View style={{ flex: 1 }}>
            <CustomHeader title={"gợi ý kế hoạch học"} navigation={navigation} />
            <View style={{ flex: 1 }}>
                <View style={{ flexDirection: 'row', padding: 10 }}>
                    <Text style={[styles.text, { color: colors.text }]}>Trình độ hiện tại</Text>
                    <SelectDropdown
                        data={leveloptions}
                        onSelect={(selectedItem, index) => {
                            setLevel(selectedItem);
                        }}
                        dropdownStyle={{ backgroundColor: colors.dropdown }}
                        defaultValue={level}
                        buttonStyle={{ backgroundColor: colors.background, }}
                        buttonTextStyle={{ backgroundColor: colors.dropdown, color: colors.text, borderWidth: 1, borderColor: 'gray', marginTop: 10, padding: 10 }}
                    />
                </View>

                <View style={{ flexDirection: 'row', padding: 10 }}>
                    <Text style={[styles.text, { color: colors.text }]}>Trình độ mong muốn</Text>
                    <SelectDropdown
                        data={leveloptions}
                        onSelect={(selectedItem, index) => {
                            setLevelFulture(selectedItem);
                        }}
                        dropdownStyle={{ backgroundColor: colors.dropdown }}
                        defaultValue={levelfulture}
                        buttonStyle={{ backgroundColor: colors.background, }}
                        buttonTextStyle={{ backgroundColor: colors.dropdown, color: colors.text, borderWidth: 1, borderColor: 'gray', marginTop: 10, padding: 10 }}
                    />
                </View>
                <View style={{ flexDirection: 'row', padding: 10 }}>
                    <Text style={[styles.text, { color: colors.text }]}>Thời gian mong muốn</Text>
                    <SelectDropdown
                        data={listTime}
                        onSelect={(selectedItem, index) => {
                            setTime(selectedItem);
                        }}
                        dropdownStyle={{ backgroundColor: colors.dropdown }}
                        defaultValue={time}
                        buttonStyle={{ width: '20%', backgroundColor: colors.background, }}
                        buttonTextStyle={{ width: '20%', color: colors.text, backgroundColor: colors.dropdown, borderWidth: 1, borderColor: 'gray', marginTop: 10, padding: 10 }}
                    />

                    <SelectDropdown
                        data={listtype}
                        onSelect={(selectedItem, index) => {
                            setType(selectedItem);
                        }}
                        dropdownStyle={{ backgroundColor: colors.dropdown }}
                        defaultValue={type}
                        buttonStyle={{ width: '30%', backgroundColor: colors.background, }}
                        buttonTextStyle={{ width: '30%', color: colors.text, backgroundColor: colors.dropdown, borderWidth: 1, borderColor: 'gray', marginTop: 10, paddingTop: 10, paddingRight: 10 }}
                    />
                </View>
                <TouchableOpacity
                    onPress={() => suggest()}
                    style={{ backgroundColor: colors.header, alignSelf: 'center', padding: 10, justifyContent: 'center', marginTop: 20 }}>
                    <Text style={{ color: '#fff' }}>Gợi ý</Text>
                </TouchableOpacity>
            </View>
            {
                isend === true ?
                    <ActivityIndicator size="large" color="#0000ff" />
                    : null
            }
            <View style={styles.container}>
                <Modal
                    isVisible={isVisible}
                    animationInTiming={1000}
                    animationOutTiming={1000}
                    backdropTransitionInTiming={1000}
                    backdropTransitionOutTiming={1000}
                    deviceWidth={WIDTH}
                >
                    <View style={[styles.modalContent, { marginTop: 50, minHeight: 170, backgroundColor: colors.background, padding: 20 }]}>
                        <View style={{ justifyContent: 'space-between', flexDirection: 'row' }}>
                            <View />
                            <View>
                                <Text style={{ color: colors.text, fontSize: 18 }}>Cài đặt thời gian</Text>
                            </View>
                            <Icons name={'close'} size={20} color={colors.text}
                                onPress={() => setisVisible(false)}
                                style={{ marginTop: 5, marginRight: 10 }} />
                        </View>
                        <View >

                            <View style={{ borderBottomWidth: 1, borderBottomColor: '#e6e6e6', padding: 20 }}>
                                <View style={{ flexDirection: 'row', }}>
                                    <TouchableOpacity onPress={() => showMode('time')}>
                                        <Icon name={'time-outline'} size={20} style={{ color: 'blue' }} />
                                    </TouchableOpacity>
                                    <Text style={{ marginLeft: 10, color: colors.text }}>{fixDigit(dateCalen.getHours()) + ':' + fixDigit(dateCalen.getMinutes())}</Text>
                                </View>
                            </View>
                            <View style={{ flexDirection: 'row', justifyContent: 'space-between', padding: 20 }}>
                                <View onPress={() => setModalVisible(true)}>
                                    <Icon name={'notifications-outline'} size={20} style={{ color: '#808080' }} />
                                </View>
                                <SelectDropdown
                                    data={listtypenoti}
                                    onSelect={(selectedItem, index) => {
                                        setTimeNoti(selectedItem);
                                    }}
                                    dropdownStyle={{ backgroundColor: colors.dropdown }}
                                    defaultValue={timenoti}
                                    buttonStyle={{ width: '80%', backgroundColor: colors.background, marginTop: -10 }}
                                    buttonTextStyle={{ padding: 5, width: '80%', color: colors.text, backgroundColor: colors.dropdown, borderWidth: 1, borderColor: 'gray', }}
                                />
                                <TouchableOpacity style={{ marginLeft: 40 }} onPress={() => setIphone()}>
                                    <MaterialIcons name={'phone-iphone'} size={20} style={{ color: iphoneNoti ? 'blue' : '#bfbfbf' }} />
                                </TouchableOpacity>
                            </View>
                            <TouchableOpacity
                                onPress={() => setListSchedule()}
                                style={{ justifyContent: 'center', alignSelf: 'center', backgroundColor: colors.header, padding: 10 }}>
                                <Text style={{ textAlign: 'center', color: '#fff' }}>Cài đặt</Text>
                            </TouchableOpacity>

                            {/* <View style={{flexDirection: 'row',borderBottomWidth: 1, borderBottomColor: '#e6e6e6', padding: 20 }}>
                                <View onPress={() => setModalVisible(true)}>
                                    <Icon name={'notifications-outline'} size={20} style={{ color: '#808080' }} />
                                </View>
                                <TouchableOpacity style={{ marginLeft: 40 }} onPress={() => setIphone()}>
                                    <MaterialIcons name={'phone-iphone'} size={20} style={{ color: iphoneNoti ? 'blue' : '#bfbfbf' }} />
                                </TouchableOpacity>
                            </View> */}
                        </View>
                    </View>
                </Modal>
            </View>
            {
                show && (
                    <DateTimePicker
                        testID='dateTimePicker'
                        value={date}
                        mode={mode}
                        is24Hour={true}
                        display='default'
                        onChange={onChange}
                    />

                )
            }
        </View>
    )
}

const styles = StyleSheet.create({
    text: {
        width: '40%', alignSelf: 'center', fontWeight: 'bold', fontSize: 18
    },
    container: {
        width: WIDTH,
        flex: 1,
    },
    modalContent: {

        borderRadius: 4,
        borderColor: 'rgba(0, 0, 0, 0.1)',
    },
    inputText: {
        backgroundColor: '#fff',
        marginLeft: 12,
        borderWidth: 1, height: 40, width: '20%', borderColor: '#cccccc', padding: 5
    }
})