import React, { useEffect, useState } from 'react'
import { Text, Image, Alert, View, StyleSheet, TouchableOpacity, Dimensions, FlatList } from 'react-native'
import { useSelector, useDispatch } from 'react-redux';
const { width: WIDTH } = Dimensions.get('window');
import Icon from 'react-native-vector-icons/Ionicons';
import { getListKanjiLevel, getListKanjiSuccess } from '../../../../redux/actions/kanji.action';
import axios from 'axios';
import Entypo from 'react-native-vector-icons/Entypo';
import { getListKanjiCommentRequest } from '../../../../redux/actions/comment.action';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Modal from 'react-native-modal'; // 2.4.0
import { useTheme } from 'react-native-paper';

export default ListKanjiScreen = ({ navigation, lession, datass }) => {
    const { colors } = useTheme();
    const kanjilevel = useSelector(state => state.kanjiReducer.kanjilevel);
    const isAll = useSelector(state => state.kanjiReducer.isAll);
    const isMemerize = useSelector(state => state.kanjiReducer.isMemerize);
    const isNotMemerize = useSelector(state => state.kanjiReducer.isNotMemerize);
    const isLike = useSelector(state => state.kanjiReducer.isLike);
    const [data, setData] = useState(datass);
    const users = useSelector(state => state.userReducer.user);
    const dispatch = useDispatch();
    const isN5 = useSelector(state => state.wordReducer.isN5);
    const isN4 = useSelector(state => state.wordReducer.isN4);
    const isN3 = useSelector(state => state.wordReducer.isN3);
    const isN2 = useSelector(state => state.wordReducer.isN2);
    const [isVisibleAction, setisVisibleAction] = useState(false);
    const [currentWord, setCurrentWord] = useState({});

    useEffect(() => {
        setData(datass);
    }, [datass]);
    const setMemerize = (userId, kanjiId) => {
        let objIndex = data.findIndex((e => e._id === kanjiId));
        if (data[objIndex].memerizes.length === 1) {
            data[objIndex].memerizes = [];
        }
        else if (data[objIndex].memerizes.length === 0) {
            data[objIndex].memerizes.push({ isMemerize: true });
        }
        setData([...data]);
        dispatch(getListKanjiLevel(data));

        axios.post('https://nameless-spire-67072.herokuapp.com/language/createMemKanji', {
            "userId": userId,
            "kanjiId": kanjiId
        }, {
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json"
            }
        })
            .then((response) => {
                console.log('nemWord', response.data.nemWord);
            })
            .catch(function (error) {
                throw error;
            })
    }

    const setLike = (userId, kanjiId) => {
        let objIndex = data.findIndex((e => e._id === kanjiId));
        if (data[objIndex].likes.length === 1) {
            data[objIndex].likes = [];
        }
        else if (data[objIndex].likes.length === 0) {
            data[objIndex].likes.push({ isLike: true });
        }
        setData([...data]);
        dispatch(getListKanjiLevel(data));

        axios.post('https://nameless-spire-67072.herokuapp.com/language/createLikeKanji', {
            "userId": userId,
            "kanjiId": kanjiId
        }, {
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json"
            }
        })
            .then((response) => {
                console.log('nemWord', response.data.likeWord);
            })
            .catch(function (error) {
                throw error;
            })
    }

    const kanjiDetail = (item) => {
        // console.log('vao kanji detail ne');
        dispatch(getListKanjiCommentRequest(item._id, users._id));
        navigation.navigate("ExplainKanji", { kanjiword: item });
    }

    const deleteKanji = (item) => {
        console.log('vao day mà', isVisibleAction);
        setCurrentWord(item);
        setisVisibleAction(true);
    }
    const deleteAction = (currentWord) => {
        setisVisibleAction(false);
        Alert.alert(
            "Alert",
            "Bạn có chắc chắn muốn xóa " + currentWord.kanji + " ?",
            [
                {
                    text: "Cancel",
                    onPress: () => console.log("Cancel Pressed"),
                    style: "cancel"
                },
                {
                    text: "OK", onPress: () => {
                        const objectIndex = data.findIndex(e => e._id === currentWord._id);
                        if (objectIndex === -1) {

                        }
                        else {
                            data.splice(objectIndex, 1);
                            setData([...data]);
                            dispatch(getListKanjiLevel(data));
                            axios.post('https://nameless-spire-67072.herokuapp.com/language/deleteKanji', {
                                "id": currentWord._id,

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
    const renderWord = ({ item, index }) => {
        return (
            <TouchableOpacity
            key={index}
                onPress={() => kanjiDetail(item)}
                onLongPress={() => users.role === 1 ? deleteKanji(item) : null}

            >

                <View style={{ borderBottomWidth: 1, borderBottomColor: '#999999', marginTop: 0, width: WIDTH }}>
                    <View style={{ justifyContent: 'space-between', flexDirection: 'row', marginBottom: 5, padding: 10 }}>
                        <View style={{ flexDirection: 'row' }}>
                            <View style={{ borderWidth: 1, paddingTop: 10, paddingLeft: 10, paddingRight: 10, paddingBottom: 5, justifyContent: 'center', alignItems: 'center', borderColor: '#999999' }}>
                                <Text style={[styles.textTitle, {color: colors.header}]}>{item.kanji}</Text>
                                <Text style={[styles.textTitle, {color: colors.header}]}>{item.mean}</Text>
                            </View>
                            <View style={{ marginLeft: 10 }}>
                                {/* <Text>  {item.kanji_on}</Text>
                            <Text>  {item.kanji_kun}</Text> */}
                                {

                                    item.kanji_on !== null ?
                                        <View style={{ flexDirection: 'row' }}>
                                            <Text style={[styles.textTitle, {color: colors.header}]}>On</Text>
                                            <Text style={{ marginLeft: 5, color: colors.text }}>{item.kanji_on}</Text>
                                        </View>
                                        :
                                        null
                                }

                                {
                                    item.kanji_kun !== null ?
                                        <View style={{ flexDirection: 'row' }}>
                                            <Text style={[styles.textTitle, {color: colors.header}]}>Kun</Text>
                                            <Text style={{ marginLeft: 5, color: colors.text }}>{item.kanji_kun}</Text>
                                        </View>
                                        :
                                        null
                                }
                            </View>
                        </View>
                        {
                            users.role !==1?
                        
                        <View style={{ flexDirection: 'row' }}>
                            <TouchableOpacity onPress={() => setLike(users._id, item._id)}>
                                <Icon style={[styles.star, { color: item.likes.length === 0 ? '#999999' : colors.header }]} name="star-outline" size={25} />
                                {/* <Icon name="star-outline" size={25} /> */}
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => setMemerize(users._id, item._id)}>
                                <Icon style={[styles.check, { color: item.memerizes.length === 0 ? '#999999' : 'green' }]} name="checkmark-circle-outline" size={25} />
                            </TouchableOpacity>
                        </View>
                        : null}

                    </View>
                    {
                        item.explain !== undefined ?
                            <View style={{ flexDirection: 'row', justifyContent: 'space-around', marginLeft: 10 }}>
                                <View style={{ width: '50%', justifyContent: 'center', marginBottom: 20 }}>
                                    <Text style={{color: colors.text}}>{item.explain}</Text>
                                </View>
                                <View style={{ width: '50%' }}>
                                    <Image
                                        style={{ width: '40%', height: 40, marginBottom: 10, marginLeft: 20 }}
                                        source={{
                                            uri: item.image,
                                        }}
                                    />
                                </View>
                            </View>
                            : null
                    }

                </View>

            </TouchableOpacity>
        )
    }

    const dataaRender = (data) => {
        if (lession === 0) {
            if (isAll === 'checked') {
                return data;
            }
            else if (isMemerize === 'checked') {
                return data.filter(e => e.memerizes.length === 1);
            }
            else if (isNotMemerize === 'checked') {
                return data.filter(e => e.memerizes.length === 0);
            }
            else if (isLike === 'checked') {
                return data.filter(e => e.likes.length === 1);
            }
        }
        else {
            const data1 = data.filter(e => e.lession === lession);
            if (isAll === 'checked') {
                return data1;
            }
            else if (isMemerize === 'checked') {
                return data1.filter(e => e.memerizes.length === 1);
            }
            else if (isNotMemerize === 'checked') {
                return data1.filter(e => e.memerizes.length === 0);
            }
            else if (isLike === 'checked') {
                return data1.filter(e => e.likes.length === 1);
            }
        }
    }
    return (
        <View>
            <FlatList
                // data={data.filter(e => e.lession === lession)}
                // data={isMemerize === 'checked' ? data.filter(e => e.memerizes.length === 1 && e.lession === lession) : data.filter(e => e.lession === lession) && isLike === 'checked' ? data.filter(e => e.likes.length === 1 && e.lession === lession) : data.filter(e => e.lession === lession) && isNotMemerize === 'checked' ? data.filter(e => e.memerizes.length === 0 && e.lession === lession) : data.filter(e => e.lession === lession)}
                data={dataaRender(data)}
                keyExtractor={(item, index) => index.toString()}
                renderItem={renderWord}

            />
            {/* <TouchableOpacity
                style={{ borderWidth: 1, width: 50, borderRadius: 30, backgroundColor: colors.header, borderColor: '#009387', top: WIDTH + 80, right: 25, position: 'absolute', zIndex: 1 }}
                onPress={() => navigation.navigate("TestKanji", { navigation: navigation, lession: lession })}>
                <Entypo name={'triangle-right'} size={50} style={{ color: 'white' }} />
            </TouchableOpacity> */}
            {
                users.role === 1 ?
                    <TouchableOpacity
                        style={{ padding: 10, borderWidth: 1, borderRadius: 30, backgroundColor: colors.header, borderColor: colors.header, top: WIDTH + 40, right: 25, position: 'absolute', zIndex: 1 }}
                        onPress={() => navigation.navigate("NewKanji", { navigation: navigation, lession: lession, level: isN5 === 'checked' ? 5 : isN4 === 'checked' ? 4 : isN3 === 'checked' ? 3 : 2 })}>

                        <MaterialIcons name={"add-box"} size={30} style={{ color: '#fff' }} />
                    </TouchableOpacity>
                    :
                    <TouchableOpacity
                        style={{ borderWidth: 1, width: 50, borderRadius: 30, backgroundColor: colors.header, borderColor: colors.header, top: WIDTH + 40, right: 25, position: 'absolute', zIndex: 1 }}
                        onPress={() => navigation.navigate("TestKanji", { navigation: navigation, lession: lession })}>

                        <Entypo name={'triangle-right'} size={50} style={{ color: 'white' }} />
                    </TouchableOpacity>
            }

            <View style={styles.container}>
                <Modal
                    isVisible={isVisibleAction}
                    swipeDirection="down"
                    style={{ justifyContent: 'flex-end', margin: 0, }}
                    onRequestClose={() => setisVisibleShare(false)}
                    deviceWidth={WIDTH}
                >
                    <View style={[styles.modalContent, {backgroundColor: colors.background}]}>
                        <TouchableOpacity
                            onPress={() => deleteAction(currentWord)}
                            style={{ borderBottomWidth: 1, padding: 10, justifyContent: 'center', alignItems: 'center', borderBottomColor: '#e6e6e6' }}>
                            <Text style={{ color: 'red' }}>Xóa</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={() => { navigation.navigate("EditKanji", { navigation: navigation, kanjiword: currentWord }); setisVisibleAction(false) }}
                            style={{ borderBottomWidth: 1, padding: 10, justifyContent: 'center', alignItems: 'center', borderBottomColor: '#e6e6e6' }}>
                            <Text style={{ color: colors.header }}>Chỉnh sửa</Text>
                        </TouchableOpacity>

                    </View>
                    <TouchableOpacity
                        onPress={() => setisVisibleAction(false)}
                        style={{ backgroundColor: colors.background, marginTop: 10, marginLeft: 10, marginRight: 10, marginBottom: 10, padding: 10, alignItems: 'center', justifyContent: 'center' }}
                    >
                        <Text style={{ color: colors.header }}>Huỷ</Text>
                    </TouchableOpacity>

                </Modal>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        width: WIDTH,
    },
    modalContent: {
        borderRadius: 4,
        borderColor: 'rgba(0, 0, 0, 0.1)',
        marginLeft: 10, marginRight: 10,
        // padding: 20
    },
    word1: { marginLeft: 5 },
    word: { marginLeft: 5, },
    star: { marginRight: 10 },
    check: { marginRight: 10 },
    textTitle: {
        fontWeight: 'bold'
    }
});
