import React, {Component}  from 'react'
import {Text, View, SafeAreaView, TouchableOpacity} from 'react-native'
import CustomHeader from '../../CustomHeader';

export default SettingScreenDetail = ({navigation}) => {
    return (
        <SafeAreaView style={{flex: 1}}>
            {/* <CustomHeader title="Setting detail" navigation={navigation} /> */}
            <View>
                <Text>Setting Detail</Text>
            </View>

        </SafeAreaView>
    )
}