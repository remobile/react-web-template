'use strict';

const React = require('react');
const ReactNative = require('react-native');
const {
    StyleSheet,
    TouchableOpacity,
    View,
} = ReactNative;

const Overlay = require('./ActionSheet/overlay');
const Sheet = require('./ActionSheet/sheet');

module.exports = React.createClass({
    render () {
        const { visible, onCancel } = this.props;
        return (
            <Overlay visible={visible}>
                <View style={styles.actionSheetContainer}>
                    <TouchableOpacity
                        style={{ flex:1 }}
                        onPress={onCancel} />
                    <Sheet visible={visible}>
                        {this.props.children}
                    </Sheet>
                </View>
            </Overlay>
        );
    },
});

const styles = StyleSheet.create({
    actionSheetContainer: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
});
