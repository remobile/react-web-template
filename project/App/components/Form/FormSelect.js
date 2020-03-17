'use strict';

const React = require('react');
const ReactNative = require('react-native');
const {
    StyleSheet,
    View,
    Text,
    Picker,
    Image,
    TouchableOpacity,
} = ReactNative;
const Label = require('./Label');

module.exports = React.createClass({
    getDefaultProps () {
        return {
            pickerData: [ '是', '否' ],
            defaultValue: 0,
        };
    },
    getInitialState () {
        return {
            value: this.props.defaultValue,
        };
    },
    onValueChange (value) {
        value = value * 1;
        this.setState({ value });
        this.props.onChange && this.props.onChange(value);
    },
    value () {
        return this.state.value;
    },
    reset () {
        return this.setState({ value: 0 });
    },
    render () {
        const { value } = this.state;
        const { pickerData, line, imageStyle, noLabel, defaultValue, editable = true } = this.props;
        return (
            <View>
                <View style={styles.inputContainer}>
                    { !noLabel && <Label {...this.props} /> }
                    {
                        editable &&
                        <TouchableOpacity
                            id={'item'}
                            style={styles.item}>
                            <Picker
                                style={styles.picker}
                                selectedValue={value}
                                onValueChange={this.onValueChange}>
                                { pickerData.map((o, k) => <Picker.Item key={k} label={o} value={k} />) }
                            </Picker>
                        </TouchableOpacity>
                    }
                    {
                        editable &&
                        <Image source={app.img.common_go} style={imageStyle || styles.imgGo} resizeMode='contain' />
                    }
                    {
                        !editable &&
                        <Text style={styles.textInput}>{pickerData[defaultValue]}</Text>
                    }
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
    picker: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: '#FFFFFF',
        height: 45,
        borderWidth: 0,
        appearance:'none',
        direction: 'rtl',
    },
    imgGo: {
        justifyContent:'flex-end',
        height: 13,
        width: 8,
        marginRight: 10,
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
    textInput: {
        flex:1,
        fontSize: 13,
        color: '#333333',
        right: 10,
        position: 'absolute',
    },
});
