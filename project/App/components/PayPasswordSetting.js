'use strict';

const React = require('react');
const ReactNative = require('react-native');
const {
    StyleSheet,
    View,
    Text,
} = ReactNative;

const DigitalKeyboard = require('./DigitalKeyboard');
const ConfirmPayPassword = require('./ConfirmPayPassword');

const list = [1, 2, 3, 4, 5, 6, 7, 8, 9];

module.exports = React.createClass({
    statics: {
        title: '支付密码设置',
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
            Toast('请输入6位的支付密码');
            this.toClear();
        }
    },
    toNext (tmp) {
        app.push({
            component: ConfirmPayPassword,
            passProps:{
                number: tmp,
                toClear: this.toClear,
                verifyCode : this.props.verifyCode,
            },
        });
    },
    toClear () {
        this.setState({
            password: '',
        });
    },
    render () {
        const max = [1, 2, 3, 4, 5, 6];
        const { password } = this.state;
        return (
            <View style={styles.container}>
                <Text style={styles.text}>该六位号码将作为手机支付密码</Text>
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
