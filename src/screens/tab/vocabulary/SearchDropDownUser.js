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

export default function SearchDropDownUser(props) {
    const { dataGrammar, navigation  } = props;
    const dispatch = useDispatch();
    useEffect(() => {
        console.log('DATA FILETER LA ', dataGrammar);
    }, []);
    const renderWord = ({ item }) => {
        return (
            <TouchableOpacity style={styles.itemView}>
                <Text style={styles.itemText}>{item.email}</Text>
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
        top: WIDTH / 4,
        width: WIDTH,
        zIndex: 1,
        minHeight: WIDTH/2
    },
    subContainer: {
        minHeight: 150,
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