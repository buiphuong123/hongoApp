import React, { useEffect, useState } from 'react'
import { Text, View, Image, TextInput, StyleSheet, ScrollView, TouchableOpacity, Dimensions, FlatList } from 'react-native'
import CustomHeader from '../../../CustomHeader';
import Icons from 'react-native-vector-icons/MaterialCommunityIcons';
import Icon from 'react-native-vector-icons/Ionicons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Iconss from 'react-native-vector-icons/Feather';
import Entypo from 'react-native-vector-icons/Entypo';
import Furi from 'react-native-furi';
import { useSelector, useDispatch } from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getListCommentRequest, getListCommentSuccess } from '../../../redux/actions/comment.action';
import io from 'socket.io-client';
import axios from 'axios';
import { Card, Avatar, Button } from 'react-native-paper';
import { socket } from '../../../../App';
const WIDTH = Dimensions.get('window').width;
const HEIGHT = Dimensions.get('window').height;
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { getListVocaSuccess } from '../../../../redux/actions/vocabulary.action';
import Modal from 'react-native-modal'; // 2.4.0
import { cps } from 'redux-saga/effects';
import { element } from 'prop-types';
// import {deleteAction} from './ListWord';
import { useTheme } from 'react-native-paper';

export default EditWord = ({ navigation, route }) => {
    const { colors } = useTheme();

    const [isVisibleImage, setisVisibleImage] = useState(false);
    const { vocabulary } = route.params;
    const commentWordList = useSelector(state => state.commentReducer.commentWordList);
    const vocabularyList = useSelector(state => state.vocabularyReducer.vocabularyList);
    const [dataList, setDataList] = useState(vocabularyList);
    const [name, setName] = useState(vocabulary.word);
    const [translate, setTranslate] = useState(vocabulary.translate);
    const [amhan, setAmHan] = useState(vocabulary.amhan);
    const [kind, setKind] = useState(vocabulary.kind.join());
    const [means, setMeans] = useState(vocabulary.means);
    const users = useSelector(state => state.userReducer.user);
    var last = new Date(); // ngày hiện tại
    useEffect(() => {
        setDataList(vocabularyList);
    }, []);
   
    const fixDigit = (val) => {
        return (val < 10 ? '0' : '') + val;
    }
    const date = new Date();

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
    const splitArray = (originArr) => {
        const arr = originArr.split(', ');
        for (var i = 0; i < arr.length; i++) {
            if (arr[i] === "adj-na") {
                arr[i] = "Tính từ đuôi な";
            }
            else if (arr[i] === "adj-no") {
                arr[i] = "Tính từ sở hữu の";
            }
            else if (arr[i] === "n") {
                arr[i] = "Danh từ";
            }
            else if (arr[i] === "n-suf") {
                arr[i] = "Danh từ làm hậu tố";
            }
            else if (arr[i] === "adv") {
                arr[i] = "Trạng từ";
            }
            else if (arr[i] === "n-adv") {
                arr[i] = "Danh tù làm phó từ";
            }
            else if (arr[i] === "n-t") {
                arr[i] = "Danh từ chỉ thời gian";
            }
            else if (arr[i] === "v5u") {
                arr[i] = "Động từ nhóm 1 -u";
            }
            else if (arr[i] === "v5k") {
                arr[i] = "Động từ nhóm 1 -ku";
            }
            else if (arr[i] === "vi") {
                arr[i] = "Tự động từ";
            }
            else if (arr[i] === "vt") {
                arr[i] = "Tha động từ";
            }
            else if (arr[i] === "v1") {
                arr[i] = "Động từ nhóm 2";
            }
        }
        return arr.toString();
    }

    renderExample = ({ item, index }) => {
        return (
            <View>
                <View style={{ flexDirection: 'row' }}>
                    <Text style={{ marginRight: 10, marginTop: 8 }}>{index + 1}/</Text>
                    <View>
                        <Furi
                            style={{}}
                            value={item.jp}
                            valueStyle={{
                                color: 'black',
                                borderColor: 'black',
                                borderWidth: 0,
                            }}
                            furiStyle={{
                                borderColor: 'red',
                                borderWidth: 0,
                            }}
                            showFuri={true}
                            size={13}
                        />
                    </View>
                </View>
                <Text>{item.vn}</Text>
            </View>
        )
    }


    return (
        <View style={{ flexGrow: 1, flex: 1 }}>
            <CustomHeader title={"Chỉnh sửa" + vocabulary.word} navigation={navigation} />
            <ScrollView>
                <View style={{ marginTop: 20, marginLeft: 15 }}>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                        <TextInput
                            style={{ color: 'red', fontWeight: 'bold', fontSize: 25 }}
                            value={name}
                            onChangeText={text => setName(text)}
                        />
                        {/* <Text style={{ color: 'red', fontWeight: 'bold', fontSize: 25 }}> {vocabulary.word} </Text> */}
                        <View style={{ flexDirection: 'row' }}>
                            <Entypo
                                onPress={() => setisVisibleImage(true)}
                                style={{ marginRight: 20 }}
                                name="image"
                                size={25}
                            />

                        </View>
                    </View>
                    <View style={{ flexDirection: 'row', marginTop: 15 }}>
                        {vocabulary.translate !== undefined ?
                            // <Text>[ {vocabulary.translate} ] </Text>
                            <View style={{ flexDirection: 'row', marginTop: -15 }}>
                                <Text>[</Text>
                                <TextInput
                                    style={{ marginTop: -15 }}
                                    value={translate}
                                    onChangeText={text => setTranslate(text)}
                                />
                                <Text>]</Text>
                            </View>
                            : null}
                        {vocabulary.amhan !== undefined ?
                            <View style={{ flexDirection: 'row', marginTop: -15, marginLeft: 5 }}>
                                <Text>[</Text>
                                <TextInput
                                    style={{ marginTop: -15 }}
                                    value={amhan}
                                    onChangeText={text => setAmHan(text)}
                                />
                                <Text>]</Text>
                            </View>
                            : null}

                    </View>

                    <View style={{ marginTop: 10, flexDirection: 'row', paddingRight: 50, marginRight: 20 }}>
                        {/* {vocabulary.typeWord !== undefined ? */}
                        <AntDesign
                            // onPress={() => sendComment(word._id)}
                            style={{ marginRight: 10 }}
                            name="staro"
                            color={'red'}
                            size={16}
                        />
                        {/* : null} */}
                        <View style={{marginTop: -15}}>
                        <TextInput
                            value={kind}
                            onChangeText={text => setKind(text)}
                        />
                        </View>
                       
                    </View>

                    {
                        vocabulary.means.map((element, key) => {
                            return (
                                <View key={key} style={{ marginTop: 15, flexDirection: 'row' }}>
                                    <Text style={{ fontSize: 20, color: 'blue', marginTop: -10 }}>.</Text>
                                    <Text style={{ color: 'blue', marginLeft: 3 }}>{element}</Text>
                                </View>
                            )
                        })
                    }
                    {/* <View style={{ marginTop: 15, flexDirection: 'row' }}>
                        <Text style={{fontSize: 20, color: 'blue'}}>.</Text>
                        <Text style={{color: 'blue'}}>{vocabulary.vn}</Text>
                    </View> */}

                    <View style={{ marginTop: 15, marginBottom: 10 }}>
                        {/* <Text style={{ color: 'red', fontSize: 18 }}>Ví dụtieengs nhaatj </Text>
                        <Text style={{ fontStyle: 'italic', color: 'gray' }}>nghia</Text> */}
                        <FlatList
                            style={{ padding: 5 }}
                            data={vocabulary.wordexample}
                            keyExtractor={item => item._id}
                            renderItem={renderExample}
                        />
                    </View>
                </View>

            </ScrollView>

            {/* image */}
            <View style={styles.container}>
                <Modal
                    isVisible={isVisibleImage}
                    animationInTiming={1000}
                    animationOutTiming={1000}
                    backdropTransitionInTiming={1000}
                    backdropTransitionOutTiming={1000}
                    deviceWidth={WIDTH}
                >
                    <View style={[styles.modalContent, { marginTop: 50 }]}>
                        <ScrollView>
                            <View>
                                {
                                    vocabulary.images.map((element, key) => {
                                        return (
                                            <View key={key} style={{ borderWidth: 1 }}>
                                                <Image
                                                    style={{ width: '100%', minHeight: 200 }}
                                                    source={{
                                                        uri: element,
                                                    }}
                                                />
                                            </View>
                                        )
                                    })
                                }
                            </View>
                        </ScrollView>

                        <TouchableOpacity onPress={() => setisVisibleImage(false)}>
                            <View style={styles.button}>
                                <Text>Close</Text>
                            </View>
                        </TouchableOpacity>
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
    modalContentadd: {
        flex: 1,
        backgroundColor: 'white',
        borderRadius: 4,
        borderColor: 'rgba(0, 0, 0, 0.1)',
    },
    stylebutton: { flexDirection: 'row', justifyContent: 'space-around', flex: 4, marginTop: 20 },
    keepStyle: { height: 40, width: 100, alignItems: 'center', justifyContent: 'center', borderRadius: 5 },

});
