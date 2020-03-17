'use strict';

const React = require('react');
const ReactNative = require('react-native');
const {
    StyleSheet,
    View,
    WebView,
    Text,
} = ReactNative;

const Button = require('./Button');

module.exports = React.createClass({
    render () {
        return (
            <View style={styles.overlayContainer}>
                {
                    !!this.props.title &&
                    <View style={[styles.title, { backgroundColor: '#c81622' }]}>
                        <View style={[styles.titleContainer, { marginTop: sr.trueStatusBarHeight }]}>
                            <Text style={styles.titleText}>
                                {this.props.title}
                            </Text>
                        </View>
                    </View>
                }
                <View style={[styles.container, { top: sr.totalNavbarHeight + sr.statusBarHeight }]}>
                    <WebView
                        style={styles.webview}
                        source={{ uri:this.props.webAddress }}
                        scalesPageToFit
                        />
                    <Button
                        onPress={app.closeModal}
                        style={styles.contentButton}
                        textStyle={styles.contentButtonText}>
                        返回
                    </Button>
                </View>
            </View>
        );
    },
});

const styles = StyleSheet.create({
    overlayContainer: {
        position:'absolute',
        top: 0,
        bottom: 0,
        left:0,
        right: 0,
        backgroundColor: 'transparent',
    },
    title: {
        height:sr.totalNavbarHeight,
        width: sr.w,
    },
    titleContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    titleText: {
        fontSize: 18,
        color: 'gray',
        fontWeight: '500',
    },
    container: {
        width:sr.w * 5 / 6,
        height:sr.h * 4 / 5,
        alignItems:'center',
        justifyContent:'center',
        borderRadius:10,
        position: 'absolute',
        left: sr.w * 1 / 12,
    },
    webview: {
        width:sr.w * 5 / 6,
        height:sr.h * 4 / 5 - 50,
    },
    contentButton: {
        width:sr.w * 5 / 6,
        height:50,
        borderRadius:0,
    },
    contentButtonText: {
        color: '#000000',
        fontWeight: '800',
    },
});
