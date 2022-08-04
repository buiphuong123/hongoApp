import { Center } from 'native-base';
import React, { useState, useEffect } from 'react'
import { Text, View, SafeAreaView, Dimensions, Image, TouchableOpacity, StyleSheet, Button, FlatList, ScrollView, TextInput } from 'react-native'
import { useSelector, useDispatch } from 'react-redux';
import { actionChannel } from 'redux-saga/effects';
import Entypo from 'react-native-vector-icons/EvilIcons';
const WIDTH = Dimensions.get('window').width;
import Modal from 'react-native-modal'; // 2.4.0
import CustomHeader from '../../../CustomHeader';
import { getListKanjiSuccess } from '../../../../redux/actions/kanji.action';
import { useTheme } from 'react-native-paper';
import { getListKanjiCommentRequest } from '../../../../redux/actions/comment.action';
export default KanjiLession = ({navigation}) => {
    const { colors } = useTheme();
    const users = useSelector(state => state.userReducer.user);

    const [dataSource, setDataSource] = useState(['tất cả'])
    const [searching, setSearching] = useState(false)
    const [isVisible, setisVisible] = useState(false);
    const kanjiList = useSelector(state => state.kanjiReducer.kanjiList);
    const kanjilevel = useSelector(state => state.kanjiReducer.kanjilevel);
    const [filtered, setFiltered] = useState(kanjiList);
    const [searchName, setSearchName] = useState("");
    const dispatch = useDispatch();
        const onSearch = (text) => {
        setSearchName(text);
        if (text) {
            setSearching(true)
            // const temp = text.toLowerCase()
            const tempList = kanjiList.filter(item => {
                if ( item.mean.match(text.toUpperCase())) {
                    return item
                }
            })
            setFiltered(tempList)
        }
        else {
            setSearching(false)
            setFiltered(kanjiList)
        }

    }
    useEffect(() => {
        setSearching(false);
        // console.log(wordlevel);
        console.log(kanjilevel.filter(w => !w.lesson).map(w => w.lession))
        const max = Math.max(...kanjilevel.map(w => w.lession ?? 1));
        for (var i = 1; i <= max; i++) {
            dataSource.push("bài " + i);

        }
        setDataSource([...dataSource]);
    }, []);

    useEffect(() => {
        console.log('vao focus');
        const unsubscribe = navigation.addListener('focus', () => {
            setSearching(false);
            let arr3 = kanjiList.map((item, i) => Object.assign({}, item, kanjilevel[i]));
            dispatch(getListKanjiSuccess(arr3));
        });

        return unsubscribe;
    }, [navigation]);
    const renderLession = ({ item, index }) => {
        return (
            <View style={{ backgroundColor: colors.background, padding: 10 }}>
                <Text style={{ color: colors.text }}>{item} Đã nhớ</Text>
                <View style={{flexDirection: 'row'}}>
                <View>
                        {
                            index=== 0 ?
                            <Text style={{ color: colors.text }}>{Math.floor((kanjilevel.filter(e=>e.memerizes.length===1).length/kanjilevel.length)*100)}%</Text>
                            :
                            <Text style={{ color: colors.text }}>{Math.floor((kanjilevel.filter(e=>e.memerizes.length===1 && e.lession=== index).length/kanjilevel.filter(e=>e.lession=== index).length)*100)}%</Text>


                        }
                    </View>

                    <View style={{ borderWidth: 1, borderColor: '#cccccc', width: '80%', height: 1, marginTop: 10, marginLeft: 5 }}></View>
                </View>
            </View>
        )
    }

    const PressLession = (index) => {
        navigation.navigate("KanjiScreen", {navigation: navigation,lession: index});
    }
    return (
        <View style={styles.container}>
            <CustomHeader title="Hán tự" navigation={navigation} />
            <View style={{ justifyContent: 'center', alignItems: 'center', height: 60, backgroundColor: colors.header, }}>
                <TextInput
                    style={styles.textInput}
                    placeholder="Search a kanji"
                    placeholderTextColor='#cccccc'
                    value={searchName}
                    onChangeText={(text) => onSearch(text)}

                />
            </View>
            <ScrollView style={{}}>
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
                                     alignSelf: 'center',
                                     alignItems: 'center',
                                     alignContent: 'center',
                                    width: WIDTH/4-20

                                }} 
                                onPress={() => PressLession(index)}
                                >

                                    <Text style={{ fontSize: 17, }}>
                                        {item}
                                    </Text>
                                </TouchableOpacity>
                            )
                        })
                    }
                </View>

            </ScrollView>


            <View>
                <Modal
                    isVisible={isVisible}
                    animationInTiming={1000}
                    animationOutTiming={1000}
                    backdropTransitionInTiming={1000}
                    backdropTransitionOutTiming={1000}
                    deviceWidth={WIDTH}
                >
                    <View style={[styles.modalContent, {backgroundColor: colors.background}]}>
                        <ScrollView>
                            <FlatList
                                style={{ padding: 5 }}
                                data={dataSource}
                                keyExtractor={item => item.id}
                                renderItem={renderLession}
                            />
                        </ScrollView>

                        <TouchableOpacity onPress={() => setisVisible(false)}>
                            <View style={[styles.button, {backgroundColor: colors.header}]}>
                                <Text style={{ color: '#fff' }}>Close</Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                </Modal>
            </View>

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
            {/* {
                searching &&
                <SearchWord
                    onPress={() => setSearching(false)}
                    wordList={filtered} 
                    navigation = {navigation}
                    />
            } */}
             {
                searching &&
                    <ScrollView style={styles.itemSearch}>
                        {
                            filtered.length !== 0 ?
                            filtered.map((element, key) => {
                                return (
                                    <TouchableOpacity key={key} style={styles.itemView} onPress={() =>  {
                                        dispatch(getListKanjiCommentRequest(element._id, users._id));
                                        navigation.navigate("ExplainKanji", { navigation: navigation, kanjiword: element });
                                    }
                                        }>
                                    <Text style={styles.itemText}>{element.kanji} : {element.mean}</Text>
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
        width: WIDTH-40, left: 20 ,backgroundColor: '#fff',
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
        backgroundColor: 'white',
        height: 30,
        width: WIDTH,
        marginBottom: 10,
        justifyContent: 'center',
        borderRadius: 4,
    },
    itemText: {
        color: 'black',
        paddingHorizontal: 10,
    },
    container: {
        //   justifyContent: 'center',
        //   alignItems: 'center',
        width: WIDTH,
        flex: 1,
    },
    textInput: {
        backgroundColor: '#fff',
        width: '90%',
        borderRadius: 5,
        fontSize: 16,
        paddingHorizontal: 10,
        margin: 10
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
});

