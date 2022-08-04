import React, { Component, useState, useEffect } from 'react'
import { Text, View, SafeAreaView, Dimensions, Image, TouchableOpacity, StyleSheet, Button, FlatList } from 'react-native'
import CustomHeader from '../../CustomHeader';
import Slider from '@react-native-community/slider';
import kaka from '../../../assets/images/kaka.png';
import Feather from 'react-native-vector-icons/Feather';
import abc from '../../../assets/images/abc.png';
import doremonbuon from '../../../assets/images/doremonbuon.png';
import axios from "axios";
import Furi from 'react-native-furi'
import ProgressBar from 'react-native-progress/Bar';

var Sound = require('react-native-sound');
Sound.setCategory('Playback');

export default HomeScreenDetail = ({ navigation }) => {
    const [rating, setRating] = React.useState(0);
    const { width } = Dimensions.get('window');
    const { height } = Dimensions.get('window');
    const [isTrue, setisTrue] = useState('');
    const [alertSuccess, setalertSuccess] = useState('');
    const [alertError, setalertError] = useState('');
    const [hira, setHira] = useState('');
    const [arrQues, setarrQues] = useState([{ text: "祭りこそは", selected: false }, { text: "この", selected: false }, { text: "光景", selected: false }, { text: "ならではの", selected: false }, { text: "京都", selected: false }, { text: "です", selected: false }]);
    const [arrAns, setarrAns] = useState([]);
    const kotae = "この祭りこそは京都ならではの光景です";
    const getRatingEmoji = () => {
        if (rating === 1) { return '😡' }

        if (rating === 2) { return '😫' }

        if (rating === 3) { return '😶' }

        if (rating === 4) { return '🙂' }

        if (rating === 5) { return '😁' }


    }
    const successMess = (
        <View style={{ backgroundColor: '#99ff99', height: 500, position: 'absolute', width: '100%', zIndex: 1, marginTop: height - 120 }}>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                <View style={{ marginLeft: 20 }}>
                    <Text style={styles.checkbox}>Tuyet voi</Text>
                </View>
                <View style={{ flexDirection: 'row' }}>
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
            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                <View style={{ marginLeft: 40 }}>
                    <Text style={styles.checkbox1}>Không chính xác</Text>
                </View>
                <View style={{ flexDirection: 'row' }}>
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
                <Text style={{ marginTop: 10, color: '#ff1a1a' }}>Vui long cho ca phe!</Text>
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
        // if(arrAns)'
        const ans = arrAns.join('');
        if (ans === kotae) {
            volumnTrue();
            setalertSuccess(true);
        }
        else {
            setalertError(true);
        }
        // setTimeout(() => {
        //     setisTrue('');
        // }, 2000);

        // setTimeout(() => {
        // setalertSuccess(false);
        // }, 2000);
    }
    const nextQues = () => {
        setalertSuccess(false);
        setalertError(false);
        setisTrue('');
        setRating(rating + 1);
        navigation.navigate("ChooseAnswer");

    }
    const listQues = () => {
        return arrQues.map((element, key) => {
            return (
                <TouchableOpacity key={key} onPress={() => ansShow(element, key)}>
                    <Text style={element.selected === false ? styles.boxAns : styles.boxAnsNo}>{element.text}</Text>
                </TouchableOpacity>
            );
        });
    };
    //   };
    const ansShow = (element, key) => {
        if (element.selected === true) {
            return;
        }
        setarrAns([...arrAns, element.text]);
        setarrQues(arrQues.map(q => q.text === element.text ? ({ ...q, selected: true }) : q));
    }
    const listAns = () => {
        return arrAns.map((element, key) => {
            return (
                <TouchableOpacity key={key} onPress={() => ansDele(element, key)}>
                    <Text style={styles.boxAns}>{element}</Text>
                </TouchableOpacity>
            );
        });
    };
    const ansDele = (element, key) => {
        console.log('delete ', element);
        arrAns.splice(key, 1);
        setarrAns(arrAns);
        setarrQues(arrQues.map(q => q.text === element ? ({ ...q, selected: false }) : q));
    }

    return (
        <View style={{ flex: 1 }}>
            <CustomHeader title="study grammar" navigation={navigation} />
            <View style={{ marginLeft: 20, flex: 1, zIndex: 0 }}>
                <View style={{ flex: 10, }}>
                    <View style={{ flexDirection: 'row', }}>
                        <Slider
                            style={{ width: 250, height: 60 }}
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
                        </Text>
                    </View>

                    {/* <View style={{margin: 30}}>
                        <ProgressBar 
                            progress={rating} 
                            width={200} />
                    </View> */}

                    <View style={{ marginBottom: 20 }}>
                        <Text>Ngu phap moi</Text>
                    </View>
                    <Text style={{ fontWeight: 'bold', fontSize: 18 }}>Dấu hiệu nhận biết</Text>
                    <View style={{ flexDirection: 'row', marginTop: 30, borderBottomWidth: 1, borderBottomColor: '#cccccc' }}>
                        <View style={{ marginTop: 30 }}>
                            <Image
                                style={{ width: 120, height: 120 }}
                                source={isTrue === '' ? kaka : '' || isTrue === true ? abc : doremonbuon}
                            />
                        </View>
                        <View>
                            <View style={{ borderWidth: 1, borderColor: 'gray', maxWidth: width - 150, minHeight: 60, padding: 10, borderRadius: 15, justifyContent: 'center' }}>
                                <Text>Dấu hiệu nhận biết: ならではの</Text>
                            </View>
                        </View>
                    </View>
                    <View style={{ borderBottomWidth: 1, borderBottomColor: '#cccccc', flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'center', minHeight: 60 }}>
                        {listAns()}
                    </View>

                    {/* <View style={{flex: 1}}> */}
                    <View style={{ flex: 3, justifyContent: 'center', alignItems: 'center' }}>
                        <View style={{ flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'center' }}>
                            {listQues()}
                        </View>
                    </View>

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
    boxAns: {
        borderWidth: 1,
        borderColor: '#cccccc',
        padding: 10,
        borderRadius: 15,
        marginRight: 10,
        marginTop: 10,
        marginBottom: 10,

    },
    checkbox: {
        marginTop: 20,
        marginRight: 10,
        color: '#004d00',
        fontWeight: 'bold',
        fontSize: 20

    },
    checkbox1: {
        marginTop: 20,
        marginRight: 10,
        color: '#e60000',
        fontWeight: 'bold',
        fontSize: 20

    },
    boxAnsNo: {
        borderWidth: 1,
        borderColor: '#cccccc',
        padding: 10,
        borderRadius: 15,
        marginRight: 10,
        marginTop: 10,
        marginBottom: 10,
        backgroundColor: '#e6e6e6',
        color: '#e6e6e6'
    }


})