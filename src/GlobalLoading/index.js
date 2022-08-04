import React from 'react';
import { Component } from 'react';
import { connect } from 'react-redux';
import {View, StyleSheet, ActivityIndicator} from 'react-native';

class GlobalLoading extends Component {
    render() {
        const { showLoading } = this.props;
        let xhtml = null;
        if (showLoading) {
            xhtml = (
                <View style={styles.container}>
                    <ActivityIndicator size={"large"} color={"blue"} />
                </View>
            );
        }
        return xhtml;
    }
}

// GlobalLoading.propTypes = {
//     showLoading: PropTypes.bool,
// };

const mapStateToProps = state => {
    return {
      showLoading: state.uiReducer.showLoading,
    };
};
export default connect(mapStateToProps, null)(GlobalLoading);
const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    }
})