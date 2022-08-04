import React, { Component, useState, useEffect } from 'react'
import { Text, View, SafeAreaView, Dimensions, Image, ScrollView, TouchableOpacity, StyleSheet, Button, FlatList } from 'react-native'
import Slider from '@react-native-community/slider';
import Feather from 'react-native-vector-icons/Feather';
var Sound = require('react-native-sound');
Sound.setCategory('Playback');
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';
import CustomHeader from '../../../CustomHeader';
import Modal from 'react-native-modal'; // 2.4.0
import { useTheme } from 'react-native-paper';

const WIDTH = Dimensions.get('window').width;

export default SelectQuestion = ({ navigation, route }) => {
    // const [listQuestion, setListQuestion] = useState([{ id: 1, question: "さとうさんはギターを上手に（ ）。", answer: ["うたいます", "ききます", "ひきます", "あそびます"], anCorrect: "2" },
    // { id: 2, question: "かぜのときはこのくすりを（ ）ください。", answer: ["のりて", "のんで", "のって", "のむで"], anCorrect: "1" }]);
    // // ];
    const { colors } = useTheme();

    const { question } = route.params;
    const { title } = route.params;
    const [listQuestion, setListQuestion] = useState(question);
    const [number, setNumber] = useState(0);
    const [trueQuestion, setTrueQuestion] = useState(0);
    const [falseQuestion, setFalseQuestion] = useState(0);
    const [color, setColor] = useState(false);
    const [isVisible, setisVisible] = useState(false);
    useEffect(() => {
        setListQuestion(question);
        setNumber(0);
        setTrueQuestion(0);
        setFalseQuestion(0);
        setisVisible(false);
        setColor(false);
    }, [question]);

    const selectAnswer = (element) => {
        setColor(!color);
        listQuestion[number].chooseQues = element;
        setListQuestion(listQuestion);
        const correct = listQuestion[number].anCorrect;
        if (listQuestion[number].chooseQues === listQuestion[number].answer[correct]) {
            if (listQuestion[number].check === undefined) {
                listQuestion[number].check = true;
                setListQuestion(listQuestion);
                setTrueQuestion(trueQuestion + 1);
            }
            else if (listQuestion[number].check === true) {

            }
            else if (listQuestion[number].check === false) {
                listQuestion[number].check = true;
                setListQuestion(listQuestion);
                setTrueQuestion(trueQuestion + 1);
                setFalseQuestion(falseQuestion - 1);
            }


            // setCheck(true);
        }
        else {
            if (listQuestion[number].check === undefined) {
                listQuestion[number].check = false;
                setListQuestion(listQuestion);
                setFalseQuestion(falseQuestion + 1);
            }
            else if (listQuestion[number].check === false) {

            }
            else if (listQuestion[number].check === true) {
                listQuestion[number].check = false;
                setListQuestion(listQuestion);
                setFalseQuestion(falseQuestion + 1);
                setTrueQuestion(trueQuestion - 1);
            }
            console.log('tra loi sai');
            // setCheck(false);
        }
    }

    // const listAns = (list) => {
    //     return list.map((element, key) => {
    //         // console.log('check', listQuestion[number - 1].chooseQues === element);
    //         return (
    //             <TouchableOpacity key={key} style={{ backgroundColor: listQuestion[number].chooseQues === element || color === true ? 'blue' : '#e6e6e6' && listQuestion[number].check === true ? 'blue' : 'red', justifyContent: 'center', alignItems: 'center', marginRight: 20, padding: 20, flexGrow: 1, minWidth: 150, minHeight: 100, marginBottom: 20, borderRadius: 20 }}
    //                 onPress={() => selectAnswer(element)}
    //             >
    //                 <Text>{element}</Text>
    //             </TouchableOpacity>
    //         );
    //     });
    // }

    const renderQuestion = ({ item }) => {
        return (
            <View style={{ marginTop: 20 }}>
                <View style={[styles.boxQues, {backgroundColor: colors.header}]}>
                    <Text style={styles.textQues}>{item.question}</Text>
                </View>
                <View style={{ flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'center', marginTop: 20 }}>
                    {/* {listAns(item.answer)} */}
                    {
                        item.answer.map((element, key) => {
                            return (
                                <TouchableOpacity key={key} onPress={() => selectAnswer(element)}
                                    style={{
                                        backgroundColor: listQuestion[number].answer[listQuestion[number].anCorrect] === element && listQuestion[number].chooseQues !== undefined ? '#8080ff' : (listQuestion[number].chooseQues === element && listQuestion[number].answer[listQuestion[number].anCorrect] === element) ? '#8080ff' : (listQuestion[number].chooseQues === element && listQuestion[number].answer[listQuestion[number].anCorrect] !== element) ? 'red' : colors.block
                                        , justifyContent: 'center', alignItems: 'center', marginRight: 20, padding: 20, width: 150, minHeight: 100, marginBottom: 20, borderRadius: 20
                                    }} >
                                    <Text style={{color: colors.text}}>{element}</Text>
                                </TouchableOpacity>
                            );

                        })
                    }
                </View>
            </View>
        )
    }

    const nextQues = () => {
        // setTimeout(() => {
        if(listQuestion[number].chooseQues === undefined) {
            return;
        }
        if (number < listQuestion.length - 1) {
            setColor(false);
            setNumber(number + 1);
            // setQuestion(listQuestion.slice(number, number + 1));
        }
        else {
            console.log('het cau hoir');
            setisVisible(true);
            console.log('LIST QUESTION LA ', listQuestion);
        }
        // }, 2000);
    }
    const previosQues = () => {
        if (number > 0) {
            setNumber(number - 1);
            // setQuestion(listQuestion.slice(number, number + 1));
        }
        else {
            console.log('het cau hoir');
        }
    }

    const renderResult = ({ item, index }) => {
        return (
            <View style={{ paddingTop: 10, paddingLeft: 20 }}>
                <View>
                    {item.answer[item.anCorrect] === item.chooseQues ?
                        <View>
                            <View>
                                <Text>{index + 1}. {item.question}</Text>
                                <Text>Đáp án: [{item.answer[item.anCorrect]}] </Text>
                                <Text>(OK)</Text>
                            </View>
                        </View>
                        :
                        <View>

                            <Text>{index + 1}. {item.question}</Text>
                            <Text>Đáp án: [{item.answer[item.anCorrect]}] </Text>
                            <Text>(bạn đã chọn sai thành [{item.chooseQues}])</Text>

                        </View>

                    }
                </View>
            </View>

        )
    }
    return (
        <View style={{ flex: 1 }}>
            <CustomHeader title= {title} navigation={navigation} />
            <View style={{ paddingLeft: 20, flex: 1 }}>
                <View style={{}}>
                    {/* <View style={{ flexDirection: 'row', marginBottom: 30, backgroundColor: 'gray', height: 10, borderRadius: 5 }}>
                        <View style={{ backgroundColor: 'red', height: 10, borderRadius: 5, width: number * (width - 40) / (listQuestion.length) }}></View>
                        <View style={{ backgroundColor: 'gray', height: 5, width: (listQuestion.length - number) * (width - 40) / (listQuestion.length) }}></View>
                    </View> */}
                    <View style={{ flexDirection: 'row', marginTop: 20, justifyContent: 'space-around' }}>
                        <View style={{ padding: 10 }}>
                            <Text style={{ fontWeight: 'bold', fontSize: 21, color: colors.text }}>{number + 1}/{listQuestion.length}</Text>
                        </View>
                        <View style={{ flexDirection: 'row', justifyContent: 'flex-end' }}>
                            <View style={{ padding: 10, backgroundColor: colors.header, width: 80, justifyContent: 'center', alignItems: 'center' }}>
                                <Text style={{ color: 'white', fontWeight: 'bold' }}>ĐÚNG {trueQuestion}</Text>
                            </View>

                            <View style={{ backgroundColor: 'red', width: 80, justifyContent: 'center', alignItems: 'center', marginLeft: 20 }}>
                                <Text style={{ color: 'white', fontWeight: 'bold' }}>Sai {falseQuestion}</Text>
                            </View>
                        </View>
                    </View>

                    <FlatList
                        style={{}}
                        data={listQuestion.slice(number, number + 1)}
                        keyExtractor={item => item.id}
                        renderItem={renderQuestion}
                    />

                    {/* <View style={{ alignItems: 'center', justifyContent: 'center', flexDirection: 'row' }}>
                        <TouchableOpacity>
                            <Text>Câu hỏi trước</Text>
                        </TouchableOpacity>
                        <TouchableOpacity>
                            <Text>Câu hỏi tiếp</Text>
                        </TouchableOpacity>
                    </View> */}

                </View>
                <View style={{ alignItems: 'center', justifyContent: 'center', flexDirection: 'row' }}>
                    <TouchableOpacity onPress={() => previosQues()} style={[styles.questionSetting, {backgroundColor: colors.header}]}>
                        <Text style={styles.textQues}>Câu hỏi trước</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => nextQues()} style={[styles.questionSetting, {backgroundColor: colors.header}]}>
                        <Text style={styles.textQues}>Câu hỏi tiếp</Text>
                    </TouchableOpacity>

                </View>
                {/* <View style={{ paddingLeft: 40, paddingRight: 40, flex: 1, }}>
                    <Button
                        onPress={() => checkAnwer()}
                        title="Kiểm tra"
                        color="#841584"
                        accessibilityLabel="Learn more about this purple button"
                    />
                </View> */}

            </View>
            <View style={styles.container}>

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
                            <View style={{ padding: 10, justifyContent: 'center', alignItems: 'center' }}>
                                <Text style={{ fontSize: 18, color: 'blue', padding: 10 }}>Kết quả bài test</Text>
                                <Text>Bạn đã làm đúng {trueQuestion}/{listQuestion.length} câu </Text>
                            </View>
                            <FlatList
                                style={{ padding: 5 }}
                                data={listQuestion}
                                keyExtractor={(item, index) => item.id}
                                renderItem={renderResult}
                            />
                        </ScrollView>

                        <TouchableOpacity onPress={() => setisVisible(false)}>
                            <View style={styles.button}>
                                <Text>Close</Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                </Modal>
            </View>

        </View>
    )
}

const styles = StyleSheet.create({
    textQues: {
        fontWeight: 'bold',

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
        marginTop: 10,
       paddingBottom: 20
    },
    container: {
        width: WIDTH,
    },
    questionSetting: {
        padding: 20,
        // backgroundColor: '#8080ff',
        marginTop: 30,
        marginLeft: 20,
        borderRadius: 10
    },
    boxQues: {
        // backgroundColor: '#8080ff',
        padding: 50,
        borderRadius: 10,
        marginRight: 20,
        alignItems: 'center',
        justifyContent: 'center'
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