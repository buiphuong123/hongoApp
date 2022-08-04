import React, { Component, useEffect, useState } from 'react'
import { Text, View, SafeAreaView, KeyboardAvoidingView, ScrollView, FlatList, TouchableOpacity, Image, TouchableWithoutFeedback, Alert, StyleSheet, Dimensions, TextInput } from 'react-native'
import { actions, RichEditor, RichToolbar } from "react-native-pell-rich-editor";
import { useTheme } from 'react-native-paper';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Icon from 'react-native-vector-icons/Ionicons';
import Icons from 'react-native-vector-icons/FontAwesome';
import ImagePicker from 'react-native-image-crop-picker';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { getListPostSuccess } from '../../../redux/actions/post.action';

const EditPost = ({navigation, route }) => {
    const { colors } = useTheme();
    const dispatch = useDispatch();
    const { item} = route.params;
    const [titleSearch, setTitleSearch] = useState(item.title);
    const [selectedChoose, setSelectedChoose] = useState(["Tất cả","Góc chia sẻ", "Học tiếng Nhật", "Du học Nhật Bản", "Việc làm tiếng Nhật", "Văn hóa Nhật Bản", "Tìm bạn học", "Khác"]);
    const [chooseSelected, setChooseSelected] = useState(selectedChoose.findIndex(e => e === item.theme));
    const richText = React.useRef();
    const [contentHTML, setContentHTML] = useState(item.content);
    const listPost = useSelector(state => state.postReducer.listPost);
    const [dataP, setDataP] = useState(listPost);
    const [data, setData] = useState({ html: `` });
    useEffect(() => {
        setTitleSearch(item.title);
        setChooseSelected(selectedChoose.findIndex(e => e === item.theme));
        console.log('cai can day nhe', data);
        setContentHTML(item.content);
        setData({"html": item.content.html});
    }, [item]);
    useEffect(() => {
        setDataP(listPost);
    }, [listPost]);
    const onEditorInitialized = () => {
        setData({"html": item.content.html});
        console.log('initalised', data);
    }
    // const [update, setUpdate] = useState(item.content);
    
    const handleChange = (html) => {
        console.log(html);
    }

    const editP = () => {
        console.log('vao eidt');
        var time = new Date();
        setData({ ...data });
        const objIndex = listPost.findIndex(e=> e._id === item._id);
        if(listPost[objIndex].title === titleSearch && listPost[objIndex].content.html === data.html && listPost[objIndex].theme === selectedChoose[chooseSelected]) {
            return;
        }
        else {
            listPost[objIndex].title = titleSearch;
            listPost[objIndex].content = data;
            listPost[objIndex].theme = selectedChoose[chooseSelected];
            listPost[objIndex].time = time
            // setDataP([...dataP]);
            dispatch(getListPostSuccess([...listPost]));
            axios.post('https://nameless-spire-67072.herokuapp.com/language/editPost', {
            "id": item._id,
            "title": titleSearch,
            "theme": selectedChoose[chooseSelected],
            "content": data,

        }, {
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json"
            }
        })
            .then((response) => {
                console.log( response.data);
                navigation.goBack();
            })

        }
    }
    return (
        <View style={{ flex: 1 }}>
            <View>
                <View style={{ flexDirection: 'row', height: 50, backgroundColor: colors.header, justifyContent: 'space-between' }}>
                    <AntDesign name={'close'} size={20} color={'#fff'}
                        onPress={() => navigation.goBack()}
                        style={{ paddingTop: 15, paddingRight: 20, marginLeft: 10 }} />
                    <TouchableOpacity style={{ justifyContent: 'center', marginRight: 20 }} onPress={() => editP()}>
                        <Text style={{ fontSize: 20, color: '#fff' }}>Chỉnh sửa</Text>
                    </TouchableOpacity>
                </View>
                <View style={{ backgroundColor: colors.background}}>
                    <TextInput
                        style={{ marginLeft: 10, fontSize: 18, backgroundColor: '#fff', borderWidth: 1, borderColor: '#e6e6e6', margin: 10 }}
                        placeholder="Nhập tiêu đề bài viết"
                        value={titleSearch}
                        placeholderTextColor={colors.text_of_input}
                        onChangeText={text => setTitleSearch(text)}
                    />

                </View>
                <View style={{ padding: 10 }}>
                    <ScrollView>
                        <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} style={{ flex: 1, minHeight: 200 }}>
                            <Text style={{color: colors.text}}>{contentHTML.html}</Text>
                            <RichEditor
                                ref={richText}
                                editorStyle ={{backgroundColor: colors.background, color:colors.text}}
                                placeholder="Nhập nội dung câu hỏi...."
                                androidHardwareAccelerationDisabled={true}
                                initialContentHTML={contentHTML.html}
                                initialFocus={true}
                                editorInitializedCallback={() => onEditorInitialized()}
                                onChange={descriptionText => {
                                    console.log(data);
                                    data.html = descriptionText;
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

                </View>

                <View style={{ backgroundColor: colors.block, padding: 10 }}>
                    <Text style={{ textDecorationLine: 'underline', color: colors.text }}>Câu hỏi của bạn thuộc chủ để </Text>
                    <View style={{ flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'center', marginTop: 20, marginBottom: 20 }}>
                        {
                            selectedChoose.map((element, key) => {
                                return (
                                    <TouchableOpacity key={key} onPress={() => setChooseSelected(key)} style={{ width: '45%', alignItems: 'center', marginLeft: 5, marginTop: 5, justifyContent: 'center', padding: 10, backgroundColor: key === chooseSelected ? colors.header : colors.background }}>
                                        <Text style={{ color: key === chooseSelected ? '#fff' : colors.text }}>{element}</Text>
                                    </TouchableOpacity>
                                )
                            })
                        }
                    </View>
                </View>

            </View>
        </View>
    )
}

export default EditPost;