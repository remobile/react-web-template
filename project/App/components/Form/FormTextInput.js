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
        };
    },
    componentWillMount () {
        const { defaultValue } = this.props;
        this.setState({ text: defaultValue || '' });
    },
    value () {
        return this.state.text;
    },
    reset () {
        return this.setState({ text: '' });
    },
    setValue (text) {
        return this.setState({ text });
    },
    onChange (text) {
        const { onChange } = this.props;
        if (onChange) {
            onChange(text);
        }
        this.setState({ text: text.trim() });
    },
    render () {
        const {
            maxLength,
            placeholder,
            style,
            inputStyle,
            line,
            unit,
            addon,
            keyboardType,
            inputContainer,
            secureTextEntry,
            defaultValue,
            editable = true,
        } = this.props;
        const { text } = this.state;
        return (
            <View style={inputContainer}>
                <View style={style || styles.item}>
                    <Label singleLine {...this.props} />
                    {
                        editable ?
                            <TextInput placeholderTextColor='#888888'
                                placeholder={placeholder}
                                underlineColorAndroid='transparent'
                                maxLength={maxLength || 64}
                                keyboardType={keyboardType}
                                value={text}
                                secureTextEntry={secureTextEntry || false}
                                onChangeText={this.onChange}
                                style={inputStyle || styles.textInput} />
                        :
                            <Text style={inputStyle || styles.textInput}>{defaultValue}</Text>
                    }
                    {
                        !!unit && <Text style={styles.unit}>{ unit }</Text>
                    }
                    { addon }
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
    itemTitle: {
        fontSize: 13,
        color: 'rgb(102,102,102)',
    },
    itemMustTitle: {
        fontSize: 13,
        color: 'rgb(200,22,34)',
    },
    textInput: {
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
