import React, { useEffect, useState } from 'react'
import { Text, View, StyleSheet } from 'react-native'
import CheckBox from '@react-native-community/checkbox';
import AppText from '../../../../components/app-text';
import CustomHeader from '../../../CustomHeader';
import { useSelector, useDispatch } from 'react-redux';
import { RemoteWord, RemoteAllWord, RemoteHiraWord, RemoteKanjiWord, RemoteMeanWord, RemoteReverseWord, RemoteMemerizeWord, RemoteNotMemerizeWord, RemoteLikeWord } from '../../../../redux/actions/word.action';
import { TouchableOpacity } from 'react-native-gesture-handler';
import ListWord from './ListWord';
import { RadioButton } from 'react-native-paper';
import Icon from 'react-native-vector-icons/Ionicons';
import Icons from 'react-native-vector-icons/Fontisto';
import { useTheme } from 'react-native-paper';

export default WordCalen = ({ navigation, route }) => {
    const { colors } = useTheme();
    const dispatch = useDispatch();
    const isWord = useSelector(state => state.wordReducer.isWord);
    const isAll = useSelector(state => state.wordReducer.isAll);
    const isHira = useSelector(state => state.wordReducer.isHira);
    const isKanji = useSelector(state => state.wordReducer.isKanji);
    const isMean = useSelector(state => state.wordReducer.isMean);
    const isReverse = useSelector(state => state.wordReducer.isReverse);
    const isMemerize = useSelector(state => state.wordReducer.isMemerize);
    const isNotMemerize = useSelector(state => state.wordReducer.isNotMemerize);
    const isLike = useSelector(state => state.wordReducer.isLike);
    const users = useSelector(state => state.userReducer.user);
    const [dataList, setDataList] = useState([]);
    const { lession, rang1, rang2 } = route.params;
    const wordlevel = useSelector(state => state.wordReducer.wordlevel);
    // useEffect(() => {
    //     console.log('khong vao day a');
    //     setDataList(wordlevel.filter(e => e.lession === lession).splice(rang1, rang2));
    //     console.log(wordlevel.filter(e => e.lession === lession).splice(rang1, rang2).length);
    // }, []);
    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
                setDataList(wordlevel.filter(e => e.lession === lession).splice(rang1, rang2));
                console.log(wordlevel.filter(e => e.lession === lession).splice(rang1, rang2).length);
        });

        return unsubscribe;
    }, [navigation, rang1, rang2]);
    // useEffect(() => {
    //     if(type ===1) {
    //         const {calen} = route.params;
    //         setCalendar(calen);
    //     }
    //     else {
    //         setCalendar({});
    //     }
    // }, [type]);

    const seletMemerizedall = () => {
        dispatch(RemoteAllWord('unchecked'));
        dispatch(RemoteMemerizeWord('checked'));
        dispatch(RemoteNotMemerizeWord('unchecked'));
        dispatch(RemoteLikeWord('unchecked'));

    }
    const seletNotMemerizedall = () => {
        dispatch(RemoteAllWord('unchecked'));
        dispatch(RemoteMemerizeWord('unchecked'));
        dispatch(RemoteNotMemerizeWord('checked'));
        dispatch(RemoteLikeWord('unchecked'));

    }
    const seletLikeall = () => {
        dispatch(RemoteAllWord('unchecked'));
        dispatch(RemoteMemerizeWord('unchecked'));
        dispatch(RemoteNotMemerizeWord('unchecked'));
        dispatch(RemoteLikeWord('checked'));
    }
    const seletwordallRadio = () => {
        dispatch(RemoteAllWord('checked'));
        dispatch(RemoteMemerizeWord('unchecked'));
        dispatch(RemoteNotMemerizeWord('unchecked'));
        dispatch(RemoteLikeWord('unchecked'));
    }

    const learnFlashcard = () => {
        navigation.navigate("Flashcard", { navigation: navigation, lession: lession });
    }
    return (
        <View style={{ flex: 1 }}>
            <View style={{ flexDirection: 'row', height: 50, backgroundColor: colors.header, justifyContent: 'space-between' }}>
                <View style={{ justifyContent: 'center' }}>
                    <TouchableOpacity style={{ flexDirection: 'row', alignItems: 'center' }} onPress={() => {
                        // if(type ===1) {
                        //     navigation.navigate("ViewCalendar", {navigation: navigation, calen: calendarkk});
                        //     setCalendar({});
                        // }
                        // else {
                            navigation.goBack();
                        // }
                    }}>
                        <Icon name={'arrow-back'} size={29} style={{ color: '#fff', marginLeft: 5 }} />
                    </TouchableOpacity>
                </View>
                <View style={{ justifyContent: 'center' }}>
                    <Text style={{ textAlign: 'center', color: '#fff', fontSize: 18 }}>{lession === 0 ? "Tất cả" : "Bài " + lession}</Text>
                </View>
                {users.role !== 1 ?
                    <View style={{ justifyContent: 'center' }}>
                        <TouchableOpacity
                            onPress={() => learnFlashcard()}
                            style={{ justifyContent: 'center', marginRight: 20 }} >
                            <Icons name={'person'} size={29} style={{ color: '#fff', marginLeft: 5 }} />
                        </TouchableOpacity>
                    </View>
                    :
                    <View style={{ justifyContent: 'center' }} />

                }
            </View>
            {users.role !==1 ?
            <View>
                <View style={{ flexDirection: 'row' }}>
                    <View style={[styles.checkboxContainer, { color: colors.header }]}>
                        <CheckBox
                            tintColors={{ true: colors.header, false: colors.text }}
                            // style={[styles.checkbox , {color: colors.header,}]}
                            value={isWord}
                            onValueChange={(value) => dispatch(RemoteWord(value))}
                        />
                        <AppText i18nKey={"word"} style={[styles.label, { color: colors.text }]} />
                    </View>

                    <View style={styles.checkboxContainer}>
                        <CheckBox
                            tintColors={{ true: colors.header, false: colors.text }}
                            value={isHira}
                            onValueChange={(value) => dispatch(RemoteHiraWord(value))}
                        />
                        <AppText i18nKey={"hira"} style={[styles.label, { color: colors.text }]} />
                    </View>

                    <View style={styles.checkboxContainer}>
                        <CheckBox
                            tintColors={{ true: colors.header, false: colors.text }}
                            value={isKanji}
                            onValueChange={(value) => dispatch(RemoteKanjiWord(value))}
                        />
                        <AppText i18nKey={"kanji"} style={[styles.label, { color: colors.text }]} />
                    </View>
                    <View style={styles.checkboxContainer}>
                        <CheckBox
                            tintColors={{ true: colors.header, false: colors.text }}
                            value={isMean}
                            onValueChange={(value) => dispatch(RemoteMeanWord(value))}
                        />
                        <AppText i18nKey={"mean"} style={[styles.label, { color: colors.text }]} />
                    </View>
                    <View style={styles.checkboxContainer}>
                        <CheckBox
                            tintColors={{ true: colors.header, false: colors.text }}
                            value={isReverse}
                            onValueChange={(value) => dispatch(RemoteReverseWord(value))}
                        />
                        <AppText i18nKey={"reverse"} style={[styles.label, { color: colors.text }]} />
                    </View>

                </View>

                <View style={{ flexDirection: 'row', borderBottomWidth: 1, borderBottomColor: colors.header }}>
                    <View style={styles.checkboxContainer}>
                        <RadioButton
                            uncheckedColor={colors.text}
                            color={colors.header}
                            tintColors={{ true: colors.header, false: colors.text }}
                            status={isAll}
                            onPress={() => seletwordallRadio()}
                        />
                        <AppText i18nKey={"all"} style={[styles.label, { color: colors.text }]} />
                    </View>

                    <View style={styles.checkboxContainer}>
                        <RadioButton
                            uncheckedColor={colors.text}
                            color={colors.header}
                            status={isMemerize}
                            onPress={() => seletMemerizedall()}
                        />
                        <AppText i18nKey={"memerize"} style={[styles.label, { color: colors.text }]} />
                    </View>

                    <View style={styles.checkboxContainer}>
                        <RadioButton
                            uncheckedColor={colors.text}
                            color={colors.header}
                            status={isNotMemerize}
                            onPress={() => seletNotMemerizedall()}
                        />
                        <AppText i18nKey={"not memerize"} style={[styles.label, { color: colors.text }]} />
                    </View>
                    <View style={styles.checkboxContainer}>
                        <RadioButton
                            uncheckedColor={colors.text}
                            color={colors.header}
                            status={isLike}
                            onPress={() => seletLikeall()}
                        />
                        <AppText i18nKey={"like"} style={[styles.label, { color: colors.text }]} />
                    </View>

                </View>
            </View>: 
            <View style={{justifyContent: 'center', alignItems: 'center', padding: 20, borderBottomWidth: 1, borderBottomColor: '#999999'}}>
                <Text style={{fontWeight: 'bold', fontSize: 18, color: colors.text}}>Danh sách từ vựng</Text>
            </View>
            }
            <View style={{ flex: 1 }}>
                {/* <ListWord /> */}
                {/* <Text>word calen day nhe</Text> */}
                <ListWord navigation={navigation} lession={lession} datass ={dataList}/>
            </View>

        </View>
    )
}

const styles = StyleSheet.create({

    checkboxContainer: {
        flexDirection: "row",
    },

    label: {
        margin: 8,
        marginLeft: 0
    },
});