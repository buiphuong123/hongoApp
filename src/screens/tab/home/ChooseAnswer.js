import React, { Component, useState, useEffect } from 'react'
import { Text, View, SafeAreaView, Dimensions, Image, TouchableOpacity, StyleSheet, Button, FlatList } from 'react-native'
import CustomHeader from '../../CustomHeader';
import Slider from '@react-native-community/slider';
import Feather from 'react-native-vector-icons/Feather';
var Sound = require('react-native-sound');
Sound.setCategory('Playback');
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';

export default ChooseAnswer = ({ navigation, route }) => {
    const {grammar_id} = route.params;
    const { width } = Dimensions.get('window');
    const { height } = Dimensions.get('window');
    const [isTrue, setisTrue] = useState('');
    const [alertSuccess, setalertSuccess] = useState('');
    const [alertError, setalertError] = useState('');
    const [hira, setHira] = useState('');
    const [arrAns, setarrAns] = useState([]);
    const [isA, setisA] = useState(false);
    const [isB, setisB] = useState(false);
    const [isC, setisC] = useState(false);
    const [isAnswer, setisAnswer] = useState(false);
    const listQuestion = useSelector(state => state.grammarquestionReducer.questionList);
    const [question, setQuestion] = useState(listQuestion.slice(0,1));
    const [currentQuestion, setCurrentQuestion] = useState({});
    const [number, setNumber] = useState(1);
    const [trueQuestion, setTrueQuestion] = useState(0);
    const [falseQuestion, setFalseQuestion] = useState(0);
    const users = useSelector(state => state.userReducer.user);

    const successMess = (
        <View style={{ backgroundColor: '#99ff99', height: 500, position: 'absolute', width: '100%', zIndex: 1, marginTop: height - 120 }}>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 20 }}>
                <View style={{ marginLeft: 20 }}>
                    <Text style={styles.checkbox}>Tuyet voi</Text>
                </View>
                <View style={{ flexDirection: 'row', marginRight: 20 }}>
                    <Feather
                        name="message-square"
                        style={styles.checkbox}
                        size={20}
                    />
                    <Feather
                        name="flag"
                        style={styles.checkbox}
                        size={20}
                    />
                </View>
            </View>
            <View style={{ paddingLeft: 40, paddingRight: 40, paddingBottom: 20, marginTop: 20 }}>
                <Button
                    onPress={() => nextQues()}
                    title="Tiep tuc"
                    color="#009900"
                    accessibilityLabel="Learn more about this purple button"
                />
            </View>

        </View>
    )
    const errorsMess = (
        <View style={{ backgroundColor: '#ffcccc', height: 200, marginTop: 20, position: 'absolute', width: '100%', zIndex: 1, marginTop: height - 200 }}>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 20 }}>
                <View style={{ marginLeft: 20 }}>
                    <Text style={[styles.checkbox1], {color: 'red'}}>Không chính xác</Text>
                </View>
                <View style={{ flexDirection: 'row', marginRight: 20 }}>
                    <Feather
                        name="message-square"
                        style={styles.checkbox1}
                        size={20}
                    />
                    <Feather
                        name="flag"
                        style={styles.checkbox1}
                        size={20}
                    />
                </View>
            </View>
            <View style={{ marginLeft: 20, marginTop: 10 }}>
                <Text style={{ fontWeight: 'bold', color: '#e60000' }}>Câu trả lời</Text>
                <Text style={{ marginTop: 10, color: '#ff1a1a' }}> đáp án đúng là {currentQuestion.answer}</Text>
            </View>
            <View style={{ paddingLeft: 40, paddingRight: 40, paddingBottom: 20, marginTop: 40 }}>
                <Button
                    onPress={() => nextQues()}
                    title="Tiep tuc"
                    color="#ff1a1a"
                    accessibilityLabel="Learn more about this purple button"
                />
            </View>

        </View>
    )
    const volumnTrue = () => {
        var whoosh = new Sound('dung.mp3', Sound.MAIN_BUNDLE, (error) => {
            if (error) {
                console.log('failed to load the sound', error);
                return;
            }
            // loaded successfully
            console.log('duration in seconds: ' + whoosh.getDuration() + 'number of channels: ' + whoosh.getNumberOfChannels());

            // Play the sound with an onEnd callback
            whoosh.play((success) => {
                if (success) {
                    console.log('successfully finished playing');
                } else {
                    console.log('playback failed due to audio decoding errors');
                }
            });
        });
    }
    const volumnFalse = () => {
        var whoosh = new Sound('sai.mp3', Sound.MAIN_BUNDLE, (error) => {
            if (error) {
                console.log('failed to load the sound', error);
                return;
            }
            // loaded successfully
            console.log('duration in seconds: ' + whoosh.getDuration() + 'number of channels: ' + whoosh.getNumberOfChannels());

            // Play the sound with an onEnd callback
            whoosh.play((success) => {
                if (success) {
                    console.log('successfully finished playing');
                } else {
                    console.log('playback failed due to audio decoding errors');
                }
            });
        });
    }
    const checkAnwer = () => {
        var check = false;
        var choose = '';
        if (isA === true) {
            choose = 'A';
        }
        else if(isB === true) {
            choose = 'B';
        }
        else if(isC === true) {
            choose = 'C';
        }
        setisAnswer(true);
        if((currentQuestion.answer === 'A' &&   isA === true) || (currentQuestion.answer === 'B' && isB === true) || (currentQuestion.answer === 'C' && isC === true) ) {
            volumnTrue();
            check= true;
            setTrueQuestion(trueQuestion + 1);
            setalertSuccess(true);
        }
        else{
            setalertError(true);
            setFalseQuestion(falseQuestion + 1);
        }
        axios.post('http://192.168.1.722:3002/language/createResult', {
                "grammar_id": grammar_id,
                "user_id": users._id,
                "question_id": currentQuestion._id,
                "isTrue": check,
                "chooseAns": choose,
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
                    console.log(error);
                })
           
        // if(choose === currentQuestion.answer) {
        //     volumnTrue();
        //     setalertSuccess(true);
        // }
        // else {
        //     setalertError(true);
        // }
        
        // setTimeout(() => {
        //     setisTrue('');
        // }, 2000);
    
        // setTimeout(() => {
        // setalertSuccess(false);
        // }, 2000);
    }
    const nextQues = () => {
        setisA(false);
        setisB(false);
        setisC(false);
        setisAnswer(false);
        setNumber(number+1);
        if (listQuestion.length > number) {
            setQuestion(listQuestion.slice(number, number + 1));
            setalertSuccess(false);
            setalertError(false);
            setisTrue('');
        }
        else {
            navigation.navigate("ResultScreen");
        }

    }

    const chooseA = () => {
        setisA(!isA);
        setisB(false);
        setisC(false);
    }
    const chooseB = () => {
        setisB(!isB);
        setisA(false);
        setisC(false);
    }
    const chooseC = () => {
        setisC(!isC);
        setisA(false);
        setisB(false);
    }

    const renderQuestion = ({ item }) => {
        setCurrentQuestion(item);
        return (
            <View style={{marginTop: 20}}>
                <View style={styles.boxQues}>
                    <Text style={styles.textQues}>{ item.question }</Text>
                </View>
                <View style={{}}>
                    <TouchableOpacity style={[styles.boxAns, { backgroundColor: isA ? '#8080ff' : '#d9d9d9',}  ]} onPress={() => chooseA()}>
                        <Text> A. {item.ansA }</Text>
                        {isAnswer ? <Text style={{marginLeft: 20, color: 'red', }}>{ item.explain }</Text> : null} 
                    </TouchableOpacity>
                    <TouchableOpacity style={[styles.boxAns, {backgroundColor: isB ? '#8080ff' : '#d9d9d9',}  ]} onPress={() => chooseB()}>
                        <Text>B. {item.ansB } </Text>
                    </TouchableOpacity>
                    {item.ansC === '' ?
                         null: 
                        <TouchableOpacity style={[styles.boxAns, {backgroundColor: isC ? '#8080ff' : '#d9d9d9',}  ]} onPress={() => chooseC()}>
                            <Text>C. {item.ansC } </Text>
                        </TouchableOpacity>
                    }
                </View>
            </View>
        )
    }
    
    return (
        <View style={{ flex: 1 }}>
            <CustomHeader title="study grammar" navigation={navigation} />
            <View style={{padding: 20, flex: 1, zIndex: 0 }}>
                <View style={{ flex: 10,  }}>
                    <View style={{ flexDirection: 'row', marginBottom: 30, backgroundColor: 'gray', height: 10, borderRadius: 5 }}>
                        <View style={{backgroundColor: 'red', height: 10, borderRadius: 5, width: number*(width-40)/(listQuestion.length)}}></View>
                        <View style={{backgroundColor: 'gray', height: 5, width: (listQuestion.length-number)*(width-40)/(listQuestion.length)}}></View>
                        {/* <Slider
                            style={{ width: 250, height: 60}}
                            minimumValue={1}
                            maximumValue={5}
                            minimumTrackTintColor="green"
                            maximumTrackTintColor="#000000"
                            step={1}
                            value={rating}
                            onValueChange={setRating}
                        />
                        <Text style={{ fontSize: 40 }}>
                            {getRatingEmoji()}
                        </Text> */}
                    </View>
                    <View style={{flexDirection: 'row', justifyContent: 'space-around'}}>
                        <View style={{ padding: 10}}>
                            <Text style={{fontWeight: 'bold', fontSize: 21}}>{number}/{listQuestion.length}</Text>
                        </View>
                        <View style={{flexDirection: 'row', justifyContent: 'flex-end'}}>
                            <View style={{padding: 10, backgroundColor: '#8080ff', width: 80, justifyContent: 'center', alignItems:'center'}}>
                                <Text style={{color: 'white', fontWeight: 'bold'}}>ĐÚNG {trueQuestion}</Text>
                            </View>

                            <View style={{ backgroundColor: 'red', width: 80, justifyContent: 'center', alignItems:'center', marginLeft: 20}}>
                                <Text style={{color: 'white', fontWeight: 'bold'}}>Sai {falseQuestion}</Text>
                            </View>
                        </View>
                    </View>
                    {/* <View style={{marginTop: 20}}>
                        <View style={styles.boxQues}>
                            <Text style={styles.textQues}>[    ]わけじゃあるまいし、そんなに泣かないで。</Text>
                        </View>
                        <View style={{}}>
                            <TouchableOpacity style={[styles.boxAns, { backgroundColor: isA ? '#8080ff' : '#d9d9d9',}  ]} onPress={() => chooseA()}>
                                <Text> A. もう会えなくなる</Text>
                               {isAnswer ? <Text style={{marginLeft: 20, color: 'red'}}>O 普通形 + わけじゃあるまいし</Text> : null} 
                            </TouchableOpacity>
                            <TouchableOpacity style={[styles.boxAns, {backgroundColor: isB ? '#8080ff' : '#d9d9d9',}  ]} onPress={() => chooseB()}>
                                <Text>B. これで最後</Text>
                            </TouchableOpacity>
                        </View>
                    </View> */}
                    <FlatList
                        data={question}
                        keyExtractor={item => item.id}
                        renderItem={renderQuestion}
                    />
                    
                </View>
                <View style={{ paddingLeft: 40, paddingRight: 40, flex: 1, }}>
                    <Button
                        onPress={() => checkAnwer()}
                        title="Kiểm tra"
                        color="#841584"
                        accessibilityLabel="Learn more about this purple button"
                    />
                </View>
            </View>
            {alertSuccess == '' ?
                null :
                successMess

            }

            {alertError == '' ?
                null :
                errorsMess

            }


        </View>
    )
}

const styles = StyleSheet.create({
    boxQues: {
        backgroundColor: '#8080ff',
        padding: 40,
        borderRadius: 10
    },
    textQues: {
        color: '#fff',
        fontWeight: 'bold'
    },
    boxAns: {
        padding: 20, 
        
        marginTop: 20, 
        borderRadius:10,
        flexDirection: 'row',
        flexWrap: 'wrap'
    }


})