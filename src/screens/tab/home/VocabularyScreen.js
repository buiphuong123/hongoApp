import React, { Component, useEffect, useState } from 'react'
import { Text, View, SafeAreaView, ScrollView, TouchableOpacity, Alert, StyleSheet, Dimensions, TextInput } from 'react-native'
import { useDispatch, useSelector } from 'react-redux';
import { useTheme } from 'react-native-paper';
import Icons from 'react-native-vector-icons/AntDesign';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Icon from 'react-native-vector-icons/Ionicons';
import Iconss from 'react-native-vector-icons/MaterialCommunityIcons';
import { element, number } from 'prop-types';
import { Card, Avatar, Button } from 'react-native-paper';
import Modal from 'react-native-modal'; // 2.4.0
import { getListVocaSuccess } from '../../../redux/actions/vocabulary.action';
import axios from 'axios';
import { RadioButton } from 'react-native-paper';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
const WIDTH = Dimensions.get('window').width;
import { showToastSuccess, showToastError } from '../../../helpers/toastHelper';
const VocabularyScreen = ({ navigation }) => {
    const { colors } = useTheme();
    const [isVisibleAdd, setisVisibleAdd] = useState(false);
    const [isVisibleEdit, setisVisibleEdit] = useState(false);
    const [currentElement, setCurrentElement] = useState({});
    const [newVocu, setNewVocu] = useState("");
    const [isVisibleDelete, setisVisibleDelete] = useState(false);
    const [name, setName] = useState("");
    const users = useSelector(state => state.userReducer.user);
    const colorBack = ["#0000b3", "#005ce6", "#ff9900", "#00b300", "#e67300"];
    const vocabulary = useSelector(state => state.vocabularyReducer.vocabularyList);
    const date = new Date();
    const [numberTab, setNumberTab] = useState(1);
    const [isVisibleSort, setisVisibleSort] = useState(false);
    const [sort1, setSort1] = useState('unchecked');
    const [sort2, setSort2] = useState('unchecked');
    const [sort3, setSort3] = useState('checked');
    const [sort4, setSort4] = useState('unchecked');
    const [nameSearch, setNameSearch] = useState("");
    const ramdom = Math.floor(Math.random() * colorBack.length);
    const dispatch = useDispatch();
    const vocabularyShare = useSelector(state => state.vocabularyReducer.vocabularyShare);

    // const vocabulary = [
    //     {
    //         "data": [
    //             {
    //                 "kaka": 1,
    //                 "momo": "sorry"
    //             }
    //         ],
    //         "share": [],
    //         "_id": "627e9c984a90e22e08c12169",
    //         "name": "bo dong vat",
    //         "user_id": "61590bbd7463724428b252d2",
    //         "date": "2022-05-13T17:59:52.620Z",
    //         "__v": 0
    //     },
    //     {
    //         "data": [
    //             {
    //                 "kaka": 2,
    //                 "momo": "huhu"
    //             }
    //         ],
    //         "share": [],
    //         "_id": "627e9c984a90e22e08c12168",
    //         "name": "kaka",
    //         "user_id": "61590bbd7463724428b252d2",
    //         "date": "2022-05-13T17:59:52.620Z",
    //         "__v": 0
    //     },
    // ];
    const [dataList, setDataList] = useState(vocabulary);
    const [dataShare, setDataShare] = useState(vocabularyShare);
    const [searchRequire, setSearchRequire] = useState(false);
    const [searching, setSearching] = useState(false);
    const [searchname, setSearchName] = useState("");
    const [filtered, setFiltered] = useState(vocabulary);
    useEffect(() => {
        setDataList(vocabulary);
        setDataShare(vocabularyShare);
    }, [vocabulary, vocabularyShare]);
    // useEffect(() => {
    //     const unsubscribe = navigation.addListener('focus', () => {
    //         setDataList(vocabulary);
    //         //Put your Data loading function here instead of my loadData()
    //     });

    //     return unsubscribe;
    // }, [navigation]);

    const onSearchNameVocu = (text) => {
        setSearchName(text);
        if (text) {
            setSearching(true);
            if (numberTab === 1) {
                const tempList = dataList.filter(item => {
                    if (item.name.toLowerCase().match(text.toLowerCase()))
                        return item
                })
                setFiltered(tempList);
            }
            else {
                const tempList = dataShare.filter(item => {
                    if (item.name.toLowerCase().match(text.toLowerCase()))
                        return item
                })
                setFiltered(tempList);
            }
        }
    }
    const createVoca = () => {
        const obj = dataList.findIndex(e => e.name === name);
        if(obj !== -1) {
            setisVisibleAdd(false);
            showToastError(`B??? t??? ${name} ???? t???n t???i!`);
            return;
        }
        axios.post('https://nameless-spire-67072.herokuapp.com/language/createVocabulary', {
            "user_id": users._id,
            "name": name,
            // "dataElement": vocabulary,
            "date": date
        }, {
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json"
            }
        })
            .then((response) => {
                console.log(response.data);
                setName("");
                showToastSuccess(`T???o th??nh c??ng b??? t??? ${name}`);
                setDataList([...dataList.concat(response.data.vocabulary)]);
                dispatch(getListVocaSuccess(dataList.concat(response.data.vocabulary)));


            })
            .catch(function (error) {
                throw error;
            })
        setisVisibleAdd(false);
    }
    const listVoca = (element, numberTab) => {
        navigation.navigate("ListWordVocabulary", { navigation: navigation, listdata: element, status: false, type: numberTab });
    }
    const editVocaAction = (element) => {
        setNewVocu(element.name);
        setCurrentElement(element);
        setisVisibleEdit(true);
    }
    const editVoca = () => {
        const obj = dataList.findIndex(e => e.name === newVocu);
        if(obj !== -1) {
            setisVisibleEdit(false);
            showToastError(`B??? t??? ${newVocu} ???? t???n t???i!`);
            return;
        }
        if (currentElement.name === newVocu || newVocu === '') {
            return;
        }
        
        else {
            const objectIndex = dataList.findIndex(e => e._id === currentElement._id);
            if (objectIndex === -1) {

            }
            console.log('OBJ INDEX DAY NE', objectIndex);
            dataList[objectIndex].name = newVocu;
            dataList[objectIndex].date = date;
            setDataList([...dataList]);
            dispatch(getListVocaSuccess(dataList));
            axios.post('https://nameless-spire-67072.herokuapp.com/language/editVocabulary', {
                "id": currentElement._id,
                "name": newVocu,
                // "dataElement": vocabulary,
                "date": date
            }, {
                headers: {
                    "Accept": "application/json",
                    "Content-Type": "application/json"
                }
            })
                .then((response) => {
                    console.log(response.data);
                    showToastSuccess("S???a th??nh c??ng ");
                })
                .catch(function (error) {
                    throw error;
                })
        }
        setisVisibleEdit(false);
    }

    const deleteVocuShare = (element) => {
        Alert.alert(
            "Th??ng b??o",
            "B???n c?? ch???c ch???n mu???n x??a " + element.name + " kh???i b??? t??? ???????c chia s??? ?",
            [
                {
                    text: "Cancel",
                    onPress: () => console.log("Cancel Pressed"),
                    style: "cancel"
                },
                {
                    text: "OK", onPress: () => {
                        const objectIndex = dataShare.findIndex(e => e._id === element._id);
                        if (objectIndex !== -1) {
                            dataShare.splice(objectIndex, 1);
                            setDataShare([...dataShare]);

                            axios.post('https://nameless-spire-67072.herokuapp.com/language/deleteVocabulary', {
                                "id": element._id,
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
    const deleteVocu = (element) => {
        console.log('vao dele');
        Alert.alert(
            "Th??ng b??o",
            "B???n c?? ch???c ch???n mu???n x??a " + element.name + "?",
            [
                {
                    text: "Cancel",
                    onPress: () => console.log("Cancel Pressed"),
                    style: "cancel"
                },
                {
                    text: "OK", onPress: () => {
                        const objectIndex = dataList.findIndex(e => e._id === element._id);
                        if (objectIndex !== -1) {
                            dataList.splice(objectIndex, 1);
                            setDataList([...dataList]);

                            axios.post('https://nameless-spire-67072.herokuapp.com/language/deleteVocabulary', {
                                "id": element._id,
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
        // var result = confirm("Want to delete " + element.name + "?");
        // if (result) {
        //     const objectIndex = dataList.findIndex(e => e._id === element._id);
        //     if(objectIndex !== -1) {
        //         dataList.splice(objectIndex, 1);
        //         setDataList([...dataList]);

        //         axios.post('http://192.168.1.722:3002/language/deleteVocabulary', {
        //         "id": element._id,
        //     }, {
        //         headers: {
        //             "Accept": "application/json",
        //             "Content-Type": "application/json"
        //         }
        //     })
        //         .then((response) => {
        //             console.log(response.data);
        //         })
        //         .catch(function (error) {
        //             throw error;
        //         })
        //     }
        // }
    }

    const fixDigit = (val) => {
        return (val < 10 ? '0' : '') + val;
    }

    const toggleSwitchSort1 = () => {
        if (sort1 === 'unchecked') {
            dataList.sort(function sortComparer(a, b) {
                return a.name.localeCompare(b.name)
            });
            setDataList([...dataList]);
            setSort1('checked');
            setSort2('unchecked');
            setSort3('unchecked');
            setSort4('unchecked');
        }
    }
    const toggleSwitchSort2 = () => {
        if (sort2 === 'unchecked') {
            dataList.sort(function (a, b) {
                return new Date(b.date) - new Date(a.date);
            })
            setDataList([...dataList]);
            setSort1('unchecked');
            setSort2('checked');
            setSort3('unchecked');
            setSort4('unchecked');
        }
    }
    const toggleSwitchSort3 = () => {
        if (sort3 === 'unchecked') {
            dataList.sort(function (a, b) {
                return new Date(a.date) - new Date(b.date);
            })
            setDataList([...dataList]);
            setSort1('unchecked');
            setSort2('unchecked');
            setSort3('checked');
            setSort4('unchecked');
        }
    }
    const toggleSwitchSort4 = () => {
        if (sort4 === 'unchecked') {
            dataList.sort(function sortComparer(a, b) {
                return b.name.localeCompare(a.name)
            });
            setDataList([...dataList]);
            setSort1('unchecked');
            setSort2('unchecked');
            setSort3('unchecked');
            setSort4('checked');
        }
    }

    return (
        <View style={{ flex: 1 }}>
            {
                searchRequire === false ?
                    <View style={{ flexDirection: 'row', height: 50, backgroundColor: colors.header, justifyContent: 'space-evenly' }}>
                        <View style={{ flex: 1, justifyContent: 'center' }}>
                            <TouchableOpacity style={{ flexDirection: 'row', alignItems: 'center' }} onPress={() => navigation.goBack()}>
                                <Icon name={'arrow-back'} size={29} style={{ color: colors.text_of_box, marginLeft: 5 }} />
                            </TouchableOpacity>
                        </View>
                        <View style={{ flex: 1.5, justifyContent: 'center' }}>
                            <Text style={{ textAlign: 'center', color: colors.text_of_box, fontSize: 18 }}>S??? tay</Text>
                        </View>
                        <View style={{ flexDirection: 'row', marginRight: 20 }}>
                            {/* <TouchableOpacity style={{ justifyContent: 'center' }} onPress={() => action()}>
                                <Icons name={"clouddownloado"} size={29} style={{ color: '#fff' }} />
                            </TouchableOpacity> */}
                            <TouchableOpacity style={{ justifyContent: 'center', marginLeft: 20, paddingRight: 10 }} onPress={() => setSearchRequire(true)}>
                                <EvilIcons name={"search"} size={29} style={{ color: '#fff' }} />

                            </TouchableOpacity>
                            {numberTab === 1 ?
                                <TouchableOpacity style={{ justifyContent: 'center', marginLeft: 20 }} onPress={() => setisVisibleAdd(true)}>
                                    <MaterialIcons name={"add-box"} size={29} style={{ color: '#fff' }} />
                                </TouchableOpacity>
                                : null}
                            <TouchableOpacity style={{ justifyContent: 'center', marginRight: 10, marginLeft: 20 }} onPress={() => setisVisibleSort(true)}>
                                <MaterialCommunityIcons name={"sort-bool-ascending"} size={29} style={{ color: '#fff' }} />
                            </TouchableOpacity>
                        </View>
                    </View>
                    :
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', backgroundColor: colors.header }}>
                        <View style={{ flexDirection: 'row', justifyContent: 'flex-start' }}>
                            <TouchableOpacity style={{ flexDirection: 'row', alignItems: 'center' }} onPress={() => navigation.goBack()}>
                                <Icon name={'arrow-back'} size={29} style={{ color: '#fff', marginLeft: 5 }} />
                            </TouchableOpacity>
                            <TextInput
                                style={{ marginLeft: 10, fontSize: 18,color: '#fff' }}
                                placeholder="t??m ki???m ..."
                                placeholderTextColor={colors.text_of_input}
                                value={searchname}
                                onChangeText={text => onSearchNameVocu(text)}
                            />
                        </View>
                        <View />
                        <Icons name={'close'} size={20}
                            onPress={() => {setSearchRequire(false); setSearching(false)}}
                            style={{ color: '#fff', paddingTop: 15, paddingRight: 20 }} />
                    </View>
            }
            {/* <View style={{ flexDirection: 'row', justifyContent: 'space-between', backgroundColor: '#009387' }}>
                <View style={{flexDirection: 'row', justifyContent: 'flex-start'}}>
                    <TouchableOpacity style={{ flexDirection: 'row', alignItems: 'center' }} onPress={() => navigation.goBack()}>
                        <Icon name={'arrow-back'} size={29} style={{ color: colors.text, marginLeft: 5 }} />
                    </TouchableOpacity>
                    <TextInput
                        style={{ marginLeft: 10, fontSize: 18 }}
                        placeholder="t??m ki???m ..."
                        value={nameSearch}
                        onChangeText={text => setNameSearch(text)}
                    />
                </View>
                <View />
                <Icons name={'close'} size={20}
                    onPress={() => setSearchRequire(false)}
                    style={{ color: colors.text, paddingTop: 15, paddingRight: 20 }} />
            </View> */}
            {/* <View style={{ flexDirection: 'row', height: 50, backgroundColor: '#009387', justifyContent: 'space-evenly' }}>
                <View style={{ flex: 1, justifyContent: 'center' }}>
                    <TouchableOpacity style={{ flexDirection: 'row', alignItems: 'center' }} onPress={() => navigation.goBack()}>
                        <Icon name={'arrow-back'} size={29} style={{ color: colors.text, marginLeft: 5 }} />
                    </TouchableOpacity>
                </View>
                <View style={{ flex: 1.5, justifyContent: 'center' }}>
                    <Text style={{ textAlign: 'center', color: colors.text, fontSize: 18 }}>S??? tay</Text>
                </View>
                <View style={{ flexDirection: 'row', marginRight: 20 }}>
                    <TouchableOpacity style={{ justifyContent: 'center' }} onPress={() => action()}>
                        <Icons name={"clouddownloado"} size={29} style={{ color: '#fff' }} />
                    </TouchableOpacity>
                    <TouchableOpacity style={{ justifyContent: 'center', marginLeft: 20 }} onPress={() => setisVisibleAdd(true)}>
                        <MaterialIcons name={"add-box"} size={29} style={{ color: '#fff' }} />
                    </TouchableOpacity>
                    <TouchableOpacity style={{ justifyContent: 'center', marginRight: 10, marginLeft: 20 }} onPress={() => setisVisibleSort(true)}>
                        <Iconss name={"sort-bool-ascending"} size={29} style={{ color: '#fff' }} />
                    </TouchableOpacity>
                </View>
            </View> */}
            <View>
                <View style={{ flexDirection: 'row', justifyContent: 'space-around', backgroundColor: colors.header, borderTopWidth: 1, borderTopColor: '#737373', height: 40 }}>
                    <TouchableOpacity
                        onPress={() => {setNumberTab(1); setSearching(false); setSearchName("")}}
                        style={{ alignItems: 'center', justifyContent: 'center', width: '50%', borderBottomWidth: numberTab === 1 ? 2 : 0, borderBottomColor: numberTab === 1 ? '#66ff66' : '#009387' }}>
                        <Text style={{ color: numberTab === 1 ? '#fff' : '#bfbfbf' }}>B??? t???</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={() => {setNumberTab(2);setSearching(false); setSearchName("") }}
                        style={{ alignItems: 'center', justifyContent: 'center', width: '50%', borderBottomWidth: numberTab === 2 ? 2 : 0, borderBottomColor: numberTab === 2 ? '#66ff66' : '#009387' }}>
                        <Text style={{ color: numberTab === 2 ? '#fff' : '#bfbfbf' }}>???????c chia s???</Text>
                    </TouchableOpacity>
                </View>
                {/* <View style={{  }}> */}
                {
                    numberTab === 1 ?
                        vocabulary.length === 0 ?
                            <View style={{ padding: 20 }}>
                                <Text style={colors.text}>G???i ?? </Text>
                                <Text style={colors.text}>- Nh???n n??t d???u "+" g??c tr??n b??n ph???i ????? th??m nh??m t??? m???i.</Text>
                                <Text style={colors.text}>- B??n c???nh nh??m t??? c?? n??t ????? s???a x??a nh??m t???
                                </Text>
                            </View>
                            :
                            <ScrollView style={{ marginBottom: 90 }}>
                                {
                                    (searching === true? filtered: dataList).map((element, key) => {
                                        return (
                                            <TouchableOpacity key={key} onPress={() => listVoca(element, numberTab)}>
                                                <Card style={{ marginTop: 10, margin: 10 }}>
                                                    <Card.Content>
                                                        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                                                            <View style={{ flexDirection: 'row', width: '75%' }}>
                                                                <View style={{ backgroundColor: colorBack[ramdom], borderRadius: 30 }}>
                                                                    <Text style={{ paddingTop: 15, paddingBottom: 15, paddingLeft: 20, paddingRight: 20, color: '#fff' }}>{element.name.charAt(0)}</Text>
                                                                </View>
                                                                {/* <Avatar.Image size={40} style={{padding: 10}} source={('https://www.google.com/url?sa=i&url=https%3A%2F%2Fvi.m.wikipedia.org%2Fwiki%2FT%25E1%25BA%25ADp_tin%3AImage_created_with_a_mobile_phone.png&psig=AOvVaw3T9sYalA9E5MRsYwkeGOWj&ust=1652583018117000&source=images&cd=vfe&ved=0CAwQjRxqFwoTCJDa-8_93fcCFQAAAAAdAAAAABAD')} /> */}
                                                                <View
                                                                    style={{
                                                                        marginLeft: 10,
                                                                        height: 30,
                                                                        marginBottom: 10
                                                                    }}>

                                                                    <Text style={{ fontSize: 20, color: colors.text }}>{element.name}</Text>
                                                                    <Text style ={{color: colors.text}}>{element.data.length} items</Text>
                                                                </View>
                                                            </View>
                                                            <View style={{ flexDirection: 'row', justifyContent: 'flex-end', width: '30%' }}>
                                                                <TouchableOpacity onPress={() => editVocaAction(element)}>
                                                                    <Icons name={'edit'} size={20} style={{ color: 'gray'}} />
                                                                </TouchableOpacity>
                                                                <TouchableOpacity style={{ marginLeft: 10 }}  onPress={() => deleteVocu(element)} >
                                                                    <Iconss name={'delete-outline'} size={20} style={{ color: 'red' }} />
                                                                </TouchableOpacity>
                                                            </View>
                                                        </View>
                                                        <View style={{ flexDirection: 'row', justifyContent: 'flex-end' }}>
                                                            <Text style ={{color: colors.text}}>{new Date(element.date).getFullYear() + '/' + fixDigit(new Date(element.date).getMonth()) + '/' + fixDigit(new Date(element.date).getDate())}</Text>
                                                        </View>
                                                    </Card.Content>
                                                </Card>
                                            </TouchableOpacity>
                                        )
                                    })
                                }
                            </ScrollView>

                        :
                        <ScrollView style={{ marginBottom: 90 }}>
                            {
                                (searching=== true?filtered: dataShare).map((element, key) => {
                                    return (
                                        <TouchableOpacity key={key} onPress={() => listVoca(element, numberTab)}>
                                            <Card style={{ marginTop: 10, margin: 10 }}>
                                                <Card.Content>
                                                    <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                                                        <View style={{ flexDirection: 'row' }}>
                                                            <View style={{ backgroundColor: colorBack[ramdom], borderRadius: 30 }}>
                                                                <Text style={{color: colors.text, paddingTop: 15, paddingBottom: 15, paddingLeft: 20, paddingRight: 20, color: '#fff' }}>{element.name.charAt(0)}</Text>
                                                            </View>
                                                            {/* <Avatar.Image size={40} style={{padding: 10}} source={('https://www.google.com/url?sa=i&url=https%3A%2F%2Fvi.m.wikipedia.org%2Fwiki%2FT%25E1%25BA%25ADp_tin%3AImage_created_with_a_mobile_phone.png&psig=AOvVaw3T9sYalA9E5MRsYwkeGOWj&ust=1652583018117000&source=images&cd=vfe&ved=0CAwQjRxqFwoTCJDa-8_93fcCFQAAAAAdAAAAABAD')} /> */}
                                                            <View
                                                                style={{
                                                                    marginLeft: 10,
                                                                    height: 30,
                                                                    marginBottom: 10
                                                                }}>

                                                                <Text style={{ fontSize: 20, color: colors.text }}>{element.name}</Text>
                                                                <Text>{element.data.length} items</Text>
                                                            </View>
                                                        </View>
                                                        <View style={{ flexDirection: 'row', justifyContent: 'flex-end' }}>
                                                            <TouchableOpacity style={{ marginLeft: 10 }} onPress={() => deleteVocuShare(element)}>
                                                                <Iconss name={'delete-outline'} size={20} style={{ color: 'red' }} />
                                                            </TouchableOpacity>
                                                        </View>
                                                    </View>
                                                    <View style={{ flexDirection: 'row', justifyContent: 'flex-end' }}>
                                                        <Text style={{color: colors.text}}>???????c chia s??? b???i {element.user_id.username} {new Date(element.date).getFullYear() + '/' + fixDigit(new Date(element.date).getMonth()) + '/' + fixDigit(new Date(element.date).getDate())}</Text>
                                                    </View>
                                                </Card.Content>
                                            </Card>
                                        </TouchableOpacity>
                                    )
                                })
                            }
                        </ScrollView>
                }
                {/* </View> */}
            </View>

            <View style={styles.container}>
                <Modal
                    isVisible={isVisibleAdd}
                    animationInTiming={1000}
                    animationOutTiming={1000}
                    backdropTransitionInTiming={1000}
                    backdropTransitionOutTiming={1000}
                    deviceWidth={WIDTH}
                >
                    <View style={[styles.modalContent, { marginTop: 50, minHeight: 170, backgroundColor: colors.background }]}>
                        <View style={{ padding: 15 }}>
                            <Text style={{ fontWeight: 'bold', fontSize: 20, color: colors.text }}>T???o nh??m t???</Text>
                            <TextInput
                                style={{ color: colors.text, borderBottomWidth: 1, borderBottomColor: '#cccccc', alignItems: 'center', justifyContent: 'center' }}
                                placeholder="Nh???p nh??m t??? c???n l??u"
                                placeholderTextColor={colors.text_of_input}
                                value={name}
                                onChangeText={text => setName(text)}
                            />
                            <View style={styles.stylebutton}>
                                <TouchableOpacity
                                    onPress={() => setisVisibleAdd(false)}
                                    style={[styles.keepStyle, { backgroundColor: '#999999', marginRight: 110 }]}>
                                    <Text style={{ color: '#fff' }}>????ng</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={[styles.keepStyle, { backgroundColor: colors.header, }]}
                                    onPress={() => createVoca()}
                                >
                                    <Text style={{ color: '#fff' }}>T???o</Text>
                                </TouchableOpacity>
                            </View>

                        </View>

                    </View>
                </Modal>
            </View>
            {/* model edit vocabulary */}
            <View style={styles.container}>
                <Modal
                    isVisible={isVisibleEdit}
                    animationInTiming={1000}
                    animationOutTiming={1000}
                    backdropTransitionInTiming={1000}
                    backdropTransitionOutTiming={1000}
                    deviceWidth={WIDTH}
                >
                    <View style={[styles.modalContent, { marginTop: 50, minHeight: 170, backgroundColor: colors.background}]}>
                        <View style={{ padding: 15 }}>
                            <Text style={{ fontWeight: 'bold', fontSize: 20, color: colors.text }}>S???a nh??m t???</Text>
                            <TextInput
                                style={{ borderBottomWidth: 1, borderBottomColor: '#cccccc', alignItems: 'center', justifyContent: 'center', color: colors.text }}
                                placeholder="Nh???p nh??m t??? c???n l??u"
                                placeholderTextColor={colors.text_of_input}
                                value={newVocu}
                                onChangeText={text => setNewVocu(text)}
                            />
                            <View style={styles.stylebutton}>
                                <TouchableOpacity
                                    onPress={() => setisVisibleEdit(false)}
                                    style={[styles.keepStyle, { backgroundColor: '#999999', marginRight: 110 }]}>
                                    <Text style={{ color: '#fff' }}>????ng</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={[styles.keepStyle, { backgroundColor: colors.header, }]}
                                    onPress={() => editVoca()}
                                >
                                    <Text style={{ color: '#fff' }}>S???a</Text>
                                </TouchableOpacity>
                            </View>

                        </View>

                    </View>
                </Modal>
            </View>

            {/* sort vocabulary */}
            <View style={[styles.container]}>
                <Modal
                    isVisible={isVisibleSort}
                    swipeDirection="down"
                    style={{ justifyContent: 'flex-end', margin: 0 }}
                    onRequestClose={() => setisVisibleSort(false)}
                    deviceWidth={WIDTH}
                >
                    <View style={styles.modalContent}>
                        <View>
                            <View style={{ height: 40, backgroundColor: colors.header, justifyContent: 'center', alignItems: 'center', flexDirection: 'row', justifyContent: 'space-between' }}>
                                <Text style={{ color: '#fff', fontSize: 18, marginLeft: 5 }}>S???p x???p theo: </Text>
                                <Icons name={'close'} size={20} color={'#fff'}
                                    onPress={() => setisVisibleSort(false)}
                                    style={{ marginTop: 5, marginRight: 10 }} />
                            </View>
                            <View style={{backgroundColor: colors.background}}>
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
                                    <Text style={{ marginTop: 5, fontSize: 18, color: colors.text }}>M???i - C??</Text>
                                </View>
                                <View style={{ flexDirection: 'row', paddingTop: 10, paddingBottom: 10 }}>
                                    <RadioButton
                                    uncheckedColor={colors.text}
                                    color={colors.header}
                                    tintColors={{ true: colors.header, false: colors.text }}
                                        status={sort3}
                                        onPress={() => toggleSwitchSort3()}
                                    />
                                    <Text style={{ marginTop: 5, fontSize: 18, color: colors.text }}>C?? - M???i</Text>
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
                    </View>

                </Modal>
            </View>
            



        </View>
    )
}
const styles = StyleSheet.create({
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
        backgroundColor: 'white',
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
    keepStyle: { height: 40, width: 100, alignItems: 'center', justifyContent: 'center', borderRadius: 5 },

});

export default VocabularyScreen;