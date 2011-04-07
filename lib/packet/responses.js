// functions used for multiple response types

var binary = require("binary");

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
        scan("handle", new Buffer([0])).
        tap(function (vars) {
            size = data.length - vars.handle.length - 1;
        }).
        buffer("data", size).
        vars;

    object.handle = o.handle.toString();
    object.data = o.data;

    return object;
}

module.exports = {
    JOB_CREATED: resHandle,
    WORK_COMPLETE: resHandleAndData,
    WORK_FAIL: resHandle,
    WORK_EXCEPTION: resHandleAndData,
    WORK_DATA: resHandleAndData,
    WORK_WARNING: resHandleAndData
};

