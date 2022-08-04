import React, { useState } from 'react'
import { Text, View, SafeAreaView, Dimensions, Image, TouchableOpacity, StyleSheet, Button, FlatList } from 'react-native'
import CustomHeader from '../../CustomHeader';
import GrammerScreen from './GrammerScreen';

const word = [{ "grammar": "をおいて", "mean": "ngoài..ra thì(không) - trừ.. ra thì(không)" }, { "grammar": "ならでは", "mean": "にとどまらず" }];
const WIDTH = Dimensions.get('window').width;

export default ListGrammar = ({ navigation, dataGrammar }) => {
  return (
    <View style={{flex: 1}}>
      {/* <CustomHeader title="Grammarkk" navigation={navigation}/> */}
      <FlatList
        data={dataGrammar}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item, index }) => <GrammarScreen word={item} count={index} navigation={navigation}/>}
      />
    </View>
  )
}