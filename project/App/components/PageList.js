'use strict';

const React = require('react');
const ReactNative = require('react-native');
const {
    View,
    Text,
    StyleSheet,
    FlatList,
} = ReactNative;

const STATUS = {
    /* loading more status change graph
    *
    * STATUS_TEXT_HIDE->[STATUS_HAVE_MORE, STATUS_START_LOAD]
    * STATUS_START_LOAD->[STATUS_TEXT_HIDE, STATUS_NO_DATA, STATUS_ALL_LOADED, STATUS_LOAD_ERROR]
    * STATUS_HAVE_MORE->[STATUS_TEXT_HIDE, STATUS_NO_DATA, STATUS_ALL_LOADED, STATUS_LOAD_ERROR]
    * STATUS_ALL_LOADED->[STATUS_TEXT_HIDE]
    */
    STATUS_TEXT_HIDE: 0,
    STATUS_START_LOAD: 1,
    STATUS_HAVE_MORE: 2,
    STATUS_NO_DATA: 3,
    STATUS_ALL_LOADED: 4,
    STATUS_LOAD_ERROR: 5,
};
const TEXT = {
    0: '',
    1: '',
    2: '正在加载更多...',
    3: '暂无数据!',
    4: '全部加载完成',
    5: '加载错误，请稍后再试',
};

const { STATUS_TEXT_HIDE, STATUS_START_LOAD, STATUS_HAVE_MORE, STATUS_NO_DATA, STATUS_ALL_LOADED, STATUS_LOAD_ERROR } = STATUS;

module.exports = React.createClass({
    getDefaultProps () {
        return {
            autoLoad: true,
            pageNo: 0,
            style: { flex: 1 },
            pageSize: CONSTANTS.PER_PAGE_COUNT,
            listName: 'list',
        };
    },
    componentDidMount () {
        if (this.props.autoLoad) {
            this.getList();
        }
    },
    updateList (callback) {
        this.list = callback(this.list);
        this.setState({
            dataSource: this.list,
        });
    },
    getInitialState () {
        const { list, pageNo } = this.props;
        this.list = list || [];
        this.pageNo = pageNo;
        return {
            dataSource: this.list,
            infiniteLoadStatus: list ? (list.length === 0 ? STATUS_NO_DATA : list.length < CONSTANTS.PER_PAGE_COUNT ? STATUS_ALL_LOADED : STATUS_TEXT_HIDE) : STATUS_START_LOAD,
        };
    },
    componentDidUpdate (prevProps, prevState) {
        if (!_.isEqual(prevProps.listParam, this.props.listParam)) {
            this.refresh();
        }
    },
    getList (wait) {
        const param = {
            ...this.props.listParam,
            pageNo: this.pageNo,
            pageSize: this.props.pageSize,
        };
        this.setState({ infiniteLoadStatus: this.pageNo === 0 ? STATUS_START_LOAD : STATUS_HAVE_MORE }, () => {
            POST(this.props.listUrl, param, this.getListSuccess, this.getListFailed, wait);
        });
    },
    getListSuccess (data) {
        this.props.onGetList && this.props.onGetList(data, this.pageNo);
        if (data.success) {
            const list = _.get(data.context, this.props.listName);
            const infiniteLoadStatus = (!list.length && this.pageNo === 0) ? STATUS_NO_DATA : list.length < this.props.pageSize ? STATUS_ALL_LOADED : STATUS_TEXT_HIDE;
            this.list = this.list.concat(list);
            this.setState({
                dataSource: this.list,
                infiniteLoadStatus: infiniteLoadStatus,
            });
        } else {
            if (this.props.ListFailedText) {
                this.setState({ infiniteLoadStatus: this.props.ListFailedText });
            } else {
                this.getListFailed();
            }
        }
    },
    getListFailed () {
        this.pageNo--;
        this.setState({ infiniteLoadStatus: STATUS_LOAD_ERROR });
    },
    onEndReached () {
        if (this.state.infiniteLoadStatus !== STATUS_TEXT_HIDE || this.props.disable) {
            return;
        }
        this.pageNo++;
        this.getList();
    },
    refresh () {
        if (this.isRefreshing()) {
            return;
        }
        this.list = [];
        this.setState({
            dataSource: this.list,
        });
        this.pageNo = 0;
        this.getList();
    },
    isRefreshing () {
        return (this.state.infiniteLoadStatus === STATUS_START_LOAD || this.state.infiniteLoadStatus === STATUS_HAVE_MORE);
    },
    renderSeparator (sectionID, rowID) {
        return (
            <View
                style={styles.separator}
                key={sectionID + rowID} />
        );
    },
    renderFooter () {
        const status = this.state.infiniteLoadStatus;
        return (
            <View style={styles.listFooterContainer}>
                <Text style={styles.listFooter}>
                    {typeof status === 'string' ? status : status === STATUS_NO_DATA && this.props.ListFailedText ? this.props.ListFailedText : TEXT[status]}
                </Text>
            </View>
        );
    },
    render () {
        return (
            <FlatList
                onEndReached={this.onEndReached}
                onEndReachedThreshold={10}
                initialListSize={this.props.pageSize}
                enableEmptySections
                removeClippedSubviews={false}
                style={[{ alignSelf:'stretch' }, this.props.style]}
                data={this.state.dataSource}
                renderItem={({ item, index }) => this.props.renderRow(item, index)}
                ItemSeparatorComponent={this.props.renderSeparator === undefined ? this.renderSeparator : this.props.renderSeparator}
                ListFooterComponent={this.renderFooter}
                refreshing={this.state.infiniteLoadStatus === STATUS_START_LOAD}
                />
        );
    },
});
module.exports.STATUS = STATUS;

const styles = StyleSheet.create({
    listFooterContainer: {
        height: 60,
        alignItems: 'center',
        paddingTop: 10,
    },
    listFooter: {
        color: 'gray',
        fontSize: 12,
    },
    separator: {
        backgroundColor: '#DDDDDD',
        height: 1,
    },
});
