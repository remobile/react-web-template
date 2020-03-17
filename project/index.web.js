'use strict';
const React = require('react');
const ReactNative = require('react-native');
const App = require('./App/index.js');

// style
const css = `
`;
const head = document.head || document.getElementsByTagName('head')[0];
const style = document.createElement('style');
style.type = 'text/css';
if (style.styleSheet) {
    style.styleSheet.cssText = css;
} else {
    style.appendChild(document.createTextNode(css));
}
head.appendChild(style);

// run
ReactNative.AppRegistry.registerComponent('PDClient_WX', () => App);
ReactNative.AppRegistry.runApplication('PDClient_WX', { rootTag: document.getElementById('app') });
