import React, { useEffect, useState } from 'react'
import { Text, Alert, View, StyleSheet, TouchableOpacity, Dimensions, FlatList } from 'react-native'
import { useSelector, useDispatch } from 'react-redux';
import WordInfo from './WordInfo';
const { width: WIDTH } = Dimensions.get('window');
import Icon from 'react-native-vector-icons/Ionicons';
import { getListWordSuccess, getListWordLevel } from '../../../../redux/actions/word.action';
import axios from 'axios';
import { Center, useScreenReaderEnabled } from 'native-base';
import { getListWordCommentRequest } from '../../../../redux/actions/comment.action';
import Entypo from 'react-native-vector-icons/Entypo';
import Modal from 'react-native-modal'; // 2.4.0
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { testData } from '../../../../../../apiLanguage/src/controllers/word.controller';
import { useTheme } from 'react-native-paper';

export default ListWord = ({ navigation, lession, datass }) => {
    const { colors } = useTheme();

    const wordlevel = useSelector(state => state.wordReducer.wordlevel);
    const isReverse = useSelector(state => state.wordReducer.isReverse);
    const isMemerize = useSelector(state => state.wordReducer.isMemerize);
    const isNotMemerize = useSelector(state => state.wordReducer.isNotMemerize);
    const isLike = useSelector(state => state.wordReducer.isLike);
    const isWord = useSelector(state => state.wordReducer.isWord);
    const isHira = useSelector(state => state.wordReducer.isHira);
    const isKanji = useSelector(state => state.wordReducer.isKanji);
    const isMean = useSelector(state => state.wordReducer.isMean);
    const isAll = useSelector(state => state.wordReducer.isAll);
    const isN5 = useSelector(state => state.wordReducer.isN5);
    const isN4 = useSelector(state => state.wordReducer.isN4);
    const isN3 = useSelector(state => state.wordReducer.isN3);
    const isN2 = useSelector(state => state.wordReducer.isN2);
    const [data, setData] = useState(datass);
    const users = useSelector(state => state.userReducer.user);
    const dispatch = useDispatch();
    const [currentWord, setCurrentWord] = useState({});
    const [isVisibleAction, setisVisibleAction] = useState(false);
    const [isVisibleDelete, setisVisibleDelete] = useState(false);
    // const {lession} = route.params;
    useEffect(() => {
        setData(datass);
    }, [datass]);
    // useEffect(() => {
    //     console.log(datass);
    //     const unsubscribe = navigation.addListener('focus', () => {
    //         setData(datass);
    //     });

    //     return unsubscribe;
    // }, [navigation]);
    const setMemerize = (userId, wordId) => {
        let objIndex = data.findIndex((e => e._id === wordId));
        if (data[objIndex].memerizes.length === 1) {
            data[objIndex].memerizes = [];
        }
        else if (data[objIndex].memerizes.length === 0) {
            data[objIndex].memerizes.push({ isMemerize: true });
        }
        setData([...data]);
        // dispatch(getListWordSuccess(data));
        dispatch(getListWordLevel(data));

        axios.post('https://nameless-spire-67072.herokuapp.com/language/createMemWord', {
            "userId": userId,
            "wordId": wordId
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

    const setLike = (userId, wordId) => {
        console.log(data.slice(20 * lession - 20, 20 * lession).length);
        let objIndex = data.findIndex((e => e._id === wordId));
        if (data[objIndex].likes.length === 1) {
            data[objIndex].likes = [];
        }
        else if (data[objIndex].likes.length === 0) {
            data[objIndex].likes.push({ isLike: true });
        }
        setData([...data]);
        dispatch(getListWordLevel(data));

        axios.post('https://nameless-spire-67072.herokuapp.com/language/createLikeWord', {
            "userId": userId,
            "wordId": wordId
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

    const wordDetail = (item) => {
        dispatch(getListWordCommentRequest(item._id, users._id));
        // console.log('item cua word la ', item);
        navigation.navigate("WordScreenDetail", { vocabularys: item});
    }
    const deleteWord = (item) => {
        console.log('DELETE NE');
        setCurrentWord(item);
        setisVisibleAction(true);
    }
    const deleteAction = (currentWord) => {
        setisVisibleAction(false);
        Alert.alert(
            "Alert",
            "Are you sure delete " +  currentWord.word + " ?",
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
                            dispatch(getListWordLevel(data));
                            axios.post('https://nameless-spire-67072.herokuapp.com/language/deleteWord', {
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
                onPress={() => wordDetail(item)}
                onLongPress={() => users.role === 1 ? deleteWord(item) : null}
            >
                <View style={{ borderBottomWidth: 1, borderBottomColor: '#999999', marginTop: 5, width: WIDTH }}>
                    <View style={{ justifyContent: 'space-between', flexDirection: 'row', marginBottom: 5 }}>
                        <View style={{ flexDirection: 'row' }}>
                            <Text style={[styles.word1, {color: colors.header}]}>{index + 1}/</Text>
                            {isWord ? <Text style={[styles.word, {color: colors.header}]}>{item.word}</Text> : null}
                            {isHira ? <Text style={[styles.word,{color: colors.header}]}>{item.translate}</Text> : null}
                        </View>
                        <View />
                        {users.role !==1 ?
                        <TouchableOpacity onPress={() => setLike(users._id, item._id)}>
                            {item.likes !== undefined? <Icon style={[styles.star, { color: item.likes.length === 0 ? '#999999' : colors.header }]} name="star-outline" size={25} />: null}
                            {/* <Icon name="star-outline" size={25} /> */}
                        </TouchableOpacity>
                        : null}
                    </View>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                        <View style={{ flexDirection: 'row' }}>
                            {isKanji ? <Text style={{ marginLeft: 5, textTransform: 'uppercase' }}>[{item.amhan == '' ? '' : item.amhan}]</Text> : null}
                            {isMean ? <Text style={{ marginLeft: 5, color: colors.text }}>{item.vn}</Text> : null}
                        </View>
                        {users.role !==1 ?
                        <TouchableOpacity onPress={() => setMemerize(users._id, item._id)}>
                            <Icon style={[styles.check, { color: item.memerizes.length === 0 ? '#999999' : 'green' }]} name="checkmark-circle-outline" size={25} />
                        </TouchableOpacity>
                        : 
                        <View style={{padding: 13}}/>
                        }
                    </View>

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
    const testttte = () => {
        navigation.navigate("NewWord", { navigation: navigation, lession: lession, level: isN5==='checked'? 5:isN4==='checked'? 4: isN3==='checked'?3 : 2 });
    }
    return (
        <View>
            <FlatList
                inverted={isReverse ? true : false}
                // data={lession === 0&&isAll==='checked' ? data : lession !== 0 && isAll === 'unchecked' ? data.filter((e) => e.likes.length !== 2 &&
                //     (isMemerize==='checked' ? e.memerizes.length === 1 : e.memerizes.length === 0) && (isLike==='checked' ? e.likes.length === 1 : data.filter(e => e.lession === lession))) : data.filter((e) => e.likes.length !== 2 && e.lession === lession)}
                // data={lession === 0&&isAll==='checked' ? data :  isAll === 'unchecked' ? data.filter((e) => e.likes.length !== 2 && e.le
                // (isMemerize==='checked' ? e.memerizes.length === 1 : e.memerizes.length === 0) && (isLike==='checked' ? data.filter(e => e.likes.length===1&& e.lession === lession) : data.filter(e => e.lession === lession))) : data.filter((e) => e.likes.length !== 2 && e.lession === lession)}
                data={dataaRender(data)}
                keyExtractor={(item, index) => index.toString()}
                renderItem={renderWord}

            />
            {
                users.role === 1 ?
                    <TouchableOpacity
                        style={{padding: 10, borderWidth: 1,  borderRadius: 30, backgroundColor: colors.header, borderColor: colors.header, top: WIDTH + 40, right: 25, position: 'absolute', zIndex: 1 }}
                    onPress={() => testttte()}>

                        <MaterialIcons name={"add-box"} size={30} style={{ color: '#fff' }} />
                    </TouchableOpacity>
                    :
                    <TouchableOpacity
                        style={{ borderWidth: 1, width: 50, borderRadius: 30, backgroundColor: colors.header, borderColor: colors.header, top: WIDTH + 40, right: 25, position: 'absolute', zIndex: 1 }}
                        onPress={() => navigation.navigate("TestWord", { navigation: navigation, lession: lession })}>

                        <Entypo name={'triangle-right'} size={50} style={{ color: 'white' }} />
                    </TouchableOpacity>
            }
            {/* <TouchableOpacity
                style={{ borderWidth: 1, width: 50, borderRadius: 30, backgroundColor: '#009387', borderColor: '#009387', top: WIDTH + 80, right: 25, position: 'absolute', zIndex: 1 }}
                onPress={() => navigation.navigate("TestWord", { navigation: navigation })}>

                <Entypo name={'triangle-right'} size={50} style={{ color: 'white' }} />
            </TouchableOpacity> */}
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
                            onPress={() => {navigation.navigate("EditWords", {navigation: navigation, vocabulary: currentWord }); setisVisibleAction(false)}}
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
        flex: 1,
    },
    modalContent: {
        borderRadius: 4,
        borderColor: 'rgba(0, 0, 0, 0.1)',
        marginLeft: 10, marginRight: 10,
        // padding: 20
    },
    word1: { marginLeft: 5, color: "blue" },
    word: { marginLeft: 5, color: "blue" },
    star: { marginRight: 10 },
    check: { marginRight: 10 },
});
