import React, { Component, useState } from 'react'
import { Text, View, StyleSheet, SafeAreaView, TouchableOpacity } from 'react-native'
import { RadioButton } from 'react-native-paper';

const BeforeFlashcard = ({ }) => {
    const [checked, setChecked] = React.useState('first');
    const [isWord, setIsWord] = useState('checked');
    const [isMean, setIsMean] = useState('unchecked');
    const [isHira, setIsHira] = useState('unchecked');
    const toggleSwitchWord = () => {
        if (isWord === 'unchecked') {
            setIsWord('checked');
            setIsMean('unchecked');
            setIsHira('unchecked');
        }
    }
    const toggleSwitchMean = () => {
        if (isMean === 'unchecked') {
            setIsWord('unchecked');
            setIsMean('checked');
            setIsHira('unchecked');
        }
    }
    const toggleSwitchHira = () => {
        if (isHira === 'unchecked') {
            setIsWord('unchecked');
            setIsMean('unchecked');
            setIsHira('checked');
        }
    }
    return (
        <View style={{ flex: 1 }}>
            <View style={{ flexDirection: 'row', justifyContent: 'space-around', marginTop: 10, borderBottomWidth: 1, borderBottomColor: '#cccccc', borderTopWidth: 1, borderTopColor: '#cccccc'  }}>
                <View style={[styles.checkboxContainer, { borderRightWidth: 1, borderRightColor: '#cccccc' }]}>
                    <RadioButton
                        status={isWord}
                        onPress={() => toggleSwitchWord()}
                    />
                    <Text>Nhập từ</Text>
                </View>

                <View style={[styles.checkboxContainer, { borderRightWidth: 1, borderRightColor: '#cccccc' }]}>
                    <RadioButton
                        status={isMean}
                        onPress={() => toggleSwitchMean()}
                    />
                    <Text>Nhập nghĩa</Text>
                </View>

                <View>
                    <RadioButton
                        status={isHira}
                        onPress={() => toggleSwitchHira()}
                    />
                    <Text>Phiên âm</Text>
                </View>
            </View>

        </View>
    )
}
const styles = StyleSheet.create({

    checkboxContainer: {
        flexDirection: "column",
        paddingLeft: 20,
        paddingRight: 20,
        // alignItems: 'center',
        // justifyContent: 'center',
        paddingTop: 5,
        paddingBottom: 5,
        // borderBottomWidth: 1 
    },


});
export default BeforeFlashcard;