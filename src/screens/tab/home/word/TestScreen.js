import React, { useEffect, useState } from 'react'
import { Text, View, Image, TextInput, StyleSheet, ScrollView, TouchableOpacity, Dimensions, FlatList } from 'react-native'
const WIDTH = Dimensions.get('window').width;
import Modal from 'react-native-modal'; // 2.4.0

export default TestScreen = () => {
    const [isVisibleImage, setisVisibleImage] = useState(false);
    const images = ["https://s3-ap-northeast-1.amazonaws.com/try-it-media-markdown-images/images/k/0/mat_a/2_1_21_1/k_mat_a_2_1_21_1_image01.png",
"https://img.epochtimes.com.tw/upload/images/2016/06/14/201753_medium.jpg",
"https://cp.cw1.tw/files/md5/bc/bd/bcbd39150c281b31c5b9a60eed9315f8-48708.jpg",
"https://cw1.tw/CH/images/channel_master/ff061810-2d61-415a-8cfd-53233c9f19a7.jpg",
"https://pic3.zhimg.com/v2-8579449c9f28eea100434d269128a38f_b.jpg"
]
    return (
        <View style={{ flex: 1 }}>
            <View>
                <TouchableOpacity onPress={() => setisVisibleImage(true)}>
                    <Text>Show model</Text>
                </TouchableOpacity>
            </View>
            <View style={[styles.container]}>
                <Modal
                    isVisible={isVisibleImage}
                    animationInTiming={1000}
                    animationOutTiming={1000}
                    backdropTransitionInTiming={1000}
                    backdropTransitionOutTiming={1000}
                    deviceWidth={WIDTH}
                >
                    <View style={styles.modalContent}>
                        <ScrollView>
                            <View>
                                {
                                   images.map((element, key) => {
                                        return (
                                            <View key={key} style={{ borderWidth: 1}}>
                                                <Image
                                                    style={{ width: '100%',minHeight: 200   }}
                                                    source={{
                                                        uri: element,
                                                    }}
                                                />
                                            </View>
                                        )
                                    })
                                }
                            </View>
                        </ScrollView>

                        <TouchableOpacity onPress={() => setisVisibleImage(false)}>
                            <View style={styles.button}>
                                <Text>Close</Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                </Modal>
            </View>
        </View>
    )
}
const styles = StyleSheet.create({
    container: {
        width: WIDTH,
        flex: 1,
    },
    button: {
        backgroundColor: 'lightblue',
        padding: 12,
        margin: 16,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 4,
        borderColor: 'rgba(0, 0, 0, 0.1)',
    },
    modalContent: {
        backgroundColor: 'white',
        borderRadius: 4,
        borderColor: 'rgba(0, 0, 0, 0.1)',
        marginTop: 50
    },
    //   bottomModal: {
    //     justifyContent: 'flex-end',
    //     margin: 0,
    //   },
    text: {
        fontSize: 24,
        marginBottom: 30,
        padding: 40,
    }
});
