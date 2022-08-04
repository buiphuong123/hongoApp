import React, { useState, useEffect } from 'react'
import { Text, View, SafeAreaView, Dimensions, Image, TouchableOpacity, StyleSheet, Button, FlatList, ScrollView, TextInput } from 'react-native'
import CustomHeader from '../../../CustomHeader'
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import { useDispatch, useSelector } from 'react-redux';
import { getListWordLevel, getListWordSuccess } from '../../../../redux/actions/word.action';
import { getListKanjiSuccess, getListKanjiLevel } from '../../../../redux/actions/kanji.action';
import { getListGrammarLevel, getGrammarSuccess } from '../../../../redux/actions/grammar.action';
import Modal from 'react-native-modal'; // 2.4.0
const HEIGHT = Dimensions.get('window').height;
const WIDTH = Dimensions.get('window').width;
import { useTheme } from 'react-native-paper';

const WordLevel = ({ navigation, route }) => {
    const { colors } = useTheme();

    const { type } = route.params;
    const wordList = useSelector(state => state.wordReducer.wordList);
    const wordlevel = useSelector(state => state.wordReducer.wordlevel);
    const kanjiList = useSelector(state => state.kanjiReducer.kanjiList);
    const kanjilevel = useSelector(state => state.kanjiReducer.kanjilevel);
    const grammarList = useSelector(state => state.grammarReducer.grammarList);
    const grammarlevel = useSelector(state => state.grammarReducer.grammarlevel);
    const [isVisible, setisVisible] = useState(false);

    const dispatch = useDispatch();
    useEffect(() => {
        console.log('vao focus');
        const unsubscribe = navigation.addListener('focus', () => {
            if (type === "Từ vựng") {
                let arr3 = wordList.map((item, i) => Object.assign({}, item, wordlevel[i]));
                dispatch(getListWordSuccess(arr3));
            }
            else if (type === "Ngữ pháp") {
                let arr3 = grammarList.map((item, i) => Object.assign({}, item, grammarlevel[i]));
                dispatch(getGrammarSuccess(arr3));
            }
            else {
                let arr3 = kanjiList.map((item, i) => Object.assign({}, item, kanjilevel[i]));
                dispatch(getListKanjiSuccess(arr3));
            }

        });

        return unsubscribe;
    }, [navigation]);
    // useEffect(() => {
    //     const unsubscribe = navigation.addListener('focus', () => {
    //         console.log('BEN WORDLEVEL DAY NHE');
    //         console.log(wordList.filter(e=>e.level===5&& e.memerizes.length===1).length);
    //     });

    //     return unsubscribe;
    // }, [navigation]);
    const wordRequestN5 = () => {
        dispatch(getListWordLevel(wordList.filter((e) => parseInt(e.level, 10) === 5)));
        navigation.navigate("WordScreen", { navigation: navigation, lession: 0 });// lưu số bài 
    }
    const wordRequestN4 = () => {
        dispatch(getListWordLevel(wordList.filter((e) => parseInt(e.level, 10) === 4)));
        navigation.navigate("WordScreen", { lession: 0 });// lưu số bài 
    }
    const wordRequestN3 = () => {
        dispatch(getListWordLevel(wordList.filter((e) => parseInt(e.level, 10) === 3)));
        navigation.navigate("WordScreen", { lession: 0 });// lưu số bài 
    }
    const wordRequestN2 = () => {
        dispatch(getListWordLevel(wordList.filter((e) => parseInt(e.level, 10) === 2)));
        navigation.navigate("WordScreen", { lession: 0 });// lưu số bài 
    }

    const kanjiRequestN5 = () => {
        dispatch(getListKanjiLevel(kanjiList.filter((e) => parseInt(e.level, 10) === 5)));
        navigation.navigate("KanjiScreen", { navigation: navigation, lession: 0 });// lưu số bài 
    }
    const kanjiRequestN4 = () => {
        dispatch(getListKanjiLevel(kanjiList.filter((e) => parseInt(e.level, 10) === 4)));
        navigation.navigate("KanjiScreen", { navigation: navigation, lession: 0 });// lưu số bài 
    }
    const kanjiRequestN3 = () => {
        dispatch(getListKanjiLevel(kanjiList.filter((e) => parseInt(e.level, 10) === 3)));
        navigation.navigate("KanjiScreen", { navigation: navigation, lession: 0 });// lưu số bài 
    }
    const kanjiRequestN2 = () => {
        dispatch(getListKanjiLevel(kanjiList.filter((e) => parseInt(e.level, 10) === 2)));
        navigation.navigate("KanjiScreen", { navigation: navigation, lession: 0 });// lưu số bài 
    }


    const grammarRequestN5 = () => {
        dispatch(getListGrammarLevel(grammarList.filter((e) => parseInt(e.level, 10) === 5)));
        navigation.navigate("GrammarScr", { navigation: navigation, lession: 0 });
    }
    const grammarRequestN4 = () => {
        dispatch(getListKanjiLevel(grammarList.filter((e) => parseInt(e.level, 10) === 4)));
        navigation.navigate("GrammarScr", { navigation: navigation, lession: 0 });
    }
    const grammarRequestN3 = () => {
        dispatch(getListKanjiLevel(grammarList.filter((e) => parseInt(e.level, 10) === 3)));
        navigation.navigate("GrammarScr", { navigation: navigation, lession: 0 });
    }
    const grammarRequestN2 = () => {
        dispatch(getListKanjiLevel(grammarList.filter((e) => parseInt(e.level, 10) === 2)));
        navigation.navigate("GrammarScr", { navigation: navigation, lession: 0 });
    }
    return (
        <View style={{ flex: 1 }}>
            <CustomHeader title={type + " N5~N2"} navigation={navigation} />
            <View style={{ flex: 1, justifyContent: 'center' }}>
                <View style={{ justifyContent: 'center' }} >
                    <View style={{ alignItems: 'center' }}>
                        <TouchableOpacity
                            onPress={() => type === "Từ vựng" ? wordRequestN5() : type === "Ngữ pháp" ? grammarRequestN5() : kanjiRequestN5()}
                            style={[styles.levelItem, {backgroundColor: colors.header}]}>
                            <Text style={styles.levelItemtext}>N5</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={() => type === "Từ vựng" ? wordRequestN4() : type === "Ngữ pháp" ? grammarRequestN4() : kanjiRequestN4()}
                            style={[styles.levelItem, { marginTop: 10, backgroundColor: colors.header }]}>
                            <Text style={styles.levelItemtext}>N4</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={() => type === "Từ vựng" ? wordRequestN3() : type === "Ngữ pháp" ? grammarRequestN3() : kanjiRequestN3()}
                            style={[styles.levelItem, { marginTop: 10, backgroundColor: colors.header }]}>
                            <Text style={styles.levelItemtext}>N3</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={() => type === "Từ vựng" ? wordRequestN2() : type === "Ngữ pháp" ? grammarRequestN2() : kanjiRequestN2()}
                            style={[styles.levelItem, { marginTop: 10, backgroundColor: colors.header }]}>
                            <Text style={styles.levelItemtext}>N2</Text>
                        </TouchableOpacity>
                    </View>

                </View>
                <TouchableOpacity
                    onPress={() => setisVisible(true)}
                    style={{ backgroundColor: colors.header, width: 60, position: 'absolute', zIndex: 1, bottom: 30, right: 20, borderRadius: 40 }}>
                    <EvilIcons name={'chart'} size={40} style={{ color: 'white', padding: 10 }} />
                </TouchableOpacity>
            </View>

            <View style={[styles.container]}>
                <Modal
                    isVisible={isVisible}
                    animationInTiming={1000}
                    animationOutTiming={1000}
                    backdropTransitionInTiming={1000}
                    backdropTransitionOutTiming={1000}
                    deviceWidth={WIDTH}
                >
                    <View style={{backgroundColor: colors.background}}>
                        <View style={{ padding: 10 }}>
                            <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                                <Text style={{ fontSize: 18, color: colors.header }}>Thống kê {type} đã nhớ</Text>
                            </View>
                            <View style={{ paddingTop: 20, paddingLeft: 10 }}>
                                <Text style={{color: colors.text}}>N5 đã nhớ</Text>
                                <View style={{ flexDirection: 'row' }}>
                                    {
                                        type === "Từ vựng" ?
                                            <Text style={{color: colors.text}}>{Math.floor((wordList.filter(e => e.memerizes.length === 1 && e.level === 5).length / wordList.length) * 100)}%</Text>
                                            :
                                            type === "Ngữ pháp" ?
                                                <Text style={{color: colors.text}}>{Math.floor((grammarList.filter(e => e.memerizes.length === 1 && e.level === 5).length / grammarList.length) * 100)}%</Text>
                                                :
                                                <Text style={{color: colors.text}}>{Math.floor((kanjiList.filter(e => e.memerizes.length === 1 && e.level === 5).length / kanjiList.length) * 100)}%</Text>

                                    }
                                    <View style={{ borderWidth: 1, borderColor: '#cccccc', width: '80%', height: 1, marginTop: 10, marginLeft: 5 }}></View>
                                </View>
                            </View>
                            <View style={{ paddingTop: 20, paddingLeft: 10 }}>
                                <Text style={{color: colors.text}}>N4 đã nhớ</Text>
                                <View style={{ flexDirection: 'row' }}>
                                {
                                        type === "Từ vựng" ?
                                            <Text style={{color: colors.text}}>{Math.floor((wordList.filter(e => e.memerizes.length === 1 && e.level === 4).length / wordList.length) * 100)}%</Text>
                                            :
                                            type === "Ngữ pháp" ?
                                                <Text style={{color: colors.text}}>{Math.floor((grammarList.filter(e => e.memerizes.length === 1 && e.level === 4).length / grammarList.length) * 100)}%</Text>
                                                :
                                                <Text style={{color: colors.text}}>{Math.floor((kanjiList.filter(e => e.memerizes.length === 1 && e.level === 4).length / kanjiList.length) * 100)}%</Text>

                                    }
                                    <View style={{ borderWidth: 1, borderColor: '#cccccc', width: '80%', height: 1, marginTop: 10, marginLeft: 5 }}></View>
                                </View>
                            </View>
                            <View style={{ paddingTop: 20, paddingLeft: 10 }}>
                                <Text style={{color: colors.text}}>N3 đã nhớ</Text>
                                <View style={{ flexDirection: 'row' }}>
                                {
                                        type === "Từ vựng" ?
                                            <Text style={{color: colors.text}}>{Math.floor((wordList.filter(e => e.memerizes.length === 1 && e.level === 3).length / wordList.length) * 100)}%</Text>
                                            :
                                            type === "Ngữ pháp" ?
                                                <Text style={{color: colors.text}}>{Math.floor((grammarList.filter(e => e.memerizes.length === 1 && e.level === 3).length / grammarList.length) * 100)}%</Text>
                                                :
                                                <Text style={{color: colors.text}}>{Math.floor((kanjiList.filter(e => e.memerizes.length === 1 && e.level === 3).length / kanjiList.length) * 100)}%</Text>

                                    }
                                    <View style={{ borderWidth: 1, borderColor: '#cccccc', width: '80%', height: 1, marginTop: 10, marginLeft: 5 }}></View>
                                </View>
                            </View>
                            <View style={{ paddingTop: 20, paddingLeft: 10 }}>
                                <Text style={{color: colors.text}}>N2 đã nhớ</Text>
                                <View style={{ flexDirection: 'row' }}>
                                {
                                        type === "Từ vựng" ?
                                            <Text style={{color: colors.text}}>{Math.floor((wordList.filter(e => e.memerizes.length === 1 && e.level === 2).length / wordList.length) * 100)}%</Text>
                                            :
                                            type === "Ngữ pháp" ?
                                                <Text style={{color: colors.text}}>{Math.floor((grammarList.filter(e => e.memerizes.length === 1 && e.level === 2).length / grammarList.length) * 100)}%</Text>
                                                :
                                                <Text style={{color: colors.text}}>{Math.floor((kanjiList.filter(e => e.memerizes.length === 1 && e.level === 2).length / kanjiList.length) * 100)}%</Text>

                                    }
                                    <View style={{ borderWidth: 1, borderColor: '#cccccc', width: '80%', height: 1, marginTop: 10, marginLeft: 5 }}></View>
                                </View>
                            </View>
                            <TouchableOpacity
                                onPress={() => setisVisible(false)}
                                style={{ width: '30%', alignSelf: 'center', alignItems: 'center', justifyContent: 'center', backgroundColor: colors.header, padding: 10, marginTop: 20, marginBottom: 10 }}>
                                <Text style={{ justifyContent: 'center', alignItems: 'center', color: '#fff' }}>Đóng</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </Modal>
            </View>
        </View>

    )
}

export default WordLevel;
const styles = StyleSheet.create({
    container: {
        // height: HEIGHT
    },
    modalContent: {
       
        // height: HEIGHT
    },
    levelItem: {
         width: '60%', padding: 15, alignItems: 'center', justifyContent: 'center',

    },
    levelItemtext: {
        color: '#fff'
    }
})