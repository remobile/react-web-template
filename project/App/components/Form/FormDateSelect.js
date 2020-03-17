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
    getInitialState () {
        return {
            value: this.props.value,
        };
    },
    onValueChange (event) {
        const value = this._ref.value;
        event.nativeEvent.newValue = value;
        this.setState({ value });
        this.props.onChange && this.props.onChange(value);
    },
    _captureRef (ref) {
        this._ref = ref;
    },
    value () {
        return this.state.value;
    },
    render () {
        const { noLabel, defaultValue, line, editable = true } = this.props;
        return (
            <View>
                <View style={styles.inputContainer}>
                    { !noLabel && <Label {...this.props} /> }
                    <View style={styles.item}>
                        {
                            editable &&
                            <input style={styles.input} ref={this._captureRef} type='date' defaultValue={defaultValue} onChange={this.onValueChange} />
                            ||
                            <Text style={styles.textInput}>{defaultValue}</Text>
                        }
                    </View>
                </View>
                <View style={line || styles.grayLine} />
            </View>
        );
    },
});

const styles = StyleSheet.create({
    inputContainer: {
        height: 45,
        width: sr.w,
        backgroundColor: '#FFFFFF',
        flexDirection: 'row',
        alignItems: 'center',
        paddingLeft: 12,
    },
    item: {
        flex: 1,
        height: 45,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-end',
        paddingLeft: 20,
        paddingRight: 10,
    },
    grayLine: {
        height: 1,
        backgroundColor: '#f3f3f3',
    },
    input: {
        borderWidth: 0,
    },
    textInput: {
        flex:1,
        fontSize: 13,
        color: '#333333',
        right: 10,
        position: 'absolute',
    },
});
