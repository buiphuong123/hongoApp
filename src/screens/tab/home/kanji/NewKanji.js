import React, { useEffect, useState } from 'react'
import { Text, Alert, TextInput, View, StyleSheet, TouchableOpacity, Image, Dimensions, FlatList } from 'react-native'
import { useSelector, useDispatch } from 'react-redux';
import MasterialIcons from 'react-native-vector-icons/MaterialIcons';
import Iconss from 'react-native-vector-icons/MaterialCommunityIcons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import ImagePicker from 'react-native-image-crop-picker';
import axios from 'axios';
import { ScrollView } from 'react-native-gesture-handler';
import CustomHeader from '../../../CustomHeader';
import { getListKanjiLevel } from '../../../../redux/actions/kanji.action';
import { useTheme } from 'react-native-paper';

export default NewKanji = ({ navigation, route }) => {
    const { colors } = useTheme();

    const dispatch = useDispatch();
    const { level, lession } = route.params;
    const kanjilevel = useSelector(state => state.kanjiReducer.kanjilevel);
    const [data, setData] = useState(kanjilevel);
    const [kanji, setKanji] = useState("");
    const [on, setOn] = useState("");
    const [kun, setKun] = useState("");
    const [mean, setMean] = useState("");
    const [detail, setDetail] = useState("");
    const [explain, setExplain] = useState("");
    const [vn, setVn] = useState("");
    const [jp, setJp] = useState("");
    const [furi, setFuri] = useState("");
    const [examples, setExamples] = useState([]);
    const [pa, setpa] = useState("");
    const [exampleOn, setExampleOn] = useState({});
    const [exampleKun, setExampleKun] = useState({});
    const [images, setImages] = useState("");
    const [editEx, setEditEx] = useState({});
    const [requireEdit, setRequireEdit] = useState(false);
    const [deletevalue, setDeleteValue] = useState("");
    const [compKanji, setCompKanji] = useState([]);
    const [bo, setBo] = useState("");
    const [hv, setHv] = useState("");
    const [currentComp, setCurrentComp] = useState(0); 
    const [requireEditComp, setRequireEditComp] = useState(false);
    const addExample = () => {
        if (kun.includes(pa) === true) {
            const a = {};
            a.p = jp;
            a.m = vn;
            a.w = furi;
            if (exampleKun[pa] === undefined) {
                exampleKun[pa] = [];
                exampleKun[pa].push(a);
                setExampleKun({ ...exampleKun });
            }
            else {
                exampleKun[pa].push(a);
                setExampleKun({ ...exampleKun });
            }
        }
        else if (on.includes(pa) === true) {
            const b = {};
            b.p = jp;
            b.m = vn;
            b.w = furi;
            if (exampleOn[pa] === undefined) {
                exampleOn[pa] = [];
                exampleOn[pa].push(b);
                setExampleOn({ ...exampleOn });
            }
            else {
                exampleOn[pa].push(b);
                setExampleOn({ ...exampleOn });
            }
        }
        setJp("");
        setVn("");
        setFuri("");
        setpa("");
    }

    const addImage = () => {
        ImagePicker.openPicker({
            width: 100,
            height: 100,
            cropping: true,
        }).then((image) => {
            var photo = {
                uri: image.path,
                type: image.mime,
                name: image.path.split('/').pop(),
            };
            const formData = new FormData();
            formData.append("file", photo);
            formData.append("upload_preset", "kbihuaf8");
            axios.post("https://api.cloudinary.com/v1_1/languageword/image/upload", formData).then((response) => {

                setImages(response.data.url);

            });
        }).catch((error) => {
            console.log(`loi ${error}`);
        });
    }

    const createKanji = () => {
        const kanji_on = [];
        kanji_on.push(on);
        const kanji_kun = [];
        kanji_kun.push(kun);
        axios.post('https://nameless-spire-67072.herokuapp.com/language/createKanjiNew', {
            "kanji": kanji,
            "mean": mean,
            "detail": detail,
            "kanji_on": kanji_on,
            "kanji_kun": kanji_kun,
            "example_on": exampleOn,
            "example_kun": exampleKun,
            "images": images,
            "explain": explain,
            "lession": lession,
            "level": level,
            "compDetail" : compKanji
        }, {
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json"
            }
        })
            .then((response) => {
                console.log(response.data);
                if (response.data.code === 1) {
                    const kanjiii = response.data.kanji;
                    kanjiii.likes = [];
                    kanjiii.memerizes = [];
                    setData([...data.concat(kanjiii)]);
                    dispatch(getListKanjiLevel(data.concat(kanjiii)));
                }
                setKanji("");
                setMean("");
                setDetail("");
                setOn("");
                setKun("");
                setExampleOn({});
                setExampleKun({});
                setImages("");
                setExampleKun("");
                setCompKanji([]);
                navigation.goBack();
            })
            .catch(function (error) {
                throw error;
            })


    }
    const editExample = () => {
        const type = editEx.type;
        const key1 = editEx.key1;
        const key = editEx.key;
        if (type === "on") {
            exampleOn[key1][key].vn = vn;
            exampleOn[key1][key].jp = jp;
            exampleOn[key1][key].furi = furi;
            setExampleOn({ ...exampleOn });
        }
        else if (type === "kun") {
            exampleKun[key1][key].vn = vn;
            exampleKun[key1][key].jp = jp;
            exampleKun[key1][key].furi = furi;
            setExampleKun({ ...exampleKun });
        }
        setJp("");
        setVn("");
        setFuri("");
        setpa("");
        setRequireEdit(false);
        setEditEx({});
    }

    const deleteKanji = (type, key1, key) => {
        if (type === "on") {
            exampleOn[key1].splice(key, 1);
            setExampleOn({ ...exampleOn });
        }
        else if (type === "kun") {
            exampleKun[key1].splice(key, 1);
            setExampleKun({ ...exampleKun });
        }
    }

    const addCompKanji = () => {
        const a = {};
        a.w = bo;
        a.h = hv;
        compKanji.push(a);
        setCompKanji([...compKanji]);
        setBo("");
        setHv("");
    }

    const editCompKanji = () => {
        compKanji[currentComp].h = bo;
        compKanji[currentComp].w = hv;
        setCompKanji([...compKanji]);
        setBo("");
        setHv("");
        setCurrentComp(0);
        setRequireEditComp(false);
    }

    const deleteComp = (key) => {
        compKanji.splice(key, 1);
        setCompKanji([...compKanji]);
    }

    return (
        <View style={{ flex: 1 }}>
            <CustomHeader title={"Tạo chữ hán"} navigation={navigation} />
            <ScrollView style={{ flex: 1 }}>
                <View style={{ justifyContent: 'center', padding: 10, }}>
                    <Text style={{ textAlign: 'center', fontSize: 18, fontWeight: 'bold', color: colors.text }}>Tạo chữ hán mới</Text>
                </View>
                <View style={{}}>
                    <View style={{ flexDirection: 'row', padding: 10 }}>
                        <Text style={[styles.text, {color: colors.text}]}>Kanji</Text>
                        <TextInput
                            style={[styles.inputText, {color: colors.text}]}
                            placeholder="Nhập vào kanji"
                            placeholderTextColor= {colors.text_of_input}
                            value={kanji}
                            onChangeText={(text) => setKanji(text)}

                        />
                    </View>

                    <View style={{ flexDirection: 'row', padding: 10 }}>
                        <Text style={[styles.text, {color: colors.text}]}>Nghĩa</Text>
                        <TextInput
                            style={[styles.inputText, {color: colors.text}]}
                            placeholder="Nhập nghãi hán tự kanji"
                            placeholderTextColor= {colors.text_of_input}

                            value={mean}
                            onChangeText={(text) => setMean(text)}

                        />
                    </View>

                    <View style={{ flexDirection: 'row', padding: 10 }}>
                        <Text style={[styles.text, {color: colors.text}]}>Giải thích</Text>
                        <TextInput
                            style={{color: colors.text, height: 40, width: '70%', borderColor: '#cccccc', padding: 5, borderWidth: 1 }}
                            placeholder="Nhập giải thích kanji"
                            value={detail}
                            placeholderTextColor= {colors.text_of_input}
                            multiline={true}
                            numberOfLines={1}
                            onChangeText={(text) => setDetail(text)}

                        />
                    </View>

                    <View style={{ flexDirection: 'row', padding: 10 }}>
                        <Text style={[styles.text, {color: colors.text}]}>Am on</Text>
                        <TextInput
                            style={[styles.inputText, {color: colors.text}]}
                            placeholder="Nhập âm on kanji"
                            placeholderTextColor= {colors.text_of_input}
                            value={on}
                            onChangeText={(text) => setOn(text)}

                        />
                    </View>
                    <View style={{ flexDirection: 'row', padding: 10 }}>
                        <Text style={[styles.text, {color: colors.text}]}>Âm kun</Text>
                        <View style={{ width: '70%' }}>
                            <TextInput
                                style={{color: colors.text, borderWidth: 1, height: 40, borderColor: '#cccccc', padding: 5 }}
                                // style={styles.inputText}
                                placeholder="Nhập âm kun kanji"
                                placeholderTextColor= {colors.text_of_input}
                                value={kun}
                                onChangeText={(text) => setKun(text)}
                            />
                            <Text style={{color: colors.text}}>ghi chú: các từ cách nhau bởi dấu cách </Text>
                        </View>

                    </View>

                    <View style={{ padding: 10 }}>
                        <Text style={{ fontWeight: 'bold', color: colors.text }}>Bộ thành phần </Text>
                        <View>
                            <View style={{ flexDirection: 'row' }}>
                                <Text style={{ marginTop: 15, width: '20%', color: colors.text }}>Bộ</Text>
                                <TextInput
                                    style={{color: colors.text, marginLeft: 10, borderBottomWidth: 1,borderBottomColor: colors.text_of_input, paddingBottom: -10, width: '60%' }}
                                    placeholder="Nhập bộ"
                                    placeholderTextColor= {colors.text_of_input}
                                    value={bo}
                                    onChangeText={(text) => setBo(text)}

                                />

                            </View>
                            <View style={{ flexDirection: 'row' }}>

                                <Text style={{ marginTop: 15, width: '20%', color: colors.text }}>Hán Việt</Text>
                                <TextInput
                                    style={{color: colors.text, marginLeft: 10, borderBottomWidth: 1, borderBottomColor: colors.text_of_input,paddingBottom: -10, width: '60%' }}
                                    placeholder="Nhập âm hán việt của bộ"
                                    placeholderTextColor= {colors.text_of_input}
                                    value={hv}
                                    onChangeText={(text) => setHv(text)}

                                />
                            </View>
                        </View>
                        {requireEditComp === false ?
                        <TouchableOpacity
                            onPress={() => addCompKanji()}
                            style={{marginTop: 20, padding: 8, backgroundColor: colors.header,marginLeft: 10, height: 40, width: 50, justifyContent: 'center', marginRight: 5 }} >
                            <Text style={{ color: '#fff' }}>Add</Text>
                        </TouchableOpacity>
                        : 
                        <TouchableOpacity
                            onPress={() => editCompKanji()}
                            style={{marginTop: 20,  padding: 8, backgroundColor: colors.header,marginLeft: 10, height: 40, width:50, justifyContent: 'center', marginRight: 5 }} >
                            <Text style={{ color: '#fff' }}>Edit</Text>
                        </TouchableOpacity>
}


                    </View>
                    {
                        compKanji.map((element, key) => {
                            return (
                                <View key={key} style={{ flexDirection: 'row', justifyContent: 'space-between',  }}>
                                    <View style={{ width: '80%' }}>
                                        <Text style={{color: colors.text, marginLeft: 10}}>{key + 1}. {element.w} : {element.h}</Text>

                                    </View>
                                    <View style={{ flexDirection: 'row', width: '18%', }}>
                                        <TouchableOpacity
                                            onPress={() =>{setRequireEditComp(true); setBo(element.w); setHv(element.h); setCurrentComp(key)}}
                                            style={{ marginRight: 5 }} >
                                            <AntDesign name={'edit'} size={20} style={{ color: colors.text }} />
                                        </TouchableOpacity>
                                        <TouchableOpacity onPress={() => deleteComp(key)} style={{marginRight: 10}} >
                                            <Iconss name={'delete-outline'} size={20} style={{ color: 'red', marginLeft: 10 }} />
                                        </TouchableOpacity>
                                    </View>
                                </View>
                            )
                        })
                    }

                    <View style={{ padding: 10 }}>
                        <Text style={[styles.text, {color: colors.text}]}>Ví dụ</Text>
                        <View style={{ flexDirection: 'row' }}>
                            <View>
                                <View style={{ flexDirection: 'row' }}>
                                    <Text style={{ marginTop: 15, color: colors.text }}>Phiên âm</Text>
                                    <TextInput
                                        style={{ color: colors.text, marginLeft: 10, borderBottomWidth: 1,borderBottomColor: colors.text_of_input, paddingBottom: -10, maxWidth: '60%' }}
                                        placeholder="Nhập phiên âm"
                                        placeholderTextColor= {colors.text_of_input}
                                        value={pa}
                                        editable={requireEdit === true ? false : true}
                                        onChangeText={(text) => setpa(text)}

                                    />
                                </View>

                                <View style={{ flexDirection: 'row' }}>
                                    <Text style={{ marginTop: 15, color: colors.text }}>jp</Text>
                                    <TextInput
                                        style={{color: colors.text, marginLeft: 10,borderBottomColor: colors.text_of_input, borderBottomWidth: 1, paddingBottom: -10, minWidth: '80%' }}
                                        placeholder="Nhập ví dụ của từ"
                                        placeholderTextColor= {colors.text_of_input}
                                        value={jp}
                                        onChangeText={(text) => setJp(text)}

                                    />
                                </View>

                                <View style={{ flexDirection: 'row' }}>
                                    <Text style={{ marginTop: 15, color: colors.text }}>furi</Text>
                                    <TextInput
                                        style={{color: colors.text, marginLeft: 10,borderBottomColor: colors.text_of_input, borderBottomWidth: 1, paddingBottom: -10, minWidth: '80%' }}
                                        placeholder="Nhập ví phiên âm của từ"
                                        placeholderTextColor= {colors.text_of_input}

                                        value={furi}
                                        onChangeText={(text) => setFuri(text)}

                                    />
                                </View>
                                <View style={{ flexDirection: 'row' }}>
                                    <Text style={{ marginTop: 15, color: colors.text }}>vn</Text>
                                    <TextInput
                                        style={{color: colors.text, marginLeft: 10,borderBottomColor: colors.text_of_input, borderBottomWidth: 1, paddingBottom: -10, minWidth: '80%' }}
                                        placeholder="Nhập nghĩa của ví dụ"
                                        placeholderTextColor= {colors.text_of_input}

                                        value={vn}
                                        onChangeText={(text) => setVn(text)}
                                    />
                                </View>
                            </View>
                            {requireEdit === false ?
                                <TouchableOpacity
                                    onPress={() => addExample()}
                                    style={{ padding: 8, backgroundColor: colors.header, height: 40, justifyContent: 'center', marginTop: 60, marginRight: 5 }} >
                                    <Text style={{ color: '#fff' }}>Add</Text>
                                </TouchableOpacity>
                                :
                                <TouchableOpacity
                                    onPress={() => editExample()}
                                    style={{ padding: 8, backgroundColor: 'blue', height: 40, justifyContent: 'center', marginTop: 60, marginRight: 5 }} >
                                    <Text style={{ color: '#fff' }}>Edit</Text>
                                </TouchableOpacity>
                            }
                        </View>
                        <Text style={{ fontWeight: 'bold', color: colors.text }}>Example On</Text>
                        {
                            Object.keys(exampleOn).map((key1) => {
                                return (
                                    <View key={key1}>
                                        <Text style={{color: colors.text}}>{key1}</Text>
                                        <View style={{ flexDirection: 'row' }}>
                                            <View>
                                                {
                                                    exampleOn[key1].map((element, key) => {
                                                        return (
                                                            <View key={key} style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                                                                <View style={{ width: '85%' }}>
                                                                    <Text style={{color: colors.text}}>{key + 1}. {element.p}</Text>
                                                                    <Text style={{color: colors.text}}>{element.w}</Text>
                                                                    <Text style={{color: colors.text}}>{element.m}</Text>
                                                                </View>
                                                                <View style={{ flexDirection: 'row', width: '10%' }}>
                                                                    <TouchableOpacity
                                                                        onPress={() => {
                                                                            setVn(element.vn); setJp(element.jp); setFuri(element.furi); setpa(pa);
                                                                            editEx.type = "on";
                                                                            editEx.key1 = key1;
                                                                            editEx.key = key;
                                                                            setEditEx({ ...editEx });
                                                                            setRequireEdit(true);
                                                                        }}
                                                                        // onPress={() => editExample("on",key1, key )} 
                                                                        style={{ marginRight: 5 }} >
                                                                        <AntDesign name={'edit'} size={20} style={{ color: colors.text}} />
                                                                    </TouchableOpacity>
                                                                    <TouchableOpacity onPress={() => deleteKanji("on", key1, key)} style={{}} >
                                                                        <Iconss name={'delete-outline'} size={20} style={{ color: 'red', marginLeft: 10 }} />
                                                                    </TouchableOpacity>
                                                                </View>
                                                            </View>
                                                        )
                                                    })
                                                }
                                                {/* <Text>{kanjiword.example_kun[key].w}</Text>
                                                    <Text>{kanjiword.example_kun[key].p}</Text>
                                                </View>
                                                <View>
                                                    <Text>{kanjiword.example_kun[key].m}</Text> */}
                                            </View>

                                        </View>
                                    </View>
                                )

                            })
                        }
                        {/* {
                            exampleOn.map((element, key) => {
                                return (
                                    <View key={key} style={{ marginLeft: 10, marginTop: 10, flexDirection: 'row', justifyContent: 'space-between' }}>
                                        <View>
                                            <Text>{key + 1}. {element.jp}</Text>
                                            <Text> {element.furi}</Text>
                                            <Text> {element.vn}</Text>
                                        </View>
                                        <TouchableOpacity
                                            onPress={() => deleteExample(key)}
                                            style={{ marginRight: 10 }}>
                                            <Iconss name={'delete-outline'} size={20} style={{ color: 'red' }} />
                                        </TouchableOpacity>
                                    </View>
                                )
                            })
                        } */}
                        <Text style={{ fontWeight: 'bold', color: colors.text }}>Example Kun</Text>
                        {
                            Object.keys(exampleKun).map((key1) => {
                                return (
                                    <View key={key1}>
                                        <Text style={{color: colors.text}}>{key1}</Text>
                                        <View style={{ flexDirection: 'row' }}>
                                            <View >
                                                {
                                                    exampleKun[key1].map((element, key) => {
                                                        return (
                                                            <View key={key} style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                                                                <View style={{ width: '90%' }}>
                                                                    <Text style={{color: colors.text}}>{key + 1}. {element.p}</Text>
                                                                    <Text style={{color: colors.text}}>{element.w}</Text>
                                                                    <Text style={{color: colors.text}}>{element.m}</Text>
                                                                </View>
                                                                <View style={{ flexDirection: 'row', width: '10%' }}>
                                                                    <TouchableOpacity
                                                                        onPress={() => {
                                                                            setVn(element.vn); setJp(element.jp); setFuri(element.furi); setpa(pa);
                                                                            editEx.type = "kun";
                                                                            editEx.key1 = key1;
                                                                            editEx.key = key;
                                                                            setEditEx({ ...editEx });
                                                                            setRequireEdit(true);
                                                                        }}
                                                                        // onPress={() => editExample("on",key1, key )} 
                                                                        style={{ marginRight: 5 }} >
                                                                        <AntDesign name={'edit'} size={20} style={{ color: colors.block }} />
                                                                    </TouchableOpacity>
                                                                    <TouchableOpacity onPress={() => deleteKanji("kun", key1, key)} style={{}} >
                                                                        <Iconss name={'delete-outline'} size={20} style={{ color: 'red' }} />
                                                                    </TouchableOpacity>
                                                                </View>
                                                            </View>
                                                        )
                                                    })
                                                }
                                                {/* <Text>{kanjiword.example_kun[key].w}</Text>
                                                    <Text>{kanjiword.example_kun[key].p}</Text>
                                                </View>
                                                <View>
                                                    <Text>{kanjiword.example_kun[key].m}</Text> */}
                                            </View>

                                        </View>
                                    </View>
                                )

                            })
                        }

                    </View>

                    <View style={{ flexDirection: 'row', padding: 10 }}>
                        <Text style={[styles.text, {color: colors.text}]}>Hình minh họa</Text>
                        <TouchableOpacity style={{ marginTop: 10, backgroundColor: colors.header, padding: 10 }} onPress={() => addImage()}>
                            <Text style={{color: '#fff'}}>Add image</Text>
                        </TouchableOpacity>
                    </View>
                    {
                        images !== "" ?
                            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                                <Image
                                    style={{ width: '100%', minHeight: 200, maxWidth: '80%', marginLeft: 20, marginTop: 10 }}
                                    source={{
                                        uri: images,
                                    }}

                                />
                                <TouchableOpacity onPress={() => setImages("")} style={{ justifyContent: 'center', marginRight: 10 }}>
                                    <Iconss name={'delete-outline'} size={20} style={{ color: 'red' }} />
                                </TouchableOpacity>
                            </View>
                            :
                            null
                    }

                    <View style={{ flexDirection: 'row', padding: 10 }}>
                        <Text style={[styles.text, {color: colors.text}]}>Giải thích hình ảnh</Text>
                        <TextInput
                            multiline={true}
                            numberOfLines={2}
                            style={{color: colors.text, height: 40, width: '70%', borderColor: '#cccccc', padding: 5, borderWidth: 1 }}
                            placeholder="Giải thích hình minh họa"
                            placeholderTextColor= {colors.text_of_input}
                            value={explain}
                            onChangeText={(text) => setExplain(text)}

                        />
                    </View>

                </View>

                <TouchableOpacity
                    onPress={() => createKanji()}
                    style={{ backgroundColor: colors.header, alignSelf: 'center', justifyContent: 'center', width: 50, height: 40, padding: 10, marginBottom: 20 }}>
                    <Text style={{ textAlign: 'center', color: '#fff' }}>Tạo</Text>
                </TouchableOpacity>
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
    }
})