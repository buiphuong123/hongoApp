import React, {Component}  from 'react'
import {Text, View, SafeAreaView, TouchableOpacity} from 'react-native'
import CustomHeader from '../CustomHeader';

export default NotificationScreen = ({navigation}) => {
    return (
        <SafeAreaView style={{flex: 1}}>
            {/* <CustomHeader title="Notification" navigation={navigation} /> */}
            <View>
                <Text>Notification screen!</Text>
            </View>

        </SafeAreaView>
    )
}