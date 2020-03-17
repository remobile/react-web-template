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
                <Text>hello world</Text>
            </View>
        );
    },
});

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#EEEEEE',
        justifyContent: 'center',
        alignItems: 'center',
    },
});
