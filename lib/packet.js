// Encoder/decoder for binary data

var binary = require("binary"),
    types = require("./packet-types"),
    req = new Buffer("REQ", "ascii"),
    res = new Buffer([0, 0x52, 0x45, 0x53]); // \0RES

// These functions implement the required parts of each packet type
var requests = {
    SUBMIT_JOB: function (options) {
        options = options || {};
        var data = options.data || 0,
            name = options.name,
            encoding = options.encoding;

        if (typeof name !== "string") {
            throw Error("function name must be a string");
        }
        if (data !== 0 && typeof encoding === "string") {
            data = new Buffer(data, encoding);
        } else {
            data = new Buffer(data);
        }

        return binary.put().
            put(new Buffer(name, "ascii")).
            word8(0). // TODO: unique client ids
            put(data).
            buffer();
    }
};

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
    var o, data;

    if (!(buf instanceof Buffer)) {
        throw Error("input must be a Buffer");
    }

    o = binary.parse(buf).
        word32bu("reqType").
        word32bu("type").
        word32bu("size").
        vars;

    // test if reqtype is valid, Buffer.compare?
    for (var i = 0; i < o.reqType.length; i += 1) {
        if (o.reqType[i] !== req[i]) {
            throw Error("invalid request header");
        }
    }

    ["reqType", "size"].forEach(function (prop) {
        delete o[prop];
    });

    o.type = types.numbers[o.type];

    if (data instanceof Buffer) {
        o.handle = data.toString();
    }

    if (!o.type) { throw Error("must have a valid type"); }

    console.log(o);
    return o;
};
