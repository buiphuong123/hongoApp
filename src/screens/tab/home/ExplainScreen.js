import React, { useState, useEffect } from 'react'
import { LogBox, Text, View, SafeAreaView, Dimensions, Image, TouchableOpacity, StyleSheet, Button, FlatList, ScrollView, TextInput, Platform, Alert } from 'react-native'
import CustomHeader from '../../CustomHeader';
import Icon from 'react-native-vector-icons/AntDesign';
import Icons from 'react-native-vector-icons/MaterialCommunityIcons';
import Iconss from 'react-native-vector-icons/Feather';
import Entypo from 'react-native-vector-icons/Entypo';
import Iconsss from 'react-native-vector-icons/Ionicons';

import Furi from 'react-native-furi';
import { useSelector, useDispatch } from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getListCommentRequest, getListCommentSuccess } from '../../../redux/actions/comment.action';
import io from 'socket.io-client';
import axios from 'axios';
import { socket } from '../../../../App';
import Modal from 'react-native-modal'; // 2.4.0
import { getListNotifiRequest } from '../../../redux/actions/notifi.action';
import { getListQuestionRequest } from '../../../redux/actions/grammarquestion.action';
import { element } from 'prop-types';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { getListVocaRequest } from '../../../redux/actions/vocabulary.action';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { Card } from 'react-native-paper';
import { getListVocaSuccess } from '../../../redux/actions/vocabulary.action';
import { useTheme } from 'react-native-paper';
import { showToastSuccess, showToastError } from '../../../helpers/toastHelper';
const WIDTH = Dimensions.get('window').width;
const HEIGHT = Dimensions.get('window').height;

LogBox.ignoreLogs(['Warning: ...']); // Ignore log notification by message
LogBox.ignoreAllLogs();//Ignore all log notifications
export default ExplainScreen = ({ navigation, route }) => {
    const { colors } = useTheme();
    const dispatch = useDispatch();
    const commentList = useSelector(state => state.commentReducer.commentList);
    const users = useSelector(state => state.userReducer.user);
    const [comment, setComment] = useState("");
    var last = new Date(); // ngày hiện tại
    const [dataComment, setdataComment] = useState([]);
    const [isVisible, setisVisible] = useState(false);
    const { word } = route.params;
    const isManage = useSelector(state => state.manageReducer.isManage);
    const [isVisibleAction, setisVisibleAction] = useState(false);
    const colorBack = ["#0000b3", "#005ce6", "#ff9900", "#00b300", "#e67300"];
    const vocabularyList = useSelector(state => state.vocabularyReducer.vocabularyList);
    const [dataList, setDataList] = useState(vocabularyList);
    const [isVisibleAddWord, setisVisibleAddWord] = useState(false);
    const [isVisibleAddWordVocu, setisVisibleAddWordVocu] = useState(false);
    const [name, setName] = useState("");
    // useEffect(() => {
    //     console.log('word truyen sang la', word);
    //     socket.on("SEVER-SEND-LIKE", (msg) => {
    //         likeactioncallagain(msg.comment_id, msg.islike, msg.isdislike);
    //     });
    //     socket.on("SEVER-SEND-DISLIKE", (msg) => {
    //         dislikeactioncallagain(msg.comment_id, msg.islike, msg.isdislike);
    //     });
    //     socket.on("SEVER-SEND-NEWCOMMENT", (msg) => {
    //         sendCommentResend(msg.comment, msg.username);
    //     });
    //     // }
    // }, [dataComment.length !== 0]);
    useEffect(() => {
        setdataComment(commentList.filter(e => e.review === 1).map(e => ({ ...e, checked: false })));
    }, [commentList]);
    useEffect(() => {
        setDataList(vocabularyList);
    }, []);
    const fixDigit = (val) => {
        return (val < 10 ? '0' : '') + val;
    }
    const likeaction = (comment_id, userlist, content) => {
        var index = 0;
        var checkdislike = false;
        const list = [];

        const idx = dataComment.map(object => object._id).indexOf(comment_id);
        if (idx >= 0) {
            if (dataComment[idx].islike === true) {
                index = 1;
                dataComment[idx].islike = false;
                dataComment[idx].like = dataComment[idx].like - 1;
                setdataComment([...dataComment]);
            }
            else {
                if (dataComment[idx].isdislike === true) {
                    dataComment[idx].isdislike = false;
                    checkdislike = true;
                    dataComment[idx].dislike = dataComment[idx].dislike - 1;
                    dataComment[idx].like = dataComment[idx].like + 1;
                    dataComment[idx].islike = true;
                    setdataComment([...dataComment]);
                }
                else {
                    dataComment[idx].islike = true;
                    dataComment[idx].like = dataComment[idx].like + 1;
                    setdataComment([...dataComment]);
                }
            }
        }

        if (userlist.username === users.username) {
            index = 1;
        }

        if (index === 0) {
            axios.post('https://nameless-spire-67072.herokuapp.com/language/createLikeComment', {
                "comment_id": comment_id,
                "user_id_like": users._id,
                "checkStatus": checkdislike
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
            axios.post('https://nameless-spire-67072.herokuapp.com/language/sendNotiToDeviceAsset', {
                "comment_content": content,
                "action": "like",
                "noti": "comment",
                "type": "grammar",
                "user": users,
                "id": word._id,
                // "user_id": users,
                "user_noti": userlist._id,
                "notifi_token": userlist.notifiToken
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



    }


    const dislikeaction = (comment_id, userlist, content) => {
        var checklike = false;
        const list = [];
        var index = 0;
        const idx = dataComment.map(object => object._id).indexOf(comment_id);
        if (idx >= 0) {
            if (dataComment[idx].isdislike === true) {
                index = 1;
                dataComment[idx].isdislike = false;
                dataComment[idx].dislike = dataComment[idx].dislike - 1;
                setdataComment([...dataComment]);
            }
            else {
                if (dataComment[idx].islike === true) {
                    dataComment[idx].islike = false;
                    checkdislike = true;
                    dataComment[idx].like = dataComment[idx].like - 1;
                    dataComment[idx].dislike = dataComment[idx].dislike + 1;
                    dataComment[idx].isdislike = true;
                    setdataComment([...dataComment]);
                }
                else {
                    dataComment[idx].isdislike = true;
                    dataComment[idx].dislike = dataComment[idx].dislike + 1;
                    setdataComment([...dataComment]);
                }
            }
        }

        if (userlist.username === users.username) {
            index = 1;
        }

        if (index === 0) {
            axios.post('https://nameless-spire-67072.herokuapp.com/language/createDisLikeComment', {
                "comment_id": comment_id,
                "user_id_dislike": users._id,
                "checkStatus": checklike,
            }, {
                headers: {
                    "Accept": "application/json",
                    "Content-Type": "application/json"
                }
            })
                .then((response) => {
                    console.log(response.data);
                })

            axios.post('https://nameless-spire-67072.herokuapp.com/language/sendNotiToDeviceAsset', {
                "comment_content": content,
                "action": "dislike",
                "noti": "comment",
                "type": "grammar",
                "user": users,
                "id": word._id,
                "user_noti": userlist._id,
                "notifi_token": userlist.notifiToken

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


    }

    const sendComment = (grammar_id) => {
        if (comment.length === 0 || comment === '') {
            return;
        }
        var requ = 2;

        if (isManage === false || users.role === 2 || users.role === 1) {
            requ = 1;
        }
        // var date = new Date;
        // const kaka = {grammar_id: grammar_id, user_id: users._id, content: comment, time: date, islike: 0, isdislike: 0, like: 0, dislike: 0, review: "not approved" };
        // setdataComment(dataComment.concat(kaka));
        // setComment('');
        axios.post('https://nameless-spire-67072.herokuapp.com/language/createComment', {
            "grammar_id": grammar_id,
            "user_id": users._id,
            "content": comment,
            "requ": requ,
        }, {
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json"
            }
        })
            .then((response) => {
                const newComment = response.data.comment;
                const kaka = { _id: newComment._id, grammar_id: newComment.grammar_id, user_id: newComment.user_id, content: newComment.content, time: newComment.time, islike: 0, isdislike: 0, like: 0, dislike: 0, review: newComment.review, username: users.username };
                setdataComment([...dataComment.concat(kaka)]);
            })
        setComment('');
        // console.log('DATA DAY NHE', dataComment);
    }
    const time = (dt) => {
        const result = (last.getTime() - dt.getTime()) / 1000;
        const minutes = (result - result % 60) / 60;
        const hours = (minutes - minutes % 60) / 60;
        const day = (result - result % 86400) / 86400;
        const month = (day - day % 30) / 30;
        const year = (month - month % 12) / 12;
        if (year !== 0) {
            return year + ' ' + 'nam';
        }
        else if (month !== 0) {
            return month + ' ' + 'thang';
        }
        else if (day !== 0) {
            return day + ' ' + 'ngay';
        }
        else if (hours !== 0) {
            return hours + ' ' + 'gio';
        }
        else if (minutes !== 0) {
            return minutes + ' ' + 'phut';
        }
        else {
            return 'vua xong';
        }
    }


    const renderComment = ({ item, index }) => {
        var dt = new Date(item.time);
        return (
            <View key={index}>
                <View style={{ zIndex: 0, marginTop: 10, borderBottomWidth: 1, borderBottomColor: '#d9d9d9', backgroundColor: item.review === 2 ? colors.block : colors.background, padding: item.review === 2 ? 5 : 0 }}>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                        <Text style={{ color: colors.text }}>{item.content}</Text>
                        {
                            users.role === 1 || users.role === 2 ?
                                // bấm vào đây 
                                <TouchableOpacity style={{}} onPress={() => deletecomment(item)
                                }>
                                    <Entypo name={'dots-three-vertical'} size={20} style={{ color: colors.text }} />
                                </TouchableOpacity>


                                : null
                        }
                    </View>
                    {/* <View style={{flexDirection: 'row', backgroundColor: '#f2f2f2', padidng: 10, justifyContent: 'flex-end', }}>
                    <Text>xoa binh luan</Text>
                </View> */}
                    {item.review === 1 ?
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingTop: 15, paddingBottom: 8 }}>

                            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                                    {/* <Text>like</Text> */}
                                    <AntDesign
                                        onPress={() => likeaction(item._id, item.user_id, item.content)}
                                        name="like1"
                                        color={item.islike ? 'blue' : '#d9d9d9'}
                                        size={17}
                                    />
                                    <Text style={{ marginLeft: 5, marginTop: -2, color: colors.text }}>{item.like}</Text>
                                </View>
                                <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginLeft: 15 }}>
                                    <AntDesign
                                        onPress={() => dislikeaction(item._id, item.user_id, item.content)}
                                        name="dislike1"
                                        color={item.isdislike ? 'blue' : '#d9d9d9'}
                                        size={17}
                                    />
                                    <Text style={{ marginLeft: 5, marginTop: -2, color: colors.text }}>{item.dislike} </Text>
                                </View>

                            </View>


                            <View style={{ marginLeft: 20 }}>
                                {/* <Text>name</Text> */}
                                <Text style={{ color: colors.text }}>{item.user_id.username === undefined ? item.username : item.user_id.username} ({time(dt)})</Text>
                            </View>
                        </View>
                        :
                        <View>
                            <View style={{ flexDirection: 'row', justifyContent: 'space-between', borderBottomWidth: 1, borderBottomColor: '#e6e6e6' }}>
                                <View style={{ flexDirection: 'row', paddingTop: 15, paddingBottom: 8 }}>
                                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', }}>
                                        {/* <Text>like</Text> */}
                                        <AntDesign
                                            // onPress={() => likeaction(item._id, users._id, item.user_id.username)}
                                            name="like1"
                                            color={item.islike ? 'blue' : '#d9d9d9'}
                                            size={17}
                                        />
                                        <Text style={{ marginLeft: 5, marginTop: -2, color: colors.text }}>{item.like}</Text>
                                    </View>
                                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginLeft: 15 }}>
                                        <AntDesign
                                            // onPress={() => dislikeaction(item._id, users._id, item.user_id.username)}
                                            name="dislike1"
                                            color={item.isdislike ? 'blue' : '#d9d9d9'}
                                            size={17}
                                        />
                                        <Text style={{ marginLeft: 5, marginTop: -2, color: colors.text }}>{item.dislike} </Text>
                                    </View>
                                </View>
                                <View style={{ marginLeft: 20, flexDirection: 'row', justifyContent: 'flex-end', paddingTop: 15 }}>
                                    {/* <Text>name</Text> */}
                                    <Text style={{ color: colors.text }}>{item.user_id.username === undefined ? item.username : item.user_id.username} ({time(dt)})</Text>
                                </View>

                            </View>
                            <View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingBottom: 8 }}>
                                <View style={{ fontSize: 16, width: '50%' }}>
                                    <Text style={{ color: colors.text }}>Cảm ơn bạn đã kiên nhẫn</Text>
                                    <Text style={{ color: colors.text }}>Quản trị viên xét duyệt xong thì bài viết của bạn mới hiển thị trong nhóm</Text>
                                </View>
                                <View style={{ width: '50%', alignItems: 'center', justifyContent: 'center' }}>
                                    {/* <TouchableOpacity style={{ backgroundColor: colors.header, height: 30, minWidth: 60, paddingTop: 5, paddingBottom: 5, paddingLeft: 5, paddingRight: 5, justifyContent: 'center', alignContent: 'center' }}>
                                        <Text style={{ color: colors.text }}>Quản lý bài viết</Text>
                                    </TouchableOpacity> */}
                                </View>
                            </View>
                        </View>

                    }
                </View>
                {
                    // hien model day
                    item.checked === true ?
                        <TouchableOpacity
                            onPress={() => refuseComment(item)}
                            style={{ position: 'absolute', zIndex: 1, alignItems: 'center', justifyContent: 'center', padding: 10, width: '40%', top: 10, right: 15, backgroundColor: '#f2f2f2' }}>
                            <Text>Delete</Text>
                        </TouchableOpacity>
                        : null
                }
            </View>
            // <View style={{ marginTop: 10, borderBottomWidth: 1, borderBottomColor: '#d9d9d9' }}>
            //     <Text>{item.content}</Text>
            //     <View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingTop: 15, paddingBottom: 8 }}>
            //         <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
            //             <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
            //                 {/* <Text>like</Text> */}
            //                 <Icon
            //                     onPress={() => likeaction(item._id, users._id, item.user_id.username)}
            //                     name="like1"
            //                     color={item.islike ? 'blue' : '#d9d9d9'}
            //                     size={17}
            //                 />
            //                 <Text style={{ marginLeft: 5, marginTop: -2 }}>{item.like}</Text>
            //             </View>
            //             <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginLeft: 15 }}>
            //                 <Icon
            //                     onPress={() => dislikeaction(item._id, users._id, item.user_id.username)}
            //                     name="dislike1"
            //                     color={item.isdislike ? 'blue' : '#d9d9d9'}
            //                     size={17}
            //                 />
            //                 <Text style={{ marginLeft: 5, marginTop: -2 }}>{item.dislike}</Text>
            //             </View>
            //             <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginLeft: 15 }}>
            //                 <Icons
            //                     name="comment"
            //                     color={'#d9d9d9'}
            //                     size={17}
            //                 />
            //                 <Text style={{ marginLeft: 5, marginTop: -2 }}>7</Text>
            //             </View>
            //         </View>
            //         <View style={{ marginLeft: 20 }}>
            //             <Text>{item.user_id.username === undefined ? item.username : item.user_id.username} ({time(dt)})</Text>
            //         </View>
            //     </View>
            // </View>
        )
    }

    const quesSc = () => {
        dispatch(getListQuestionRequest(word._id, navigation));
    }
    const refuseComment = (item) => {
        const list = [];
        const objIndex = dataComment.findIndex(e => e._id === item._id);
        if (objIndex !== -1) {
            list.push(item._id);
            dataComment[objIndex].review = 0;
            setdataComment([...dataComment]);
            axios.post('https://nameless-spire-67072.herokuapp.com/language/refuseCommentGrammar', {
                "list": list,
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
        else {
            return;
        }
    }
    const deletecomment = (item) => {
        const objindex = dataComment.findIndex(e => e._id === item._id);
        console.log(objindex);
        if (dataComment[objindex].checked === false) {
            dataComment[objindex].checked = true;
        }
        else {
            dataComment[objindex].checked = false;
        }
        setdataComment([...dataComment]);
    }

    const AddWordInVocu = (element) => {
        const objIndex = dataList.findIndex(e => e._id === element._id);
        if (objIndex !== -1) {
            const objindexs  = dataList[objIndex].data.findIndex(e=> e.word ===word.grammar.split("=>")[0]&&e.vn===word.grammar.split("=>")[1]&&e.type==="Ngữ pháp");
            if(objindexs !== -1) {
                setisVisibleAddWord(false);
                showToastError(`${word.grammar} đã tồn tại trong bộ ${dataList[objIndex].name}`);
                return;
            }
            var d = {};
            d.word = word.grammar.split("=>")[0];
            d.vn = word.grammar.split("=>")[1];
            d.type = "Ngữ pháp";
            d.date = last;
            d.explain = word;
            dataList[objIndex].data.push(d);
            setDataList([...dataList]);
            getListVocaSuccess([...dataList]);
            setisVisibleAddWord(false);
            axios.post('https://nameless-spire-67072.herokuapp.com/language/createWordInVoca', {
                "id": element._id,
                "word": word.grammar.split("=>")[0],
                "vn": word.grammar.split("=>")[1],
                "type": "Ngữ pháp",
                "date": last,
                "explain": word,

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
    }

    const createVocaAndAddWord = () => {
        const obj = dataList.findIndex(e => e.name === name);
        if(obj !== -1) {
            setisVisibleAddWordVocu(false);
            setisVisibleAddWord(false);
            showToastError(`Bộ từ ${name} đã tồn tại!`);
            return;
        }
        axios.post('https://nameless-spire-67072.herokuapp.com/language/createVocabulary', {
            "user_id": users._id,
            "name": name,
            // "dataElement": vocabulary,
            "date": last
        }, {
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json"
            }
        })
            .then((response) => {
                console.log(response.data);
                const listData = dataList.concat(response.data.vocabulary);
                // const voca 
                setDataList([...dataList.concat(response.data.vocabulary)]);
                const objIndex = listData.findIndex(e => e.name === name);
                setisVisibleAddWordVocu(false);
                var d = {};
                d.word = word.grammar.split("=>")[0];
                d.vn = word.grammar.split("=>")[1];
                d.type = "Ngữ pháp";
                d.date = last;
                d.explain = word;
                listData[objIndex].data.push(d);
                setDataList([...listData]);
                getListVocaSuccess([...listData]);
                setisVisibleAddWord(false);
                setName("");
                axios.post('https://nameless-spire-67072.herokuapp.com/language/createWordInVoca', {
                    "id": listData[objIndex]._id,
                    "word": word.grammar.split("=>")[0],
                    "vn": word.grammar.split("=>")[1],
                    "type": "Ngữ pháp",
                    "date": last,
                    "explain": word,
                }, {
                    headers: {
                        "Accept": "application/json",
                        "Content-Type": "application/json"
                    }
                })
                    .then((response1) => {
                        console.log(response1.data);
                    })
                    .catch(function (error) {
                        throw error;
                    })
                // objIndex = dataList.concat(response.data.vocabulary).findIndex(e => e.name === name);
            })
            .catch(function (error) {
                throw error;
            })

    }
    return (
        <View style={{ flexGrow: 1, flex: 1 }}>
            <CustomHeader title={word.grammar.split("=>")[0]} navigation={navigation} />
            <ScrollView>
                <View style={{ marginTop: 20, marginLeft: 15 }}>
                    {users.role !== 1 ?
                        <View style={{ flexDirection: 'row', justifyContent: 'flex-end' }}>
                            <View />
                            <TouchableOpacity>
                                <Text style={{ color: colors.text }}>Lưu cấu trúc ngữ pháp này</Text>
                            </TouchableOpacity>
                            <Iconsss
                                onPress={() => setisVisibleAddWord(true)} style={{ marginRight: 10, marginLeft: 10 }}
                                name="add-circle-outline"
                                color={colors.text}
                                size={25}
                            />

                        </View>
                        : null}

                    <View style={{ width: '70%', justifyContent: 'center', borderWidth: 1, borderColor: '#d9d9d9', padding: 10, marginLeft: 40 }}>
                        <Text style={{ fontSize: 20, color: 'red', textAlign: 'center', justifyContent: 'center' }}>{word.grammar.split("=>")[0]}</Text>
                        <Text style={{ fontSize: 20, color: 'blue', textAlign: 'center', justifyContent: 'center' }}>{word.grammar.split("=>")[1]}</Text>
                    </View>

                    <View>
                        {word.uses.map((element, key) => {
                            return (
                                <View key={key}>
                                    <View style={{ marginTop: 10, marginBottom: 10 }}>
                                        <Text style={{ color: colors.header }}>Cấu trúc: </Text>
                                        <Text style={{ marginLeft: 10, color: colors.text }}>{element.synopsis.replace(/<br>/g, "\n").trim()} </Text>
                                    </View>
                                    <View style={{ marginTop: 10, marginBottom: 10 }}>
                                        <Text style={{ color: colors.header }}>Ý nghĩa: </Text>
                                        <Text style={{ marginLeft: 10, color: colors.text }}>{element.explain.trim().replace(/<br>/g, "\n")} </Text>
                                    </View>

                                    {element.note.trim() >= 2 ?
                                        <View style={{ marginTop: 10, marginBottom: 10 }}>
                                            <Text style={{ color: colors.header }}>Chú ý: </Text>
                                            <Text style={{ marginLeft: 10, color: colors.text }}>{element.note} </Text>
                                        </View> : null
                                    }

                                    <View style={{ marginTop: 10, marginBottom: 10 }}>
                                        <Text style={{ color: colors.header, marginBottom: 10 }}>Ví dụ: </Text>
                                        {
                                            element.examples.map((item, key1) => {
                                                return (
                                                    <View key={key1}>
                                                        <View>
                                                            <Text style={{ color: colors.text }}>{key1 + 1}. {item.content.trim()}</Text>
                                                            <Text style={{ color: colors.text }}>{item.mean.trim()}</Text>
                                                        </View>
                                                    </View>
                                                )
                                            })
                                        }
                                    </View>
                                </View>
                            )
                        })}
                    </View>


                </View>
                <View style={{ padding: 10, borderTopWidth: 1, borderTopColor: '#d9d9d9' }}>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 10 }}>
                        <Text style={{ color: colors.text }}>Có {dataComment.length} góp ý</Text>
                        {
                            dataComment.length > 3 ?
                                <TouchableOpacity onPress={() => setisVisible(true)}>
                                    <Text style={{ color: colors.text }}>Xem thêm góp ý</Text>
                                </TouchableOpacity>
                                :
                                null
                        }
                    </View>
                    <View>
                        <FlatList
                            style={{ padding: 5 }}
                            data={dataComment.slice(0, 3)}
                            keyExtractor={item => item.id}
                            renderItem={renderComment}
                        />
                        {users.role !== 1 ?
                            <View style={{}}>
                                <View>
                                    <TextInput
                                        style={{ color: colors.text, borderWidth: 1, padding: 5, borderColor: '#d9d9d9', height: 40, zIndex: 0, borderRadius: 5 }}
                                        placeholder={"thêm nghĩa hoặc ví dụ cho từ"}
                                        placeholderTextColor={colors.text_of_input}

                                        multiline={true}
                                        numberOfLines={1}
                                        onChangeText={text => setComment(text)}
                                        value={comment}

                                    />
                                </View>
                                <Iconss
                                    onPress={() => sendComment(word._id)}
                                    style={{ position: 'absolute', zIndex: 1, top: 10, right: 10 }}
                                    name="send"
                                    color={colors.text}
                                    size={17}
                                />
                            </View>
                            : null}
                    </View>

                </View>

            </ScrollView>
            <View style={styles.container}>
                <Modal
                    isVisible={isVisible}
                    animationInTiming={1000}
                    animationOutTiming={1000}
                    backdropTransitionInTiming={1000}
                    backdropTransitionOutTiming={1000}
                    deviceWidth={WIDTH}
                >
                    <View style={[styles.modalContent, { backgroundColor: colors.background }]}>
                        <ScrollView>
                            <FlatList
                                style={{ padding: 5 }}
                                data={dataComment.slice(3, dataComment.length)}
                                keyExtractor={item => item.id}
                                renderItem={renderComment}
                            />
                        </ScrollView>

                        <TouchableOpacity onPress={() => setisVisible(false)}>
                            <View style={[styles.button, { backgroundColor: colors.header }]}>
                                <Text style={{ color: '#fff' }}>Close</Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                </Modal>
            </View>
            {/* <TouchableOpacity
                style={{ borderWidth: 1, width: 50, borderRadius: 30, backgroundColor: '#009387', borderColor: '#009387', bottom: 60, right: 20, position: 'absolute', zIndex: 1 }}
                onPress={() => quesSc()}>
                <Entypo name={'triangle-right'} size={50} style={{ color: 'white' }} />
            </TouchableOpacity> */}
            <View style={[styles.container]}>
                <Modal
                    isVisible={isVisibleAddWord}
                    swipeDirection="down"
                    style={{ justifyContent: 'flex-end', margin: 0 }}
                    onRequestClose={() => setisVisibleAddWord(false)}
                    deviceWidth={WIDTH}
                    deviceHeight={HEIGHT}
                >
                    <View style={[styles.modalContentadd, { backgroundColor: colors.background }]}>
                        <View style={{ flexDirection: 'row', height: 50, backgroundColor: colors.header, justifyContent: 'space-between' }}>
                            <AntDesign name={'close'} size={20} color={'#fff'}
                                onPress={() => setisVisibleAddWord(false)}
                                style={{ paddingTop: 15, paddingRight: 20, marginLeft: 10 }} />
                            <View style={{ paddingTop: 15 }}>
                                <Text style={{ color: '#fff', fontSize: 20 }}>Thêm ngữ pháp "{word.grammar.split("=>")[0]}"</Text>
                            </View>
                            <TouchableOpacity style={{ justifyContent: 'center', marginRight: 20 }} onPress={() => setisVisibleAddWordVocu(true)}>
                                <MaterialIcons name={"add-box"} size={29} style={{ color: '#fff' }} />
                            </TouchableOpacity>
                        </View>
                        <View>
                            {
                                dataList.length === 0 ?
                                    <View style={{ padding: 20 }}>
                                        <Text style={{ color: colors.text }}>Gợi ý </Text>
                                        <Text style={{ color: colors.text }}>- Nhấn nút dấu "+" góc trên bên phải để thêm nhóm từ mới.</Text>
                                        <Text style={{ color: colors.text }}>- Bên cạnh nhóm từ có nút đẻ sửa xóa nhóm từ
                                        </Text>
                                    </View>
                                    :
                                    <ScrollView style={{ marginBottom: 40 }}>
                                        {
                                            dataList.map((element, key) => {
                                                return (
                                                    <TouchableOpacity key={key} onPress={() => AddWordInVocu(element)}>
                                                        <Card style={{ marginTop: 10, margin: 10 }}>
                                                            <Card.Content>
                                                                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                                                                    <View style={{ flexDirection: 'row' }}>
                                                                        <View style={{ backgroundColor: colorBack[Math.floor(Math.random() * colorBack.length)], borderRadius: 30 }}>
                                                                            <Text style={{ paddingTop: 15, paddingBottom: 15, paddingLeft: 20, paddingRight: 20, color: '#fff' }}>{element.name.charAt(0)}</Text>
                                                                        </View>
                                                                        {/* <Avatar.Image size={40} style={{padding: 10}} source={('https://www.google.com/url?sa=i&url=https%3A%2F%2Fvi.m.wikipedia.org%2Fwiki%2FT%25E1%25BA%25ADp_tin%3AImage_created_with_a_mobile_phone.png&psig=AOvVaw3T9sYalA9E5MRsYwkeGOWj&ust=1652583018117000&source=images&cd=vfe&ved=0CAwQjRxqFwoTCJDa-8_93fcCFQAAAAAdAAAAABAD')} /> */}
                                                                        <View
                                                                            style={{
                                                                                marginLeft: 10,
                                                                                height: 30,
                                                                                marginBottom: 10
                                                                            }}>

                                                                            <Text style={{ fontSize: 20, color: colors.text }}>{element.name}</Text>
                                                                            <Text style={{ color: colors.text }}>{element.data.length} items</Text>
                                                                        </View>
                                                                    </View>

                                                                </View>
                                                                <View style={{ flexDirection: 'row', justifyContent: 'flex-end' }}>
                                                                    <Text style={{ color: colors.text }}>{new Date(element.date).getFullYear() + '/' + fixDigit(new Date(element.date).getMonth()) + '/' + fixDigit(new Date(element.date).getDate())}</Text>
                                                                </View>
                                                            </Card.Content>
                                                        </Card>
                                                    </TouchableOpacity>
                                                )
                                            })
                                        }
                                    </ScrollView>
                            }
                        </View>
                    </View>

                </Modal>
            </View>

            <View style={styles.container}>
                <Modal
                    isVisible={isVisibleAddWordVocu}
                    animationInTiming={1000}
                    animationOutTiming={1000}
                    backdropTransitionInTiming={1000}
                    backdropTransitionOutTiming={1000}
                    deviceWidth={WIDTH}
                >
                    <View style={[styles.modalContent, { marginTop: 50, minHeight: 170, backgroundColor: colors.background }]}>
                        <View style={{ padding: 15 }}>
                            <Text style={{ fontWeight: 'bold', fontSize: 20 }}>Tạo nhóm từ</Text>
                            <TextInput
                                style={{ borderBottomWidth: 1, borderBottomColor: '#80b3ff', alignItems: 'center', justifyContent: 'center' }}
                                placeholder="Nhập nhóm từ cần lưu"
                                value={name}
                                onChangeText={text => setName(text)}
                            />
                            <View style={styles.stylebutton}>
                                <TouchableOpacity
                                    onPress={() => setisVisibleAddWordVocu(false)}
                                    style={[styles.keepStyle, { backgroundColor: '#999999', marginRight: 110 }]}>
                                    <Text style={{ color: '#fff' }}>Đóng</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={[styles.keepStyle, { backgroundColor: '#1a75ff', }]}
                                    onPress={() => createVocaAndAddWord()}
                                >
                                    <Text style={{ color: '#fff' }}>Tạo</Text>
                                </TouchableOpacity>
                            </View>

                        </View>

                    </View>
                </Modal>
            </View>
        </View>
    )
};

const styles = StyleSheet.create({
    container: {
        width: WIDTH,
        flex: 1,
    },
    button: {
        backgroundColor: 'lightblue',
        padding: 12,
        margin: 16,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 4,
        borderColor: 'rgba(0, 0, 0, 0.1)',
    },
    modalContent: {
        borderRadius: 4,
        borderColor: 'rgba(0, 0, 0, 0.1)',
    },
    //   bottomModal: {
    //     justifyContent: 'flex-end',
    //     margin: 0,
    //   },
    modalContentadd: {
        flex: 1,
        borderRadius: 4,
        borderColor: 'rgba(0, 0, 0, 0.1)',
    },
    text: {
        fontSize: 24,
        marginBottom: 30,
        padding: 40,
    },
    textTitle: {
        fontSize: 18,
    },
    textt: {
        marginLeft: 10, marginTop: 5
    },
    stylebutton: { flexDirection: 'row', justifyContent: 'space-around', flex: 4, marginTop: 20 },
    keepStyle: { height: 40, width: 100, alignItems: 'center', justifyContent: 'center', borderRadius: 5 },
})