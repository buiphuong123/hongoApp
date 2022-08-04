import React, { Component, useState, useEffect } from 'react'
import { Text, View, SafeAreaView, Dimensions, Image, TouchableOpacity, StyleSheet, Button, FlatList } from 'react-native'
import Slider from '@react-native-community/slider';
import Feather from 'react-native-vector-icons/Feather';
var Sound = require('react-native-sound');
Sound.setCategory('Playback');
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';
import CustomHeader from '../../../CustomHeader';
import { set } from 'react-native-reanimated';
import { useTheme } from 'react-native-paper';


export default SelectQuestion = ({ navigation, route }) => {
    const { colors } = useTheme();

    // const [listQuestion, setListQuestion] = useState([{ id: 1, question: "さとうさんはギターを上手に（ ）。", answer: ["うたいます", "ききます", "ひきます", "あそびます"], anCorrect: "2" },
    // { id: 2, question: "かぜのときはこのくすりを（ ）ください。", answer: ["のりて", "のんで", "のって", "のむで"], anCorrect: "1" }]);
    // ];
    const {listQuestions, title} = route.params;

    const [listQuestion, setListQuestion] = useState(listQuestions);
    // const listQuestion = [
    //     {
    //         "word": "池",
    //         "vn": "cái ao"
    //     },
    //     {
    //         "word": "熱い",
    //         "vn": "nóng , nóng bỏng"
    //     },
    //     {
    //         "word": "楽しい",
    //         "vn": "dí dỏm"
    //     },
    //     {
    //         "word": "映画",
    //         "vn": "điện ảnh"
    //     },
    //     {
    //         "word": "公園",
    //         "vn": "công viên"
    //     },
    //     {
    //         "word": "お弁当",
    //         "vn": "cơm hộp"
    //     },
    //     {
    //         "word": "背",
    //         "vn": "lưng ."
    //     },
    //     {
    //         "word": "問題",
    //         "vn": "vấn đề ."
    //     },
    //     {
    //         "word": "先月",
    //         "vn": "tháng trước"
    //     },
    //     {
    //         "word": "要る",
    //         "vn": "cần"
    //     },
    //     {
    //         "word": "青",
    //         "vn": "màu xanh"
    //     },
    //     {
    //         "word": "秋",
    //         "vn": "mùa thu"
    //     },
    //     {
    //         "word": "浴びる",
    //         "vn": "tắm"
    //     },
    //     {
    //         "word": "暖かい",
    //         "vn": "đầm ấm"
    //     },
    //     {
    //         "word": "妹",
    //         "vn": "em"
    //     },
    //     {
    //         "word": "降りる",
    //         "vn": "bước xuống"
    //     },
    //     {
    //         "word": "口",
    //         "vn": "cửa , miệng"
    //     },
    //     {
    //         "word": "厚い",
    //         "vn": "dày"
    //     }
    // ];
    // var listQuestion1 = listQuestion.slice(0, 6);
    // var listQuestion2 = listQuestion.slice(6, 12);
    // var listQuestion3 = listQuestion.slice(12, 18);
    const [wordListTest1, setWordListTest1] = useState([]);
    const [wordListTest2, setWordListTest2] = useState([]);
    const [wordListTest3, setWordListTest3] = useState([]);
    
    useEffect(() => {
        console.log(listQuestions);
        setListQuestion(listQuestions);
        // setLisQuestion1(listQuestions.slice(0, 6));
        // setLisQuestion2(listQuestions.slice(6, 12));
        // setLisQuestion3(listQuestions.slice(12, 18));
        var wordListTest11 = listQuestions.slice(0, 6).map(function (item) {
            return item['word'];
        });
        var vn1 = listQuestions.slice(0, 6).map(function (item) {
            return item['vn'];
        });
        setWordListTest1(wordListTest11.concat(vn1));
        setData(shuffleArray(wordListTest11.concat(vn1)));
        var wordListTest21 = listQuestions.slice(6, 12).map(function (item) {
            return item['word'];
        });
        var vn2 = listQuestions.slice(6, 12).map(function (item) {
            return item['vn'];
        });
        setWordListTest2(wordListTest21.concat(vn2));
        var wordListTest31 = listQuestions.slice(12, 18).map(function (item) {
            return item['word'];
        });
        var vn3 = listQuestions.slice(12, 18).map(function (item) {
            return item['vn'];
        });
        setWordListTest3(wordListTest31.concat(vn3));
    }, [listQuestions]);
    // useEffect(() => {
    //     setData(shuffleArray(wordListTest1));
    // }, [wordListTest1])
   
    // var wordListTest1 = listQuestion1.map(function (item) {
    //     return item['word'];
    // });
    // var vn1 = listQuestion1.map(function (item) {
    //     return item['vn'];
    // });
    // wordListTest1 = wordListTest1.concat(vn1);
    // var wordListTest2 = listQuestion2.map(function (item) {
    //     return item['word'];
    // });
    // var vn2 = listQuestion2.map(function (item) {
    //     return item['vn'];
    // });
    // wordListTest2 = wordListTest2.concat(vn2);
    // var wordListTest3 = listQuestion3.map(function (item) {
    //     return item['word'];
    // });
    // var vn3 = listQuestion3.map(function (item) {
    //     return item['vn'];
    // });
    // wordListTest3 = wordListTest3.concat(vn3);
    const [value, setValue] = useState("");
    const [choose, setChoose] = useState([]);
    const [check, setCheck] = useState(false);

    // var choose = [];
    const chooseTag = (item) => {
        setValue(item);
        choose.push(item);
        setChoose([...choose]);
        console.log(choose);
        console.log('phan tu thu 1 cua choose la ', choose[1]);
        if (choose.length === 2) {
            for (var i = 0; i < listQuestion.length; i++) {
                if (choose[0] === listQuestion[i].vn) {
                    if (choose[1] === listQuestion[i].word) {
                        console.log('dung r');
                        setCheck(true);
                    }
                    else {
                        console.log('sai');
                        setCheck(false);
                    }
                }
                else if (choose[0] === listQuestion[i].word) {
                    if (choose[1] === listQuestion[i].vn) {
                        console.log('dung r');
                        setCheck(true);
                    }
                    else {
                        console.log('sai');
                        setCheck(false);
                    }
                }
            }
            setChoose([]);
        }

    }
    const renderQuestion = ({ item, index }) => {
        return (
            <View style={{ marginTop: 20, flexWrap: 'wrap', justifyContent: 'center', marginTop: 20, }}>

                <TouchableOpacity
                    style={{ backgroundColor: '#cccccc', justifyContent: 'center', alignItems: 'center', marginRight: 20, width: 100, minHeight: 100, marginBottom: 20, borderRadius: 20, padding: 10 }}
                    onPress={() => clickTag(item)}
                >
                    <Text>{item.word}</Text>
                </TouchableOpacity>

            </View>
        )

    }
    const shuffleArray = (array) => {
        let i = array.length - 1;
        for (; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            const temp = array[i];
            array[i] = array[j];
            array[j] = temp;
        }
        let arrayObj = [];
        for (var j = 0; j < array.length; j++) {
            var a = {};
            a['word'] = array[j];
            a['action'] = false;
            // a.word = array[j];
            // a.action = false;
            arrayObj.push(a);
        }
        return arrayObj;
    }
    const checkTest = () => {
        const kq = shuffleArray(wordListTest1);
        console.log(kq);
    }
    const [count, setCount] = useState(1);
    const [data, setData] = useState(shuffleArray(wordListTest1));
    const clickTag = (item) => {

        choose.push(item.word);
        setChoose(choose);
        const index1 = data.findIndex(object => {
            return object.word === choose[0];
        });
        if (index1 !== -1) {
            data[index1].action = true;
        }
        //   console.log(data);
        setData([...data]);
        if (choose.length === 2) {
            for (var i = 0; i < listQuestion.length; i++) {
                if (choose[0] === listQuestion[i].vn) {
                    if (choose[1] === listQuestion[i].word) {
                        const index = data.findIndex(object => {
                            return object.word === choose[1];
                        });
                        data.splice(index, 1);
                        const indexkaka = data.findIndex(object => {
                            return object.word === choose[0];
                        });
                        data.splice(indexkaka, 1);
                        setData([...data]);
                        break;
                    }
                    else {
                        const index = data.findIndex(object => {
                            return object.word === choose[1];
                        });
                        const indexkaka = data.findIndex(object => {
                            return object.word === choose[0];
                        });
                        data[index].action = undefined;
                        data[indexkaka].action = undefined;
                        setTimeout(() => {
                            data[index].action = false;
                            data[indexkaka].action = false;
                        }, 1000);
                        setData([...data]);
                        break;
                    }
                }
                else if (choose[0] === listQuestion[i].word) {
                    if (choose[1] === listQuestion[i].vn) {
                        const index = data.findIndex(object => {
                            return object.word === choose[1];
                        });
                        data.splice(index, 1);
                        const indexkaka = data.findIndex(object => {
                            return object.word === choose[0];
                        });
                        data.splice(indexkaka, 1);
                        setData([...data]);
                        break;
                    }
                    else {
                        const index = data.findIndex(object => {
                            return object.word === choose[1];
                        });
                        const indexkaka = data.findIndex(object => {
                            return object.word === choose[0];
                        });
                        data[index].action = undefined;
                        data[indexkaka].action = undefined;
                        setTimeout(() => {
                            data[index].action = false;
                            data[indexkaka].action = false;
                        }, 1000);
                        setData([...data]);
                        break;
                    }
                }
            }

            setChoose([]);
            if (data.length === 0 && count !== 2 && count === 1) {
                setData(shuffleArray(wordListTest2));
                setCount(2);

            }
            else if (data.length === 0 && count === 2 && count !== 3) {
                setData(shuffleArray(wordListTest3));
                setCount(3);
            }
            else if (data.length === 0 && count === 3) {
                console.log('KET THUC NHA');
                navigation.navigate("ResultScreen", {navigation: navigation,listQuestion: listQuestion})
            }

        }
    }
    return (
        <View style={{ flex: 1 }}>
            <CustomHeader title={title} navigation={navigation} />
            <View style={{ alignItems: 'center', justifyContent: 'center', flex: 1, alignSelf: 'center', padding: 10,}}>
                <FlatList
                    numColumns={3}
                    data={data}
                    renderItem={({ item }) => <View style={{alignSelf: 'center', marginTop: 20, flexWrap: 'wrap', justifyContent: 'center', marginTop: 20, }}>

                        <TouchableOpacity
                            style={{ backgroundColor: item.action === true ? colors.header : item.action === undefined ? 'red' : '#e6e6e6', justifyContent: 'center', alignItems: 'center', marginRight: 20, width: 100, minHeight: 100, marginBottom: 20, borderRadius: 20, padding: 10 }}
                            onPress={() => clickTag(item)}
                        >
                            <Text>{item.word}</Text>
                        </TouchableOpacity>

                    </View>}
                    keyExtractor={(item, index) => index.toString()}
                />

                {/* {
                        listQuestion.slice(0,6).map((element, key) => {
                            return (
                                <View>
                                    <View style={{ flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'center', marginTop: 20, flexDirection: 'row' }}>
                                    <TouchableOpacity style={{backgroundColor: '#cccccc',justifyContent: 'center', alignItems: 'center', marginRight: 20, padding: 20, flexGrow: 1, width: 50, height: 100, marginBottom: 20, borderRadius: 20}}>
                                        <Text>{element.word}</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity style={{backgroundColor: '#cccccc',justifyContent: 'center', alignItems: 'center', marginRight: 20, padding: 20, flexGrow: 1, width: 50, height: 100, marginBottom: 20, borderRadius: 20}}>
                                        <Text>{element.vn}</Text>
                                    </TouchableOpacity>
                                </View>
                                </View>
                                
                            );

                        })
                    } */}
            </View>

        </View>
    )
}

const styles = StyleSheet.create({
    questionSetting: {
        padding: 20,
        backgroundColor: '#8080ff',
        marginTop: 30,
        marginLeft: 20,
        borderRadius: 10
    },
    boxQues: {
        backgroundColor: '#8080ff',
        padding: 50,
        borderRadius: 10,
        marginRight: 20
    },
    textQues: {
        color: '#fff',
        fontWeight: 'bold'
    },
    boxAns: {
        padding: 20,

        marginTop: 20,
        borderRadius: 10,
        flexDirection: 'row',
        flexWrap: 'wrap'
    }


})