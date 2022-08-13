import React, { useState, useEffect } from 'react'
import { Text, View, Image,Alert, SafeAreaView, FlatList, Dimensions, TouchableOpacity, ScrollView } from 'react-native'
import en from '../../../assets/images/en.png';
import Icon from 'react-native-vector-icons/AntDesign';
import Icons from 'react-native-vector-icons/MaterialCommunityIcons';
import { useSelector, useDispatch } from 'react-redux';
import { getListNotifiRequest, getListNotifiSuccess } from '../../../redux/actions/notifi.action';
import axios from 'axios';
import { useTheme } from 'react-native-paper';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

import { getListCommentRequest, getListWordCommentRequest, getListKanjiCommentRequest } from '../../../redux/actions/comment.action';
const WIDTH = Dimensions.get('window').width;
const NotificationStack = ({ navigation }) => {
    const { colors } = useTheme();

    const dispatch = useDispatch();
    const users = useSelector(state => state.userReducer.user);
    const notifiList = useSelector(state => state.notifiReducer.notifiList);
    const [dataNotifi, setdataNotifi] = useState(notifiList);
    const listPost = useSelector(state => state.postReducer.listPost);
    const wordList = useSelector(state => state.wordReducer.wordList);
    const vocabularyShare = useSelector(state => state.vocabularyReducer.vocabularyShare);

    var last = new Date();
    
    useEffect(() => {
        setdataNotifi(notifiList);
    }, [notifiList]);
    const likeaction = (
        <View style={{ borderWidth: 1, borderColor: '#4d79ff', padding: 5, width: 35, borderRadius: 20, backgroundColor: '#4d79ff', top: 30, right: 10, position: 'absolute', zIndex: 1 }}>
            <Icon
                style={{}}
                name="like1"
                color={'white'}
                size={23}
            />
        </View>
    )
    const dislikeaction = (
        <View style={{ borderWidth: 1, borderColor: '#4d79ff', padding: 5, width: 35, borderRadius: 20, backgroundColor: '#4d79ff', top: 30, right: 10, position: 'absolute', zIndex: 1 }}>
            <Icon
                name="dislike1"
                color={'white'}
                size={23}
            />
        </View>
    )
    const acceptaction = (
        <View style={{ borderWidth: 1, borderColor: '#4d79ff', padding: 5, width: 35, borderRadius: 20, backgroundColor: '#4d79ff', top: 30, right: 10, position: 'absolute', zIndex: 1 }}>
            <Icon
                name="heart"
                color={'red'}
                size={23}
            />
        </View>
    )

    const remindaction = (
        <View style={{ borderWidth: 1, borderColor: '#4d79ff', padding: 5, width: 35, borderRadius: 20, backgroundColor: '#4d79ff', top: 30, right: 10, position: 'absolute', zIndex: 1 }}>
            <Icons
                name="reminder"
                color={'white'}
                size={23}
            />
        </View>
    )
    const commentaction = (
        <View style={{ borderWidth: 1, borderColor: '#00cc00', padding: 5, width: 35, borderRadius: 20, backgroundColor: '#00cc00', top: 35, right: 10, position: 'absolute', zIndex: 1 }}>
            <FontAwesome
                name="comment"
                color={'white'}
                size={23}
            />
        </View>
    )

    const time = (dt) => {
        const result = (last.getTime() - dt.getTime())/1000;
        const minutes = (result-result%60)/60;
        const hours = (minutes-minutes%60)/60;
        const day = (result-result%86400)/86400;
        const month = (day-day%30)/30;
        const year = (month-month%12)/12;
        if(year !== 0) {
            return year + ' ' + 'nam';
        }
        else if(month !== 0) {
            return month + ' ' +'thang';
        }
        else if(day !== 0) {
            return day + ' ' +'ngay';
        }
        else if(hours !== 0) {
            return hours + ' ' +'gio';
        }
        else if(minutes !== 0) {
            return minutes + ' ' +'phut';
        }
        else {
            return 'vua xong';
        }
    }
    const showGamen = (item, index) => {
        if(dataNotifi[index].isRead === false) {
            dataNotifi[index].isRead = true;
            axios.post('https://nameless-spire-67072.herokuapp.com/language/editReadNotifi', {
             "notification_id": item._id,
         }, {
             headers: {
                 "Accept": "application/json",
                 "Content-Type": "application/json"
             }
         })
             .then((response) => {
                 console.log(response.data);
             })
             .catch(function(error) {
                 throw error;
             });
             dispatch(getListNotifiSuccess(dataNotifi));

        }
        // navigation.navigate("ExplainScreen", {word: item.data});
        
        if(item.typeNoti === 'word') {
            console.log(item);
                dispatch(getListWordCommentRequest(item.dataWord._id, users._id));
            navigation.navigate("WordScreenDetail", {navigation: navigation, vocabularys: item.dataWord });
            
        }
        else if(item.typeNoti === 'kanji') {
            dispatch(getListKanjiCommentRequest(item.dataKanji._id, users._id));
            navigation.navigate("ExplainKanji", { navigation: navigation, kanjiword: item.dataKanji });
        }
        else if(item.typeNoti === 'vocu'){
            console.log(item.dataVocu);
            const idx = vocabularyShare.findIndex(e => e._id === item.dataVocu._id);
            if(idx !== -1) {
                navigation.navigate("ListWordVocabulary", { navigation: navigation, listdata: vocabularyShare[idx], type: 2 });
            }
            else {
                Alert.alert(
                    "Thông báo",
                    "Bộ từ vựng đã không còn được chia sẻ với bạn nữa ",
                    [
                        {
                            text: "OK", onPress: () => {
                                console.log('press ok');
                            }
                        }
                    ]
                )
                navigation.navigate("VocabularyScreen", { navigation: navigation });
            }
            // dispatch(getListShareVocaRequest(users._id));
            // navigation.navigate("ListWordVocabulary", { navigation: navigation, listdata: item.data, type: 2 });

        }
        else if(item.typeNoti === 'grammar'){
            console.log(item.dataGrammar);
            dispatch(getListCommentRequest(item.dataGrammar._id, users._id));
            navigation.navigate("ExplainScreen", { word: item.dataGrammar });
        }
        else if(item.typeNoti === 'schedule'){
            console.log(item.dataRemind);
            navigation.navigate("ViewCalendar", { calen: item.dataRemind });
        }
        else {
            console.log('datachuyen di day ne', item.dataPost.time);
            const obj = listPost.findIndex(e=>e._id === item.dataPost._id);
            // const data = listPost.filter(e=>e._id === item.dataPost._id);
            // console.log(data);
            navigation.navigate("PostUser", { navigation: navigation, dataOne: listPost[obj]});
        }
    }
    const renderNotifi = ({ item, index }) => {
        console.log(item);
        var dt = new Date(item.time);
        return (
            <TouchableOpacity style={{ backgroundColor: item.isRead === true ? colors.background: colors.notifi }} onPress={() => showGamen(item, index)}>
                <View style={{marginTop: 20, flexDirection: 'row', width: WIDTH - 100 }}>
                    <View style={{ width: 80 }}>
                        <Image
                            style={{ width: 60, height: 65, zIndex: 0, borderRadius: 30 }}
                            source={{
                                uri: item.user_friends.avatar,
                            }}
                        />
                        {
                            item.action === 'like' ? likeaction: item.action === 'dislike' ? dislikeaction: item.action === "phê duyệt" ? acceptaction: item.action === "comment"? commentaction: remindaction

                        }
                        {/* <View style={{borderWidth: 1, borderColor: 'blue', padding: 5, width: 35, borderRadius: 20, backgroundColor: 'blue',  top: 30, right: 10, position: 'absolute', zIndex: 1}}>
                                <Icon
                                    name="dislike1"
                                    color={'white'}
                                    size={23}
                                />
                            </View>

                                <View style={{borderWidth: 1, borderColor: '#33ff33', padding: 5, width: 35, borderRadius: 20, backgroundColor: '#33ff33',  top: 30, right: 10, position: 'absolute', zIndex: 1}}>
                                    <Icons
                                        name="comment"
                                        color={'white'}
                                        size={23}
                                    />
                                </View> */}
                    </View>
                    <View style={{ height: 80, flexDirection: 'column', justifyContent: 'space-between' }}>
                        <View style={{flexDirection: 'row', flexWrap: 'wrap', alignItems: 'flex-start' }}>
                            <Text style={{color: colors.text}} numberOfLines={3}>{item.content} </Text>
                        </View>
                        <View style={{}}>
                            <Text style={{color: 'gray' }}>{time(dt)}</Text>
                        </View>
                        <View />
                    </View>
                </View>
            </TouchableOpacity>
        )
    }
    return (
        <SafeAreaView style={{ flex: 1 }}>
            {/* <CustomHeader title="Home" isHome={true} navigation={navigation} /> */}
            <ScrollView>
                <Text style={{ fontSize: 21, fontWeight: 'bold', padding: 10, color: colors.text }}>Thông báo</Text>
                <View style={{ marginLeft: 10, marginBottom: 10 }}>
                    <FlatList
                        // style={{ marginTop: 15, marginLeft: 20 }}
                        inverted={true}
                        data={dataNotifi}
                        keyExtractor={( item, index) => index.toString()}
                        renderItem={renderNotifi}
                    />
                </View>
            </ScrollView>

        </SafeAreaView>
    )
}
export default NotificationStack;
{/* <View style={{ flex: 3, justifyContent: 'center', alignItems: 'center' }}>
                        <View style={{ flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'center' }}>
                            {listQues()}
                        </View>
                    </View> */}