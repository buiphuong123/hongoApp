import React, { Component, useEffect, useState } from 'react'
import { Text, View, Animated, SafeAreaView, FlatList, ScrollView, TouchableOpacity, Alert, StyleSheet, Dimensions, TextInput, Image } from 'react-native'
import { useDispatch, useSelector } from 'react-redux';
import { useTheme } from 'react-native-paper';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Icon from 'react-native-vector-icons/Ionicons';
import Icons from 'react-native-vector-icons/FontAwesome';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Entypo from 'react-native-vector-icons/Entypo';
import Iconss from 'react-native-vector-icons/MaterialCommunityIcons';
import { TextInput as TextInputPaper } from 'react-native-paper';
import { element } from 'prop-types';
import { Card, Avatar, Button } from 'react-native-paper';
import Modal from 'react-native-modal'; // 2.4.0
import { getListVocaSuccess } from '../../../redux/actions/vocabulary.action';
import axios from 'axios';
import { color, not } from 'react-native-reanimated';
import SelectDropdown from 'react-native-select-dropdown';
import AppText from '../../../components/app-text';
import i18n from '../../../i18n/i18n';
import Feather from 'react-native-vector-icons/Feather';
import SearchDropDown from './SearchDropDown';
import SearchDropDownGrammar from '../vocabulary/SearchDropDownGrammar';
import { RemoteTextVocabulary } from '../../../redux/actions/word.action';
import SearchDropDownWord from '../vocabulary/SearchDropDownWord';
import SearchDropDownKanji from '../vocabulary/SearchDropDownKanji';
import SearchDropDownUser from '../vocabulary/SearchDropDownUser';
import CheckBox from '@react-native-community/checkbox';
import { RadioButton } from 'react-native-paper';
import { showToastSuccess, showToastError } from '../../../helpers/toastHelper';
import { getListCommentRequest, getListKanjiCommentRequest, getListWordCommentRequest } from '../../../redux/actions/comment.action';
const WIDTH = Dimensions.get('window').width;
const HEIGHT = Dimensions.get('window').height;

const ListWordVocabulary = ({ navigation, route }) => {
    const { colors } = useTheme();
    const [searchRequire, setSearchRequire] = useState(false);
    const [nameSearch, setNameSearch] = useState("");
    const dispatch = useDispatch();
    const users = useSelector(state => state.userReducer.user);
    const [wordD, setWordD] = useState("");
    const [spell, setSpell] = useState("");
    const [mean, setMean] = useState("");
    const [value, setValue] = useState("Từ vựng");
    const wordoptions = ["Từ vựng", "Hán tự", "Ngữ pháp"];
    const [note, setNote] = useState("");
    const { listdata, type } = route.params;
    const [word, setWord] = useState({});
    const [newEdit, setNewEdit] = useState("");
    const dateCreate = new Date();
    const kanjiList = useSelector(state => state.kanjiReducer.kanjiList);
    const textVocabulary = useSelector(state => state.wordReducer.textVocabulary);
    const wordList = useSelector(state => state.wordReducer.wordList);
    const dataGrammar = useSelector(state => state.grammarReducer.grammarList);
    const [currentElement, setCurrentElement] = useState({});
    const [isVisibleEdit, setisVisibleEdit] = useState(false);
    const [searching, setSearching] = useState(false);
    const [filtered, setFiltered] = useState(wordList)
    const [isVisibleAdd, setisVisibleAdd] = useState(false);
    const [isVisibleShare, setisVisibleShare] = useState(false);
    const [textInput, setTextInput] = useState(textVocabulary);
    const [inputUser, setInputUser] = useState("");
    const listUser = useSelector(state => state.userReducer.listUser);
    const [listUserShare, setListUserShare] = useState([]);
    const [remind, setRemind] = useState("");
    const [noti, setNoti] = useState(true);
    const [isVisibleSetting, setisVisibleSetting] = useState(false);
    const [sort1, setSort1] = useState('unchecked');
    const [sort2, setSort2] = useState('unchecked');
    const [sort3, setSort3] = useState('checked');
    const [sort4, setSort4] = useState('unchecked');
    const [sortAll, setSortAll] = useState('checked');
    const [sortword, setSortWord] = useState('unchecked');
    const [sortkanji, setSortKanji] = useState('unchecked');
    const [sortgrammar, setSortGrammar] = useState('unchecked');
    const vocabulary = useSelector(state => state.vocabularyReducer.vocabularyList);
    const [data, setData] = useState(vocabulary);
    const [shareAll, setShareAll] = useState('unchecked');
    const [sharePersion, setSharePersion] = useState('unchecked');
    const [sharePrivate, setSharePrivate] = useState('checked');
    const isManage = useSelector(state => state.manageReducer.isManage);
    const [viewElement, setViewElement] = useState({});
    const [isVisbileviewRequest, setisVibilaViewRequest] = useState(false);
    const [searchAdd, setSearchAdd] = useState(false);
    const [modelWord, setModelWord] = useState(false);
    const [textAlert, setTextAlert] = useState("");
    const [typekk, setTypekk] = useState("word");
    const [dataSearch, setDataSearch] = useState({});
    // const 
    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
            setisVisibleAdd(false);
            setisVisibleShare(false);
            //   setWord(listdata);
            console.log('focus lai man hinh nha');
            //Put your Data loading function here instead of my loadData()
        });

        return unsubscribe;
    }, [navigation]);


    const onSearchGrammar = (text) => {
        setTextInput(text);
        if (text) {
            setSearchAdd(true)
            const temp = text.toLowerCase()

            const tempList = dataGrammar.filter(item => {
                if (item.grammar.match(temp))
                    return item
            })
            setFiltered(tempList)
        }
        else {
            setSearchAdd(false)
            setFiltered(dataGrammar)
        }

    }
    const onSearchWord = (text) => {
        console.log('vao search word');
        setTextInput(text);
        if (text) {
            // setSearching(true)
            setSearchAdd(true);
            // const temp = text.toLowerCase();
            const tempList = wordList.filter(item => {
                if (item.means.toString().match(text.toLowerCase()))
                    return item
            })
            setFiltered(tempList)
        }
        else {
            // setSearching(false)
            setSearchAdd(false);
            setFiltered(wordList)
        }

    }
    const onSearchKanji = (text) => {
        setTextInput(text);
        if (text) {
            // setSearching(true);
            setSearchAdd(true)
            const tempList = kanjiList.filter(item => {
                if (item.mean.match(text.toUpperCase()) || item.kanji.match(text))
                    return item
            })
            setFiltered(tempList)
        }
        else {
            setSearchAdd(false)
            setFiltered(kanjiList)
        }

    }

    const onSearchUser = (text) => {
        setInputUser(text);
        if (text) {
            setSearching(true);

            const tempList = listUser.filter(item => {
                if (item.email.toLowerCase().match(text.toLowerCase()))
                    return item
            })
            setFiltered(tempList);
        }
        else {
            setSearching(false)
            setFiltered(listUser);
        }

    }
    useEffect(() => {
        console.log('day nhe ', listdata.share);
        setWord(listdata);
        if (listdata.share.length !== 0 && listdata.typeShare === 2) {
            setListUserShare(listdata.share);
            setSharePersion('checked');
            setShareAll('unchecked');
            setSharePrivate('unchecked');
        }
        else {
            setListUserShare([]);
            if (listdata.typeShare === 0) {
                setSharePersion('unchecked');
                setShareAll('unchecked');
                setSharePrivate('checked');
            }
            else if (listdata.typeShare === 1) {
                setSharePersion('unchecked');
                setShareAll('checked');
                setSharePrivate('unchecked');
            }
        }
        if (listdata.remind !== undefined) {
            setRemind(listdata.remind);
        }
        else {
            setRemind("");
        }
    }, [listdata]);
    useEffect(() => {
        setData(vocabulary);
    }, [vocabulary]);

    useEffect(() => {
        setTextInput(textVocabulary);
    }, [textVocabulary]);
    const editVocaAction = (element) => {
        setNewEdit(element.vn);
        setCurrentElement(element);
        setisVisibleEdit(true);
    }
    const checkWordVoca = () => {
        if (wordD === '' || wordD.replace(/\s/g, '').length === 0) {
            return;
        }
        if (value === "Từ vựng") {
            listCheck = wordList.filter(e => e)
        }
    }
    const createWordVoca = () => {
        const objindex = word.data.findIndex(e => e.word === textInput && e.translate === spell && e.vn === mean && e.type === value);
        if (objindex !== -1) {
            setisVisibleAdd(false);
            showToastError(`${textInput} đã tồn tại trong bộ từ`);
            return;
        }
        const date = new Date();
        var d = {};
        d.word = textInput;
        d.translate = spell;
        d.vn = mean;
        d.type = value;
        d.note = note;
        d.date = date;
        word.data.push(d);
        setWord({ ...word });
        axios.post('https://nameless-spire-67072.herokuapp.com/language/createWordInVoca', {
            "id": word._id,
            "word": textInput,
            "translate": spell,
            "vn": mean,
            "note": note,
            "type": value,
            "date": date,
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
                throw error;
            })
        setWordD("");
        setSpell("");
        setMean("");
        setValue("Từ vựng");
        setNote("");
        setisVisibleAdd(false);
    }
    const fixDigit = (val) => {
        return (val < 10 ? '0' : '') + val;
    }
    const addVocu = () => {
        setSearchAdd(false);
        setSearching(false);
        setWordD("");
        setSpell("");
        setMean("");
        setValue("Từ vựng");
        setNote("");
        setisVisibleAdd(true);

        dispatch(RemoteTextVocabulary(""));
    }
    const editWordVoca = () => {
        const objIndex = word.data.findIndex(e => e.word === currentElement.word);
        if (objIndex !== -1) {
            word.data[objIndex].vn = newEdit;
            setWord({ ...word });
        }
        axios.post('http://192.168.1.722:3002/language/editWordInVoca', {
            "id": word._id,
            "name": currentElement.word,
            "newName": newEdit,
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
                throw error;
            })
        setisVisibleEdit(false);
    }
    const deleteWordVocu = (element) => {
        Alert.alert(
            "Thông báo",
            "Bạn có chắc chắn muốn xóa " + element.word + "?",
            [
                {
                    text: "Cancel",
                    onPress: () => console.log("Cancel Pressed"),
                    style: "cancel"
                },
                {
                    text: "OK", onPress: () => {
                        const objectIndex = word.data.findIndex(e => e.word === element.word);
                        if (objectIndex === -1) {

                        }
                        else {
                            word.data.splice(objectIndex, 1);
                            setWord({ ...word });
                            axios.post('https://nameless-spire-67072.herokuapp.com/language/deleteWordInVoca', {
                                "id": word._id,
                                "word": element.word
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
                                    throw error;
                                })
                        }
                    }
                }
            ]
        )
    }
    const moveDiffVocu = (element) => {
        navigation.navigate("MoveVocabulary", { navigation: navigation, dataword: element, word: word });
    }

    const chooseUser = (item) => {
        setSearching(false);
        setInputUser("");
        const objIndex = listUserShare.findIndex(e => e._id === item._id);
        if (objIndex === -1) {
            setListUserShare([...listUserShare.concat(item)]);
        }
        else {
            return;
        }

    }

    const renderUser = ({ item }) => {
        return (
            <TouchableOpacity style={[styles.itemView, { backgroundColor: colors.background }]} onPress={() => chooseUser(item)}>
                <Text style={[styles.itemText, { color: colors.text }]}>{item.email}</Text>
            </TouchableOpacity>
        )
    }

    const deleteUser = (element) => {
        const objIndex = listUserShare.findIndex(e => e._id === element._id);
        console.log(objIndex);
        if (objIndex !== -1) {
            listUserShare.splice(objIndex, 1);
            console.log(listUserShare);
            setListUserShare([...listUserShare]);
        }
    }

    const sendShare = () => {
        var type = 0;
        if (sharePersion === 'checked') {
            type = 2
        }
        if (type === 0) {
            setListUserShare([]);
        }
        // const listuser = listUserShare.map(function (el) { return el._id; });

        const objIndex = data.findIndex(e => e._id === word._id);
        if (objIndex !== -1) {
            if (type === 0) {
                data[objIndex].share = [];
            }
            data[objIndex].remind = remind;
            data[objIndex].typeShare = type;
            console.log(data);
            setData([...data]);
            dispatch(getListVocaSuccess(data));
            setisVisibleShare(false);
            setListUserShare([]);
            setRemind("");
            axios.post('https://nameless-spire-67072.herokuapp.com/language/shareVocabulary', {
                "id": word._id,
                "listUserShare": type !== 0 ? listUserShare : [],
                "remind": remind,
                "noti": noti,
                "user_id_share": users._id,
                "typeShare": type
            }, {
                headers: {
                    "Accept": "application/json",
                    "Content-Type": "application/json"
                }
            })
                .then((response) => {
                    console.log(response.data);
                    if (response.data.code === 1) {
                        showToastSuccess("Chia sẻ bộ từ vựng thành công");
                    }
                    else {
                        showToastError("Có một số lỗi xảy ra, bạn vui lòng thử lại!!");
                    }
                })
                .catch(function (error) {
                    throw error;
                })

        }
    }

    const explainWord = (element) => {
        const data = element.explain;
        console.log('DAY NE', data);
        if (data !== null) {
            if (element.type === "Hán tự") {
                dispatch(getListKanjiCommentRequest(data._id, users._id));
                navigation.navigate("ExplainKanji", { navigation: navigation, kanjiword: data });
            }
            else if (element.type === "Từ vựng") {
                dispatch(getListWordCommentRequest(data._id, users._id));
                navigation.navigate("WordScreenDetail", { vocabularys: data });
            }
            else {
                dispatch(getListCommentRequest(data._id, users._id));
                navigation.navigate("ExplainScreen", { word: data });
            }
        }
        else {
            setViewElement(element);
            setisVibilaViewRequest(true);
        }
    }

    const toggleSwitchSort1 = () => {
        if (sort1 === 'unchecked') {
            word.data.sort(function sortComparer(a, b) {
                return a.vn.toLowerCase().charAt().localeCompare(b.vn.toLowerCase().charAt())
            });
            console.log('DATA KHI SORT LA', word.data);
            setWord({ ...word });
            setSort1('checked');
            setSort2('unchecked');
            setSort3('unchecked');
            setSort4('unchecked');
        }
    }
    const toggleSwitchSort2 = () => {
        if (sort2 === 'unchecked') {
            word.data.sort(function (a, b) {
                return new Date(b.date) - new Date(a.date);
            })
            console.log('DATA KHI SORT LA', word.data);
            setWord({ ...word });
            setSort1('unchecked');
            setSort2('checked');
            setSort3('unchecked');
            setSort4('unchecked');
        }
    }
    const toggleSwitchSort3 = () => {
        if (sort3 === 'unchecked') {
            word.data.sort(function (a, b) {
                return new Date(a.date) - new Date(b.date);
            })
            setWord({ ...word });
            setSort1('unchecked');
            setSort2('unchecked');
            setSort3('checked');
            setSort4('unchecked');
        }
    }
    const toggleSwitchSort4 = () => {
        if (sort4 === 'unchecked') {
            word.data.sort(function sortComparer(a, b) {
                return b.vn.toLowerCase().charAt().localeCompare(a.vn.toLowerCase().charAt())
            });
            setWord({ ...word });
            setSort1('unchecked');
            setSort2('unchecked');
            setSort3('unchecked');
            setSort4('checked');
        }
    }

    const toggleSwitchSortAll = () => {
        if (sortAll === 'unchecked') {
            setSortAll('checked');
            setSortWord('unchecked');
            setSortGrammar('unchecked');
            setSortKanji('unchecked');
        }
    }
    const toggleSwitchSortWord = () => {
        if (sortword === 'unchecked') {
            // const dataa = word.data.filter(e => e.type === "Từ vựng");
            // setWordCenter([...dataa]);
            setSortAll('unchecked');
            setSortWord('checked');
            setSortGrammar('unchecked');
            setSortKanji('unchecked');
        }
    }
    const toggleSwitchSortGrammar = () => {
        // // setWord(listdata);
        if (sortgrammar === 'unchecked') {
            // const dataa = word.data.filter(e => e.type === "Ngữ pháp");
            // setWordCenter([...dataa]);
            setSortAll('unchecked');
            setSortWord('unchecked');
            setSortGrammar('checked');
            setSortKanji('unchecked');
        }
    }
    const toggleSwitchSortKanji = () => {
        // // setWord(listdata);
        if (sortkanji === 'unchecked') {
            // const dataa = wordCenter.data.filter(e => e.type === "Hán tự");
            // setWordCenter([...dataa]);
            setSortAll('unchecked');
            setSortWord('unchecked');
            setSortGrammar('unchecked');
            setSortKanji('checked');
        }
    }
    const renderWord = ({ item }) => {
        return (
            <TouchableOpacity style={[styles.itemView]} onPress={() => searchData(item)}>
                <Text style={[styles.itemText, { color: colors.text }]}>{item.word}: {item.vn}</Text>
            </TouchableOpacity>
        )
    }
    const searchData = (item) => {
        dispatch(RemoteTextVocabulary(item.word));
        // setTextAlert(`Bạn có muốn sử dụng ${item.word} đã có trong bộ từ của app?`);
        // setTypekk("word");
        // setDataSearch(item);
        // setModelWord(true);
        // setSearchAdd(false)
        Alert.alert(
            "Thông báo",
            "Bạn có muốn sử dụng " + item.word + " đã có trong bộ từ vựng của app?",
            [
                {
                    text: "No",
                    onPress: () => {
                        console.log('vao day');
                        setSearchAdd(false);
                    },
                    style: "cancel"

                },
                {
                    text: "Yes", onPress: () => {
                        const objindex  = word.data.findIndex(e=> e.word ===item.word&&e.vn===item.vn&&e.type==="Từ vựng"&&e.translate ===item.translate);
                        if(objindex !== -1) {
                            setisVisibleAdd(false);
                            showToastError(`${item.word} đã tồn tại!!`);
                            return;
                        }
                        var d = {};
                        d.word = item.word;
                        d.vn = item.vn;
                        d.explain = item;
                        d.type = "Từ vựng";
                        d.date = dateCreate;
                        d.translate = item.translate;
                        word.data.push(d);
                        //  navigation.goBack();
                        setisVisibleAdd(false);
                        // navigation.navigate("ListWordVocabulary", {navigation: navigation, listdata: dataVocu});
                        axios.post('https://nameless-spire-67072.herokuapp.com/language/createWordInVoca', {
                            "id": word._id,
                            "word": item.word,
                            "vn": item.vn,
                            "type": "Từ vựng",
                            "explain": item,
                            "date": dateCreate,
                            "translate": item.translate
                        }, {
                            headers: {
                                "Accept": "application/json",
                                "Content-Type": "application/json"
                            }
                        })
                            .then((response) => {
                                console.log(response.data);
                                if(response.data.code === 1) {
                                    showToastSuccess("Tạo từ vựng thành công");
                                }
                                else {
                                    showToastError("Có lỗ xảy ra!!Thử lại sau")
                                }
                            })
                            .catch(function (error) {
                                throw error;
                            })
                        // navigation.navigate("ListWordVocabulary", {navigation: navigation, listdata: dataVocu, status: false});
                    }
                },
                {
                    text: "Xem từ vựng", onPress: () => {
                        dispatch(getListWordCommentRequest(users._id, item._id));
                        navigation.navigate("WordScreenDetail", { vocabularys: item });
                    }
                }
            ]
        )
    }
    const renderGrammar = ({ item }) => {
        return (
            <TouchableOpacity style={styles.itemView} onPress={() => searchDataGRammar(item)}>
                <Text style={[styles.itemText, { color: colors.text }]}>{item.grammar}</Text>
            </TouchableOpacity>
        )
    }
    const searchDataGRammar = (item) => {
        dispatch(RemoteTextVocabulary(item.grammar.split("=>")[0]));
        Alert.alert(
            "Thông báo",
            "Bạn có muốn sử dụng " + item.grammar + " đã có trong bộ từ vựng của app?",
            [
                {
                    text: "No",
                    // onPress: () => {
                    //     // props.press();
                    //     console.log("Cancel Pressed");

                    //     dispatch(RemoteTextVocabulary(item.grammar.split("=>")[0]));
                    // },
                    onPress: () => setSearchAdd(false),
                    style: "cancel"

                },
                {
                    text: "Yes", onPress: () => {
                        const objindex = word.data.findIndex(e => e.word === item.grammar.split("=>")[0] && e.vn === item.grammar.split("=>")[1] && e.type === "Ngữ pháp");
                        if (objindex !== -1) {
                            setisVisibleAdd(false);
                            showToastError(`${item.grammar.split("=>")[0]} đã tồn tại!!`);
                            return;
                        }
                        var d = {};
                        d.word = item.grammar.split("=>")[0];
                        d.vn = item.grammar.split("=>")[1];
                        d.type = "Ngữ pháp";
                        d.explain = item;
                        d.date = dateCreate;
                        word.data.push(d);
                        setisVisibleAdd(false);
                        axios.post('https://nameless-spire-67072.herokuapp.com/language/createWordInVoca', {
                            "id": word._id,
                            "word": item.grammar.split("=>")[0],
                            "vn": item.grammar.split("=>")[1],
                            "type": "Ngữ pháp",
                            "date": dateCreate,
                            "explain": item,
                        }, {
                            headers: {
                                "Accept": "application/json",
                                "Content-Type": "application/json"
                            }
                        })
                            .then((response) => {
                                console.log(response.data);
                                if (response.data.code === 1) {
                                    showToastSuccess("Tạo ngữ pháp thành công");
                                }
                                else {
                                    showToastError("Có lỗ xảy ra!!Thử lại sau")
                                }
                            })
                            .catch(function (error) {
                                throw error;
                            })

                    }
                },
                {
                    text: "Xem ngữ pháp", onPress: () => {
                        navigation.navigate("ExplainScreen", { word: item });
                    }
                }
            ]
        )
    }
    const renderKanji = ({ item }) => {
        return (
            <TouchableOpacity style={styles.itemView} onPress={() => { setSearching(false); searchDataKanji(item); setSearching(false) }}>
                <Text style={[styles.itemText, { color: colors.text }]}>{item.kanji}: {item.mean}</Text>
            </TouchableOpacity>
        )
    }
    const searchDataKanji = (item) => {
        dispatch(RemoteTextVocabulary(item.kanji));
        console.log(searching);
        Alert.alert(
            "Thông báo",
            "Bạn có muốn sử dụng " + item.kanji + " đã có trong bộ từ vựng của app?",
            [
                {
                    text: "No",
                    onPress: () => {
                        // props.press();
                        console.log("Cancel Pressed");
                        setSearchAdd(false)

                        // dispatch(RemoteTextVocabulary(item.grammar.split("=>")[0]));
                    },
                    // onPress: () => setSearching(false),
                    style: "cancel"

                },
                {
                    text: "Yes", onPress: () => {
                        const objindex = word.data.findIndex(e => e.word === item.kanji && e.vn === item.mean && e.type === "Hán tự" && e.translate === item.mean);
                        if (objindex !== -1) {
                            setisVisibleAdd(false);
                            showToastError(`${item.kanji} đã tồn tại!!`);
                            return;
                        }
                        var d = {};
                        d.word = item.kanji;
                        d.vn = item.mean;
                        d.type = "Hán tự";
                        d.explain = item;
                        d.date = dateCreate;
                        d.translate = item.mean;
                        word.data.push(d);
                        setisVisibleAdd(false);
                        axios.post('https://nameless-spire-67072.herokuapp.com/language/createWordInVoca', {
                            "id": word._id,
                            "word": item.kanji,
                            "vn": item.mean,
                            "type": "Hán tự",
                            "date": dateCreate,
                            "translate": item.mean,
                            "explain": item,
                        }, {
                            headers: {
                                "Accept": "application/json",
                                "Content-Type": "application/json"
                            }
                        })
                            .then((response) => {
                                console.log(response.data);
                                if (response.data.code === 1) {
                                    showToastSuccess("Tạo Kanji thành công");
                                }
                                else {
                                    showToastError("Có lỗ xảy ra!!Thử lại sau")
                                }
                            })
                            .catch(function (error) {
                                throw error;
                            })

                    }
                },
                {
                    text: "Xem kanji", onPress: () => {
                        navigation.navigate("ExplainKanji", { navigation: navigation, kanjiword: item });
                    }
                }
            ]
        )
    }

    const onSearchNameWordInVocu = (text) => {
        setNameSearch(text);
        if (text) {
            setSearching(true);
            const tempList = word.data.filter(item => {
                if (item.vn.toLowerCase().match(text.toLowerCase()))
                    return item
            })
            setFiltered(tempList);
        }
        else {
            setSearching(false);
        }
    }

    const toggleSwitchSharePersion = () => {
        setSharePersion('checked');
        setShareAll('unchecked');
        setSharePrivate('unchecked');
    }
    const toggleSwitchShareAll = () => {
        setSharePersion('unchecked');
        setShareAll('checked');
        setSharePrivate('unchecked');
    }
    const toggleSwitchSharePrivate = () => {
        setSharePersion('unchecked');
        setShareAll('unchecked');
        setSharePrivate('checked');
    }

    return (
        <View style={{ flex: 1 }}>
            <View style={{ flexDirection: 'row', height: 50, backgroundColor: colors.header, justifyContent: 'space-between' }}>
                <View style={{ justifyContent: 'center', flex: 1 }}>
                    <TouchableOpacity style={{ flexDirection: 'row', alignItems: 'center' }} onPress={() => navigation.goBack()}>
                        <Icon name={'arrow-back'} size={24} style={{ color: colors.text_of_box, marginLeft: 5 }} />
                    </TouchableOpacity>
                </View>
                {searchRequire === false ?
                    <View style={{ flexDirection: 'row', flex: 7, justifyContent: 'space-between' }}>
                        <View style={{ justifyContent: 'center', marginLeft: 10, width: '40%' }}>
                            <Text style={{ textAlign: 'center', color: colors.text_of_box, fontSize: 16 }}>{word.name}</Text>
                        </View>
                        <View style={{ flexDirection: 'row', width: '48%', justifyContent: 'space-between', marginRight: 10 }}>

                            {word.length !== 0 ?
                                <TouchableOpacity style={{ justifyContent: 'center', marginLeft: 20, paddingRight: 10 }} onPress={() => setSearchRequire(true)}>
                                    <Icons name={"search"} size={24} style={{ color: colors.text_of_box }} />
                                </TouchableOpacity>
                                : null
                            }
                            {
                                type === 1 ?
                                    <View style={{ flexDirection: 'row' }}>
                                        <TouchableOpacity style={{ justifyContent: 'center', }} onPress={() => addVocu()}>
                                            <MaterialIcons name={"add-box"} size={24} style={{ color: '#fff' }} />
                                        </TouchableOpacity>

                                        <TouchableOpacity style={{ justifyContent: 'center', }} onPress={() => { setisVisibleShare(true), setSearching(false), setListUserShare(listdata.share) }}>
                                            <AntDesign name={"sharealt"} size={24} style={{ color: '#fff', marginLeft: 10 }} />
                                        </TouchableOpacity>

                                    </View> : null}
                            <TouchableOpacity style={{ justifyContent: 'center', }} onPress={() => setisVisibleSetting(true)}>
                                <Feather name={"settings"} size={24} style={{ color: '#fff', marginLeft: 10 }} />
                            </TouchableOpacity>

                        </View>

                    </View>
                    :

                    <View style={{ flexDirection: 'row', flex: 7, justifyContent: 'space-between' }}>
                        <TextInput
                            style={{ marginLeft: 10, fontSize: 18, color: '#fff' }}
                            placeholder="tìm kiếm ..."
                            value={nameSearch}
                            placeholderTextColor={colors.text_of_input}

                            onChangeText={text => onSearchNameWordInVocu(text)}
                        />
                        <View />
                        <AntDesign name={'close'} size={20}
                            onPress={() => { setSearchRequire(false); setSearching(false) }}
                            style={{ color: '#fff', paddingTop: 15, paddingRight: 20 }} />
                    </View>
                }
            </View>
            {word.data !== undefined && word.data.length !== 0 ?
                <ScrollView style={{ margin: 10 }}>
                    {
                        (searching === true ? filtered : sortword === 'checked' ? word.data.filter(e => e.type === "Từ vựng") :
                            sortgrammar === 'checked' ? word.data.filter(e => e.type === "Ngữ pháp") :
                                sortkanji === 'checked' ? word.data.filter(e => e.type === "Hán tự")
                                    : word.data)
                            .map((element, key) => {
                                return (
                                    <TouchableOpacity key={key} style={{ borderBottomColor: '#cccccc', borderBottomWidth: 1, paddingBottom: 10, paddingTop: 10 }} onPress={() => explainWord(element)}>
                                        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                                            <View>
                                                <Text style={{ color: colors.text }}>{key + 1}. {element.word} [{element.translate}]</Text>
                                                <Text style={{ marginTop: 5, color: colors.text }}>{element.vn}</Text>
                                            </View>
                                            {type === 1 ?
                                                <View style={{ flexDirection: 'row', justifyContent: 'flex-end' }}>
                                                    <TouchableOpacity onPress={() => editVocaAction(element)}>
                                                        <AntDesign name={'edit'} size={20} style={{ color: colors.textinput }} />
                                                    </TouchableOpacity>
                                                    <TouchableOpacity style={{ marginLeft: 10 }} onPress={() => deleteWordVocu(element)}>
                                                        <Iconss name={'delete-outline'} size={20} style={{ color: 'red' }} />
                                                    </TouchableOpacity>

                                                    {/* <TouchableOpacity style={{ marginLeft: 10 }} onPress={() => moveDiffVocu(element)}>
                                                    <MaterialIcons name={"drive-file-move"} size={20} style={{color: colors.text_of_input}} />
                                                </TouchableOpacity> */}
                                                </View>
                                                :
                                                (type !== 1 && users.role === 1) ?
                                                    <TouchableOpacity onPress={() => element.type === "Từ vựng" ? navigation.navigate("addWordVoca", { navigation: navigation, worddata: element })
                                                        : element.type === "Ngữ pháp" ? navigation.navigate("addGrammarVoca", { navigation: navigation, grammardata: element })
                                                            : navigation.navigate("addKanjiVoca", { navigation: navigation, kanjidata: element })
                                                    }>
                                                        <Entypo name={'add-to-list'} size={20} style={{ color: colors.text }} />

                                                    </TouchableOpacity>
                                                    : null
                                            }
                                        </View>
                                        <View style={{ justifyContent: 'flex-end', flexDirection: 'row' }}>
                                            {
                                                word.user_id.username !== undefined ?
                                                    <Text style={{ color: colors.text }}>Được chi sẻ bởi {word.user_id.username} {new Date(element.date).getFullYear() + '/' + fixDigit(new Date(element.date).getMonth()) + '/' + fixDigit(new Date(element.date).getDate())}</Text>
                                                    :
                                                    <Text style={{ color: colors.text }}> {new Date(element.date).getFullYear() + '/' + fixDigit(new Date(element.date).getMonth()) + '/' + fixDigit(new Date(element.date).getDate())}</Text>
                                            }
                                        </View>
                                    </TouchableOpacity>

                                )
                            })
                    }
                </ScrollView>
                :
                <View style={{ padding: 10 }}>
                    <Text style={{ fontSize: 20, color: colors.text }}>- Bạn chưa thêm từ vào sổ tay </Text>
                    <Text style={{ fontSize: 20, color: colors.text }}>- Tra cứu từ vựng, kanji, ngữ pháp rồi click vào biểu tượng + hoặc biểu tượng +
                        ở góc bên phải màn hình để thêm từ vào sổ tay
                    </Text>
                </View>
            }

            {/* add tu */}
            <View style={styles.container}>
                <Modal
                    isVisible={isVisibleAdd}
                    animationInTiming={1000}
                    animationOutTiming={1000}
                    backdropTransitionInTiming={1000}
                    backdropTransitionOutTiming={1000}
                    deviceWidth={WIDTH}
                    onRequestClose={() => setisVisibleAdd(false)}

                >
                    <View style={[styles.modalContent, { marginTop: 50, minHeight: 150, padding: 20, backgroundColor: colors.background }]}>
                        <View style={{}}>
                            <Text style={{ fontWeight: 'bold', fontSize: 20, textAlign: 'center', justifyContent: 'center', color: colors.text }}>Thêm từ vào : "{word.name}"</Text>
                            <View>
                                <SelectDropdown
                                    data={wordoptions}
                                    onSelect={(selectedItem, index) => {
                                        setValue(selectedItem);
                                    }}
                                    dropdownStyle={{ backgroundColor: colors.dropdown }}
                                    defaultValue={value}
                                    buttonStyle={{ marginTop: 15, width: '100%', backgroundColor: colors.background, borderColor: '#cccccc', borderWidth: 1, borderRadius: 5 }}
                                    buttonTextStyle={{ backgroundColor: colors.background, marginLeft: -200, color: colors.textinput }}
                                />
                                <TextInputPaper label="Từ" mode="outlined"
                                    style={{ marginTop: 10, }}
                                    theme={{
                                        colors: {
                                            primary: colors.header,
                                            underlineColor: 'transparent',

                                        }
                                    }}
                                    onChangeText={(text) => value === "Từ vựng" ? onSearchWord(text) : value === "Hán tự" ? onSearchKanji(text) : onSearchGrammar(text)}
                                    value={textInput}

                                />
                                {/* <View> */}
                                {
                                    searchAdd && value === "Ngữ pháp" &&
                                    // <SearchDropDownGrammar
                                    //     onPress={() => setSearching(false)}
                                    //     dataGrammar={filtered}
                                    //     navigation={navigation}
                                    //     dataVocu={word}
                                    // />
                                    <TouchableOpacity
                                        onPress={() => setSearchAdd(false)}
                                        style={[styles.containerDropdown, { backgroundColor: colors.dropdown }]}>

                                        <View>
                                            {
                                                filtered.length ?
                                                    <ScrollView>
                                                        <FlatList
                                                            // style={{}}
                                                            style={styles.subContainer}
                                                            data={filtered}
                                                            keyExtractor={item => item.id}
                                                            renderItem={renderGrammar}
                                                        />
                                                    </ScrollView>

                                                    :
                                                    <Text></Text>
                                            }

                                        </View>
                                    </TouchableOpacity>


                                }
                                {
                                    searchAdd && value === "Từ vựng" &&
                                    // <SearchDropDownWord
                                    //     onPress={() => setSearching(false)}
                                    //     dataGrammar={filtered}
                                    //     navigation={navigation}
                                    //     dataVocu={word}
                                    // />

                                    <TouchableOpacity
                                        onPress={() => setSearchAdd(false)}
                                        style={[styles.containerDropdown, { backgroundColor: colors.dropdown }]}>

                                        <View>
                                            {
                                                filtered.length ?
                                                    <ScrollView>
                                                        <FlatList
                                                            // style={{}}
                                                            style={styles.subContainer}
                                                            data={filtered}
                                                            keyExtractor={item => item.id}
                                                            renderItem={renderWord}
                                                        />
                                                    </ScrollView>

                                                    :
                                                    <Text></Text>
                                            }

                                        </View>
                                    </TouchableOpacity>


                                }

                                {
                                    searchAdd && value === "Hán tự" &&
                                    // <SearchDropDownKanji
                                    //     onPress={() => {setSearching(false), setisVisibleAdd(false)}}
                                    //     dataGrammar={filtered}
                                    //     navigation={navigation}
                                    //     dataVocu={word}
                                    // />
                                    <TouchableOpacity
                                        onPress={() => setSearchAdd(false)}
                                        style={[styles.containerDropdown, { backgroundColor: colors.dropdown }]}>

                                        <View>
                                            {
                                                filtered.length ?
                                                    <ScrollView>
                                                        <FlatList
                                                            // style={{}}
                                                            style={styles.subContainer}
                                                            data={filtered}
                                                            keyExtractor={item => item.id}
                                                            renderItem={renderKanji}
                                                        />
                                                    </ScrollView>

                                                    :
                                                    <Text></Text>
                                            }

                                        </View>
                                    </TouchableOpacity>

                                }


                                <TextInputPaper label="PHiên âm"
                                    mode="outlined"
                                    style={{ marginTop: 10, zIndex: 0 }}
                                    value={spell}
                                    // editable={false}
                                    theme={{
                                        colors: {
                                            primary: colors.header,
                                            underlineColor: 'transparent',

                                        }
                                    }}
                                    onChangeText={(text) => setSpell(text)} />
                                <TextInputPaper
                                    label="Nghĩa"
                                    mode="outlined"
                                    theme={{
                                        colors: {
                                            primary: colors.header,
                                            underlineColor: 'transparent',

                                        }
                                    }}
                                    style={{ marginTop: 10, zIndex: 0 }}
                                    value={mean}
                                    onChangeText={(text) => setMean(text)} />
                                <TextInput
                                    placeholder='note...'
                                    style={{ borderWidth: 1, borderColor: '#8c8c8c', zIndex: 0, marginTop: 15, borderRadius: 5 }}
                                    multiline={true}
                                    numberOfLines={4}
                                    placeholderTextColor={colors.text_of_input}

                                    onChangeText={(text) => setNote(text)}
                                    value={note} />
                                <View style={{ justifyContent: 'space-between', flexDirection: 'row', marginTop: 20 }}>
                                    <TouchableOpacity
                                        onPress={() => setisVisibleAdd(false)}
                                        style={[styles.keepStyle, { backgroundColor: '#999999', }]}>
                                        <Text style={{ color: '#fff' }}>Đóng</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity style={[styles.keepStyle, { backgroundColor: colors.header, }]}
                                        onPress={() => createWordVoca()}
                                    >
                                        <Text style={{ color: '#fff' }}>Xong</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>

                        </View>

                    </View>
                </Modal>
            </View >

            {/* view từ */}
            <View style={styles.container}>
                <Modal
                    isVisible={isVisbileviewRequest}
                    animationInTiming={1000}
                    animationOutTiming={1000}
                    backdropTransitionInTiming={1000}
                    backdropTransitionOutTiming={1000}
                    deviceWidth={WIDTH}
                    onRequestClose={() => setisVisibleAdd(false)}

                >
                    <View style={[styles.modalContent, { marginTop: 50, minHeight: 150, padding: 20, backgroundColor: colors.background }]}>
                        <View style={{}}>
                            <Text style={{ fontWeight: 'bold', fontSize: 20, textAlign: 'center', justifyContent: 'center', color: colors.text }}>Xem thông tin "{viewElement.word}"</Text>
                            <View>
                                <SelectDropdown
                                    data={wordoptions}
                                    // onSelect={(selectedItem, index) => {
                                    //     setValue(selectedItem);
                                    // }}
                                    dropdownStyle={{ backgroundColor: colors.dropdown }}
                                    defaultValue={viewElement.type}
                                    buttonStyle={{ marginTop: 15, width: '100%', backgroundColor: colors.background, borderColor: '#cccccc', borderWidth: 1, borderRadius: 5 }}
                                    buttonTextStyle={{ backgroundColor: colors.background, marginLeft: -200, color: colors.textinput }}
                                />
                                <TextInputPaper label="Từ" mode="outlined"
                                    style={{ marginTop: 10, }}
                                    theme={{
                                        colors: {
                                            primary: colors.header,
                                            underlineColor: 'transparent',

                                        }
                                    }}
                                    editable={false}
                                    // onChangeText={(text) => value === "Từ vựng" ? onSearchWord(text) : value === "Hán tự" ? onSearchKanji(text) : onSearchGrammar(text)}
                                    value={viewElement.word}

                                />



                                <TextInputPaper label="PHiên âm"
                                    mode="outlined"
                                    style={{ marginTop: 10, zIndex: 0 }}
                                    value={viewElement.translate}
                                    editable={false}
                                    theme={{
                                        colors: {
                                            primary: colors.header,
                                            underlineColor: 'transparent',

                                        }
                                    }}
                                // onChangeText={(text) => setSpell(text)} 
                                />
                                <TextInputPaper
                                    label="Nghĩa"
                                    mode="outlined"
                                    theme={{
                                        colors: {
                                            primary: colors.header,
                                            underlineColor: 'transparent',

                                        }
                                    }}
                                    editable={false}
                                    style={{ marginTop: 10, zIndex: 0 }}
                                    value={viewElement.vn}
                                // onChangeText={(text) => setMean(text)} 
                                />
                                <TextInput
                                    // placeholder='note...'
                                    style={{ borderWidth: 1, minHeight: 100, borderColor: '#8c8c8c', zIndex: 0, marginTop: 15, borderRadius: 5, color: colors.text }}
                                    multiline={true}
                                    // numberOfLines={4}
                                    editable={false}
                                    // placeholderTextColor={colors.text_of_input}

                                    // onChangeText={(text) => setNote(text)}
                                    value={viewElement.note} />
                                <View style={{ justifyContent: 'center', alignItems: 'center', alignSelf: 'center', marginTop: 20 }}>
                                    <TouchableOpacity
                                        onPress={() => setisVibilaViewRequest(false)}
                                        style={[styles.keepStyle, { backgroundColor: '#999999', }]}>
                                        <Text style={{ color: '#fff' }}>Đóng</Text>
                                    </TouchableOpacity>

                                </View>
                            </View>

                        </View>

                    </View>
                </Modal>
            </View >

            {/* edit tuwf */}



            < View style={styles.container} >
                <Modal
                    isVisible={isVisibleEdit}
                    animationInTiming={1000}
                    animationOutTiming={1000}
                    backdropTransitionInTiming={1000}
                    backdropTransitionOutTiming={1000}
                    deviceWidth={WIDTH}
                >
                    <View style={[styles.modalContent, { marginTop: 50, minHeight: 170, backgroundColor: colors.background }]}>
                        <View style={{ padding: 15 }}>
                            <Text style={{ fontWeight: 'bold', fontSize: 20, color: colors.text }}>Chỉnh sửa nghĩa của từ {currentElement.wordD}</Text>
                            <TextInput
                                style={{ borderBottomWidth: 1, borderBottomColor: '#80b3ff', alignItems: 'center', justifyContent: 'center', color: colors.text }}
                                placeholder="Nhập nhóm từ cần lưu"
                                placeholderTextColor={colors.text_of_input}

                                value={newEdit}
                                onChangeText={text => setNewEdit(text)}
                            />
                            <View style={styles.stylebutton}>
                                <TouchableOpacity
                                    onPress={() => setisVisibleEdit(false)}
                                    style={[styles.keepStyle, { backgroundColor: '#999999', marginRight: 110 }]}>
                                    <Text style={{ color: '#fff' }}>Đóng</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={[styles.keepStyle, { backgroundColor: colors.header, }]}
                                    onPress={() => editWordVoca()}
                                >
                                    <Text style={{ color: '#fff' }}>Sửa</Text>
                                </TouchableOpacity>
                            </View>

                        </View>

                    </View>
                </Modal>
            </View >

            {/* model share */}
            < View style={styles.container} >
                <Modal
                    isVisible={isVisibleShare}
                    swipeDirection="down"
                    style={{ justifyContent: 'flex-end', margin: 0, }}
                    onRequestClose={() => setisVisibleShare(false)}
                    deviceWidth={WIDTH}
                    deviceHeight={HEIGHT}
                >
                    <ScrollView style={[styles.modalContent, { flex: 1, height: HEIGHT, backgroundColor: colors.background }]}>
                        <View style={{ padding: 15 }}>
                            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                                <View style={{ flexDirection: 'row', justifyContent: 'flex-start' }}>
                                    <AntDesign name={'close'} size={20}
                                        onPress={() => setisVisibleShare(false)}
                                        style={{ marginTop: 5, color: colors.text }} />
                                    <Text style={{ fontWeight: 'bold', fontSize: 20, marginLeft: 10, color: colors.text }}>Chia sẻ  </Text>
                                </View>
                                {(sharePersion === 'checked' || sharePrivate === 'checked') && shareAll === 'unchecked' ?
                                    <TouchableOpacity onPress={() => sendShare()}>
                                        <Text style={{ fontSize: 20, marginLeft: 10, flexDirection: 'row', color: colors.header, justifyContent: 'flex-end' }}>Gửi</Text>
                                    </TouchableOpacity>
                                    :
                                    null
                                }
                            </View>

                            <View>
                                <View style={{ flexDirection: 'row', paddingTop: 20, paddingBottom: 10 }}>
                                    <RadioButton
                                        uncheckedColor={colors.text}
                                        color={colors.header}
                                        tintColors={{ true: colors.header, false: colors.text }}
                                        status={sharePrivate}
                                        onPress={() => toggleSwitchSharePrivate()}
                                    />
                                    <Text style={{ marginTop: 8, color: colors.text }}>Chỉ mình tôi</Text>
                                </View>
                                <View style={{ flexDirection: 'row', paddingBottom: 10 }}>
                                    <RadioButton
                                        uncheckedColor={colors.text}
                                        color={colors.header}
                                        tintColors={{ true: colors.header, false: colors.text }}
                                        status={sharePersion}
                                        onPress={() => toggleSwitchSharePersion()}
                                    />
                                    <Text style={{ marginTop: 8, color: colors.text }}>Chia sẻ với những người dùng cụ thể</Text>
                                </View>

                                <View style={{ flexDirection: 'row', }}>
                                    <RadioButton
                                        uncheckedColor={colors.text}
                                        color={colors.header}
                                        tintColors={{ true: colors.header, false: colors.text }}
                                        status={shareAll}
                                        onPress={() => toggleSwitchShareAll()}
                                    />
                                    <Text style={{ marginTop: 8, color: colors.text }}>Chia sẻ với tất cả người dùng</Text>
                                </View>
                            </View>

                            {/* {

                            } */}
                            {sharePersion === 'checked' ?
                                <View>
                                    <TextInput
                                        style={{ color: colors.text, borderBottomWidth: 1, borderBottomColor: colors.header, backgroundColor: colors.background, paddingLeft: 10, alignItems: 'center', justifyContent: 'center' }}
                                        placeholder="Thêm người chia sẻ"
                                        placeholderTextColor={colors.text_of_input}

                                        onChangeText={(text) => onSearchUser(text)}
                                        value={inputUser}
                                    />
                                    {
                                        searching &&
                                        <TouchableOpacity
                                            onPress={() => setSearching(false)}
                                            style={styles.containerDropdownUser}>

                                            <View>
                                                {
                                                    filtered.length ?
                                                        <ScrollView>
                                                            <FlatList
                                                                // style={{}}
                                                                style={[styles.subContainer, { backgroundColor: colors.block }]}
                                                                data={filtered}
                                                                keyExtractor={item => item.id}
                                                                renderItem={renderUser}
                                                            />
                                                        </ScrollView>

                                                        :
                                                        <Text></Text>
                                                }

                                            </View>
                                        </TouchableOpacity>

                                    }

                                    <View style={{ maxHeight: 200, minHeight: 100, borderBottomWidth: 1, borderBottomColor: colors.text_of_input, paddingBottom: 10 }}>
                                        <View style={{ flexDirection: 'row', marginTop: 15 }}>
                                            <Image
                                                style={{ height: 40, width: 40, borderRadius: 20 }}
                                                source={{
                                                    uri: users.avatar,
                                                }}
                                            />
                                            <View style={{ marginLeft: 10 }}>
                                                <Text style={{ color: colors.text }}>{users.username} (bạn)</Text>
                                                <Text style={{ color: colors.text }}>{users.email}</Text>
                                            </View>
                                        </View>
                                        <ScrollView>
                                            {
                                                listUserShare.map((element, key) => {
                                                    return (
                                                        <View key={key} style={{ flexDirection: 'row', marginTop: 15, justifyContent: 'space-between' }}>
                                                            <View style={{ flexDirection: 'row', justifyContent: 'flex-start' }}>
                                                                <Image
                                                                    style={{ height: 40, width: 40, borderRadius: 20 }}
                                                                    source={{
                                                                        uri: 'data:image/jpeg;base64,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',
                                                                    }}
                                                                />
                                                                <View style={{ marginLeft: 10 }}>
                                                                    <Text style={{ color: colors.text }}>{element.username}</Text>
                                                                    <Text style={{ color: colors.text }}>{element.email}</Text>
                                                                </View>
                                                            </View>
                                                            <TouchableOpacity style={{ flexDirection: 'row', justifyContent: 'flex-end' }} onPress={() => deleteUser(element)}>
                                                                <Iconss name={'delete-outline'} size={20} style={{ color: 'red' }} />
                                                            </TouchableOpacity>
                                                        </View>
                                                    )
                                                })
                                            }
                                        </ScrollView>
                                    </View>

                                    {/* </View> */}

                                    <View style={[styles.checkboxContainer]}>
                                        <CheckBox
                                            tintColors={{ true: colors.header, false: colors.text }}
                                            value={noti}
                                            onValueChange={() => setNoti(!noti)}
                                        />
                                        <Text style={{ marginTop: 5, color: colors.text }}>Thông báo cho những người này</Text>
                                    </View>
                                    <TextInput
                                        placeholder='Lời nhắn...'
                                        style={{ borderWidth: 1, borderColor: '#d9d9d9', margin: 10, padding: 10, zIndex: 0, borderRadius: 5 }}
                                        multiline={true}
                                        numberOfLines={4}
                                        placeholderTextColor={colors.text_of_input}

                                        onChangeText={(text) => setRemind(text)}
                                        value={remind} />
                                </View>
                                :
                                null
                            }
                            {
                                shareAll === 'checked' ?
                                    <TouchableOpacity style={{ marginLeft: 10 }} onPress={() => navigation.navigate("ShareAll", { navigation: navigation, datavocu: word })}>
                                        <Text style={{ color: 'blue', fontStyle: "italic", color: colors.header }}>Chia sẻ với tất cả người dùng</Text>
                                    </TouchableOpacity>
                                    : null
                            }


                        </View>
                        {/* : null
                    } */}



                    </ScrollView>
                </Modal>
            </View >
            {/* setting filter */}
            <View style={[styles.container]}>
                <Modal
                    isVisible={isVisibleSetting}
                    swipeDirection="down"
                    style={{ justifyContent: 'flex-end', margin: 0 }}
                    onRequestClose={() => setisVisibleSetting(false)}
                    deviceWidth={WIDTH}
                >
                    <View>
                        <View style={{ height: 40, backgroundColor: colors.header, justifyContent: 'center', alignItems: 'center', flexDirection: 'row', justifyContent: 'space-between' }}>
                            <Text style={{ color: '#fff', fontSize: 18, marginLeft: 5 }}>Cài đặt: </Text>
                            <AntDesign name={'close'} size={20} color={'#fff'}
                                onPress={() => setisVisibleSetting(false)}
                                style={{ marginTop: 5, marginRight: 10 }} />
                        </View>
                        <View style={[styles.modalContent, { flexDirection: 'row', backgroundColor: colors.background }]}>
                            <View style={{ width: '50%' }}>
                                <Text style={{ marginLeft: 5, marginTop: 5, color: colors.text, fontSize: 16 }}>Sắp xếp theo:</Text>
                                <View>
                                    <View style={{ flexDirection: 'row', paddingTop: 10, paddingBottom: 10 }}>
                                        <RadioButton
                                            uncheckedColor={colors.text}
                                            color={colors.header}
                                            tintColors={{ true: colors.header, false: colors.text }}
                                            status={sort1}
                                            onPress={() => toggleSwitchSort1()}
                                        />
                                        <Text style={{ marginTop: 5, fontSize: 18, color: colors.text }}>A - Z</Text>
                                    </View>

                                    <View style={{ flexDirection: 'row', paddingTop: 10, paddingBottom: 10 }}>
                                        <RadioButton
                                            uncheckedColor={colors.text}
                                            color={colors.header}
                                            tintColors={{ true: colors.header, false: colors.text }}
                                            status={sort2}
                                            onPress={() => toggleSwitchSort2()}
                                        />
                                        <Text style={{ marginTop: 5, fontSize: 18, color: colors.text }}>Mới - Cũ</Text>
                                    </View>
                                    <View style={{ flexDirection: 'row', paddingTop: 10, paddingBottom: 10 }}>
                                        <RadioButton
                                            uncheckedColor={colors.text}
                                            color={colors.header}
                                            tintColors={{ true: colors.header, false: colors.text }}
                                            status={sort3}
                                            onPress={() => toggleSwitchSort3()}
                                        />
                                        <Text style={{ marginTop: 5, fontSize: 18, color: colors.text }}>Cũ - Mới</Text>
                                    </View>
                                    <View style={{ flexDirection: 'row', paddingTop: 10, paddingBottom: 10 }}>
                                        <RadioButton
                                            uncheckedColor={colors.text}
                                            color={colors.header}
                                            tintColors={{ true: colors.header, false: colors.text }}
                                            status={sort4}
                                            onPress={() => toggleSwitchSort4()}
                                        />
                                        <Text style={{ marginTop: 5, fontSize: 18, color: colors.text }}>Z - A</Text>
                                    </View>
                                </View>
                            </View>
                            <View style={{ width: '50%' }}>
                                <Text style={{ marginTop: 5, color: colors.text, fontSize: 16 }}>Lọc: </Text>
                                <View>
                                    <View style={{ flexDirection: 'row', paddingTop: 10, paddingBottom: 10 }}>
                                        <RadioButton
                                            uncheckedColor={colors.text}
                                            color={colors.header}
                                            tintColors={{ true: colors.header, false: colors.text }}
                                            status={sortAll}
                                            onPress={() => toggleSwitchSortAll()}
                                        />
                                        <Text style={{ marginTop: 5, fontSize: 18, color: colors.text }}>All</Text>
                                    </View>

                                    <View style={{ flexDirection: 'row', paddingTop: 10, paddingBottom: 10 }}>
                                        <RadioButton
                                            uncheckedColor={colors.text}
                                            color={colors.header}
                                            tintColors={{ true: colors.header, false: colors.text }}
                                            status={sortword}
                                            onPress={() => toggleSwitchSortWord()}
                                        />
                                        <Text style={{ marginTop: 5, fontSize: 18, color: colors.text }}>Từ vựng</Text>
                                    </View>
                                    <View style={{ flexDirection: 'row', paddingTop: 10, paddingBottom: 10 }}>
                                        <RadioButton
                                            uncheckedColor={colors.text}
                                            color={colors.header}
                                            tintColors={{ true: colors.header, false: colors.text }}
                                            status={sortgrammar}
                                            onPress={() => toggleSwitchSortGrammar()}
                                        />
                                        <Text style={{ marginTop: 5, fontSize: 18, color: colors.text }}>Ngữ pháp</Text>
                                    </View>
                                    <View style={{ flexDirection: 'row', paddingTop: 10, paddingBottom: 10 }}>
                                        <RadioButton
                                            uncheckedColor={colors.text}
                                            color={colors.header}
                                            tintColors={{ true: colors.header, false: colors.text }}
                                            status={sortkanji}
                                            onPress={() => toggleSwitchSortKanji()}
                                        />
                                        <Text style={{ marginTop: 5, fontSize: 18, color: colors.text }}>Chữ hán</Text>
                                    </View>
                                </View>
                            </View>
                        </View>
                    </View>
                </Modal>
            </View>
            <Modal
                isVisible={modelWord}
            >
                <View style={styles.containerModal}>
                    <View style={{ borderRadius: 4, backgroundColor: colors.background, justifyContent: 'center', alignItems: 'center', width: '90%', padding: 20, alignSelf: 'center' }}>
                        <View>
                            <AntDesign name={'questioncircle'} size={40} style={{ color: 'red' }} />
                        </View>
                        <View style={{ marginTop: 10 }}>
                            {/* <Text style={[styles.textAlert, {color: colors.text}]}>Bạn có muốn sử dụng  </Text> */}
                            <Text style={[styles.textAlert, { color: colors.text }]}>{textAlert} </Text>
                            {/* <Text style={[styles.textAlert, {color: colors.text}]}>đã có trong bộ từ của app ? </Text> */}
                        </View>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 20 }}>
                            <View style={{ flex: 1 }} />
                            <View style={{ flex: 1 }} />
                            <TouchableOpacity
                                onPress={() => setModalAlertError(false)}
                                style={{}}>
                                <Text style={{}}>No</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                onPress={() => setModalAlertError(false)}
                                style={{}}>
                                <Text style={{ marginLeft: 30 }}>Yes</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={{}}
                                onPress={() => {
                                    dispatch(getListWordCommentRequest(users._id, dataSearch._id));
                                    navigation.navigate("WordScreenDetail", { vocabularys: dataSearch });
                                }}
                            // style={{ marginLeft: 20, marginRight: -40, justifyContent: 'flex-end' }}
                            >
                                <Text style={{ marginLeft: 30 }}>Xem chi tiết</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </Modal>



        </View >
    )
}

const styles = StyleSheet.create({
    containerModal: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    textAlert: {
        fontSize: 16,
        textAlign: 'justify',
        lineHeight: 23,
    },
    checkboxContainer: {
        flexDirection: 'row',
        paddingTop: 20,
        marginLeft: 5
        // borderBottomWidth: 1 
    },
    containerDropdown: {
        position: 'absolute',
        left: 0, right: 0, bottom: 0,
        // top: 130,
        top: WIDTH / 3,
        width: WIDTH - 80,
        zIndex: 1,
        minHeight: WIDTH / 2,

    },
    containerDropdownUser: {
        position: 'absolute',
        left: -15, right: 0, bottom: 0,
        // top: 130,
        top: WIDTH / 5,
        width: WIDTH,
        zIndex: 1,
        minHeight: WIDTH / 2
    },
    subContainer: {
        minHeight: 150,

        marginHorizontal: 20,
        borderTopLeftRadius: 4,
        borderTopRightRadius: 4,
        flexWrap: 'wrap',
    },
    itemView: {
        borderBottomColor: '#cccccc',
        borderBottomWidth: 1,
        // backgroundColor: 'white',
        minHeight: 40,
        width: WIDTH - 44,
        justifyContent: 'center',
        borderRadius: 4,
    },
    itemText: {
        paddingHorizontal: 10,
    },
    container: {
        width: WIDTH,
        flex: 1,
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

        borderRadius: 4,
        borderColor: 'rgba(0, 0, 0, 0.1)',
    },
    //   bottomModal: {
    //     justifyContent: 'flex-end',
    //     margin: 0,
    //   },
    text: {
        fontSize: 24,
        marginBottom: 30,
        padding: 40,
    },
    stylebutton: { flexDirection: 'row', justifyContent: 'space-around', flex: 4, marginTop: 20 },
    keepStyle: { height: 40, width: 100, alignItems: 'center', justifyContent: 'center', borderRadius: 5, },
    action: {
        flexDirection: 'row',
        marginTop: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#f2f2f2',
        paddingBottom: 5
    },
    textInput: {
        flex: 1,
        marginTop: Platform.OS === 'ios' ? 0 : -12,
        paddingLeft: 10,
        color: '#05375a',
    },

});

export default ListWordVocabulary;