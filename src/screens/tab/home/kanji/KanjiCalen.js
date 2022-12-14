import React, { useEffect, useState } from 'react'
import { Text, View, StyleSheet, Dimensions } from 'react-native'
import CheckBox from '@react-native-community/checkbox';
import AppText from '../../../../components/app-text';
import { useSelector, useDispatch } from 'react-redux';
import { TouchableOpacity } from 'react-native-gesture-handler';
// import ListWord from './ListWord';
import CustomHeader from '../../../CustomHeader';
import { RemoteAllKanji, RemoteLikeKanji, RemoteMemerizeKanji, RemoteNotMemerizeKanji } from '../../../../redux/actions/kanji.action';
import { RadioButton } from 'react-native-paper';
const { width: WIDTH } = Dimensions.get('window');
import Icon from 'react-native-vector-icons/Ionicons';
import Entypo from 'react-native-vector-icons/Entypo';
import { Center } from 'native-base';
import { useTheme } from 'react-native-paper';
import ListKanjiScreen from './ListKanjiScreen';
export default KanjiCalen = ({ navigation, route }) => {
    const { colors } = useTheme();
    const dispatch = useDispatch();
    const isAll = useSelector(state => state.kanjiReducer.isAll);
    const users = useSelector(state => state.userReducer.user);

    const isMemerize = useSelector(state => state.kanjiReducer.isMemerize);
    const isNotMemerize = useSelector(state => state.kanjiReducer.isNotMemerize);
    const isLike = useSelector(state => state.kanjiReducer.isLike);
    const { lession, rang1, rang2 } = route.params;
    const [dataList, setDataList] = useState([]);

    const kanjilevel = useSelector(state => state.kanjiReducer.kanjilevel);
    // useEffect(() => {
    //     console.log(rang1, rang2);
    //     setDataList(kanjilevel.filter(e => e.lession === lession).splice(rang1, rang2));
    // }, [rang1, rang2]);
    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
                setDataList(kanjilevel.filter(e => e.lession === lession).splice(rang1, rang2));
        });

        return unsubscribe;
    }, [navigation, rang1, rang2]);
    const toggleAllKanji = () => {
        if (isAll === 'unchecked') {
            dispatch(RemoteAllKanji('checked'));
            dispatch(RemoteMemerizeKanji('unchecked'));
            dispatch(RemoteNotMemerizeKanji('unchecked'));
            dispatch(RemoteLikeKanji('unchecked'));
        }
    }
    const toggleMemerizeKanji = (value) => {
        if (isMemerize === 'unchecked') {
            dispatch(RemoteAllKanji('unchecked'));
            dispatch(RemoteMemerizeKanji('checked'));
            dispatch(RemoteNotMemerizeKanji('unchecked'));
            dispatch(RemoteLikeKanji('unchecked'));
        }
    }
    const toggleNotMemerizeKanji = (value) => {
        if (isNotMemerize === 'unchecked') {
            dispatch(RemoteAllKanji('unchecked'));
            dispatch(RemoteMemerizeKanji('unchecked'));
            dispatch(RemoteNotMemerizeKanji('checked'));
            dispatch(RemoteLikeKanji('unchecked'));
        }
    }
    const toggleLikeKanji = (value) => {
        if (isLike === 'unchecked') {
            dispatch(RemoteAllKanji('unchecked'));
            dispatch(RemoteMemerizeKanji('unchecked'));
            dispatch(RemoteNotMemerizeKanji('unchecked'));
            dispatch(RemoteLikeKanji('checked'));
        }
    }

    const learnFlashcard = () => {
        console.log('vao kanji flashcard nha', lession);
        navigation.navigate("KanjiFlashcard", { navigation: navigation, lession: lession });
    }
    return (
        <View style={{ flex: 1 }}>
            <CustomHeader title="Kanji" navigation={navigation} icon={users.role !== 1 ? "person" : null} action={learnFlashcard} />
            {users.role !== 1 ?
                <View style={{ flexDirection: 'row', justifyContent: 'space-around', marginTop: 10, paddingBottom: 10, borderBottomWidth: 1, borderBottomColor: colors.header }}>
                    <View style={styles.checkboxContainer}>
                        <RadioButton
                            uncheckedColor={colors.text}
                            color={colors.header}
                            tintColors={{ true: colors.header, false: colors.text }}
                            status={isAll}
                            onPress={() => toggleAllKanji()}
                        />
                        <Text style={{ marginTop: 8, color: colors.text }}>T???t c???</Text>
                    </View>

                    <View style={[styles.checkboxContainer]}>
                        <RadioButton
                            uncheckedColor={colors.text}
                            color={colors.header}
                            tintColors={{ true: colors.header, false: colors.text }}
                            status={isMemerize}
                            onPress={() => toggleMemerizeKanji()}
                        />
                        <Text style={{ marginTop: 8, color: colors.text }}>???? nh???</Text>
                    </View>

                    <View style={styles.checkboxContainer}>
                        <RadioButton
                            uncheckedColor={colors.text}
                            color={colors.header}
                            tintColors={{ true: colors.header, false: colors.text }}
                            status={isNotMemerize}
                            onPress={() => toggleNotMemerizeKanji()}
                        />
                        <Text style={{ marginTop: 8, color: colors.text }}>Ch??a nh???</Text>
                    </View>

                    <View style={styles.checkboxContainer}>
                        <RadioButton
                            uncheckedColor={colors.text}
                            color={colors.header}
                            tintColors={{ true: colors.header, false: colors.text }}
                            status={isLike}
                            onPress={() => toggleLikeKanji()}
                        />
                        <Text style={{ marginTop: 8, color: colors.text }}>???? th??ch</Text>
                    </View>
                </View>
                :
                <View style={{ justifyContent: 'center', alignItems: 'center', padding: 20, borderBottomWidth: 1, borderBottomColor: colors.header }}>
                    <Text style={{ fontWeight: 'bold', fontSize: 18, color: colors.text }}>Danh s??ch ch??? h??n</Text>

                </View>
            }

            <View style={{ flex: 1 }}>
                {/* <Text>List d??t day nhe</Text> */}
                {/* <ListWord /> */}
                {/* <ListWord navigation={navigation} lession={lession} /> */}
                <ListKanjiScreen navigation={navigation} lession={lession} datass = {dataList}/>
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

