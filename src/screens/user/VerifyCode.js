import React, {useState} from 'react';
import {SafeAreaView, Text, StyleSheet, TouchableOpacity, View, Image} from 'react-native';
import AppText from '../../components/app-text';
import { useTheme } from 'react-native-paper';
import {
  CodeField,
  Cursor,
  useBlurOnFulfill,
  useClearByFocusCell,
  MaskSymbol,
  isLastFilledCell,
} from 'react-native-confirmation-code-field';
import lock from '../../assets/images/lock.jpg';
import Icon from 'react-native-vector-icons/Ionicons';
import axios from 'axios';
import { showToastSuccess, showToastError } from '../../helpers/toastHelper';
const styles = StyleSheet.create({
  root: {flex: 1, padding: 20,},
  title: {textAlign: 'center', fontSize: 30},
  codeFiledRoot: {marginTop: 20},
  cell: {
    width: 60,
    height: 60,
    // lineHeight: 38,
    lineHeight: 60,
    fontSize: 30,
    borderWidth: 2,
    // borderColor: '#00000030',
    textAlign: 'center',
  },
  focusCell: {
    // borderColor: '#000',
  },
  signIn: {
    width: '100%',
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10
},
textSign: {
    fontSize: 18,
    fontWeight: 'bold'
},
button: {
  alignItems: 'center',
  marginTop: 50
},
images: {
  height: 200,
  width: '100%',
  marginTop: 20,
  marginBottom: 20
},
textenter: { 
  alignSelf: 'center'
}
});

const CELL_COUNT = 4;

const VerifyCode = ({navigation, route}) => {
  const { colors } = useTheme();

  const [value, setValue] = useState('');
  const [error, setError] = useState('');
  const ref = useBlurOnFulfill({value, cellCount: CELL_COUNT});
  const [props, getCellOnLayoutHandler] = useClearByFocusCell({
    value,
    setValue,
  });
  const { email } = route.params;
  const verity = () => {
    console.log('GIA TRI CUA VALUE LA', value);
    // console.log(email);
    axios.post('https://nameless-spire-67072.herokuapp.com/language/resetPassword', {
      "token": value,
      "email": email
    }, {
      headers: {
            "Accept": "application/json",
            "Content-Type": "application/json"
        }
    })
    .then((response) => {
      console.log(response.data);
        if(response.data.code === 1) {
          showToastSuccess(response.data.success);
          navigation.navigate("NewPassword", {email: email});
        }
        else {
          showToastError(response.data.error);
          setError(response.data.err);
        }
    })
  }

  return (
    <SafeAreaView style={styles.root}>
      <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
        <Icon name={'arrow-back'} size={29} style={{color: colors.text}} />
        </TouchableOpacity>
        <AppText style={[styles.title, {color: colors.text}]} i18nKey={'verification'}/>
        <View />
      </View>
      <Image
        style={styles.images}
        source={lock}
      />
      <AppText style={[styles.textenter, {color: colors.text}]} i18nKey={'Please enter the verfication code'} />
      <AppText style={[styles.textenter, {color: colors.text}]} i18nKey={'we send to your email address'} />
      <CodeField
        ref={ref}
        {...props}
        value={value}
        onChangeText={setValue}
        cellCount={CELL_COUNT}
        rootStyle={styles.codeFiledRoot}
        keyboardType="number-pad"
        renderCell={({index, symbol, isFocused}) => (
          <Text
            key={index}
            style={[styles.cell ,{color: colors.text}, isFocused && styles.focusCell, {borderColor: colors.text}]}
            onLayout={getCellOnLayoutHandler(index)}>
            {symbol ? (
              // use special component for masking
              <MaskSymbol
                isLastFilledCell={isLastFilledCell({index, value})}
                maskSymbol="*">
                {symbol}
              </MaskSymbol>
            ) : (
              isFocused && <Cursor />
            )}
          </Text>
        )}
      />

      <TouchableOpacity onPress={() => {navigation.navigate("ForgotPassword")}} >
          <AppText style={{color: '#009387', marginTop:15}} i18nKey={'resend code'}/>
      </TouchableOpacity>
          <View style={{marginTop:5}}>
            <Text style={{color: 'red'}}>{error != '' ? error : ''}</Text>
          </View>
      <View style={styles.button}>
        <TouchableOpacity
                style={[styles.signIn, {backgroundColor: colors.header}]}
                onPress = {() => verity()}
            >
            <View
                colors={['#08d4c4', '#01ab9d']}
                style={styles.signIn}
            >
                <AppText style={[styles.textSign, {
                    color:'white',
                }]} i18nKey={'verify'}/>
            </View>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default VerifyCode;