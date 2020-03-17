'use strict';

const React = require('react');
const ReactNative = require('react-native');
const {
    StyleSheet,
    View,
    Text,
} = ReactNative;

const DigitalKeyboard = require('./DigitalKeyboard');

const list = [1, 2, 3, 4, 5, 6, 7, 8, 9];

module.exports = React.createClass({
    statics: {
        title: '确认支付密码',
        leftButton: { handler: () => { app.scene.goBack && app.scene.goBack(); } },
    },
    goBack () {
        this.props.toClear();
        app.pop();
    },
    getInitialState () {
        return {
            password: '',
        };
    },
    passwordItem (item) {
        const { password } = this.state;
        this.setState({ password: password + item });
    },
    zero () {
        const { password } = this.state;
        this.setState({ password: password + 0 });
    },
    delete () {
        const { password } = this.state;
        this.setState({
            password: _.dropRight(password).join(''),
        });
    },
    confirm () {
        const { password } = this.state;
        const tmp = password.substring(0, 6);
        if (tmp.length == 6) {
            this.toNext(tmp);
        } else {
            Toast('支付密码有误');
            this.toClear();
        }
    },
    toClear () {
        this.setState({
            password: '',
        });
    },
    toNext (tmp) {
        const { number, verifyCode } = this.props;
        if (number == tmp) {
            const param = {
                userId:app.personal.info.userId,
                verifyCode,
                phone:app.personal.info.phone,
                password : tmp,
            };
            POST(app.route.ROUTE_SET_PAYMENT_PASSWORD, param, this.modifySuccess, true);
        } else {
            Toast('两次输入密码不一致，请重试');
            this.goBack();
        }
    },
    modifySuccess (data) {
        if (data.success) {
            Toast('修改成功');
            const info = app.personal.info;
            info.isSetPaymentPassword = 1;
            app.personal.set(info);
            app.pop(3);
        } else {
            Toast(data.msg);
            app.pop(2);
        }
    },
    render () {
        const max = [1, 2, 3, 4, 5, 6];
        const { password } = this.state;
        return (
            <View style={styles.container}>
                <Text style={styles.text}>再次输入密码以作确认</Text>
                <View style={styles.password}>
                    {
                        max.map((item, i) => (
                            <View style={i == 0 ? styles.itemStart : styles.item} key={i}>
                                { password.length >= (i + 1) ?
                                    <View style={styles.point} />
                                    :
                                    <View style={styles.noPoint} />
                                }
                            </View>
                        ))
                    }
                </View>
                <View style={styles.digitalKeyboard} />
                <View>
                    <DigitalKeyboard list={list}
                        passwordItem={this.passwordItem}
                        zero={this.zero}
                        delete={this.delete}
                        confirm={this.confirm} />
                </View>
            </View>
        );
    },
});
const styles = StyleSheet.create({
    container:{
        flex: 1,
        backgroundColor:'#f4f4f4',
    },

    text:{
        fontSize:14,
        textAlign:'center',
        color:'#333333',
        marginTop:30,
    },
    password:{
        height:40,
        width:330,
        backgroundColor:'#ffffff',
        flexDirection:'row',
        marginTop:15,
        marginLeft:(sr.w - 330) / 2,
        borderRightWidth:1,
        borderBottomWidth:1,
        borderTopWidth:1,
        borderColor:'#EDEDED',
        borderRadius:4,
    },
    itemStart:{
        height:40,
        width:55,
        borderColor:'#EDEDED',
        justifyContent:'center',
        alignItems:'center',
    },
    item:{
        height:40,
        width:55,
        borderLeftWidth:1,
        borderColor:'#EDEDED',
        justifyContent:'center',
        alignItems:'center',
    },
    point:{
        height:10,
        width:10,
        borderRadius:5,
        backgroundColor:'#000000',
    },
    noPoint:{
        height:10,
        width:10,
        borderRadius:5,
        backgroundColor:'#FFFFFF',
    },
    digitalKeyboard:{
        flex:1,
    },
});
