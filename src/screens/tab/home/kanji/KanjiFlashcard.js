import React, { Component } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Dimensions, Animated } from 'react-native';
const { width: WIDTH } = Dimensions.get('window');
const { height: HEIGHT } = Dimensions.get('window');
import Icon from 'react-native-vector-icons/MaterialIcons';
import Carousel from "react-native-snap-carousel";
import { connect } from 'react-redux';
import ItemKanji from './ItemKanji';
import * as actions from '../../../../redux/actions/kanji.action';
import CustomHeader from '../../../CustomHeader';
import axios from 'axios';

class KanjiFlashcard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            listkanjilevel: this.props.kanjilevel.filter(e => e.lession === this.props.route.params.lession),
            currentCardDetail: this.props.kanjilevel[0],
        };
    }

    _renderItem = ({ item, index }) => <ItemKanji item={item} count={index} countWord={this.state.listkanjilevel.length} />
    // constructor(props) {
    //     super(props);
    //     this.state = {
    //       currentCardDetail: {},
    //       listWord: this.props.checkwordArr
    //     };
    //   }  
   
    check = () => {
        console.log('ket qua check la', this.state.currentCardDetail);
        console.log('check ', this.state.currentCardDetail.memerizes.length);
        // console.log(this.state.listkanjilevel.filter(e => e.lession === this.props.lession));
    }

    setMemerize = (userId, kanjiId) => {
        console.log(userId, kanjiId);
        const { listkanjilevel } = this.state;
        let objIndex = listkanjilevel.findIndex((e => e._id === kanjiId));
        // console.log(objIndex);
        // console.log(listkanjilevel);
        if (listkanjilevel[objIndex].memerizes.length === 1) {
            listkanjilevel[objIndex].memerizes = [];
        }
        else if (listkanjilevel[objIndex].memerizes.length === 0) {
            listkanjilevel[objIndex].memerizes.push({ isMemerize: true });
        }
        //  setData([...data]);
        //  dispatch(getListWordSuccess(data));
        // this.props.setState({data: [...data]});
        // setData([...data]);
        this.setState({ listkanjilevel: [...this.state.listkanjilevel] });
        this.props.setWordMemerize(this.state.listkanjilevel);

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
    render() {
        const { navigation, route  } = this.props;
        return (
            <View>

                <View>
                    <CustomHeader title="Hán tự" navigation={navigation} />
                    <Carousel
                        // layout={'tinder'} 
                        // layoutCardOffset={`9`}
                        data={this.state.listkanjilevel}
                        renderItem={this._renderItem}
                        onSnapToItem={(index) => {
                            this.setState({ currentCardDetail: this.state.listkanjilevel[index] }) // This works
                        }}
                        sliderWidth={Dimensions.get('window').width}
                        itemWidth={Dimensions.get('window').width - 40}
                        enableMomentum={false}
                        lockScrollWhileSnapping
                        useScrollView
                    />
                </View>
                <View style={styles.stylebutton}>
                    <TouchableOpacity 
                    style={[styles.keepStyle, { backgroundColor: this.state.currentCardDetail.memerizes.length === 1 ? '#5cd65c' : '#f2f2f2', marginRight: 110 }]} 
                    onPress={() => this.setMemerize(this.props.user._id, this.state.currentCardDetail._id)}>
                        <Text>memorize</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={[styles.keepStyle, { backgroundColor:this.state.currentCardDetail.memerizes.length === 0? '#ff0000' : '#f2f2f2' , }]} 
                    onPress={() => this.setMemerize(this.props.user._id, this.state.currentCardDetail._id)}>
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
        kanjilevel: state.kanjiReducer.kanjilevel,
        user: state.userReducer.user,
    }
};

const mapDispatchToProps = dispatch => {
    return {
        setWordMemerize: (kanjilevel) => {
            dispatch(actions.getListKanjiLevel(kanjilevel));
        },
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(KanjiFlashcard);
