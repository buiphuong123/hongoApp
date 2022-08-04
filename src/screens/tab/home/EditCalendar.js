import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Dimensions, TextInput, Platform } from 'react-native';
import { Agenda } from 'react-native-calendars';
import { Card, Avatar, Button } from 'react-native-paper';
import Icon from 'react-native-vector-icons/Ionicons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import DateTimePicker from '@react-native-community/datetimepicker';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Modal from 'react-native-modal'; // 2.4.0
import CheckBox from '@react-native-community/checkbox';
import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Entypo from 'react-native-vector-icons/Entypo';
import { RadioButton } from 'react-native-paper';
import { getListScheduleRequest, getListScheduleSuccess } from '../../../redux/actions/schedule.action';
import { remoteNoti10before, remoteNoti30before, remoteNoti1hourbefore, remoteNoti1daybefore, remoteNotimail, remoteNotiiphone } from '../../../redux/actions/notifi.action';
const { height } = Dimensions.get('window');

export default EditCalendar = ({ navigation, route }) => {
    const dispatch = useDispatch();
    const { calen } = route.params;
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
    const [namesche, setNamesche] = useState(calen.nameSchedule);
    const [note, setNote] = useState(calen.note);
    const scheduleList = useSelector(state => state.scheduleReducer.scheduleList);
    const [items, setItems] = useState(scheduleList);

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
    const [dateCalen, setdateCalen] = useState("");
    // const [dateCalen, setdateCalen] = useState(fixDigit(now.getDate()) + '/' + fixDigit(now.getMonth() + 1) + '/' + now.getFullYear());
    // const [timecalen, settimeCalen] = useState(fixDigit(now.getHours()) + ':' + fixDigit(now.getMinutes()));
    // const [dateCalen, setdateCalen] = useState(new Date(calen.date + ''+ calen.time).toISOString());

    // const [timecalen, settimeCalen] = useState(now);
    useEffect(() => {
        if (calen.typetime === 1) {
            dispatch(remoteNoti10before('checked'));
            dispatch(remoteNoti30before('unchecked'));
            dispatch(remoteNoti1hourbefore('unchecked'));
            dispatch(remoteNoti1daybefore('unchecked'));
        }
        else if (calen.typetime === 2) {
            dispatch(remoteNoti10before('unchecked'));
            dispatch(remoteNoti30before('checked'));
            dispatch(remoteNoti1hourbefore('unchecked'));
            dispatch(remoteNoti1daybefore('unchecked'));
        }
        else if (calen.typetime === 3) {
            dispatch(remoteNoti10before('checked'));
            dispatch(remoteNoti30before('unchecked'));
            dispatch(remoteNoti1hourbefore('unchecked'));
            dispatch(remoteNoti1daybefore('unchecked'));
        }
    }, []);
    const onChange = (event, selectedDate) => {
        const currentDate = selectedDate || date;
        setShow(false);
        setDate(currentDate);
        let tempDate = new Date(currentDate);
        console.log('temp date laf ', tempDate);
        setdateCalen(tempDate);
    }

    const showMode = (currentMode) => {
        setShow(true);
        setMode(currentMode);
    }

    const toggleSwitch10minutes = () => {
        if (noti10mintuesbefore === 'unchecked') {
            dispatch(remoteNoti10before('checked'));
            dispatch(remoteNoti30before('unchecked'));
            dispatch(remoteNoti1hourbefore('unchecked'));
            dispatch(remoteNoti1daybefore('unchecked'));
        }
    }
    const toggleSwitch30minutes = () => {
        if (noti30mintuesbefore === 'unchecked') {
            dispatch(remoteNoti10before('unchecked'));
            dispatch(remoteNoti30before('checked'));
            dispatch(remoteNoti1hourbefore('unchecked'));
            dispatch(remoteNoti1daybefore('unchecked'));
        }
    }
    const toggleSwitch1hour = () => {
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
        if (iphoneNoti === false ) {
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

    const editSchedule = () => {

        var timealert;
        console.log('DATE CALEN LA ', dateCalen);
        if (dateCalen === '') {
            timealert = calen.time;
        }
        else {
            // console.log(dateCalen.getHours()+ '-'+ dateCalen+getMinutes());
            timealert = dateCalen.getHours() + ':' + fixDigit(dateCalen.getMinutes());
        }
        var timenoti = 1;
        var method = 1;
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
        if (mailNoti && iphoneNoti) {
            method = 3;
        }
        else if (mailNoti && iphoneNoti === false) {
            method = 1;
        }
        else {
            method = 2;
        }

        var index = 1;
        console.log('namesche chang la ', namesche);


        console.log('ITEMS OW DAY BEN EDIT LA ', items);
        Object.keys(items).forEach((key) => {
            console.log('vao vong lap tim key');
            if (calen.date === key) {
                index = 0;
                const objIndex = items[key].findIndex((e => e._id === calen._id));
                if (objIndex !== -1) {
                    console.log('CHECK O DAY NHE 199', items[key][objIndex]);
                    items[key][objIndex].nameSchedule = namesche;
                    items[key][objIndex].note = note;
                    items[key][objIndex].date = calen.date;
                    items[key][objIndex].time = timealert;
                    items[key][objIndex].timenoti = timenoti;
                    items[key][objIndex].method = method;
                    console.log('Items sau khi doij la ', items);
                    dispatch(getListScheduleSuccess(items));
                    console.log('DISPATCH ACTION SUCCESS XONG R NHA');
                    setItems(items);
                }
                return false;
            }


        })

        axios.post('http://192.168.1.722:3002/language/editschedule', {
            "id": calen._id,
            "nameSchedule": namesche,
            "note": note,
            "date": calen.date,
            // "dateend": fixDigit(endDate.getFullYear()) + '-' + fixDigit(endDate.getMonth() + 1) + '-' + fixDigit(endDate.getDate()),
            "time": timealert,
            // "time": dateCalen,
            "timenoti": timenoti,
            "method": method
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

        navigation.navigate("Calendar");

    }

    return (
        <View style={{ flex: 1 }}>
            <Card>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <AntDesign name={'close'} size={25} style={{ color: 'black', paddingTop: 20, paddingLeft: 20 }} />
                </TouchableOpacity>
                <Card.Content>
                    <View
                        style={{
                            marginTop: 20,
                            marginLeft: 20,
                            height: height / 10,
                        }}>
                        <TextInput
                            style={{ fontSize: 25, padding: 15 }}
                            placeholder="input schedule"
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

                            <Text style={{ marginLeft: 10 }}>{calen.date}</Text>
                        </View>


                    </View>
                </View>
                <View style={{ borderBottomWidth: 1, borderBottomColor: '#e6e6e6', padding: 20 }}>
                    <View style={{ flexDirection: 'row', }}>
                        <TouchableOpacity onPress={() => showMode('time')}>
                            <Icon name={'time-outline'} size={20} style={{ color: 'blue' }} />
                        </TouchableOpacity>
                        {dateCalen === '' ?
                            <Text style={{ marginLeft: 10 }}>{calen.time}</Text>
                            :
                            <Text style={{ marginLeft: 10 }}>{fixDigit(dateCalen.getHours()) + ':' + fixDigit(dateCalen.getMinutes())}</Text>
                        }
                        {/* <Text style={{ marginLeft: 10 }}>{fixDigit(dateCalen.getHours()) + ':' + fixDigit(dateCalen.getMinutes())}</Text> */}
                    </View>
                </View>

                <TouchableOpacity style={{ borderBottomWidth: 1, borderBottomColor: '#e6e6e6', padding: 20 }} onPress={toggleModal}>
                    <View style={{ flexDirection: 'row', justifyContent: 'flex-start' }}>
                        <View style={{ flexDirection: 'row' }}>
                            <TouchableOpacity onPress={() => setModalVisible(true)}>
                                <Icon name={'notifications-outline'} size={20} style={{ color: '#808080' }} />
                            </TouchableOpacity>
                            <Text style={{ marginLeft: 10, color: '#808080' }}>Set notification</Text>
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
                                    <MaterialIcons name={'phone-iphone'} size={20} style={{ color: calen.method === 1? 'blue' : '#bfbfbf' }} />
                                </TouchableOpacity>
                                {/* <TouchableOpacity style={{ marginLeft: 10 }} onPress={() => setEmail()}>
                                    <Entypo name={'mail'} size={20} style={{ color: calen.method === 1 || calen.method === 3 ? 'blue' : '#bfbfbf' }} />
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
                                    style={{ padding: 20, paddingTop: 10 }}
                                    multiline={true}
                                    placeholder="Note...."
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
                        onPress={() => editSchedule()}
                        style={[styles.signIn, {
                            borderColor: '#009387',
                            borderWidth: 1,
                            marginTop: 15
                        }]}
                    >
                        <Text style={[styles.textSign, {
                            color: '#009387'
                        }]}>Edit Schedule</Text>
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


            {/* model */}
            <View style={styles.centeredView}>
                <Modal
                    // animationType="slide"
                    transparent={true}
                    // visible={modalVisible}
                    isVisible={isModalVisible}
                >
                    <View style={styles.centeredView}>
                        <View style={styles.modalView}>
                            <Text style={styles.modalText}>Notification</Text>
                            <View style={{ marginBottom: 10 }}>
                                <View style={{ flexDirection: 'row' }}>
                                    <RadioButton
                                        status={noti10mintuesbefore}
                                        onPress={() => toggleSwitch10minutes()}
                                    />
                                    <Text style={styles.centerStyle}>10 minutes before</Text>

                                </View>
                                <View style={{ flexDirection: 'row' }}>
                                    <RadioButton
                                        status={noti30mintuesbefore}
                                        onPress={() => toggleSwitch30minutes()}

                                    />
                                    <Text style={styles.centerStyle}>30 minutes before</Text>

                                </View>
                                <View style={{ flexDirection: 'row' }}>
                                    <RadioButton
                                        status={noti1hourbefore}
                                        onPress={() => toggleSwitch1hour()}

                                    />
                                    <Text style={styles.centerStyle}>1 hours before</Text>

                                </View>
                                <View style={{ flexDirection: 'row' }}>
                                    <RadioButton
                                        status={noti1daybefore}
                                        onPress={() => toggleSwitch1day()}

                                    />
                                    <Text style={styles.centerStyle}>1 days before</Text>

                                </View>
                            </View>
                            <TouchableOpacity
                                style={[styles.button, styles.buttonClose]}
                                // onPress={() => setModalVisible(!modalVisible)}
                                onPress={toggleModal}
                            >
                                <Text style={styles.textStyle}>Hide Modal</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </Modal>
            </View>

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
        backgroundColor: "white",
        borderRadius: 20,
        padding: 35,
        // alignItems: "center",
        shadowColor: "red",
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
        backgroundColor: "#2196F3",
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

