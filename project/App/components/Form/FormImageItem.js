'use strict';

const React = require('react');
const ReactNative = require('react-native');
const {
    StyleSheet,
    View,
    Image,
    TouchableOpacity,
    Text,
} = ReactNative;

const ImagePicker = require('../ImagePicker');
const UPLOAD = require('../../utils/net/Upload');

module.exports = React.createClass({
    getInitialState () {
        return {
            uri: this.props.photo || '',
        };
    },
    value () {
        return this.state.uri;
    },
    reset () {
        return this.setState({ uri: '' });
    },
    selectPicture () {
        this.imagePicker.selectPicture();
    },
    onLoadImage (image) {
        UPLOAD(image.uri, app.route.ROUTE_UPDATE_FILE, {}, (progress) => console.log(progress), this.uploadSuccess, this.uploadError);
    },
    uploadSuccess (data) {
        if (data.success) {
            this.setState({ uri: data.context.url });
        } else {
            Toast('上传图片失败');
        }
    },
    uploadError () {
        Toast('上传图片失败');
    },
    render () {
        const { uri } = this.state;
        return (
            <View style={styles.container}>
                <TouchableOpacity onPress={this.selectPicture}>
                    <View style={styles.imageInnerContainer}>
                        <View style={styles.addWarpper} onClick={this.selectImage}>
                            {!uri && <Text style={styles.iconAdd}>+</Text>}
                            { !!uri && <Image style={styles.image} source={{ uri }} resizeMode='cover' /> }
                        </View>
                    </View>
                </TouchableOpacity>
                <ImagePicker onLoadImage={this.onLoadImage} ref={(ref) => { this.imagePicker = ref; }} />
            </View>
        );
    },
});

const styles = StyleSheet.create({
    container: {
        height: 120,
        width: 120,
        marginLeft: 10,
    },
    imageInnerContainer: {
        borderColor: '#f3f3f3',
        borderStyle : 'dashed',
        borderWidth: 2,
    },
    image: {
        height: 120,
        width: 120,
    },
    addWarpper: {
        height: 120,
        width: 120,
        justifyContent: 'center',
    },
    iconAdd: {
        fontSize: 35,
        textAlign: 'center',
        color: '#888',
    },
});
