'use strict';

function dataURItoBlob (dataURI) {
    var byteString = atob(dataURI.split(',')[1]);
    var mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0];
    var ab = new ArrayBuffer(byteString.length);
    var ia = new Uint8Array(ab);
    for (var i = 0; i < byteString.length; i++) {
        ia[i] = byteString.charCodeAt(i);
    }
    return new Blob([ab], { type: mimeString });
}

function UPLOAD (data, url, params, onprogress, success, failed, wait) {
    console.log(url, 'send:', params);
    if (typeof failed === 'boolean') {
        wait = failed;
        failed = null;
    }
    if (wait) {
        app.showLoading();
    }

    var formData = new FormData();
    var blob = dataURItoBlob(data);
    formData.append('file', blob);
    for (var key in params) {
        formData.append(key, params[key]);
    }

    fetch(url, {
        method: 'post',
        body: formData,
    })
    .then((response) => response.json())
    .then((data) => {
        console.log(url, 'recv:', data);
        success(data);
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
}

module.exports = UPLOAD;
