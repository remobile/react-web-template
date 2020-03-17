'use strict';

const React = require('react');
const ReactNative = require('react-native');
const {
    StyleSheet,
    View,
    Text,
    Image,
    TouchableOpacity,
} = ReactNative;

const Button = require('./Button');
const { N } = require('../utils/common');

module.exports = React.createClass({
    statics: {
        title: '支付信息',
        rightButton: { title: '关闭', handler: () => { app.scene.toClose && app.scene.toClose(); } },
    },
    toClose () {
        app.pop();
    },
    render () {
        const { data, type, money, orderCount, isMoving, modalStyle } = this.props;
        return (
            <View style={modalStyle || styles.container}>
                <View style={styles.containerTop}>
                    <Text style={styles.textTop}>支付信息</Text>
                    <TouchableOpacity onPress={this.props.doClose}>
                        <Image
                            resizeMode='stretch'
                            source={app.img.common_close}
                            style={styles.closeStyle} />
                    </TouchableOpacity>
                </View>
                <View style={styles.containerItem}>
                    <Text style={styles.textLeft}>订单信息</Text>
                    <Text style={styles.textRight}>{type == 'all' ? orderCount + '单' : data.id}</Text>
                </View>
                <TouchableOpacity>
                    <View style={styles.containerItem}>
                        <Text style={styles.textLeft}>支付选择</Text>
                        <View style={styles.rightView} >
                            <Text style={styles.textRightCash}>余额</Text>
                            <Image
                                source={app.img.common_go}
                                style={styles.goStyle} />
                        </View>
                    </View>
                </TouchableOpacity>
                <View style={styles.containerItem}>
                    <Text style={styles.textLeft}>{isMoving ? '搬运费' : '运费'}</Text>
                    <Text style={styles.textRightFee}>
                        ¥
                        {
                            type == 'receive' ?
                            N(data.totalDesignatedFee + data.proxyCharge)
                            :
                            type == 'send' ?
                            N(data.needPayTransportFee + data.needPayInsuanceFee)
                            :
                            type == 'all' ?
                            money
                            :
                            N(data.carryPrice * data.totalAmount)
                        }
                    </Text>
                </View>
                <Button onPress={this.props.doConfirmPay} style={styles.btnCheck} textStyle={styles.btnCheckText} >
                    确认支付
                </Button>
            </View>
        );
    },
});

const styles = StyleSheet.create({
    container:{
        backgroundColor:'#ffffff',
    },
    containerTop:{
        height:40,
        backgroundColor:'#ffffff',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    textTop:{
        fontSize:17,
        marginLeft:(sr.w - 17 * 4) / 2,
        color:'#333333',
    },
    closeStyle:{
        height:30,
        width:30,
    },
    containerItem:{
        height:40,
        backgroundColor:'#ffffff',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    textLeft:{
        fontSize:14,
        color:'#333333',
        marginLeft:10,
    },
    textRight:{
        fontSize:14,
        color:'#888888',
        marginRight:10,
    },
    textRightFee:{
        color:'red',
        fontWeight:'500',
        fontSize:14,
        marginRight:10,
    },
    textRightCash:{
        fontSize:14,
        marginRight:6,
        color:'#3d3e40',
    },
    rightView:{
        flexDirection: 'row',
        alignItems: 'center',
    },
    goStyle: {
        height: 15,
        width: 8,
        marginRight: 10,
    },
    btnCheck:{
        marginTop:23,
        height:50,
        width:sr.w,
        borderRadius:0,
        backgroundColor:'#c81622',
    },
    btnCheckText:{
        color:'#ffffff',
        fontSize:16,
        fontWeight:'600',
    },
});
