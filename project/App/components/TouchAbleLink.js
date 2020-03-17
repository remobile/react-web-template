import React from 'react';
import {
    Linking,
    TouchableOpacity,
} from 'react-native';

// 打电话：url->("tel:10086")
// 发邮件：url->("mailto:10086@qq.com")
// 打开网站:url->("http://www.baidu.com")
module.exports = React.createClass({
    render () {
        const { url, style, children } = this.props;
        return (
            <TouchableOpacity style={style} onPress={() => {
                Linking.canOpenURL(url).then(supported => {
                    if (!supported) {
                        console.log('Can\'t handle url: ' + url);
                    } else {
                        return Linking.openURL(url);
                    }
                }).catch(err => console.error('An error occurred', err));
            }}>
                {children}
            </TouchableOpacity>

        );
    },
});
