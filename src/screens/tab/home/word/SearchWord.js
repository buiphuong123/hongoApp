import React from 'react';
import {
    TouchableOpacity,
    StyleSheet,
    ScrollView,
    View,
    Text,
    TextInput,
    FlatList,
    Dimensions
} from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
const WIDTH = Dimensions.get('window').width;

export default function SearchWord(props) {
    const dispatch = useDispatch();
    const { wordList, navigation } = props
    const searchData = (item) => {
        // console.log(item);
        // const grammar = dataGrammar.filter(grammar => grammar._id === item._id);
        // console.log('grammar chuan bij truyen di la ', grammar);
        navigation.navigate("WordScreenDetail", {vocabularys: item});
    }
    const renderWord = ({item}) => {
        return (
            <TouchableOpacity style={styles.itemView} onPress={() => searchData(item)}>
                <Text style={styles.itemText}>{item.word} : {item.vn}</Text>
            </TouchableOpacity>
        )
    }
    return (
        <TouchableOpacity
            onPress={props.onPress}
            style={styles.container}>

            <View style={styles.subContainer}>
                {
                    wordList.length ?
                        <ScrollView>
                            <FlatList
                                style={{}}
                                data={wordList}
                                keyExtractor={item => item.id}
                                renderItem={renderWord}
                            />
                        </ScrollView>

                        :
                        <View
                            style={styles.noResultView}>
                            <Text style={styles.noResultText}>No search items matched</Text>
                        </View>
                }

            </View>
        </TouchableOpacity>

    )
}


const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        // top: '23%',
        left: 0, right: 0, bottom: 0,top: WIDTH/3.8
    },
    subContainer: {
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
        height: 30,
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