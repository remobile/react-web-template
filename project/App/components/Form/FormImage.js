'use strict';

const React = require('react');
const ReactNative = require('react-native');
const {
    StyleSheet,
    View,
    Image,
} = ReactNative;

const Button = require('../Button');
const ImagePicker = require('../ImagePicker');
const UPLOAD = require('../../utils/net/Upload');
const Label = require('./Label');

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
                <View style={styles.title}>
                    <Label {...this.props} />
                    <Button onPress={this.selectPicture}
                        style={styles.button} textStyle={styles.buttonText}>
                        上传图片
                    </Button>
                </View>
                <View style={styles.imageContainer}>
                    <View style={styles.imageInnerContainer}>
                        { !!uri && <Image style={styles.image} source={{ uri }} resizeMode='cover' /> }
                    </View>
                </View>
                <ImagePicker onLoadImage={this.onLoadImage} ref={(ref) => { this.imagePicker = ref; }} />
            </View>
        );
    },
});

const styles = StyleSheet.create({
    container: {
        height: 150,
        backgroundColor: '#FFFFFF',
    },
    title: {
        flexDirection: 'row',
        backgroundColor: '#FFFFFF',
        height: 30,
        paddingHorizontal: 10,
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    label: {
        fontSize: 14,
    },
    required: {
        color: 'red',
        marginRight: 10,
    },
    button: {
        height: 28,
        width: 70,
        borderRadius:4,
        marginTop: 4,
        backgroundColor: '#c81622',
    },
    buttonText: {
        fontSize: 12,
        fontWeight: '500',
    },
    imageContainer: {
        padding: 10,
        backgroundColor: '#FFFFFF',
    },
    imageInnerContainer: {
        height: 100,
        width: 351,
        borderColor: '#f3f3f3',
        borderStyle : 'dashed',
        borderWidth: 2,
    },
    image: {
        height: 100,
        width: 351,
    },
});
