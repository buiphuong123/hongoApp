import React, { useEffect, useState } from 'react'
import { Text, Alert, TextInput, View, StyleSheet, TouchableOpacity, Image, Dimensions, FlatList } from 'react-native'
import { useSelector, useDispatch } from 'react-redux';
import MasterialIcons from 'react-native-vector-icons/MaterialIcons';
import Iconss from 'react-native-vector-icons/MaterialCommunityIcons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Icon from 'react-native-vector-icons/Ionicons';
import Icons from 'react-native-vector-icons/Fontisto';

import ImagePicker from 'react-native-image-crop-picker';
import axios from 'axios';
import { ScrollView } from 'react-native-gesture-handler';
import CustomHeader from '../../../CustomHeader';
import { useTheme } from 'react-native-paper';

import { getListGrammarLevel } from '../../../../redux/actions/grammar.action';
export default EditGrammar = ({ navigation, route }) => {
    const { colors } = useTheme();

    const dispatch = useDispatch();
    const {word} = route.params;
    const { level, lession } = route.params;
    const grammarlevel = useSelector(state => state.grammarReducer.grammarlevel);
    const [data, setData] = useState(grammarlevel);
    const [grammar, setGrammar] = useState(word.grammar.split("=>")[0]);
    const [mean, setMean] = useState(word.grammar.split("=>")[1]);
    const [explain, setExplain] = useState("");
    const [kindWord, setKindWord] = useState("");
    const [note, setNote] = useState("");
    const [vn, setVn] = useState("");
    const [jp, setJp] = useState("");
    const [uses, setUses] = useState(word.uses);
    const [examples, setExamples] = useState([]);
    const [meanD, setMeanD] = useState("");
    const [hira, setHira] = useState("");
    const [requireEdit, setRequireEdit] = useState(false);
    const [indexEdit, setIndexEdit] = useState(0);
    const [requireUse, setRequireUse] = useState(false);
    const [keyRequireUse, setKeyRequireUse] = useState(0);
    
    useEffect(() => {
        setGrammar(word.grammar.split("=>")[0]);
        setMean(word.grammar.split("=>")[1]);
        setUses(word.uses);
    }, [word]);

    const addExample = () => {
        const a = {};
        a.content = jp;
        a.transcription = vn;
        a.mean = hira;
        examples.push(a);
        setExamples([...examples]);
        setVn("");
        setJp("");
        setHira("");
    }

    const editGrammar = () => {
        const grammars = grammar + "=> " + mean;
        const objIndex = grammarlevel.findIndex(e => e._id ===word._id);
        if(objIndex !==-1) {
            grammarlevel[objIndex].grammar = grammars;
            grammarlevel[objIndex].uses = uses;
            dispatch(getListGrammarLevel([...grammarlevel]));
        }
        navigation.goBack();
        axios.post('https://nameless-spire-67072.herokuapp.com/language/editGrammarNew', {
            "id": word._id,
            "uses": uses,
            "grammar": grammars,
        }, {
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json"
            }
        })
            .then((response) => {
                console.log(response.data);
                if (response.data.code === 1) {
                    console.log('success');

                }
                setGrammar("");
                setMean("");
                setExplain("");
                setKindWord("");
                setNote("");
                setVn("");
                setJp("");
                setHira("");
                setUses([]);
                setExamples([]);
                setMeanD("");
            })
    }

    const deleteExample = (count) => {
        examples.splice(count, 1);
        setExamples([...examples]);
    }
    const editExample = (indexEdit) => {
        examples[indexEdit].content = jp;
        examples[indexEdit].transcription = hira;
        examples[indexEdit].mean = vn;
        setExamples([...examples]);
        setRequireEdit(false);
        setVn("");
        setJp("");
        setHira("");

    }

    const createMeandiff = () => {
        const use = {};
        use.explain = explain;
        use.note = note;
        use.examples = examples;
        use.mean = meanD;
        use.synopsis = kindWord;
        uses.push(use);
        console.log(uses);
        setUses([...uses]);
        setMeanD("");
        setExplain("");
        setNote("");
        setKindWord("");
        setExamples([]);

    }

    const editMeandiff = (keyRequireUse) => {
        const use = {};
        use.explain = explain;
        use.note = note;
        use.examples = examples;
        use.mean = meanD;
        use.synopsis = kindWord;
        uses.push(use);
        console.log(uses);
        setUses([...uses]);
        setMeanD("");
        setExplain("");
        setNote("");
        setKindWord("");
        setExamples([]);
        setRequireUse(false);
        setKeyRequireUse(0);
    }

    const deleteUse = (key) => {
        uses.splice(key, 1);
        setUses([...uses]);
    }



    return (
        <View style={{ flex: 1 }}>
            {/* <CustomHeader title={"Tạo ngữ pháp"} /> */}
            <View style={{ flexDirection: 'row', height: 50, backgroundColor: colors.header, justifyContent: 'space-around' }}>
                <View style={{ flex: 1, justifyContent: 'center' }}>

                    <TouchableOpacity style={{ flexDirection: 'row', alignItems: 'center' }} onPress={() => navigation.goBack()}>
                        <Icon name={'arrow-back'} size={29} style={{ color: '#fff', marginLeft: 5 }} />
                    </TouchableOpacity>
                </View>
                <View style={{ flex: 1.5, justifyContent: 'center' }}>
                    <Text style={{ textAlign: 'center', color: '#fff', fontSize: 18 }}>Chỉnh sửa ngữ pháp </Text>
                </View>

                <TouchableOpacity style={{ flex: 1, justifyContent: 'center' }} onPress={() => editGrammar()}>
                    <Text style={{ textAlign: 'center', color: '#fff', fontSize: 18 }}>Sửa</Text>
                </TouchableOpacity>
                {/* <View style={{flex: 1}}></View> */}
            </View>
            <ScrollView style={{ flex: 2}}>
                <View style={{ justifyContent: 'center', padding: 10, }}>
                    <Text style={{ textAlign: 'center', fontSize: 18, fontWeight: 'bold', color: colors.text }}>Chỉnh sửa ngữ pháp</Text>
                </View>
                <View style={{}}>
                    <View style={{ flexDirection: 'row', padding: 10 }}>
                        <Text style={[styles.text, {color: colors.text}]}>Ngữ pháp</Text>
                        <TextInput
                            style={[styles.inputText,{color: colors.text}]}
                            placeholder="Nhập vào từ"
                            placeholderTextColor= {colors.text_of_input}
                            value={grammar}
                            onChangeText={(text) => setGrammar(text)}

                        />
                    </View>

                    <View style={{ flexDirection: 'row', padding: 10 }}>
                        <Text style={[styles.text, {color: colors.text}]}>Nghĩa</Text>
                        <TextInput
                            style={[styles.inputText, {color: colors.text}]}
                            placeholder="Nhập vào ý nghĩa của ngữ pháp"
                            placeholderTextColor= {colors.text_of_input}
                            value={mean}
                            onChangeText={(text) => setMean(text)}

                        />
                    </View>
                </View>

                {
                    uses.map((element, key) => {
                        return (
                            <View key={key} style={{ marginTop: 10, borderTopWidth: 1, borderTopColor: '#cccccc', marginLeft: 10, }}>
                                <View style={{ flexDirection: 'row', marginTop: 10 }}>
                                    <TouchableOpacity
                                        onPress={() => {
                                            uses.splice(key, 1);
                                            setUses([...uses]);
                                            setRequireUse(true);
                                            setMeanD(element.mean);
                                            setExplain(element.explain);
                                            setKindWord(element.synopsis);
                                            setNote(element.note);
                                            setExamples(element.examples);
                                            setKeyRequireUse(key);
                                        }}
                                        // onPress={() => { setRequireEditComp(true); setBo(element.w); setHv(element.h); setCurrentComp(key) }}
                                        style={{ marginRight: 10, }}>
                                        <AntDesign name={'edit'} size={20} style={{ color: 'gray' }} />
                                    </TouchableOpacity>
                                    <TouchableOpacity
                                        onPress={() => deleteUse(key)}
                                        style={{ marginRight: 10, }}>
                                        <Iconss name={'delete-outline'} size={20} style={{ color: 'red' }} />
                                    </TouchableOpacity>
                                </View>
                                <Text style={{ fontSize: 18, fontWeight: 'bold', marginTop: 10, color: colors.text }}>Cách dùng {key + 1}: </Text>
                                <View style={{ flexDirection: 'row', }}>
                                    <Text style={[styles.text, {color: colors.text}]}>Nghĩa </Text>
                                    <Text style={[styles.textResult, {color: colors.text}]}>{element.mean} </Text>
                                </View>
                                <View style={{ flexDirection: 'row', }}>
                                    <Text style={[styles.text, {color: colors.text}]}>Giải thích </Text>
                                    <Text style={[styles.textResult, {color: colors.text}]}>{element.explain}</Text>
                                </View>
                                <View style={{ flexDirection: 'row', }}>
                                    <Text style={[styles.text, {color: colors.text}]}>Từ loại kết hợp </Text>
                                    <Text style={[styles.textResult, {color: colors.text}]}>{element.synopsis}</Text>
                                </View>
                                <View style={{ flexDirection: 'row', }}>
                                    <Text style={[styles.text, {color: colors.text}]}>Ghi chú </Text>
                                    <Text style={[styles.textResult, {color: colors.text}]}>{element.note}</Text>
                                </View>
                                <Text style={[styles.text, {color: colors.text}]}>Ví dụ</Text>
                                {
                                    element.examples.map((element1, key1) => {
                                        return (
                                            <View key={key1} style={{ marginLeft: 10, marginTop: 10, flexDirection: 'row', justifyContent: 'space-between' }}>
                                                <View style={{ width: '80%' }}>
                                                    <Text style={{color: colors.text}}>{key + 1}. {element1.content}</Text>
                                                    <Text style={{color: colors.text}}> {element1.transcription}</Text>
                                                    <Text style={{color: colors.text}}> {element1.mean}</Text>
                                                </View>
                                                {
                                                    requireUse === true ?
                                                        <View style={{ flexDirection: 'row', width: '20%' }}>
                                                            <TouchableOpacity
                                                                // onPress={() => { setRequireEditComp(true); setBo(element.w); setHv(element.h); setCurrentComp(key) }}
                                                                style={{ marginRight: 10, }}>
                                                                <AntDesign name={'edit'} size={20} style={{ color: 'gray' }} />
                                                            </TouchableOpacity>
                                                            <TouchableOpacity
                                                                onPress={() => deleteExample(key, key1)}
                                                                style={{ marginRight: 10, }}>
                                                                <Iconss name={'delete-outline'} size={20} style={{ color: 'red' }} />
                                                            </TouchableOpacity>
                                                        </View> : null
                                                }

                                            </View>
                                        )
                                    })
                                }
                            </View>
                        )
                    })
                }

                <View style={{ marginTop: 20, borderTopWidth: 1, borderTopColor: '#cccccc', paddingTop: 20 }}>

                    <View style={{ flexDirection: 'row', padding: 10 }}>
                        <Text style={[styles.text, {color: colors.text}]}>Nghĩa </Text>
                        <TextInput
                            style={[styles.inputText, {color: colors.text}]}
                            placeholder="Nhập vào ý nghĩa của ngữ pháp"
                            placeholderTextColor= {colors.text_of_input}
                            value={meanD}
                            onChangeText={(text) => setMeanD(text)}

                        />
                    </View>

                    <View style={{ flexDirection: 'row', padding: 10 }}>
                        <Text style={[styles.text,{color: colors.text}]}>Giải thích</Text>
                        <TextInput
                            multiline={true}
                            numberOfLines={1}
                            style={{color: colors.text, minHeight: 40, width: '70%', borderColor: '#cccccc', padding: 5, borderWidth: 1 }}
                            placeholder="Giải thích ngữ pháp"
                            placeholderTextColor= {colors.text_of_input}
                            value={explain}
                            onChangeText={(text) => setExplain(text)}

                        />
                    </View>

                    <View style={{ flexDirection: 'row', padding: 10 }}>
                        <Text style={[styles.text, {color: colors.text}]}>Từ loại kết hợp</Text>
                        <TextInput
                            multiline={true}
                            numberOfLines={3}
                            style={{color: colors.text, minHeight: 40, width: '70%', borderColor: '#cccccc', padding: 5, borderWidth: 1 }}
                            placeholder="Từ kết hợp"
                            placeholderTextColor= {colors.text_of_input}
                            value={kindWord}
                            onChangeText={(text) => setKindWord(text)}

                        />
                    </View>

                    <View style={{ flexDirection: 'row', padding: 10 }}>
                        <Text style={[styles.text, {color: colors.text}]}>Ghi chú</Text>
                        <TextInput
                            multiline={true}
                            numberOfLines={3}
                            style={{color: colors.text, minHeight: 40, width: '70%', borderColor: '#cccccc', padding: 5, borderWidth: 1 }}
                            placeholder="Ghi chú"
                            placeholderTextColor= {colors.text_of_input}
                            value={note}
                            onChangeText={(text) => setNote(text)}

                        />
                    </View>


                    <View style={{ padding: 10 }}>
                        <Text style={[styles.text, {color: colors.text}]}>Ví dụ</Text>
                        {/* <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}> */}
                        <View>
                            <View style={{ flexDirection: 'row' }}>
                                <Text style={{ marginTop: 15, color: colors.text }}>jp</Text>
                                <TextInput
                                    style={{color: colors.text, marginLeft: 10, borderBottomWidth: 1, paddingBottom: -10, width: '90%' }}
                                    placeholder="Nhập ví dụ của từ"
                                    placeholderTextColor= {colors.text_of_input}
                                    value={jp}
                                    onChangeText={(text) => setJp(text)}

                                />
                            </View>
                            <View style={{ flexDirection: 'row' }}>
                                <Text style={{ marginTop: 15, color: colors.text }}>furi</Text>
                                <TextInput
                                    style={{color: colors.text, marginLeft: 10, borderBottomWidth: 1, paddingBottom: -10, width: '90%' }}
                                    placeholder="Nhập phiên âm của ví dụ"
                                    placeholderTextColor= {colors.text_of_input}
                                    value={hira}
                                    onChangeText={(text) => setHira(text)}
                                />
                            </View>
                            <View style={{ flexDirection: 'row' }}>
                                <Text style={{ marginTop: 15, color: colors.text }}>vn</Text>
                                <TextInput
                                    style={{ color: colors.text, marginLeft: 10, borderBottomWidth: 1, paddingBottom: -10, width: '90%' }}
                                    placeholder="Nhập nghĩa của ví dụ"
                                    placeholderTextColor= {colors.text_of_input}
                                    value={vn}
                                    onChangeText={(text) => setVn(text)}
                                />
                            </View>
                        </View>
                        {
                            requireEdit === false ?
                                <TouchableOpacity
                                    onPress={() => addExample()}
                                    style={{ padding: 8, backgroundColor: colors.header, height: 40, minWidth: 40, justifyContent: 'center', marginTop: 10, alignSelf: 'center' }} >
                                    <Text style={{ color: '#fff' }}>Add</Text>
                                </TouchableOpacity>
                                :
                                <TouchableOpacity
                                    onPress={() => editExample(indexEdit)}
                                    style={{ padding: 8, backgroundColor: colors.header, height: 40, minWidth: 40, justifyContent: 'center', marginTop: 10, alignSelf: 'center' }} >
                                    <Text style={{ color: '#fff' }}>Edit</Text>
                                </TouchableOpacity>
                        }

                        {/* </View> */}
                        {
                            examples.map((element, key) => {
                                return (
                                    <View key={key} style={{ marginLeft: 10, marginTop: 10, flexDirection: 'row', justifyContent: 'space-between' }}>
                                        <View style={{ width: '80%' }}>
                                            <Text style={{color: colors.text}}>{key + 1}. {element.content}</Text>
                                            <Text style={{color: colors.text}}> {element.transcription}</Text>
                                            <Text style={{color: colors.text}}> {element.mean}</Text>
                                        </View>
                                        {/* <TouchableOpacity
                                            onPress={() => deleteExample(key)}
                                            style={{ marginRight: 10 }}>
                                            <Iconss name={'delete-outline'} size={20} style={{ color: 'red' }} />
                                        </TouchableOpacity> */}
                                        <View style={{ flexDirection: 'row', width: '20%' }}>
                                            <TouchableOpacity
                                                onPress={() => { setRequireEdit(true); setVn(element.mean); setJp(element.content); setHira(element.transcription); setIndexEdit(key) }}
                                                // onPress={() => { setRequireEditComp(true); setBo(element.w); setHv(element.h); setCurrentComp(key) }}
                                                style={{ marginRight: 10, }}>
                                                <AntDesign name={'edit'} size={20} style={{ color: 'gray' }} />
                                            </TouchableOpacity>
                                            <TouchableOpacity
                                                onPress={() => deleteExample(key)}
                                                style={{ marginRight: 10, }}>
                                                <Iconss name={'delete-outline'} size={20} style={{ color: 'red' }} />
                                            </TouchableOpacity>
                                        </View>
                                    </View>
                                )
                            })
                        }


                    </View>


                </View>
                {
                    requireUse === false ?
                        <TouchableOpacity
                            onPress={() => createMeandiff()}
                            style={{ backgroundColor: colors.header, marginTop: 20, alignSelf: 'center', justifyContent: 'center', height: 40, padding: 10, marginBottom: 20 }}>
                            <Text style={{ textAlign: 'center', color: '#fff' }}>Thêm nghĩa</Text>
                        </TouchableOpacity>
                        :
                        <TouchableOpacity
                            onPress={() => editMeandiff()}
                            style={{ backgroundColor: colors.header, marginTop: 20, alignSelf: 'center', justifyContent: 'center', height: 40, padding: 10, marginBottom: 20 }}>
                            <Text style={{ textAlign: 'center', color: '#fff' }}>Sửa nghĩa</Text>
                        </TouchableOpacity>

                }


                {/* {
                    uses.map((element, key) => {
                        return ( */}
                {/* <View style={{ marginTop: 10, borderTopWidth: 1, borderTopColor: '#cccccc', paddingTop: 20 }}>
                                <View style={{ flexDirection: 'row', padding: 10 }}>
                                    <Text style={styles.text}>Nghĩa </Text>
                                    <Text style={styles.textResult}>askdjfa </Text>
                                </View>
                            </View> */}
                {/* )
                    })
                } */}
            </ScrollView>
        </View>
    )
}

const styles = StyleSheet.create({
    text: {
        width: '20%', marginTop: 10, fontWeight: 'bold'
    },
    inputText: {
        borderWidth: 1, height: 40, width: '70%', borderColor: '#cccccc', padding: 5
    },
    textResult: {
        width: '70%', marginTop: 10
    }
})