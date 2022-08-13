import React, { Component, useEffect, useState } from 'react'
import { Text, View, SafeAreaView, TouchableOpacity } from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons';
import { useTheme } from 'react-native-paper';
import { element, number } from 'prop-types';
import { ScrollView } from 'react-native-gesture-handler';
import axios from 'axios';
import CustomHeader from '../../../CustomHeader';
import { useSelector, useDispatch } from 'react-redux';

const GrammarTest = ({navigation, route}) => {
    const { colors } = useTheme();

    const {level} = route.params;
    const [chooseTab, setChooseTab] = useState(level);
    const colorBack = ["#0000b3", "#005ce6", "#ff9900", "#00b300", "#e67300"];
    const a = Math.floor(Math.random() * colorBack.length);
    const [data, setData] = useState([]);
    const [datalesstionTest1, setDatalessionTest1] = useState([]);
    const [datalesstionTest2, setDatalessionTest2] = useState([]);
    const [datalesstionTest3, setDatalessionTest3] = useState([]);
    const [datalesstionTest4, setDatalessionTest4] = useState([]);

    // const 
    useEffect(() => {
        console.log('vao day roi nhe');
        console.log(level);
        setChooseTab(level);
    }, [level]);
    useEffect(() => {
        setChooseTab(level);
        // setDatalessionTest1([]);
        axios.get('https://nameless-spire-67072.herokuapp.com/language/getAllQuestionGrammar', {
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json"
            }
        })
            .then((response) => {
                // console.log(response.data.question);
                setData(response.data.question);
                // if (chooseTab === 1) {
                    const dd1 = response.data.question.filter(e => e.level === 5);
                    const max1 = Math.max(...dd1.map(w => w.lession ?? 1));
                    for (var i = 1; i <= max1; i++) {
                        datalesstionTest1.push("Test " + i);

                    }
                    setDatalessionTest1([...datalesstionTest1]);
                // }
                // else if (chooseTab === 2) {
                    const dd2 = response.data.question.filter(e => e.level === 4);
                    const max2 = Math.max(...dd2.map(w => w.lession ?? 1));
                    for (var i = 1; i <= max2; i++) {
                        datalesstionTest2.push("Test " + i);

                    }
                    setDatalessionTest2([...datalesstionTest2]);
                // }
                // else if (chooseTab === 3) {
                    const dd3 = response.data.question.filter(e => e.level === 3);
                    const max3 = Math.max(...dd3.map(w => w.lession ?? 1));
                    for (var i = 1; i <= max3; i++) {
                        datalesstionTest3.push("Test " + i);

                    }
                    setDatalessionTest3([...datalesstionTest3]);
                // }
                // else if (chooseTab === 2) {
                    const dd4 = response.data.question.filter(e => e.level === 2);
                    const max4 = Math.max(...dd4.map(w => w.lession ?? 1));
                    for (var i = 1; i <= max4; i++) {
                        datalesstionTest4.push("Test " + i);

                    }
                    setDatalessionTest4([...datalesstionTest4]);
                // }
                // for (var i = 1; i <= max; i++) {
                //     dataSource.push("bài " + i);

                // }
            })
            .catch(function (error) {
                throw error;
            })
    }, []);
    const testQuestion = (number) => {
        if(chooseTab === 5) {
            const ds = data.filter(e => e.level ===chooseTab&&e.lession === number);
            navigation.navigate("PracticeScreen", {navigation: navigation,dataqs: ds, lession: number});
        }
        else if(chooseTab=== 4) {
            const ds = data.filter(e => e.level ===chooseTab&&e.lession === number);
            navigation.navigate("PracticeScreen", {navigation: navigation,dataqs: ds, lession: number});
        
        }
        else if(chooseTab=== 3) {
            const ds = data.filter(e => e.level ===chooseTab&&e.lession === number);
            navigation.navigate("PracticeScreen", {navigation: navigation,dataqs: ds, lession: number});
        
        }
        else {
            const ds = data.filter(e => e.level ===chooseTab&&e.lession === number);
            navigation.navigate("PracticeScreen", {navigation: navigation,dataqs: ds, lession: number});
        }
    }
    return (
        <View style={{ flex: 1 }}>
            <CustomHeader title={"Kiểm tra ngữ pháp"} navigation={navigation}/>
            <View style={{ flex: 1, }}>
                <View style={{ flexDirection: 'row', justifyContent: 'space-around', padding: 10, borderBottomWidth: 1, borderBottomColor: '#e6e6e6' }}>
                    <TouchableOpacity
                        onPress={() => setChooseTab(5)}
                        style={{ padding: 10, backgroundColor: chooseTab === 5 ? '#e6f0ff' : '#fff', borderRadius: 30 }}>
                        <Text style={{ color: chooseTab === 5 ? '#3333ff' : 'gray' }}>N5</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={() => setChooseTab(4)}
                        style={{ padding: 10, backgroundColor: chooseTab === 4 ? '#e6f0ff' : '#fff', borderRadius: 30 }}>
                        <Text style={{ color: chooseTab === 4 ? '#3333ff' : 'gray' }}>N4</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={() => setChooseTab(3)}
                        style={{ padding: 10, backgroundColor: chooseTab === 3 ? '#e6f0ff' : '#fff', borderRadius: 30 }}>
                        <Text style={{ color: chooseTab === 3 ? '#3333ff' : 'gray' }}>N3</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={() => setChooseTab(2)}
                        style={{ padding: 10, backgroundColor: chooseTab === 2 ? '#e6f0ff' : '#fff', borderRadius: 30 }}>
                        <Text style={{ color: chooseTab === 2 ? '#3333ff' : 'gray' }}>N2</Text>
                    </TouchableOpacity>
                </View>
                <ScrollView style={{ backgroundColor: colors.block }}>
                    <View style={{ margin: 5, backgroundColor: colors.background, }}>
                        {/* <View style={{flexDirection: 'row', paddingTop: 15, paddingLeft: 20, paddingBottom: 15}}>
                            <View style={{backgroundColor: colorBack[a], width:40, height: 40, borderRadius: 20, alignItems: 'center', justifyContent: 'center'}}>
                                <Text style={{fontSize: 18, color: '#fff'}}>1</Text>
                            </View>
                            <View style={{alignItems: 'center', justifyContent: 'center', marginLeft: 20}}>
                                <Text style={{fontSize: 18}}>Test 1</Text>
                            </View>
                        </View> */}
                        {
                            (chooseTab ===5? datalesstionTest1: chooseTab===4? datalesstionTest2: chooseTab===3?datalesstionTest3: datalesstionTest4)
                            .map((element, key) => {
                                return (
                                    <TouchableOpacity key={key} 
                                    onPress={() => testQuestion(key+1)}
                                    style={{ flexDirection: 'row', paddingTop: 15, paddingLeft: 20, paddingBottom: 15, }}>
                                        <View style={{ backgroundColor: colorBack[Math.floor(Math.random() * colorBack.length)], width: 40, height: 40, borderRadius: 20, alignItems: 'center', justifyContent: 'center' }}>
                                            <Text style={{ fontSize: 18, color: '#fff' }}>{key + 1}</Text>
                                        </View>
                                        <View style={{ alignItems: 'center', justifyContent: 'center', marginLeft: 20 }}>
                                            <Text style={{ fontSize: 18, color: colors.text }}>{element}</Text>
                                        </View>
                                    </TouchableOpacity>
                                )
                            })
                        }

                        {/* <View style={{flexDirection: 'row', paddingTop: 15, paddingLeft: 20, paddingBottom: 15}}>
                            <View style={{backgroundColor: colorBack[a], width:40, height: 40, borderRadius: 20, alignItems: 'center', justifyContent: 'center'}}>
                                <Text style={{fontSize: 18, color: '#fff'}}>1</Text>
                            </View>
                            <View style={{alignItems: 'center', justifyContent: 'center', marginLeft: 20}}>
                                <Text style={{fontSize: 18}}>Test 1</Text>
                            </View>
                        </View> */}

                    </View>
                </ScrollView>

            </View>
        </View>
    )
}
export default GrammarTest;

