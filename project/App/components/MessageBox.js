'use strict';

const React = require('react');
const ReactNative = require('react-native');
const {
    StyleSheet,
    Text,
    View,
    TouchableHighlight,
} = ReactNative;

module.exports = React.createClass({
    getDefaultProps: function () {
        return {
            title: '温馨提示',
            content: '确定要执行操作吗？',
            cancelText: '取消',
            confirmText: '确定',
            width: 312,
        };
    },
    doConfirm () {
        const { onConfirm } = this.props;
        if (!onConfirm || !onConfirm()) {
            app.closeModal();
        }
    },
    doCancel () {
        const { onCancel } = this.props;
        if (onCancel === true || !onCancel || !onCancel()) {
            app.closeModal();
        }
    },
    render () {
        const { title, width, content, onCancel, cancelText, confirmText } = this.props;
        return (
            <View style={[styles.container, { width }]}>
                { !!title && <Text style={styles.title}>{title}</Text> }
                { !!title && <Text style={[styles.redLine, { width: width * 0.8 }]} /> }
                <Text style={styles.content}>
                    {content}
                </Text>
                <Text style={[styles.H_Line, { width }]} />
                <View style={[styles.buttonViewStyle, { width: width - 20 }]}>
                    {!!onCancel &&
                    <TouchableHighlight
                        underlayColor='rgba(0, 0, 0, 0)'
                        onPress={this.doCancel}
                        style={styles.buttonStyleContain}>
                        <Text style={[styles.buttonStyle, { color: 'red' }]}>{cancelText}</Text>
                    </TouchableHighlight>
                        }
                    {!!onCancel &&
                    <Text style={styles.line} />
                        }
                    <TouchableHighlight
                        underlayColor='rgba(0, 0, 0, 0)'
                        onPress={this.doConfirm}
                        style={styles.buttonStyleContain}>
                        <Text style={[styles.buttonStyle, { color: '#0076FF' }]} >{confirmText}</Text>
                    </TouchableHighlight>
                </View>
            </View>
        );
    },
});

const styles = StyleSheet.create({
    container: {
        alignItems:'center',
        justifyContent:'center',
        backgroundColor:'#FFFFFF',
        borderRadius:10,
    },
    buttonViewStyle: {
        flexDirection: 'row',
        height: 50,
    },
    H_Line: {
        marginTop: 10,
        height: 1,
        backgroundColor: '#b4b4b4',
    },
    redLine: {
        marginTop: 10,
        height: 1,
        backgroundColor: '#ff3c30',
    },
    line: {
        width: 1,
        height: 50,
        backgroundColor: '#b4b4b4',
    },
    buttonStyleContain: {
        height: 50,
        flex: 1,
        justifyContent:'center',
        alignItems:'center',
    },
    buttonStyle: {
        fontSize: 15,
        color: '#000000',
    },
    title: {
        color: '#ff3c30',
        fontSize: 16,
        fontWeight: '100',
        textAlign: 'center',
        overflow: 'hidden',
        marginTop:20,
    },
    content: {
        alignSelf:'center',
        color:'#000000',
        margin: 20,
        marginTop: 30,
    },
});
