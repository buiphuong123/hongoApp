import React from 'react'
import { Text, View, StyleSheet, Dimensions, TouchableOpacity } from 'react-native'
import CheckBox from '@react-native-community/checkbox';
import AppText from '../../../../components/app-text';
import CustomHeader from '../../../CustomHeader';
import { useSelector, useDispatch } from 'react-redux';
const { width: WIDTH } = Dimensions.get('window');
import Icon from 'react-native-vector-icons/Ionicons';
import { getListWordSuccess } from '../../../../redux/actions/word.action';

export default WordInfo = ({ word, count }) => {
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

  const setStar = (userId, wordId) => {
    word.likes.isLike = true;
    console.log(word);
  }
  const deleteStar = () => {

  }
  return (
    <View>
      <View style={{ borderBottomWidth: 1, borderBottomColor: '#999999', marginTop: 5, width: WIDTH }}>
        <View style={{ justifyContent: 'space-between', flexDirection: 'row', marginBottom: 5 }}>
          <View style={{ flexDirection: 'row' }}>
            <Text style={styles.word1}>{count + 1}/</Text>
            {isWord ? <Text style={styles.word}>{word.kanji === undefined ? word.kata : word.kanji}</Text> : null}
            {isHira ? <Text style={styles.word}>{word.hira}</Text> : null}
          </View>
          <View />
          <TouchableOpacity>
            <Icon style={[styles.star, { color: word.likes.length === 0 ? '#999999' : 'blue' }]} name="star-outline" size={25} />
            {/* <Icon name="star-outline" size={25} /> */}
          </TouchableOpacity>
        </View>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
          <View style={{ flexDirection: 'row' }}>
            {isKanji ? <Text style={{ marginLeft: 5, textTransform: 'uppercase' }}>[{word.amhan == '' ? '' : word.amhan}]</Text> : null}
            {isMean ? <Text style={{ marginLeft: 5 }}>{word.vn}</Text> : null}
          </View>
          <TouchableOpacity>
            <Icon style={[styles.check, { color: word.memerizes.length === 0 ? '#999999' : 'blue' }]} name="checkmark-circle-outline" size={25} />
          </TouchableOpacity>

        </View>

      </View>

    </View>
  )
}

const styles = StyleSheet.create({
  word1: { marginLeft: 5, color: "blue" },
  word: { marginLeft: 5, color: "blue" },
  star: { marginRight: 10 },
  check: { marginRight: 10 },
});