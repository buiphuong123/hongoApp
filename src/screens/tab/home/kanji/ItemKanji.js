import React, { Component } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Switch, TouchableWithoutFeedback, Dimensions, Animated, Image } from 'react-native';
const { width: WIDTH } = Dimensions.get('window');
const { height: HEIGHT } = Dimensions.get('window');
import Icon from 'react-native-vector-icons/MaterialIcons';
import Carousel from "react-native-snap-carousel";
import { connect } from 'react-redux';
import * as actions from '../../../../redux/actions/word.action';
import axios from 'axios';
import Modal from 'react-native-modal'; // 2.4.0
import { RadioButton } from 'react-native-paper';
import CheckBox from '@react-native-community/checkbox';
import Icons from 'react-native-vector-icons/Ionicons';
import { RemotewordBeforeFlashcard, RemotemeanBeforeFlashcard, RemotespellBeforeFlashcard, RemotewordAfterFlashcard, RemotemeanAfterFlashcard, RemotespellAfterFlashcard, RemoteimageAfterFlashcard, RemoteexampleFlashcard, RemotemeanexampleFlashcard } from '../../../../redux/actions/word.action';
import { getListKanjiLevel } from '../../../../redux/actions/kanji.action';

class ItemKanji extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: this.props.checkwordArr,
            isVisibleBefore: false,
            isVisibleAfter: false,
            isWord: 'checked',
            isMean: 'unchecked',
            isHira: 'unchecked',
            isExample: false,
            isExampleMean: false,
            isImage: false,

        }
        // this.checkwordArr = [{jp: "kaka", vn: "abc"}, {jp: "jp", vn: "vn"}];
    }
    toggleSwitchExample = (value) => {
        // this.setState({ isExample: value });
        this.props.RemoteexampleFlashcard(value);
    }
    toggleSwitchExampleMean = (value) => {
        // this.setState({ isExampleMean: value });
        this.props.RemotemeanexampleFlashcard(value);
    }
    toggleSwitchImage = (value) => {
        // this.setState({ isImage: value });
        this.props.RemoteimageAfterFlashcard(value);
    }
    toggleSwitchWord = () => {
        if (this.props.wordBeforeFlashcard === 'unchecked') {
            // setIsWord('checked');
            // setIsMean('unchecked');
            // setIsHira('unchecked');
            // this.setState({
            //     ...this.state,
            //     isWord: 'checked',
            //     isMean: 'unchecked',
            //     isHira: 'unchecked',
            // })
            this.props.RemotewordBeforeFlashcard('checked');
            this.props.RemotemeanBeforeFlashcard('unchecked');
            this.props.RemotespellBeforeFlashcard('unchecked');

        }
    }
    toggleSwitchMean = () => {
        if (this.props.meanBeforeFlashcard === 'unchecked') {
            // setIsWord('unchecked');
            // setIsMean('checked');
            // setIsHira('unchecked');
            // this.setState({
            //     ...this.state,
            //     isWord: 'unchecked',
            //     isMean: 'checked',
            //     isHira: 'unchecked',
            // })
            this.props.RemotewordBeforeFlashcard('unchecked');
            this.props.RemotemeanBeforeFlashcard('checked');
            this.props.RemotespellBeforeFlashcard('unchecked');
        }
    }
    toggleSwitchHira = () => {
        if (this.props.spellBeforeFlashcard === 'unchecked') {
            // setIsWord('unchecked');
            // setIsMean('unchecked');
            // setIsHira('checked');
            // this.setState({
            //     ...this.state,
            //     isWord: 'unchecked',
            //     isMean: 'unchecked',
            //     isHira: 'checked',
            // })
            this.props.RemotewordBeforeFlashcard('unchecked');
            this.props.RemotemeanBeforeFlashcard('unchecked');
            this.props.RemotespellBeforeFlashcard('checked');
        }
    }
    UNSAFE_componentWillMount() {

        this.animatedValue = new Animated.Value(0);
        this.value = 0;
        this.animatedValue.addListener(({ value }) => {
            this.value = value;
        })
        this.frontInterpolate = this.animatedValue.interpolate({
            inputRange: [0, 180],
            outputRange: ['0deg', '180deg']
        })
        this.backInterpolate = this.animatedValue.interpolate({
            inputRange: [0, 180],
            outputRange: ['180deg', '360deg']
        })
    }
    flipCard = () => {
        if (this.value >= 90) {
            Animated.timing(this.animatedValue, {
                toValue: 0,
                friction: 8,
                tension: 10,
                useNativeDriver: true,
            }).start();
        } else {
            Animated.timing(this.animatedValue, {
                toValue: 180,
                friction: 8,
                tension: 10,
                useNativeDriver: true,
            }).start();
        }

    }
    actionTest = () => {
        console.log('test');
        console.log(user);
    }

    setMemerize = (userId, kanjiId) => {
        const { data } = this.state;
        let objIndex = data.findIndex((e => e._id === kanjiId));
        if (data[objIndex].memerizes.length === 1) {
            data[objIndex].memerizes = [];
        }
        else if (data[objIndex].memerizes.length === 0) {
            data[objIndex].memerizes.push({ isMemerize: true });
        }
        //  setData([...data]);
        //  dispatch(getListWordSuccess(data));
        // this.props.setState({data: [...data]});
        // setData([...data]);
        this.setState({ data: [...this.state.data] });
        this.props.setWordMemerize(this.state.data);

        axios.post('https://nameless-spire-67072.herokuapp.com/language/createMemKanji', {
            "userId": userId,
            "kanjiId": kanjiId
        }, {
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json"
            }
        })
            .then((response) => {
                console.log('nemWord', response.data.nemWord);
            })
            .catch(function (error) {
                throw error;
            })

    }
    settingFlashcardBefore = () => {
        console.log('flashcard before');
        this.setState({ isVisibleBefore: true });
    }

    render() {
        const frontAnimateStyle = {
            transform: [
                { rotateY: this.frontInterpolate }
            ]
        }
        const backAnimatedStyle = {
            transform: [
                { rotateY: this.backInterpolate }
            ]
        }
        const { item, count, countWord, data } = this.props;
        // const {wordBeforeFlashcard, meanBeforeFlashcard, spellBeforeFlashcard, wordAfterFlashcard, meanAfterFlashcard, spellAfterFlashcard, imageFlashcard,exampleFlashcard, meanExampleFlashcard} = this.props;
        // const {RemotewordBeforeFlashcard, RemotemeanBeforeFlashcard, RemotespellBeforeFlashcard, RemotewordAfterFlashcard, RemotemeanAfterFlashcard, RemotespellAfterFlashcard, RemoteimageAfterFlashcard, RemoteexampleFlashcard, RemotemeanexampleFlashcard} = this.props;
        return (
            <View style={{}}>
                <TouchableOpacity onPress={() => this.flipCard()} style={styles.cardStyle}>
                    {/* mat truoc */}
                    <Animated.View style={[frontAnimateStyle, styles.flipCard]}>
                        <View style={[styles.flashcardStyle, styles.flashcardStyletop]}>
                            <View style={{ flexDirection: 'row', justifyContent: 'flex-end', flex: 1 }}>
                                {/* <TouchableOpacity>
                                    <Icon style={styles.flashStyle} name="feedback" size={28} color={'#4d88ff'} />
                                </TouchableOpacity> */}

                                <TouchableOpacity onPress={() => this.setState({ isVisibleBefore: true })}>
                                    <Icon name={'settings'} size={28} color={'#4d88ff'} style={styles.settingStyle} />
                                </TouchableOpacity>
                            </View>
                            <View />
                            <View style={{ alignItems: 'center', justifyContent: 'center', flex: 4 }}>
                                {/* <Text style={styles.flipText}>{item.hira}</Text> */}
                                {this.props.wordBeforeFlashcard === 'checked' ?
                                    <Text style={styles.flipText}>{item.kanji}</Text>
                                    : null

                                }

                                {
                                    this.props.meanBeforeFlashcard === 'checked' ?
                                        <Text style={styles.flipText}>{item.mean}</Text>
                                        :
                                        null
                                }
                                {
                                    this.props.spellBeforeFlashcard === 'checked' ? <View>
                                        <View style={{ flexDirection: 'row' }}>
                                            <Text style={{ fontSize: 18 }}>???: </Text>
                                            <Text style={{fontSize: 18}}>{item.kanji_kun}</Text>

                                        </View>
                                        <View style={{ flexDirection: 'row' }}>
                                            <Text style={{fontSize: 18}}>???:</Text>
                                            <Text style={{ fontSize: 18 }}>{item.kanji_on}</Text>

                                        </View>
                                    </View>
                                        : null
                                }

                                {/* this.props.meanBeforeFlashcard === 'checked' ?
                                                    <Text style={styles.flipText}>{item.vn}</Text>
                                                    :
                                                    this.props.spellBeforeFlashcard === 'checked' ?
                                                        item.hira !== undefined ?
                                                            <Text style={styles.flipText}>{item.hira}</Text>
                                                            :
                                                            item.kata !== undefined ?
                                                                <Text style={styles.flipText}>{item.kata}</Text>
                                                                : null
                                                        : null */}
                            </View>
                        </View>

                        <View style={[styles.flashcardStyle, { alignItems: 'center', justifyContent: 'center' }]}>
                            {/* <Icon style={{ marginLeft: (WIDTH - 50) / 2, marginTop: -70, alignItems: 'center', color: '#999999' }} name="volume-up" size={45} /> */}
                            <Text style={{ alignContent: 'center', alignItems: 'center', justifyContent: 'center', marginBottom: 10 }}>{count + 1}/{countWord}</Text>
                        </View>
                    </Animated.View>

                    <Animated.View style={[backAnimatedStyle, styles.flipCard, styles.flipCardBack]}>
                        <View style={[styles.flashcardStyle, styles.flashcardStyletop]}>
                            <View style={{  flex: 1 }}>
                                {/* <TouchableOpacity>
                                    <Icon style={styles.flashStyle} name="feedback" color={'#4d88ff'} size={28} />
                                </TouchableOpacity> */}
                                <TouchableOpacity style={{justifyContent: 'flex-end', flexDirection: 'row'}} onPress={() => this.setState({ isVisibleAfter: true })}>
                                    <Icon style={styles.settingStyle} name="settings" color={'#4d88ff'} size={28} />
                                </TouchableOpacity>
                                <View style={{justifyContent: 'center', alignItems: 'center',}}>
                                
                            </View>
                            </View>
                            {/* <View /> */}
                            
                            <View style={{ alignItems: 'center', justifyContent: 'center', flex: 2 }}>
                                <Text style={styles.flipText1}>
                                    {item.mean}
                                </Text>
                            </View>
                        </View>
                        {/* <View style={{ backgroundColor: 'red' }}> */}
                        <View style={[styles.flashcardStyle, styles.flashcardStyledowm, { flex: 3, }]}>
                            {/* <TouchableOpacity style={{ alignItems: 'center', justifyContent: 'center', marginTop: -30, flex: 1 }}>
                            <Icon style={{ color: '#999999' }} name="volume-up" size={45} />
                        </TouchableOpacity> */}
                            <View style={{ flex: 4, width: WIDTH - 50, alignItems: 'center', justifyContent: 'center', }}>
                                {/* <Text style={{ fontSize: 30, color: '#000099' }}>{item.kanji}</Text> */}
                                {
                                    this.props.wordAfterFlashcard === true ?
                                        <Text style={{ fontSize: 30, color: '#000099' }}>{item.kanji}</Text>

                                        : null

                                }

                                {
                                    this.props.spellAfterFlashcard === true ?
                                        <View>
                                            <View style={{ flexDirection: 'row' }}>
                                                <Text style={{ fontWeight: 'bold' }}>???: </Text>
                                                <Text style={{ marginLeft: 10 }}>{item.kanji_kun}</Text>

                                            </View>
                                            <View style={{ flexDirection: 'row' }}>
                                                <Text style={{}}>???:</Text>
                                                <Text style={{ marginLeft: 10 }}>{item.kanji_on}</Text>

                                            </View>
                                        </View>
                                        : null
                                }

                                {
                                    this.props.meanAfterFlashcard === true ?
                                        <Text style={{ fontSize: 30, color: '#000099' }}>{item.mean}</Text>
                                        : null
                                }


                                {/* {item.hira !== undefined ? <Text style={{ fontSize: 20, fontStyle: "italic", marginTop: 10 }}>{item.hira}</Text> : null}
                                {item.kata !== undefined ? <Text style={{ fontSize: 20, fontStyle: "italic", marginTop: 10 }}>{item.kata}</Text> : null}
                                {item.amhan !== undefined ? <Text style={{ fontSize: 20, fontStyle: "italic", marginTop: 10 }}>[{item.amhan}]</Text> : null}
                                {item.vn !== undefined ? <Text style={{ fontSize: 20, marginTop: 10, color: '#000099' }}>{item.vn}</Text> : null} */}
                            </View>
                        </View>
                        <View style={{ alignItems: 'center', justifyContent: 'center', padding: 20 }}>
                            <Image
                                style={{ height: 100, width: 100 }}
                                source={{
                                    uri: item.image,
                                }}
                            />
                            <Text>{item.explain}</Text>


                        </View>
                        <View style={[styles.flashcardStyle, styles.flashcardStyledowm]}>
                            {/* <Icon style={{ marginLeft: (WIDTH - 50) / 2, marginTop: -70, alignItems: 'center', color: '#999999' }} name="volume-up" size={45} /> */}
                            <Text style={{ marginBottom: 20 }}>{count + 1}/{countWord}</Text>
                        </View>
                        {/* </View> */}
                    </Animated.View>

                </TouchableOpacity>
                {/* <View style={{ flexDirection: 'row', justifyContent: 'space-around', marginTop: 20 }}>
                    <TouchableOpacity style={[styles.keepStyle, { backgroundColor: '#ff0000', marginRight: 110 }]} onPress={() => this.setMemerize(this.props.user._id, item._id)}>
                        <Text>memorize</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={[styles.keepStyle, { backgroundColor: '#5cd65c', }]} onPress={() => this.setMemerize(this.props.user._id, item._id)}>
                        <Text>not memorize</Text>
                    </TouchableOpacity>
                </View> */}


                <Modal
                    isVisible={this.state.isVisibleBefore}
                    swipeDirection="down"
                    style={{ justifyContent: 'flex-end', margin: 0 }}
                    onRequestClose={() => this.setState({ isVisibleBefore: false })}

                >
                    <TouchableWithoutFeedback onPress={() => this.setState({ isVisibleBefore: false })}>
                        <View style={{ backgroundColor: '#fff', height: 100 }}>
                            <View style={{ flexDirection: 'row', justifyContent: 'space-around', marginTop: 10, paddingBottom: 50, borderBottomWidth: 1, borderBottomColor: '#cccccc', }}>
                                <View style={[styles.checkboxContainer, { borderRightWidth: 1, paddingRight: 30, paddingLeft: 30, borderRightColor: '#cccccc' }]}>
                                    <RadioButton
                                        status={this.props.wordBeforeFlashcard}
                                        onPress={() => this.toggleSwitchWord()}
                                    />
                                    <Text>Nh???p t???</Text>
                                </View>

                                <View style={[styles.checkboxContainer, { borderRightWidth: 1, paddingRight: 30, paddingLeft: 30, borderRightColor: '#cccccc' }]}>
                                    <RadioButton
                                        status={this.props.meanBeforeFlashcard}
                                        onPress={() => this.toggleSwitchMean()}
                                    />
                                    <Text>Nh???p ngh??a</Text>
                                </View>

                                <View style={[styles.checkboxContainer, { paddingRight: 30, paddingLeft: 30, }]}>
                                    <RadioButton
                                        status={this.props.spellBeforeFlashcard}
                                        onPress={() => this.toggleSwitchHira()}
                                    />
                                    <Text>Phi??n ??m</Text>
                                </View>
                                {/* <TouchableOpacity onPress={() => this.setState({isVisibleBefore: false })}>
                                <Text>Close</Text>
                            </TouchableOpacity> */}
                            </View>
                        </View>
                    </TouchableWithoutFeedback>
                </Modal>

                <View>
                    <Modal
                        isVisible={this.state.isVisibleAfter}
                        swipeDirection="down"
                        style={{ justifyContent: 'flex-end', margin: 0 }}
                        onRequestClose={() => this.setState({ ...this.state, isVisibleAfter: false })}

                    >
                        <TouchableWithoutFeedback onPress={() => this.setState({ ...this.state, isVisibleAfter: false })}>
                            <View style={{ backgroundColor: '#fff', height: 100 }}>
                                <View style={{ flexDirection: 'row', justifyContent: 'space-around', borderBottomWidth: 1, borderBottomColor: '#cccccc', borderTopWidth: 1, borderTopColor: '#cccccc' }}>
                                    <View style={[styles.checkboxContainer, { borderRightWidth: 1, borderRightColor: '#cccccc', padding: 10, width: WIDTH / 3 }]}>
                                        <CheckBox
                                            style={styles.checkbox}
                                            value={this.props.wordAfterFlashcard}
                                            onValueChange={() => this.props.RemotewordAfterFlashcard(!this.props.wordAfterFlashcard)}
                                        />
                                        {/* <AppText i18nKey={"word"} style={styles.label} /> */}
                                        <Text style={styles.label}>Nh???p t???</Text>
                                    </View>

                                    <View style={[styles.checkboxContainer, { borderRightWidth: 1, borderRightColor: '#cccccc', padding: 10, width: WIDTH / 3 }]}>
                                        <CheckBox
                                            style={styles.checkbox}
                                            value={this.props.meanAfterFlashcard}
                                            onValueChange={() => this.props.RemotemeanAfterFlashcard(!this.props.meanAfterFlashcard)}
                                        />
                                        {/* <AppText i18nKey={"word"} style={styles.label} /> */}
                                        <Text style={styles.label}>Nh???p ngh??a</Text>
                                    </View>

                                    <View style={[styles.checkboxContainer, { padding: 10, width: WIDTH / 3 }]}>
                                        <CheckBox
                                            style={styles.checkbox}
                                            value={this.props.spellAfterFlashcard}
                                            onValueChange={() => this.props.RemotespellAfterFlashcard(!this.props.spellAfterFlashcard)}
                                        />
                                        {/* <AppText i18nKey={"word"} style={styles.label} /> */}
                                        <Text style={styles.label}>Phi??n ??m</Text>
                                    </View>
                                </View>
                                <View>
                                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', borderBottomWidth: 1, borderBottomColor: '#cccccc' }}>
                                        <View style={{ padding: 20 }}>
                                            <Text>Hi???n th??? v?? d???</Text>
                                        </View>
                                        <Switch
                                            trackColor={{ false: "#767577", true: "#81b0ff" }}
                                            thumbColor={this.state.isExample ? "blue" : "white"}
                                            ios_backgroundColor="#3e3e3e"
                                            onValueChange={this.toggleSwitchExample}
                                            value={this.props.exampleFlashcard}
                                        />
                                    </View>

                                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', borderBottomWidth: 1, borderBottomColor: '#cccccc' }}>
                                        <View style={{ padding: 20 }}>
                                            <Text>Hi???n th??? ngh??a v?? d???</Text>
                                        </View>
                                        <Switch
                                            trackColor={{ false: "#767577", true: "#81b0ff" }}
                                            thumbColor={this.state.isExampleMean ? "blue" : "white"}
                                            ios_backgroundColor="#3e3e3e"
                                            onValueChange={this.toggleSwitchExampleMean}
                                            value={this.props.meanExampleFlashcard}
                                        />
                                    </View>

                                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', }}>
                                        <View style={{ padding: 20 }}>
                                            <Text>Hi???n th??? ???nh</Text>
                                        </View>
                                        <Switch
                                            trackColor={{ false: "#767577", true: "#81b0ff" }}
                                            thumbColor={this.state.isImage ? "blue" : "white"}
                                            ios_backgroundColor="#3e3e3e"
                                            onValueChange={this.toggleSwitchImage}
                                            value={this.props.imageFlashcard}
                                        />
                                    </View>
                                </View>
                            </View>
                        </TouchableWithoutFeedback>
                    </Modal>
                </View>

            </View>
        );
    };
}

const styles = StyleSheet.create({
    cardStyle: { backgroundColor: '#fff', },
    flipCard: { borderWidth: 1, borderColor: '#cccccc', borderRadius: 3, height: HEIGHT - 150, flexDirection: 'column', marginTop: 25, alignItems: 'center', justifyContent: 'center', backgroundColor: 'white', backfaceVisibility: 'hidden', },
    flipCardBack: { position: 'absolute', top: 10, backgroundColor: '#f2f2f2' },
    stylebutton: { flexDirection: 'row', justifyContent: 'space-around', flex: 4, marginTop: 20 },
    flipText1: { fontSize: 24, color: '#000099' },
    flipText: { fontSize: 50, fontWeight: 'bold', color: '#000099' },
    // flashcardStyle: { width: WIDTH - 50, marginTop: -20},
    flashcardStyle: { width: WIDTH - 50, },
    flashcardStyletop: { flex: 2, backgroundColor: 'white', },
    flashcardStyledowm: { flexDirection: 'column', justifyContent: 'center', alignItems: 'center', },
    keepStyle: { height: 40, width: 100, alignItems: 'center', justifyContent: 'center', borderRadius: 5 },
    modalContent: {
        backgroundColor: 'white',
        borderRadius: 4,
        borderColor: 'rgba(0, 0, 0, 0.1)',
        height: 300
    },
    checkboxContainer: {
        flexDirection: "column",
        paddingLeft: 20,
        paddingRight: 20,
        alignItems: 'center',
        justifyContent: 'center',
        paddingTop: 5,
        paddingTop: 20
        // borderBottomWidth: 1 
    },
    settingStyle: {
        marginTop: 13, marginRight: 15
    },
    flashStyle: {
        marginTop: 13, marginLeft: 15
    }
})

const mapStateToProps = state => {
    return {
        kanjilevel: state.kanjiReducer.kanjilevel,
        user: state.userReducer.user,
        wordBeforeFlashcard: state.wordReducer.wordBeforeFlashcard,
        meanBeforeFlashcard: state.wordReducer.meanBeforeFlashcard,
        spellBeforeFlashcard: state.wordReducer.spellBeforeFlashcard,// phien ??m
        wordAfterFlashcard: state.wordReducer.wordAfterFlashcard,
        meanAfterFlashcard: state.wordReducer.meanAfterFlashcard,
        spellAfterFlashcard: state.wordReducer.spellAfterFlashcard,
        imageFlashcard: state.wordReducer.imageFlashcard,
        exampleFlashcard: state.wordReducer.exampleFlashcard,
        meanExampleFlashcard: state.wordReducer.meanExampleFlashcard,
    }
};

const mapDispatchToProps = dispatch => {
    return {
        setWordMemerize: (kanjilevel) => {
            dispatch(actions.getListKanjiLevel(kanjilevel));
        },
        RemotewordBeforeFlashcard: (wordBeforeFlashcard) => {
            dispatch(RemotewordBeforeFlashcard(wordBeforeFlashcard));
        },
        RemotemeanBeforeFlashcard: (meanBeforeFlashcard) => {
            dispatch(RemotemeanBeforeFlashcard(meanBeforeFlashcard));
        },
        RemotespellBeforeFlashcard: (spellBeforeFlashcard) => {
            dispatch(RemotespellBeforeFlashcard(spellBeforeFlashcard));
        },
        RemotewordAfterFlashcard: (wordAfterFlashcard) => {
            dispatch(RemotewordAfterFlashcard(wordAfterFlashcard));
        },
        RemotemeanAfterFlashcard: (meanAfterFlashcard) => {
            dispatch(RemotemeanAfterFlashcard(meanAfterFlashcard));
        },
        RemotespellAfterFlashcard: (spellAfterFlashcard) => {
            dispatch(RemotespellAfterFlashcard(spellAfterFlashcard));
        },
        RemoteimageAfterFlashcard: (imageFlashcard) => {
            dispatch(RemoteimageAfterFlashcard(imageFlashcard));
        },
        RemoteexampleFlashcard: (exampleFlashcard) => {
            dispatch(RemoteexampleFlashcard(exampleFlashcard));
        },
        RemotemeanexampleFlashcard: (meanExampleFlashcard) => {
            dispatch(RemotemeanexampleFlashcard(meanExampleFlashcard));
        }

    }
}


// export default Search;
export default connect(mapStateToProps, mapDispatchToProps)(ItemKanji);
