module.exports = {
    until (test, iterator, callback) {
        if (!test()) {
            iterator((err) => {
                if (err) {
                    return callback(err);
                }
                this.until(test, iterator, callback);
            });
        } else {
            callback();
        }
    },
    N (num, rank = 2) {
        typeof num !== 'number' && (num = 0);
        return parseFloat(num.toFixed(rank));
    },
    toThousands (num) {
        return (num || 0).toString().replace(/(\d)(?=(?:\d{3})+$)/g, '$1,');
    },
    getPercentages (list) {
        const sum = _.sum(list);
        return list.map((v) => Math.round(v * 100 / sum) + '%');
    },
    getVisibleText (text, n) {
        let realLength = 0, len = text.length, preLen = -1, charCode = -1, needCut = false;
        for (let i = 0; i < len; i++) {
            charCode = text.charCodeAt(i);
            if (charCode >= 0 && charCode <= 128) {
                realLength += 1;
            } else {
                realLength += 2;
            }
            if (preLen === -1 && realLength >= n) {
                preLen = i + 1;
            } else if (realLength > n + 2) {
                needCut = true;
                break;
            }
        }
        if (needCut) {
            text = text.substr(0, preLen) + '..';
        }
        return text;
    },
    getPartInfo (str, n1, n2) {
        const len = str.length;
        let t = '';
        for (let i = len - n1 - n2; i > 0; i--) {
            t += '*';
        }
        return str.substr(0, n1) + t + str.substr(len - n2);
    },
    cutLimitText (text, n) {
        let realLength = 0, len = text.length, preLen = -1, charCode = -1, needCut = false;
        for (let i = 0; i < len; i++) {
            charCode = text.charCodeAt(i);
            if (charCode >= 0 && charCode <= 128) {
                realLength += 1;
            } else {
                realLength += 2;
            }
            if (preLen === -1 && realLength >= n) {
                preLen = i + 1;
            } else if (realLength > n) {
                needCut = true;
                break;
            }
        }
        if (needCut) {
            text = text.substr(0, preLen);
        }
        return text;
    },
    sortOnKeys (dict) {
        var sorted = [];
        for (var key in dict) {
            sorted[sorted.length] = key;
        }
        sorted.sort();

        var tempDict = {};
        for (var i = 0; i < sorted.length; i++) {
            tempDict[sorted[i]] = dict[sorted[i]];
        }

        return tempDict;
    },
    convert2IndexList (list, indexBy) {
        let dict = _.groupBy(list, o => {
            return o.hasOwnProperty(indexBy) ? this.firstPinyin(o[indexBy]) : this.firstPinyin(o.phone);
        });
        return this.sortOnKeys(dict);
    },
    getWindowLocationSearch () {
        const params = {};
        const { search } = window.location;
        if (search) {
            search.slice(1).split('&').forEach(o => {
                const split = o.indexOf('=');
                let val, key;
                if (split === -1) {
                    key = o;
                } else {
                    key = o.substr(0, split);
                    val = o.substr(split + 1);
                }
                if (val === undefined) {
                    if (key[0] === '!') {
                        key = key.slice(1);
                        val = false;
                    } else {
                        val = true;
                    }
                } else if (val === 'true') {
                    val = true;
                } else if (val === 'false') {
                    val = false;
                } else if (/^-?\d+(\.\d+)?$/.test(val)) { // 数字
                    val = val * 1;
                } else if (/^'(-?\d+(\.\d+)?)|true|false'$/.test(val)) {
                    val = val.replace(/^'|'$/g, '');
                }
                Object.assign(params, { [key]: val });
            });
        }
        return params;
    },
};
