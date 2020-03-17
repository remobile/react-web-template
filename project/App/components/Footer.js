'use strict';

const React = require('react');
const ReactNative = require('react-native');
const {
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    Linking,
} = ReactNative;

module.exports = React.createClass({
    getInitialState () {
        return {
            linkList:[
                { text: '友情链接', url: 'http://www.baidu.com/' },
                { text: '快递服务', url: 'http://www.sf-express.com/cn/sc/' },
                { text: '仓储服务', url: 'https://baike.baidu.com/item/%E5%AE%9D%E6%B9%BE%E7%89%A9%E6%B5%81%E6%8E%A7%E8%82%A1%E6%9C%89%E9%99%90%E5%85%AC%E5%8F%B8/5942754?fr=aladdin' },
                { text: '生鲜服务', url: 'https://chaoshi.tmall.com/?targetPage=index&ali_trackid=2%3Amm_26632258_3504122_57622584%3A1528338904_229_1136552891&clk1=952a26f03b5374fb5e9c08be7eafae27&upsid=952a26f03b5374fb5e9c08be7eafae27' },
                { text: '物流', url: 'https://www.deppon.com/' },
            ],
        };
    },
    toLink (item) {
        Linking.openURL(item.url);
    },
    friendlyLink () {
        const { linkList } = this.state;
        return (
            <View style={styles.linkView}>
                {
                    linkList.map((item, i) => (
                        <TouchableOpacity key={i} style={styles.link} onPress={this.toLink.bind(null, item)}>
                            <Text style={styles.linkText}>{item.text}</Text>
                            <View style={styles.line} />
                        </TouchableOpacity>
                    ))
                }
            </View>
        );
    },
    render () {
        const { style } = this.props;
        return (
            <View style={style || styles.container}>
                <Text style={styles.describe}>四面通科技有限公司: 贵阳双龙临空经济区贵龙大道秦棋村</Text>
                <Text style={styles.describe}>黔ICP备17008916号 版权所有: 四面通科技有限公司</Text>
                <Text style={styles.describe}>经营许可证编号：黔B2-20180030 </Text>
            </View>
        );
    },
});

const styles = StyleSheet.create({
    container: {
        height: 100,
        width: sr.w,
        backgroundColor: '#c81622',
    },
    linkView: {
        flexDirection: 'row',
        height: 30,
        width: sr.w,
    },
    link: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    linkText: {
        fontSize: 10,
        color: 'rgb(255,255,255)',
        height: 10,
        lineHeight: 10,
        width: 75,
        textAlign: 'center',
    },
    line: {
        width: 1,
        height: 10,
        backgroundColor: '#FFFFFF',
    },
    describe: {
        marginTop: 10,
        fontSize: 10,
        color: 'rgb(255,255,255)',
        height: 20,
        lineHeight: 20,
        textAlign: 'center',
    },
});
