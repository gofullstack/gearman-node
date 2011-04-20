// functions used for multiple response types

var binary = require("binary"),
    extend = require("../util").extend,
    nb = new Buffer([0]); // null buffer

function resHandle(object) {
    object = object || {};
    var data = object.inputData;
    if (data instanceof Buffer) {
        object.handle = data.toString();
    }
    return object;
}

function resHandleAndData(object) {
    object = object || {};
    var data = object.inputData,
        o = {},
        size = 0;

    o = binary.parse(data).
        scan("handle", nb).
        tap(function (vars) {
            size = data.length - vars.handle.length - 1;
        }).
        buffer("data", size).
        vars;

    return extend({
        handle: o.handle.toString(),
        data: o.data
    }, object);
}

module.exports = {
    JOB_CREATED: resHandle,
    WORK_COMPLETE: resHandleAndData,
    WORK_FAIL: resHandle,
    WORK_EXCEPTION: resHandleAndData,
    WORK_DATA: resHandleAndData,
    WORK_WARNING: resHandleAndData,
    STATUS_RES: function (object) {
        object = object || {};
        var o = {};

        o = binary.parse(object.inputData).
            scan("handle", nb).
            scan("known", nb).
            scan("running", nb).
            scan("num", nb).
            word8be("den").
            vars;

        return extend({
            handle: o.handle.toString(),
            known: !!o.known[0],
            running: !!o.running[0],
            percentComplete: {
                numerator: o.num[0],
                denominator: o.den
            }
        }, object);
    }
};
