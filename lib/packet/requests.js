// These functions implement the required parts of each packet type

var binary = require("binary");

function submitJob(options) {
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
        word8(0).
        word8(0). // TODO: unique client ids
        put(data).
        buffer();
}

module.exports = {
    SUBMIT_JOB: submitJob,
    SUBMIT_JOB_HIGH: submitJob,
    SUBMIT_JOB_LOW: submitJob,
    SUBMIT_JOB_BG: submitJob,
    SUBMIT_JOB_HIGH_BG: submitJob,
    SUBMIT_JOB_LOW_BG: submitJob,
    GET_STATUS: function (options) {
        return new Buffer((options || {}).handle, "ascii");
    }
};
