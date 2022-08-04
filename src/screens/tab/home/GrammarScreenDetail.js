import React, { Component } from 'react'
import { Text, View, SafeAreaView, TouchableOpacity } from 'react-native'
import CustomHeader from '../../CustomHeader';
import Furi from 'react-native-furi'
import HTMLView from 'react-native-htmlview';

const GrammarScreenDetail = ({ navigation }) => {
    const htmlContent = `
    <p> <ruby>感<rp>(</rp><rt>かん</rt><rp>)</rp></ruby>じ<ruby>取<rp>(</rp><rt>と</rt><rp>)</rp></ruby>れたら<ruby>手<rp>(</rp><rt>て</rt><rp>)</rp></ruby>を<ruby>繋<rp>(</rp><rt>つな</rt><rp>)</rp></ruby>ごう</p>
    `;
    
    return (
        <View style={{ flex: 1, marginTop: 30}}>
            <Furi
                style={{}}
                value={[
                    { value: "北海道", furi: 'ほっかいどう' },
                    { value: "ほっかいどう", furi: '' },
                ]}
                valueStyle={{
                    // fontFamily: '',
                    color: 'black',
                    borderColor: 'black',
                    borderWidth: 0,
                }}
                furiStyle={{
                    // fontFamily: '',
                    borderColor: 'red',
                    borderWidth: 0,
                }}
                showFuri={true}
                size={13}
            />
             <HTMLView
                            value={htmlContent}
                        />


        </View>
    )
}
export default GrammarScreenDetail;