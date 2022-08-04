import React, { useState } from 'react';
import { View, Image, ScrollView, Dimensions, Text, StyleSheet, TouchableOpacity } from 'react-native';
import jp from '../../assets/images/jp.jpg';
import background from '../../assets/images/background.jpg';
import japan1 from '../../assets/images/japan1.jpg';
import { useTheme, Switch } from 'react-native-paper';
import { TouchableRipple } from 'react-native-paper';
import { AuthContext } from '../../components/context';
import AppText from '../../components/app-text';

const { width } = Dimensions.get("window");
const height = width * 1.2;
const images = [
    { image: jp, text: "Giup cải thiện được điểm số" },
    { image: background, text: "Learn by different methods" },
    { image: japan1, text: "easily exchange information with people" }
]
const Toggle = ({ navigation }) => {
    const [active, setActive] = useState(0);
    const change = ({ nativeEvent }) => {
        const slide = Math.ceil(nativeEvent.contentOffset.x / nativeEvent.layoutMeasurement.width);
        if (slide !== active) {
            setActive(slide);
        }
    }
    const { colors } = useTheme();
    const paperTheme = useTheme();
    const { toggleTheme } = React.useContext(AuthContext);
    return (
        <View style={{ flex: 1, backgroundColor: colors.background }}>
            <View style={{ height: '70%'}}>
            <ScrollView
                horizontal
                pagingEnabled
                onScroll={change}
                showsHorizontalScrollIndicator={false}
                style={{  }}
            >
                {/* <TouchableRipple onPress={() => {toggleTheme()}}>
                            <View style={styles.preference}>
                                <Text>Dark Theme</Text>
                                <View pointerEvents="none">
                                    <Switch value={paperTheme.dark}/>
                                </View>
                            </View>
                        </TouchableRipple> */}
                {
                    images.map((image, index) => (
                        <View key={index} >
                            <Text style={{ alignSelf: 'center', fontWeight: 'bold', marginTop: 50, fontSize: 30, color: colors.text }}>Hongo app</Text>
                            <View style={{ alignSelf: 'center', alignItems: 'center', justifyContent: 'center' }}>
                                <Image
                                    source={image.image}
                                    style={{ width: 100, height: 100, resizeMode: 'cover', margin: width * 0.35, marginTop: 80, marginBottom: 80 }}
                                />
                                {index == 0 ? <AppText key={index.toString()} style={{ alignItems: 'center', justifyContent: 'center', color: colors.text }} i18nKey={'help improve scores'}>{image.text}</AppText> : null}
                                {index == 1 ? <AppText key={index.toString()} style={{ alignItems: 'center', justifyContent: 'center', color: colors.text }} i18nKey={'Learn by different methods'}>{image.text}</AppText> : null}
                                {index == 2 ? <AppText key={index.toString()} style={{ alignItems: 'center', justifyContent: 'center', color: colors.text }} i18nKey={'easily exchange information with people'}>{image.text}</AppText> : null}
                            </View>

                        </View>
                    ))

                }

            </ScrollView>
            </View>
            <View>
                <View style={{ flexDirection: 'row', bottom: 0, alignSelf: 'center' }}>
                    {
                        images.map((i, k) => (
                            <Text key={k} style={k == active ? styles.paddingActionText : styles.paddingText}>⬤</Text>
                        ))
                    }

                </View>
                <View style={styles.button}>
                    <TouchableOpacity
                        onPress={() => navigation.navigate('Login')}
                        style={[styles.signIn, { backgroundColor: colors.header }]}
                    >
                        <View
                            colors={['#08d4c4', '#01ab9d']}
                            style={styles.signIn}
                        >
                            <AppText style={[styles.textSign, {
                                color: 'white'
                            }]} i18nKey={'Login'} />
                        </View>
                    </TouchableOpacity>

                    <TouchableOpacity
                        onPress={() => navigation.navigate('SignUp')}
                        style={[styles.signIn, {
                            borderColor: colors.header,
                            borderWidth: 1,
                            marginTop: 15
                        }]}
                    >
                        <AppText style={[styles.textSign, {
                            color: colors.header
                        }]} i18nKey={'SignUp'} />
                    </TouchableOpacity>
                </View>
            </View>
        </View>

    );

}
export default Toggle;
const styles = StyleSheet.create({
    paddingText: {
        fontSize: (width / 30),
        color: '#888',
        marginRight: 5
    },
    paddingActionText: {
        fontSize: (width / 30),
        color: 'black',
        marginRight: 5
    },
    signIn: {
        width: '90%',
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10
    },
    button: {
        alignItems: 'center',
        marginTop: 40
    },
})