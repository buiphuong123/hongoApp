import React, { Component, useEffect, useState } from 'react'
import { Text, View, SafeAreaView, ScrollView, TouchableOpacity, Image, Alert, StyleSheet, Dimensions, TextInput } from 'react-native'
import { useDispatch, useSelector } from 'react-redux';
import { useTheme } from 'react-native-paper';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Icon from 'react-native-vector-icons/Ionicons';
import Iconss from 'react-native-vector-icons/MaterialCommunityIcons';
import CustomHeader from '../../CustomHeader';
import CheckBox from '@react-native-community/checkbox';
import Modal from 'react-native-modal'; // 2.4.0
import AntDesign from 'react-native-vector-icons/AntDesign';
import { RadioButton } from 'react-native-paper';
import RenderHtml from 'react-native-render-html';
import axios from 'axios';

const WIDTH = Dimensions.get('window').width;
const HEIGHT = Dimensions.get('window').height;

const AssetPost = ({ navigation }) => {
    const { colors } = useTheme();

    const [isVisibleSort, setisVisibleSort] = useState(false);
    const [chooseTab, setChooseTab] = useState(1);
    const [isNew, setisNew] = useState('unchecked');
    const [isOld, setisOld] = useState('checked');
    const [searchRequire1, setSearchRequire1] = useState(false);
    const [searchRequire2, setSearchRequire2] = useState(false);
    const [searchRequire3, setSearchRequire3] = useState(false);
    const [checkAll, setCheckAll] = useState(false);
    const [checked, setChecked] = useState(checkAll);
    const listPost = useSelector(state => state.postReducer.listPost);
    const [dataPost, setDataPost] = useState(listPost.map(p => ({ ...p, checked: false })));
    const last = new Date();
    const [filtered, setFiltered] = useState(dataPost)
    const [searchName, setSearchName] = useState("");
    const [searching, setSearching] = useState(false);
    const [searchNametab1, setSearchNametab1] = useState("");
    const [searchNametab2, setSearchNametab2] = useState("");
    const [searchNametab3, setSearchNametab3] = useState("");
    const [searching1, setSearching1] = useState(false);
    const [searching2, setSearching2] = useState(false);
    const [searching3, setSearching3] = useState(false);
    const users = useSelector(state => state.userReducer.user);

    const toggleSwitchisNew = () => {
        if (isNew === 'unchecked') {
            dataPost.sort(function (a, b) {
                return new Date(b.time) - new Date(a.time);
            })
            setisNew('checked');
            setisOld('unchecked');
        }
    }
    const toggleSwitchisOld = () => {
        if (isOld === 'unchecked') {
            dataPost.sort(function (a, b) {
                return new Date(a.time) - new Date(b.time);
            })
            setisNew('unchecked');
            setisOld('checked');
        }
    }
    useEffect(() => {
        const data = chooseTab === 2 ? dataPost.filter(e => e.review === 1) :
            chooseTab === 3 ? dataPost.filter(e => e.review === 0) :
                dataPost.filter(e => e.review === 2);
        if (data.every(p => !p.checked)) {
            setCheckAll(false);
        }
        if (data.some(p => p.checked)) {
            setCheckAll(true);
        }

    }, [chooseTab, dataPost, checkAll]);
    const timeMath = (dt) => {
        const result = (last.getTime() - dt.getTime()) / 1000;
        const minutes = (result - result % 60) / 60;
        const hours = (minutes - minutes % 60) / 60;
        const day = (result - result % 86400) / 86400;
        const month = (day - day % 30) / 30;
        const year = (month - month % 12) / 12;
        if (year !== 0) {
            return year + ' ' + 'nam';
        }
        else if (month !== 0) {
            return month + ' ' + 'thang';
        }
        else if (day !== 0) {
            return day + ' ' + 'ngay';
        }
        else if (hours !== 0) {
            return hours + ' ' + 'gio';
        }
        else if (minutes !== 0) {
            return minutes + ' ' + 'phut';
        }
        else {
            return 'vua xong';
        }
    }
    const acceptPost = (element) => {
        const list = [];
        if (element._id !== undefined) {
            const objIndex = dataPost.findIndex(e => e._id === element._id);
            if (objIndex !== -1) {
                list.push(element._id);
                dataPost[objIndex].review = 1;
                dataPost[objIndex].checked = false;
                setDataPost([...dataPost]);

            }
        }
        else {

            const post = dataPost.filter(e => e.checked === true);
            console.log(post.length);
            for (var i = 0; i < post.length; i++) {
                list.push(post[i]._id);
                dataPost[dataPost.map(function (e) { return e._id; }).indexOf(post[i]._id)].review = 1;
                dataPost[dataPost.map(function (e) { return e._id; }).indexOf(post[i]._id)].checked = false;
                setDataPost([...dataPost]);
            }

        }
        // dataPost.map(function(x) { 
        //     x.checked = false; 
        //     return x
        //   });
        // setDataPost([...dataPost]);
        axios.post('https://nameless-spire-67072.herokuapp.com/language/acceptPost', {
            "list": list,
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

        axios.post('https://nameless-spire-67072.herokuapp.com/language/sendNotiToDeviceAsset', {
            "comment_content": element.content,
            "action": "accept",
            "noti": "comment",
            "type": notitype,
            "user": users,
            "id": element._id,
            "user_noti": element.user_id._id,
            "notifi_token": element.user_id.notifiToken

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
    const refusePost = (element) => {
        const list = [];
        if (element._id !== undefined) {
            const objIndex = dataPost.findIndex(e => e._id === element._id);
            if (objIndex !== -1) {
                list.push(element._id);
                dataPost[objIndex].checked = false;
                dataPost[objIndex].review = 0;
                console.log(dataPost[objIndex]);
                setDataPost([...dataPost]);

            }
        }
        else {

            const post = dataPost.filter(e => e.checked === true);
            console.log(post.length);
            for (var i = 0; i < post.length; i++) {
                list.push(post[i]._id);
                dataPost[dataPost.map(function (e) { return e._id; }).indexOf(post[i]._id)].review = 0;
                dataPost[dataPost.map(function (e) { return e._id; }).indexOf(post[i]._id)].checked = false;
                setDataPost([...dataPost]);
            }

        }

        // setDataPost([...dataPost]);
        // dataPost.map(function(x) { 
        //     x.checked = false; 
        //     return x
        //   });
        axios.post('https://nameless-spire-67072.herokuapp.com/language/refusePost', {
            "list": list,
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

    const onSearchAccept = (text) => {
        setSearchNametab2(text);
        if (text) {
            setSearching2(true);

            const tempList = dataPost.filter(item => {
                if (item.review === 1 && item.content.html.match(text.toLowerCase()))
                    return item
            })
            setFiltered(tempList)
        }

        else {
            setSearching2(false)
            setFiltered(dataPost.filter(e => e.review === 1));
        }

    }
    const onSearchRefuse = (text) => {
        setSearchNametab3(text);
        if (text) {
            setSearching3(true);

            const tempList = dataPost.filter(item => {
                if (item.review === 0 && item.content.html.match(text.toLowerCase()))
                    return item
            })
            setFiltered(tempList)
        }

        else {
            setSearching3(false)
            setFiltered(dataPost.filter(e => e.review === 0));
        }

    }
    const onSearchPostNotReview = (text) => {
        setSearchNametab1(text);
        if (text) {
            setSearching1(true);
            const tempList = dataPost.filter(item => {
                if (item.review === 2 && item.content.html.match(text.toLowerCase()))
                    return item
            })
            setFiltered(tempList)
        }

        else {
            setSearching1(false)
            setFiltered(dataPost.filter(e => e.review === 2));
        }
    }
    const requireSearch = () => {
        if (chooseTab === 1) {
            setSearchRequire1(true);
        }
        else if (chooseTab === 2) {
            setSearchRequire2(true);
        }
        else {
            setSearchRequire3(true);
        }
    }
    const notrequireSearch = () => {
        if (chooseTab === 1) {
            setSearchRequire1(false);
        }
        else if (chooseTab === 2) {
            setSearchRequire2(false);
        }
        else {
            setSearchRequire3(false);
        }
    }
    return (
        <View style={{ flex: 1 }}>
            <CustomHeader title={"Bài viết cần xem xét"} navigation={navigation} />
            <View style={{ flex: 1 }}>
                <View style={{ flexDirection: 'row', justifyContent: 'space-around', padding: 10, borderBottomWidth: 1, borderBottomColor: '#e6e6e6' }}>
                    <TouchableOpacity
                        onPress={() => setChooseTab(1)}
                        style={{ padding: 10, backgroundColor: chooseTab === 1 ? '#e6f0ff' : '#fff', borderRadius: 30 }}>
                        <View style={{ flexDirection: 'row' }}>
                            <Text style={{ color: chooseTab === 1 ? colors.header : 'gray' }}>Chưa duyệt</Text>
                            <Text style={{ marginLeft: 5, color: chooseTab === 1 ? colors.header : 'gray' }}>{dataPost.filter(e => e.review === 2).length}</Text>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={() => setChooseTab(2)}
                        style={{ padding: 10, backgroundColor: chooseTab === 2 ? '#e6f0ff' : '#fff', borderRadius: 30 }}>
                        <View style={{ flexDirection: 'row' }}>
                            <Text style={{ color: chooseTab === 2 ? colors.header : 'gray' }}>Chấp nhận</Text>
                            <Text style={{ marginLeft: 5, color: chooseTab === 2 ? colors.header : 'gray' }}>{dataPost.filter(e => e.review === 1).length}</Text>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={() => setChooseTab(3)}
                        style={{ padding: 10, backgroundColor: chooseTab === 3 ? '#e6f0ff' : '#fff', borderRadius: 30 }}>
                        <View style={{ flexDirection: 'row' }}>
                            <Text style={{ color: chooseTab === 3 ? colors.header : 'gray' }}>Từ chối</Text>
                            <Text style={{ marginLeft: 5, color: chooseTab === 3 ? colors.header : 'gray' }}>{dataPost.filter(e => e.review === 0).length}</Text>
                        </View>
                    </TouchableOpacity>
                </View>


                <View style={{ padding: 10, borderBottomWidth: 1, borderBottomColor: '#e6e6e6' }}>
                    {
                        searchRequire1 === true && chooseTab === 1 ?
                            <View style={{ flexDirection: 'row' }}>
                                <TextInput
                                    style={{ color: colors.text, borderWidth: 1, borderColor: '#cccccc', borderRadius: 40, width: '90%', paddingTop: 5, paddingBottom: 5, paddingLeft: 10 }}
                                    placeholder={"Tìm kiếm nội dung bài viết"}
                                    placeholderTextColor={colors.text_of_input}
                                    value={searchNametab1}
                                    onChangeText={(text) => onSearchPostNotReview(text)}
                                />
                                <TouchableOpacity
                                    onPress={() => { setSearchRequire1(false); setSearching1(false) }}
                                    style={{ padding: 10, paddingTop: 15 }}>
                                    <Text style={{ color: colors.header }}>HỦY</Text>
                                </TouchableOpacity>
                            </View>
                            :
                            searchRequire2 === true && chooseTab === 2 ?
                                <View style={{ flexDirection: 'row' }}>
                                    <TextInput
                                        style={{ color: colors.text, borderWidth: 1, borderColor: '#cccccc', borderRadius: 40, width: '90%', paddingTop: 5, paddingBottom: 5, paddingLeft: 10 }}
                                        placeholder={"Tìm kiếm nội dung bài viết"}
                                        value={searchNametab2}
                                        placeholderTextColor={colors.text_of_input}
                                        onChangeText={(text) => onSearchAccept(text)}
                                    />
                                    <TouchableOpacity
                                        onPress={() => { setSearchRequire2(false); setSearching2(false) }}
                                        style={{ padding: 10, paddingTop: 15 }}>
                                        <Text style={{ color: colors.header }}>HỦY</Text>
                                    </TouchableOpacity>
                                </View>
                                :
                                searchRequire3 === true && chooseTab === 3 ?
                                    <View style={{ flexDirection: 'row' }}>
                                        <TextInput
                                            style={{ color: colors.text, borderWidth: 1, borderColor: '#cccccc', borderRadius: 40, width: '90%', paddingTop: 5, paddingBottom: 5, paddingLeft: 10 }}
                                            placeholder={"Tìm kiếm nội dung bài viết"}
                                            placeholderTextColor={colors.text_of_input}

                                            value={searchNametab3}
                                            onChangeText={(text) => onSearchRefuse(text)}
                                        />
                                        <TouchableOpacity
                                            onPress={() => { setSearchRequire3(); setSearching3(false) }}
                                            style={{ padding: 10, paddingTop: 15 }}>
                                            <Text style={{ color: colors.header }}>HỦY</Text>
                                        </TouchableOpacity>
                                    </View>
                                    :
                                    <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                                        <View>
                                            {chooseTab === 1 && <Text style={{ fontWeight: 'bold', fontSize: 20, color: colors.text }}>Đang chờ: {dataPost.filter(e => e.review === 2).length}</Text>}
                                            {chooseTab === 2 && <Text style={{ fontWeight: 'bold', fontSize: 20, color: colors.text }}>Chấp nhận: {dataPost.filter(e => e.review === 1).length}</Text>}
                                            {chooseTab === 3 && <Text style={{ fontWeight: 'bold', fontSize: 20, color: colors.text }}>Từ chối: {dataPost.filter(e => e.review === 0).length}</Text>}

                                            <Text style={{ fontSize: 15, color: colors.text_of_input }}>Đang xem theo cũ nhất trước</Text>
                                        </View>
                                        <EvilIcons name={'search'} size={29} color={colors.text}
                                            onPress={() => requireSearch()
                                            }
                                        // style={{ padding: 10 }}
                                        />
                                    </View>

                    }

                    <View style={{ flexDirection: 'row', paddingTop: 20, paddingBottom: 10 }}>
                        {chooseTab === 1 &&
                            <CheckBox
                                // style={styles.checkbox}
                                tintColors={{ true: colors.header, false: colors.text }}

                                value={checkAll}
                                onValueChange={() => {
                                    setCheckAll(!checkAll);
                                    setDataPost(dataPost.map(p => ({ ...p, checked: !checkAll })))
                                }}
                            />
                        }
                        <TouchableOpacity
                            onPress={() => setisVisibleSort(true)}
                            style={{ marginLeft: 20, flexDirection: 'row', backgroundColor: '#f2f2f2', padding: 5, paddingLeft: 10, paddingRight: 10 }}>
                            <Iconss name={'sort'} size={25} color={'black'} />
                            <Text style={{ marginTop: 5, marginLeft: 5 }}>Sắp xếp</Text>
                        </TouchableOpacity>
                    </View>
                </View>

                <ScrollView style={{ backgroundColor: colors.block }}>
                    {
                        // (searching === true? filtered: chooseTab === 2 ? dataPost.filter(e => e.review === 1) :
                        //     chooseTab === 3 ? dataPost.filter(e => e.review === 0) :
                        //         dataPost.filter(e => e.review === 2)  )
                        (searching1 === true && chooseTab === 1 || searching2 === true && chooseTab === 2 || searching3 === true && chooseTab === 3 ? filtered : chooseTab === 2 ? dataPost.filter(e => e.review === 1) :
                            chooseTab === 3 ? dataPost.filter(e => e.review === 0) :
                                dataPost.filter(e => e.review === 2))
                            .map((element, key) => {
                                return (
                                    <View key={key} style={{ backgroundColor: colors.background, marginTop: 10, paddingTop: 10, paddingLeft: 10, borderBottomWidth: 1, borderBottomColor: '#e6e6e6' }}>
                                        <View>
                                            <View style={{ flexDirection: 'row', }}>
                                                {chooseTab === 1 &&
                                                    <CheckBox
                                                        tintColors={{ true: colors.header, false: colors.text }}

                                                        value={element.checked}
                                                        onValueChange={() => setDataPost(
                                                            dataPost.map(p => {
                                                                if (p._id === element._id) {
                                                                    return { ...p, checked: !p.checked }
                                                                }
                                                                return p;
                                                            })
                                                        )}
                                                    />
                                                }
                                                <Image
                                                    style={{ height: 40, width: 40, borderRadius: 20, marginLeft: 10 }}
                                                    source={{
                                                        uri: element.user_id[0].avatar,
                                                    }}
                                                />
                                                <View style={{ marginLeft: 10 }}>
                                                    <Text style={{ color: colors.text }}>{element.user_id[0].username}</Text>
                                                    <Text style={{ color: colors.text }}>{timeMath(new Date(element.time))}</Text>
                                                </View>


                                            </View>
                                        </View>
                                        <View style={{ paddingTop: 20, paddingBottom: 10, paddingLeft: 10 }}>
                                            {
                                                element.dataVocuShare !== undefined ?
                                                    // <Text>{data.dataVocuShare}</Text>
                                                    <View style={{ flexDirection: 'row' }}>
                                                        <Text style={{ color: colors.text }}>Bộ từ vựng: </Text>
                                                        <TouchableOpacity onPress={() => detailVocuShare(element.dataVocuShare)}>
                                                            <Text style={{ color: 'blue', marginLeft: 5, fontStyle: 'italic' }}>Xem o day</Text>
                                                        </TouchableOpacity>
                                                    </View>
                                                    :
                                                    null

                                            }
                                            <View style={{ flexWrap: 'wrap' }}>
                                                {/* <Paragraph> */}
                                                <RenderHtml
                                                    tagsStyles={{
                                                        span: { fontSize: 16 },
                                                        div: { color: colors.text },
                                                        li: { color: colors.text }
                                                    }}
                                                    contentWidth={WIDTH}
                                                    source={element.content}
                                                />
                                                {/* </Paragraph> */}
                                            </View>
                                        </View>

                                        {
                                            chooseTab === 1 || chooseTab === 0 ?
                                                <View style={{ flexDirection: 'row', justifyContent: 'space-around', marginTop: 15, marginBottom: 15 }}>
                                                    <TouchableOpacity
                                                        onPress={() => acceptPost(element)}
                                                        style={{ backgroundColor: '#e6f0ff', paddingTop: 5, paddingBottom: 5, paddingLeft: 20, paddingRight: 20 }}>
                                                        <Text style={{ color: '#3333ff' }}>Phê duyệt</Text>
                                                    </TouchableOpacity>
                                                    <TouchableOpacity
                                                        onPress={() => refusePost(element)}
                                                        style={{ backgroundColor: '#e6e6e6', paddingTop: 5, paddingBottom: 5, paddingLeft: 20, paddingRight: 20 }}>
                                                        <Text style={{}}>Từ chối</Text>
                                                    </TouchableOpacity>
                                                </View>
                                                :
                                                null
                                        }
                                    </View>
                                )
                            })
                    }

                </ScrollView>
                {checkAll && chooseTab === 1 && <View style={{ borderTopWidth: 1, borderTopColor: '#e6e6e6' }}>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-around', marginTop: 15, marginBottom: 15 }}>
                        <TouchableOpacity
                            onPress={() => acceptPost({})}
                            style={{ backgroundColor: '#e6f0ff', paddingTop: 5, paddingBottom: 5, paddingLeft: 20, paddingRight: 20 }}>
                            <Text style={{ color: '#3333ff' }}>Phê duyệt</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={() => refusePost({})}
                            style={{ backgroundColor: '#e6e6e6', paddingTop: 5, paddingBottom: 5, paddingLeft: 20, paddingRight: 20 }}>
                            <Text style={{}}>Từ chối</Text>
                        </TouchableOpacity>
                    </View>
                </View>}

            </View>
            <Modal
                isVisible={isVisibleSort}
                swipeDirection="down"
                style={{ justifyContent: 'flex-end', margin: 0, }}
                onRequestClose={() => setisVisibleShare(false)}
                deviceWidth={WIDTH}
                deviceHeight={HEIGHT}
            >
                <View style={[styles.modalContent, { backgroundColor: colors.background }]}>
                    <View style={{ borderBottomWidth: 1, borderBottomColor: '#e6e6e6', flexDirection: 'row', justifyContent: 'space-between', }}>
                        <AntDesign name={'close'} size={20}
                            onPress={() => setisVisibleSort(false)}
                            style={{ padding: 10, color: colors.text }} />
                        <View style={{ paddingTop: 10 }}>
                            <Text style={{ color: colors.text }}>Sắp xếp theo</Text>
                        </View>
                        <View />
                    </View>
                    <View>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                            <Text style={{ padding: 10, color: colors.text }}>Mới nhất trước</Text>
                            <RadioButton
                                uncheckedColor={colors.text}
                                color={colors.header}
                                tintColors={{ true: colors.header, false: colors.text }}
                                status={isNew}
                                onPress={() => toggleSwitchisNew()}
                            />
                        </View>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                            <Text style={{ padding: 10, color: colors.text }}>Cũ nhất trước</Text>
                            <RadioButton
                                uncheckedColor={colors.text}
                                color={colors.header}
                                tintColors={{ true: colors.header, false: colors.text }}
                                status={isOld}
                                onPress={() => toggleSwitchisOld()}
                            />
                        </View>
                    </View>
                </View>
            </Modal>
        </View>
    )
}

export default AssetPost;

const styles = StyleSheet.create({
    container: {
        width: WIDTH,
        flex: 1,
    },
    modalContent: {
        borderRadius: 4,
        borderColor: 'rgba(0, 0, 0, 0.1)',
    },
})