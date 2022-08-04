import { Center, useScreenReaderEnabled } from 'native-base';
import React, { useState, useEffect, useReducer } from 'react'
import { Text, View, SafeAreaView, Dimensions, Image, TouchableOpacity, StyleSheet, Button, FlatList, ScrollView, TextInput } from 'react-native'
import { useSelector, useDispatch } from 'react-redux';
import { actionChannel } from 'redux-saga/effects';
import SearchWord from './SearchWord';
import CustomHeader from '../../../CustomHeader';
import Entypo from 'react-native-vector-icons/EvilIcons';
const WIDTH = Dimensions.get('window').width;
import Modal from 'react-native-modal'; // 2.4.0
import { getListWordSuccess } from '../../../../redux/actions/word.action';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { useTheme } from 'react-native-paper';
import { getListWordCommentRequest } from '../../../../redux/actions/comment.action';
import { textContent } from 'domutils';
const HEIGHT = Dimensions.get('window').height;

export default WordLession = ({ navigation }) => {
    const { colors } = useTheme();
    const [dataSource, setDataSource] = useState(['tất cả'])
    const users = useSelector(state => state.userReducer.user);
    const [searching, setSearching] = useState(false)
    const [isVisible, setisVisible] = useState(false);
    const wordList = useSelector(state => state.wordReducer.wordList);
    const wordlevel = useSelector(state => state.wordReducer.wordlevel);
    const [searchName, setSearchName] = useState("");
    const [filtered, setFiltered] = useState(wordList)
    const dispatch = useDispatch();
    const onSearch = (text) => {
        setSearchName(text);
        if (text) {
            const tempList = [];
            setSearching(true)
            // const temp = text.toLowerCase()
            console.log(text);
             wordList.filter(item => {
                // if (item.vn.match(text)) {
                //     return item
                // }
                 // console.log(item.translate.includes(text));
                if(item.word.includes(text) === true) {
                    console.log('RA ITEM DAY NHE ',item);
                    // return item;
                    tempList.push(item);
                }
            })
            console.log(tempList);
            setFiltered(tempList)
        }
        else {
            setSearching(false)
            setFiltered(wordList)
        }

    }
    useEffect(() => {
        setSearching(false);
        // console.log(wordlevel);
        // console.log(wordlevel.filter(w => !w.lesson).map(w => w.lession))
        const max = Math.max(...wordlevel.map(w => w.lession ?? 1));
        console.log(max);
        for (var i = 1; i <= max; i++) {
            dataSource.push("bài " + i);

        }
        setDataSource([...dataSource]);
    }, []);

    useEffect(() => {
        console.log('vao focus');
        const unsubscribe = navigation.addListener('focus', () => {
            setSearching(false);
            let arr3 = wordList.map((item, i) => Object.assign({}, item, wordlevel[i]));
            dispatch(getListWordSuccess(arr3));
        });

        return unsubscribe;
    }, [navigation]);
    // const isKanji =(ch) =>{
    //     return (ch >= "\u4e00" && ch <= "\u9faf") ||
    //     (ch >= "\u3400" && ch <= "\u4dbf");
    // }
    // const isHira =(ch) =>{
    //     return (ch >= "\u3040" && ch <= "\309f");
    // }
    // const isKata =(ch) =>{
    //     return (ch >= "\30a0" && ch <= "\30ff");
    // }
    const renderLession = ({ item, index }) => {
        console.log(index);
        return (
            <View style={{ backgroundColor: colors.background, padding: 10 }}>
                <Text style={{ color: colors.text }}>{item} Đã nhớ</Text>
                <View style={{ flexDirection: 'row' }}>
                    <View>
                        {
                            index === 0 ?
                                <Text style={{ color: colors.text }}>{Math.floor((wordlevel.filter(e => e.memerizes.length === 1).length / wordlevel.length) * 100)}%</Text>
                                :
                                <Text style={{ color: colors.text }}>{Math.floor((wordlevel.filter(e => e.memerizes.length === 1 && e.lession === index).length / wordlevel.filter(e => e.lession === index).length) * 100)}%</Text>


                        }
                    </View>

                    <View style={{ color: colors.text, borderWidth: 1, borderColor: '#cccccc', width: '80%', height: 1, marginTop: 10, marginLeft: 5 }}></View>
                </View>
            </View>
        )
    }

    const PressLession = (index) => {
        console.log('gia tri index la ', index);
        navigation.navigate("WordScreen", { navigation: navigation, lession: index, type: 0});// lưu số bài 
    }
    return (
        <View style={styles.container}>
            <CustomHeader title={"Từ vựng"} navigation={navigation} />
            <View style={{ justifyContent: 'center', alignItems: 'center', height: 60, backgroundColor: colors.header, }}>
                <TextInput
                    style={[styles.textInput, { backgroundColor: '#fff' }]}
                    placeholder="Tìm kiếm một từ mới "
                    placeholderTextColor='#cccccc'
                    value={searchName}
                    onChangeText={(text) => onSearch(text)}

                />
            </View>
            <ScrollView style={{ flex: 1, }}>
                <View style={{
                    flexWrap: 'wrap', flexDirection: 'row',
                    // justifyContent: 'center'
                }}>

                    {
                        dataSource.map((item, index) => {
                            return (
                                <TouchableOpacity style={{
                                    margin: 10,
                                    // justifyContent: 'center',
                                    // alignItems: 'center',
                                    // height: 50,
                                    backgroundColor: '#fff',
                                    borderWidth: 1,
                                    borderColor: colors.header,
                                    borderRadius: 15,
                                    padding: 10,
                                    justifyContent: 'center',
                                    //  margin: 10,
                                    alignSelf: 'center',
                                    alignItems: 'center',
                                    alignContent: 'center',
                                    // paddingLeft: 11,
                                    // paddingRight: 11,
                                    width: WIDTH / 4 - 20

                                }}
                                    onPress={() => PressLession(index)}
                                >

                                    <Text style={{ fontSize: 17 }}>
                                        {item}
                                    </Text>
                                </TouchableOpacity>
                            )
                        })
                    }
                </View>

            </ScrollView>


            {/* <View style={{paddingTop: 100}}>
                <Modal
                    isVisible={isVisible}
                    animationInTiming={1000}
                    animationOutTiming={1000}
                    backdropTransitionInTiming={1000}
                    backdropTransitionOutTiming={1000}
                    deviceWidth={WIDTH}
                >
                    <View style={styles.modalContent}>
                        <ScrollView>
                            <FlatList
                                style={{ padding: 5 }}
                                data={dataSource}
                                keyExtractor={item => item.id}
                                renderItem={renderLession}
                            />
                           
                        </ScrollView>
                        <TouchableOpacity onPress={() => setisVisible(false)}>
                                <View style={styles.button}>
                                    <Text>Close</Text>
                                </View>
                            </TouchableOpacity>


                    </View>
                </Modal>
            </View> */}

            {
                users.role !==1 ?
            
            <TouchableOpacity
                style={{ borderWidth: 1, borderRadius: 40, backgroundColor: colors.header, borderColor: colors.header, bottom: 30, right: 30, position: 'absolute' }}
                onPress={() => setisVisible(true)}>

                <Entypo name={'chart'} size={40} style={{ color: 'white', padding: 10 }} />

            </TouchableOpacity>
            : null}

            {/* your components can stay here like anything */}
            {/* and at the end of view */}
            {/* <View style={styles.subContainer}> */}
            {
                searching &&
                <ScrollView style={[styles.itemSearch, { backgroundColor: colors.background }]}>
                    {
                        filtered.length !== 0 ?
                            filtered.map((element, key) => {
                                return (
                                    <TouchableOpacity key={key} style={[styles.itemView, { backgroundColor: colors.background }]} onPress={() => {
                                        dispatch(getListWordCommentRequest(element._id, users._id));
                                        ; navigation.navigate("WordScreenDetail", { vocabularys: element })
                                    }}>
                                        <Text style={[styles.itemText, { color: colors.text }]}>{element.word} : {element.vn}</Text>
                                    </TouchableOpacity>
                                )
                            })
                            :
                            <View
                                style={styles.noResultView}>
                                <Text style={styles.noResultText}>No search items matched</Text>
                            </View>
                    }
                </ScrollView>


            }

            <View style={{}}>
                <Modal
                    isVisible={isVisible}
                    animationInTiming={1000}
                    animationOutTiming={1000}
                    backdropTransitionInTiming={1000}
                    backdropTransitionOutTiming={1000}
                    deviceWidth={WIDTH}
                >
                    <View style={[styles.modalContent, { backgroundColor: colors.background }]}>
                        <ScrollView>
                            <FlatList
                                style={{ padding: 5 }}
                                data={dataSource}
                                keyExtractor={item => item.id}
                                renderItem={renderLession}
                            />

                        </ScrollView>
                        <TouchableOpacity onPress={() => setisVisible(false)}>
                            <View style={[styles.button, { backgroundColor: colors.header }]}>
                                <Text style={{ color: '#fff' }}>Close</Text>
                            </View>
                        </TouchableOpacity>


                    </View>
                </Modal>
            </View>
        </View>
    )
}


const styles = StyleSheet.create({
    modalContent: {
        // flex: 1,
        marginTop: 50,
        marginBottom: 50,
        // marginBottom: 50,
        // height: HEIGHT
    },
    itemSearch: {
        position: 'absolute', zIndex: 1, top: 100,
        width: WIDTH - 40, left: 20,
        minHeight: 100, maxHeight: 300
    },
    noResultView: {
        alignSelf: 'center',
        height: 100,
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        alignContent: 'center'
    },
    noResultText: {
        fontSize: 18,
        fontWeight: 'bold',
        color: 'red'
    },
    itemView: {
        borderBottomColor: '#cccccc',
        borderBottomWidth: 1,
        height: 30,
        width: WIDTH,
        marginBottom: 10,
        justifyContent: 'center',
        borderRadius: 4,
    },
    itemText: {
        paddingHorizontal: 10,
    },
    subContainer: {
        backgroundColor: '#fff',
        paddingTop: 10,
        marginHorizontal: 20,
        borderTopLeftRadius: 4,
        borderTopRightRadius: 4,
        flexWrap: 'wrap',
    },
    container: {
        //   justifyContent: 'center',
        //   alignItems: 'center',
        width: WIDTH,
        flex: 1,
    },
    textInput: {
        // backgroundColor: ,
        width: '90%',
        borderRadius: 5,
        fontSize: 16,
        paddingHorizontal: 10,
        margin: 10
    },
    button: {
        padding: 12,
        margin: 16,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 4,
        borderColor: 'rgba(0, 0, 0, 0.1)',
    },
});

