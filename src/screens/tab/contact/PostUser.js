import React, { Component, useEffect, useState } from 'react'
import { Text, View, SafeAreaView, KeyboardAvoidingView, FlatList, TouchableOpacity, Image, TouchableWithoutFeedback, Alert, StyleSheet, Dimensions, TextInput } from 'react-native'
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

const WIDTH = Dimensions.get('window').width;
const HEIGHT = Dimensions.get('window').height;
const PostUser = ({ navigation, route }) => {
    const richText = React.useRef();
    const {dataOne} =route.params;
    const [data, setData] = useState({ html: `` });
    var last = new Date(); // ngày hiện tại
   
    const { colors } = useTheme();
    const [titleSearch, setTitleSearch] = useState("");
    const [searchRequire, setSearchRequire] = useState(false);
    const [selected, setSelected] = useState(0);
    const [isVisible, setisVisible] = useState(false);
    const [isVisibleAction, setisVisibleAction] = useState(false);

    const [text, setText] = useState("");
    const users = useSelector(state => state.userReducer.user);
    const [comment, setComment] = useState("");
    const listUser = useSelector(state => state.userReducer.listUser);

    const listPost = useSelector(state => state.postReducer.listPost);
    const [dataPost, setDataPost] = useState(listPost.filter(e => e.review === 1));
    const [currentPost, setCurrentPost] = useState({});
    const [selectedChoose, setSelectedChoose] = useState(["Tất cả", "Góc chia sẻ", "Học tiếng Nhật", "Du học Nhật Bản", "Việc làm tiếng Nhật", "Văn hóa Nhật Bản", "Tìm bạn học", "Khác"]);
    var offset = 0;
    const isManage = useSelector(state => state.manageReducer.isManage);
    const [chooseSelected, setChooseSelected] = useState(0);
    const [item, setItem] = useState(dataOne)
  useEffect(() => {
    console.log('data one ne ', dataOne);
    setItem({...dataOne, checked: true});
    console.log('vao useeffect khong');
  }, [dataOne]);

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
        setisVisible(false);
        // data.html = text;
        setData({ ...data });
        var requ = 2;

        if (isManage === false) {
            requ = 1;
        }
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
                const kaka = response.data.newPost;
                kaka.likeposts = [];
                setDataPost([...dataPost.concat(kaka)]);

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
            getListPostSuccess(dataPost);
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

    const sendCommentPost = (id) => {
        const date = new Date();
        const objIndex = dataPost.findIndex(e => e._id === id);
        const cmm = { "user": users, "time": date, "content": comment };
        dataPost[objIndex].comment.push(cmm);
        setDataPost([...dataPost]);
        axios.post('https://nameless-spire-67072.herokuapp.com/language/createCommentPost', {
            "id": id,
            "user": users,
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
            navigation.navigate("ErrorScreen");
        }
    }
  
    const editPost = (currentPost) => {
        console.log('edit post');
        console.log('CURRENT POST LA ', currentPost);
        navigation.navigate("EditPost", { navigation: navigation, item: currentPost });
    }

    const deletePost = (currentPost) => {
        Alert.alert(
            "Delete",
            "Want to delete the post ?",
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
                        const objectIndex = dataPost.findIndex(e => e._id === currentPost._id);
                        if (objectIndex !== -1) {
                            dataPost.splice(objectIndex, 1);
                            setDataPost([...dataPost]);
                            setisVisibleAction(false);

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
                    <TouchableOpacity style={{ flexDirection: 'row', alignItems: 'center' }} onPress={() => navigation.goBack()}>
                        <Icon name={'arrow-back'} size={29} style={{ color: '#fff', marginLeft: 5 }} />
                    </TouchableOpacity>
                </View>
                    <View style={{ flexDirection: 'row', flex: 7, justifyContent: 'space-between' }}>
                        <View style={{ justifyContent: 'center', marginLeft: 10, paddingLeft: 10 }}>
                            <Text style={{ textAlign: 'center', color: '#fff', fontSize: 18 }}>Bài viết</Text>
                        </View>
                        <View style={{ flexDirection: 'row', paddingRight: 10 }}>

                           


                        </View>

                    </View>
                   
            </View>
            {/* <CustomHeader title="Home" isHome={true} navigation={navigation} /> */}
            <View>
               
                <View style={{ padding: 10 }}>
                <Card>
                    {/* <Text style={{ paddingLeft: 10, paddingTop: 5, fontWeight: 'bold' }}>{item.title.toUpperCase()}</Text> */}
                    <View style={{ flexDirection: 'row', padding: 10, justifyContent: 'space-between' }}>
                        <Image
                            style={{ height: 40, width: 40, borderRadius: 20 }}
                            source={{
                                uri: item.user_id[0]._id === users._id ? users.avatar: item.user_id[0].avatar
                                // uri: listUser[listUser.findIndex(e=> e._id === item.user_id[0]._id)].avatar
                            }}
                        />
                        <View style={{}}>
                            <View style={{ flexDirection: 'row' }}>
                                <Text style={{ fontSize: 18, fontWeight: 'bold', color: colors.text }}>{item.user_id[0].username} </Text>
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
                                <Text style={{ backgroundColor: '#f2f2f2', color: 'black' }}>{item.theme}</Text>
                            </View>
                        </View>
                        <View />
                        <View />
                        <View />
                        <View />
                        <View />
                        <View />
                        {item.user_id._id === users._id ?
                            <TouchableOpacity
                                onPress={() => postChange(item)}
                                style={{}}>
                                <Entypo name={'dots-three-vertical'} size={18}
                                    // onPress={() => postChange(item)}
                                    style={{ marginRight: 5 }} />
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
                                        <Text style={{ color: 'blue', marginLeft: 5, fontStyle: 'italic' }}>Xem o day</Text>
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
                    <View style={{ flexDirection: 'row', borderBottomWidth: 1, borderBottomColor: '#e6e6e6', padding: 10, paddingLeft: 15 }}>
                        <View style={{ flexDirection: 'row' }}>
                            <TouchableOpacity onPress={() => actionLikePost(item._id)}>
                                <AntDesign name={'hearto'} size={18}
                                    style={{ color: item.likeposts.length === 0 ? colors.text : 'red' }}
                                     />
                            </TouchableOpacity>
                            <Text style={{ marginLeft: 5, color: colors.text }}>{item.countlike}</Text>
                        </View>

                        <View style={{ flexDirection: 'row', marginLeft: 15 }}>
                            <EvilIcons name={'comment'} size={20}
                            color={colors.text}
                                // onPress={() => commentOfPost()}
                                onPress={() => setDataPost(
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
                    <View style={{ padding: 10, }}>
                        <View style={{ flexDirection: 'row' }}>
                            {/* <View> */}
                            <TextInput
                                style={{color: colors.text, padding: 10, borderWidth: 1, borderRadius: 20, borderColor: '#e6e6e6', width: '90%' }}
                                multiline={true}
                                placeholder="Viết bình luận...."
                                placeholderTextColor={colors.text_of_input}

                                value={comment}
                                onChangeText={text => setComment(text)}
                            />

                            {/* </View> */}
                            <View style={{ justifyContent: 'center' }}>
                                <Icons name={'send-o'} size={20}
                                    onPress={() => sendCommentPost(item._id)}
                                    style={{ marginTop: 15, marginLeft: 10,color: colors.text }}
                                />
                            </View>
                        </View>
                        {item.checked === true ?
                            <View>
                                {
                                    item.comment.map((element, key) => {
                                        // console.log(element);
                                        return (
                                            <View style={{ flexDirection: 'row', marginTop: 10 }} key={key}>
                                                <View style={{}}>
                                                    <Image
                                                        style={{ height: 40, width: 40, borderRadius: 20 }}
                                                        source={{
                                                            uri: listUser[listUser.findIndex(e=> e._id === element.user)].avatar,
                                                        }}
                                                    />
                                                </View>
                                                <View style={{ marginLeft: 10, backgroundColor:colors.comment, padding: 5, paddingRight: 20, paddingLeft: 10, borderRadius: 10 }}>
                                                    <View style={{ flexDirection: 'row' }}>
                                                        {
                                                            listUser.findIndex(e=> e._id === element.user) !==-1?
                                                            <Text style={{ fontWeight: 'bold', color: colors.text }}>{listUser[listUser.findIndex(e=> e._id === element.user)].username}</Text>
                                                            :
                                                            <Text style={{ fontWeight: 'bold', color: colors.text }}>{users.username}</Text>


                                                        }
                                                        <Text style={{ marginLeft: 10, color: colors.text }}>{time(new Date(element.time))}</Text>
                                                    </View>

                                                    <Text style={{color: colors.text}}>{element.content}</Text>

                                                </View>

                                            </View>
                                        )
                                    })
                                }

                            </View>
                            : null
                        }
                    </View>
                    {/* </Card.Actions> */}
                </Card>
            </View>
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
                        <View style={{ backgroundColor: '#fff' }}>
                            <View style={{ flexDirection: 'row', justifyContent: 'flex-end', padding: 10 }}>
                                <AntDesign name={'close'} size={20}
                                    onPress={() => setisVisibleAction(false)}
                                    style={{}} />
                            </View>
                            <TouchableOpacity style={{ padding: 20, flexDirection: 'row' }} onPress={() => editPost(currentPost)}>
                                <AntDesign name={'edit'} size={20} color={'black'}

                                    style={{}} />
                                <Text style={{ marginLeft: 10 }}>Chỉnh sửa bài viết</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={{ padding: 20, flexDirection: 'row' }} onPress={() => deletePost(currentPost)}>
                                <AntDesign name={'delete'} size={20} color={'black'}
                                    style={{}} />
                                <Text style={{ marginLeft: 10 }}>Xóa bài viết</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </Modal>
            </View>

        </SafeAreaView>
    )
}
export default PostUser;

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
        backgroundColor: 'white',
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
