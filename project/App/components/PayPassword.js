'use strict';

const React = require('react');
const ReactNative = require('react-native');
const {
    StyleSheet,
    View,
    Text,
} = ReactNative;

const MessageBox = require('./MessageBox');
const DigitalKeyboard = require('./DigitalKeyboard');
const VerificationCode = require('./VerificationCode');

const list = [ 1, 2, 3, 4, 5, 6, 7, 8, 9 ];

module.exports = React.createClass({
    statics: {
        title: '支付密码',
    },
    getInitialState () {
        return {
            password: '',
            type:false,
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
        const { password, type } = this.state;
        const tmp = password.substring(0, 6);
        if (tmp.length == 6) {
            this.setState({
                type : !type,
            });
            this.toPay(tmp);
        } else {
            Toast('支付密码有误');
            this.toClear(tmp);
        }
    },
    toPay (tmp) {
        let { param, routeName } = this.props;
        param['payPassword'] = tmp;
        POST(routeName, param, this.toPaySuccess, true);
    },
    toPaySuccess (data) {
        const { prompt, doCloseActionSheet, refresh } = this.props;
        if (data.success) {
            app.showModal(
                <MessageBox
                    onConfirm={this.doConfirmDelete}
                    content={prompt}
                    title={false}
                    width={sr.s(250)} />
            );
            !!doCloseActionSheet && doCloseActionSheet();
            !!refresh && refresh();
            app.toggleNavigationBar(false);
            app.navigator.popToTop();
            return;
        } else {
            Toast(data.msg);
            !!doCloseActionSheet && doCloseActionSheet();
            app.pop();
        }
    },
    toClear (tmp) {
        this.setState({
            password: '',
            tmp: '',
        });
    },
    componentWillMount () {
        this.toSetPaypassword();
    },
    toSetPaypassword () {
        if (app.personal.info.isSetPaymentPassword == 0) {
            Toast('请先设置支付密码');
            app.push({
                component:VerificationCode,
            });
        }
    },
    render () {
        const max = [1, 2, 3, 4, 5, 6];
        const { password, type } = this.state;
        return (
            <View style={styles.container}>
                <Text style={styles.text}>请输入支付密码</Text>
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
                {
                    !type &&
                    <View>
                        <DigitalKeyboard
                            list={list}
                            passwordItem={this.passwordItem}
                            zero={this.zero} delete={this.delete}
                            confirm={this.confirm}
                            />
                    </View>
                }
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
        borderWidth:1,
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
