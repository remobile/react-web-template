'use strict';

const React = require('react');
const ReactNative = require('react-native');
const {
    StyleSheet,
    Text,
    View,
} = ReactNative;

module.exports = React.createClass({
    render () {
        const { title } = this.props;
        return (
            <View>
                <Text style={styles.title}>{title}</Text>
                <View style={styles.grayLine} />
                <Text style={styles.prompt}>请填入报名信息，工作人员将尽快与您联系</Text>
                <View style={styles.grayLine} />
            </View>

        );
    },
});

const styles = StyleSheet.create({
    title: {
        height: 40,
        lineHeight: 40,
        fontSize: 18,
        color: '#333333',
        backgroundColor: '#FFFFFF',
        width: sr.w,
        textAlign: 'center',
    },
    prompt: {
        fontSize: 13,
        color: '#333333',
        backgroundColor: '#FFFFFF',
        height: 30,
        lineHeight:30,
        paddingLeft: 10,
    },
    grayLine: {
        height: 1,
        backgroundColor: '#f3f3f3',
    },
});
