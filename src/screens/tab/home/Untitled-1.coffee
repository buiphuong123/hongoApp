<View style={{ flex: 10, }}>
                    <View style={{ flexDirection: 'row', }}>
                        <Slider
                            style={{ width: 250, height: 60 }}
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
                        </Text>
                    </View>

                    {/* <View style={{margin: 30}}>
                        <ProgressBar 
                            progress={rating} 
                            width={200} />
                    </View> */}

                    <View style={{ marginBottom: 20 }}>
                        <Text>Ngu phap moi</Text>
                    </View>
                    <Text style={{ fontWeight: 'bold', fontSize: 18 }}>Dấu hiệu nhận biết</Text>
                    <View style={{ flexDirection: 'row', marginTop: 30, borderBottomWidth: 1, borderBottomColor: '#cccccc' }}>
                        <View style={{ marginTop: 30 }}>
                            <Image
                                style={{ width: 120, height: 120 }}
                                source={isTrue === '' ? kaka : '' || isTrue === true ? abc : doremonbuon}
                            />
                        </View>
                        <View>
                            <View style={{ borderWidth: 1, borderColor: 'gray', maxWidth: width - 150, minHeight: 60, padding: 10, borderRadius: 15, justifyContent: 'center' }}>
                                <Text>Dấu hiệu nhận biết: ならではの</Text>
                            </View>
                        </View>
                    </View>
                    <View style={{ borderBottomWidth: 1, borderBottomColor: '#cccccc', flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'center', minHeight: 60 }}>
                        {listAns()}
                    </View>

                    {/* <View style={{flex: 1}}> */}
                    <View style={{ flex: 3, justifyContent: 'center', alignItems: 'center' }}>
                        <View style={{ flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'center' }}>
                            {listQues()}
                        </View>
                    </View>

                </View>

                