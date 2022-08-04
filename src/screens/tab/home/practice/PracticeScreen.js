import React, { Component, useEffect, useState } from 'react'
import { Text, View, SafeAreaView, TouchableOpacity } from 'react-native'
import CustomHeader from '../../../CustomHeader'
import Icon from 'react-native-vector-icons/Ionicons';
import { useTheme } from 'react-native-paper';
import { element } from 'prop-types';
import { ScrollView } from 'react-native-gesture-handler';
import axios from 'axios';
const PracticeScreen = ({navigation, route}) => {
    const { colors } = useTheme();
    const {dataqs} = route.params;
    // const [data, setData] = useState(dataqs);
    
    const [listques, setlistques] = useState([]);
    useEffect(() => {
        // setlistques(dataqs);
        setlistques( dataqs.map((obj, i) => ({ ...obj, choose: undefined })));
    }, [dataqs, navigation]);
    const [checkTest, setCheckTest] = useState(false);
    const [count, setCount] = useState(0);
    const chooseAns = (question, choo) => {
        const objIndex = listques.findIndex(e => e._id === question._id);
        const objIndex1 = listques[objIndex].listAns.indexOf(choo);
        listques[objIndex].choose = objIndex1;
        setlistques([...listques]);
    }
    const submitTest = () => {
        const count = listques.filter(e => e.answer === e.choose);
        setCount(count.length);
        setCheckTest(true);
    }
    const replayTest = () => {
        console.log(dataqs);
        setlistques( dataqs.map((obj, i) => ({ ...obj, choose: undefined })));
        setCheckTest(false);
    }
  
    // const check = () => {
    //     if(checkTest === true) {
    //         if(ke1!== element.answer&&key1 !==element.choose)
    //         // && key1!==element.answer && 
    //         // element.answer!== element.choose? 
    //         // 'red': checkTest=== false&& element.choose === key1 ? 'blue' : 'black'
    //     // }
    // }
    return (
        <View style={{ flex: 1,}}>
            <View style={{ flexDirection: 'row', height: 50, backgroundColor: colors.header, justifyContent: 'flex-start' }}>
                <View style={{ justifyContent: 'center' }}>
                    <TouchableOpacity style={{ flexDirection: 'row', alignItems: 'center' }} onPress={() => {navigation.goBack();replayTest()}}>
                        <Icon name={'arrow-back'} size={29} style={{ color: '#fff', marginLeft: 5 }} />
                    </TouchableOpacity>
                </View>
                <View style={{ justifyContent: 'center' }}>
                    <Text style={{ textAlign: 'center', color: '#fff', fontSize: 18, marginLeft: 10 }}>Test 1</Text>
                </View>
                <View style={{ flex: 5, flexDirection: 'row', marginRight: 20, justifyContent: 'flex-end' }}>
                    {checkTest === false ?
                        <TouchableOpacity style={{ justifyContent: 'center' }} onPress={() => submitTest()}>
                            <Text style={{ textAlign: 'center', color: '#fff', fontSize: 18 }}>Nộp bài </Text>
                        </TouchableOpacity>
                        : 
                        <TouchableOpacity style={{ justifyContent: 'center' }} onPress={() => replayTest()}>
                            <Text style={{ textAlign: 'center', color: '#fff', fontSize: 18 }}>Làm lại</Text>
                        </TouchableOpacity>
                    }
                </View>
            </View>
            <ScrollView style={{ paddingLeft: 10,   }}>
                <View>
                    {checkTest === true ?
                        <View style={{ justifyContent: 'center' }}>
                            <Text style={{ fontWeight: 'bold', fontSize: 18, textAlign: 'center', marginBottom: 10, color: colors.text }}>Banj đã trả lời đúng: {count}/{listques.length} câu hỏi</Text>
                        </View>
                        : null}
                    {listques.map((element, key) => {
                        return (
                            <View key={key}>
                                <View>
                                    <Text style={{ color: colors.question, fontSize: 17, marginTop: 10 }}>{key +1}. {element.question}</Text>
                                    {
                                        element.listAns.map((item, key1) => {
                                             return (
                                                <View>
                                                    <TouchableOpacity key={key1} onPress={() => chooseAns(element, item)} style={{ paddingTop: 5, paddingLeft: 5 }}>
                                                       
                                                        <Text 
                                                        style={{ color: checkTest===true&& key1 === element.answer ? colors.question: (checkTest===true&& key1!==element.answer&&key1===element.choose)? 'red': checkTest=== false&& element.choose === key1 ? colors.question: colors.text}}>{item}</Text>
                                                    </TouchableOpacity>
                                                    {
                                                        checkTest === true && key1 === 3 ?
                                                            <View style={{ marginBottom: 10 }}>
                                                                <Text style={{ fontWeight: 'bold', color: colors.text }}>Đáp án đúng: {element.listAns[element.answer]}</Text>
                                                                <View  style={{marginBottom: 10}}>
                                                                    <View style={{flexDirection: 'row', flexWrap: 'wrap'}}>
                                                                    <Text style={{color: colors.text}}>Dịch nghĩa : </Text>
                                                                    <Text style={{color: 'red', fontStyle: 'italic',}}>{element.explain}</Text>
                                                                    </View>
                                                                    {
                                                                        element.data !== undefined  ?
                                                                    
                                                                    <TouchableOpacity onPress={() => navigation.navigate("ExplainScreen", {word: element.data})}>
                                                                        <Text style={{textDecorationLine: 'underline', color: colors.question}}>giải thích chi tiết ngữ pháp</Text>
                                                                    </TouchableOpacity>
                                                                    : null}
                                                                </View>
                                                            </View>
                                                            : null
                                                    }
                                                </View>
                                            )
                                        })
                                    }

                                </View>
                            </View>
                        )
                    })}
                </View>
            </ScrollView>

        </View>
    )
}
export default PracticeScreen;