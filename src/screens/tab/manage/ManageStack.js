import React, { Component, useEffect, useState } from 'react'
import { Text, View, Switch, SafeAreaView, ScrollView, TouchableOpacity, Alert, StyleSheet, Dimensions, TextInput } from 'react-native'
import { useDispatch, useSelector } from 'react-redux';
import { useTheme } from 'react-native-paper';
import Octicons from 'react-native-vector-icons/Octicons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Icon from 'react-native-vector-icons/Ionicons';
import Iconss from 'react-native-vector-icons/MaterialCommunityIcons';
import { getAllcommentWord, getAllcommentGrammar, getAllcommentKanji } from '../../../redux/actions/comment.action';
import axios from 'axios';
import { RemoteManage } from '../../../redux/actions/manage.action';

const ManageStack = ({ navigation }) => {
    const { colors } = useTheme();
    const listPost = useSelector(state => state.postReducer.listPost);
    const allCommentWord = useSelector(state => state.commentReducer.allCommentWord);
    const allCommentKanji = useSelector(state => state.commentReducer.allCommentKanji);
    const allCommentGrammar = useSelector(state => state.commentReducer.allCommentGrammar);
    const users = useSelector(state => state.userReducer.user);
    const dispatch = useDispatch();
    const [asset, setAsset] = useState(true);
    const isManage = useSelector(state => state.manageReducer.isManage);
    // useEffect(() => {
    //     if (users.role === 1) {
    //         axios.get('https://nameless-spire-67072.herokuapp.com/language/getAllWordComment', {
    //             headers: {
    //                 "Accept": "application/json",
    //                 "Content-Type": "application/json"
    //             }
    //         })
    //             .then((response) => {
    //                 dispatch(getAllcommentWord(response.data.comment));
    //             })
    //             .catch(function (error) {
    //                 throw error;
    //             })
    //     }
    // }, []);
    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
            axios.get('https://nameless-spire-67072.herokuapp.com/language/getAllWordComment', {
                headers: {
                    "Accept": "application/json",
                    "Content-Type": "application/json"
                }
            })
                .then((response) => {
                    dispatch(getAllcommentWord(response.data.comment));
                })
                .catch(function (error) {

                    throw error;
                })
                &&
                axios.get('https://nameless-spire-67072.herokuapp.com/language/getAllKanjiComment', {
                    headers: {
                        "Accept": "application/json",
                        "Content-Type": "application/json"
                    }
                })
                    .then((response) => {
                        // console.log(response.data.comment);
                        dispatch(getAllcommentKanji(response.data.comment));
                    })
                    .catch(function (error) {
                        console.log('loi ben kanji');
                        throw error;
                    })
                &&
                axios.get('https://nameless-spire-67072.herokuapp.com/language/getAllGrammarComment', {
                    headers: {
                        "Accept": "application/json",
                        "Content-Type": "application/json"
                    }
                })
                    .then((response) => {
                        dispatch(getAllcommentGrammar(response.data.comment));
                    })
                    .catch(function (error) {
                        console.log('loi ben kanji');
                        throw error;
                    })

        });

        return unsubscribe;
    }, [navigation]);
    const toggleSwitchAction = (value) => {
        if (isManage === true) {
            if (listPost.filter(e => e.review === 2).length !== 0 || allCommentWord.filter(e => e.review === 2).length !== 0) {
                Alert.alert(
                    "Alert",
                    "Hãy xác nhận các bài viết và comment trươc khi tắt kiểm duyệt ",
                    [
                        {
                            text: "OK",
                            onPress: () => {
                                console.log("Cancel Pressed");
                            },
                            style: "cancel"

                        }
                    ]
                )
            }
            else {
                Alert.alert(
                    "Alert",
                    "Bạn chắc chắn muốn tắt kiểm duyệt",
                    [
                        {
                            text: "Cacel",
                            onPress: () => {
                                console.log("Cancel Pressed");
                            },
                            style: "cancel"

                        },
                        {
                            text: "OK", onPress: () => {
                                dispatch(RemoteManage(value));
                            }
                        }
                    ]
                )
            }
        }
        else {
            Alert.alert(
                "Alert",
                "Bạn chắc chắn muốn bật kiểm duyệt",
                [
                    {
                        text: "Cacel",
                        onPress: () => {
                            console.log("Cancel Pressed");
                        },
                        style: "cancel"

                    },
                    {
                        text: "OK", onPress: () => {
                            dispatch(RemoteManage(value));
                        }
                    }
                ]
            )
        }

    }
    return (
        <View style={{ padding: 10, flex: 1 }}>
            <View style={{}}>
                {/* <View style={{ flexDirection: 'row', justifyContent: 'space-between', borderBottomWidth: 1, borderBottomColor: '#cccccc' }}>
                    <View style={{ marginBottom: 10 }}>
                        <Text style={{ fontWeight: 'bold', fontSize: 20 }}>Kiểm duyệt</Text>
                    </View>
                    <Switch
                        trackColor={{ false: "#767577", true: "#81b0ff" }}
                        thumbColor={asset ? "blue" : "white"}
                        ios_backgroundColor="#3e3e3e"
                        onValueChange={toggleSwitchAction}
                        value={asset}
                    />
                </View> */}
                <View style={{ backgroundColor: colors.background, marginLeft: 5 }}>
                    <View style={{ padding: 10, flexDirection: 'row', justifyContent: 'space-between', borderBottomWidth: 1, borderBottomColor: '#e6e6e6' }}>
                        <Text style={{ fontWeight: 'bold', fontSize: 18, color: colors.text }}>Phê duyệt bài viết</Text>
                        <Switch
                            trackColor={{ false: "#767577", true: "gray" }}
                            thumbColor={asset ? colors.header : "white"}
                            ios_backgroundColor={colors.header}
                            onValueChange={toggleSwitchAction}
                            value={isManage}
                        />
                    </View>
                    <View style={{}}>
                        <TouchableOpacity
                            onPress={() => navigation.navigate("AssetsPost", { navigation: navigation })}
                            style={{ flexDirection: 'row', padding: 10 }}>
                            <Iconss name={'post-outline'} size={29} color={colors.text} style={{ paddingTop: 10, paddingRight: 10 }} />
                            <View style={{ marginLeft: 5, width: '100%' }}>
                                <Text style={{ fontWeight: 'bold', fontSize: 18, color: colors.text }}>Bài viết đang chờ</Text>
                                <View style={{ flexDirection: 'row', borderBottomWidth: 1, borderBottomColor: colors.borderblock, paddingBottom: 5 }}>
                                    <Text style={{ fontWeight: 'bold', fontSize: 40, marginTop: -30, color: colors.header }}>.</Text>
                                    <Text style={{ marginLeft: 3, color: colors.text }}>{listPost.filter(e => e.review === 2).length} new</Text>
                                </View>
                            </View>
                        </TouchableOpacity>

                        <TouchableOpacity style={{ flexDirection: 'row', paddingRight: 10, paddingLeft: 10, paddingBottom: 10 }} onPress={() => navigation.navigate("AssetsComment", { navigation: navigation, type: "Từ vựng" })}>
                            <Iconss name={'post-outline'} size={29} color={colors.text} style={{ paddingTop: 10, paddingRight: 10 }} />
                            <View style={{ marginLeft: 5, width: '100%' }}>
                                <Text style={{ fontWeight: 'bold', fontSize: 18, color: colors.text }}>Kiểm duyệt comment từ vựng</Text>
                                <View style={{ flexDirection: 'row', borderBottomWidth: 1, borderBottomColor: '#e6e6e6', paddingBottom: 5 }}>
                                    <Text style={{ fontWeight: 'bold', fontSize: 40, marginTop: -30, color: colors.header }}>.</Text>
                                    <Text style={{ color: colors.text, marginLeft: 3 }}>{allCommentWord.filter(e => e.review === 2).length} comment</Text>
                                </View>
                            </View>
                        </TouchableOpacity>

                        <TouchableOpacity
                            onPress={() => {
                                navigation.navigate("AssetsComment", { navigation: navigation, type: "Ngữ pháp" });
                            }}
                            style={{ flexDirection: 'row', paddingRight: 10, paddingLeft: 10, paddingBottom: 10 }}>
                            <Iconss name={'post-outline'} size={29} color={colors.text} style={{ paddingTop: 10, paddingRight: 10 }} />
                            <View style={{ marginLeft: 5, width: '100%' }}>
                                <Text style={{ fontWeight: 'bold', fontSize: 18, color: colors.text }}>Kiểm duyệt comment ngữ pháp </Text>
                                <View style={{ flexDirection: 'row', borderBottomWidth: 1, borderBottomColor: '#e6e6e6', paddingBottom: 5, }}>
                                    <Text style={{ fontWeight: 'bold', fontSize: 40, marginTop: -30, color: colors.header }}>.</Text>
                                    <Text style={{ color: colors.text, marginLeft: 3 }}>{allCommentGrammar.filter(e => e.review === 2).length} comment</Text>
                                </View>
                            </View>
                        </TouchableOpacity>

                        <TouchableOpacity
                            onPress={() => navigation.navigate("AssetsComment", { navigation: navigation, type: "Hán tự" })}
                            style={{ flexDirection: 'row', paddingRight: 10, paddingLeft: 10, paddingBottom: 10, width: '100%' }}>
                            <Iconss name={'post-outline'} size={29} color={colors.text} style={{ paddingTop: 10, paddingRight: 10 }} />
                            <View style={{ marginLeft: 5, width: '100%' }}>
                                <Text style={{ fontWeight: 'bold', fontSize: 18, color: colors.text }}>Kiểm duyệt comment chữ hán </Text>
                                <View style={{ flexDirection: 'row', paddingBottom: 5 }}>
                                    <Text style={{ fontWeight: 'bold', fontSize: 40, marginTop: -30, color: colors.header }}>.</Text>
                                    <Text style={{ color: colors.text, marginLeft: 3 }}>{allCommentKanji.filter(e => e.review === 2).length} comment</Text>
                                </View>
                            </View>
                        </TouchableOpacity>
                    </View>

                    {/* <View style={{ flexDirection: 'row', paddingRight: 10, paddingLeft: 10, paddingBottom: 10 }}>
                        <Octicons name={'report'} size={29} color={'black'} style={{ paddingTop: 10, paddingRight: 10 }} />
                        <View style={{ marginLeft: 5 }}>
                            <Text style={{ fontWeight: 'bold', fontSize: 18 }}>Nội dung bị báo cáo</Text>
                            <View style={{ flexDirection: 'row', paddingBottom: 5, borderBottomWidth: 1, borderBottomColor: '#e6e6e6' }}>
                                <Text style={{ fontWeight: 'bold', fontSize: 40, marginTop: -30, color: '#00bfff' }}>.</Text>
                                <Text>1 new days</Text>
                            </View>
                        </View>
                    </View> */}


                </View>
            </View>
            {/* <View style={{ borderBottomWidth: 1, borderBottomColor: '#d9d9d9ed', paddingTop: 30 }}></View> */}
            {
                users.role === 1 ?
                    <View style={{ marginTop: 20 }}>
                        <View style={{ marginBottom: 20, color: colors.text }}>
                            <Text style={{ fontWeight: 'bold', fontSize: 20, color: colors.text }}>Lối tắt đến công cụ</Text>
                        </View>
                        <View style={{ marginLeft: 5 }}>

                            <TouchableOpacity
                                onPress={() => navigation.navigate("MemberScreen", { navigation: navigation })}
                                style={{ flexDirection: 'row', padding: 10, color: colors.text }}>
                                <Ionicons
                                    name={'people-sharp'} size={29} color={colors.text} style={{ paddingRight: 10 }} />
                                <Text style={{ fontWeight: 'bold', fontSize: 18, padding: 5, color: colors.text }}>Mọi người</Text>
                            </TouchableOpacity>

                            {/* <View style={{ flexDirection: 'row', padding: 10, backgroundColor: colors.block, marginTop: 10 }}>
                    <Icon name={'time-sharp'} size={29} color={'black'} style={{ paddingRight: 10 }} />
                    <Text style={{ fontWeight: 'bold', fontSize: 18, padding: 5 }}>Nhật ký hoạt động</Text>
                </View> */}


                        </View>
                    </View>
                    : null
           }
        </View>
    )
}

export default ManageStack;