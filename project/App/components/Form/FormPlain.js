'use strict';

const React = require('react');
const ReactNative = require('react-native');
const {
    StyleSheet,
    Text,
    View,
} = ReactNative;
const Label = require('./Label');

module.exports = React.createClass({
    render () {
        const {
            inputContainer,
            style,
            inputStyle,
            unit,
            line,
            title,
            value,
        } = this.props;
        return (
            <View style={inputContainer}>
                <View style={style || styles.item}>
                    <Label singleLine title={title} required={false} />
                    <Text style={inputStyle || styles.inputStyle}>{value}</Text>
                    { !!unit && <Text style={styles.unit}>{ unit }</Text> }
                </View>
                <View style={line || styles.grayLine} />
            </View>
        );
    },
});

const styles = StyleSheet.create({
    item: {
        width: sr.w,
        height: 45,
        backgroundColor: '#FFFFFF',
        flexDirection: 'row',
        alignItems: 'center',
        paddingLeft: 10,
    },
    inputStyle: {
        flex:1,
        fontSize: 13,
        color: '#333333',
        marginLeft: 10,
        paddingRight: 10,
    },
    unit: {
        fontSize: 13,
        color: '#333333',
        marginRight: 10,
    },
    grayLine: {
        height: 1,
        backgroundColor: '#f3f3f3',
    },
});
