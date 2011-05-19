var packetTypes = require("../lib/packet/types"),
    packet = require("../lib/packet");

exports["packet-types"] = function (test) {
    test.equal(packetTypes.names.SUBMIT_JOB, 7, "packet type names are loaded");
    test.equal(packetTypes.numbers[7], "SUBMIT_JOB", "packet type numbers are loaded");
    test.done();
};

exports["encode"] = function (test) {
    test.ok(typeof packet.encode === "function", "is a function");
    test.ok(packet.encode({ type: "SUBMIT_JOB", name: "test" }) instanceof Buffer, "returns a Buffer");
    test.throws(function () { packet.encode({ type: "AAA", name: "test" }); }, "must have a known type");
    test.done();
};

exports["encode SUBMIT_JOB"] = function (test) {
    // examples
    // \0REQ-SUBMIT_JOB-7-test-\0-1-\0
    var empty = new Buffer([0,0x52,0x45,0x51,0,0,0,0x7,0,0,0,7,0x74,0x65,0x73,0x74,0,1,0]),
    // \0REQ-SUBMIT_JOB-8-test-\0-1-\0-a
        data = new Buffer([0,0x52,0x45,0x51,0,0,0,0x7,0,0,0,8,0x74,0x65,0x73,0x74,0,1,0,0x61]);
    test.throws(function () { packet.encode({ type: "SUBMIT_JOB", id: null }); }, "job must have a name string");
    test.deepEqual(packet.encode({ type: "SUBMIT_JOB", name: "test", id: null }), empty);
    test.deepEqual(packet.encode({ type: "SUBMIT_JOB", name: "test", data: "a", encoding: "utf8", id: null }), data);
    test.deepEqual(packet.encode({ type: "SUBMIT_JOB", name: "test", data: new Buffer([0x61]), id: null }), data);
    test.done();
};

exports["encode SUBMIT_JOB_HIGH"] = function (test) {
    // \0REQ-SUBMIT_JOB_HIGH-8-test\0-1-\0-a/
    var data = new Buffer([0,0x52,0x45,0x51,0,0,0,21,0,0,0,8,0x74,0x65,0x73,0x74,0,1,0,0x61]);

    test.deepEqual(packet.encode({ type: "SUBMIT_JOB_HIGH", name: "test", data: "a", encoding: "utf8", id: null }), data);
    test.done();
};

exports["encode SUBMIT_JOB_LOW"] = function (test) {
    // \0REQ-SUBMIT_JOB_LOW-8-test\0-1-\0-a/
    var data = new Buffer([0,0x52,0x45,0x51,0,0,0,33,0,0,0,8,0x74,0x65,0x73,0x74,0,1,0,0x61]);

    test.deepEqual(packet.encode({ type: "SUBMIT_JOB_LOW", name: "test", data: "a", encoding: "utf8", id: null }), data);
    test.done();
};

exports["encode SUBMIT_JOB_BG"] = function (test) {
    // \0REQ-SUBMIT_JOB_BG-8-test\0-1-\0-a/
    var data = new Buffer([0,0x52,0x45,0x51,0,0,0,18,0,0,0,8,0x74,0x65,0x73,0x74,0,1,0,0x61]);

    test.deepEqual(packet.encode({ type: "SUBMIT_JOB_BG", name: "test", data: "a", encoding: "utf8", id: null }), data);
    test.done();
};

exports["encode SUBMIT_JOB_HIGH_BG"] = function (test) {
    // \0REQ-SUBMIT_JOB_HIGH_BG-8-test\0-1-\0-a/
    var data = new Buffer([0,0x52,0x45,0x51,0,0,0,32,0,0,0,8,0x74,0x65,0x73,0x74,0,1,0,0x61]);

    test.deepEqual(packet.encode({ type: "SUBMIT_JOB_HIGH_BG", name: "test", data: "a", encoding: "utf8", id: null }), data);
    test.done();
};

exports["encode SUBMIT_JOB_LOW_BG"] = function (test) {
    // \0REQ-SUBMIT_JOB_LOW_BG-8-test\0-1-\0-a/
    var data = new Buffer([0,0x52,0x45,0x51,0,0,0,34,0,0,0,8,0x74,0x65,0x73,0x74,0,1,0,0x61]);

    test.deepEqual(packet.encode({ type: "SUBMIT_JOB_LOW_BG", name: "test", data: "a", encoding: "utf8", id: null }), data);
    test.done();
};

exports["encode GET_STATUS"] = function (test) {
    // \0REQ-GET_STATUS-5-test\0/
    var data = new Buffer([0,0x52,0x45,0x51,0,0,0,15,0,0,0,4,0x74,0x65,0x73,0x74]);

    test.deepEqual(packet.encode({ type: "GET_STATUS", handle: "test", id: null }), data);
    test.done();
};

exports["decode"] = function (test) {
        // \0RES
    var headerOnly = new Buffer([0, 0x52, 0x45, 0x53]),
        // \0RES-8
        withType =  new Buffer([0, 0x52, 0x45, 0x53, 0, 0, 0, 0x08]);
        // \0RES-8-0
        withTypeAndSize =  new Buffer([0, 0x52, 0x45, 0x53, 0, 0, 0, 0x08, 0, 0, 0, 0]);
    test.ok(typeof packet.decode === "function", "is a function");
    test.ok(typeof packet.decode(withTypeAndSize) === "object", "returns an object");
    test.throws(function () { packet.decode(); }, "input must be a Buffer");
    test.throws(function () { packet.decode(new Buffer(0)); }, "must have a valid header");
    test.throws(function () { packet.decode(headerOnly); }, "must have a valid type");
    test.throws(function () { packet.decode(withType); }, "must have a valid packet length");
    test.deepEqual(packet.decode(withTypeAndSize), { type: "JOB_CREATED", handle: "" }, "most basic request");
    test.done();
};

exports["decode JOB_CREATED"] = function (test) {
        // \0RES-8-4-test
    var t = new Buffer([0, 0x52, 0x45, 0x53, 0, 0, 0, 0x08, 0, 0, 0, 0x04, 0x74,0x65,0x73,0x74]);
    test.deepEqual(packet.decode(t), { type: "JOB_CREATED", handle: "test" }, "job created, handle 'test'");
    test.done();
};

exports["decode WORK_COMPLETE"] = function (test) {
        // \0RES-13-12-test-\0-test
    var t = new Buffer([0, 0x52, 0x45, 0x53, 0, 0, 0, 13, 0, 0, 0, 0x0c, 0x74,0x65,0x73,0x74,0,0x74,0x65,0x73,0x74]);
    test.deepEqual(packet.decode(t), { type: "WORK_COMPLETE", handle: "test", data: new Buffer([0x74, 0x65, 0x73, 0x74]) }, "work complete, handle 'test', data buffer");
    test.done();
};

exports["decode WORK_FAIL"] = function (test) {
        // \0RES-14-4-test
    var t = new Buffer([0, 0x52, 0x45, 0x53, 0, 0, 0, 14, 0, 0, 0, 4, 0x74,0x65,0x73,0x74]);
    test.deepEqual(packet.decode(t), { type: "WORK_FAIL", handle: "test" }, "work fail, handle 'test'");
    test.done();
};

exports["decode WORK_EXCEPTION"] = function (test) {
        // \0RES-25-12-test-\0-test
    var t = new Buffer([0, 0x52, 0x45, 0x53, 0, 0, 0, 25, 0, 0, 0, 0x0c, 0x74,0x65,0x73,0x74,0,0x74,0x65,0x73,0x74]);
    test.deepEqual(packet.decode(t), { type: "WORK_EXCEPTION", handle: "test", data: new Buffer([0x74, 0x65, 0x73, 0x74]) }, "work exception, handle 'test', data buffer");
    test.done();
};

exports["decode WORK_DATA"] = function (test) {
        // \0RES-28-12-test-\0-test
    var t = new Buffer([0, 0x52, 0x45, 0x53, 0, 0, 0, 28, 0, 0, 0, 0x0c, 0x74,0x65,0x73,0x74,0,0x74,0x65,0x73,0x74]);
    test.deepEqual(packet.decode(t), { type: "WORK_DATA", handle: "test", data: new Buffer([0x74, 0x65, 0x73, 0x74]) }, "work data, handle 'test', data buffer");
    test.done();
};

exports["decode WORK_WARNING"] = function (test) {
        // \0RES-29-12-test-\0-test
    var t = new Buffer([0, 0x52, 0x45, 0x53, 0, 0, 0, 29, 0, 0, 0, 0x0c, 0x74,0x65,0x73,0x74,0,0x74,0x65,0x73,0x74]);
    test.deepEqual(packet.decode(t), { type: "WORK_WARNING", handle: "test", data: new Buffer([0x74, 0x65, 0x73, 0x74]) }, "work warning, handle 'test', data buffer");
    test.done();
};

exports["decode STATUS_RES"] = function (test) {
    // \0RES-STATUS_RES-12-test-\0-1-\0-1-\0-50-\0-100
    var t = new Buffer([0, 0x52, 0x45, 0x53, 0, 0, 0, 20, 0, 0, 0, 12, 0x74, 0x65, 0x73, 0x74, 0, 1, 0, 1, 0, 50, 0, 100]);
    test.deepEqual(packet.decode(t), {
        type: "STATUS_RES",
        handle: "test",
        known: true,
        running: true,
        percentComplete: [50, 100]
    }, "status response");
    test.done();
};
