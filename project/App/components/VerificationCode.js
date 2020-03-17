'use strict';

const React = require('react');
const ReactNative = require('react-native');
const {
    StyleSheet,
    View,
    TextInput,
    Text,
    Keyboard,
    TouchableOpacity,
} = ReactNative;

const Button = require('./Button'); ;
const PayPasswordSetting = require('./PayPasswordSetting');
const TimerMixin = require('react-timer-mixin');

module.exports = React.createClass({
    mixins: [TimerMixin],
    statics: {
        title: '获取验证码',
    },
    getInitialState () {
        return {
            readSecond:false,
            time:59,
            verifyCode:'',
            button: false,
        };
    },
    doPress () {
        const param = {
            phone: app.personal.info.phone,
        };
        POST(app.route.ROUTE_REQUEST_SEND_VERIFY_CODE, param, this.requestSendVerifyCodeSuccess, false);
    },
    timer () {
        this.setState({ readSecond:true });
        this.setTimeout(
            () => {
                this.setState({ time:(this.state.time - 1) });
                if (this.state.time <= 0) {
                    return this.setState({ readSecond:false, time:59 });
                }
                this.timer();
            },
            1000
        );
    },
    requestSendVerifyCodeSuccess (data) {
        if (data.success) {
            this.timer();
        } else {
            Toast(data.msg);
        }
    },
    doNext () {
        const { verifyCode } = this.state;
        if (!verifyCode) {
            return Toast('请填写验证码');
        }
        if (!app.utils.checkVerificationCode(verifyCode)) {
            return Toast('请填写正确的验证码');
        }
        app.push({
            component:PayPasswordSetting,
            passProps:{
                verifyCode,
            },
        });
        Keyboard.dismiss();
    },
    render () {
        const { readSecond } = this.state;
        return (
            <View style={styles.container}>
                <View style={styles.ItemBg}>
                    <View style={styles.infoStyle}>
                        <TextInput placeholderTextColor='#aaaaaa'
                            placeholder='请填写验证码'
                            keyboardType='numeric'
                            maxLength={6}
                            underlineColorAndroid='transparent'
                            onChangeText={(text) => this.setState({ verifyCode: text })}
                            style={styles.itemNameText} />
                        <TouchableOpacity
                            disabled={readSecond}
                            onPress={this.doPress}
                            style={styles.btnBind}>
                            { !readSecond ?
                                <View style={styles.btnContainer}>
                                    <Text style={readSecond ? styles.btnBindTextGray : styles.btnBindText}>获取验证码</Text>
                                </View>
                                :
                                <View style={styles.btnContainerGray}>
                                    <Text style={readSecond ? styles.btnBindTextGray : styles.btnBindText}>{this.state.time}s后重新发送</Text>
                                </View>
                            }
                        </TouchableOpacity>
                    </View>
                </View>
                <Button onPress={this.doNext}
                    style={styles.btnNext}
                    textStyle={styles.btnNextText} >
                    下一步
                </Button>
            </View>
        );
    },
});

const styles = StyleSheet.create({
    container:{
        flex: 1,
    },
    ItemBgTop: {
        height: 45,
        marginTop:10,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor:'white',
    },
    ItemBg: {
        height: 45,
        marginTop:1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor:'white',
    },
    infoStyle: {
        width:sr.w,
        flexDirection: 'row',
        alignItems:'center',
        justifyContent: 'space-between',
    },
    icon_add:{
        width:25,
        height:25,
        marginLeft: 8,
    },
    itemNameText: {
        flex:1,
        fontSize: 14,
        color: '#444444',
        marginLeft: 10,
    },

    btnNext:{
        marginTop:50,
        height:45,
        width:300,
        marginLeft:(sr.w - 300) / 2,
        borderRadius:4,
        backgroundColor:'#c81622',
    },
    btnNextText:{
        color:'#ffffff',
        fontSize:16,
        fontWeight:'500',
    },
    btnBind:{
        height:45,
        width:137,
        borderLeftWidth:1,
        borderColor:'#f4f4f4',
        alignItems:'center',
    },
    btnContainer:{
        height:45,
        alignItems:'center',
        justifyContent:'center',
        width:137,
    },
    btnBindText:{
        color:'#FF981A',
        fontSize:14,
        fontWeight:'500',
        textAlign:'center',
        width:sr.w - 254,
    },
    btnContainerGray:{
        height:45,
        width:137,
        alignItems:'center',
        justifyContent:'center',
        backgroundColor:'#fafafa',
    },
    btnBindTextGray:{
        color:'#999999',
        backgroundColor:'#fafafa',
        fontSize:14,
        fontWeight:'500',
        textAlign:'center',
        width:sr.w - 254,
    },
});
