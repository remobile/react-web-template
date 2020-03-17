'use strict';

module.exports = {
    _c (style, color) {
        return [style, { color: color || '#c81622' }];
    },
    _bc (style, color) {
        return [style, { backgroundColor:color || '#c81622' }];
    },
    _tc (style, color) {
        return [style, { tintColor: color || '#c81622' }];
    },
};
