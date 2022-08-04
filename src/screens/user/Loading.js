import React from 'react';
import {ActivityIndicator} from 'react-native';
import {View, StyleSheet} from 'react-native';

const Loading = () => {
    return (
        <View style={styles.container}>
            <ActivityIndicator size={"large"} color={"blue"} />
        </View>
    )
}
export default Loading;
const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    }
})