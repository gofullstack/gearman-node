// Encoder/decoder for binary data

var binary = require("binary"),
    types = require("./packet/types"),
    requests = require("./packet/requests"),
    responses = require("./packet/responses"),
    req = new Buffer("REQ", "ascii"),
    res = new Buffer([0, 0x52, 0x45, 0x53]); // \0RES


// Takes an options object and builds a gearman packet
exports.encode = function (options) {
    options = options || {};
    var type = options.type,
        p;

    if (!(type in types.names)) {
        throw Error("unknown request type");
    }

    p = requests[type](options);

    return binary.put().
        word8(0).
        put(req).
        word32be(types.names[type]).
        word32be(p.length).
        put(p).
        buffer();
};


// Takes a buffer and converts it to an object to be used
exports.decode = function (buf) {
    var o, data, size;

    if (!(buf instanceof Buffer)) {
        throw Error("input must be a Buffer");
    }

    o = binary.parse(buf).
        word32bu("reqType").
        word32bu("type").
        word32bu("size").
        tap(function (vars) { size = vars.size; }).
        buffer("inputData", size).
        vars;

    // test if reqtype is valid, Buffer.compare?
    for (var i = 0; i < o.reqType.length; i += 1) {
        if (o.reqType[i] !== req[i]) {
            throw Error("invalid request header");
        }
    }
    o.type = types.numbers[o.type];
    if (!o.type) { throw Error("must have a valid type"); }

    // size is required
    size = parseInt(o.size, 10);
    if (isNaN(size) || size < 0) {
        throw Error("packet length not sent");
    }

    o = responses[o.type](o);

    ["reqType", "size", "inputData"].forEach(function (prop) {
        delete o[prop];
    });

    return o;
};
