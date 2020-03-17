'use strict';

const ReactNative = require('react-native');
const {
    Alert,
} = ReactNative;

module.exports = (url, parameter, success, failed, wait) => {
    console.log(url, 'send:', parameter);
    if (typeof failed === 'boolean') {
        wait = failed;
        failed = null;
    }
    if (wait) {
        app.showLoading();
    }
    fetch(url, {
        method: 'post',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(parameter),
    })
    .then((response) => response.json())
    .then((data) => {
        console.log(url, 'recv:', data);
        if (data.invalidToken) {
            if (!app.isShowSignTimeoutMessage) {
                app.isShowSignTimeoutMessage = true;
                Alert.alert('提示', data.msg || '登录超时,请重新登录', [ {
                    text: '知道了',
                    onPress: () => {
                        window.location.reload();
                    },
                } ], { cancelable: false });
            }
        } else {
            success && success(data);
        }
        if (wait) {
            app.hideLoading();
        }
    })
    .catch((error) => {
        if (!failed || !failed(error)) {
            Toast('网络错误');
            console.log(url + ':网络错误', error);
            if (wait) {
                app.hideLoading();
            }
        }
    });
};
