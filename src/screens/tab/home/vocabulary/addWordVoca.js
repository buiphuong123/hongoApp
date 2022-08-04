import React, { useEffect, useState } from 'react'
import { Text, Alert, TextInput, View, StyleSheet, TouchableOpacity, Image, Dimensions, FlatList } from 'react-native'
import { useSelector, useDispatch } from 'react-redux';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Iconss from 'react-native-vector-icons/MaterialCommunityIcons';
import ImagePicker from 'react-native-image-crop-picker';
import axios from 'axios';
import CustomHeader from '../../../CustomHeader';
import { ScrollView } from 'react-native-gesture-handler';
import { getListWordLevel } from '../../../../redux/actions/word.action';

export default AddWordVoca = ({ navigation, route }) => {
    const dispatch = useDispatch();
    const { worddata } = route.params;
    const [wordele, setWordele] = useState(worddata);
    const wordlevel = useSelector(state => state.wordReducer.wordlevel);
    const [data, setData] = useState(wordlevel);
    const [word, setWord] = useState(wordele.word);
    const [translate, setTranslate] = useState(wordele.translate);
    const [vnword, setVnword] = useState(wordele.vn);
    const [amhan, setAmhan] = useState("");
    const [kind, setKind] = useState("");
    const [kinds, setKinds] = useState([]);
    const [mean, setMean] = useState("");
    const [means, setMeans] = useState([]);
    const [images, setImages] = useState([
    ]);
    const [examples, setExamples] = useState([]);
    const [jp, setJp] = useState("");
    const [vn, setVn] = useState("");
    useEffect(() => {
        setWordele(worddata);
        setWord(worddata.word);
        setTranslate(worddata.translate);
        setVnword(worddata.vn);
    }, [worddata]);
    const addMeans = () => {
        means.push(mean);
        setMeans([...means]);
        // setMeans(means.push(mean));
        setMean("");
    }

    const addKinds = () => {
        kinds.push(kind);
        setKinds([...kinds]);
        setKind("");
    }

    const createWord = () => {
        axios.post('https://nameless-spire-67072.herokuapp.com/language/createWordNew', {
            "word": word,
            "translate": translate,
            "vn": vnword,
            "means": means,
            "kind": kind,
            "amhan": amhan,
            "level": level,
            "images": images,
            "lession": lession,
            "example": examples
        }, {
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json"
            }
        })
            .then((response) => {
                console.log(response.data);

                if (response.data.code === 1) {
                    const wordd = response.data.word;
                    wordd.likes = [];
                    wordd.memerizes = [];
                    // data.push(wordd);
                    setData([...data.concat(wordd)]);
                    console.log(data.length);
                    console.log(data.concat(wordd).length);
                    dispatch(getListWordLevel(data.concat(wordd)));

                }
                setWord("");
                setTranslate("");
                setVnword("");
                setMeans([]);
                setKinds([]);
                setAmhan("");
                setImages([]);
                setExamples([]);

            })
            .catch(function (error) {
                throw error;
            })
        navigation.goBack();
    }

    const deleteMean = (count) => {
        means.splice(count, 1)
        setMeans([...means]);
    }

    const deleteKind = (count) => {
        kinds.splice(count, 1)
        setKinds([...kinds]);
    }

    const addImage = () => {
        ImagePicker.openPicker({
            width: 100,
            height: 100,
            cropping: true,
        }).then((image) => {
            console.log('IMAGE LA ', image);
            var photo = {
                uri: image.path,
                type: image.mime,
                name: image.path.split('/').pop(),
            };
            const formData = new FormData();
            formData.append("file", photo);
            formData.append("upload_preset", "kbihuaf8");
            axios.post("https://api.cloudinary.com/v1_1/languageword/image/upload", formData).then((response) => {

                setImages([...images.concat(response.data.url)]);

            });
        }).catch((error) => {
            console.log(`loi ${error}`);
        });
    }

    const addExample = () => {
        const a = {};
        a.jp = jp;
        a.vn = vn;
        examples.push(a);
        setExamples([...examples]);
        setVn("");
        setJp("");
    }

    const deleteExample = (count) => {
        examples.splice(count, 1);
        setExamples([...examples]);
    }

    const deleteImage = (count) => {
        images.splice(count, 1)
        setImages([...images]);
    }
    return (
        <View style={{ flex: 1 }}>
            <CustomHeader title={"Tạo từ mới"} navigation={navigation} />
            <ScrollView style={{ flex: 1 }}>
                <View style={{ justifyContent: 'center', padding: 10, }}>
                    <Text style={{ textAlign: 'center', fontSize: 18, fontWeight: 'bold' }}>Tạo từ vựng mới</Text>
                </View>
                <View>
                    <View style={{ flexDirection: 'row', padding: 10 }}>
                        <Text style={styles.text}>Ghi chú</Text>
                        <TextInput
                            style={[styles.inputText, {minHeight: 60}]}
                            value={wordele.note}
                            multiline={true}
                            numberOfLines={4}
                            // onChangeText={(text) => setWord(text)}

                        />
                    </View>
                    <View style={{ flexDirection: 'row', padding: 10 }}>
                        <Text style={styles.text}>Từ vựng</Text>
                        <TextInput
                            style={styles.inputText}
                            placeholder="Nhập vào từ"
                            value={word}
                            onChangeText={(text) => setWord(text)}

                        />
                    </View>

                    <View style={{ flexDirection: 'row', padding: 10 }}>
                        <Text style={styles.text}>Nghĩa ngắn gọn</Text>
                        <TextInput
                            style={styles.inputText}
                            placeholder="Nhập vào nghĩa của từ"
                            value={vnword}
                            onChangeText={(text) => setVnword(text)}
                        />
                    </View>

                    <View style={{ flexDirection: 'row', padding: 10 }}>
                        <Text style={styles.text}>Phiên âm</Text>
                        <TextInput
                            style={styles.inputText}
                            placeholder="Nhập phiên âm của từ"
                            value={translate}
                            onChangeText={(text) => setTranslate(text)}
                        />
                    </View>
                    <View style={{ flexDirection: 'row', padding: 10 }}>
                        <Text style={styles.text}>Âm hán tự</Text>
                        <TextInput
                            style={styles.inputText}
                            placeholder="Nhập hán tự của từ"
                            value={amhan}
                            onChangeText={(text) => setAmhan(text)}
                        />
                    </View>
                    <View style={{ padding: 10 }}>

                        <View style={{ flexDirection: 'row', marginTop: 10 }}>
                            <Text style={styles.text}>Nghĩa</Text>
                            <TextInput
                                style={styles.inputText}
                                value={mean}
                                onChangeText={(text) => setMean(text)}
                                placeholder="Nhập nghĩa chi tiết từ"
                            />
                            <TouchableOpacity
                                onPress={() => addMeans()}
                                style={{ padding: 8, backgroundColor: 'blue' }} >
                                <Text style={{ color: '#fff' }}>Add</Text>
                            </TouchableOpacity>
                        </View>
                        {
                            means.length !== 0 && means.map((element, key) => {
                                return (
                                    <View key={key} style={{ paddingTop: 10, flexDirection: 'row', justifyContent: 'space-between' }}>
                                        <Text style={{ width: '70%' }}>{key + 1}. {element}</Text>
                                        <TouchableOpacity onPress={() => deleteMean(key)} style={{}} >
                                            <Iconss name={'delete-outline'} size={20} style={{ color: 'red' }} />
                                        </TouchableOpacity>
                                    </View>
                                )
                            })
                        }



                    </View>

                    {/* <View style={{ flexDirection: 'row', padding: 10 }}>
                        <Text style={styles.text}>Từ loại</Text>
                        <TextInput
                            style={styles.inputText}
                            placeholder="Nhập từ loại của từ"
                        />
                    </View> */}

                    <View style={{ padding: 10 }}>

                        <View style={{ flexDirection: 'row', marginTop: 10 }}>
                            <Text style={styles.text}>Từ loại</Text>
                            <TextInput
                                style={styles.inputText}
                                value={kind}
                                onChangeText={(text) => setKind(text)}
                                placeholder="Nhập từ loại của từ"
                            />
                            <TouchableOpacity
                                onPress={() => addKinds()}
                                style={{ padding: 8, backgroundColor: 'blue' }} >
                                <Text style={{ color: '#fff' }}>Add</Text>
                            </TouchableOpacity>
                        </View>
                        {
                            kinds.length !== 0 && kinds.map((element, key) => {
                                return (
                                    <View key={key} style={{ paddingTop: 10, flexDirection: 'row', justifyContent: 'space-between' }}>
                                        <Text style={{ width: '70%' }}>{key + 1}. {element}</Text>
                                        <TouchableOpacity onPress={() => deleteKind(key)} style={{}} >
                                            <Iconss name={'delete-outline'} size={20} style={{ color: 'red' }} />
                                        </TouchableOpacity>
                                    </View>
                                )
                            })
                        }



                    </View>

                    <View style={{ padding: 10 }}>
                        <Text style={styles.text}>Ví dụ</Text>
                        <View style={{ flexDirection: 'row' }}>
                            <View>
                                <View style={{ flexDirection: 'row' }}>
                                    <Text style={{ marginTop: 15 }}>jp</Text>
                                    <TextInput
                                        style={{ marginLeft: 10, borderBottomWidth: 1, paddingBottom: -10, minWidth: '80%' }}
                                        placeholder="Nhập ví dụ của từ"
                                        value={jp}
                                        onChangeText={(text) => setJp(text)}

                                    />
                                </View>
                                <View style={{ flexDirection: 'row' }}>
                                    <Text style={{ marginTop: 15 }}>vn</Text>
                                    <TextInput
                                        style={{ marginLeft: 10, borderBottomWidth: 1, paddingBottom: -10, minWidth: '80%' }}
                                        placeholder="Nhập nghĩa của ví dụ"
                                        value={vn}
                                        onChangeText={(text) => setVn(text)}
                                    />
                                </View>
                            </View>
                            <TouchableOpacity
                                onPress={() => addExample()}
                                style={{ padding: 8, backgroundColor: 'blue', height: 40, justifyContent: 'center', marginTop: 30, marginRight: 5 }} >
                                <Text style={{ color: '#fff' }}>Add</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                    {
                        examples.map((element, key) => {
                            return (
                                <View key={key} style={{ marginLeft: 10, marginTop: 10, flexDirection: 'row', justifyContent: 'space-between' }}>
                                    <View>
                                        <Text>{key + 1}. {element.jp}</Text>
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
                    }

                    <View style={{ flexDirection: 'row', padding: 10 }}>
                        <Text style={styles.text}>Hình minh họa</Text>
                        <TouchableOpacity style={{ marginTop: 10, backgroundColor: '#f2f2f2', padding: 10 }} onPress={() => addImage()}>
                            <Text>Add image</Text>
                        </TouchableOpacity>
                    </View>
                    {
                        images.map((element, key) => {
                            return (
                                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                                    <Image
                                        key={key}
                                        style={{ width: '100%', minHeight: 200, maxWidth: '80%', marginLeft: 20, marginTop: 10 }}
                                        source={{
                                            uri: element,
                                        }}

                                    />
                                    <TouchableOpacity onPress={() => deleteImage(key)} style={{ justifyContent: 'center', marginRight: 10 }}>
                                        <Iconss name={'delete-outline'} size={20} style={{ color: 'red' }} />
                                    </TouchableOpacity>
                                </View>
                            )
                        })
                    }
                </View>

                {/* <View style={{justifyContent: 'center'}}> */}
                <TouchableOpacity
                    onPress={() => createWord()}
                    style={{ backgroundColor: '#8080ff', alignSelf: 'center', justifyContent: 'center', height: 40, padding: 10, marginBottom: 20 }}>
                    <Text style={{ textAlign: 'center', color: '#fff' }}>Thêm vào bộ từ vựng</Text>
                </TouchableOpacity>
                {/* </View> */}
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