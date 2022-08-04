import React, { useState } from 'react'
import { Text, View, SafeAreaView, Dimensions, Image, TouchableOpacity, StyleSheet, Button, FlatList } from 'react-native'
import CustomHeader from '../../CustomHeader';
import { useSelector, useDispatch} from 'react-redux';
import { getGrammarSuccess } from '../../../redux/actions';
const WIDTH = Dimensions.get('window').width;
import Icon from 'react-native-vector-icons/Ionicons';
import axios from 'axios';

// const { count, word } = props;
export default GrammarScreen = ({ count, word, navigation }) => {
    const users = useSelector(state => state.userReducer.user);
    const dataGrammar = useSelector(state => state.grammarReducer.grammartList);
    const [data, setData] = useState(dataGrammar);
    const dispatch = useDispatch();
    const setMemerize = (grammerId, userId) => {
        // console.log(word.memerizes);
        if(word.memerizes.length === 1) {
            word.memerizes = [];
        }
        else if(word.memerizes.length === 0) {
            word.memerizes.push({isMem: true})
        }
        setData([...data, word]);
        dispatch(getGrammarSuccess(data));

        axios.post('https://nameless-spire-67072.herokuapp.com/language/createMemGrammar', {
            "user_id": userId,
            "grammar_id": grammerId
        }, {
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json"
            }
        })
            .then((response) => {
                console.log(response.data.nemGrammar);
            })
            .catch(function(error) {
                throw error;
            })
    }
    const furiExample = () => {
        console.log('Word la ', word.memerizes.length);
        navigation.navigate("ExplainScreen", {word: word});
    }
    return (
        <View>
            <TouchableOpacity onPress={()=> furiExample()}>
                <View style={{ borderBottomWidth: 1, borderBottomColor: '#999999', marginTop: 5, width: WIDTH}}>
                    <View style={{ justifyContent: 'space-between', flexDirection: 'row', marginBottom: 5 }}>
                        <View style={{ flexDirection: 'row' }}>
                            <Text style={styles.word1}>{count + 1}/</Text>
                            <Text style={styles.word}>{word.grammar}</Text>
                        </View>
                        <View />
                    </View>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                        <View style={{ flexDirection: 'row' }}>
                            <Text style={{ marginLeft: 5 }}>{word.translation}</Text>
                        </View>
                        <TouchableOpacity onPress={() => setMemerize(word._id, users._id)}>
                            <Icon style={[styles.check, { color: word.memerizes.length !== 0 ? 'green' : '#999999'  }]} name="checkmark-circle-outline" size={25} />
                        </TouchableOpacity>

                    </View>

                </View>


            </TouchableOpacity>
        </View>
    )
}
// word.memerizes[0].isMem?
const styles = StyleSheet.create({
    word1: { marginLeft: 5, color: "blue" },
    word: { marginLeft: 5, color: "blue" },
    star: { marginRight: 10 },
    check: { marginRight: 10 },
});