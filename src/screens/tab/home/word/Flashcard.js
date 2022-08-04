import React, { Component } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Dimensions, Animated } from 'react-native';
const { width: WIDTH } = Dimensions.get('window');
const { height: HEIGHT } = Dimensions.get('window');
import Icon from 'react-native-vector-icons/MaterialIcons';
import Carousel from "react-native-snap-carousel";
import { connect } from 'react-redux';
import Item from './Item';
import * as actions from '../../../../redux/actions/word.action';
import CustomHeader from '../../../CustomHeader';
import axios from 'axios';
// class Item extends Component {
//     constructor (props) {
//         super(props);
//         // this.checkwordArr = [{jp: "kaka", vn: "abc"}, {jp: "jp", vn: "vn"}];
//     }
//     UNSAFE_componentWillMount() {

//         this.animatedValue = new Animated.Value(0);
//         this.value = 0;
//         this.animatedValue.addListener(({ value }) => {
//             this.value = value;
//         })
//         this.frontInterpolate = this.animatedValue.interpolate({
//             inputRange: [0, 180],
//             outputRange: ['0deg', '180deg']
//         })
//         this.backInterpolate = this.animatedValue.interpolate({
//             inputRange: [0, 180],
//             outputRange: ['180deg', '360deg']
//         })
//     }
//     flipCard = () => {
//         if (this.value >= 90) {
//             Animated.timing(this.animatedValue, {
//                 toValue: 0,
//                 friction: 8,
//                 tension: 10,
//                 useNativeDriver: true,
//             }).start();
//         } else {
//             Animated.timing(this.animatedValue, {
//                 toValue: 180,
//                 friction: 8,
//                 tension: 10,
//                 useNativeDriver: true,
//             }).start();
//         }

//     }
//     actionTest = () => {
//         console.log('test');
//         console.log(user);
//     }

//     setMemerize= (userId, wordId) => {
//         const {data } = this.props;
//         let objIndex = data.findIndex((e => e._id === wordId));
//          if(data[objIndex].memerizes.length === 1) {
//              data[objIndex].memerizes = [];
//          }
//          else if(data[objIndex].memerizes.length === 0) {
//              data[objIndex].memerizes.push({isMemerize: true});
//          }
//         //  setData([...data]);
//         //  dispatch(getListWordSuccess(data));
//         // this.props.setState({data: [...data]});
//         this.props.setWordMemerize(data);

//          axios.post('https://nameless-spire-67072.herokuapp.com/language/createMemWord', {
//              "userId": userId,
//              "wordId": wordId
//          }, {
//              headers: {
//                  "Accept": "application/json",
//                  "Content-Type": "application/json"
//              }
//          })
//              .then((response) => {
//                  console.log('nemWord', response.data.nemWord);
//              })
//              .catch(function(error) {
//                  throw error;
//              })
//      }

//     render() {
//         const frontAnimateStyle = {
//             transform: [
//                 { rotateY: this.frontInterpolate }
//             ]
//         }
//         const backAnimatedStyle = {
//             transform: [
//                 { rotateY: this.backInterpolate }
//             ]
//         }
//         const { item, count, countWord, data } = this.props;

//         return (
//             <View>
//             <TouchableOpacity onPress={() => this.flipCard()} style={styles.cardStyle}>
//                 <Animated.View style={[frontAnimateStyle, styles.flipCard]}>
//                     <View style={[styles.flashcardStyle, styles.flashcardStyletop]}>
//                         <View style={{ flexDirection: 'row', justifyContent: 'space-between', flex: 1 }}>
//                             <TouchableOpacity>
//                                 <Icon style={{ marginTop: 13, marginLeft: 15, color: '#4d88ff' }} name="feedback" size={28} />
//                             </TouchableOpacity>
//                             <TouchableOpacity>
//                                 <Icon style={{ marginTop: 13, marginRight: 15, color: '#4d88ff' }} name="settings" size={28} />
//                             </TouchableOpacity>
//                         </View>
//                         <View />
//                         <View style={{ alignItems: 'center', justifyContent: 'center', flex: 4 }}>
//                             <Text style={styles.flipText1}>
//                                 {item.hira}
//                             </Text>
//                         </View>
//                     </View>
//                     <View style={[styles.flashcardStyle, styles.flashcardStyledowm]}>
//                         {/* <Icon style={{ marginLeft: (WIDTH - 50) / 2, marginTop: -70, alignItems: 'center', color: '#999999' }} name="volume-up" size={45} /> */}
//                         <Text style={{ marginLeft: (WIDTH - 50) / 2, marginBottom: -40 }}>{count+1}/{countWord}</Text>
//                     </View>
//                 </Animated.View>

//                 <Animated.View style={[backAnimatedStyle, styles.flipCard, styles.flipCardBack]}>
//                     <View style={[styles.flashcardStyle, styles.flashcardStyletop]}>
//                         <View style={{ flexDirection: 'row', justifyContent: 'space-between', flex: 1 }}>
//                             <TouchableOpacity>
//                                 <Icon style={{ marginTop: 13, marginLeft: 15, color: '#4d88ff' }} name="feedback" size={28} />
//                             </TouchableOpacity>
//                             <TouchableOpacity>
//                                 <Icon style={{ marginTop: 13, marginRight: 15, color: '#4d88ff' }} name="settings" size={28} />
//                             </TouchableOpacity>
//                         </View>
//                         <View />
//                         <View style={{ alignItems: 'center', justifyContent: 'center', flex: 3 }}>
//                             <Text style={styles.flipText1}>
//                                 {item.vn}
//                             </Text>
//                         </View>
//                     </View>
//                     <View style={[styles.flashcardStyle, styles.flashcardStyledowm, { flex: 2 }]}>
//                         {/* <TouchableOpacity style={{ alignItems: 'center', justifyContent: 'center', marginTop: -30, flex: 1 }}>
//                             <Icon style={{ color: '#999999' }} name="volume-up" size={45} />
//                         </TouchableOpacity> */}
//                         <View style={{ flex: 4, width: WIDTH - 50, alignItems: 'center', justifyContent: 'center' }}>
//                             <Text style={{ fontSize: 30 }}>{item.kanji}</Text>
//                             <Text style={{ fontSize: 20 }}>{item.hira}</Text>
//                             <Text style={{ fontSize: 20 }}>{item.vn}</Text>
//                         </View>
//                     </View>
//                 </Animated.View>

//             </TouchableOpacity>
//             <View style={{flexDirection: 'row', justifyContent: 'space-around', marginTop: 20}}>
//                     <TouchableOpacity style={[styles.keepStyle, { backgroundColor: '#ff0000', marginRight: 110 }]} onPress={() => this.setMemerize(user._id, item._id)}>
//                         <Text>memorize</Text>
//                     </TouchableOpacity>
//                     <TouchableOpacity style={[styles.keepStyle, { backgroundColor: '#5cd65c', }]} onPress={() => this.setMemerize(user._id, item._id)}>
//                         <Text>not memorize</Text>
//                     </TouchableOpacity>
//                 </View>
//             </View>
//         );
//     };
// }

class Flashcard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            listWord: this.props.wordlevel.filter(e => e.lession === this.props.route.params.lession),
            currentCardDetail: this.props.wordlevel[0],
        };
        // this.checkwordArr = [{jp: "kaka", vn: "abc"}, {jp: "jp", vn: "vn"}];
        // this.state = {
        //     data: this.props.checkwordArr
        // }
    }


    setMemerize= (userId, wordId) => {
        const {listWord} = this.state;
        let objIndex = listWord.findIndex((e => e._id === wordId));
        
         if(listWord[objIndex].memerizes.length === 1) {
             listWord[objIndex].memerizes = [];
         }
         else if(listWord[objIndex].memerizes.length === 0) {
             listWord[objIndex].memerizes.push({isMemerize: true});
         }
        //  setData([...data]);
        //  dispatch(getListWordSuccess(data));
        this.setState({listWord: [...this.state.listWord]});
        this.props.setWordMemerize(this.state.listWord);

         axios.post('https://nameless-spire-67072.herokuapp.com/language/createMemWord', {
             "userId": userId,
             "wordId": wordId
         }, {
             headers: {
                 "Accept": "application/json",
                 "Content-Type": "application/json"
             }
         })
             .then((response) => {
                 console.log('nemWord', response.data.nemWord);
             })
             .catch(function(error) {
                 throw error;
             })
     }

    _renderItem = ({ item, index }) => <Item item={item} count={index} countWord={this.state.listWord.length} />
    // constructor(props) {
    //     super(props);
    //     this.state = {
    //       currentCardDetail: {},
    //       listWord: this.props.checkwordArr
    //     };
    //   }  
   
    check = () => {
        console.log('ket qua check la', this.state.currentCardDetail);
    }
    render() {
        const { navigation, lession } = this.props;
        return (
            <View>

                <View>
                    <CustomHeader title="Từ vựng" navigation={navigation} />
                    <Carousel
                        // layout={'tinder'} 
                        // layoutCardOffset={`9`}
                        data={this.state.listWord}
                        renderItem={this._renderItem}
                        onSnapToItem={(index) => {
                            this.setState({ currentCardDetail: this.state.listWord[index] }) // This works
                        }}
                        sliderWidth={Dimensions.get('window').width}
                        itemWidth={Dimensions.get('window').width - 40}
                        enableMomentum={false}
                        lockScrollWhileSnapping
                        useScrollView
                    />
                </View>
                <View style={styles.stylebutton}>
                    <TouchableOpacity style={[styles.keepStyle, { backgroundColor: this.state.currentCardDetail.memerizes.length === 1 ? '#5cd65c' : '#f2f2f2', marginRight: 110 }]} onPress={() =>  this.setMemerize(this.props.user._id, this.state.currentCardDetail._id)}>
                        <Text>memorize</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={[styles.keepStyle, { backgroundColor: this.state.currentCardDetail.memerizes.length === 0? '#ff0000' : '#f2f2f2', }]} onPress={() =>  this.setMemerize(this.props.user._id, this.state.currentCardDetail._id)}>
                        <Text>not memorize</Text>
                    </TouchableOpacity>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    cardStyle: { backgroundColor: '#fff', marginTop: 40 },
    flipCard: { width: WIDTH - 50, height: HEIGHT - 180, flexDirection: 'column', marginTop: 25, alignItems: 'center', justifyContent: 'center', backgroundColor: 'white', backfaceVisibility: 'hidden', },
    flipCardBack: { backgroundColor: '#e6e6e6', position: 'absolute', top: 0 },
    stylebutton: { flexDirection: 'row', justifyContent: 'space-around', flex: 4, marginTop: 10 },
    flipText1: { fontSize: 50, },
    flashcardStyle: { width: WIDTH - 50, },
    flashcardStyletop: { height: HEIGHT / 5, backgroundColor: 'white', flex: 2 },
    flashcardStyledowm: { flex: 1, backgroundColor: '#e6e6e6', flexDirection: 'column', justifyContent: 'space-around' },
    keepStyle: { height: 40, width: 100, alignItems: 'center', justifyContent: 'center', borderRadius: 5 },

})
const mapStateToProps = state => {
    return {
        wordlevel: state.wordReducer.wordlevel,
        user: state.userReducer.user,
    }
};

const mapDispatchToProps = dispatch => {
    return {
        setWordMemerize: (wordlevel) => {
            dispatch(actions.getListWordSuccess(wordlevel));
        },

    }
}
// export default Search;
export default connect(mapStateToProps, mapDispatchToProps)(Flashcard);
