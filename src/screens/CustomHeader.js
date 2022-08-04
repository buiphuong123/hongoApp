import React from 'react'
import {Text, View, SafeAreaView, TouchableOpacity} from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons';
import { useTheme } from 'react-native-paper';
import Icons from 'react-native-vector-icons/Fontisto';

const CustomHeader = ({title, isHome, navigation, icon, action}) => {
    const { colors } = useTheme();
    return (
        <View style={{flexDirection: 'row', height: 50, backgroundColor: colors.header, justifyContent: 'space-around'}}>
            <View style={{flex: 1, justifyContent: 'center'}}>
                {
                    isHome ?
                    <TouchableOpacity onPress={() => navigation.toggleDrawer()}>
                        {/* <Icon name={'menu'} size={29} style={{color: colors.text}} /> */}
                        <Icon name={'menu'} size={29} style={{color: '#fff'}} />

                    </TouchableOpacity>
                    :
                    <TouchableOpacity style={{flexDirection: 'row', alignItems: 'center'}} onPress={() => navigation.goBack()}>
                        <Icon name={'arrow-back'} size={29} style={{color: '#fff', marginLeft: 5}} />
                    </TouchableOpacity>
                }
            </View>
            <View style={{flex: 1.5, justifyContent: 'center'}}>
                <Text style={{textAlign: 'center', color: '#fff', fontSize: 18}}>{title}</Text>
            </View>

            <TouchableOpacity style={{flex: 1, justifyContent: 'center'}} onPress={() => action()}>
                 <Icons name={icon} size={29} style={{color: '#fff'}} />
            </TouchableOpacity>
            {/* <View style={{flex: 1}}></View> */}
        </View>
    )
}
export default CustomHeader;