import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Dimensions, TextInput, Platform } from 'react-native';
import { Agenda } from 'react-native-calendars';
import { Card, Avatar, Button } from 'react-native-paper';
import Icon from 'react-native-vector-icons/Ionicons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Icons from 'react-native-vector-icons/EvilIcons';
import DateTimePicker from '@react-native-community/datetimepicker';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Modal from 'react-native-modal'; // 2.4.0
import CheckBox from '@react-native-community/checkbox';
import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Entypo from 'react-native-vector-icons/Entypo';
import { RadioButton } from 'react-native-paper';
import { getListScheduleRequest } from '../../../redux/actions/schedule.action';
import { remoteNoti10before, remoteNoti30before, remoteNoti1hourbefore, remoteNoti1daybefore, remoteNotimail, remoteNotiiphone } from '../../../redux/actions/notifi.action';
const { height } = Dimensions.get('window');
import { useTheme } from 'react-native-paper';
import { showToastError, showToastSuccess } from '../../../helpers/toastHelper';

export default AddCalendar = ({ navigation, route }) => {
    const { colors } = useTheme();
    const { type } = route.params;
    const dispatch = useDispatch();
    const noti10mintuesbefore = useSelector(state => state.notifiReducer.noti10mintuesbefore);
    const noti30mintuesbefore = useSelector(state => state.notifiReducer.noti30mintuesbefore);
    const noti1hourbefore = useSelector(state => state.notifiReducer.noti1hourbefore);
    const noti1daybefore = useSelector(state => state.notifiReducer.noti1daybefore);
    const mailNoti = useSelector(state => state.notifiReducer.mailNoti);
    const iphoneNoti = useSelector(state => state.notifiReducer.iphoneNoti);

    const [date, setDate] = useState(new Date());
    const [mode, setMode] = useState('date');
    const [show, setShow] = useState(false);
    const [text, setText] = useState('Empty');
    const users = useSelector(state => state.userReducer.user);
    const [isModalVisible, setModalVisible] = useState(false);
    const [isModalRecurrence, setModalRecurrence] = useState(false);
    const [namesche, setNamesche] = useState("");
    const [value, setValue] = useState("10 phút trước");
    const [note, setNote] = useState("");
    const toggleModal = () => {
        setModalVisible(!isModalVisible);
    };
    const toggleModalRecurrence = () => {
        setModalRecurrence(!isModalRecurrence);
    };
    var now = new Date();
    const fixDigit = (val) => {
        return (val < 10 ? '0' : '') + val;
    }
    // const [dateCalen, setdateCalen] = useState(fixDigit(now.getDate()) + '/' + fixDigit(now.getMonth() + 1) + '/' + now.getFullYear());
    // const [timecalen, settimeCalen] = useState(fixDigit(now.getHours()) + ':' + fixDigit(now.getMinutes()));
    const [dateCalen, setdateCalen] = useState(now);
    const [endDate, setEndDate] = useState(now);
    const [modeEndDate, setModeEndDate] = useState('date');
    const [showEndDate, setShowEndDate] = useState(false);
    const [enddate, setendDate] = useState(new Date());
    // const [timecalen, settimeCalen] = useState(now);
    const onChange = (event, selectedDate) => {
        const currentDate = selectedDate || date;
        setShow(false);
        setDate(currentDate);
        let tempDate = new Date(currentDate);
        setdateCalen(tempDate);
    }

    const onChangeEndDate = (event, selectedDate) => {
        const currentDate = selectedDate || date;
        setShowEndDate(false);
        setendDate(currentDate);

        let tempDate = new Date(currentDate);
        setEndDate(tempDate);
    }

    const showMode = (currentMode) => {
        setShow(true);
        setMode(currentMode);
    }
    const showModeEndDate = (currentMode) => {
        setShowEndDate(true);
        setModeEndDate(currentMode);
    }

    const sendSchedule = () => {
        const datestart = fixDigit(dateCalen.getFullYear()) + '-' + fixDigit(dateCalen.getMonth() + 1) + '-' + fixDigit(dateCalen.getDate());
        const dateend = fixDigit(endDate.getFullYear()) + '-' + fixDigit(endDate.getMonth() + 1) + '-' + fixDigit(endDate.getDate());
        var d1 = datestart.split("-");
        var d2 = dateend.split("-");
        const from = new Date(d1[0], parseInt(d1[1]) - 1, d1[2]);  // -1 because months are from 0 to 11
        const to = new Date(d2[0], parseInt(d2[1]) - 1, d2[2]);
        if(namesche === "") {
            showToastError("Vui lòng không để trống tên!!");
        }
        if(from>=to){
            showToastError("Vui lòng nhập vào ngày hợp lệ!!")
        }
        var timenoti = 1;
        var method = 0;
        if (noti10mintuesbefore) {
            timenoti = 1;
        }
        else if (noti30mintuesbefore) {
            timenoti = 2;
        }
        else if (noti1hourbefore) {
            timenoti = 3;
        }
        else {
            timenoti = 4;
        }
        if (iphoneNoti) {
            method = 1;
        }
        console.log(namesche, note, fixDigit(dateCalen.getFullYear()) + '-' + fixDigit(dateCalen.getMonth() + 1) + '-' + fixDigit(dateCalen.getDate()),
            fixDigit(endDate.getFullYear()) + '-' + fixDigit(endDate.getMonth() + 1) + '-' + fixDigit(endDate.getDate()),
            dateCalen.getHours() + ':' + fixDigit(dateCalen.getMinutes()), timenoti, method, users._id
        );
        axios.post('https://nameless-spire-67072.herokuapp.com/language/remind', {
            "nameSchedule": namesche,
            "note": note,
            "datestart": datestart,
            "dateend": dateend,
            "time": dateCalen.getHours() + ':' + fixDigit(dateCalen.getMinutes()),
            // "time": dateCalen,
            "timenoti": timenoti,
            "method": method,
            "user_id": users._id,
            "action": "remind"
        }, {
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json"
            }
        })
            .then((response) => {
                console.log(response.data);
                if (response.data.code === 1) {
                    showToastSuccess("Tạo lịch trình thành công");
                }

                // dispatch(getListScheduleRequest(users._id));
            })
            .catch(function (error) {
                throw error;
            })
        dispatch(getListScheduleRequest(users._id));
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
        if (type === 1) {
            navigation.goBack();
        }
        else {
            navigation.navigate("Calendar", { navigation: navigation });
        }
        // navigation.goBack();
        // navigation.navigate("Calendar", { navigation: navigation });
    }

    const toggleSwitch10minutes = () => {
        setValue("10 phút trước");
        if (noti10mintuesbefore === 'unchecked') {
            dispatch(remoteNoti10before('checked'));
            dispatch(remoteNoti30before('unchecked'));
            dispatch(remoteNoti1hourbefore('unchecked'));
            dispatch(remoteNoti1daybefore('unchecked'));
        }
    }
    const toggleSwitch30minutes = () => {
        setValue("30 phút trước");
        if (noti30mintuesbefore === 'unchecked') {
            dispatch(remoteNoti10before('unchecked'));
            dispatch(remoteNoti30before('checked'));
            dispatch(remoteNoti1hourbefore('unchecked'));
            dispatch(remoteNoti1daybefore('unchecked'));
        }
    }
    const toggleSwitch1hour = () => {
        setValue("1 giờ trước");
        if (noti1hourbefore === 'unchecked') {
            dispatch(remoteNoti10before('unchecked'));
            dispatch(remoteNoti30before('unchecked'));
            dispatch(remoteNoti1hourbefore('checked'));
            dispatch(remoteNoti1daybefore('unchecked'));
        }
    }
    const toggleSwitch1day = () => {
        if (noti30mintuesbefore === 'unchecked') {
            dispatch(remoteNoti10before('unchecked'));
            dispatch(remoteNoti30before('unchecked'));
            dispatch(remoteNoti1hourbefore('unchecked'));
            dispatch(remoteNoti1daybefore('checked'));
        }
    }
    const setIphone = () => {
        // if (iphoneNoti === true && mailNoti === false) {
        //     dispatch(remoteNotiiphone(false));
        //     dispatch(remoteNotimail(true));
        // }
        // else if (iphoneNoti === true && mailNoti === true) {
        //     dispatch(remoteNotiiphone(false));
        // }
        // else 
        if (iphoneNoti === false) {
            dispatch(remoteNotiiphone(true));
        }
        else {
            dispatch(remoteNotiiphone(false));
        }
    }

    const setEmail = () => {
        if (mailNoti === true && iphoneNoti === false) {
            dispatch(remoteNotimail(false));
            dispatch(remoteNotiiphone(true));
        }
        else if (mailNoti === true && iphoneNoti === true) {
            dispatch(remoteNotimail(false));
        }
        else if (mailNoti === false) {
            dispatch(remoteNotimail(true));
        }
    }

    return (
        <View style={{ flex: 1 }}>
            <Card>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <AntDesign name={'close'} size={25} style={{ color: colors.text, paddingTop: 20, paddingLeft: 20 }} />
                </TouchableOpacity>
                <Card.Content>
                    <View
                        style={{
                            marginTop: 20,
                            marginLeft: 20,
                            height: height / 10,
                        }}>
                        <TextInput
                            style={{ fontSize: 18, padding: 15, color: colors.text }}
                            placeholder="Nhập tên lịch trình"
                            placeholderTextColor={colors.text_of_input}
                            value={namesche}
                            onChangeText={text => setNamesche(text)}
                        />
                    </View>
                </Card.Content>
            </Card>
            <ScrollView>
                <View style={{ borderBottomWidth: 1, borderBottomColor: '#e6e6e6', padding: 20 }}>
                    <View style={{ flexDirection: 'row', justifyContent: 'flex-start' }}>
                        <View style={{ flexDirection: 'row' }}>
                            <TouchableOpacity onPress={() => showMode('date')}>
                                <AntDesign name={'calendar'} size={20} style={{ color: 'blue' }} />
                            </TouchableOpacity>
                            {/* <Text style={{ marginLeft: 10 }}>{dateCalen}</Text> */}
                            <Text style={{ marginLeft: 10, color: colors.text }}>{fixDigit(dateCalen.getDate()) + '/' + fixDigit(dateCalen.getMonth() + 1) + '/' + dateCalen.getFullYear()}</Text>
                        </View>

                        <View style={{ flexDirection: 'row', marginLeft: 100 }}>
                            <TouchableOpacity onPress={() => showModeEndDate('date')}>
                                <AntDesign name={'calendar'} size={20} style={{ color: 'blue' }} />
                            </TouchableOpacity>
                            {/* <Text style={{ marginLeft: 10 }}>{dateCalen}</Text> */}
                            <Text style={{ marginLeft: 10, color: colors.text }}>{fixDigit(endDate.getDate()) + '/' + fixDigit(endDate.getMonth() + 1) + '/' + endDate.getFullYear()}</Text>
                        </View>



                    </View>
                </View>
                <View style={{ borderBottomWidth: 1, borderBottomColor: '#e6e6e6', padding: 20 }}>
                    <View style={{ flexDirection: 'row', }}>
                        <TouchableOpacity onPress={() => showMode('time')}>
                            <Icon name={'time-outline'} size={20} style={{ color: 'blue' }} />
                        </TouchableOpacity>
                        <Text style={{ marginLeft: 10, color: colors.text }}>{fixDigit(dateCalen.getHours()) + ':' + fixDigit(dateCalen.getMinutes())}</Text>
                    </View>
                </View>

                <TouchableOpacity style={{ borderBottomWidth: 1, borderBottomColor: '#e6e6e6', padding: 20 }} onPress={toggleModal}>
                    <View style={{ flexDirection: 'row', justifyContent: 'flex-start' }}>
                        <View style={{ flexDirection: 'row' }}>
                            <TouchableOpacity onPress={() => setModalVisible(true)}>
                                <Icon name={'notifications-outline'} size={20} style={{ color: '#808080' }} />
                            </TouchableOpacity>
                            <Text style={{ marginLeft: 10, color: colors.text }}>{value}</Text>
                        </View>
                    </View>
                </TouchableOpacity>


                <TouchableOpacity style={{ borderBottomWidth: 1, borderBottomColor: '#e6e6e6', padding: 20 }} onPress={toggleModalRecurrence}>
                    <View style={{}}>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                            {/* <TouchableOpacity onPress={() => showMode('date')}>
                                <Icons name={'refresh'} size={25} style={{ color: '#808080' }} />
                            </TouchableOpacity> */}
                            <View style={{ marginLeft: 10, }}>
                                <Text style={{ color: '#808080' }}>Nhắc nhở luyện tập</Text>
                            </View>
                            <View style={{ flexDirection: 'row' }}>
                                <TouchableOpacity style={{ marginLeft: 40 }} onPress={() => setIphone()}>
                                    <MaterialIcons name={'phone-iphone'} size={20} style={{ color: iphoneNoti ? 'blue' : '#bfbfbf' }} />
                                </TouchableOpacity>
                                {/* <TouchableOpacity style={{ marginLeft: 10 }} onPress={() => setEmail()}>
                                    <Entypo name={'mail'} size={20} style={{ color: mailNoti ? 'blue' : '#bfbfbf' }} />
                                </TouchableOpacity> */}
                            </View>
                        </View>

                    </View>
                </TouchableOpacity>

                <View style={{ paddingLeft: 20, paddingRight: 20, justifyContent: 'center', }}>
                    <View style={{ flexDirection: 'row', justifyContent: 'flex-start', flexGrow: 1 }}>
                        <View style={{ flexDirection: 'row', }}>
                            <View style={{ justifyContent: 'center' }}>
                                <TouchableOpacity onPress={() => showMode('date')}>
                                    <FontAwesome name={'sticky-note-o'} size={20} style={{ color: '#808080' }} />
                                </TouchableOpacity>
                            </View>
                            <View style={{ marginTop: 10 }}>
                                <TextInput
                                    style={{ padding: 20, paddingTop: 10, color: colors.text }}
                                    multiline={true}
                                    placeholder="Note...."
                                    placeholderTextColor={colors.text_of_input}
                                    value={note}
                                    onChangeText={text => setNote(text)}
                                />
                            </View>
                        </View>
                    </View>
                </View>

                {/* <TouchableOpacity onPress={() => sendSchedule()}>
                    <Text>crete schedule</Text>
                </TouchableOpacity> */}
                <View style={{ alignItems: 'center', justifyContent: 'center' }}>
                    <TouchableOpacity
                        onPress={() => sendSchedule()}
                        style={[styles.signIn, {
                            borderColor: colors.header,
                            borderWidth: 1,
                            marginTop: 15
                        }]}
                    >
                        <Text style={[styles.textSign, {
                            color: colors.header
                        }]}>create Schedule</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
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

            {
                showEndDate && (
                    <DateTimePicker
                        testID='dateTimePicker'
                        value={enddate}
                        mode={modeEndDate}
                        is24Hour={true}
                        display='default'
                        onChange={onChangeEndDate}
                    />

                )
            }

            {/* model */}
            <View style={styles.centeredView}>
                <Modal
                    // animationType="slide"
                    transparent={true}
                    // visible={modalVisible}
                    isVisible={isModalVisible}
                >
                    <View style={styles.centeredView}>
                        <View style={[styles.modalView, { backgroundColor: colors.background }]}>
                            <Text style={[styles.modalText, { color: colors.text }]}>Thông báo</Text>
                            <View style={{ marginBottom: 10 }}>
                                <View style={{ flexDirection: 'row' }}>
                                    <RadioButton
                                        uncheckedColor={colors.text}
                                        color={colors.header}
                                        tintColors={{ true: colors.header, false: colors.text }}
                                        status={noti10mintuesbefore}
                                        onPress={() => toggleSwitch10minutes()}
                                    />
                                    <Text style={[styles.centerStyle, { color: colors.text }]}>10 phút trước</Text>

                                </View>
                                <View style={{ flexDirection: 'row' }}>
                                    <RadioButton
                                        uncheckedColor={colors.text}
                                        color={colors.header}
                                        tintColors={{ true: colors.header, false: colors.text }}
                                        status={noti30mintuesbefore}
                                        onPress={() => toggleSwitch30minutes()}

                                    />
                                    <Text style={[styles.centerStyle, { color: colors.text }]}>30 phút trước</Text>

                                </View>
                                <View style={{ flexDirection: 'row' }}>
                                    <RadioButton
                                        uncheckedColor={colors.text}
                                        color={colors.header}
                                        tintColors={{ true: colors.header, false: colors.text }}
                                        status={noti1hourbefore}
                                        onPress={() => toggleSwitch1hour()}

                                    />
                                    <Text style={[styles.centerStyle, { color: colors.text }]}>1 giờ trước</Text>

                                </View>


                                {/* <View style={styles.checkboxStyle}>
                                    <CheckBox
                                        style={styles.centerStyle}
                                    // value={isMemerize}
                                    // onValueChange={(value) => seletMemerizedall(value)}
                                    />
                                    <Text style={styles.centerStyle}>10 minutes</Text>
                                </View>

                                <View style={styles.checkboxStyle}>
                                    <CheckBox
                                        style={styles.centerStyle}
                                    // value={isMemerize}
                                    // onValueChange={(value) => seletMemerizedall(value)}
                                    />
                                    <Text style={styles.centerStyle}>30 minutes</Text>
                                </View>

                                <View style={styles.checkboxStyle}>
                                    <CheckBox
                                        style={styles.centerStyle}
                                    // value={isMemerize}
                                    // onValueChange={(value) => seletMemerizedall(value)}
                                    />
                                    <Text style={styles.centerStyle}>1 hour before</Text>
                                </View>

                                <View style={styles.checkboxStyle}>
                                    <CheckBox
                                        style={styles.centerStyle}
                                    // value={isMemerize}
                                    // onValueChange={(value) => seletMemerizedall(value)}
                                    />
                                    <Text style={styles.centerStyle}>1 day before</Text>
                                </View> */}
                            </View>
                            <TouchableOpacity
                                style={[styles.button, { backgroundColor: colors.header }]}
                                // onPress={() => setModalVisible(!modalVisible)}
                                onPress={toggleModal}
                            >
                                <Text style={[styles.textStyle, { color: '#fff' }]}>Đóng</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </Modal>
                {/* <TouchableOpacity
                    style={[styles.button, styles.buttonOpen]}
                    onPress={toggleModal}
                >
                    <Text style={styles.textStyle}>Show Modal</Text>
                </TouchableOpacity> */}
            </View>

            {/* modeReccurence */}

            {/* <View style={styles.centeredView}>
                <Modal
                    // animationType="slide"
                    transparent={true}
                    // visible={modalVisible}
                    isVisible={isModalRecurrence}
                >
                    <View style={styles.centeredView}>
                        <View style={styles.modalView}>
                            <Text style={styles.modalText}>modeReccurence!</Text>
                            <View>
                                <View style={styles.checkboxStyle}>
                                    <CheckBox
                                        style={styles.centerStyle}
                                    // value={isMemerize}
                                    // onValueChange={(value) => seletMemerizedall(value)}
                                    />
                                    <Text style={styles.centerStyle}>Daily</Text>
                                </View>

                                <View style={styles.checkboxStyle}>
                                    <CheckBox
                                        style={styles.centerStyle}
                                    // value={isMemerize}
                                    // onValueChange={(value) => seletMemerizedall(value)}
                                    />
                                    <Text style={styles.centerStyle}>Weekly</Text>
                                </View>

                                <View style={styles.checkboxStyle}>
                                    <CheckBox
                                        style={styles.centerStyle}
                                    // value={isMemerize}
                                    // onValueChange={(value) => seletMemerizedall(value)}
                                    />
                                    <Text style={styles.centerStyle}>Monthly</Text>
                                </View>

                                <View style={styles.checkboxStyle}>
                                    <CheckBox
                                        style={styles.centerStyle}
                                    // value={isMemerize}
                                    // onValueChange={(value) => seletMemerizedall(value)}
                                    />
                                    <Text style={styles.centerStyle}>Yearly</Text>
                                </View>
                            </View>
                            <TouchableOpacity
                                style={[styles.button, styles.buttonClose]}
                                // onPress={() => setModalVisible(!modalVisible)}
                                onPress={toggleModalRecurrence}
                            >
                                <Text style={styles.textStyle}>Hide Reccurece</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </Modal>
            </View> */}

        </View >
    )
}

const styles = StyleSheet.create({
    signIn: {
        width: '50%',
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10
    },
    textSign: {
        fontSize: 18,
        fontWeight: 'bold'
    },
    checkboxStyle: {
        flexDirection: 'row',
        // justifyContent: 'center',
        alignItems: 'center',
        padding: 10
    },
    centerStyle: {
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: 10,
        marginTop: 8
    },
    centeredView: {
        flex: 1,
        justifyContent: "center",
        // alignItems: "center",
        marginTop: 22,
    },
    modalView: {

        margin: 20,

        borderRadius: 20,
        padding: 35,
        // alignItems: "center",
        // shadowColor: "red",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 2,
        shadowRadius: 4,
        elevation: 5
    },
    button: {
        borderRadius: 20,
        padding: 10,
        elevation: 2
    },
    buttonOpen: {
        backgroundColor: "#F194FF",
    },
    buttonClose: {
        // backgroundColor: "#2196F3",
    },
    textStyle: {
        color: "white",
        fontWeight: "bold",
        textAlign: "center"
    },
    modalText: {
        marginBottom: 15,
        textAlign: "center",
        fontSize: 20,
        // fontWeight: 'bold'
    }
});

