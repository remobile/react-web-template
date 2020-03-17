'use strict';

const React = require('react');
const ReactNative = require('react-native');
const {
    StyleSheet,
    Animated,
    PanResponder,
} = ReactNative;

module.exports = React.createClass({
    getDefaultProps () {
        return {
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
        };
    },
    getInitialState () {
        return {
            opacity: new Animated.Value(0),
        };
    },
    componentWillMount () {
        this._panResponder = PanResponder.create({
            onStartShouldSetPanResponder: (e, gestureState) => true,
            onPanResponderGrant: (e, gestureState) => {
                this.closeModal();
            },
        });
    },
    componentDidMount () {
        Animated.timing(this.state.opacity, {
            toValue: 1,
            duration: 500,
        }
        ).start();
    },
    closeModal (callback) {
        Animated.timing(this.state.opacity, {
            toValue: 0,
            duration: 500,
        }
        ).start(() => {
            app.removeModal(callback);
        });
    },
    render () {
        const { modalTouchHide } = this.props;
        return (
            <Animated.View style={[styles.container, { backgroundColor: this.props.backgroundColor, opacity: this.state.opacity }]} {...(modalTouchHide ? this._panResponder.panHandlers : {})}>
                {this.props.children}
            </Animated.View>
        );
    },
});

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
        alignItems:'center',
        justifyContent: 'center',
    },
});
