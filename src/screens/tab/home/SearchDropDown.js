import React, { useEffect } from 'react';
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
import { getListCommentRequest, getListCommentSuccess } from '../../../redux/actions/comment.action';

export default function SearchDropDown(props) {
    const dispatch = useDispatch();
    const { dataGrammar, navigation } = props
    const searchData = (item) => {
        // console.log(item);
        // const grammar = dataGrammar.filter(grammar => grammar._id === item._id);
        // console.log('grammar chuan bij truyen di la ', grammar);
        navigation.navigate("ExplainScreen", {word: item})
    }
  
    const renderGrammar = ({item}) => {
        return (
            <TouchableOpacity style={styles.itemView} onPress={() => searchData(item)}>
                <Text style={styles.itemText}>{item.grammar} : {item.translation}</Text>
            </TouchableOpacity>
        )
    }
    return (
        <TouchableOpacity
            onPress={props.onPress}
            style={styles.container}>

            <View style={styles.subContainer}>
                {
                    dataGrammar.length ?
                        <ScrollView>
                            <FlatList
                                style={{}}
                                data={dataGrammar}
                                keyExtractor={item => item.id}
                                renderItem={renderGrammar}
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
        left: 0, right: 0, bottom: 0,
        top: WIDTH/3.8,
        width: WIDTH +10, 
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