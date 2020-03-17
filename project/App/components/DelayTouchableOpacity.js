'use strict';

const React = require('react');
const ReactNative = require('react-native');
const {
    TouchableOpacity,
} = ReactNative;

const TimerMixin = require('react-timer-mixin');

module.exports = React.createClass({
    mixins: [TimerMixin],
    componentWillMount () {
        this.enable = true;
        this.onPress = (e) => {
            if (this.enable) {
                this.enable = false;
                this.props.onPress(e);
                this.setTimeout(() => { this.enable = true; }, this.props.delayTime || 200);
            }
        };
    },
    render () {
        return (
            <TouchableOpacity
                {...this.props}
                onPress={this.onPress}
                >
                {this.props.children}
            </TouchableOpacity>
        );
    },
});
