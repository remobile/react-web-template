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

module.exports = React.createClass({
    statics: {
    },
    getInitialState () {
        return {
        };
    },
    render () {
        const { list } = this.props;
        return (
            <View style={styles.container}>
                {
                    list.map((item, i) => {
                        return (
                            <TouchableOpacity
                                onPress={this.props.passwordItem.bind(null, item)}
                                key={i} style={styles.itemLine}>
                                <Text style={styles.item}>{ item }</Text>
                            </TouchableOpacity>
                        );
                    })
                }
                <TouchableOpacity onPress={this.props.confirm} style={styles.itemImage}>
                    <Text style={styles.item}>确认</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={this.props.zero} style={styles.itemLine}>
                    <Text style={styles.item} >0</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={this.props.delete} style={styles.itemImage}>
                    <Image style={styles.delete}
                        source={require('../resource/image/order/delete.png')} />
                </TouchableOpacity>
            </View>
        );
    },
});
const styles = StyleSheet.create({
    container:{
        width:sr.w,
        backgroundColor:'#f4f4f4',
        flexDirection:'row',
        flexWrap:'wrap', // 换行
    },
    item:{
        fontSize:18,
        fontWeight:'600',
    },
    itemLine:{
        width:sr.w / 3,
        height:44,
        borderLeftWidth:1,
        borderBottomWidth:1,
        borderColor:'#f1f1f1',
        backgroundColor:'#FFFFFF',
        justifyContent:'center',
        alignItems:'center',
    },
    itemGray:{
        height:45,
        width:sr.w / 3,
        backgroundColor:'#dddddd',
    },
    itemImage:{
        height:45,
        width:sr.w / 3,
        backgroundColor:'#dddddd',
        justifyContent:'center',
        alignItems:'center',
    },
    delete:{
        height:15,
        width:25,
    },
});
