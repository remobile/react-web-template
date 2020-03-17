'use strict';

const React = require('react');
const ReactNative = require('react-native');
const {
    StyleSheet,
    View,
    Text,
    TouchableOpacity,
    FlatList,
} = ReactNative;

module.exports = React.createClass({
    statics: {
        title: '所在地',
        rightButton: { title: '确定', handler: () => { app.scene.confirm && app.scene.confirm(); } },
        leftButton: { handler: () => { app.scene.goBack && app.scene.goBack(); } },
    },
    goBack () {
        const { onWillFocus } = this.props;
        if (onWillFocus) {
            onWillFocus();
        }
        app.pop();
    },
    getInitialState () {
        return {
            dataSource:[],
            allAddress:[],
        };
    },
    confirm (obj) {
        const { allAddress } = this.state;
        const lastObj = allAddress[allAddress.length - 1];
        const { confirmAddress, isNeedSelectAll } = this.props;
        if (isNeedSelectAll) {
            if (!!lastObj && lastObj.level === 11) {
                confirmAddress(_.join(_.map(this.state.allAddress, 'name'), ''), allAddress.length >= 1 ? lastObj.code : 0);
                this.goBack();
            } else {
                Toast('请选择完整到货地');
            }
        } else {
            confirmAddress(_.join(_.map(this.state.allAddress, 'name'), ''), allAddress.length >= 1 ? lastObj.code : 0);
            this.goBack();
        }
    },
    componentWillMount () {
        const { endPointLastCode } = this.props;
        this.data = require(`../data/${CONSTANTS.REGION}.js`);
        if (endPointLastCode) {
            this.getAddressFromLastCode(endPointLastCode);
        } else {
            this.getRegionAddress(0);
        }
    },
    getRegionAddress (parentCode) {
        if (!parentCode) {
            this.setState({
                allAddress: [],
                dataSource: _.filter(this.data, o => o.level === 10),
            });
        } else {
            this.setState({ dataSource: _.filter(this.data, o => o.parentCode === parentCode) });
        }
    },
    getAddressFromLastCode (addressLastCode) {
        let dataSource, allAddress = [];
        if (!addressLastCode) {
            dataSource = _.filter(this.data, o => o.level === 10);
            allAddress = [];
        } else {
            let code = addressLastCode;
            while (true) {
                const item = _.find(this.data, o => o.code === code);
                if (!item) {
                    break;
                }
                allAddress.unshift(item);
                const list = _.filter(this.data, o => o.parentCode === item.parentCode);
                if (addressLastCode === code) {
                    dataSource = list;
                }
                code = item.parentCode;
            }
        }
        this.setState({ allAddress, dataSource });
    },
    getSubAddressList (obj) {
        let { allAddress } = this.state;
        const lastObj = allAddress[allAddress.length - 1];
        if (lastObj && lastObj.level === 11) {
            allAddress.pop();
        }
        allAddress.push(obj);
        this.setState({ allAddress: _.uniqBy(allAddress, 'code') });
        if (obj.level === 11) {
            this.props.confirmAddress(_.join(_.map(this.state.allAddress, 'name'), ''), obj.code);
            this.goBack();
        } else {
            this.getRegionAddress(obj.code);
        }
    },
    onClickAddressTitle (obj, index) {
        this.state.allAddress = _.dropRight(this.state.allAddress, this.state.allAddress.length - index);
        this.getSubAddressList(obj);
    },
    renderRow (obj, rowID) {
        return (
            <TouchableOpacity
                key={rowID}
                activeOpacity={0.6}
                onPress={this.getSubAddressList.bind(null, obj)}
                style={styles.row}>
                <Text>{obj.name}</Text>
            </TouchableOpacity>
        );
    },
    renderSeparator (sectionID, rowID) {
        return (
            <View style={styles.separator} key={rowID} />
        );
    },
    render () {
        const { allAddress } = this.state;
        return (
            <View style={styles.container}>
                <View style={styles.infoStyle}>
                    <TouchableOpacity
                        activeOpacity={1}
                        onPress={this.getRegionAddress.bind(null, 0)}>
                        <Text style={styles.allAddress}>{CONSTANTS.REGION_MAP[CONSTANTS.REGION]}县/</Text>
                    </TouchableOpacity>
                    {
                        allAddress.map((item, i) => {
                            return (
                                <TouchableOpacity
                                    key={i}
                                    activeOpacity={1}
                                    onPress={this.onClickAddressTitle.bind(null, item, i)}>
                                    <Text style={styles.allAddress}>{item.name}{item.level !== 11 ? '/' : ''}</Text>
                                </TouchableOpacity>
                            );
                        })
                    }
                    {
                        (!_.last(allAddress) || _.last(allAddress).level !== 11) &&
                        <TouchableOpacity activeOpacity={1} style={styles.btnSelectAddress} >
                            <Text>选择地址</Text>
                        </TouchableOpacity>
                    }
                </View>
                <FlatList
                    initialListSize={1}
                    onEndReachedThreshold={10}
                    enableEmptySections
                    data={this.state.dataSource}
                    renderItem={({ item, index }) => this.renderRow(item, index)}
                    ItemSeparatorComponent={this.renderSeparator} />
            </View>
        );
    },
});

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFFFFF',
    },
    row: {
        flexDirection: 'row',
        paddingVertical: 10,
        paddingHorizontal: 12,
    },
    separator: {
        backgroundColor: '#EEEEEE',
        height: 1,
        width: sr.w,
    },
    infoStyle: {
        flexDirection: 'row',
        paddingTop:15,
        marginLeft:10,
    },
    allAddress:{
        fontSize:15,
        paddingVertical:5,
        paddingHorizontal:1,
    },
    btnSelectAddress:{
        paddingVertical:5,
        paddingHorizontal:2,
        borderColor:'red',
        borderBottomWidth:1,
    },
});
