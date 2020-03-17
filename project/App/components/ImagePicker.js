'use strict';

const React = require('react');
const ReactNative = require('react-native');
const Camera = require('./Camera');

module.exports = React.createClass({
    selectPicture () {
        this.input.click();
    },
    takePicture () {
        app.showModal(
            <Camera onGetPicture={this.onGetPicture} />
        );
    },
    onChange (e) {
        e.preventDefault();
        const file = e.target.files[0];
        if (file) {
            const reader = new window.FileReader();
            reader.onload = ({ target }) => {
                ReactNative.Image.getSize(target.result, (width, height) => {
                    this.props.onLoadImage({
                        uri: target.result,
                        width,
                        height,
                    });
                });
            };
            reader.readAsDataURL(file);
        } else {
            Toast('取消了选择');
        }
    },
    onGetPicture (image) {
        ReactNative.Image.getSize(image, (width, height) => {
            this.props.onLoadImage({
                uri: image,
                width,
                height,
            });
        });
        app.closeModal();
    },
    render () {
        return (
            <input ref={(ref) => { this.input = ref; }} style={{ display: 'none' }} type='file' onChange={this.onChange} accept='image/jpg,image/jpeg,image/png' />
        );
    },
});
