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
import { useTheme } from 'react-native-paper';
import { getListWordLevel } from '../../../redux/actions/word.action';
import { RadioButton } from 'react-native-paper';
import { getListScheduleRequest, getListScheduleSuccess } from '../../../redux/actions/schedule.action';
import { remoteNoti10before, remoteNoti30before, remoteNoti1hourbefore, remoteNoti1daybefore, remoteNotimail, remoteNotiiphone } from '../../../redux/actions/notifi.action';
import { getListGrammarLevel } from '../../../redux/actions/grammar.action';
import { getListKanjiLevel } from '../../../redux/actions/kanji.action';
const { height } = Dimensions.get('window');

export default ViewCalendar = ({ navigation, route }) => {
    const dispatch = useDispatch();
    const { colors } = useTheme();

    const { calen } = route.params;
    const [date, setDate] = useState(new Date());
    const [mode, setMode] = useState('date');
    const [show, setShow] = useState(false);
    const [text, setText] = useState('Empty');
    const wordList = useSelector(state => state.wordReducer.wordList);
    const grammarList = useSelector(state => state.grammarReducer.grammarList);
    const kanjiList = useSelector(state => state.kanjiReducer.kanjiList);

    const users = useSelector(state => state.userReducer.user);
    const [isModalVisible, setModalVisible] = useState(false);
    const [isModalRecurrence, setModalRecurrence] = useState(false);
    const [namesche, setNamesche] = useState(calen.nameSchedule);
    const [note, setNote] = useState(calen.note);
    const scheduleList = useSelector(state => state.scheduleReducer.scheduleList);
    const [items, setItems] = useState(scheduleList);
    const [data, setData] = useState(calen.data);
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
    useEffect(() => {
        console.log(calen.data);
        setNamesche(calen.nameSchedule);
        setData(calen.data);
    }, [calen]);

    return (
        <View style={{ flex: 1 }}>
            <Card>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Icon name={'arrow-back'} size={30} style={{ color: colors.text, paddingTop: 20, paddingLeft: 20 }} />

                    {/* <AntDesign name={'close'} size={25} style={{ color: 'black', paddingTop: 20, paddingLeft: 20 }} /> */}
                </TouchableOpacity>
                <Card.Content>
                    <View
                        style={{
                            marginTop: 20,
                            marginLeft: 20,
                            height: height / 10,
                        }}>
                        <TextInput
                            style={{ fontSize: 18, padding: 15, color: colors.text, fontWeight: 'bold' }}
                            // placeholder="input schedule"
                            editable={false}
                            value={namesche}
                        // onChangeText={text => setNamesche(text)}
                        />
                    </View>
                </Card.Content>
            </Card>
            <ScrollView>
                <View style={{ borderBottomWidth: 1, borderBottomColor: '#e6e6e6', padding: 20 }}>
                    <View style={{ flexDirection: 'row', justifyContent: 'flex-start' }}>
                        <View style={{ flexDirection: 'row' }}>
                            <TouchableOpacity onPress={() => showMode('date')}>
                                <AntDesign name={'calendar'} size={20} style={{ color: colors.header }} />
                            </TouchableOpacity>

                            <Text style={{ marginLeft: 10, color: colors.text }}>{calen.date}</Text>
                        </View>


                    </View>
                </View>
                <View style={{ borderBottomWidth: 1, borderBottomColor: '#e6e6e6', padding: 20 }}>
                    <View style={{ flexDirection: 'row', }}>
                        <TouchableOpacity onPress={() => showMode('time')}>
                            <Icon name={'time-outline'} size={20} style={{ color: colors.header }} />
                        </TouchableOpacity>
                        {dateCalen === '' ?
                            <Text style={{ marginLeft: 10, color: colors.text }}>{calen.time}</Text>
                            :
                            <Text style={{ marginLeft: 10, color: colors.text }}>{fixDigit(dateCalen.getHours()) + ':' + fixDigit(dateCalen.getMinutes())}</Text>
                        }
                        {/* <Text style={{ marginLeft: 10 }}>{fixDigit(dateCalen.getHours()) + ':' + fixDigit(dateCalen.getMinutes())}</Text> */}
                    </View>
                </View>

                <TouchableOpacity style={{ borderBottomWidth: 1, borderBottomColor: '#e6e6e6', padding: 20 }} onPress={toggleModal}>
                    <View style={{ flexDirection: 'row', justifyContent: 'flex-start' }}>
                        <View style={{ flexDirection: 'row' }}>
                            <TouchableOpacity onPress={() => setModalVisible(true)}>
                                <Icon name={'notifications-outline'} size={20} style={{ color: colors.text }} />
                            </TouchableOpacity>
                            <Text style={{ marginLeft: 10, color: colors.text }}>10 minutes before</Text>
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
                                <Text style={{ color: colors.text }}>Nhắc nhở luyện tập</Text>
                            </View>
                            <View style={{ flexDirection: 'row' }}>
                                <TouchableOpacity style={{ marginLeft: 40 }}>
                                    <MaterialIcons name={'phone-iphone'} size={20} style={{ color: calen.method === 1 ? 'blue' : '#bfbfbf' }} />
                                </TouchableOpacity>
                                {/* <TouchableOpacity style={{ marginLeft: 10 }} >
                                    <Entypo name={'mail'} size={20} style={{ color: calen.method === 1 || calen.method === 3 ? colors.text : '#bfbfbf' }} />
                                </TouchableOpacity> */}
                            </View>
                        </View>

                    </View>
                </TouchableOpacity>

                <View style={{ borderBottomWidth: 1, borderBottomColor: '#e6e6e6', paddingLeft: 20, paddingRight: 20, justifyContent: 'center', }}>
                    <View style={{ flexDirection: 'row', justifyContent: 'flex-start', flexGrow: 1 }}>
                        <View style={{ flexDirection: 'row', }}>
                            <View style={{ justifyContent: 'center' }}>
                                <View onPress={() => showMode('date')}>
                                    <FontAwesome name={'sticky-note-o'} size={20} style={{ color: 'gray' }} />
                                </View>
                            </View>
                            <View style={{ marginTop: 10 }}>
                                <TextInput
                                    style={{ padding: 20, paddingTop: 10, color: colors.text }}
                                    multiline={true}
                                    placeholder="Note...."
                                    placeholderTextColor={colors.text_of_input}
                                    editable={false}
                                    value={note}
                                // onChangeText={text => setNote(text)}
                                />
                                {/* {
                                    data.map((element, key) => {
                                        return (
                                            <View key={key}>
                                                <Text>{element.type}</Text>
                                                <Text>{element.level}</Text>
                                                <Text>{element.lession}</Text>
                                                <Text>{element.number}</Text>
                                            </View>
                                        )
                                    })
                                } */}
                            </View>
                        </View>
                    </View>
                </View>

                {
                    data.length !== 0 ?
                        <View style={{ paddingLeft: 20, paddingRight: 20, paddingTop: 20 }}>
                            <Text style={{ color: colors.text }}>Dữ liệu bài học N{data[0].level}</Text>
                            {
                                data.map((element, key) => {
                                    return (
                                        <View>
                                            <View style={{}}>
                                                {
                                                    element.type === "word" ?
                                                        <Text style={{ color: colors.text, fontWeight: 'bold' }}>Từ vựng: </Text> :
                                                        element.type === "grammar" ?
                                                            <Text style={{ color: colors.text, fontWeight: 'bold' }}>Ngữ pháp:</Text> :
                                                            <Text style={{ color: colors.text, fontWeight: 'bold' }}>Hán tự:</Text>
                                                }
                                            </View>
                                            <View key={key} style={{ flexDirection: 'row' }}>
                                                <View style={{ width: '30%' }}>
                                                    <Text style={{ color: colors.text, marginLeft: 10 }}>bài {element.lession}</Text>
                                                </View>
                                                <TouchableOpacity style={{ width: '30%' }}
                                                    onPress={() => {
                                                        if (element.type === "word") {
                                                            const d = element.range.split("-");
                                                            // console.log(typeof d[0], d[1]);
                                                            // .slice(3, dataWordComment.length)
                                                            dispatch(getListWordLevel(wordList.filter((e) => parseInt(e.level, 10) === element.level)));
                                                            navigation.navigate("WordCalen", { navigation: navigation, lession: element.lession, rang1: parseInt(d[0], 10), rang2: parseInt(d[1], 10) });// lưu số bài 
                                                        }
                                                        else if (element.type === "grammar") {
                                                            const d = element.range.split("-");
                                                            dispatch(getListGrammarLevel(grammarList.filter((e) => parseInt(e.level, 10) === element.level)));
                                                            navigation.navigate("GrammarCalen", { navigation: navigation, lession: element.lession, rang1: parseInt(d[0], 10), rang2: parseInt(d[1], 10) });
                                                        }
                                                        else {
                                                            const d = element.range.split("-");
                                                            dispatch(getListKanjiLevel(kanjiList.filter((e) => parseInt(e.level, 10) === element.level)));
                                                            navigation.navigate("KanjiCalen", { navigation: navigation, lession: element.lession, rang1: parseInt(d[0], 10), rang2: parseInt(d[1], 10) });
                                                        }
                                                    }}
                                                >
                                                    <Text style={{ color: 'blue', fontStyle: "italic", marginLeft: 10 }}>Học tại đây </Text>

                                                </TouchableOpacity>

                                            </View>

                                            {
                                                element.test !== undefined ?
                                                    <View style={{ flexDirection: 'row' }}>
                                                        <View style={{ width: '30%' }}>
                                                            <Text style={{ color: colors.text, marginLeft: 10 }}>Kiểm tra</Text>
                                                        </View>
                                                        {
                                                            element.type === "word" ?
                                                                <TouchableOpacity style={{}} onPress={() => navigation.navigate("TestWord", { navigation: navigation, lession: element.lession })}>
                                                                    <Text style={{ color: 'blue', fontStyle: "italic", marginLeft: 10 }}>Kiểm tra bài {element.test}</Text>
                                                                </TouchableOpacity>
                                                                :
                                                                element.type === "kanji" ?
                                                                    <TouchableOpacity style={{}} onPress={() => navigation.navigate("TestKanji", { navigation: navigation, lession: element.lession })}>
                                                                        <Text style={{ color: 'blue', fontStyle: "italic", marginLeft: 10 }}>Kiểm tra bài {element.test}</Text>
                                                                    </TouchableOpacity>
                                                                :
                                                                <TouchableOpacity style={{}} onPress={() => navigation.navigate("GrammarTest", {navigation: navigation, level: element.level})}>
                                                                        <Text style={{ color: 'blue', fontStyle: "italic", marginLeft: 10 }}>Kiểm tra bài {element.test}</Text>
                                                                    </TouchableOpacity>

                                                        }
                                                    </View>
                                                    : null
                                            }

                                        </View>
                                    )
                                })
                            }
                        </View>
                        : null
                }

                {/* <TouchableOpacity onPress={() => sendSchedule()}>
                    <Text>crete schedule</Text>
                </TouchableOpacity> */}

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

