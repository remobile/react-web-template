'use strict';

const React = require('react');
const ReactEcharts = require('echarts-for-react');

module.exports = React.createClass({
    render () {
        const { option } = this.props;
        return (
            <ReactEcharts option={option} />
        );
    },
});
