import React, { useState, useEffect } from 'react'
import { Text, View, SafeAreaView, TouchableOpacity, StyleSheet, Switch } from 'react-native'
import CheckBox from '@react-native-community/checkbox';

const ModelSelect = ({ }) => {
    const [isExample, setIsExample] = useState(false);
    const [isExampleMean, setIsExampleMean] = useState(false);
    const [isImage, setIsImage] = useState(false);
  const toggleSwitchExample = () => setIsExample(previousState => !previousState);
  const toggleSwitchExampleMean = () => setIsExampleMean(previousState => !previousState);
  const toggleSwitchImage = () => setIsImage(previousState => !previousState);

    return (
        <View style={{ flex: 1 }}>
            <View style={{ flexDirection: 'row', justifyContent: 'space-around', marginTop: 10, borderBottomWidth: 1, borderBottomColor: '#cccccc', borderTopWidth: 1, borderTopColor: '#cccccc' }}>
                <View style={[styles.checkboxContainer, { borderRightWidth: 1, borderRightColor: '#cccccc' }]}>
                    <CheckBox
                        style={styles.checkbox}
                    // value={!memerize}
                    // onValueChange={() => setmemerize(!memerize)}
                    />
                    {/* <AppText i18nKey={"word"} style={styles.label} /> */}
                    <Text style={styles.label}>chưa nhớ</Text>
                </View>

                <View style={[styles.checkboxContainer, { borderRightWidth: 1, borderRightColor: '#cccccc' }]}>
                    <CheckBox
                        style={styles.checkbox}
                    // value={!memerize}
                    // onValueChange={() => setmemerize(!memerize)}
                    />
                    {/* <AppText i18nKey={"word"} style={styles.label} /> */}
                    <Text style={styles.label}>chưa nhớ</Text>
                </View>

                <View style={styles.checkboxContainer}>
                    <CheckBox
                        style={styles.checkbox}
                    // value={!memerize}
                    // onValueChange={() => setmemerize(!memerize)}
                    />
                    {/* <AppText i18nKey={"word"} style={styles.label} /> */}
                    <Text style={styles.label}>chưa nhớ</Text>
                </View>
            </View>
            <View>
                <View style={{flexDirection: 'row', justifyContent: 'space-between', borderBottomWidth: 1, borderBottomColor: '#cccccc'}}>
                    <View style={{padding:20}}>
                        <Text>Hiển thị ví dụ</Text>
                    </View>
                    <Switch
                        trackColor={{ false: "#767577", true: "#81b0ff" }}
                        thumbColor={isExample ? "blue" : "white"}
                        ios_backgroundColor="#3e3e3e"
                        onValueChange={toggleSwitchExample}
                        value={isExample}
                    />
                </View>

                <View style={{flexDirection: 'row', justifyContent: 'space-between', borderBottomWidth: 1, borderBottomColor: '#cccccc'}}>
                    <View style={{padding:20}}>
                        <Text>Hiển thị nghĩa ví dụ</Text>
                    </View>
                    <Switch
                        trackColor={{ false: "#767577", true: "#81b0ff" }}
                        thumbColor={isExampleMean ? "blue" : "white"}
                        ios_backgroundColor="#3e3e3e"
                        onValueChange={toggleSwitchExampleMean}
                        value={isExampleMean}
                    />
                </View>

                <View style={{flexDirection: 'row', justifyContent: 'space-between',}}>
                    <View style={{padding:20}}>
                        <Text>Hiển thị ảnh</Text>
                    </View>
                    <Switch
                        trackColor={{ false: "#767577", true: "#81b0ff" }}
                        thumbColor={isImage ? "blue" : "white"}
                        ios_backgroundColor="#3e3e3e"
                        onValueChange={toggleSwitchImage}
                        value={isImage}
                    />
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

    label: {
        margin: 8,
        marginLeft: 0
    },
    word1: { marginLeft: 5, color: "blue" },
    word: { marginLeft: 5, color: "blue" },
    star: { marginRight: 10 },
    check: { marginRight: 10 },
});
export default ModelSelect;