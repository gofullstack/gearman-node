// Utility functions

var gearman = require("./gearman");

// Extend an object.
exports.extend = function (dst, src) {
    for (var p in src) { if (Object.prototype.hasOwnProperty.call(src, p)) {
        dst[p] = src[p];
    }}
    return dst;
};

// Debug messages
exports.debug = function () {
    if (gearman.debug) { console.warn.apply(console, arguments); }
};
