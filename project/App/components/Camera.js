const React = require('react');
const ReactNative = require('react-native');
const {
    StyleSheet,
    View,
    Text,
    Image,
    TouchableOpacity,
} = ReactNative;

module.exports = React.createClass({
    getInitialState () {
        return {
            cameraEnable: navigator.mediaDevices && navigator.mediaDevices.getUserMedia,
        };
    },
    componentDidMount () {
        const { cameraEnable } = this.state;
        if (cameraEnable) {
            navigator.mediaDevices.getUserMedia({ video: true }).then((stream) => {
                this.videoStream = stream;
                this.video.src = window.URL.createObjectURL(stream);
                this.video.play();
            });
        }
    },
    componentWillUnmount () {
        this.stopCamera();
    },
    async takepicture () {
        const canvas = this.canvas;
        canvas.width = this.canvasWidth;
        canvas.height = this.canvasHeight;
        const context = canvas.getContext('2d');
        context.drawImage(this.video, 0, 0, this.canvasWidth, this.canvasHeight);
        const data = canvas.toDataURL('image/png');
        this.stopCamera();
        this.props.onGetPicture && this.props.onGetPicture(data);
    },
    stopCamera () {
        this.videoStream && this.videoStream.getTracks().forEach(track => track.stop());
    },
    onLayout (e) {
        const { height, width } = e.nativeEvent.layout;
        this.canvasHeight = height;
        this.canvasWidth = width;
    },
    render () {
        const { cameraEnable } = this.state;
        return (
            cameraEnable &&
            <View style={styles.container} onLayout={this.onLayout}>
                <video style={styles.video} ref={(ref) => { this.video = ref; }} />
                <TouchableOpacity style={styles.button} onPress={this.takepicture}>
                    <Image
                        resizeMode='stretch'
                        source={app.img.common_camera}
                        style={styles.icon_camera} />
                </TouchableOpacity>
                <canvas style={{ display: 'none' }} ref={(ref) => { this.canvas = ref; }} />
            </View>
            ||
            <View style={styles.container}>
                <Text> 你的设备不支持web相机功能 </Text>
            </View>
        );
    },
});

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    video: {
        width: sr.w,
        height: sr.rs(sr.th),
        backgroundColor: '#000',
    },
    button: {
        position: 'absolute',
        bottom: 10,
        left: sr.w / 2 - 25,
    },
    icon_camera: {
        width: 50,
        height: 50,
    },
});
