import React, { useState, useEffect } from 'react'
import { Text, View, SafeAreaView, Dimensions, Image, TouchableOpacity, StyleSheet, Button, FlatList, ScrollView, TextInput } from 'react-native'
import CustomHeader from '../../../CustomHeader'
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import { useDispatch, useSelector } from 'react-redux';
import { getListKanjiSuccess, getListKanjiLevel } from '../../../../redux/actions/kanji.action';

const KanjiLevel = ({ navigation }) => {
    const kanjiList = useSelector(state => state.kanjiReducer.kanjiList);
    const kanjilevel = useSelector(state => state.kanjiReducer.kanjilevel);

    const dispatch = useDispatch();
    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
            let arr3 = kanjiList.map((item, i) => Object.assign({}, item, kanjilevel[i]));
            dispatch(getListKanjiSuccess(arr3));
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
    const kanjiRequestN5 = () => {
        dispatch(getListKanjiLevel(kanjiList.filter((e) => parseInt(e.level, 10) === 5)));
        navigation.navigate("KanjiScreen", {navigation: navigation, lession: 0 });// lưu số bài 
    }
    const kanjiRequestN4 = () => {
        dispatch(getListKanjiLevel(wordList.filter((e) => parseInt(e.level, 10) === 4)));
        navigation.navigate("KanjiScreen", {navigation: navigation, lession: 0 });// lưu số bài 
    }
    const kanjiRequestN3 = () => {
        dispatch(getListKanjiLevel(wordList.filter((e) => parseInt(e.level, 10) === 3)));
        navigation.navigate("KanjiScreen", {navigation: navigation, lession: 0 });// lưu số bài 
    }
    const kanjiRequestN2 = () => {
        dispatch(getListKanjiLevel(wordList.filter((e) => parseInt(e.level, 10) === 2)));
        navigation.navigate("KanjiScreen", {navigation: navigation, lession: 0 });// lưu số bài 
    }
    return (
        <View style={{ flex: 1 }}>
            <CustomHeader title={"kanji N5~N2"} navigation={navigation} />
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <TouchableOpacity 
                onPress={()=> wordRequestN5()}
                style={styles.levelItem}>
                    <Text style={styles.levelItemtext}>N5kk</Text>
                </TouchableOpacity>
                <TouchableOpacity 
                onPress={()=> wordRequestN4()}
                style={[styles.levelItem, { marginTop: 10 }]}>
                    <Text style={styles.levelItemtext}>N4</Text>
                </TouchableOpacity>
                <TouchableOpacity 
                onPress={()=> wordRequestN3()}
                style={[styles.levelItem, { marginTop: 10 }]}>
                    <Text style={styles.levelItemtext}>N3</Text>
                </TouchableOpacity>
                <TouchableOpacity 
                onPress={()=> wordRequestN2()}
                style={[styles.levelItem, { marginTop: 10 }]}>
                    <Text style={styles.levelItemtext}>N2</Text>
                </TouchableOpacity>
            </View>
            <View style={{ backgroundColor: '#009387', width: 60, position: 'absolute', zIndex: 1, bottom: 30, right: 20, borderRadius:40 }}>
                <EvilIcons name={'chart'} size={40} style={{ color: 'white', padding: 10 }} />
            </View>
        </View>
    )
}

export default KanjiLevel;
const styles = StyleSheet.create({
    levelItem: {
        backgroundColor: '#009387', width: '60%', padding: 15, alignItems: 'center', justifyContent: 'center',

    },
    levelItemtext: {
        color: '#fff'
    }
})