import React, { Component, useEffect, useState } from 'react'
import { Text, View, Platform, KeyboardAvoidingView, SafeAreaView, ScrollView, StyleSheet } from "react-native";
import { actions, RichEditor, RichToolbar } from "react-native-pell-rich-editor";
import { useTheme } from 'react-native-paper';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Icon from 'react-native-vector-icons/Ionicons';
import Icons from 'react-native-vector-icons/FontAwesome';
import ImagePicker from 'react-native-image-crop-picker';
import axios from 'axios';

const NewPostScreen = () => {
    const richText = React.useRef();
    const [data, setData] = useState("");
    return (
        <View style={[styles.container]}>
        {/* <Modal
            isVisible={isVisible}
            swipeDirection="down"
            style={{ justifyContent: 'flex-end', margin: 0 }}
            onRequestClose={() => setisVisible(false)}
            deviceWidth={WIDTH}
            deviceHeight={HEIGHT}
        > */}
            <View style={styles.modalContent}>
                <View style={{ flexDirection: 'row', height: 50, backgroundColor: '#009387', justifyContent: 'space-between' }}>
                    <AntDesign name={'close'} size={20} color={'#fff'}
                        onPress={() => setisVisible(false)}
                        style={{ paddingTop: 15, paddingRight: 20, marginLeft: 10 }} />
                    <TouchableOpacity style={{ justifyContent: 'center', marginRight: 20 }} onPress={() => createNewPost()}>
                        <Text style={{ fontSize: 20, color: '#fff' }}>Đăng</Text>
                    </TouchableOpacity>
                </View>
                <View style={{ backgroundColor: '#f2f2f2' }}>
                    <TextInput
                        style={{ marginLeft: 10, fontSize: 18, backgroundColor: '#fff', borderWidth: 1, borderColor: '#e6e6e6', margin: 10 }}
                        placeholder="Nhập tiêu đề bài viết"
                        value={titleSearch}
                        onChangeText={text => setTitleSearch(text)}
                    />

                </View>

                <SafeAreaView style={{ padding: 10 }}>
                    <ScrollView>
                        <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} style={{ flex: 1, minHeight: 200 }}>
                            <Text>Description:</Text>
                            <RichEditor
                                ref={richText}
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

                <View style={{ backgroundColor: '#f2f2f2', padding: 10 }}>
                    <Text style={{ textDecorationLine: 'underline' }}>Câu hỏi của bạn thuộc chủ để </Text>
                    <View style={{ flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'center', marginTop: 20, marginBottom: 20 }}>
                        {
                            selectedChoose.map((element, key) => {
                                return (
                                    <TouchableOpacity key={key} onPress={() => TitleSelected(key)} style={{ width: '45%', alignItems: 'center', marginLeft: 5, marginTop: 5, justifyContent: 'center', padding: 10, backgroundColor: key === chooseSelected ? '#0000cc' : '#fff' }}>
                                        <Text style={{ color: key === chooseSelected ? '#fff' : 'black' }}>{element}</Text>
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

export default NewPostScreen;