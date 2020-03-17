'use strict';

const React = require('react');
const ReactNative = require('react-native');
const {
    StyleSheet,
    Text,
    View,
    TextInput,
} = ReactNative;
const Label = require('./Label');

module.exports = React.createClass({
    getInitialState () {
        return {
            text: '',
            textLength: 0,
        };
    },
    value () {
        return this.state.text;
    },
    reset () {
        return this.setState({ text: '', textLength: 0 });
    },
    setText (text) {
        this.setState({ text: text.trim(), textLength: text.trim().length });
    },
    render () {
        const {
            maxLength,
            placeholder,
            itemStyle,
            inputStyle,
            numberStyle,
            line,
        } = this.props;
        const { textLength, text } = this.state;
        return (
            <View style={itemStyle}>
                <View style={styles.message}>
                    <Label {...this.props} />
                    <Text style={numberStyle || styles.itemNumber}>
                        {textLength}/{maxLength}
                    </Text>
                </View>
                <View style={styles.itemInputBackground}>
                    <TextInput placeholderTextColor='#aaaaaa'
                        placeholder={placeholder}
                        underlineColorAndroid='transparent'
                        maxLength={maxLength}
                        multiline
                        onChangeText={this.setText}
                        value={text}
                        style={inputStyle || styles.itemText} />
                </View>
                <View style={line || styles.grayLine} />
            </View>

        );
    },
});

const styles = StyleSheet.create({
    message: {
        flexDirection: 'row',
        backgroundColor: '#FFFFFF',
        height: 30,
        paddingHorizontal: 10,
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    itemNumber: {
        fontSize: 13,
        color: 'rgb(51,51,51)',
    },
    itemInputBackground: {
        padding: 10,
        backgroundColor: '#FFFFFF',
    },
    itemText: {
        height: 100,
        backgroundColor: '#FFFFFF',
        textAlignVertical: 'top',
        fontSize: 13,
        color: '#333333',
        borderColor: '#f3f3f3',
        borderWidth: 2,
        paddingLeft: 10,
        paddingTop: 5,
    },
    grayLine: {
        height: 1,
        backgroundColor: '#f3f3f3',
    },
});
