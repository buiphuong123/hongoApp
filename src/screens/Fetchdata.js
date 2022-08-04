import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import {connect} from 'react-redux';
import {fetchData} from '../redux/actions/index';

const Fetchdata = (props) => {
    const fetchdata = () => {
        props.fetchData(2);
    }
    const takedata = () => {
        console.log(props.error);
        console.log(props.user);
    }
    return (
        <View>
            <TouchableOpacity style={{backgroundColor: 'blue', width: 70, height: 40, alignSelf: 'center'}} onPress={() => fetchdata()}>
                <Text style={{color: '#fff', textAlign: 'center', justifyContent: 'center', }}>Fetch</Text>
            </TouchableOpacity>
            <TouchableOpacity style={{backgroundColor: 'blue', width: 70, height: 40, alignSelf: 'center'}} onPress={() => takedata()}>
                <Text style={{color: '#fff', textAlign: 'center', justifyContent: 'center', }}>take data</Text>
            </TouchableOpacity>
        </View>
    )
}

const mapStateToProps = (state) => {
    return {
        user: state.fetchDataReducer.user,
        error: state.fetchDataReducer.error
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        fetchData: (id) => {
            dispatch(fetchData(id))
        }
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Fetchdata);