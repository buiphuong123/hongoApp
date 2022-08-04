import React, { useEffect, useState } from 'react';
import {
    TouchableOpacity,
    StyleSheet,
    ScrollView,
    View,
    Text,
    TextInput,
    FlatList,
    Dimensions,
    Alert
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import {RemoteTextVocabulary} from '../../../redux/actions/word.action';
const WIDTH = Dimensions.get('window').width;
import axios from 'axios';

export default function SearchDropDownWord(props) {
    const { dataGrammar, navigation,dataVocu  } = props;
    const dispatch = useDispatch();
    const searchData = (item) => {
       dispatch(RemoteTextVocabulary(item.word));
        Alert.alert(
            "Alert",
            "Do you want to use "+item.word + "in the app's vocabulary?",
            [
                {
                    text: "No",
                    // onPress: () => {
                    //     // props.press();
                    //     console.log("Cancel Pressed");
                        
                    //     dispatch(RemoteTextVocabulary(item.grammar.split("=>")[0]));
                    // },
                    onPress: props.onPress,
                    style: "cancel"

                },
                {
                    text: "Yes", onPress: () => {
                        var d= {};
                        d.word = item.word;
                        d.vn = item.vn;
                        d.explain = item;
                        d.type = "Từ vựng"
                        dataVocu.data.push(d);
                        navigation.goBack();
                        // navigation.navigate("ListWordVocabulary", {navigation: navigation, listdata: dataVocu});
                        axios.post('https://nameless-spire-67072.herokuapp.com/language/createWordInVoca', {
                            "id": dataVocu._id,
                            "word": item.word,
                            "vn": item.vn,
                            "type": "Từ vựng",
                            "explain": item,
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
                        // navigation.navigate("ListWordVocabulary", {navigation: navigation, listdata: dataVocu, status: false});
                    }
                },
                {
                    text: "Xem từ vựng", onPress: () => {
                        navigation.navigate("WordScreenDetail", {vocabularys: item});
                    }
                }
            ]
        )
    }

    const renderWord = ({ item }) => {
        return (
            <TouchableOpacity style={styles.itemView} onPress={() => searchData(item)}>
                <Text style={styles.itemText}>{item.word}: {item.vn}</Text>
            </TouchableOpacity>
        )
    }
    return (
        <TouchableOpacity
            onPress={props.onPress}
            style={styles.container}>

                <View>
                {
                    dataGrammar.length ?
                        <ScrollView>
                            <FlatList
                                // style={{}}
                                style={styles.subContainer}
                                data={dataGrammar}
                                keyExtractor={item => item.id}
                                renderItem={renderWord}
                            />
                        </ScrollView>

                        : 
                        <Text></Text>
                }

            </View>
        </TouchableOpacity>

    )
}


const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        left: 0, right: 0, bottom: 0,
        // top: 130,
        top: WIDTH / 3,
        width: 400,
        zIndex: 1
    },
    subContainer: {
        minHeight: 200,
        backgroundColor: '#fff',
        paddingTop: 10,
        marginHorizontal: 20,
        borderTopLeftRadius: 4,
        borderTopRightRadius: 4,
        flexWrap: 'wrap',
    },
    itemView: {
        borderBottomColor: '#cccccc',
        borderBottomWidth: 1,
        backgroundColor: 'white',
        minHeight: 30,
        width: WIDTH,
        marginBottom: 10,
        justifyContent: 'center',
        borderRadius: 4,
    },
    itemText: {
        color: 'black',
        paddingHorizontal: 10,
    },
    noResultView: {
        alignSelf: 'center',
        height: 100,
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        alignContent: 'center'
    },
    noResultText: {
        fontSize: 18,
        fontWeight: 'bold',
        color: 'red'
    },

});