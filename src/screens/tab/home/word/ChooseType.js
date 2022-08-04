import React, { Component } from 'react'
import { Text, View, SafeAreaView, TouchableOpacity, StyleSheet } from 'react-native'
import CustomHeader from '../../../CustomHeader';

const ChooseType = ({ navigation }) => {
    return (
        <View style={{ flex: 1 }}>
            <CustomHeader title="Baì test từ vựng" navigation={navigation} />
            <View style={{padding: 20, flex: 1, zIndex: 0 }}>
                <View style={{ flex: 10,  }}>
                    <View style={{ flexDirection: 'row', marginBottom: 30, backgroundColor: 'gray', height: 10, borderRadius: 5 }}>
                        <View style={{backgroundColor: 'red', height: 10, borderRadius: 5, width: number*(width-40)/(listQuestion.length)}}></View>
                        <View style={{backgroundColor: 'gray', height: 5, width: (listQuestion.length-number)*(width-40)/(listQuestion.length)}}></View>
                        {/* <Slider
                            style={{ width: 250, height: 60}}
                            minimumValue={1}
                            maximumValue={5}
                            minimumTrackTintColor="green"
                            maximumTrackTintColor="#000000"
                            step={1}
                            value={rating}
                            onValueChange={setRating}
                        />
                        <Text style={{ fontSize: 40 }}>
                            {getRatingEmoji()}
                        </Text> */}
                    </View>
                    <View style={{flexDirection: 'row', justifyContent: 'space-around'}}>
                        <View style={{ padding: 10}}>
                            <Text style={{fontWeight: 'bold', fontSize: 21}}>{number}/{listQuestion.length}</Text>
                        </View>
                        <View style={{flexDirection: 'row', justifyContent: 'flex-end'}}>
                            <View style={{padding: 10, backgroundColor: '#8080ff', width: 80, justifyContent: 'center', alignItems:'center'}}>
                                <Text style={{color: 'white', fontWeight: 'bold'}}>ĐÚNG {trueQuestion}</Text>
                            </View>

                            <View style={{ backgroundColor: 'red', width: 80, justifyContent: 'center', alignItems:'center', marginLeft: 20}}>
                                <Text style={{color: 'white', fontWeight: 'bold'}}>Sai {falseQuestion}</Text>
                            </View>
                        </View>
                    </View>
                    {/* <View style={{marginTop: 20}}>
                        <View style={styles.boxQues}>
                            <Text style={styles.textQues}>[    ]わけじゃあるまいし、そんなに泣かないで。</Text>
                        </View>
                        <View style={{}}>
                            <TouchableOpacity style={[styles.boxAns, { backgroundColor: isA ? '#8080ff' : '#d9d9d9',}  ]} onPress={() => chooseA()}>
                                <Text> A. もう会えなくなる</Text>
                               {isAnswer ? <Text style={{marginLeft: 20, color: 'red'}}>O 普通形 + わけじゃあるまいし</Text> : null} 
                            </TouchableOpacity>
                            <TouchableOpacity style={[styles.boxAns, {backgroundColor: isB ? '#8080ff' : '#d9d9d9',}  ]} onPress={() => chooseB()}>
                                <Text>B. これで最後</Text>
                            </TouchableOpacity>
                        </View>
                    </View> */}
                    <FlatList
                        data={question}
                        keyExtractor={item => item.id}
                        renderItem={renderQuestion}
                    />
                    
                </View>
                <View style={{ paddingLeft: 40, paddingRight: 40, flex: 1, }}>
                    <Button
                        onPress={() => checkAnwer()}
                        title="Kiểm tra"
                        color="#841584"
                        accessibilityLabel="Learn more about this purple button"
                    />
                </View>
            </View>
            {alertSuccess == '' ?
                null :
                successMess

            }

            {alertError == '' ?
                null :
                errorsMess

            }


        </View>
    )
}


const styles = StyleSheet.create({
    boxQues: {
        backgroundColor: '#8080ff',
        padding: 40,
        borderRadius: 10
    },
    textQues: {
        color: '#fff',
        fontWeight: 'bold'
    },
    boxAns: {
        padding: 20, 
        
        marginTop: 20, 
        borderRadius:10,
        flexDirection: 'row',
        flexWrap: 'wrap'
    }


})
export default ChooseType;