'use strict';

const React = require('react');
const ReactNative = require('react-native');
const {
    StyleSheet,
    View,
} = ReactNative;

module.exports = React.createClass({
    render () {
        const { title, titleStyle, required = true, labelStyle } = this.props;
        return (
            <View style={[styles.item, labelStyle]}>
                {
                    required && <View style={styles.itemMustTitle}>*</View>
                }
                <View style={titleStyle || styles.itemTitle}>{title}:</View>
            </View>

        );
    },
});

const styles = StyleSheet.create({
    item: {
        fontSize: 13,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    itemTitle: {
        marginLeft: 4,
        color: 'rgb(102,102,102)',
    },
    itemMustTitle: {
        color: 'rgb(200,22,34)',
        marginTop: 5,
    },
});
