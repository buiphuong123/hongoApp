import React, { Component, useEffect, useState } from 'react'
import { Text, View, SafeAreaView, TouchableOpacity, Alert, StyleSheet, Dimensions, TextInput } from 'react-native'
import { useDispatch, useSelector } from 'react-redux';
import { useTheme } from 'react-native-paper';
import Icons from 'react-native-vector-icons/AntDesign';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Icon from 'react-native-vector-icons/Ionicons';
import Iconss from 'react-native-vector-icons/MaterialCommunityIcons';
import { element } from 'prop-types';
import { Card, Avatar, Button } from 'react-native-paper';
import Modal from 'react-native-modal'; // 2.4.0
import { getListVocaSuccess } from '../../../redux/actions/vocabulary.action';
import axios from 'axios';

const WIDTH = Dimensions.get('window').width;

const MoveVocabulary = ({ navigation, route }) => {
    const { colors } = useTheme();

    const users = useSelector(state => state.userReducer.user);
    const colorBack = ["#0000b3", "#005ce6", "#ff9900", "#00b300", "#e67300"];
    const vocabulary = useSelector(state => state.vocabularyReducer.vocabularyList);
    const date = new Date();
    const [dataList, setDataList] = useState([]);
    const { dataword, word } = route.params;
    const fixDigit = (val) => {
        return (val < 10 ? '0' : '') + val;
    }
    useEffect(() => {
        setDataList(vocabulary);
    }, []);
    const choosemove = (element) => {
        const objectIndex = word.data.findIndex(e => e.word === dataword.word);
        if (objectIndex === -1) {

        }
        else {
            word.data.splice(objectIndex, 1);
            const index = dataList.findIndex(e => e.name === element.name);
            if (index !== -1) {
                dataList[index].data.push(dataword);
                setDataList([...dataList]);
                getListVocaSuccess([... dataList]);
            }
            axios.post('https://nameless-spire-67072.herokuapp.com/language/deleteWordInVoca', {
                "id": word._id,
                "word": dataword.word
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



            axios.post('https://nameless-spire-67072.herokuapp.com/language/create', {
                "id": element._id,
                "worddata": dataword
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
        navigation.navigate("VocabularyScreen", {navigation: navigation});
    }
    return (
        <View style={{ flex: 1 }}>
            <View style={{ flexDirection: 'row', height: 50, backgroundColor: '#009387', justifyContent: 'space-evenly' }}>
                <View style={{ flex: 1, justifyContent: 'center' }}>
                    <Icons name={'close'} size={29}
                        onPress={() => navigation.goBack()}
                        style={{ color: colors.text, marginLeft: 5 }} />
                </View>
                <View style={{ flex: 1.5, justifyContent: 'center' }}>
                    <Text style={{ textAlign: 'center', color: colors.text, fontSize: 18 }}>Di chuyển "{dataword.word}" đến: </Text>
                </View>
                <View style={{ flexDirection: 'row', marginRight: 20 }}>

                    <TouchableOpacity style={{ justifyContent: 'center', marginLeft: 20 }} onPress={() => setisVisibleAdd(true)}>
                        <MaterialIcons name={"add-box"} size={29} style={{ color: '#fff' }} />
                    </TouchableOpacity>
                </View>
            </View>
            <View>
                {
                    vocabulary.length === 0 ?
                        <View style={{ padding: 20 }}>
                            <Text>Gợi ý </Text>
                            <Text>- Nhấn nút dấu "+" góc trên bên phải để thêm nhóm từ mới.</Text>
                            <Text>- Bên cạnh nhóm từ có nút đẻ sửa xóa nhóm từ
                            </Text>
                        </View>
                        :
                        <View>
                            {
                                dataList.map((element, key) => {
                                    return (
                                        <TouchableOpacity key={key} onPress={() => choosemove(element)}>
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

                                                                <Text style={{ fontSize: 20 }}>{element.name}</Text>
                                                                <Text>{element.data.length} items</Text>
                                                            </View>
                                                        </View>
                                                        <View style={{ flexDirection: 'row', justifyContent: 'flex-end' }}>
                                                            <TouchableOpacity onPress={() => editVocaAction(element)}>
                                                                <Icons name={'edit'} size={20} style={{ color: 'black' }} />
                                                            </TouchableOpacity>
                                                            <TouchableOpacity style={{ marginLeft: 10 }} onPress={() => deleteVocu(element)}>
                                                                <Iconss name={'delete-outline'} size={20} style={{ color: 'red' }} />
                                                            </TouchableOpacity>
                                                        </View>
                                                    </View>
                                                    <View style={{ flexDirection: 'row', justifyContent: 'flex-end' }}>
                                                        <Text>{new Date(element.date).getFullYear() + '/' + fixDigit(new Date(element.date).getMonth()) + '/' + fixDigit(new Date(element.date).getDate())}</Text>
                                                    </View>
                                                </Card.Content>
                                            </Card>
                                        </TouchableOpacity>
                                    )
                                })
                            }
                        </View>
                }
            </View>



        </View>
    )
}
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
        backgroundColor: 'white',
        borderRadius: 4,
        borderColor: 'rgba(0, 0, 0, 0.1)',
    },
    //   bottomModal: {
    //     justifyContent: 'flex-end',
    //     margin: 0,
    //   },
    text: {
        fontSize: 24,
        marginBottom: 30,
        padding: 40,
    },
    stylebutton: { flexDirection: 'row', justifyContent: 'space-around', flex: 4, marginTop: 20 },
    keepStyle: { height: 40, width: 100, alignItems: 'center', justifyContent: 'center', borderRadius: 5 },

});

export default MoveVocabulary;