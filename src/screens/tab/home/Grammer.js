import React, { useEffect, useState } from 'react'
import { Text, View, Alert, SafeAreaView, Dimensions, Image, TouchableOpacity, StyleSheet, Button, FlatList } from 'react-native'
import CheckBox from '@react-native-community/checkbox';
// import AppText from '../../../components/app-text';
const WIDTH = Dimensions.get('window').width;
import Icon from 'react-native-vector-icons/Ionicons';
import ListGrammer from './ListGrammer';
import CustomHeader from '../../CustomHeader';
import { useSelector, useDispatch } from 'react-redux';
import { getGrammarSuccess, getListGrammarLevel } from '../../../redux/actions/grammar.action';
import axios from 'axios';
import { getListCommentRequest, getListCommentSuccess } from '../../../redux/actions/comment.action';
import Modal from 'react-native-modal'; // 2.4.0
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Entypo from 'react-native-vector-icons/Entypo';
import { ScrollView } from 'react-native-gesture-handler';
import { useTheme } from 'react-native-paper';

export default Grammer = ({ navigation, route }) => {
    const { lession } = route.params;
    const { colors } = useTheme();

    // const dataGrammar = useSelector(state => state.grammarReducer.grammartList);
    const users = useSelector(state => state.userReducer.user);
    const grammarlevel = useSelector(state => state.grammarReducer.grammarlevel);
    const [data, setData] = useState(grammarlevel);
    const [memerize, setmemerize] = useState(false);
    const dispatch = useDispatch();
    const isN5 = useSelector(state => state.wordReducer.isN5);
    const isN4 = useSelector(state => state.wordReducer.isN4);
    const isN3 = useSelector(state => state.wordReducer.isN3);
    const isN2 = useSelector(state => state.wordReducer.isN2);
    const [isVisibleAction, setisVisibleAction] = useState(false);
    const [currentWord, setCurrentWord] = useState({});

    useEffect(() => {
        setData(grammarlevel);
    }, [grammarlevel]);

    const setMemerize = (grammerId, userId, item) => {
       const objIndex = data.findIndex((e => e._id === grammerId));
        if (data[objIndex].memerizes.length === 1) {
            data[objIndex].memerizes = [];
        }
        else if (data[objIndex].memerizes.length === 0) {
            data[objIndex].memerizes.push({ isMem: true });
        }
        setData([...data]);
        dispatch(getListGrammarLevel(data));

        axios.post('https://nameless-spire-67072.herokuapp.com/language/createMemGrammar', {
            "user_id": userId,
            "grammar_id": grammerId
        }, {
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json"
            }
        })
            .then((response) => {
                console.log(response.data.nemGrammar);
            })
            .catch(function (error) {
                throw error;
            })
    }

    const explainGrammar = (item) => {
        dispatch(getListCommentRequest(item._id, users._id));
        navigation.navigate("ExplainScreen", { word: item });
    }
    const deleteKanji = (item) => {
        setCurrentWord(item);
        setisVisibleAction(true);
    }

    const deleteAction = (currentWord) => {
        setisVisibleAction(false);
        Alert.alert(
            "Alert",
            "Are you sure delete " + currentWord.grammar + " ?",
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
                            dispatch(getListGrammarLevel(data));
                            axios.post('https://nameless-spire-67072.herokuapp.com/language/deleteGrammar', {
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

    const renderGrammar = ({ item, index }) => {
        return (
            <View>
                <TouchableOpacity
                    onPress={() => explainGrammar(item)}
                    onLongPress={() => users.role === 1 ? deleteKanji(item) : null}

                >
                    <View style={{ borderBottomWidth: 1, borderBottomColor: '#999999', marginTop: 5, width: WIDTH }}>
                        <View style={{ justifyContent: 'space-between', flexDirection: 'row', marginBottom: 5 }}>
                            <View style={{ flexDirection: 'row' }}>
                                <Text style={[styles.word1, {color: colors.header}]}>{index + 1}/</Text>
                                <Text style={[styles.word, {color: colors.header}]}>{item.grammar.split("=>")[0]}</Text>
                            </View>
                            <View />
                        </View>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                            <View style={{ flexDirection: 'row' }}>
                                <Text style={{ marginLeft: 5, color: colors.text }}>{item.grammar.split("=>")[1]}</Text>
                            </View>
                            <TouchableOpacity onPress={() => setMemerize(item._id, users._id, item)}>
                                <Icon style={[styles.check, { color: item.memerizes.length !== 0 ? 'green' : '#999999' }]} name="checkmark-circle-outline" size={25} />
                            </TouchableOpacity>

                        </View>

                    </View>


                </TouchableOpacity>
            </View>
        )
    }

    const dataaRender = (data) => {
        if (lession === 0) {
            if (memerize === true) {
                return data.filter(e => e.memerizes.length === 1);
            }
            else  {
                return data.filter(e => e.memerizes.length === 0);
            }
        }
        else {
            const data1 = data.filter(e => e.lession === lession);
            if (memerize === true) {
                return data1.filter(e => e.memerizes.length === 1);
            }
            else  {
                return data1.filter(e => e.memerizes.length === 0);
            }
         
        }
    }

    
    return (
        <View style={{ flex: 1 }}>
            <CustomHeader title={lession === 0 ? "Tất cả" : "Bài " + lession} navigation={navigation} />
            {users.role !==1 ?
            <View style={{ flexDirection: 'row', borderBottomWidth: 1, borderBottomColor: colors.header, padding: 10 }}>
                <View style={styles.checkboxContainer}>
                    <CheckBox
                        // style={styles.checkbox}
                        tintColors={{ true: colors.header, false: colors.text }}
                        value={!memerize}
                        onValueChange={() => setmemerize(!memerize)}
                    />
                    {/* <AppText i18nKey={"word"} style={styles.label} /> */}
                    <Text style={[styles.label ,{color: colors.text}]}>chưa nhớ</Text>
                </View>

                <View style={styles.checkboxContainer}>
                    <CheckBox
                        // style={styles.checkbox}
                        tintColors={{ true: colors.header, false: colors.text }}
                        value={memerize}
                        onValueChange={() => setmemerize(!memerize)}
                    />
                    {/* <AppText i18nKey={"hira"} style={styles.label} /> */}
                    <Text style={[styles.label, {color: colors.text}]}>đã nhớ</Text>
                </View>
            </View>
            : 
            <View style={{justifyContent: 'center', alignItems: 'center', padding: 20, borderBottomWidth: 1, borderBottomColor: '#999999'}}>
            <Text style={{fontWeight: 'bold', fontSize: 18, color: colors.text}}>Danh sách ngữ pháp</Text>
        </View>
            }
            <ScrollView>
                <FlatList
                data={dataaRender(data)}
                    // data={memerize === true ? data.filter(e => e.memerizes.length === 1 )&& data.filter(e => e.lession === lession ) :  memerize === false? data.filter(e => e.lession === lession ) &&  data.filter(e => e.memerizes.length === 0)  :  data.filter(e => e.lession === lession )}
                    // data={lession ? data.filter((e) => e.lession === lession && (memerize ? e.memerizes.length === 1 : e.memerizes.length === 0)) : (memerize ? data.filter((e) => e.memerizes.length === 1) : data.filter((e) => e.memerizes.length === 0))}
                    keyExtractor={(item, index) => index.toString()}
                    renderItem={renderGrammar}
                />
                {/* <Text>dskjafkd</Text> */}
            </ScrollView>

            {
                users.role === 1 ?
                    <TouchableOpacity
                        style={{ padding: 10, borderWidth: 1, borderRadius: 30, backgroundColor: colors.header, borderColor: colors.header, top: WIDTH + 80, right: 25, position: 'absolute', zIndex: 1 }}
                        onPress={() => navigation.navigate("NewGrammar", { navigation: navigation, lession: lession, level: isN5 === 'checked' ? 5 : isN4 === 'checked' ? 4 : isN3 === 'checked' ? 3 : 2 })}>

                        <MaterialIcons name={"add-box"} size={30} style={{ color: '#fff' }} />
                    </TouchableOpacity>
                    :
                    <TouchableOpacity
                        style={{ borderWidth: 1, width: 50, borderRadius: 30, backgroundColor: colors.header, borderColor: colors.header, top: WIDTH + 80, right: 25, position: 'absolute', zIndex: 1 }}
                        onPress={() => navigation.navigate("GrammarTest", { navigation: navigation, level: isN5 === 'checked' ? 5 : isN4 === 'checked' ? 4 : isN3 === 'checked' ? 3 : 2  })}>

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
                            onPress={() => { navigation.navigate("EditGrammar", { navigation: navigation, word: currentWord }); setisVisibleAction(false) }}
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
    checkboxContainer: {
        flexDirection: "row",
    },

    label: {
        margin: 8,
        marginLeft: 0
    },
    word1: { marginLeft: 5 },
    word: { marginLeft: 5 },
    star: { marginRight: 10 },
    check: { marginRight: 10 },
});