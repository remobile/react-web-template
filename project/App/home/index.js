'use strict';

const React = require('react');
const ReactNative = require('react-native');
const {
    StyleSheet,
    Image,
    View,
    Text,
    ScrollView,
    TouchableOpacity,
} = ReactNative;

module.exports = React.createClass({
    statics: {
        title: '练习',
    },
    render () {
        return (
            <View style={styles.container}>
                <View style={styles.top1}>
                </View>
                <View style={styles.bottom1}>
                </View>
            </View>
        );
    },
});

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    top1: {
        flex: 1,
        backgroundColor: 'red',
    },
    bottom1: {
        flex: 1,
        backgroundColor: 'blue',
    },
});
