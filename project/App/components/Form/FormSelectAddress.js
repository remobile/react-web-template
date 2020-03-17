'use strict';

const React = require('react');
const ReactNative = require('react-native');
const {
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    Image,
} = ReactNative;
const SelectRegionAddress = require('../SelectRegionAddress');
const Label = require('./Label');

module.exports = React.createClass({
    getInitialState () {
        return {
            endPoint: this.props.defaultValue || '',
            endPointLastCode: this.props.endPointLastCode || '',
        };
    },
    value () {
        return this.state.endPoint;
    },
    toSelectAddress () {
        const { endPointLastCode } = this.state;
        const { title, type, isNeedSelectAll } = this.props;
        app.push({
            component: SelectRegionAddress,
            title,
            passProps:{
                endPointLastCode,
                type,
                isNeedSelectAll,
                confirmAddress:(endPoint, endPointLastCode) => {
                    this.setState({ endPoint, endPointLastCode });
                },
            },
        });
    },
    render () {
        const { endPoint } = this.state;
        const { line, imageStyle, textStyle, itemStyle, defaultValue, editable = true } = this.props;
        return (
            <View>
                {
                    editable &&
                    <TouchableOpacity
                        activeOpacity={0.6}
                        style={itemStyle || styles.itemSelect}
                        onPress={this.toSelectAddress}>
                        <View style={styles.itemSelectLeft}>
                            <Label {...this.props} />
                            <Text style={textStyle || styles.itemSelectText} numberOfLines={1} ellipsizeMode='tail'>{ endPoint }</Text>
                            {this.props.children}
                        </View>
                        <Image source={app.img.common_go} style={imageStyle || styles.goStyle} />
                    </TouchableOpacity>
                    ||
                    <View style={styles.textInputContainer}>
                        <Label {...this.props} />
                        <Text style={styles.textInput}>{defaultValue}</Text>
                    </View>
                }
                <View style={line || styles.grayLine} />
            </View>

        );
    },
});

const styles = StyleSheet.create({
    itemSelectLeft: {
        flex: 1,
        flexDirection: 'row',
    },
    itemTitle: {
        fontSize: 13,
        color: 'rgb(102,102,102)',
    },
    itemSelect: {
        height: 45,
        width: sr.w,
        backgroundColor: '#FFFFFF',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingLeft: 12,
    },
    goStyle: {
        height: 13,
        width: 8,
        marginRight: 10,
    },
    itemSelectText: {
        flex: 1,
        textAlign: 'right',
        marginTop: 3,
        fontSize: 13,
        color: '#888888',
        paddingRight:5,
    },
    itemMustTitle: {
        fontSize: 13,
        color: 'rgb(200,22,34)',
    },
    grayLine: {
        height: 1,
        backgroundColor: '#f3f3f3',
    },
    textInputContainer: {
        width: sr.w,
        height: 45,
        backgroundColor: '#FFFFFF',
        flexDirection: 'row',
        alignItems: 'center',
        paddingLeft: 10,
    },
    textInput: {
        flex:1,
        fontSize: 13,
        color: '#333333',
        right: 10,
        position: 'absolute',
    },
});
