import React, { Component, useEffect, useState } from 'react'
import { Text, View, Platform, TextInput, KeyboardAvoidingView, SafeAreaView, ScrollView, StyleSheet } from "react-native";
import { actions, RichEditor, RichToolbar } from "react-native-pell-rich-editor";
import { useTheme } from 'react-native-paper';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Icon from 'react-native-vector-icons/Ionicons';
import Icons from 'react-native-vector-icons/FontAwesome';
import ImagePicker from 'react-native-image-crop-picker';
import axios from 'axios';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { useDispatch, useSelector } from 'react-redux';
import { getListPostSuccess } from '../../../../redux/actions/post.action';

const ShareAll = ({ navigation, route }) => {
    const { colors } = useTheme();

    const richText = React.useRef();
    const [data, setData] = useState({ html: `` });
    const [titleSearch, setTitleSearch] = useState("");
    const [selectedChoose, setSelectedChoose] = useState(["Tất cả", "Góc chia sẻ", "Học tiếng Nhật", "Du học Nhật Bản", "Việc làm tiếng Nhật", "Văn hóa Nhật Bản", "Tìm bạn học", "Khác"]);
    const { datavocu } = route.params;
    const users = useSelector(state => state.userReducer.user);
    const listPost = useSelector(state => state.postReducer.listPost);
    const [dataPost, setDataPost] = useState(listPost.filter(e => e.review === 1));
    const dispatch = useDispatch();
    const vocabulary = useSelector(state => state.vocabularyReducer.vocabularyList);
    const [dataListVocu, setdataListVocu] = useState(vocabulary);
    const isManage = useSelector(state => state.manageReducer.isManage);

    useEffect(() => {
        setDataPost(listPost.filter(e => e.review === 1));
    }, [listPost]);


    const sharePostAllUser = () => {

        setData({ ...data });
        var requ = 2;
        if(isManage === false) {
            requ = 1
        }
        axios.post('https://nameless-spire-67072.herokuapp.com/language/createPost', {
            "userId": users,
            "title": titleSearch,
            "theme": selectedChoose[1],
            "content": data,
            "dataVocuShare": datavocu._id,
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
                dispatch(getListPostSuccess(dataPost.concat(kaka)));
                const objectIndex = dataListVocu.findIndex(e => e._id === datavocu._id);
                if (objectIndex !== -1) {
                    dataListVocu[objectIndex].typeShare = 1;
                    dataListVocu[objectIndex].share = [];
                    console.log('data list vocu ', dataListVocu);
                    setdataListVocu([...dataListVocu]);
                    axios.post('https://nameless-spire-67072.herokuapp.com/language/shareVocabulary', {
                        "id": datavocu._id,
                        "listUserShare": [],
                        "remind": "",
                        "userid": users._id,
                        "typeShare": 1
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
                    navigation.goBack();
                }
            })
    }
    return (
        <View style={{ flex: 1 }}>
            {/* <Modal
            isVisible={isVisible}
            swipeDirection="down"
            style={{ justifyContent: 'flex-end', margin: 0 }}
            onRequestClose={() => setisVisible(false)}
            deviceWidth={WIDTH}
            deviceHeight={HEIGHT}
        > */}
            <View>
                <View style={{ flexDirection: 'row', backgroundColor: colors.header, padding: 10, justifyContent: 'space-between' }}>
                    <AntDesign name={'close'} size={20} color={'#fff'}
                        onPress={() => navigation.goBack()}
                        style={{}} />
                    <TouchableOpacity style={{ marginRight: 20, }} onPress={() => sharePostAllUser()}>
                        <Text style={{ color: '#fff', fontSize: 20 }}>Chia sẻ</Text>
                    </TouchableOpacity>
                </View>
                <View style={{ backgroundColor: colors.background }}>
                    <TextInput
                        style={{ marginLeft: 10, fontSize: 18,  borderWidth: 1, borderColor: '#e6e6e6', margin: 10 }}
                        placeholder="Nhập tiêu đề bài viết"
                        placeholderTextColor={colors.text_of_input}

                        value={titleSearch}
                        onChangeText={text => setTitleSearch(text)}
                    />

                </View>

                <SafeAreaView style={{ padding: 10 }}>
                    <ScrollView>
                        <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} style={{ flex: 1, minHeight: 200 }}>
                            <View style={{ flexDirection: 'row' }}>
                                <Text style={{color: colors.text}}>Bộ từ vựng: </Text>
                                <TouchableOpacity style={{ marginLeft: 5 }} onPress={() => navigation.navigate("ListWordVocabulary", { navigation: navigation, listdata: datavocu })}>
                                    <Text style={{ color: colors.header, fontStyle: 'italic' }}> {datavocu.name}</Text>
                                </TouchableOpacity>
                            </View>
                            <RichEditor
                                ref={richText}
                                editorStyle ={{backgroundColor: colors.background, color:colors.text}}
                                placeholder="input content"
                                androidHardwareAccelerationDisabled={true}
                                initialFocus={true}
                                onChange={descriptionText => {
                                    // console.log("descriptionText:", descriptionText);
                                    // setText(descriptionText);
                                    data.html = descriptionText;
                                    console.log(data);
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
                                width: 100,
                                height: 100,
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

                <View style={{ backgroundColor: colors.background, padding: 10 }}>
                    <Text style={{ textDecorationLine: 'underline', color: colors.text }}>Câu hỏi của bạn thuộc chủ để </Text>
                    <View style={{ flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'center', marginTop: 20, marginBottom: 20 }}>
                        {
                            selectedChoose.map((element, key) => {
                                return (
                                    <TouchableOpacity key={key} style={{ alignItems: 'center', margin: 10, justifyContent: 'center', padding: 10, backgroundColor: key === 1 ? colors.header :'#fff' }}>
                                        <Text style={{ color: key === 1 ? '#fff' : 'black' }}>{element}</Text>
                                    </TouchableOpacity>
                                )
                            })
                        }
                    </View>
                </View>

            </View>
            {/* </Modal> */}
        </View>


    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F5FCFF',
    },
    nav: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginHorizontal: 5,
    },
    rich: {
        minHeight: 300,
        flex: 1
    },
    richBar: {
        height: 50,
        backgroundColor: '#F5FCFF'
    },
    scroll: {
        backgroundColor: '#ffffff'
    }
});

export default ShareAll;