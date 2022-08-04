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
import { getListGrammarLevel } from '../../../../redux/actions/grammar.action';
export default addGrammarVoca = ({ navigation, route }) => {
    const dispatch = useDispatch();
    const { grammardata } = route.params;
    const [grammarele, setGrammarele] = useState(grammardata);
    const grammarlevel = useSelector(state => state.grammarReducer.grammarlevel);
    const [data, setData] = useState(grammarlevel);
    const [grammar, setGrammar] = useState(grammarele.word);
    const [mean, setMean] = useState(grammarele.vn);
    const [explain, setExplain] = useState("");
    const [kindWord, setKindWord] = useState("");
    const [note, setNote] = useState("");
    const [vn, setVn] = useState("");
    const [jp, setJp] = useState("");
    const [uses, setUses] = useState([]);
    const [examples, setExamples] = useState([]);
    const [meanD, setMeanD] = useState("");
    const [hira, setHira] = useState("");
    const [requireEdit, setRequireEdit] = useState(false);
    const [indexEdit, setIndexEdit] = useState(0);
    const [requireUse, setRequireUse] = useState(false);
    const [keyRequireUse, setKeyRequireUse] = useState(0);
    useEffect(() => {
        setGrammarele(grammardata);
        setGrammar(grammardata.word);
        setMean(grammardata.vn);
    }, [grammardata]);

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

    const createGrammar = () => {
        const grammars = grammar + "=> " + mean;
        console.log('GRAMMARS LA' , grammars);
        console.log('tach la ', grammars.split("=>")[0]);
        console.log('tach la ', grammars.split("=>")[1]);
        axios.post('https://nameless-spire-67072.herokuapp.com/language/createGrammarNew', {
            "uses": uses,
            "level": level,
            "grammar": grammars,
            "lession": lession,
        }, {
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json"
            }
        })
            .then((response) => {
                console.log(response.data);
                if (response.data.code === 1) {
                    const grammarr = response.data.grammar;
                    grammarr.memerizes = [];
                    setData([...data.concat(grammarr)]);
                    dispatch(getListGrammarLevel(data.concat(grammarr)));

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
                navigation.goBack();
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
            <View style={{ flexDirection: 'row', height: 50, backgroundColor: '#009387', justifyContent: 'space-around' }}>
                <View style={{ flex: 1, justifyContent: 'center' }}>

                    <TouchableOpacity style={{ flexDirection: 'row', alignItems: 'center' }} onPress={() => navigation.goBack()}>
                        <Icon name={'arrow-back'} size={29} style={{ color: '#fff', marginLeft: 5 }} />
                    </TouchableOpacity>
                </View>
                <View style={{ flex: 1.5, justifyContent: 'center' }}>
                    <Text style={{ textAlign: 'center', color: '#fff', fontSize: 18 }}>Tạo ngữ pháp </Text>
                </View>

                <TouchableOpacity style={{ flex: 1, justifyContent: 'center' }} onPress={() => createGrammar()}>
                    <Text style={{ textAlign: 'center', color: '#fff', fontSize: 18 }}>Tạo</Text>
                </TouchableOpacity>
                {/* <View style={{flex: 1}}></View> */}
            </View>
            <ScrollView style={{ flex: 2}}>
                <View style={{ justifyContent: 'center', padding: 10, }}>
                    <Text style={{ textAlign: 'center', fontSize: 18, fontWeight: 'bold' }}>Tạo ngữ pháp mới</Text>
                </View>
                <View style={{}}>
                <View style={{ flexDirection: 'row', padding: 10 }}>
                        <Text style={styles.text}>Ghi chú</Text>
                        <TextInput
                            style={[styles.inputText, {minHeight: 60}]}
                            value={grammarele.note}
                            multiline={true}
                            numberOfLines={4}
                            // onChangeText={(text) => setWord(text)}

                        />
                    </View>
                    <View style={{ flexDirection: 'row', padding: 10 }}>
                        <Text style={styles.text}>Ngữ pháp</Text>
                        <TextInput
                            style={styles.inputText}
                            placeholder="Nhập vào từ"
                            value={grammar}
                            onChangeText={(text) => setGrammar(text)}

                        />
                    </View>

                    <View style={{ flexDirection: 'row', padding: 10 }}>
                        <Text style={styles.text}>Nghĩa</Text>
                        <TextInput
                            style={styles.inputText}
                            placeholder="Nhập vào ý nghĩa của ngữ pháp"
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
                                <Text style={{ fontSize: 18, fontWeight: 'bold', marginTop: 10 }}>Cách dùng {key + 1}: </Text>
                                <View style={{ flexDirection: 'row', }}>
                                    <Text style={styles.text}>Nghĩa </Text>
                                    <Text style={styles.textResult}>{element.mean} </Text>
                                </View>
                                <View style={{ flexDirection: 'row', }}>
                                    <Text style={styles.text}>Giải thích </Text>
                                    <Text style={styles.textResult}>{element.explain}</Text>
                                </View>
                                <View style={{ flexDirection: 'row', }}>
                                    <Text style={styles.text}>Từ loại kết hợp </Text>
                                    <Text style={styles.textResult}>{element.synopsis}</Text>
                                </View>
                                <View style={{ flexDirection: 'row', }}>
                                    <Text style={styles.text}>Ghi chú </Text>
                                    <Text style={styles.textResult}>{element.note}</Text>
                                </View>
                                <Text style={styles.text}>Ví dụ</Text>
                                {
                                    element.examples.map((element1, key1) => {
                                        return (
                                            <View key={key1} style={{ marginLeft: 10, marginTop: 10, flexDirection: 'row', justifyContent: 'space-between' }}>
                                                <View style={{ width: '80%' }}>
                                                    <Text>{key + 1}. {element1.content}</Text>
                                                    <Text> {element1.transcription}</Text>
                                                    <Text> {element1.mean}</Text>
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
                        <Text style={styles.text}>Nghĩa </Text>
                        <TextInput
                            style={styles.inputText}
                            placeholder="Nhập vào ý nghĩa của ngữ pháp"
                            value={meanD}
                            onChangeText={(text) => setMeanD(text)}

                        />
                    </View>

                    <View style={{ flexDirection: 'row', padding: 10 }}>
                        <Text style={styles.text}>Giải thích</Text>
                        <TextInput
                            multiline={true}
                            numberOfLines={1}
                            style={{ minHeight: 40, width: '70%', borderColor: '#cccccc', padding: 5, borderWidth: 1 }}
                            placeholder="Giải thích ngữ pháp"
                            value={explain}
                            onChangeText={(text) => setExplain(text)}

                        />
                    </View>

                    <View style={{ flexDirection: 'row', padding: 10 }}>
                        <Text style={styles.text}>Từ loại kết hợp</Text>
                        <TextInput
                            multiline={true}
                            numberOfLines={3}
                            style={{ minHeight: 40, width: '70%', borderColor: '#cccccc', padding: 5, borderWidth: 1 }}
                            placeholder="Từ kết hợp"
                            value={kindWord}
                            onChangeText={(text) => setKindWord(text)}

                        />
                    </View>

                    <View style={{ flexDirection: 'row', padding: 10 }}>
                        <Text style={styles.text}>Ghi chú</Text>
                        <TextInput
                            multiline={true}
                            numberOfLines={3}
                            style={{ minHeight: 40, width: '70%', borderColor: '#cccccc', padding: 5, borderWidth: 1 }}
                            placeholder="Ghi chú"
                            value={note}
                            onChangeText={(text) => setNote(text)}

                        />
                    </View>


                    <View style={{ padding: 10 }}>
                        <Text style={styles.text}>Ví dụ</Text>
                        {/* <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}> */}
                        <View>
                            <View style={{ flexDirection: 'row' }}>
                                <Text style={{ marginTop: 15 }}>jp</Text>
                                <TextInput
                                    style={{ marginLeft: 10, borderBottomWidth: 1, paddingBottom: -10, width: '90%' }}
                                    placeholder="Nhập ví dụ của từ"
                                    value={jp}
                                    onChangeText={(text) => setJp(text)}

                                />
                            </View>
                            <View style={{ flexDirection: 'row' }}>
                                <Text style={{ marginTop: 15 }}>furi</Text>
                                <TextInput
                                    style={{ marginLeft: 10, borderBottomWidth: 1, paddingBottom: -10, width: '90%' }}
                                    placeholder="Nhập phiên âm của ví dụ"
                                    value={hira}
                                    onChangeText={(text) => setHira(text)}
                                />
                            </View>
                            <View style={{ flexDirection: 'row' }}>
                                <Text style={{ marginTop: 15 }}>vn</Text>
                                <TextInput
                                    style={{ marginLeft: 10, borderBottomWidth: 1, paddingBottom: -10, width: '90%' }}
                                    placeholder="Nhập nghĩa của ví dụ"
                                    value={vn}
                                    onChangeText={(text) => setVn(text)}
                                />
                            </View>
                        </View>
                        {
                            requireEdit === false ?
                                <TouchableOpacity
                                    onPress={() => addExample()}
                                    style={{ padding: 8, backgroundColor: 'blue', height: 40, minWidth: 40, justifyContent: 'center', marginTop: 10, alignSelf: 'center' }} >
                                    <Text style={{ color: '#fff' }}>Add</Text>
                                </TouchableOpacity>
                                :
                                <TouchableOpacity
                                    onPress={() => editExample(indexEdit)}
                                    style={{ padding: 8, backgroundColor: 'blue', height: 40, minWidth: 40, justifyContent: 'center', marginTop: 10, alignSelf: 'center' }} >
                                    <Text style={{ color: '#fff' }}>Edit</Text>
                                </TouchableOpacity>
                        }

                        {/* </View> */}
                        {
                            examples.map((element, key) => {
                                return (
                                    <View key={key} style={{ marginLeft: 10, marginTop: 10, flexDirection: 'row', justifyContent: 'space-between' }}>
                                        <View style={{ width: '80%' }}>
                                            <Text>{key + 1}. {element.content}</Text>
                                            <Text> {element.transcription}</Text>
                                            <Text> {element.mean}</Text>
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
                            style={{ backgroundColor: '#8080ff', marginTop: 20, alignSelf: 'center', justifyContent: 'center', height: 40, padding: 10, marginBottom: 20 }}>
                            <Text style={{ textAlign: 'center', color: '#fff' }}>Thêm nghĩa</Text>
                        </TouchableOpacity>
                        :
                        <TouchableOpacity
                            onPress={() => editMeandiff()}
                            style={{ backgroundColor: '#8080ff', marginTop: 20, alignSelf: 'center', justifyContent: 'center', height: 40, padding: 10, marginBottom: 20 }}>
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