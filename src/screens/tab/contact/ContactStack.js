import React, { Component, useEffect, useState } from 'react'
import { Text, View, ActivityIndicator, SafeAreaView, KeyboardAvoidingView, FlatList, TouchableOpacity, Image, TouchableWithoutFeedback, Alert, StyleSheet, Dimensions, TextInput } from 'react-native'
import { useDispatch, useSelector } from 'react-redux';
import { useTheme } from 'react-native-paper';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Icon from 'react-native-vector-icons/Ionicons';
import Icons from 'react-native-vector-icons/FontAwesome';
import Entypo from 'react-native-vector-icons/Entypo';
import Iconss from 'react-native-vector-icons/MaterialCommunityIcons';
import { TextInput as TextInputPaper } from 'react-native-paper';
import { element, objectOf } from 'prop-types';
import { Card, Avatar, Button, Title, Paragraph } from 'react-native-paper';
import Modal from 'react-native-modal'; // 2.4.0
import axios from 'axios';
import SelectDropdown from 'react-native-select-dropdown';
import { ScrollView } from 'react-native-gesture-handler';
import { CommonActions } from "@react-navigation/native";
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import { Center, theme } from 'native-base';
import ImagePicker from 'react-native-image-crop-picker';
import { actions, RichEditor, RichToolbar } from "react-native-pell-rich-editor";
import RenderHtml from 'react-native-render-html';
import { getListPostSuccess } from '../../../redux/actions/post.action';
import { showToastSuccess, showToastError } from '../../../helpers/toastHelper';
import { getPostRequest } from '../../../redux/actions/post.action';
import { colors } from 'react-native-elements';
import { set } from 'mongoose';
const WIDTH = Dimensions.get('window').width;
const HEIGHT = Dimensions.get('window').height;
const ContactStack = ({ navigation }) => {
    const richText = React.useRef();
    const [data, setData] = useState({ html: `` });
    var last = new Date(); // ngày hiện tại
    const source = {
        "html": "<ul><li>ffff</li><li>sfg</li></ul>"
    };
    const vocabulary = useSelector(state => state.vocabularyReducer.vocabularyList);
    const { colors } = useTheme();
    const [titleSearch, setTitleSearch] = useState("");
    const [searchRequire, setSearchRequire] = useState(false);
    const [selected, setSelected] = useState(0);
    const [isVisible, setisVisible] = useState(false);
    const [isVisibleAction, setisVisibleAction] = useState(false);
    const listUser = useSelector(state => state.userReducer.listUser);
    const [text, setText] = useState("");
    const users = useSelector(state => state.userReducer.user);
    const [comment, setComment] = useState("");
    const dispatch = useDispatch();
    const listPost = useSelector(state => state.postReducer.listPost);
    const [dataPost, setDataPost] = useState(listPost.filter(e => e.review === 1));
    const [currentPost, setCurrentPost] = useState({});
    const [selectedChoose, setSelectedChoose] = useState(["Tất cả", "Góc chia sẻ", "Học tiếng Nhật", "Du học Nhật Bản", "Việc làm tiếng Nhật", "Văn hóa Nhật Bản", "Tìm bạn học", "Khác"]);
    const LeftContent = props => <Avatar.Icon size={50} source={('data:image/jpeg;base64,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')} />
    var offset = 0;
    const isManage = useSelector(state => state.manageReducer.isManage);
    const [chooseSelected, setChooseSelected] = useState(0);
    const [textSearch, setTextSearch] = useState("");
    const [searching, setSearching] = useState(false);
    const [filtered, setFiltered] = useState([]);
    const [loading, setLoading] = useState(false);
    
    const sortkaka = (data) => {
        data.sort(
            (a, b) => {
                var dateA = new Date(a.time);
                var dateB = new Date(b.time);
                return dateA.getHours() - dateB.getHours() || dateA.getMinutes() - dateB.getMinutes() || dateA - dateB;
            }
        );
        console.log('ket qua sau khi sap xep la ', data);
    }
    useEffect(() => {
        listPost.sort(
            (a, b) => {
                var dateA = new Date(a.time);
                var dateB = new Date(b.time);
                return dateB.getHours() - dateA.getHours() && dateB.getMinutes() - dateA.getMinutes() && dateB - dateA;
            }
        );
        setDataPost(listPost.filter(e => e.review === 1));
        console.log('vao useeffect');
    }, [listPost]);

    // useEffect(() => {
    //     console.log('load laij nhe');
    //    dispatch(getPostRequest(users._id)); 
    // }, [])
    useEffect(() => {
        console.log('co vao day khong');
        const unsubscribe = navigation.addListener('focus', () => {
            setisVisibleAction(false);
            dispatch(getPostRequest(users._id));
            listPost.sort(
                (a, b) => {
                    var dateA = new Date(a.time);
                    var dateB = new Date(b.time);
                    return dateB.getHours() - dateA.getHours() && dateB.getMinutes() - dateA.getMinutes() && dateB - dateA;
                }
            );
            setDataPost(listPost.filter(e => e.review === 1));
            //Put your Data loading function here instead of my loadData()
        });

        return unsubscribe;
    }, [navigation]);
    // useEffect(() => {
    //     console.log('co vao day khongkkk 1');
    //     const unsubscribe = navigation.addListener('tabPress', e => {
    //         // Get your scrollView ref and dispatch scrollToTop
    //         dispatch(getPostRequest(users._id));
    //       });
        
    //       return unsubscribe;
    // }, [navigation]);


    const onSearchPost = (text) => {
        setTextSearch(text);
        if (text) {
            setSearching(true);
            // selected !== 0 ? dataPost.filter(e => e.theme === selectedChoose[selected])
            if (selected !== 0) {
                const tempList = dataPost.filter(e => e.theme === selectedChoose[selected]).filter(item => {
                    if (item.content.html.toLowerCase().match(text.toLowerCase()))
                        return item
                })
                setFiltered(tempList);
            }
            else {
                const tempList = dataPost.filter(item => {
                    if (item.content.html.toLowerCase().match(text.toLowerCase()))
                        return item
                })
                setFiltered(tempList);
            }
        }
        else {
            setSearching(false);
        } 11111
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

    const onScrollHandler = (e) => {
        const currentOffset = e.nativeEvent.contentOffset.y;
        var direction = currentOffset > offset ? "down" : "up";
        offset = currentOffset;
        if (direction === "down") {
            navigation.dispatch(
                CommonActions.setParams({
                    tabBarVisible: false,
                })
            );
        } else {
            navigation.dispatch(
                CommonActions.setParams({
                    tabBarVisible: true,
                })
            );
        }
    };

    const chooseScreen = (key) => {
        setSelected(key);
        // setDataPost(dataPost.filter(e => e.theme === selectedChoose[key]));
    }

    const TitleSelected = (key) => {
        setChooseSelected(key);
    }
    const postnewScreen = () => {
        console.log('screen post');
    }
    const createNewPost = () => {
        setLoading(true);
        setisVisible(false);
        // data.html = text;
        setData({ ...data });
        var requ = 2;

        if (isManage === false) {
            requ = 1;
        }
        console.log('co duyetj khong nao', isManage);
        axios.post('https://nameless-spire-67072.herokuapp.com/language/createPost', {
            "userId": users,
            "title": titleSearch,
            "theme": selectedChoose[chooseSelected],
            "content": data,
            "requ": requ,

        }, {
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json"
            }
        })
            .then((response) => {
                console.log('gia tri nhan duowcj la', response.data.newPost);
                if (response.data.code === 1) {
                    setLoading(false);
                    setTitleSearch("");
                    // showToastSuccess("Tạo bài viết thành công");
                    const a = [];
                    const kaka = response.data.newPost;
                    a.push(users);
                    kaka.user_id = a;
                    if (kaka.review === 2) {
                        showToastSuccess("BÀi viết của bạn được gửi đến quản trị viên chờ xác nhận");
                    }
                    else {
                        showToastSuccess("Tạo bài viết thành công");
                    }
                    kaka.likeposts = [];
                    setDataPost([...dataPost.unshift(kaka)]);
                    dispatch(getListPostSuccess(dataPost.unshift(kaka)));
                }
                else {
                    showToastError("Có lỗi xảy ra");
                }


            })
    }

    const actionLikePost = (id) => {
        const objIndex = dataPost.findIndex((e => e._id === id));
        if (objIndex !== -1) {
            if (dataPost[objIndex].likeposts.length === 1) {
                dataPost[objIndex].likeposts = [];
                dataPost[objIndex].countlike = dataPost[objIndex].countlike - 1;
            }
            else if (dataPost[objIndex].likeposts.length === 0) {
                dataPost[objIndex].likeposts.push({ isLike: true });
                dataPost[objIndex].countlike = dataPost[objIndex].countlike + 1;
            }
            setDataPost([...dataPost]);
            dispatch(getListPostSuccess(dataPost));
        }
        axios.post('https://nameless-spire-67072.herokuapp.com/language/createlikePost', {
            "userId": users._id,
            "postId": id
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

    const sendCommentPost = (item) => {
        const list = [];
        console.log(item.user_id);
        const date = new Date();
        const objIndex = dataPost.findIndex(e => e._id === item._id);
        const cmm = { "user": users._id, "time": date, "content": comment };
        dataPost[objIndex].comment.push(cmm);
        setDataPost([...dataPost]);
        dispatch(getListPostSuccess(dataPost));
        axios.post('https://nameless-spire-67072.herokuapp.com/language/createCommentPost', {
            "id": item._id,
            "user": users._id,
            "content": comment,
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
        setComment("");
        list.push(item._id);
        if (item.user_id[0]._id !== users._id) {
            axios.post('https://nameless-spire-67072.herokuapp.com/language/sendNotiToDeviceAsset', {
                // "list_user": list,
                // "action": "like",
                // "noti": "comment",
                // "type": "post",
                // "username": users.username,
                // "user_id": users,
                "comment_content": comment,
                "action": "comment",
                "noti": "bài viết",
                "type": "post",
                "user": users,
                "id": item._id,
                // "user_id": users,
                "user_noti": item.user_id[0]._id,
                "notifi_token": item.user_id[0].notifiToken
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

    const postChange = (item) => {
        setisVisibleAction(true);
        setCurrentPost(item);
    }
    const detailVocuShare = (id) => {
        const objIndex = vocabulary.findIndex(e => e._id === id);
        if (objIndex !== -1) {
            navigation.navigate("ListWordVocabulary", { navigation: navigation, listdata: vocabulary[objIndex] });
        }
        else {
            // navigation.navigate("ErrorScreen");
            showToastError("Bộ từ không còn tồn tại!!!")
        }
    }
    const renderPost = ({ item, index }) => {
        return (
            <View key={index} style={{ padding: 10, backgroundColor: item.review === 2 ? 'gray' : colors.background }}>
                {
                    item.review === 2 ?
                        <Text style={{ paddingLeft: 10, paddingTop: 5, color: colors.text, paddingBottom: 10 }}>Bài viết của bạn đã được gửi đến quản trị viên chờ xác nhận</Text>
                        : null
                }
                <Card>
                    <Text style={{ paddingLeft: 10, paddingTop: 5, fontWeight: 'bold', color: colors.text }}>{item.title.toUpperCase()}</Text>
                    <View style={{ flexDirection: 'row', padding: 10, justifyContent: 'space-between', }}>
                        <Image
                            style={{ height: 40, width: 40, borderRadius: 20,  }}
                            source={{
                                uri: item.user_id[0].avatar,
                            }}
                        />
                        {/* <Image
                            style={{ height: 40, width: 40, borderRadius: 20 }}
                            source={{
                                uri: item.user_id[0].avatar,
                            }}
                        /> */}
                        {
                            // item.user_id[0].username !== undefined ?

                            // <Image
                            //                         style={{ height: 40, width: 40, borderRadius: 20 }}
                            //                         source={{
                            //                             uri: element.user.avatar
                            //                         }}
                            //                     />
                            // <Text style={{ fontSize: 18, fontWeight: 'bold', color: colors.text }}>{item.user_id[0].username} </Text>
                            // :
                            // <Image
                            //     style={{ height: 40, width: 40, borderRadius: 20 }}
                            //     source={{
                            //         uri: users.avatar,
                            //     }}
                            // />
                            // <Text style={{ fontSize: 18, fontWeight: 'bold', color: colors.text }}>{users.username} </Text>


                        }
                        <View style={{}}>
                            <View style={{ flexDirection: 'row' }}>
                                {/* {
                                    item.user_id[0].username !== undefined ? */}
                                <Text style={{ fontSize: 18, fontWeight: 'bold', color: colors.text }}>{item.user_id[0].username} </Text>
                                {/* :
                                        <Text style={{ fontSize: 18, fontWeight: 'bold', color: colors.text }}>{users.username} </Text>


                                } */}
                                {
                                    item.dataVocuShare !== undefined ?
                                        // <Text>{data.dataVocuShare}</Text>
                                        <Text style={{ fontSize: 18, fontWeight: 'bold', color: colors.text }}>chia sẻ 1 bộ từ</Text>
                                        :
                                        null

                                }
                            </View>
                            <View style={{ flexDirection: 'row' }}>
                                <Text style={{ color: colors.text }}>{time(new Date(item.time))} - </Text>
                                <Text style={{ color: colors.text, backgroundColor: colors.block }}>{item.theme}</Text>
                            </View>
                        </View>
                        <View />
                        <View />
                        <View />
                        <View />
                        <View />
                        <View />
                        {item.user_id[0]._id === users._id ?
                            <TouchableOpacity
                                onPress={() => postChange(item)}
                                style={{}}>
                                <Entypo name={'dots-three-vertical'} size={18}
                                    // onPress={() => postChange(item)}
                                    style={{ marginRight: 5, color: colors.text }} />
                            </TouchableOpacity> : null
                        }


                    </View>
                    <Card.Content>
                        {
                            item.dataVocuShare !== undefined ?
                                // <Text>{data.dataVocuShare}</Text>
                                <View style={{ flexDirection: 'row' }}>
                                    <Text style={{ color: colors.text }}>Bộ từ vựng: </Text>
                                    <TouchableOpacity onPress={() => detailVocuShare(item.dataVocuShare)}>
                                        <Text style={{ color: 'blue', marginLeft: 5, fontStyle: 'italic', }}>Xem o day</Text>
                                    </TouchableOpacity>
                                </View>
                                :
                                null

                        }
                        <View style={{ flexWrap: 'wrap' }}>
                            {/* <Paragraph> */}
                            <RenderHtml
                                tagsStyles={{
                                    span: { fontSize: 16 },
                                    div: { color: colors.text },
                                    li: { color: colors.text }
                                }}
                                contentWidth={WIDTH}
                                source={item.content}
                            />
                            {/* </Paragraph> */}
                        </View>
                    </Card.Content>

                    {/* <Card.Actions> */}
                    <View style={{ flexDirection: 'row', borderBottomWidth: 1, borderBottomColor: colors.block, padding: 10, paddingLeft: 15 }}>
                        <View style={{ flexDirection: 'row' }}>
                            <TouchableOpacity onPress={() => item.review === 2 ? null : actionLikePost(item._id)}>
                                <AntDesign name={'hearto'} size={18}
                                    // onPress={() => setSearchRequire(false)}

                                    style={{ color: item.likeposts.length === 0 ? colors.text : 'red' }} />
                            </TouchableOpacity>
                            <Text style={{ marginLeft: 5, color: colors.text }}>{item.countlike}</Text>
                        </View>

                        <View style={{ flexDirection: 'row', marginLeft: 15 }}>
                            <EvilIcons name={'comment'} size={20}
                                color={colors.text}
                                // onPress={() => commentOfPost()}
                                onPress={() => item.review === 2 ? null : setDataPost(
                                    dataPost.map(p => {
                                        if (p._id === item._id) {
                                            return { ...p, checked: !p.checked }
                                        }
                                        return p;
                                    })
                                )}
                            />
                            <Text style={{ marginLeft: 5, color: colors.text }}>{item.comment.length}</Text>
                        </View>
                    </View>
                    {item.checked === true ?
                        <View style={{ padding: 10, }}>
                            <View style={{ flexDirection: 'row' }}>
                                {/* <View> */}
                                <TextInput
                                    style={{ color: colors.text, padding: 10, borderWidth: 1, borderRadius: 20, borderColor: '#e6e6e6', width: '90%' }}
                                    multiline={true}
                                    placeholder="Viết bình luận...."
                                    placeholderTextColor={colors.text_of_input}
                                    value={comment}
                                    onChangeText={text => setComment(text)}
                                />

                                {/* </View> */}
                                <View style={{ justifyContent: 'center' }}>
                                    <Icons name={'send-o'} size={20}
                                        onPress={() => sendCommentPost(item)}
                                        style={{ marginTop: 15, marginLeft: 10, color: colors.text }}
                                    />
                                </View>
                            </View>

                            <View>
                                {
                                    item.comment.map((element, key) => {
                                        return (
                                            <View style={{ flexDirection: 'row', marginTop: 10 }} key={key}>
                                                <View style={{}}>
                                                    
                                                        <Image
                                                        style={{ height: 40, width: 40, borderRadius: 20 }}
                                                        source={{
                                                            uri: listUser[listUser.findIndex(e=> e._id === element.user)].avatar
                                                        }}
                                                    />
                                                    
                                                </View>
                                                <View style={{ marginLeft: 10, backgroundColor: colors.comment, padding: 5, paddingRight: 20, paddingLeft: 10, borderRadius: 10, marginRight: 20, width: '80%' }}>
                                                    <View style={{ flexDirection: 'row' }}>
                                                        <Text style={{ fontWeight: 'bold', color: colors.text }}>{listUser[listUser.findIndex(e=> e._id === element.user)].username}</Text>
                                                        <Text style={{color: colors.text, marginLeft: 10 }}>{time(new Date(element.time))}</Text>
                                                    </View>

                                                    <Text style={{ color: colors.text }}>{element.content}</Text>

                                                </View>

                                            </View>
                                        )
                                    })
                                }

                            </View>

                        </View>
                        : null}
                    {/* </Card.Actions> */}
                </Card>
            </View>
        )
    }
    const editPost = (currentPost) => {
        // console.log('edit post');
        // console.log('CURRENT POST LA ', currentPost);
        navigation.navigate("EditPost", { navigation: navigation, item: currentPost });
    }

    const deletePost = (currentPost) => {
        Alert.alert(
            "Thông báo",
            "Bạn chắc chắn muốn xóa bài viết?",
            [
                {
                    text: "Cancel",
                    onPress: () => {
                        console.log("Cancel Pressed");
                        setisVisibleAction(false);
                    },
                    style: "cancel"

                },
                {
                    text: "OK", onPress: () => {
                        setisVisibleAction(false);
                        setLoading(true);
                        const objectIndex = dataPost.findIndex(e => e._id === currentPost._id);
                        if (objectIndex !== -1) {

                            axios.post('https://nameless-spire-67072.herokuapp.com/language/deletePost', {
                                "id": currentPost._id,
                            }, {
                                headers: {
                                    "Accept": "application/json",
                                    "Content-Type": "application/json"
                                }
                            })
                                .then((response) => {
                                    console.log(response.data);
                                    if (response.data.code === 1) {
                                        setLoading(false);
                                        dataPost.splice(objectIndex, 1);
                                        setDataPost([...dataPost]);
                                        dispatch(getListPostSuccess(dataPost));
                                        showToastSuccess("Xóa bài viết thành công");
                                    }
                                    else {
                                        showToastError("Có một số lỗi xảy ra!Vui lòng thử lại");
                                    }
                                })
                                .catch(function (error) {
                                    throw error;
                                })
                        }
                    }
                }
            ]
        )
    }
    return (
        <SafeAreaView style={{ flex: 1 }}>
            <View style={{ flexDirection: 'row', height: 50, backgroundColor: colors.header, justifyContent: 'space-between' }}>
                <View style={{ justifyContent: 'center', flex: 1 }}>
                    <TouchableOpacity style={{ flexDirection: 'row', alignItems: 'center' }} onPress={() => { navigation.goBack(); setTextSearch(""); }}>
                        <Icon name={'arrow-back'} size={29} style={{ color: colors.text_of_box, marginLeft: 5 }} />
                    </TouchableOpacity>
                </View>
                {searchRequire === false ?
                    <View style={{ flexDirection: 'row', flex: 7, justifyContent: 'space-between' }}>
                        <View style={{ justifyContent: 'center', marginLeft: 10, paddingLeft: 10 }}>
                            <Text style={{ textAlign: 'center', color: colors.text, fontSize: 18, color: colors.text_of_box }}>Hỏi và đáp</Text>
                        </View>
                        <View style={{ flexDirection: 'row', paddingRight: 10 }}>

                            <TouchableOpacity style={{ justifyContent: 'center', marginLeft: 20, paddingRight: 10 }} onPress={() => setSearchRequire(true)}>
                                {/* <Icons name={"search"} size={29} style={{ color: '#fff' }} /> */}
                                <EvilIcons name={'search'} size={29} color={colors.text_of_box}

                                />
                            </TouchableOpacity>


                        </View>

                    </View>
                    :

                    <View style={{ flexDirection: 'row', flex: 7, justifyContent: 'space-between' }}>
                        <TextInput
                            style={{ marginLeft: 10, fontSize: 18, color: colors.text_of_box }}
                            placeholder="nhập nội dung bài viết..."
                            // value={textSearch}
                            placeholderTextColor={colors.text_of_input}

                            onChangeText={text => onSearchPost(text)}
                        />
                        <View />
                        <AntDesign name={'close'} size={20}
                            onPress={() => { setSearchRequire(false); setSearching(false) }}
                            style={{ color: '#fff', paddingTop: 15, paddingRight: 20 }} />
                    </View>
                }
            </View>
            {/* <CustomHeader title="Home" isHome={true} navigation={navigation} /> */}

            <View>
                <View style={{ padding: 10, flexDirection: 'row' }}>
                    <Image
                        style={{ height: 50, width: 50, borderRadius: 25 }}
                        source={{
                            uri: users.avatar
                        }}
                    />
                    <TouchableOpacity onPress={() => setisVisible(true)}>
                        <TextInput
                            style={{ borderWidth: 1, width: '70%', borderRadius: 10, marginLeft: 20, fontSize: 18, borderColor: '#d9d9d9' }}
                            multiline={true}
                            placeholderTextColor={colors.text_of_input}
                            placeholder="Bạn đang suy nghĩ gì, phương bui?"
                            editable={false}
                        />
                    </TouchableOpacity>
                </View>
                <View style={{ backgroundColor: colors.block }}>
                    <ScrollView horizontal={true} style={{ flexGrow: 1 }}>
                        {
                            selectedChoose.map((element, key) => {
                                return (
                                    <TouchableOpacity
                                        onPress={() => chooseScreen(key)}
                                        key={key} style={{ padding: 5, backgroundColor: selected === key ? colors.header : colors.background, marginTop: 5, marginBottom: 5, marginLeft: 10 }}>
                                        <Text style={{ color: selected === key ? '#fff' : colors.text }}>{element}</Text>
                                    </TouchableOpacity>
                                )
                            })
                        }
                    </ScrollView>
                </View>
                <ScrollView
                    showsVerticalScrollIndicator={false}
                    scrollEventThrottle={16}
                    onScroll={onScrollHandler}
                    style={{ marginBottom: 100 }}
                >


                    <View style={{ marginBottom: 70, justifyContent: 'center' }}>
                        {loading === true ?
                            <ActivityIndicator size="small" color="#0000ff" />
                            : null
                        }
                        <FlatList
                            data={searching === true ? filtered : selected !== 0 ? dataPost.filter(e => e.theme === selectedChoose[selected]) : dataPost}
                            keyExtractor={(item, index) => index.toString()}
                            renderItem={renderPost}

                        />

                        {/* <View style={{ padding: 10 }}>
                            <Card>
                            <Text style={{paddingLeft: 10, paddingTop: 5, fontWeight: 'bold'}}>HỌC TIẾNG NHẬT</Text>
                                <View style={{ flexDirection: 'row', padding: 10 }}>
                                    <Image
                                        style={{ height: 40, width: 40, borderRadius: 20 }}
                                        source={{
                                            uri: 'data:image/jpeg;base64,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',
                                        }}
                                    />
                                    <View style={{ marginLeft: 15 }}>
                                        <Text style={{ fontSize: 18, fontWeight: 'bold' }}>Thu Giang </Text>
                                        <View style={{ flexDirection: 'row' }}>
                                            <Text>Admin - 1 giờ trước - </Text>
                                            <Text style={{ backgroundColor: '#f2f2f2' }}>Hỏi đáp tiếng nhật</Text>
                                        </View>
                                    </View>

                                </View>
                                <Card.Content>
                                <View style={{marginTop: 30}}>
                                        <Paragraph>
                                            <RenderHtml
                                                contentWidth={WIDTH}
                                                source={source}
                                            />
                                        </Paragraph>
                                    </View>
                                </Card.Content>

                                <Card.Actions>
                                    <View style={{ flexDirection: 'row' }}>
                                        <View style={{ flexDirection: 'row' }}>
                                            <AntDesign name={'hearto'} size={18}
                                                // onPress={() => setSearchRequire(false)}
                                                style={{}} />
                                            <Text style={{ marginLeft: 5 }}>2</Text>
                                        </View>

                                        <View style={{ flexDirection: 'row', marginLeft: 15 }}>
                                            <EvilIcons name={'comment'} size={20}
                                                // onPress={() => setSearchRequire(false)}
                                                style={{}} />
                                            <Text style={{ marginLeft: 5 }}>2</Text>
                                        </View>
                                    </View>
                                </Card.Actions>
                            </Card>
                        </View> */}




                        {/* <View> */}
                        {/* <Text>DAY NHE</Text>
                            <RenderHtml
                                contentWidth={WIDTH}
                                source={source}
                            /> */}

                        {/* <RenderHtml
                                contentWidth={WIDTH}
                                source={data}
                            /> */}
                        {/* </View> */}
                        {/* <View style={{ padding: 10 }}>
                            <Card>
                                <Card.Title title="Card Title" subtitle="Card Subtitle" left={LeftContent} />
                                <Card.Content>
                                    <Title>Card title</Title>
                                    <Paragraph>Card content</Paragraph>
                                </Card.Content>
                                <Card.Cover source={{ uri: 'https://picsum.photos/700' }} />
                                <Card.Actions>
                                    <Button>Cancel</Button>
                                    <Button>Ok</Button>
                                </Card.Actions>
                            </Card>
                        </View> */}
                        {/* <View style={{ padding: 10 }}>
                            <Card>
                                <Card.Title title="Card Title" subtitle="Card Subtitle" left={LeftContent} />
                                <Card.Content>
                                    <Title>Card title</Title>
                                    <Paragraph>Card content</Paragraph>
                                </Card.Content>
                                <Card.Cover source={{ uri: 'https://picsum.photos/700' }} />
                                <Card.Actions>
                                    <Button>Cancel</Button>
                                    <Button>Ok</Button>
                                </Card.Actions>
                            </Card>
                        </View> */}
                    </View>


                </ScrollView>
            </View>


            <View style={[styles.container]}>
                <Modal
                    isVisible={isVisible}
                    swipeDirection="down"
                    style={{ justifyContent: 'flex-end', margin: 0 }}
                    onRequestClose={() => setisVisible(false)}
                    deviceWidth={WIDTH}
                    deviceHeight={HEIGHT}
                >

                    <View style={[styles.modalContent, { backgroundColor: colors.background }]}>
                        <View style={{ flexDirection: 'row', height: 50, backgroundColor: colors.header, justifyContent: 'space-between' }}>
                            <AntDesign name={'close'} size={20} color={'#fff'}
                                onPress={() => setisVisible(false)}
                                style={{ paddingTop: 15, paddingRight: 20, marginLeft: 10 }} />
                            <TouchableOpacity style={{ justifyContent: 'center', marginRight: 20 }} onPress={() => createNewPost()}>
                                <Text style={{ fontSize: 20, color: '#fff' }}>Đăng</Text>
                            </TouchableOpacity>
                        </View>
                        <View style={{ backgroundColor: colors.notifi }}>
                            <TextInput
                                style={{ color: colors.text, marginLeft: 10, fontSize: 18, backgroundColor: '#fff', borderWidth: 1, borderColor: '#e6e6e6', margin: 10 }}
                                placeholder="Nhập tiêu đề bài viết"
                                value={titleSearch}
                                placeholderTextColor={colors.text_of_input}

                                onChangeText={text => setTitleSearch(text)}
                            />

                        </View>
                        {loading === true ?
                            <ActivityIndicator size="small" color="#0000ff" />
                            : null
                        }

                        <SafeAreaView style={{ padding: 10 }}>
                            <ScrollView>
                                <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} style={{ flex: 1, minHeight: 200 }}>
                                    {/* <Text style={{ color: colors.text }}>Description:</Text> */}
                                    <RichEditor
                                        ref={richText}
                                        editorStyle={{ backgroundColor: colors.background, color: colors.text }}
                                        placeholder="Nhập nội dung bài viết"

                                        onChange={descriptionText => {
                                            // console.log("descriptionText:", descriptionText);
                                            // setText(descriptionText);
                                            data.html = descriptionText;
                                            // console.log('data ne ', data);
                                            setData({ ...data });
                                        }}
                                    />


                                </KeyboardAvoidingView>
                            </ScrollView>

                            <RichToolbar
                                editor={richText}
                                // onPressAddImage={insertImage}
                                onPressAddImage={() => {
                                    ImagePicker.openPicker({
                                        width: WIDTH-200,
                                        height: 400,
                                        cropping: true,
                                    }).then((image) => {
                                        var photo = {
                                            uri: image.path,
                                            type: image.mime,
                                            name: image.path.split('/').pop(),
                                        };
                                        const formData = new FormData();
                                        formData.append("file", photo);
                                        formData.append("upload_preset", "kbihuaf8");
                                        axios.post("https://api.cloudinary.com/v1_1/languageword/image/upload", formData).then((response) => {
                                            richText.current?.insertImage(
                                                response.data.url,
                                                // 'https://res.cloudinary.com/languageword/image/upload/v1653376930/gwvumnesyeuvzconqntt.jpg'
                                            );
                                        });
                                    }).catch((error) => {
                                        console.log(`loi ${error}`);
                                    });
                                }}
                                actions={[
                                    actions.setBold,
                                    actions.setItalic,
                                    actions.insertBulletsList,
                                    actions.insertOrderedList,
                                    actions.insertImage,
                                    actions.insertLink,
                                    actions.insertText,
                                    actions.insertVideo,
                                    'customAction',
                                ]}

                                iconMap={{
                                    [actions.heading1]: ({ tintColor }) => (<Text style={[{ color: tintColor }]}>H1</Text>),

                                }}

                            />

                        </SafeAreaView>

                        <View style={{ backgroundColor: colors.block, padding: 10 }}>
                            <Text style={{ textDecorationLine: 'underline', color: colors.text }}>Câu hỏi của bạn thuộc chủ để </Text>
                            <View style={{ flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'center', marginTop: 20, marginBottom: 20 }}>
                                {
                                    selectedChoose.map((element, key) => {
                                        return (
                                            <TouchableOpacity key={key} onPress={() => TitleSelected(key)} style={{ width: '45%', alignItems: 'center', marginLeft: 5, marginTop: 5, justifyContent: 'center', padding: 10, backgroundColor: key === chooseSelected ? colors.header : colors.background }}>
                                                <Text style={{ color: key === chooseSelected ? '#fff' : colors.text }}>{element}</Text>
                                            </TouchableOpacity>
                                        )
                                    })
                                }
                            </View>
                        </View>

                    </View>
                </Modal>
            </View>

            <View >
                <Modal
                    isVisible={isVisibleAction}
                    swipeDirection="down"
                    // transparent={true}
                    style={{ justifyContent: 'flex-end', margin: 0, }}
                // onRequestClose={() => setisVisibleAction(false)}

                >
                    <View>
                        <View style={{ backgroundColor: colors.background }}>
                            <View style={{ flexDirection: 'row', justifyContent: 'flex-end', padding: 10 }}>
                                <AntDesign name={'close'} size={20}
                                    onPress={() => setisVisibleAction(false)}
                                    style={{ color: colors.text }} />
                            </View>
                            <TouchableOpacity style={{ padding: 20, flexDirection: 'row' }} onPress={() => editPost(currentPost)}>
                                <AntDesign name={'edit'} size={20} color={colors.text}

                                    style={{}} />
                                <Text style={{ marginLeft: 10, color: colors.text }}>Chỉnh sửa bài viết</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={{ padding: 20, flexDirection: 'row' }} onPress={() => deletePost(currentPost)}>
                                <AntDesign name={'delete'} size={20} color={'red'}
                                    style={{}} />
                                <Text style={{ marginLeft: 10, color: colors.text }}>Xóa bài viết</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </Modal>
            </View>

        </SafeAreaView>
    )
}
export default ContactStack;

const styles = StyleSheet.create({

    container: {
        flex: 1,
        height: 1000
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
        flex: 1,
        // backgroundColor: colors.text,
        height: HEIGHT
    },
    //   bottomModal: {
    //     justifyContent: 'flex-end',
    //     margin: 0,
    //   },
    text: {
        fontSize: 24,
        marginBottom: 30,
        padding: 40,
    }
});
