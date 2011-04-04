var packetTypes = require("../lib/packet-types"),
    packet = require("../lib/packet");

exports["packet-types"] = function (test) {
    test.equal(packetTypes.SUBMIT_JOB, 7, "packet types are loaded");
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
    // \0REQ-SUBMIT_JOB-5-test-\0/
    var empty = new Buffer([0,0x52,0x45,0x51,0,0,0,0x7,0,0,0,0x5,0x74,0x65,0x73,0x74,0]),
    // \0REQ-SUBMIT_JOB-6-test-\0-a/
        data = new Buffer([0,0x52,0x45,0x51,0,0,0,0x7,0,0,0,0x6,0x74,0x65,0x73,0x74,0,0x61]);

    test.throws(function () { packet.encode({ type: "SUBMIT_JOB" }); }, "job must have a name string");
    test.deepEqual(packet.encode({ type: "SUBMIT_JOB", name: "test" }), empty);
    test.deepEqual(packet.encode({ type: "SUBMIT_JOB", name: "test", data: "a", encoding: "utf8" }), data);
    test.deepEqual(packet.encode({ type: "SUBMIT_JOB", name: "test", data: new Buffer([0x61]) }), data);
    test.done();
};

exports["decode"] = function (test) {
    var buf = new Buffer([0, 0x52, 0x45, 0x53]);
    test.ok(typeof packet.decode === "function", "is a function");
    test.ok(typeof packet.decode(buf) === "object", "returns an object");
    test.throws(function () { packet.decode(); }, "input must be a Buffer");
    test.throws(function () { packet.decode(new Buffer(0)); }, "must have a valid header");
    test.done();
};

