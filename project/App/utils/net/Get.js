'use strict';

function GET (url, success, error) {
    console.log('getSend:', url);
    app.showLoading();
    fetch(url, {
        method: 'get',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
    })
    .then((response) => response.json())
    .then((json) => {
        console.log('getRecv:', json);
        app.hideLoading();
        success && success(json);
    })
    .catch((err) => {
        app.hideLoading();
        if (!error || !error(err)) {
            Toast('网络出错');
        }
    });
}

module.exports = GET;
