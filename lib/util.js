// Utility functions

// Extend an object.
exports.extend = function (dst, src) {
    for (var p in src) { if (Object.prototype.hasOwnProperty.call(src, p)) {
        dst[p] = src[p];
    }}
    return dst;
};

// Debug messages
exports.debug = function () {
    var debug = require("./gearman").debug;
    if (debug) { console.log.apply(console, arguments); }
};
